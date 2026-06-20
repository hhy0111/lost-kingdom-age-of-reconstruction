const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const rootDir = path.resolve(__dirname, '..');

const { buildRuntimeData } = require('../tools/build-runtime-data.cjs');
const runtime = require('../web-game/runtime-core.js');

const NOW = Date.UTC(2026, 5, 17, 12, 0, 0);
const DAY = 24 * 60 * 60 * 1000;

function makeData() {
  return buildRuntimeData(rootDir);
}

function makeGame() {
  return runtime.createNewGame(makeData(), { now: NOW, seed: 315 });
}

test('runtime data exposes launch-ready playable content and long-term rewards', () => {
  const data = makeData();

  assert.equal(data.project.title, '잃어버린 왕국 : 재건의 시대');
  assert.deepEqual(data.navigation.map((tab) => tab.id), ['village', 'combat', 'heroes', 'equipment', 'shop']);
  assert.ok(data.assets.heroes.length >= 3);
  assert.ok(data.assets.monsters.length >= 24);
  assert.ok(data.assets.bosses.length >= 8);
  assert.ok(data.assets.buildings.length >= 60);
  assert.ok(data.assets.equipment.length >= 120);
  assert.equal(data.regions.length, 8);
  assert.equal(data.heroRoster.length, 50);
  assert.equal(data.shop.iapProducts.length, 7);
  assert.equal(data.shop.adPlacements.every((ad) => ad.isForced === false), true);
  assert.ok(data.retention.loginRewards.some((reward) => reward.day === 7 && reward.specialItemId));
  assert.ok(data.retention.loginRewards.some((reward) => reward.day === 30 && reward.specialItemId));
});

test('new game starts as a real playable combat session with persistent progression state', () => {
  const data = makeData();
  const state = runtime.createNewGame(data, { now: NOW, seed: 315 });

  assert.equal(state.saveVersion, 1);
  assert.equal(state.activeTab, 'combat');
  assert.equal(state.combat.stage, 1);
  assert.equal(state.combat.enemy.alive, true);
  assert.ok(state.combat.enemy.hp > 0);
  assert.ok(state.resources.gold >= 1000);
  assert.ok(state.heroes.owned.length >= 3);
  assert.ok(state.village.buildings.length >= 12);
  assert.equal(state.retention.loginStreak, 1);
  assert.equal(typeof runtime.serializeGame(state), 'string');
});

test('combat advances automatically, kills enemies, grants rewards, and spawns bosses', () => {
  const data = makeData();
  const state = runtime.createNewGame(data, { now: NOW, seed: 315 });
  const firstEnemyHp = state.combat.enemy.hp;

  runtime.advanceTime(state, data, 1500);
  assert.ok(state.combat.enemy.hp < firstEnemyHp);
  assert.ok(state.heroes.owned[0].skillCharge > 0);
  assert.ok(state.combat.floaters.length > 0);

  runtime.advanceTime(state, data, 45000);
  assert.ok(state.combat.stage > 1);
  assert.ok(state.resources.gold > 1000);
  assert.ok(state.progress.enemiesDefeated > 0);
  assert.ok(state.inventory.equipment.length > 0);

  state.combat.stage = 9;
  state.combat.pacing.autoStageClearsInWindow = 5;
  state.combat.pacing.lastAutoStageClearAt = state.timestamps.now - 10 * 60 * 1000;
  runtime.spawnEnemy(state, data);
  runtime.advanceTime(state, data, 45000);
  assert.ok(state.combat.stage >= 10);
  assert.equal(state.combat.enemy.isBoss, true);
});

