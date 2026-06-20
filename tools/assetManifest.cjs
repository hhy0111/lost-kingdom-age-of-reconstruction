const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { PNG } = require('pngjs');

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp']);

function toPosix(filePath) {
  return filePath.replace(/\\/g, '/');
}

function loadPromptManifest(manifestPath) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (!Array.isArray(manifest)) {
    throw new Error(`Prompt manifest must be an array: ${manifestPath}`);
  }
  return manifest;
}

function walkFiles(dirPath) {
  const results = [];

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const entryPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(entryPath));
    } else {
      results.push(entryPath);
    }
  }

  return results;
}

function parseSourceImage(rootDir, absolutePath) {
  const basename = path.basename(absolutePath);
  const extension = path.extname(basename).toLowerCase();
  const stem = path.basename(basename, extension);
  const itemMatch = stem.match(/^(\d+)-item-(\d+)$/i);
  const buildingMatch = stem.match(/^(\d+)-lv([1-5])$/i);

  const source = {
    absolutePath,
    relativePath: toPosix(path.relative(rootDir, absolutePath)),
    basename,
    stem,
    extension,
    kind: 'unknown',
  };

  if (itemMatch) {
    source.kind = 'item';
    source.batchIndex = Number(itemMatch[1]);
    source.itemIndex = Number(itemMatch[2]);
  } else if (buildingMatch) {
    source.kind = 'building_level';
    source.buildingIndex = Number(buildingMatch[1]);
    source.level = Number(buildingMatch[2]);
  }

  return source;
}

function discoverSourceImages(sourceDir) {
  const rootDir = path.resolve(sourceDir);
  if (!fs.existsSync(rootDir)) {
    throw new Error(`Missing source image directory: ${rootDir}`);
  }

  return walkFiles(rootDir)
    .filter((filePath) => IMAGE_EXTENSIONS.has(path.extname(filePath).toLowerCase()))
    .map((filePath) => parseSourceImage(rootDir, path.resolve(filePath)))
    .sort((left, right) => left.relativePath.localeCompare(right.relativePath, 'en', { numeric: true }));
}

function enrichManifestEntries(manifest) {
  const categoryCounts = new Map();

  return manifest.map((entry, index) => {
    const categoryOrdinal = (categoryCounts.get(entry.category) || 0) + 1;
    categoryCounts.set(entry.category, categoryOrdinal);

    return {
      ...entry,
      promptIndex: index + 1,
      categoryOrdinal,
    };
  });
}

function uniqueByKey(items, keySelector) {
  const seen = new Map();
  const duplicates = [];

  for (const item of items) {
    const key = keySelector(item);
    if (seen.has(key)) {
      duplicates.push(key);
    } else {
      seen.set(key, item);
    }
  }

  return {
    map: seen,
    duplicates,
  };
}

function buildAssetCopyPlan(manifest, sources) {
  const entries = enrichManifestEntries(manifest);
  const directSources = uniqueByKey(sources, (source) => source.stem.toLowerCase()).map;
  const itemSources = uniqueByKey(
    sources.filter((source) => source.kind === 'item'),
    (source) => source.itemIndex
  ).map;
  const buildingSources = uniqueByKey(
    sources.filter((source) => source.kind === 'building_level'),
    (source) => source.buildingIndex
  ).map;
  const usedSources = new Set();
  const missing = [];
  const plan = [];

  for (const entry of entries) {
    const outputStem = path.basename(entry.outputPath, path.extname(entry.outputPath)).toLowerCase();
    let source = directSources.get(entry.id.toLowerCase()) || directSources.get(outputStem);

    if (!source && entry.category === 'building') {
      source = buildingSources.get(entry.categoryOrdinal);
    }

    if (!source) {
      source = itemSources.get(entry.promptIndex + 1);
    }

    if (!source) {
      missing.push(entry);
      continue;
    }

    usedSources.add(source.absolutePath);
    plan.push({
      ...entry,
      sourcePath: source.relativePath,
      sourceAbsolutePath: source.absolutePath,
      sourceKind: source.kind,
      outputPath: toPosix(entry.outputPath),
    });
  }

  const duplicateOutputs = uniqueByKey(plan, (entry) => entry.outputPath).duplicates;
  const duplicateSources = uniqueByKey(plan, (entry) => entry.sourceAbsolutePath).duplicates;
  const unusedSources = sources.filter((source) => !usedSources.has(source.absolutePath));

  return {
    plan,
    missing,
    unusedSources,
    duplicateOutputs,
    duplicateSources,
  };
}

function ensureInsideRoot(rootDir, targetPath) {
  const root = path.resolve(rootDir);
  const resolved = path.resolve(root, targetPath);
  const relative = path.relative(root, resolved);

  if (relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative))) {
    return resolved;
  }

  throw new Error(`Path escapes workspace: ${targetPath}`);
}

