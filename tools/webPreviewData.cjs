const fs = require('node:fs');
const path = require('node:path');

function loadJson(rootDir, relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), 'utf8'));
}

function assetUrl(outputPath) {
  return `/${outputPath.replace(/\\/g, '/')}`;
}

function byCategory(records) {
  return records.reduce((counts, record) => {
    counts[record.category] = (counts[record.category] || 0) + 1;
    return counts;
  }, {});
}

function takeCategoryAssets(records, category, limit) {
  return records
    .filter((record) => record.category === category)
    .slice(0, limit)
    .map((record) => ({
      id: record.id,
      name: record.name,
      category: record.category,
      assetUrl: assetUrl(record.outputPath),
      width: record.width,
      height: record.height,
      transparentPixelCount: record.transparentPixelCount,
    }));
}

function zipContentWithAssets(content, assets) {
  return content.map((item, index) => ({
    ...item,
    assetUrl: assets[index]?.assetUrl || null,
  }));
}

function buildPreviewData(rootDir) {
  const tablesDir = 'Assets/Data/Tables';
  const imageAssets = loadJson(rootDir, `${tablesDir}/image_asset_manifest.json`);
  const regions = loadJson(rootDir, `${tablesDir}/regions.json`);
  const monsters = loadJson(rootDir, `${tablesDir}/monsters.json`);
  const bosses = loadJson(rootDir, `${tablesDir}/bosses.json`);
  const heroes = loadJson(rootDir, `${tablesDir}/heroes.json`);
  const equipment = loadJson(rootDir, `${tablesDir}/equipment.json`);
  const buildings = loadJson(rootDir, `${tablesDir}/buildings.json`);
  const currencies = loadJson(rootDir, `${tablesDir}/currencies.json`);
  const adPlacements = loadJson(rootDir, `${tablesDir}/ad_placements.json`);
  const shopProducts = loadJson(rootDir, `${tablesDir}/shop_products.json`);
  const iapProducts = loadJson(rootDir, `${tablesDir}/iap_products.json`);
  const retentionHooks = loadJson(rootDir, `${tablesDir}/retention_hooks.json`);
  const liveEvents = loadJson(rootDir, `${tablesDir}/live_events.json`);
  const storeExperiments = loadJson(rootDir, `${tablesDir}/store_experiments.json`);
  const analyticsEvents = loadJson(rootDir, `${tablesDir}/analytics_events.json`);
  const monetizationEvents = loadJson(rootDir, `${tablesDir}/monetization_analytics_events.json`);

  const categories = byCategory(imageAssets);
  const buildingAssets = takeCategoryAssets(imageAssets, 'building', 60);
  const monsterAssets = takeCategoryAssets(imageAssets, 'monster', 104);
  const bossAssets = takeCategoryAssets(imageAssets, 'boss', 32);
  const heroStageAssets = takeCategoryAssets(imageAssets, 'main_hero', 3);
  const equipmentAssets = takeCategoryAssets(imageAssets, 'equipment', 200);

  return {
    project: {
      title: '잃어버린 왕국 : 재건의 시대',
      subtitle: '고전 RPG 감성의 세로형 모바일 방치 RPG',
      orientation: 'portrait-mobile',
      buildTarget: 'Android / iOS',
      playMode: 'single-player-first',
    },
    completion: {
      assets: {
        applied: imageAssets.length,
        categories,
      },
      content: {
        regions: regions.length,
        monsters: monsters.length,
        bosses: bosses.length,
        heroes: heroes.length,
        equipment: equipment.length,
        buildingTypes: buildings.length,
        buildingAssetLevels: categories.building || 0,
        currencies: currencies.length,
        liveEvents: liveEvents.length,
        analyticsEvents: analyticsEvents.length + monetizationEvents.length,
      },
    },
    navigation: [
      { id: 'village', label: '마을', icon: '/Assets/Art/UI/ui_icon_001.png' },
      { id: 'combat', label: '전투', icon: '/Assets/Art/UI/ui_icon_002.png' },
      { id: 'heroes', label: '영웅', icon: '/Assets/Art/UI/ui_icon_003.png' },
      { id: 'equipment', label: '장비', icon: '/Assets/Art/UI/ui_icon_004.png' },
      { id: 'shop', label: '상점', icon: '/Assets/Art/UI/ui_icon_005.png' },
    ],
    featured: {
      village: buildingAssets.slice(0, 8),
      combat: {
        regions: regions.slice(0, 8),
        monsters: zipContentWithAssets(monsters.slice(0, 8), monsterAssets.slice(0, 8)),
        bosses: zipContentWithAssets(bosses.slice(0, 4), bossAssets.slice(0, 4)),
        environments: takeCategoryAssets(imageAssets, 'environment', 8),
      },
      heroes: {
        stages: heroStageAssets,
        roster: heroes.slice(0, 12),
      },
      equipment: zipContentWithAssets(equipment.slice(0, 12), equipmentAssets.slice(0, 12)),
      effects: takeCategoryAssets(imageAssets, 'effect', 6),
      ui: takeCategoryAssets(imageAssets, 'ui_icon', 16),
    },
    economy: {
      currencies: zipContentWithAssets(currencies, takeCategoryAssets(imageAssets, 'currency_icon', 6)),
    },
    monetization: {
      ads: {
        total: adPlacements.length,
        forcedAds: adPlacements.filter((placement) => placement.isForced).length,
        placements: adPlacements,
      },
      shopProducts,
      iapProducts,
    },
    retention: {
      hooks: retentionHooks,
      liveEvents,
      storeExperiments,
    },
  };
}

module.exports = {
  assetUrl,
  buildPreviewData,
  byCategory,
  loadJson,
  takeCategoryAssets,
};
