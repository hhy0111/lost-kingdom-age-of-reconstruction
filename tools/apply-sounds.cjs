const fs = require('node:fs');
const path = require('node:path');
const { buildSoundManifest } = require('./soundManifest.cjs');

function copyFile(rootDir, sourcePath, targetPath) {
  const source = path.join(rootDir, sourcePath);
  const target = path.join(rootDir, targetPath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function writeJson(rootDir, relativePath, value) {
  const target = path.join(rootDir, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function main() {
  const rootDir = path.resolve(__dirname, '..');
  const manifest = buildSoundManifest(rootDir);

  for (const entry of manifest) {
    copyFile(rootDir, entry.sourcePath, entry.outputPath);
    copyFile(rootDir, entry.sourcePath, entry.webPath);
  }

  const tableManifest = manifest.map((entry) => ({
    id: entry.id,
    promptId: entry.promptId,
    group: entry.group,
    fileName: entry.fileName,
    outputPath: entry.outputPath,
    webPath: entry.webPath,
    webUrl: entry.webUrl,
    loop: entry.loop,
    use: entry.use,
    bytes: entry.bytes,
  }));

  writeJson(rootDir, 'Assets/Data/Tables/audio_asset_manifest.json', tableManifest);
  writeJson(rootDir, 'web-game/audio-manifest.json', tableManifest.map((entry) => ({
    id: entry.id,
    group: entry.group,
    url: entry.webUrl,
    loop: entry.loop,
    use: entry.use,
  })));

  const groups = tableManifest.reduce((acc, entry) => {
    acc[entry.group] = (acc[entry.group] || 0) + 1;
    return acc;
  }, {});
  console.log(JSON.stringify({ copied: tableManifest.length, groups }, null, 2));
}

if (require.main === module) {
  main();
}
