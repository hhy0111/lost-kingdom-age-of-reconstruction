const fs = require('node:fs');
const path = require('node:path');
const { buildPreviewData } = require('./webPreviewData.cjs');

const rootDir = path.resolve(__dirname, '..');
const outputDir = path.join(rootDir, 'web-preview');
const outputPath = path.join(outputDir, 'preview-data.json');

function main() {
  const data = buildPreviewData(rootDir);

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

  console.log(`preview-data.json: ${data.completion.assets.applied} assets`);
}

if (require.main === module) {
  main();
}

module.exports = {
  outputPath,
};
