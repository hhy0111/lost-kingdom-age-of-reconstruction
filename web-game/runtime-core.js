(function attachRuntime(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.LostKingdomRuntime = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function createRuntime() {
  const SAVE_VERSION = 1;
  const DAY_MS = 24 * 60 * 60 * 1000;
  const AUTO_STAGE_WINDOW_MS = DAY_MS;
  const AUTO_STAGE_WINDOW_LIMIT = 80;
  const AUTO_STAGE_STARTING_ALLOWANCE = 5;
  const AUTO_STAGE_MIN_INTERVAL_MS = 10 * 60 * 1000;
  const PARTY_REGEN_PER_SECOND = 0.003;
  const RESOURCE_KEYS = ['gold', 'diamond', 'food', 'wood', 'ore', 'magicStone'];
  const BUILDING_MAX_LEVEL = 30;
  const BUILDING_MILESTONE_STEP = 5;
  const BUILDING_STAGE_TIERS = [
    { index: 0, name: '초석', label: '초석 단계', powerMultiplier: 1 },
    { index: 1, name: '마을', label: '마을 단계', powerMultiplier: 1.08 },
    { index: 2, name: '도시', label: '도시 단계', powerMultiplier: 1.2 },
    { index: 3, name: '왕국', label: '왕국 단계', powerMultiplier: 1.36 },
    { index: 4, name: '제국', label: '제국 단계', powerMultiplier: 1.56 },
    { index: 5, name: '황금 제국', label: '황금 제국 단계', powerMultiplier: 1.82 },
    { index: 6, name: '영원의 수도', label: '영원의 수도', powerMultiplier: 2.1 },
  ];
  const KINGDOM_TIERS = [
    { id: 'ruins', name: '폐허', minProgress: 0 },
    { id: 'village', name: '마을', minProgress: 4 },
    { id: 'city', name: '도시', minProgress: 10 },
    { id: 'kingdom', name: '왕국', minProgress: 18 },
    { id: 'empire', name: '제국', minProgress: 30 },
  ];

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function buildingStageInfo(buildingOrLevel) {
    const rawLevel = typeof buildingOrLevel === 'number' ? buildingOrLevel : buildingOrLevel?.level;
    const rawMax = typeof buildingOrLevel === 'number' ? BUILDING_MAX_LEVEL : buildingOrLevel?.maxLevel;
    const maxLevel = Math.max(BUILDING_MILESTONE_STEP, rawMax || BUILDING_MAX_LEVEL);
    const level = clamp(Math.floor(rawLevel || 1), 1, maxLevel);
    const tierIndex = Math.min(
      BUILDING_STAGE_TIERS.length - 1,
      level >= BUILDING_MAX_LEVEL ? BUILDING_STAGE_TIERS.length - 1 : Math.floor(level / BUILDING_MILESTONE_STEP)
    );
    const currentMilestoneLevel = level < BUILDING_MILESTONE_STEP
      ? 1
      : Math.min(BUILDING_MAX_LEVEL, Math.floor(level / BUILDING_MILESTONE_STEP) * BUILDING_MILESTONE_STEP);
    const nextMilestoneLevel = level >= maxLevel
      ? null
      : Math.min(maxLevel, currentMilestoneLevel < BUILDING_MILESTONE_STEP
        ? BUILDING_MILESTONE_STEP
        : currentMilestoneLevel + BUILDING_MILESTONE_STEP);
    const milestoneStart = currentMilestoneLevel;
    const milestoneEnd = nextMilestoneLevel || maxLevel;
    const progress = milestoneEnd > milestoneStart
      ? clamp((level - milestoneStart) / (milestoneEnd - milestoneStart), 0, 1)
      : 1;
    const tier = BUILDING_STAGE_TIERS[tierIndex];

    return {
      ...tier,
      level,
      maxLevel,
      currentMilestoneLevel,
      nextMilestoneLevel,
      isMilestone: level > 1 && level % BUILDING_MILESTONE_STEP === 0,
      progress,
    };
  }

  function crossedBuildingMilestone(beforeLevel, afterLevel) {
    const before = buildingStageInfo(beforeLevel);
    const after = buildingStageInfo(afterLevel);
    return after.index > before.index;
  }

  const BUILDING_ERAS = [
    { index: 0, name: '복구', label: '복구 단계', unlockedMaxLevel: 5, powerMultiplier: 1 },
    { index: 1, name: '마을', label: '마을 단계', unlockedMaxLevel: 10, powerMultiplier: 1.1 },
    { index: 2, name: '도시', label: '도시 단계', unlockedMaxLevel: 15, powerMultiplier: 1.24 },
    { index: 3, name: '왕국', label: '왕국 단계', unlockedMaxLevel: 20, powerMultiplier: 1.42 },
    { index: 4, name: '제국', label: '제국 단계', unlockedMaxLevel: 25, powerMultiplier: 1.66 },
    { index: 5, name: '수도', label: '영원의 수도', unlockedMaxLevel: 30, powerMultiplier: 1.96 },
  ];

  function buildingEraByIndex(index) {
    return BUILDING_ERAS[clamp(Math.floor(index || 0), 0, BUILDING_ERAS.length - 1)];
  }

  function buildingEraByUnlockedMaxLevel(maxLevel) {
    const cap = clamp(
      Math.ceil((maxLevel || BUILDING_MILESTONE_STEP) / BUILDING_MILESTONE_STEP) * BUILDING_MILESTONE_STEP,
      BUILDING_MILESTONE_STEP,
      BUILDING_MAX_LEVEL
    );
    return buildingEraByIndex(Math.max(0, Math.ceil(cap / BUILDING_MILESTONE_STEP) - 1));
  }

  function buildingStageInfo(buildingOrLevel) {
    const rawLevel = typeof buildingOrLevel === 'number' ? buildingOrLevel : buildingOrLevel?.level;
    const rawMax = typeof buildingOrLevel === 'number'
      ? Math.ceil((rawLevel || 1) / BUILDING_MILESTONE_STEP) * BUILDING_MILESTONE_STEP
      : buildingOrLevel?.maxLevel;
    const maxLevel = clamp(rawMax || BUILDING_MILESTONE_STEP, BUILDING_MILESTONE_STEP, BUILDING_MAX_LEVEL);
    const level = clamp(Math.floor(rawLevel || 1), 1, maxLevel);
    const era = buildingEraByUnlockedMaxLevel(maxLevel);
    const bandStart = Math.max(1, maxLevel - BUILDING_MILESTONE_STEP + 1);
    const progress = maxLevel > bandStart ? clamp((level - bandStart) / (maxLevel - bandStart), 0, 1) : 1;

    return {
      ...era,
      level,
      maxLevel,
      currentMilestoneLevel: maxLevel,
      nextMilestoneLevel: era.index < BUILDING_ERAS.length - 1 ? buildingEraByIndex(era.index + 1).unlockedMaxLevel : null,
      isMilestone: level >= maxLevel,
      bandStart,
      progress,
    };
  }

  function buildingEraInfo(stateOrIndex) {
    const era = typeof stateOrIndex === 'number'
      ? buildingEraByIndex(stateOrIndex)
      : buildingEraByIndex(stateOrIndex?.village?.buildingEraIndex || 0);
    const buildings = typeof stateOrIndex === 'number' ? [] : stateOrIndex?.village?.buildings || [];
    const readyCount = buildings.filter((building) => (building.level || 1) >= era.unlockedMaxLevel).length;
    const totalBuildings = buildings.length;
    const next = era.index < BUILDING_ERAS.length - 1 ? buildingEraByIndex(era.index + 1) : null;

    return {
      ...era,
      next,
      readyCount,
      totalBuildings,
      canAdvance: Boolean(next && totalBuildings > 0 && readyCount >= totalBuildings),
    };
  }

  function inferBuildingEraIndex(buildings = []) {
    if (buildings.length === 0) return 0;
    const highestLevel = buildings.reduce((max, building) => Math.max(max, Math.floor(Number(building.level) || 1)), 1);
    return clamp(Math.ceil(highestLevel / BUILDING_MILESTONE_STEP) - 1, 0, BUILDING_ERAS.length - 1);
  }

  function syncBuildingLevelCaps(state, data) {
    state.village = state.village || {};
    if (!Number.isFinite(state.village.buildingEraIndex)) {
      state.village.buildingEraIndex = inferBuildingEraIndex(state.village.buildings || []);
    }
    state.village.buildingEraIndex = Math.max(
      state.village.buildingEraIndex,
      inferBuildingEraIndex(state.village.buildings || [])
    );
    state.village.buildingEraIndex = clamp(state.village.buildingEraIndex, 0, BUILDING_ERAS.length - 1);
    const era = buildingEraInfo(state);

    for (const building of state.village.buildings || []) {
      const template = data?.buildings?.find((entry) => entry.id === building.id);
      building.finalMaxLevel = Math.max(template?.maxLevel || 0, BUILDING_MAX_LEVEL);
      building.maxLevel = Math.min(building.finalMaxLevel, era.unlockedMaxLevel);
      building.level = clamp(Math.floor(Number(building.level) || 1), 1, building.finalMaxLevel);
      building.productionPerHour = buildingProduction(building);
    }

    return era;
  }

  function canAdvanceBuildingEra(state) {
    const era = buildingEraInfo(state);
    if (!era.next) return { ok: false, reason: 'final_era', era };
    if (!era.canAdvance) return { ok: false, reason: 'requirements_not_met', era };
    return { ok: true, era, next: era.next };
  }

  function advanceBuildingEra(state, data) {
    syncBuildingLevelCaps(state, data);
    const check = canAdvanceBuildingEra(state);
    if (!check.ok) return check;

    const from = check.era;
    state.village.buildingEraIndex = check.next.index;
    syncBuildingLevelCaps(state, data);
    recalculatePower(state);
    syncPartyHealth(state, { keepLowHealth: true });
    const to = buildingEraInfo(state);
    state.village.lastBuildingEraAscension = {
      from: from.label,
      to: to.label,
      unlockedMaxLevel: to.unlockedMaxLevel,
      at: state.timestamps?.now || Date.now(),
    };
    addLog(state, `${to.label} 승급 · Lv.${to.unlockedMaxLevel} 해금`, 'success');
    return { ok: true, from, to };
  }

  function dayKey(timestamp) {
    return new Date(timestamp).toISOString().slice(0, 10);
  }

  function ensureProgressShape(state) {
    state.progress = state.progress || {};
    if (!Number.isFinite(state.progress.enemiesDefeated)) state.progress.enemiesDefeated = 0;
    if (!Number.isFinite(state.progress.bossesDefeated)) state.progress.bossesDefeated = 0;
    if (!Number.isFinite(state.progress.buildingsUpgraded)) state.progress.buildingsUpgraded = 0;
    if (!Number.isFinite(state.progress.equipmentLooted)) state.progress.equipmentLooted = 0;
    if (!Number.isFinite(state.progress.patrolDefeats)) state.progress.patrolDefeats = 0;
  }

  function ensureCombatPacing(state) {
    const now = state.timestamps?.now || Date.now();
    state.combat = state.combat || {};
    state.combat.pacing = state.combat.pacing || {};
    const pacing = state.combat.pacing;

    if (!Number.isFinite(pacing.windowStartAt)) {
      pacing.windowStartAt = now;
    }
    if (!Number.isFinite(pacing.autoStageClearsInWindow)) {
      pacing.autoStageClearsInWindow = 0;
    }
    if (!Number.isFinite(pacing.patrolClearsInWindow)) {
      pacing.patrolClearsInWindow = 0;
    }
    if (!Number.isFinite(pacing.lastAutoStageClearAt)) {
      pacing.lastAutoStageClearAt = 0;
    }

    if (now - pacing.windowStartAt >= AUTO_STAGE_WINDOW_MS) {
      pacing.windowStartAt = now;
      pacing.autoStageClearsInWindow = 0;
      pacing.patrolClearsInWindow = 0;
      pacing.lastAutoStageClearAt = 0;
      pacing.limitNoticeShown = false;
    }

    pacing.windowLimit = AUTO_STAGE_WINDOW_LIMIT;
    pacing.minStageIntervalMs = AUTO_STAGE_MIN_INTERVAL_MS;
    return pacing;
  }

  function canAdvanceAutoStage(state) {
    const pacing = ensureCombatPacing(state);
    if (pacing.autoStageClearsInWindow >= AUTO_STAGE_WINDOW_LIMIT) return false;
    if (pacing.autoStageClearsInWindow < AUTO_STAGE_STARTING_ALLOWANCE) return true;
    const now = state.timestamps?.now || Date.now();
    return now - pacing.lastAutoStageClearAt >= AUTO_STAGE_MIN_INTERVAL_MS;
  }

  function makeRng(seed) {
    let value = seed >>> 0;
    return function random() {
      value = (value * 1664525 + 1013904223) >>> 0;
      return value / 4294967296;
    };
  }

  function roll(state) {
    state.rngSeed = (state.rngSeed * 1664525 + 1013904223) >>> 0;
    return state.rngSeed / 4294967296;
  }

  function addLog(state, message, tone = 'info') {
    state.logs.unshift({ message, tone, at: state.timestamps.now });
    state.logs = state.logs.slice(0, 24);
  }

  function addResources(state, rewards) {
    for (const key of RESOURCE_KEYS) {
      if (rewards[key]) {
        state.resources[key] = Math.max(0, Math.floor((state.resources[key] || 0) + rewards[key]));
      }
    }
  }

  function heroBaseStats(hero, index) {
    const rarityBonus = {
      일반: 0,
      고급: 8,
      희귀: 18,
      영웅: 30,
      전설: 48,
    }[hero.rarity] || 12;
    const roleBonus = hero.role && hero.role.includes('탱') ? 0.88 : hero.role && hero.role.includes('마') ? 1.08 : 1;

    return {
      attack: Math.round((72 + index * 12 + rarityBonus) * roleBonus),
      defense: 28 + index * 4 + Math.round(rarityBonus * 0.45),
      hp: 520 + index * 80 + rarityBonus * 8,
      cooldown: Math.max(0.72, 1.12 - index * 0.05),
      skillPower: 2.8 + index * 0.18,
    };
  }

  function createOwnedHero(hero, index) {
    const stats = heroBaseStats(hero, index);
    return {
      id: hero.id,
      name: hero.name,
      rarity: hero.rarity,
      role: hero.role,
      element: hero.element,
      skillName: hero.skillName || '왕국의 일격',
      assetUrl: hero.assetUrl,
      level: 1,
      exp: 0,
      star: index === 0 ? 2 : 1,
      attackTimer: 0.25 + index * 0.2,
      skillCharge: 0,
      stats,
    };
  }

  function normalizedHeroStats(hero, index) {
    const base = heroBaseStats(hero, index);
    const level = Math.max(1, Math.floor(Number(hero.level) || 1));
    const star = Math.max(1, Math.floor(Number(hero.star) || 1));
    const levelBoost = Math.max(0, level - 1);
    const starBoost = Math.max(0, star - 1);
    return {
      attack: Math.round(base.attack * (1 + levelBoost * 0.075 + starBoost * 0.22)),
      defense: Math.round(base.defense * (1 + levelBoost * 0.055 + starBoost * 0.18)),
      hp: Math.round(base.hp * (1 + levelBoost * 0.09 + starBoost * 0.22)),
      cooldown: base.cooldown,
      skillPower: Math.round(base.skillPower * (1 + Math.min(1.2, levelBoost * 0.006)) * 100) / 100,
    };
  }

  function normalizeHeroProgression(state) {
    state.heroes.owned.forEach((hero, index) => {
      hero.level = Math.max(1, Math.floor(Number(hero.level) || 1));
      hero.star = Math.max(1, Math.floor(Number(hero.star) || 1));
      hero.exp = Math.max(0, Number.isFinite(hero.exp) ? hero.exp : 0);
      hero.skillCharge = clamp(Number(hero.skillCharge) || 0, 0, 100);
      hero.attackTimer = Number.isFinite(hero.attackTimer) ? hero.attackTimer : 0.2 + index * 0.2;
      hero.stats = normalizedHeroStats(hero, index);
    });
  }

  function equipmentRating(item) {
    const rarityWeight = {
      일반: 1,
      고급: 1.35,
      희귀: 1.8,
      영웅: 2.45,
      전설: 3.35,
    }[item.rarity] || {
      common: 1,
      rare: 1.8,
      epic: 2.45,
      legendary: 3.35,
    }[item.chestRarity] || 1.2;

    return Math.round((item.itemLevel || 1) * 34 * rarityWeight + (item.enhance || 0) * 42);
  }

  function createEquipmentInstance(template, state, chestRarity = 'common') {
    const uid = `eq_${state.inventory.nextUid}`;
    state.inventory.nextUid += 1;
    const rarity = template.rarity || chestRarity;
    const craftingBonus = equipmentCraftLevelBonus(state);
    const item = {
      uid,
      id: template.id,
      name: template.name,
      slot: template.slot || 'weapon',
      rarity,
      chestRarity,
      itemLevel: Math.max(1, Math.floor(state.combat.stage / 4) + 1 + craftingBonus),
      enhance: 0,
      assetUrl: template.assetUrl,
    };
    item.rating = equipmentRating(item);
    return item;
  }

  function buildingProduction(building) {
    const level = building.level || 1;
    const base = 100 + building.order * 18;
    if (level <= BUILDING_MILESTONE_STEP) {
      return Math.round(base * Math.pow(1.42, level - 1));
    }

    const levelFiveProduction = base * Math.pow(1.42, BUILDING_MILESTONE_STEP - 1);
    const extraLevels = level - BUILDING_MILESTONE_STEP;
    const stage = buildingStageInfo(building);
    const stageBonus = 1 + Math.max(0, stage.index - 1) * 0.08;
    return Math.round(levelFiveProduction * Math.pow(1.18, extraLevels) * stageBonus);
  }

  function createBuildings(data) {
    return data.buildings.map((building) => ({
      id: building.id,
      name: building.name,
      order: building.order,
      productionType: building.productionType,
      level: 1,
      maxLevel: BUILDING_MILESTONE_STEP,
      finalMaxLevel: Math.max(building.maxLevel || 0, BUILDING_MAX_LEVEL),
      productionPerHour: buildingProduction({ ...building, level: 1 }),
      assetUrl: building.assetUrl,
    }));
  }

  function ensureBuildingProgression(state, data) {
    state.village = state.village || {};
    state.village.buildings = Array.isArray(state.village.buildings) ? state.village.buildings : [];
    const existingById = new Map(state.village.buildings.map((building) => [building.id, building]));
    if (!Number.isFinite(state.village.buildingEraIndex)) {
      state.village.buildingEraIndex = inferBuildingEraIndex(state.village.buildings);
    }

    state.village.buildings = data.buildings.map((template) => {
      const building = existingById.get(template.id) || {};
      building.id = template.id;
      building.name = template.name;
      building.order = template.order;
      building.productionType = template.productionType;
      building.assetUrl = template.assetUrl;
      building.finalMaxLevel = Math.max(template.maxLevel || 0, BUILDING_MAX_LEVEL);
      building.level = clamp(Math.floor(building.level || 1), 1, building.finalMaxLevel);
      return building;
    });

    syncBuildingLevelCaps(state, data);
    state.village.tier = state.village.tier || KINGDOM_TIERS[0];
    return state.village.buildings;
  }

  function buildingStageBonus(state, productionTypes) {
    const types = new Set(productionTypes);
    return (state.village?.buildings || []).reduce((sum, building) => {
      return types.has(building.productionType) ? sum + buildingStageInfo(building).index : sum;
    }, 0);
  }

  function heroTrainingDiscount(state) {
    return clamp(buildingStageBonus(state, ['hero', 'kingdom']) * 0.015, 0, 0.3);
  }

  function equipmentCraftLevelBonus(state) {
    return Math.floor(buildingStageBonus(state, ['crafting', 'research']) / 2);
  }

  function currentKingdomTier(state) {
    const palace = state.village.buildings.find((building) => building.id === 'building_palace');
    const progress = (palace?.level || 1) * 2 + Math.floor(state.combat.stage / 5) + state.progress.buildingsUpgraded;
    return KINGDOM_TIERS.reduce((tier, candidate) => (progress >= candidate.minProgress ? candidate : tier), KINGDOM_TIERS[0]);
  }

  function recalculatePower(state) {
    normalizeHeroProgression(state);
    const heroPower = state.heroes.owned.reduce((sum, hero) => {
      return sum + Math.round(hero.stats.attack * 5 + hero.stats.defense * 3 + hero.stats.hp * 0.28 + hero.level * 35 + hero.star * 180);
    }, 0);

    const equippedItems = Object.values(state.inventory.equipped)
      .map((uid) => state.inventory.equipment.find((item) => item.uid === uid))
      .filter(Boolean);
    const equipmentPower = equippedItems.reduce((sum, item) => sum + item.rating, 0);
    const buildingPower = state.village.buildings.reduce((sum, building) => {
      const stage = buildingStageInfo(building);
      return sum + Math.round(building.level * 82 * stage.powerMultiplier);
    }, 0);
    const tier = currentKingdomTier(state);

    state.village.tier = tier;
    state.power = {
      hero: Math.round(heroPower),
      equipment: Math.round(equipmentPower),
      building: Math.round(buildingPower),
      total: Math.round(heroPower + equipmentPower + buildingPower),
    };
    return state.power;
  }

  function syncPartyHealth(state, options = {}) {
    const previousMax = Number(state.combat.partyHpMax) || 0;
    const previousHp = Number(state.combat.partyHp) || 0;
    const nextMax = Math.max(1200, Math.round(state.power.hero * 1.8 + (state.power.building || 0) * 0.45 + 1200));
    let ratio = previousMax > 1 ? previousHp / previousMax : 1;
    if (!Number.isFinite(ratio) || previousHp <= 1) ratio = 1;
    if (options.keepLowHealth) ratio = clamp(ratio, 0.25, 1);
    state.combat.partyHpMax = nextMax;
    state.combat.partyHp = Math.round(nextMax * clamp(ratio, 0.25, 1));
  }

  function enemyPowerPressure(state) {
    const power = Math.max(0, Number(state.power?.total) || 0);
    return Math.min(18000, Math.sqrt(power) * 4);
  }

  function enemyTemplateForStage(data, stage) {
    const isBoss = stage % 10 === 0;
    if (isBoss) {
      return data.bosses[Math.floor(stage / 10 - 1) % data.bosses.length];
    }
    return data.monsters[(stage - 1) % data.monsters.length];
  }

  function spawnEnemy(state, data) {
    const stage = state.combat.stage;
    const isBoss = stage % 10 === 0;
    const template = enemyTemplateForStage(data, stage);
    const region = data.regions[Math.min(data.regions.length - 1, Math.floor((stage - 1) / 12))];
    const pressure = enemyPowerPressure(state);
    const hp = Math.round((560 + stage * 280 + Math.pow(stage, 1.16) * 700 + pressure) * (isBoss ? 6.8 : 1));
    const attack = Math.round((34 + stage * 7.2 + Math.pow(stage, 0.72) * 18 + pressure * 0.08) * (isBoss ? 1.7 : 1));

    state.combat.enemy = {
      id: template.id,
      name: template.name,
      assetUrl: template.assetUrl,
      regionId: template.regionId || region?.id,
      regionName: region?.name || '초원',
      isBoss,
      alive: true,
      hp,
      hpMax: hp,
      attack,
      attackTimer: 1.6,
      level: stage,
    };
    state.combat.floaters = [];
    return state.combat.enemy;
  }

  function grantEquipmentDrop(state, data, chestRarity = 'common') {
    const index = Math.floor(roll(state) * data.equipment.length) % data.equipment.length;
    const item = createEquipmentInstance(data.equipment[index], state, chestRarity);
    state.inventory.equipment.push(item);
    state.progress.equipmentLooted += 1;
    return item;
  }

  function grantVictoryRewards(state, data, enemy) {
    const stage = state.combat.stage;
    const bossMultiplier = enemy.isBoss ? 5 : 1;
    const gold = Math.round((data.economy.battleGoldBase + stage * 38) * bossMultiplier * state.buffs.goldMultiplier);
    const exp = Math.round((data.economy.battleExpBase + stage * 9) * bossMultiplier);
    addResources(state, {
      gold,
      food: Math.round(18 + stage * 3),
      wood: Math.round(12 + stage * 2),
      ore: Math.round(8 + stage * 1.6),
      magicStone: enemy.isBoss ? 14 + Math.floor(stage / 2) : 1,
    });

    for (const hero of state.heroes.owned) {
      hero.exp += exp;
      const required = hero.level * 140;
      if (hero.exp >= required) {
        hero.exp -= required;
        hero.level += 1;
      }
    }

    const chestRarity = enemy.isBoss ? 'epic' : state.combat.stage % 5 === 0 ? 'rare' : 'common';
    const item = grantEquipmentDrop(state, data, chestRarity);
    state.progress.enemiesDefeated += 1;
    if (enemy.isBoss) {
      state.progress.bossesDefeated += 1;
      state.resources.diamond += 25 + Math.floor(stage / 10) * 10;
      addLog(state, `${enemy.name} 격파 - 보스 보상 획득`, 'success');
    } else {
      addLog(state, `${enemy.name} 처치 - ${item.name} 획득`, 'success');
    }
  }

  function grantPatrolRewards(state, data, enemy) {
    const stage = state.combat.stage;
    const gold = Math.round((data.economy.battleGoldBase * 0.16 + stage * 4) * state.buffs.goldMultiplier);
    addResources(state, {
      gold,
      food: Math.round(5 + stage * 0.35),
      wood: Math.round(4 + stage * 0.28),
      ore: Math.round(2 + stage * 0.18),
    });

    ensureProgressShape(state);
    const pacing = ensureCombatPacing(state);
    state.progress.patrolDefeats += 1;
    pacing.patrolClearsInWindow += 1;

    if (!pacing.limitNoticeShown) {
      pacing.limitNoticeShown = true;
      addLog(state, `자동 원정 한도 도달 - ${enemy.name} 순찰 보상 전환`, 'info');
    }
  }

  function heroDamage(state, hero) {
    const equipmentScale = 1 + Math.min(2.2, state.power.equipment / 16000);
    const variance = 0.88 + roll(state) * 0.24;
    let damage = hero.stats.attack * equipmentScale * variance;
    hero.skillCharge = clamp(hero.skillCharge + 16 + hero.level * 0.35, 0, 100);

    if (hero.skillCharge >= 100) {
      hero.skillCharge = 0;
      damage *= hero.stats.skillPower;
      state.combat.floaters.push({
        text: hero.skillName,
        tone: 'skill',
        ttl: 900,
      });
    }

    if (roll(state) < 0.11) {
      damage *= 1.7;
      state.combat.floaters.push({ text: 'CRIT', tone: 'crit', ttl: 650 });
    }

    return Math.max(1, Math.round(damage));
  }

  function updateCombat(state, data, dt) {
    const enemy = state.combat.enemy;
    if (!enemy || !enemy.alive) {
      spawnEnemy(state, data);
      return;
    }

    for (const hero of state.heroes.owned) {
      hero.attackTimer -= dt;
      if (hero.attackTimer <= 0 && enemy.alive) {
        hero.attackTimer += hero.stats.cooldown;
        const damage = heroDamage(state, hero);
        enemy.hp = Math.max(0, enemy.hp - damage);
        state.combat.floaters.push({ text: `-${damage}`, tone: 'damage', ttl: 520 });
        if (enemy.hp <= 0) {
          enemy.alive = false;
          if (canAdvanceAutoStage(state)) {
            grantVictoryRewards(state, data, enemy);
            const pacing = ensureCombatPacing(state);
            pacing.autoStageClearsInWindow += 1;
            pacing.lastAutoStageClearAt = state.timestamps?.now || Date.now();
            state.combat.stage += 1;
          } else {
            grantPatrolRewards(state, data, enemy);
            state.combat.floaters.push({ text: '순찰 보상', tone: 'reward', ttl: 720 });
          }
          recalculatePower(state);
          syncPartyHealth(state, { keepLowHealth: true });
          spawnEnemy(state, data);
          break;
        }
      }
    }

    if (enemy.alive) {
      enemy.attackTimer -= dt;
      if (enemy.attackTimer <= 0) {
        enemy.attackTimer += enemy.isBoss ? 2.1 : 1.7;
        const mitigation = Math.min(0.58, state.power.hero / 120000);
        const damage = Math.round(enemy.attack * (1 - mitigation));
        state.combat.partyHp = Math.max(1, state.combat.partyHp - damage);
        state.combat.floaters.push({ text: `-${damage}`, tone: 'enemy', ttl: 420 });
      }
    }

    state.combat.floaters.forEach((floater) => {
      floater.ttl -= dt * 1000;
    });
    state.combat.floaters = state.combat.floaters.filter((floater) => floater.ttl > 0).slice(-10);
  }

  function regenerateParty(state, dt) {
    if (!Number.isFinite(state.combat.partyHpMax) || state.combat.partyHpMax <= 0) return;
    const regen = Math.max(4, state.combat.partyHpMax * PARTY_REGEN_PER_SECOND) * dt;
    state.combat.partyHp = Math.min(state.combat.partyHpMax, state.combat.partyHp + regen);
  }

  function applyVillageProductionTick(state, dt) {
    const multiplier = state.buffs.resourceMultiplier;
    for (const building of state.village.buildings) {
      const amount = (building.productionPerHour / 3600) * dt * multiplier;
      if (building.productionType === 'food') state.resources.food += amount;
      if (building.productionType === 'wood') state.resources.wood += amount;
      if (building.productionType === 'ore') state.resources.ore += amount;
      if (building.productionType === 'magicStone') state.resources.magicStone += amount * 0.25;
      if (building.productionType === 'gold' || building.productionType === 'kingdom') state.resources.gold += amount;
      if (building.productionType === 'hero') state.resources.food += amount * 0.55;
      if (building.productionType === 'crafting') state.resources.ore += amount * 0.45;
      if (building.productionType === 'stone') state.resources.ore += amount * 0.35;
      if (building.productionType === 'expedition') {
        state.resources.gold += amount * 0.45;
        state.resources.magicStone += amount * 0.04;
      }
      if (building.productionType === 'research') state.resources.magicStone += amount * 0.08;
      if (building.productionType === 'defense') state.resources.gold += amount * 0.25;
    }
  }

  function advanceTime(state, data, ms) {
    const totalSeconds = Math.max(0, ms / 1000);
    let remaining = totalSeconds;

    while (remaining > 0) {
      const dt = Math.min(0.1, remaining);
      state.timestamps.now += dt * 1000;
      applyVillageProductionTick(state, dt);
      regenerateParty(state, dt);
      updateCombat(state, data, dt);
      for (const buff of Object.values(state.buffs.timers)) {
        buff.remaining = Math.max(0, buff.remaining - dt);
      }
      state.buffs.goldMultiplier = state.buffs.timers.gold?.remaining > 0 ? 2 : 1;
      state.buffs.resourceMultiplier = state.buffs.timers.resources?.remaining > 0 ? 2 : 1;
      remaining -= dt;
    }

    for (const key of RESOURCE_KEYS) {
      state.resources[key] = Math.floor(state.resources[key]);
    }
    return state;
  }

  function createNewGame(data, options = {}) {
    const now = options.now || Date.now();
    const state = {
      saveVersion: SAVE_VERSION,
      activeTab: 'combat',
      rngSeed: options.seed || 315001,
      resources: {
        gold: 1000,
        diamond: 120,
        food: 600,
        wood: 560,
        ore: 320,
        magicStone: 80,
      },
      power: { hero: 0, equipment: 0, building: 0, total: 0 },
      combat: {
        stage: 1,
        enemy: null,
        partyHp: 1000,
        partyHpMax: 1000,
        floaters: [],
        pacing: {
          windowStartAt: now,
          autoStageClearsInWindow: 0,
          patrolClearsInWindow: 0,
          windowLimit: AUTO_STAGE_WINDOW_LIMIT,
          minStageIntervalMs: AUTO_STAGE_MIN_INTERVAL_MS,
          lastAutoStageClearAt: 0,
          limitNoticeShown: false,
        },
      },
      heroes: {
        owned: data.heroRoster.slice(0, 3).map(createOwnedHero),
        unlockedIds: data.heroRoster.slice(0, 3).map((hero) => hero.id),
      },
      village: {
        tier: KINGDOM_TIERS[0],
        buildingEraIndex: 0,
        buildings: createBuildings(data),
      },
      inventory: {
        equipment: [],
        equipped: {},
        specialItems: [],
        nextUid: 1,
      },
      buffs: {
        goldMultiplier: 1,
        resourceMultiplier: 1,
        timers: {},
      },
      shop: {
        adViewsByDay: {},
        purchases: [],
      },
      entitlements: {
        removeAds: false,
        monthly: false,
        kingdomPass: false,
      },
      retention: {
        loginStreak: 1,
        claimedDayKeys: [],
        weeklyOrders: { completed: 0 },
        monthlyRelics: { claimed: [] },
      },
      progress: {
        enemiesDefeated: 0,
        bossesDefeated: 0,
        buildingsUpgraded: 0,
        equipmentLooted: 0,
        patrolDefeats: 0,
      },
      offline: {
        pending: null,
      },
      timestamps: {
        createdAt: now,
        now,
        lastSavedAt: now,
      },
      logs: [],
    };

    recalculatePower(state);
    syncPartyHealth(state);
    spawnEnemy(state, data);
    addLog(state, '왕국 재건 작전 개시', 'success');
    return state;
  }

  function serializeGame(state) {
    return JSON.stringify({
      ...state,
      timestamps: {
        ...state.timestamps,
        lastSavedAt: state.timestamps.now,
      },
    });
  }

  function loadGame(serialized, data, options = {}) {
    if (!serialized) {
      return createNewGame(data, options);
    }
    const state = JSON.parse(serialized);
    if (state.saveVersion !== SAVE_VERSION) {
      return createNewGame(data, options);
    }
    state.timestamps.now = options.now || Date.now();
    ensureProgressShape(state);
    ensureCombatPacing(state);
    ensureBuildingProgression(state, data);
    recalculatePower(state);
    syncPartyHealth(state, { keepLowHealth: true });
    spawnEnemy(state, data);
    return state;
  }

  function applyOfflineProgress(state, data, now = Date.now()) {
    const elapsedMs = Math.max(0, now - (state.timestamps.lastSavedAt || state.timestamps.now || now));
    const cappedHours = Math.min(data.economy.offlineHourCap, elapsedMs / 3600000);
    const tierMultiplier = 1 + KINGDOM_TIERS.findIndex((tier) => tier.id === state.village.tier.id) * 0.2;
    const buildingProductionTotal = state.village.buildings.reduce((sum, building) => sum + building.productionPerHour, 0);
    const reward = {
      cappedHours: Math.round(cappedHours * 10) / 10,
      gold: Math.floor((data.economy.baseOfflineGoldPerHour + buildingProductionTotal * 0.8) * cappedHours * tierMultiplier),
      resources: {
        food: Math.floor(260 * cappedHours * tierMultiplier),
        wood: Math.floor(220 * cappedHours * tierMultiplier),
        ore: Math.floor(130 * cappedHours * tierMultiplier),
        magicStone: Math.floor(24 * cappedHours * tierMultiplier),
      },
      claimed: false,
    };
    addResources(state, {
      gold: reward.gold,
      food: reward.resources.food,
      wood: reward.resources.wood,
      ore: reward.resources.ore,
      magicStone: reward.resources.magicStone,
    });
    state.offline.pending = reward;
    state.timestamps.now = now;
    state.timestamps.lastSavedAt = now;
    addLog(state, `오프라인 ${reward.cappedHours}시간 보상 수령`, 'reward');
    return reward;
  }

  function upgradeBuilding(state, data, buildingId) {
    syncBuildingLevelCaps(state, data);
    const building = state.village.buildings.find((entry) => entry.id === buildingId);
    if (!building) throw new Error(`Unknown building ${buildingId}`);
    const template = data.buildings.find((entry) => entry.id === buildingId);
    if (template) {
      building.finalMaxLevel = Math.max(template.maxLevel || 0, BUILDING_MAX_LEVEL);
      building.name = template.name;
      building.order = template.order;
      building.productionType = template.productionType;
      building.assetUrl = template.assetUrl;
    }
    syncBuildingLevelCaps(state, data);
    if (building.level >= building.maxLevel) return building;

    const costScale = Math.pow(building.level, 2.08) * (1 + buildingEraInfo(state).index * 0.18);
    const cost = {
      gold: Math.round(620 * costScale + building.order * 80),
      wood: Math.round(180 * costScale + building.order * 30),
      ore: Math.round(90 * costScale + building.order * 16),
    };
    if (state.resources.gold < cost.gold || state.resources.wood < cost.wood || state.resources.ore < cost.ore) {
      throw new Error('not_enough_resources');
    }

    state.resources.gold -= cost.gold;
    state.resources.wood -= cost.wood;
    state.resources.ore -= cost.ore;
    building.level += 1;
    building.productionPerHour = buildingProduction(building);
    state.progress.buildingsUpgraded += 1;
    recalculatePower(state);
    addLog(state, `${building.name} Lv.${building.level} 강화`, 'success');
    return building;
  }

  function levelHero(state, data, heroId) {
    const hero = state.heroes.owned.find((entry) => entry.id === heroId);
    if (!hero) throw new Error(`Unknown hero ${heroId}`);
    const discount = heroTrainingDiscount(state);
    const cost = {
      gold: Math.round(520 * Math.pow(hero.level, 1.75) * (1 - discount)),
      food: Math.round(130 * Math.pow(hero.level, 1.35) * (1 - discount)),
    };
    if (state.resources.gold < cost.gold || state.resources.food < cost.food) {
      throw new Error('not_enough_resources');
    }
    state.resources.gold -= cost.gold;
    state.resources.food -= cost.food;
    hero.level += 1;
    recalculatePower(state);
    syncPartyHealth(state, { keepLowHealth: true });
    addLog(state, `${hero.name} Lv.${hero.level} 달성`, 'success');
    return hero;
  }

  function openEquipmentChest(state, data, chestRarity = 'common', options = {}) {
    const random = makeRng(options.seed || state.rngSeed + state.inventory.nextUid * 97);
    const count = chestRarity === 'legendary' ? 5 : 3;
    const items = [];
    for (let index = 0; index < count; index += 1) {
      const pick = Math.floor(random() * data.equipment.length) % data.equipment.length;
      const item = createEquipmentInstance(data.equipment[pick], state, chestRarity);
      if (chestRarity === 'legendary') item.rarity = '전설';
      if (chestRarity === 'epic') item.rarity = item.rarity === '전설' ? '전설' : '영웅';
      if (chestRarity === 'rare' && !['전설', '영웅'].includes(item.rarity)) item.rarity = '희귀';
      item.rating = equipmentRating(item);
      state.inventory.equipment.push(item);
      state.progress.equipmentLooted += 1;
      items.push(item);
    }
    addLog(state, `${count}개 장비 상자 개봉`, 'reward');
    return { items };
  }

  function equipBest(state) {
    const changedSlots = [];
    for (const item of state.inventory.equipment) {
      const currentUid = state.inventory.equipped[item.slot];
      const current = state.inventory.equipment.find((entry) => entry.uid === currentUid);
      if (!current || item.rating > current.rating) {
        state.inventory.equipped[item.slot] = item.uid;
        if (!changedSlots.includes(item.slot)) changedSlots.push(item.slot);
      }
    }
    recalculatePower(state);
    if (changedSlots.length > 0) {
      addLog(state, `${changedSlots.length}개 슬롯 장비 자동 장착`, 'success');
    }
    return { changedSlots };
  }

  function summonHero(state, data) {
    const next = data.heroRoster.find((hero) => !state.heroes.unlockedIds.includes(hero.id));
    if (!next) {
      state.resources.diamond += 120;
      return null;
    }
    const hero = createOwnedHero(next, state.heroes.owned.length);
    state.heroes.owned.push(hero);
    state.heroes.unlockedIds.push(hero.id);
    recalculatePower(state);
    addLog(state, `${hero.name} 합류`, 'reward');
    return hero;
  }

  function claimAdReward(state, data, placementId, now = Date.now()) {
    const placement = data.shop.adPlacements.find((ad) => ad.id === placementId);
    if (!placement) throw new Error(`Unknown ad placement ${placementId}`);
    const key = dayKey(now);
    state.shop.adViewsByDay[key] = state.shop.adViewsByDay[key] || {};
    const viewed = state.shop.adViewsByDay[key][placementId] || 0;
    if (viewed >= placement.dailyLimit && !state.entitlements.removeAds) {
      return { ok: false, reason: 'daily_limit', forced: false };
    }
    state.shop.adViewsByDay[key][placementId] = viewed + 1;

    if (placementId === 'ad_free_summon') summonHero(state, data);
    if (placementId === 'ad_equipment_box') openEquipmentChest(state, data, 'rare');
    if (placementId === 'ad_gold_x2') state.buffs.timers.gold = { remaining: 30 * 60 };
    if (placementId === 'ad_resource_x2') state.buffs.timers.resources = { remaining: 30 * 60 };
    if (placementId === 'ad_offline_reward_x2' && state.offline.pending && !state.offline.pending.claimed) {
      addResources(state, {
        gold: state.offline.pending.gold,
        ...state.offline.pending.resources,
      });
      state.offline.pending.claimed = true;
    }
    if (placementId === 'ad_daily_special') {
      addResources(state, { diamond: 80, gold: 5000, magicStone: 60 });
    }
    if (placementId === 'ad_boss_retry') {
      state.resources.diamond += 30;
    }

    addLog(state, `${placement.name} 보상 획득`, 'reward');
    return { ok: true, forced: false, placement };
  }

  function mockPurchase(state, data, productId, now = Date.now()) {
    const product = data.shop.iapProducts.find((entry) => entry.id === productId);
    if (!product) throw new Error(`Unknown product ${productId}`);

    if (state.shop.purchases.some((purchase) => purchase.productId === productId) && product.productType !== 'consumable') {
      return { ok: false, reason: 'already_owned' };
    }

    if (productId === 'iap_starter_pack') {
      addResources(state, { diamond: 1200, gold: 30000, magicStone: 180 });
      openEquipmentChest(state, data, 'epic');
    }
    if (productId === 'iap_remove_ads') state.entitlements.removeAds = true;
    if (productId === 'iap_monthly_subscription') {
      state.entitlements.monthly = true;
      addResources(state, { diamond: 650, gold: 20000 });
    }
    if (productId === 'iap_kingdom_pass') {
      state.entitlements.kingdomPass = true;
      addResources(state, { diamond: 900, magicStone: 220 });
    }
    if (productId.startsWith('iap_growth_pack')) {
      addResources(state, { diamond: 500 + product.priceKrw / 20, gold: product.priceKrw * 18, food: 5000, wood: 5000, ore: 3000 });
      openEquipmentChest(state, data, productId.endsWith('_3') ? 'legendary' : 'epic');
    }

    state.shop.purchases.push({
      productId,
      at: now,
      priceKrw: product.priceKrw,
      transactionId: `mock_${productId}_${now}`,
    });
    recalculatePower(state);
    addLog(state, `${productId} 지급 완료`, 'reward');
    return { ok: true, product };
  }

  function claimLoginReward(state, data, now = Date.now()) {
    const key = dayKey(now);
    if (state.retention.claimedDayKeys.includes(key)) {
      return { ok: false, reason: 'already_claimed_today' };
    }

    const day = state.retention.claimedDayKeys.length + 1;
    const reward = data.retention.loginRewards[Math.min(day, 30) - 1];
    state.retention.claimedDayKeys.push(key);
    state.retention.loginStreak = day;
    addResources(state, reward);

    if (reward.specialItemId) {
      state.inventory.specialItems.push({
        id: reward.specialItemId,
        name: reward.specialItemName,
        day,
        at: now,
      });
      addLog(state, `${reward.specialItemName} 획득`, 'reward');
    } else {
      addLog(state, `${reward.label} 수령`, 'reward');
    }

    if (day % 7 === 0) {
      state.retention.weeklyOrders.completed += 1;
      addResources(state, { diamond: 180, gold: 15000 });
    }
    if (day === 30 && !state.retention.monthlyRelics.claimed.includes('month_1')) {
      state.retention.monthlyRelics.claimed.push('month_1');
    }

    return { ok: true, day, reward };
  }

  function selectTab(state, tabId) {
    state.activeTab = tabId;
    return state;
  }

  function stateSummary(state) {
    return {
      coordinateSystem: 'Canvas origin is top-left; x increases right, y increases down.',
      activeTab: state.activeTab,
      stage: state.combat.stage,
      kingdomTier: state.village.tier.name,
      enemy: state.combat.enemy
        ? {
            name: state.combat.enemy.name,
            hp: Math.round(state.combat.enemy.hp),
            hpMax: state.combat.enemy.hpMax,
            hpPercent: Math.round((state.combat.enemy.hp / Math.max(1, state.combat.enemy.hpMax)) * 100),
            isBoss: state.combat.enemy.isBoss,
          }
        : null,
      party: {
        hp: Math.round(state.combat.partyHp),
        hpMax: state.combat.partyHpMax,
        hpPercent: Math.round((state.combat.partyHp / Math.max(1, state.combat.partyHpMax)) * 100),
      },
      resources: { ...state.resources },
      power: { ...state.power },
      buildingEra: buildingEraInfo(state),
      heroes: state.heroes.owned.map((hero) => ({
        id: hero.id,
        name: hero.name,
        level: hero.level,
        skillCharge: Math.round(hero.skillCharge),
      })),
      buildings: state.village.buildings.map((building) => ({
        id: building.id,
        name: building.name,
        level: building.level,
        maxLevel: building.maxLevel,
        productionPerHour: building.productionPerHour,
        stage: buildingStageInfo(building).label,
        nextMilestoneLevel: buildingStageInfo(building).nextMilestoneLevel,
      })),
      progress: { ...state.progress },
      retention: {
        loginStreak: state.retention.loginStreak,
        specialItems: state.inventory.specialItems.map((item) => item.id),
      },
    };
  }

  return {
    advanceTime,
    advanceBuildingEra,
    applyOfflineProgress,
    buildingProduction,
    buildingEraInfo,
    buildingStageInfo,
    canAdvanceBuildingEra,
    claimAdReward,
    claimLoginReward,
    createNewGame,
    equipBest,
    loadGame,
    mockPurchase,
    openEquipmentChest,
    recalculatePower,
    selectTab,
    serializeGame,
    spawnEnemy,
    stateSummary,
    syncBuildingLevelCaps,
    upgradeBuilding,
    levelHero,
  };
});