test('day-long active idle play is capped into patrol mode instead of runaway leveling', () => {
  const data = makeData();
  const state = runtime.createNewGame(data, { now: NOW, seed: 315 });

  runtime.advanceTime(state, data, DAY);

  assert.ok(state.combat.stage <= 90, `stage runaway: ${state.combat.stage}`);
  assert.ok(Math.max(...state.heroes.owned.map((hero) => hero.level)) <= 35);
  assert.ok(state.inventory.equipment.length <= 90);
  assert.ok(state.progress.patrolDefeats > 0);
  assert.ok(state.combat.pacing.autoStageClearsInWindow <= 80);
  assert.ok(state.combat.pacing.minStageIntervalMs >= 10 * 60 * 1000);
  assert.ok(Number.isFinite(state.power.total), `power should stay finite: ${state.power.total}`);
});

test('offline reward is capped, claimable, and affects resources after return', () => {
  const data = makeData();
  const state = runtime.createNewGame(data, { now: NOW, seed: 315 });
  state.timestamps.lastSavedAt = NOW - 10 * 60 * 60 * 1000;
  const beforeGold = state.resources.gold;

  const reward = runtime.applyOfflineProgress(state, data, NOW);

  assert.equal(reward.cappedHours, 8);
  assert.ok(reward.gold > 0);
  assert.ok(reward.resources.wood > 0);
  assert.ok(state.resources.gold > beforeGold);
  assert.equal(state.offline.pending.claimed, false);
});

test('village upgrades, hero training, equipment chest, and equip best all change power', () => {
  const data = makeData();
  const state = runtime.createNewGame(data, { now: NOW, seed: 315 });
  state.resources.gold = 500000;
  state.resources.wood = 500000;
  state.resources.ore = 500000;
  state.resources.food = 500000;
  const firstPower = state.power.total;

  const building = runtime.upgradeBuilding(state, data, 'building_farm');
  assert.equal(building.level, 2);

  const hero = runtime.levelHero(state, data, state.heroes.owned[0].id);
  assert.equal(hero.level, 2);

  const chest = runtime.openEquipmentChest(state, data, 'rare', { seed: 777 });
  assert.equal(chest.items.length, 3);

  const equipped = runtime.equipBest(state, data);
  assert.ok(equipped.changedSlots.length > 0);
  assert.ok(state.power.total > firstPower);
});

test('rewarded ads and purchase mocks grant value without forced ads', () => {
  const data = makeData();
  const state = runtime.createNewGame(data, { now: NOW, seed: 315 });
  const beforeDiamonds = state.resources.diamond;

  const ad = runtime.claimAdReward(state, data, 'ad_free_summon', NOW);
  assert.equal(ad.ok, true);
  assert.equal(ad.forced, false);
  assert.ok(state.heroes.owned.length >= 4);

  const starter = runtime.mockPurchase(state, data, 'iap_starter_pack', NOW + 1000);
  assert.equal(starter.ok, true);
  assert.ok(state.resources.diamond > beforeDiamonds);
  assert.ok(state.inventory.equipment.length >= 1);

  const removeAds = runtime.mockPurchase(state, data, 'iap_remove_ads', NOW + 2000);
  assert.equal(removeAds.ok, true);
  assert.equal(state.entitlements.removeAds, true);
});

test('daily, weekly, and monthly retention rewards include special long-term items', () => {
  const data = makeData();
  const state = runtime.createNewGame(data, { now: NOW, seed: 315 });

  for (let day = 1; day <= 30; day += 1) {
    const result = runtime.claimLoginReward(state, data, NOW + (day - 1) * DAY);
    assert.equal(result.ok, true);
  }

  assert.ok(state.inventory.specialItems.some((item) => item.id === 'founder_relic_day_7'));
  assert.ok(state.inventory.specialItems.some((item) => item.id === 'imperial_crown_day_30'));
  assert.ok(state.retention.weeklyOrders.completed >= 4);
  assert.ok(state.retention.monthlyRelics.claimed.includes('month_1'));

  const duplicate = runtime.claimLoginReward(state, data, NOW + 29 * DAY);
  assert.equal(duplicate.ok, false);
  assert.equal(duplicate.reason, 'already_claimed_today');
});

