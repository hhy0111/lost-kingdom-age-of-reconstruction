const fs = require('node:fs');
const path = require('node:path');
const { buildSoundManifest } = require('./soundManifest.cjs');

const EXPECTED_COUNTS = {
  BGM: 20,
  Ambience: 12,
  UI: 22,
  Combat: 32,
  Reward: 20,
  Village: 14,
  Hero: 16,
  Shop: 12,
  System: 8,
};

function readJson(rootDir, relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), 'utf8'));
}

function assertFile(rootDir, relativePath, expectedBytes, errors) {
  const filePath = path.join(rootDir, relativePath);
  if (!fs.existsSync(filePath)) {
    errors.push(`missing file: ${relativePath}`);
    return;
  }
  const actualBytes = fs.statSync(filePath).size;
  if (actualBytes !== expectedBytes) {
    errors.push(`${relativePath} size mismatch: ${actualBytes} !== ${expectedBytes}`);
  }
}

function main() {
  const rootDir = path.resolve(__dirname, '..');
  const errors = [];
  const manifest = buildSoundManifest(rootDir);
  const tableManifest = readJson(rootDir, 'Assets/Data/Tables/audio_asset_manifest.json');
  const webManifest = readJson(rootDir, 'web-game/audio-manifest.json');
  const byGroup = {};
  const ids = new Set();

  if (manifest.length !== 156) {
    errors.push(`sound manifest count mismatch: ${manifest.length} !== 156`);
  }
  if (tableManifest.length !== manifest.length) {
    errors.push(`audio_asset_manifest.json count mismatch: ${tableManifest.length} !== ${manifest.length}`);
  }
  if (webManifest.length !== manifest.length) {
    errors.push(`web audio-manifest.json count mismatch: ${webManifest.length} !== ${manifest.length}`);
  }

  for (const entry of manifest) {
    if (ids.has(entry.id)) {
      errors.push(`duplicate sound id: ${entry.id}`);
    }
    ids.add(entry.id);
    byGroup[entry.group] = (byGroup[entry.group] || 0) + 1;
    assertFile(rootDir, entry.sourcePath, entry.bytes, errors);
    assertFile(rootDir, entry.outputPath, entry.bytes, errors);
    assertFile(rootDir, entry.webPath, entry.bytes, errors);
  }

  for (const [group, expected] of Object.entries(EXPECTED_COUNTS)) {
    const actual = byGroup[group] || 0;
    if (actual !== expected) {
      errors.push(`${group} count mismatch: ${actual} !== ${expected}`);
    }
  }

  if (errors.length > 0) {
    console.error('SOUND VALIDATION FAILED');
    for (const error of errors.slice(0, 60)) {
      console.error(`- ${error}`);
    }
    if (errors.length > 60) {
      console.error(`- ... ${errors.length - 60} more`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(JSON.stringify({ verified: manifest.length, groups: byGroup }, null, 2));
}

if (require.main === module) {
  main();
}