function hasPngSignature(buffer) {
  return (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  );
}

function pngHasChunk(buffer, chunkName) {
  let offset = 8;
  while (offset + 12 <= buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    if (type === chunkName) {
      return true;
    }
    offset += length + 12;
  }
  return false;
}

function readImageMetadata(filePath, options = {}) {
  const buffer = fs.readFileSync(filePath);
  const extension = path.extname(filePath).toLowerCase();
  const metadata = {
    path: toPosix(filePath),
    bytes: buffer.length,
    format: extension.replace(/^\./, ''),
    width: null,
    height: null,
    hasAlphaChannel: false,
    transparentPixelCount: null,
    sha256: crypto.createHash('sha256').update(buffer).digest('hex'),
  };

  if (extension === '.png') {
    if (!hasPngSignature(buffer)) {
      throw new Error(`Invalid PNG signature: ${filePath}`);
    }

    const colorType = buffer[25];
    metadata.format = 'png';
    metadata.width = buffer.readUInt32BE(16);
    metadata.height = buffer.readUInt32BE(20);
    metadata.bitDepth = buffer[24];
    metadata.colorType = colorType;
    metadata.hasAlphaChannel = colorType === 4 || colorType === 6 || pngHasChunk(buffer, 'tRNS');

    if (options.scanAlpha) {
      const decoded = PNG.sync.read(buffer);
      let transparentPixels = 0;
      for (let offset = 3; offset < decoded.data.length; offset += 4) {
        if (decoded.data[offset] < 255) {
          transparentPixels += 1;
        }
      }
      metadata.transparentPixelCount = transparentPixels;
    }
  }

  return metadata;
}

function inferCheckerCellSize(png, axis) {
  const samples = [];
  const length = axis === 'x' ? png.width : png.height;
  let last = null;
  let runStart = 0;

  for (let position = 0; position < length; position += 1) {
    const x = axis === 'x' ? position : 0;
    const y = axis === 'x' ? 0 : position;
    const offset = (y * png.width + x) * 4;
    const luma = (png.data[offset] + png.data[offset + 1] + png.data[offset + 2]) / 3;
    const band = luma >= 250 ? 1 : 0;

    if (last === null) {
      last = band;
    } else if (band !== last) {
      const runLength = position - runStart;
      if (runLength >= 8) {
        samples.push(runLength);
      }
      runStart = position;
      last = band;
    }
  }

  if (samples.length === 0) {
    return length / 64;
  }

  const usefulSamples = samples.slice(0, 64);
  return usefulSamples.reduce((sum, value) => sum + value, 0) / usefulSamples.length;
}

function inferCheckerProfile(png) {
  const cellX = inferCheckerCellSize(png, 'x');
  const cellY = inferCheckerCellSize(png, 'y');
  const sums = [
    { r: 0, g: 0, b: 0, count: 0 },
    { r: 0, g: 0, b: 0, count: 0 },
  ];

  function sample(x, y) {
    const offset = (y * png.width + x) * 4;
    const r = png.data[offset];
    const g = png.data[offset + 1];
    const b = png.data[offset + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if (max - min > 18 || min < 225) {
      return;
    }
    const parity = (Math.floor(x / cellX) + Math.floor(y / cellY)) & 1;
    sums[parity].r += r;
    sums[parity].g += g;
    sums[parity].b += b;
    sums[parity].count += 1;
  }

  for (let x = 0; x < png.width; x += 1) {
    sample(x, 0);
    sample(x, png.height - 1);
  }
  for (let y = 0; y < png.height; y += 1) {
    sample(0, y);
    sample(png.width - 1, y);
  }

  const colors = sums.map((sum, index) => {
    if (sum.count === 0) {
      return index === 0 ? { r: 252, g: 252, b: 252 } : { r: 245, g: 245, b: 245 };
    }

    return {
      r: sum.r / sum.count,
      g: sum.g / sum.count,
      b: sum.b / sum.count,
    };
  });

  return {
    cellX,
    cellY,
    colors,
  };
}

function isCheckerPixel(png, profile, x, y) {
  const offset = (y * png.width + x) * 4;
  const r = png.data[offset];
  const g = png.data[offset + 1];
  const b = png.data[offset + 2];
  const a = png.data[offset + 3];

  if (a === 0) {
    return true;
  }

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max - min > 18 || min < 225) {
    return false;
  }

  const parity = (Math.floor(x / profile.cellX) + Math.floor(y / profile.cellY)) & 1;
  const expected = profile.colors[parity];
  const diff = Math.max(Math.abs(r - expected.r), Math.abs(g - expected.g), Math.abs(b - expected.b));

  return diff <= 22;
}

