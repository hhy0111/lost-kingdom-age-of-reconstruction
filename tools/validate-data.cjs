const fs = require('node:fs');
const path = require('node:path');
const { FILES } = require('./build-data.cjs');

const rootDir = path.resolve(__dirname, '..');
const tableDir = path.join(rootDir, 'Assets', 'Data', 'Tables');

const EXPECTED_COUNTS = {
  regions: 8,
  monsters: 104,
  bosses: 32,
  heroes: 50,
  equipmentSets: 20,
  equipment: 200,
  buildings: 12,
  currencies: 6,
  adPlacements: 10,
  shopProducts: 7,
  iapProducts: 7,
  purchaseValidationRules: 6,
  monetizationOfferSurfaces: 9,
  monetizationAnalyticsEvents: 30,
  retentionHooks: 12,
  liveEvents: 8,
  storeExperiments: 8,
  analyticsEvents: 28,
};

function readTable(fileName) {
  const filePath = path.join(tableDir, fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing generated table: ${fileName}`);
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function assertUniqueIds(tableName, records) {
  const seen = new Set();
  for (const record of records) {
    if (!record.id) {
      throw new Error(`${tableName} has a record without id`);
    }
    if (seen.has(record.id)) {
      throw new Error(`${tableName} has duplicate id: ${record.id}`);
    }
    seen.add(record.id);
  }
}

function assertCount(tableName, records) {
  const expected = EXPECTED_COUNTS[tableName];
  if (records.length !== expected) {
    throw new Error(`${tableName} count mismatch: ${records.length} !== ${expected}`);
  }
}

function assertReferences(tables) {
  const regionIds = new Set(tables.regions.map((record) => record.id));
  const equipmentSetIds = new Set(tables.equipmentSets.map((record) => record.id));
  const shopProductIds = new Set(tables.shopProducts.map((record) => record.id));
  const monetizationIds = new Set([
    ...tables.adPlacements.map((record) => record.id),
    ...tables.iapProducts.map((record) => record.id),
  ]);

  for (const monster of tables.monsters) {
    if (!regionIds.has(monster.regionId)) {
      throw new Error(`${monster.id} references missing region ${monster.regionId}`);
    }
  }

  for (const boss of tables.bosses) {
    if (!regionIds.has(boss.regionId)) {
      throw new Error(`${boss.id} references missing region ${boss.regionId}`);
    }
  }

  for (const equipment of tables.equipment) {
    if (!equipmentSetIds.has(equipment.setId)) {
      throw new Error(`${equipment.id} references missing set ${equipment.setId}`);
    }
  }

  for (const product of tables.iapProducts) {
    if (!shopProductIds.has(product.shopProductId)) {
      throw new Error(`${product.id} references missing shop product ${product.shopProductId}`);
    }
  }

  for (const surface of tables.monetizationOfferSurfaces) {
    if (!monetizationIds.has(surface.monetizationId)) {
      throw new Error(`${surface.id} references missing monetization id ${surface.monetizationId}`);
    }
  }
}

function main() {
  const tables = {};

  for (const [tableName, fileName] of Object.entries(FILES)) {
    const records = readTable(fileName);
    if (!Array.isArray(records)) {
      throw new Error(`${fileName} must contain a JSON array`);
    }

    assertCount(tableName, records);
    assertUniqueIds(tableName, records);
    tables[tableName] = records;
  }

  assertReferences(tables);
  console.log('DATA VALIDATION PASSED');
}

if (require.main === module) {
  main();
}
