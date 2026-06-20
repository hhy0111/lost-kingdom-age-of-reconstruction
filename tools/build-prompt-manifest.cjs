const fs = require('node:fs');
const path = require('node:path');
const { parsePromptDocument, buildPromptManifest } = require('./promptManifest.cjs');

const rootDir = path.resolve(__dirname, '..');
const promptPath = path.join(rootDir, 'docs', 'IMAGE_PROMPTS.md');
const outputDir = path.join(rootDir, 'prompts');
const outputPath = path.join(outputDir, 'image_prompt_manifest.json');

function main() {
  const markdown = fs.readFileSync(promptPath, 'utf8');
  const manifest = buildPromptManifest(parsePromptDocument(markdown));

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  console.log(`image_prompt_manifest.json: ${manifest.length}`);
}

if (require.main === module) {
  main();
}

module.exports = {
  outputPath,
};