function isEffectSheetBackgroundPixel(png, pixelIndex) {
  const offset = pixelIndex * 4;
  const r = png.data[offset];
  const g = png.data[offset + 1];
  const b = png.data[offset + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const saturation = max - min;
  const luma = (r + g + b) / 3;

  return (saturation <= 80 && min >= 150) || (saturation <= 36 && luma >= 90);
}

function detectConnectedCheckerboardMask(png) {
  const profile = inferCheckerProfile(png);
  const totalPixels = png.width * png.height;
  const mask = new Uint8Array(totalPixels);
  const queue = new Int32Array(totalPixels);
  let head = 0;
  let tail = 0;

  function tryPush(x, y) {
    if (x < 0 || y < 0 || x >= png.width || y >= png.height) {
      return;
    }
    const pixelIndex = y * png.width + x;
    if (mask[pixelIndex] || !isCheckerPixel(png, profile, x, y)) {
      return;
    }
    mask[pixelIndex] = 1;
    queue[tail] = pixelIndex;
    tail += 1;
  }

  for (let x = 0; x < png.width; x += 1) {
    tryPush(x, 0);
    tryPush(x, png.height - 1);
  }
  for (let y = 0; y < png.height; y += 1) {
    tryPush(0, y);
    tryPush(png.width - 1, y);
  }

  while (head < tail) {
    const pixelIndex = queue[head];
    head += 1;
    const x = pixelIndex % png.width;
    const y = Math.floor(pixelIndex / png.width);
    tryPush(x + 1, y);
    tryPush(x - 1, y);
    tryPush(x, y + 1);
    tryPush(x, y - 1);
  }

  return {
    mask,
    transparentPixelCount: tail,
    profile,
  };
}

function writeTransparentPng(sourcePath, outputPath, options = {}) {
  const png = PNG.sync.read(fs.readFileSync(sourcePath));
  const detection = detectConnectedCheckerboardMask(png);
  const { mask, profile } = detection;
  let transparentPixelCount = detection.transparentPixelCount;

  if (options.removeDisconnectedCheckerboard) {
    for (let y = 0; y < png.height; y += 1) {
      for (let x = 0; x < png.width; x += 1) {
        const pixelIndex = y * png.width + x;
        if (!mask[pixelIndex] && isCheckerPixel(png, profile, x, y)) {
          mask[pixelIndex] = 1;
          transparentPixelCount += 1;
        }
      }
    }
  }

  if (options.removeEffectSheetBackground) {
    for (let pixelIndex = 0; pixelIndex < mask.length; pixelIndex += 1) {
      if (!mask[pixelIndex] && isEffectSheetBackgroundPixel(png, pixelIndex)) {
        mask[pixelIndex] = 1;
        transparentPixelCount += 1;
      }
    }
  }

  for (let pixelIndex = 0; pixelIndex < mask.length; pixelIndex += 1) {
    if (!mask[pixelIndex]) {
      continue;
    }
    const offset = pixelIndex * 4;
    png.data[offset] = 0;
    png.data[offset + 1] = 0;
    png.data[offset + 2] = 0;
    png.data[offset + 3] = 0;
  }

  fs.writeFileSync(outputPath, PNG.sync.write(png, { colorType: 6 }));

  return {
    width: png.width,
    height: png.height,
    transparentPixelCount,
    removeDisconnectedCheckerboard: Boolean(options.removeDisconnectedCheckerboard),
    removeEffectSheetBackground: Boolean(options.removeEffectSheetBackground),
  };
}

function hashFile(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function createAssetRecord(planEntry, outputAbsolutePath, transformResult) {
  const outputMetadata = readImageMetadata(outputAbsolutePath, { scanAlpha: true });

  return {
    id: planEntry.id,
    category: planEntry.category,
    name: planEntry.name,
    promptIndex: planEntry.promptIndex,
    categoryOrdinal: planEntry.categoryOrdinal,
    sourcePath: planEntry.sourcePath,
    outputPath: planEntry.outputPath,
    bytes: outputMetadata.bytes,
    width: outputMetadata.width,
    height: outputMetadata.height,
    hasAlphaChannel: outputMetadata.hasAlphaChannel,
    transparentPixelCount: outputMetadata.transparentPixelCount,
    sha256: outputMetadata.sha256,
    transform: {
      checkerboardRemoved: transformResult.transparentPixelCount > 0,
      removedPixelCount: transformResult.transparentPixelCount,
      removeDisconnectedCheckerboard: transformResult.removeDisconnectedCheckerboard,
      removeEffectSheetBackground: transformResult.removeEffectSheetBackground,
    },
  };
}

module.exports = {
  buildAssetCopyPlan,
  createAssetRecord,
  discoverSourceImages,
  ensureInsideRoot,
  hashFile,
  loadPromptManifest,
  readImageMetadata,
  writeTransparentPng,
};
