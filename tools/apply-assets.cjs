const fs = require('node:fs');
const path = require('node:path');
const {
  buildAssetCopyPlan,
  createAssetRecord,
  discoverSourceImages,
  ensureInsideRoot,
  loadPromptManifest,
  writeTransparentPng,
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

function fail(message, details = []) {
  console.error(message);
  for (const detail of details.slice(0, 20)) {
    console.error(`- ${detail}`);
  }
  if (details.length > 20) {
    console.error(`- ... ${details.length - 20} more`);
  }
  process.exitCode = 1;
}

function main() {
  const manifest = loadPromptManifest(manifestPath);
  const sources = discoverSourceImages(sourceDir);
  const result = buildAssetCopyPlan(manifest, sources);

  if (result.missing.length > 0 || result.duplicateOutputs.length > 0 || result.duplicateSources.length > 0) {
    fail('Asset copy plan is invalid.', [
      ...result.missing.map((entry) => `missing source for ${entry.id}`),
      ...result.duplicateOutputs.map((outputPath) => `duplicate output ${outputPath}`),
      ...result.duplicateSources.map((sourcePath) => `duplicate source ${sourcePath}`),
    ]);
    return;
  }

  if (result.unusedSources.length > 0) {
    console.warn(`Unused source images: ${result.unusedSources.length}`);
  }

  const records = [];

  for (const [index, entry] of result.plan.entries()) {
    const outputAbsolutePath = ensureInsideRoot(rootDir, entry.outputPath);
    fs.mkdirSync(path.dirname(outputAbsolutePath), { recursive: true });

    if (fs.existsSync(outputAbsolutePath)) {
      fs.rmSync(outputAbsolutePath, { force: true });
    }

    const transformResult = writeTransparentPng(entry.sourceAbsolutePath, outputAbsolutePath, {
      removeDisconnectedCheckerboard: entry.category === 'effect',
      removeEffectSheetBackground: entry.category === 'effect',
    });
    records.push(createAssetRecord(entry, outputAbsolutePath, transformResult));

    if ((index + 1) % 25 === 0 || index + 1 === result.plan.length) {
      console.log(`applied ${index + 1}/${result.plan.length}`);
    }
  }

  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, `${JSON.stringify(records, null, 2)}\n`, 'utf8');

  console.log(
    JSON.stringify(
      {
        applied: records.length,
        reportPath: path.relative(rootDir, reportPath).replace(/\\/g, '/'),
        categories: countByCategory(records),
      },
      null,
      2
    )
  );
}

if (require.main === module) {
  main();
}