test('playable web game shell exposes canvas, PWA files, emulator server, and verification hooks', () => {
  const indexPath = path.join(rootDir, 'web-game', 'index.html');
  const appPath = path.join(rootDir, 'web-game', 'app.js');
  const stylesPath = path.join(rootDir, 'web-game', 'styles.css');
  const manifestPath = path.join(rootDir, 'web-game', 'manifest.webmanifest');
  const swPath = path.join(rootDir, 'web-game', 'sw.js');
  const serverPath = path.join(rootDir, 'tools', 'serve-game.cjs');

  for (const filePath of [indexPath, appPath, stylesPath, manifestPath, swPath, serverPath]) {
    assert.ok(fs.existsSync(filePath), `${filePath} missing`);
  }

  const index = fs.readFileSync(indexPath, 'utf8');
  const app = fs.readFileSync(appPath, 'utf8');
  const styles = fs.readFileSync(stylesPath, 'utf8');
  const serviceWorker = fs.readFileSync(swPath, 'utf8');
  const server = fs.readFileSync(serverPath, 'utf8');

  assert.match(index, /id="gameCanvas"/);
  assert.match(index, /runtime-core\.js/);
  assert.match(app, /window\.advanceTime/);
  assert.match(app, /window\.render_game_to_text/);
  assert.match(app, /localStorage/);
  assert.match(app, /claimLoginReward/);
  assert.match(app, /renderRetentionRoad/);
  assert.match(app, /renderOpening/);
  assert.match(app, /renderTutorial/);
  assert.match(app, /renderVillageCanvas/);
  assert.match(app, /renderDailyRewardOverlay/);
  assert.match(app, /createRewardBurst/);
  assert.match(app, /createUpgradeBurst/);
  assert.match(app, /createScreenFlash/);
  assert.match(app, /createSparkRain/);
  assert.match(app, /renderPacingBoard/);
  assert.match(app, /renderLoadoutGrid/);
  assert.match(app, /slotPreviewItem/);
  assert.match(app, /dataset\.preview/);
  assert.match(app, /renderHeroDetailOverlay/);
  assert.match(app, /renderStoreProductCard/);
  assert.match(app, /productShortDescription/);
  assert.match(app, /buildingEffectSummary/);
  assert.match(app, /renderLivePanelUpdates/);
  assert.match(app, /setStableText/);
  assert.match(app, /actionFeedbackSnapshot/);
  assert.match(app, /effectFrameDataUrl/);
  assert.match(app, /animateEffectFrames/);
  assert.match(app, /data-live-text/);
  assert.match(app, /data-live-progress/);
  assert.match(app, /DAILY_BUILDING_TARGET = 3/);
  assert.match(app, /renderShopFreeRewards/);
  assert.match(app, /adStatusText/);
  assert.match(app, /isDailyRewardBlocking/);
  assert.match(app, /DAILY_REWARD_DISMISS_PREFIX/);
  assert.match(app, /shouldShowDailyRewardOverlay/);
  assert.doesNotMatch(app, /googlePlayProductId/);
  assert.doesNotMatch(app, /appleProductId/);
  assert.doesNotMatch(app, /store-id-grid/);
  assert.match(app, /savePanelScroll/);
  assert.match(app, /installTouchScroll/);
  assert.match(app, /suppressPanelScrollSave/);
  assert.match(app, /bottomPinned/);
  assert.match(app, /wheel/);
  assert.match(app, /building-upgrade-result/);
  assert.match(app, /claimDailyPerformanceReward/);
  assert.match(app, /createCombatEvent/);
  assert.match(app, /drawDamageText/);
  assert.match(app, /drawEffectSprite/);
  assert.match(app, /왕국 로비/);
  assert.match(app, /장기 보급/);
  assert.match(app, /집중 공격/);
  assert.doesNotMatch(app, /전투 출정/);
  assert.doesNotMatch(app, /장비 정리/);
  assert.match(app, /창건자의 성유물/);
  assert.match(app, /장기 보급/);
  assert.match(app, /claimAdReward/);
  assert.match(app, /mockPurchase/);
  assert.doesNotMatch(app, /\/ mock/);
  assert.match(styles, /height:\s*100dvh/);
  assert.match(styles, /grid-template-rows:\s*auto minmax\(0,\s*1fr\) 76px/);
  assert.match(styles, /-webkit-overflow-scrolling:\s*touch/);
  assert.match(styles, /scrollbar-width:\s*none/);
  assert.match(styles, /\.panel\.is-dragging/);
  assert.match(styles, /\.opening-cinematic/);
  assert.match(styles, /\.tutorial-card/);
  assert.match(styles, /\.daily-reward-overlay/);
  assert.match(styles, /\.reward-fly/);
  assert.match(styles, /\.upgrade-burst/);
  assert.match(styles, /background-size:\s*contain/);
  assert.match(styles, /\.toast-stack\s*\{[\s\S]*z-index:\s*42/);
  assert.match(app, /ttl:\s*2400/);
  assert.match(app, /toastQueue = toastQueue\.slice\(0,\s*1\)/);
  assert.match(app, /toastQueue\[0\]\?\.message === message/);
  assert.match(app, /toastUid/);
  assert.match(app, /dataset\.toastIds/);
  assert.match(styles, /\.screen-flash/);
  assert.match(styles, /\.spark-rain/);
  assert.match(styles, /\.patrol-status/);
  assert.match(styles, /\.village-lobby/);
  assert.match(styles, /\.skill-rack/);
  assert.match(styles, /\.shop-product/);
  assert.match(styles, /\.shop-free-rewards/);
  assert.match(styles, /\.shop-benefit-list/);
  assert.match(styles, /\.shop-action-row/);
  assert.match(styles, /\.loadout-grid/);
  assert.match(styles, /\.loadout-grid\.large/);
  assert.match(styles, /img\[data-preview="true"\]/);
  assert.match(styles, /\.hero-card/);
  assert.match(styles, /\.hero-detail-overlay/);
  assert.doesNotMatch(styles, /\.store-id-grid/);
  assert.match(styles, /\.building-upgrade-result/);
  assert.match(styles, /\.building-effect-text/);
  assert.match(styles, /\.card-help/);
  assert.match(styles, /\.lobby-help/);
  assert.match(styles, /\.thumb-row div/);
  assert.match(styles, /\.row > div/);
  assert.match(serviceWorker, /lost-kingdom-runtime-v24/);
  assert.match(serviceWorker, /privacy-policy\.html/);
  assert.match(serviceWorker, /audio-manifest\.json/);
  assert.match(server, /0\.0\.0\.0/);
  assert.match(server, /10\.0\.2\.2/);
});

test('web game keeps upgrade surfaces stable and highlights kingdom progress', () => {
  const appPath = path.join(rootDir, 'web-game', 'app.js');
  const stylesPath = path.join(rootDir, 'web-game', 'styles.css');
  const app = fs.readFileSync(appPath, 'utf8');
  const styles = fs.readFileSync(stylesPath, 'utf8');

  assert.match(app, /renderKingdomProgressCard/);
  assert.match(app, /kingdomNextMilestone/);
  assert.match(app, /building-result-slot/);
  assert.match(app, /building-card/);
  assert.match(styles, /\.building-card/);
  assert.match(styles, /\.building-result-slot\s*\{[\s\S]*min-height:\s*44px/);
  assert.match(styles, /\.card-grid\s*>\s*\.card\s*\{[\s\S]*min-height:\s*88px/);
  assert.match(styles, /\.btn\s*\{[\s\S]*min-height:\s*42px/);
});

test('focus attack creates a dedicated canvas impact effect', () => {
  const appPath = path.join(rootDir, 'web-game', 'app.js');
  const app = fs.readFileSync(appPath, 'utf8');

  assert.match(app, /createFocusAttackImpact/);
  assert.match(app, /drawFocusImpact/);
  assert.match(app, /focusImpactMs/);
  assert.match(app, /createFocusAttackImpact\(\)/);
});
