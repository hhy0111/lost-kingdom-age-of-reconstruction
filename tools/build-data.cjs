const fs = require('node:fs');
const path = require('node:path');
const { parseCatalog, buildTables } = require('./catalogData.cjs');

const rootDir = path.resolve(__dirname, '..');
const catalogPath = path.join(rootDir, 'docs', 'CONTENT_CATALOG.md');
const outputDir = path.join(rootDir, 'Assets', 'Data', 'Tables');

const FILES = {
  regions: 'regions.json',
  monsters: 'monsters.json',
  bosses: 'bosses.json',
  heroes: 'heroes.json',
  equipmentSets: 'equipment_sets.json',
  equipment: 'equipment.json',
  buildings: 'buildings.json',
  currencies: 'currencies.json',
  adPlacements: 'ad_placements.json',
  shopProducts: 'shop_products.json',
  iapProducts: 'iap_products.json',
  purchaseValidationRules: 'purchase_validation_rules.json',
  monetizationOfferSurfaces: 'monetization_offer_surfaces.json',
  monetizationAnalyticsEvents: 'monetization_analytics_events.json',
  retentionHooks: 'retention_hooks.json',
  liveEvents: 'live_events.json',
  storeExperiments: 'store_experiments.json',
  analyticsEvents: 'analytics_events.json',
};

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function main() {
  const markdown = fs.readFileSync(catalogPath, 'utf8');
  const tables = buildTables(parseCatalog(markdown));

  fs.mkdirSync(outputDir, { recursive: true });

  for (const [key, fileName] of Object.entries(FILES)) {
    const records = tables[key];
    if (!Array.isArray(records)) {
      throw new Error(`Table ${key} is not an array`);
    }

    writeJson(path.join(outputDir, fileName), records);
    console.log(`${fileName}: ${records.length}`);
  }
}

if (require.main === module) {
  main();
}

module.exports = { FILES };
