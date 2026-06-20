const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const {
  buildAssetCopyPlan,
  discoverSourceImages,
  loadPromptManifest,
  readImageMetadata,
  writeTransparentPng,
} = require('../tools/assetManifest.cjs');

const rootDir = path.resolve(__dirname, '..');
const sourceDir = path.join(rootDir, 'image');
const manifestPath = path.join(rootDir, 'prompts', 'image_prompt_manifest.json');

function sourceBasenameFor(plan, id) {
  const entry = plan.find((item) => item.id === id);
  assert.ok(entry, `missing plan item ${id}`);
  return path.basename(entry.sourceAbsolutePath);
}

test('generated image files map onto every prompt manifest entry', { skip: !fs.existsSync(sourceDir) }, () => {
  const manifest = loadPromptManifest(manifestPath);
  const sources = discoverSourceImages(sourceDir);
  const result = buildAssetCopyPlan(manifest, sources);

  assert.equal(result.plan.length, 435);
  assert.deepEqual(result.missing.map((entry) => entry.id), []);
  assert.deepEqual(result.unusedSources.map((source) => source.basename), []);
  assert.deepEqual(result.duplicateOutputs, []);

  assert.equal(sourceBasenameFor(result.plan, 'ui_icon_001'), '02-item-02.png');
  assert.equal(sourceBasenameFor(result.plan, 'ui_icon_016'), '17-item-17.png');
  assert.equal(sourceBasenameFor(result.plan, 'currency_icon_006'), '23-item-23.png');
  assert.equal(sourceBasenameFor(result.plan, 'main_hero_003'), '26-item-26.png');
  assert.equal(sourceBasenameFor(result.plan, 'monster_001'), '01-item-27.png');
  assert.equal(sourceBasenameFor(result.plan, 'equipment_200'), '200-item-362.png');
  assert.equal(sourceBasenameFor(result.plan, 'building_001'), '01-lv1.png');
  assert.equal(sourceBasenameFor(result.plan, 'building_060'), '60-lv5.png');
  assert.equal(sourceBasenameFor(result.plan, 'effect_001'), '423-item-423.png');
  assert.equal(sourceBasenameFor(result.plan, 'environment_008'), '436-item-436.png');
});

test('source images expose the checkerboard issue that the apply step must fix', {
  skip: !fs.existsSync(sourceDir),
}, () => {
  const samplePath = path.join(sourceDir, 'IMAGE_PROMPTS_20260614', '02-item-02.png');
  const metadata = readImageMetadata(samplePath);

  assert.equal(metadata.format, 'png');
  assert.equal(metadata.width, 1254);
  assert.equal(metadata.height, 1254);
  assert.equal(metadata.hasAlphaChannel, false);
});

test('effect sprite sheets can remove disconnected checkerboard cells', {
  skip: !fs.existsSync(sourceDir),
}, () => {
  const samplePath = path.join(sourceDir, 'IMAGE_PROMPTS_20260614', '423-item-423.png');
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'lost-kingdom-assets-'));
  const outputPath = path.join(tempDir, 'effect_001.png');

  writeTransparentPng(samplePath, outputPath, {
    removeDisconnectedCheckerboard: true,
    removeEffectSheetBackground: true,
  });
  const metadata = readImageMetadata(outputPath, { scanAlpha: true });

  assert.equal(metadata.hasAlphaChannel, true);
  assert.ok(metadata.transparentPixelCount > 900000, 'internal sprite-sheet checkerboard was not removed');
});
