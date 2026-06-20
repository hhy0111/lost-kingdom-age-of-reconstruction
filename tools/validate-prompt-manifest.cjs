const fs = require('node:fs');
const { outputPath } = require('./build-prompt-manifest.cjs');

const EXPECTED_COUNTS = {
  ui_icon: 16,
  currency_icon: 6,
  main_hero: 3,
  monster: 104,
  boss: 32,
  equipment: 200,
  building: 60,
  effect: 6,
  environment: 8,
};

function main() {
  if (!fs.existsSync(outputPath)) {
    throw new Error(`Missing prompt manifest: ${outputPath}`);
  }

  const manifest = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
  const ids = new Set();
  const counts = new Map();

  for (const entry of manifest) {
    if (!entry.id || !entry.category || !entry.name || !entry.prompt || !entry.outputPath) {
      throw new Error(`Invalid prompt manifest entry: ${JSON.stringify(entry)}`);
    }
    if (ids.has(entry.id)) {
      throw new Error(`Duplicate prompt id: ${entry.id}`);
    }
    if (/\[[a-z_ ]+\]/i.test(entry.prompt)) {
      throw new Error(`Prompt still contains a placeholder token: ${entry.id}`);
    }

    ids.add(entry.id);
    counts.set(entry.category, (counts.get(entry.category) || 0) + 1);
  }

  for (const [category, expected] of Object.entries(EXPECTED_COUNTS)) {
    const actual = counts.get(category) || 0;
    if (actual !== expected) {
      throw new Error(`${category} count mismatch: ${actual} !== ${expected}`);
    }
  }

  if (manifest.length !== 435) {
    throw new Error(`Total prompt count mismatch: ${manifest.length} !== 435`);
  }

  console.log('PROMPT MANIFEST VALIDATION PASSED');
}

if (require.main === module) {
  main();
}
