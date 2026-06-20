const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const rootDir = path.resolve(__dirname, '..');

test('building era image prompt document covers every building and unlock era', () => {
  const docPath = path.join(rootDir, 'docs', 'BUILDING_ERA_IMAGE_PROMPTS.md');
  assert.ok(fs.existsSync(docPath), 'docs/BUILDING_ERA_IMAGE_PROMPTS.md missing');

  const prompts = fs.readFileSync(docPath, 'utf8');
  const buildings = JSON.parse(fs.readFileSync(path.join(rootDir, 'Assets', 'Data', 'Tables', 'buildings.json'), 'utf8'));
  const eras = ['lv05_village', 'lv10_city', 'lv15_kingdom', 'lv20_empire', 'lv25_golden_empire', 'lv30_capital'];
  const promptHeadings = prompts.match(/^### building_[a-z_]+__lv\d+_[a-z_]+$/gm) || [];

  assert.equal(promptHeadings.length, buildings.length * eras.length);
  assert.match(prompts, /transparent background/);
  assert.match(prompts, /no text, no logo, no UI/);
  assert.match(prompts, /same isometric camera angle/);
  assert.match(prompts, /1024x1024/);

  for (const building of buildings) {
    for (const era of eras) {
      assert.match(prompts, new RegExp(`^### ${building.id}__${era}$`, 'm'), `${building.id} ${era} prompt missing`);
    }
  }
});
