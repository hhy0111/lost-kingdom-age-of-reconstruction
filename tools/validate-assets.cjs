const fs = require('node:fs');
const path = require('node:path');
const {
  buildAssetCopyPlan,
  discoverSourceImages,
  ensureInsideRoot,
  loadPromptManifest,
  readImageMetadata,
} = require('./assetManifest.cjs');

const rootDir = path.resolve(__dirname, '..');
const sourceDir = path.join(rootDir, 'image');
const manifestPath = path.join(rootDir, 'prompts', 'image_prompt_manifest.json');
const reportPath = path.join(rootDir, 'Assets', 'Data', 'Tables', 'image_asset_manifest.json');

function countByCategory(records) {
  return records.reduce((counts, record) => {
    counts[record.category] = (counts[record.category] || 0) + 1;
    return counts;
  }, {});
}

function main() {
  const manifest = loadPromptManifest(manifestPath);
  const sources = discoverSourceImages(sourceDir);
  const result = buildAssetCopyPlan(manifest, sources);
  const errors = [];

  if (result.missing.length > 0) {
    errors.push(...result.missing.map((entry) => `missing source for ${entry.id}`));
  }
  if (result.duplicateOutputs.length > 0) {
    errors.push(...result.duplicateOutputs.map((outputPath) => `duplicate output ${outputPath}`));
  }
  if (result.duplicateSources.length > 0) {
    errors.push(...result.duplicateSources.map((sourcePath) => `duplicate source ${sourcePath}`));
  }
  if (result.unusedSources.length > 0) {
    errors.push(...result.unusedSources.map((source) => `unused source ${source.basename}`));
  }

  const report = fs.existsSync(reportPath) ? JSON.parse(fs.readFileSync(reportPath, 'utf8')) : [];
  const reportById = new Map(report.map((record) => [record.id, record]));
  const verified = [];

  for (const entry of result.plan) {
    const outputAbsolutePath = ensureInsideRoot(rootDir, entry.outputPath);
    if (!fs.existsSync(outputAbsolutePath)) {
      errors.push(`missing output ${entry.outputPath}`);
      continue;
    }

    const sourceMetadata = readImageMetadata(entry.sourceAbsolutePath);
    const outputMetadata = readImageMetadata(outputAbsolutePath, { scanAlpha: true });

    if (outputMetadata.format !== 'png') {
      errors.push(`${entry.id} output is not PNG`);
    }
    if (sourceMetadata.width !== outputMetadata.width || sourceMetadata.height !== outputMetadata.height) {
      errors.push(`${entry.id} dimensions changed from source`);
    }
    if (!outputMetadata.hasAlphaChannel) {
      errors.push(`${entry.id} output has no alpha channel`);
    }
    if (!outputMetadata.transparentPixelCount || outputMetadata.transparentPixelCount <= 0) {
      errors.push(`${entry.id} output has no transparent pixels`);
    }

    const reportRecord = reportById.get(entry.id);
    if (!reportRecord) {
      errors.push(`${entry.id} missing from image_asset_manifest.json`);
    } else if (reportRecord.sha256 !== outputMetadata.sha256) {
      errors.push(`${entry.id} report sha256 does not match output file`);
    }

    verified.push({
      id: entry.id,
      category: entry.category,
      outputPath: entry.outputPath,
      transparentPixelCount: outputMetadata.transparentPixelCount,
    });
  }

  if (report.length !== manifest.length) {
    errors.push(`image_asset_manifest.json has ${report.length} records, expected ${manifest.length}`);
  }

  if (errors.length > 0) {
    console.error('Asset validation failed.');
    for (const error of errors.slice(0, 40)) {
      console.error(`- ${error}`);
    }
    if (errors.length > 40) {
      console.error(`- ... ${errors.length - 40} more`);
    }
    process.exit(1);
  }

  console.log(
    JSON.stringify(
      {
        verified: verified.length,
        categories: countByCategory(verified),
        reportPath: path.relative(rootDir, reportPath).replace(/\\/g, '/'),
      },
      null,
      2
    )
  );
}

if (require.main === module) {
  main();
}
