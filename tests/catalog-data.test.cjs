const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const { parseCatalog, buildTables } = require('../tools/catalogData.cjs');

const rootDir = path.resolve(__dirname, '..');
const catalogPath = path.join(rootDir, 'docs', 'CONTENT_CATALOG.md');
const catalogMarkdown = fs.readFileSync(catalogPath, 'utf8');

test('buildTables creates the required design data counts', () => {
  const parsed = parseCatalog(catalogMarkdown);
  const tables = buildTables(parsed);

  assert.equal(tables.regions.length, 8);
  assert.equal(tables.monsters.length, 104);
  assert.equal(tables.bosses.length, 32);
  assert.equal(tables.heroes.length, 50);
  assert.equal(tables.equipmentSets.length, 20);
  assert.equal(tables.equipment.length, 200);
  assert.equal(tables.buildings.length, 12);
  assert.equal(tables.currencies.length, 6);
  assert.equal(tables.adPlacements.length, 10);
  assert.equal(tables.shopProducts.length, 7);
});

test('generated combat content uses stable ids and valid region references', () => {
  const parsed = parseCatalog(catalogMarkdown);
  const tables = buildTables(parsed);
  const regionIds = new Set(tables.regions.map((region) => region.id));

  assert.equal(tables.regions[0].id, 'region_grassland');
  assert.equal(tables.monsters[0].id, 'monster_001');
  assert.equal(tables.bosses[0].id, 'boss_001');
  assert.equal(tables.heroes[0].id, 'hero_001');
  assert.equal(tables.equipment[0].id, 'equipment_001');

  for (const monster of tables.monsters) {
    assert.ok(regionIds.has(monster.regionId), `${monster.id} has invalid regionId`);
  }

  for (const boss of tables.bosses) {
    assert.ok(regionIds.has(boss.regionId), `${boss.id} has invalid regionId`);
  }
});

test('equipment items keep their set references and slot order', () => {
  const parsed = parseCatalog(catalogMarkdown);
  const tables = buildTables(parsed);
  const setIds = new Set(tables.equipmentSets.map((set) => set.id));
  const firstSetItems = tables.equipment.filter((item) => item.setId === 'equipment_set_001');

  assert.deepEqual(
    firstSetItems.map((item) => item.slot),
    ['weapon', 'helmet', 'armor', 'gloves', 'boots', 'necklace', 'ring', 'cloak', 'belt', 'artifact']
  );

  for (const item of tables.equipment) {
    assert.ok(setIds.has(item.setId), `${item.id} has invalid setId`);
  }
});
