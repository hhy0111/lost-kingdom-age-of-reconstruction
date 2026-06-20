const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const { parsePromptDocument, buildPromptManifest } = require('../tools/promptManifest.cjs');

const rootDir = path.resolve(__dirname, '..');
const promptPath = path.join(rootDir, 'docs', 'IMAGE_PROMPTS.md');
const promptMarkdown = fs.readFileSync(promptPath, 'utf8');

test('buildPromptManifest extracts every completed image prompt', () => {
  const entries = parsePromptDocument(promptMarkdown);
  const manifest = buildPromptManifest(entries);

  assert.equal(manifest.length, 435);
  assert.equal(manifest.filter((entry) => entry.category === 'ui_icon').length, 16);
  assert.equal(manifest.filter((entry) => entry.category === 'currency_icon').length, 6);
  assert.equal(manifest.filter((entry) => entry.category === 'main_hero').length, 3);
  assert.equal(manifest.filter((entry) => entry.category === 'monster').length, 104);
  assert.equal(manifest.filter((entry) => entry.category === 'boss').length, 32);
  assert.equal(manifest.filter((entry) => entry.category === 'equipment').length, 200);
  assert.equal(manifest.filter((entry) => entry.category === 'building').length, 60);
  assert.equal(manifest.filter((entry) => entry.category === 'effect').length, 6);
  assert.equal(manifest.filter((entry) => entry.category === 'environment').length, 8);
});

test('prompt manifest entries have stable ids and output paths', () => {
  const manifest = buildPromptManifest(parsePromptDocument(promptMarkdown));
  const ids = new Set(manifest.map((entry) => entry.id));

  assert.equal(ids.size, manifest.length);
  assert.equal(manifest[0].id, 'ui_icon_001');
  assert.equal(manifest[0].outputPath, 'Assets/Art/UI/ui_icon_001.png');

  for (const entry of manifest) {
    assert.ok(entry.name.length > 0);
    assert.ok(entry.prompt.length > 0);
    assert.ok(entry.outputPath.startsWith('Assets/Art/'));
    assert.doesNotMatch(entry.prompt, /\[[a-z_ ]+\]/i);
  }
});
