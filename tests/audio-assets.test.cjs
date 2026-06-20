const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const { buildSoundManifest } = require('../tools/soundManifest.cjs');

const rootDir = path.resolve(__dirname, '..');

test('sound prompt outputs map to available source files and shipped web audio', () => {
  const manifest = buildSoundManifest(rootDir);

  assert.equal(manifest.length, 156);
  assert.equal(manifest.filter((entry) => entry.group === 'BGM').length, 20);
  assert.equal(manifest.filter((entry) => entry.group === 'Ambience').length, 12);
  assert.equal(manifest.filter((entry) => entry.group === 'UI').length, 22);
  assert.equal(manifest.filter((entry) => entry.group === 'Combat').length, 32);
  assert.equal(manifest.filter((entry) => entry.group === 'Reward').length, 20);
  assert.equal(manifest.filter((entry) => entry.group === 'Village').length, 14);
  assert.equal(manifest.filter((entry) => entry.group === 'Hero').length, 16);
  assert.equal(manifest.filter((entry) => entry.group === 'Shop').length, 12);
  assert.equal(manifest.filter((entry) => entry.group === 'System').length, 8);

  for (const entry of manifest) {
    assert.ok(fs.existsSync(path.join(rootDir, entry.sourcePath)), `${entry.sourcePath} missing`);
    assert.ok(fs.existsSync(path.join(rootDir, entry.outputPath)), `${entry.outputPath} missing`);
    assert.ok(fs.existsSync(path.join(rootDir, entry.webPath)), `${entry.webPath} missing`);
    assert.match(entry.webUrl, /^audio\//);
  }
});

test('web game runtime exposes audio manager hooks and sound manifest', () => {
  const appPath = path.join(rootDir, 'web-game', 'app.js');
  const swPath = path.join(rootDir, 'web-game', 'sw.js');
  const audioManifestPath = path.join(rootDir, 'web-game', 'audio-manifest.json');
  const app = fs.readFileSync(appPath, 'utf8');
  const serviceWorker = fs.readFileSync(swPath, 'utf8');
  const audioManifest = JSON.parse(fs.readFileSync(audioManifestPath, 'utf8'));

  assert.equal(audioManifest.length, 156);
  assert.match(app, /createAudioManager/);
  assert.match(app, /audio-manifest\.json/);
  assert.match(app, /setSoundEnabled/);
  assert.match(app, /audioManager\?\.setEnabled/);
  assert.match(app, /enabled/);
  assert.match(app, /function isCombatSceneAudioActive\(\)/);
  assert.match(app, /function playCombatSfx\(/);
  assert.match(app, /function playCombatSfxThrottled\(/);
  assert.match(app, /playSfx\('ui_tap_confirm_01'\)/);
  assert.match(app, /playCombatSfx\('combat_skill_impact'\)/);
  assert.match(app, /playSfx\('reward_daily_claim'\)/);
  assert.match(app, /playSfx\('purchase_success'\)/);
  assert.match(app, /setBgmForContext/);
  assert.match(serviceWorker, /lost-kingdom-runtime-v26/);
  assert.match(serviceWorker, /audio-manifest\.json/);
});
