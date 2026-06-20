const fs = require('node:fs');
const path = require('node:path');

function loadJson(rootDir, relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), 'utf8'));
}

function assetUrl(outputPath) {
  return `/${outputPath.replace(/\\/g, '/')}`;
}

function categoryAssets(manifest, category) {
  return manifest
    .filter((asset) => asset.category === category)
    .map((asset) => ({
      id: asset.id,
      name: asset.name,
      category: asset.category,
      assetUrl: assetUrl(asset.outputPath),
      width: asset.width,
      height: asset.height,
    }));
}

function attachAssets(records, assets) {
  return records.map((record, index) => ({
    ...record,
    assetUrl: assets[index % Math.max(1, assets.length)]?.assetUrl || '',
  }));
}

function buildLoginRewards() {
  return Array.from({ length: 30 }, (_, index) => {
    const day = index + 1;
    const reward = {
      day,
      gold: 1200 * day,
      diamond: day % 5 === 0 ? 120 : 35,
      food: 300 + day * 40,
      wood: 240 + day * 35,
      ore: 120 + day * 20,
      magicStone: day % 3 === 0 ? 15 + day : 5,
      label: `${day}일차 보급`,
    };

    if (day === 7) {
      reward.label = '7일 왕국 재건 기념 보급';
      reward.specialItemId = 'founder_relic_day_7';
      reward.specialItemName = '창건자의 성유물';
      reward.diamond = 500;
      reward.magicStone = 180;
    }

    if (day === 30) {
      reward.label = '30일 제국 선포 보급';
      reward.specialItemId = 'imperial_crown_day_30';
      reward.specialItemName = '제국의 왕관';
      reward.diamond = 1800;
      reward.magicStone = 700;
    }

    return reward;
  });
}

function buildRuntimeData(rootDir) {
  const tableDir = 'Assets/Data/Tables';
  const imageManifest = loadJson(rootDir, `${tableDir}/image_asset_manifest.json`);
  const regions = loadJson(rootDir, `${tableDir}/regions.json`);
  const monsters = loadJson(rootDir, `${tableDir}/monsters.json`);
  const bosses = loadJson(rootDir, `${tableDir}/bosses.json`);
  const heroes = loadJson(rootDir, `${tableDir}/heroes.json`);
  const equipment = loadJson(rootDir, `${tableDir}/equipment.json`);
  const buildings = loadJson(rootDir, `${tableDir}/buildings.json`);
  const adPlacements = loadJson(rootDir, `${tableDir}/ad_placements.json`);
  const shopProducts = loadJson(rootDir, `${tableDir}/shop_products.json`);
  const iapProducts = loadJson(rootDir, `${tableDir}/iap_products.json`);

  const heroAssets = categoryAssets(imageManifest, 'main_hero');
  const monsterAssets = categoryAssets(imageManifest, 'monster');
  const bossAssets = categoryAssets(imageManifest, 'boss');
  const buildingAssets = categoryAssets(imageManifest, 'building');
  const equipmentAssets = categoryAssets(imageManifest, 'equipment');
  const currencyAssets = categoryAssets(imageManifest, 'currency_icon');
  const uiAssets = categoryAssets(imageManifest, 'ui_icon');
  const environmentAssets = categoryAssets(imageManifest, 'environment');
  const effectAssets = categoryAssets(imageManifest, 'effect');

  return {
    project: {
      title: '잃어버린 왕국 : 재건의 시대',
      subtitle: '왕국을 재건하는 세로형 방치 RPG',
      orientation: 'portrait',
      saveKey: 'lost-kingdom-runtime-save-v1',
    },
    navigation: [
      { id: 'village', label: '마을', icon: uiAssets[0]?.assetUrl || '' },
      { id: 'combat', label: '전투', icon: uiAssets[1]?.assetUrl || '' },
      { id: 'heroes', label: '영웅', icon: uiAssets[2]?.assetUrl || '' },
      { id: 'equipment', label: '장비', icon: uiAssets[3]?.assetUrl || '' },
      { id: 'shop', label: '상점', icon: uiAssets[4]?.assetUrl || '' },
      { id: 'settings', label: '설정', icon: uiAssets[5]?.assetUrl || uiAssets[0]?.assetUrl || '' },
    ],
    assets: {
      heroes: heroAssets,
      monsters: monsterAssets,
      bosses: bossAssets,
      buildings: buildingAssets,
      equipment: equipmentAssets,
      currencies: currencyAssets,
      ui: uiAssets,
      environments: environmentAssets,
      effects: effectAssets,
    },
    regions,
    monsters: attachAssets(monsters, monsterAssets),
    bosses: attachAssets(bosses, bossAssets),
    heroRoster: attachAssets(heroes, heroAssets),
    equipment: attachAssets(equipment, equipmentAssets),
    buildings: attachAssets(buildings, buildingAssets),
    economy: {
      baseOfflineGoldPerHour: 4200,
      offlineHourCap: 8,
      battleGoldBase: 130,
      battleExpBase: 26,
    },
    shop: {
      adPlacements,
      shopProducts,
      iapProducts,
    },
    retention: {
      loginRewards: buildLoginRewards(),
      weeklyOrderTargets: [
        { id: 'battle_100', label: '전투 100회 승리', target: 100, rewardDiamond: 250 },
        { id: 'building_10', label: '건물 10회 강화', target: 10, rewardDiamond: 180 },
        { id: 'equipment_30', label: '장비 30개 획득', target: 30, rewardDiamond: 220 },
      ],
      comeback: {
        afterDays: 3,
        diamond: 300,
        goldMultiplier: 6,
      },
    },
  };
}

if (require.main === module) {
  const rootDir = path.resolve(__dirname, '..');
  const outputDir = path.join(rootDir, 'web-game');
  fs.mkdirSync(outputDir, { recursive: true });
  const data = buildRuntimeData(rootDir);
  fs.writeFileSync(path.join(outputDir, 'runtime-data.json'), `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(`runtime-data.json: ${data.assets.monsters.length} monsters, ${data.assets.equipment.length} equipment assets`);
}

module.exports = {
  assetUrl,
  buildRuntimeData,
  categoryAssets,
};
