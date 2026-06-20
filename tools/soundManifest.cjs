const fs = require('node:fs');
const path = require('node:path');

const PROMPT_PATH = path.join('docs', 'SOUND_PROMPTS.md');
const SOURCE_DIR = path.join('sound', 'SOUND_PROMPTS');

function normalizeSlash(value) {
  return value.replace(/\\/g, '/');
}

function parseMarkdownRow(line) {
  return line
    .split('|')
    .slice(1, -1)
    .map((value) => value.trim());
}

function groupFromOutputPath(outputPath) {
  const parts = normalizeSlash(outputPath).split('/');
  if (parts[2] === 'BGM') return 'BGM';
  if (parts[2] === 'Ambience') return 'Ambience';
  if (parts[2] === 'SFX') return parts[3] || 'Unknown';
  return 'Unknown';
}

function idFromFileName(fileName) {
  return path.basename(fileName, path.extname(fileName));
}

function findSourceFile(sourceFiles, outputPath) {
  const baseName = path.basename(outputPath);
  const match = sourceFiles.find((fileName) => fileName.endsWith(`-${baseName}`));
  if (!match) {
    throw new Error(`Missing generated source sound for ${baseName}`);
  }
  return match;
}

function parseSoundPromptRows(markdown) {
  return markdown
    .split(/\r?\n/)
    .filter((line) => line.startsWith('| '))
    .map(parseMarkdownRow)
    .filter((columns) => columns.length >= 5)
    .filter((columns) => columns[1].startsWith('Assets/Audio/'));
}

function buildSoundManifest(rootDir) {
  const promptText = fs.readFileSync(path.join(rootDir, PROMPT_PATH), 'utf8');
  const sourceDir = path.join(rootDir, SOURCE_DIR);
  const sourceFiles = fs.readdirSync(sourceDir).filter((fileName) => /\.wav$/i.test(fileName));

  return parseSoundPromptRows(promptText).map(([promptId, outputPath, length, loop, use]) => {
    const normalizedOutput = normalizeSlash(outputPath);
    const fileName = path.basename(normalizedOutput);
    const sourceFile = findSourceFile(sourceFiles, normalizedOutput);
    const sourcePath = normalizeSlash(path.join(SOURCE_DIR, sourceFile));
    const webPath = normalizeSlash(path.join('web-game', 'audio', normalizedOutput.replace(/^Assets\/Audio\//, '')));
    const sourceStat = fs.statSync(path.join(rootDir, sourcePath));

    return {
      promptId,
      id: idFromFileName(fileName),
      fileName,
      group: groupFromOutputPath(normalizedOutput),
      outputPath: normalizedOutput,
      sourcePath,
      webPath,
      webUrl: normalizeSlash(webPath.replace(/^web-game\//, '')),
      length,
      loop: /^yes$/i.test(loop),
      use,
      bytes: sourceStat.size,
    };
  });
}

module.exports = {
  buildSoundManifest,
  groupFromOutputPath,
  parseSoundPromptRows,
};
