const Runtime = window.LostKingdomRuntime;
const app = document.getElementById('app');

const PROJECT_TITLE = '잃어버린 왕국 : 재건의 시대';
const OPENING_SESSION_KEY = 'lost_kingdom_opening_seen_v3';
const TUTORIAL_KEY = 'lost_kingdom_tutorial_seen_v2';
const SOUND_SETTINGS_KEY = 'lost_kingdom_sound_enabled_v1';
const DAILY_REWARD_DISMISS_PREFIX = 'lost_kingdom_daily_reward_dismissed_';
const RESOURCE_KEYS = ['gold', 'diamond', 'food', 'wood', 'ore', 'magicStone'];
const SCROLL_BOTTOM_EPSILON = 12;
const DAILY_STAGE_TARGET = 10;
const DAILY_EQUIPMENT_TARGET = 10;
const DAILY_BUILDING_TARGET = 3;
const AUDIO_MANIFEST_URL = 'audio-manifest.json';
const AUDIO_VOLUME = {
  bgm: 0.28,
  ambience: 0.16,
  sfx: 0.56,
};
const KINGDOM_PROGRESS_TIERS = [
  { name: '폐허', minProgress: 0 },
  { name: '마을', minProgress: 4 },
  { name: '도시', minProgress: 10 },
  { name: '왕국', minProgress: 18 },
  { name: '제국', minProgress: 30 },
];

let data;
let state;
let canvas;
let ctx;
let imageCache = new Map();
let lastFrame = 0;
let renderUiAt = 0;
let saveAt = 0;
let toastQueue = [];
let toastUid = 1;
let effectFrameCache = new Map();
let audioManager = null;
let sfxLastPlayedAt = new Map();

const ui = {
  openingVisible: false,
  tutorialStep: -1,
  combatEvents: [],
  screenShakeMs: 0,
  enemyHitShakeMs: 0,
  heroHitShakeMs: 0,
  heroAttackPulseMs: 0,
  focusImpactMs: 0,
  stageFlashMs: 0,
  lastCombatSnapshot: null,
  eventUid: 1,
  rewardUid: 1,
  upgradeUid: 1,
  userInteracted: false,
  dailyRewardVisible: false,
  renderedPanelTab: null,
  panelScrollByTab: {},
  suppressPanelScrollSave: false,
  activeDragScroll: null,
  lastBuildingUpgrade: null,
  lastVillageAscension: null,
  heroDetailId: null,
};

const nativeMonetization = {
  nextRequestId: 1,
  rewardedAdRequests: new Map(),
  purchaseRequests: new Map(),
  restoreRequests: new Map(),
};

function nextNativeRequestId(prefix) {
  nativeMonetization.nextRequestId += 1;
  return `${prefix}_${Date.now()}_${nativeMonetization.nextRequestId}`;
}

function parseNativePayload(payload) {
  if (!payload) return {};
  if (typeof payload === 'string') {
    try {
      return JSON.parse(payload);
    } catch {
      return {};
    }
  }
  return payload;
}

function resolveNativeRequest(map, payload) {
  const result = parseNativePayload(payload);
  const entry = map.get(result.requestId);
  if (!entry) return;
  clearTimeout(entry.timeout);
  map.delete(result.requestId);
  entry.resolve(result);
}

function requestNativeRewardedAd(placementId) {
  if (state?.entitlements?.removeAds) {
    return Promise.resolve({ success: true, native: false, skipped: true });
  }
  if (!window.LostKingdomAds?.showRewardedAd) {
    return Promise.resolve({ success: true, native: false, fallback: true });
  }
  const requestId = nextNativeRequestId('ad');
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      nativeMonetization.rewardedAdRequests.delete(requestId);
      resolve({ requestId, placementId, success: false, status: 'timeout', message: '광고 응답 시간이 초과되었습니다.' });
    }, 240000);
    nativeMonetization.rewardedAdRequests.set(requestId, { resolve, timeout });
    try {
      window.LostKingdomAds.showRewardedAd(placementId, requestId);
    } catch (error) {
      clearTimeout(timeout);
      nativeMonetization.rewardedAdRequests.delete(requestId);
      resolve({ requestId, placementId, success: false, status: 'bridge_error', message: error.message });
    }
  });
}

function requestNativePurchase(productId) {
  if (!window.LostKingdomBilling?.purchaseProduct) {
    return Promise.resolve({ success: true, native: false, fallback: true });
  }
  const requestId = nextNativeRequestId('purchase');
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      nativeMonetization.purchaseRequests.delete(requestId);
      resolve({ requestId, productId, success: false, status: 'timeout', message: '결제 응답 시간이 초과되었습니다.' });
    }, 240000);
    nativeMonetization.purchaseRequests.set(requestId, { resolve, timeout });
    try {
      window.LostKingdomBilling.purchaseProduct(productId, requestId);
    } catch (error) {
      clearTimeout(timeout);
      nativeMonetization.purchaseRequests.delete(requestId);
      resolve({ requestId, productId, success: false, status: 'bridge_error', message: error.message });
    }
  });
}

function requestNativeRestorePurchases() {
  if (!window.LostKingdomBilling?.restorePurchases) {
    return Promise.resolve({ success: false, native: false, fallback: true, restoredProductIds: [] });
  }
  const requestId = nextNativeRequestId('restore');
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      nativeMonetization.restoreRequests.delete(requestId);
      resolve({ requestId, success: false, status: 'timeout', restoredProductIds: [] });
    }, 240000);
    nativeMonetization.restoreRequests.set(requestId, { resolve, timeout });
    try {
      window.LostKingdomBilling.restorePurchases(requestId);
    } catch (error) {
      clearTimeout(timeout);
      nativeMonetization.restoreRequests.delete(requestId);
      resolve({ requestId, success: false, status: 'bridge_error', message: error.message, restoredProductIds: [] });
    }
  });
}

window.onLostKingdomRewardedAdResult = (payload) => {
  resolveNativeRequest(nativeMonetization.rewardedAdRequests, payload);
};

window.onLostKingdomPurchaseResult = (payload) => {
  resolveNativeRequest(nativeMonetization.purchaseRequests, payload);
};

window.onLostKingdomRestoreResult = (payload) => {
  resolveNativeRequest(nativeMonetization.restoreRequests, payload);
};

function createAudioManager() {
  const registry = new Map();
  const bgm = new Audio();
  const ambience = new Audio();
  const oneShots = new Map();
  let unlocked = false;
  let enabled = true;
  let currentBgmId = '';
  let currentAmbienceId = '';

  bgm.loop = true;
  bgm.volume = AUDIO_VOLUME.bgm;
  ambience.loop = true;
  ambience.volume = AUDIO_VOLUME.ambience;

  function canPlay() {
    return enabled && unlocked && registry.size > 0;
  }

  function entry(id) {
    return registry.get(id) || null;
  }

  function playLoop(player, currentId, nextId, volume) {
    if (!canPlay() || !nextId) return currentId;
    const sound = entry(nextId);
    if (!sound) return currentId;
    if (currentId !== nextId) {
      player.src = sound.url;
    }
    player.volume = volume;
    player.loop = true;
    player.muted = !enabled;
    player.play().catch(() => {});
    return nextId;
  }

  function silence() {
    bgm.pause();
    ambience.pause();
    for (const channel of oneShots.values()) {
      channel.pause();
    }
    oneShots.clear();
  }

  return {
    async load(url) {
      try {
        const sounds = await fetch(url).then((response) => {
          if (!response.ok) throw new Error(`${url} ${response.status}`);
          return response.json();
        });
        sounds.forEach((sound) => {
          registry.set(sound.id, sound);
        });
      } catch {
        // Audio is optional for the preview runtime; gameplay must stay available.
      }
    },
    unlock() {
      unlocked = true;
      bgm.muted = !enabled;
      ambience.muted = !enabled;
      if (enabled) setBgmForContext();
    },
    playSfx(id, options = {}) {
      if (!canPlay()) return;
      const sound = entry(id);
      if (!sound) return;
      const channel = new Audio(sound.url);
      channel.volume = options.volume ?? AUDIO_VOLUME.sfx;
      channel.playbackRate = options.rate ?? 1;
      oneShots.set(`${id}:${Date.now()}:${Math.random()}`, channel);
      channel.addEventListener('ended', () => {
        for (const [key, value] of oneShots.entries()) {
          if (value === channel) oneShots.delete(key);
        }
      }, { once: true });
      channel.play().catch(() => {});
    },
    setBgm(id) {
      currentBgmId = playLoop(bgm, currentBgmId, id, AUDIO_VOLUME.bgm);
    },
    setAmbience(id) {
      currentAmbienceId = playLoop(ambience, currentAmbienceId, id, AUDIO_VOLUME.ambience);
    },
    setEnabled(nextEnabled) {
      enabled = Boolean(nextEnabled);
      bgm.muted = !enabled;
      ambience.muted = !enabled;
      if (!enabled) {
        silence();
        return;
      }
      if (unlocked) setBgmForContext();
    },
    state() {
      return {
        unlocked,
        enabled,
        loaded: registry.size,
        bgm: currentBgmId,
        ambience: currentAmbienceId,
      };
    },
  };
}

function playSfx(id, options = {}) {
  audioManager?.playSfx(id, options);
}

function playSfxThrottled(id, minIntervalMs = 160, options = {}) {
  const now = Date.now();
  const last = sfxLastPlayedAt.get(id) || 0;
  if (now - last < minIntervalMs) return;
  sfxLastPlayedAt.set(id, now);
  playSfx(id, options);
}

function isCombatSceneAudioActive() {
  return state?.activeTab === 'combat' && !ui.openingVisible && !ui.dailyRewardVisible;
}

function playCombatSfx(id, options = {}) {
  if (!isCombatSceneAudioActive()) return;
  playSfx(id, options);
}

function playCombatSfxThrottled(id, minIntervalMs = 160, options = {}) {
  if (!isCombatSceneAudioActive()) return;
  playSfxThrottled(id, minIntervalMs, options);
}

function villageBgmId() {
  const tierName = state?.village?.tier?.name || '';
  if (tierName.includes('?쒓뎅')) return 'bgm_village_empire';
  if (tierName.includes('?뺢뎅')) return 'bgm_village_kingdom';
  if (tierName.includes('?꾩떆')) return 'bgm_village_city';
  if (tierName.includes('留덉쓣')) return 'bgm_village_town';
  return 'bgm_village_ruins';
}

function combatBgmId() {
  if (state?.combat?.enemy?.isBoss) return 'bgm_boss_encounter';
  const regionIndex = Math.min(7, Math.max(0, Math.floor((state?.combat?.stage || 1) / 25)));
  return [
    'bgm_combat_plains',
    'bgm_combat_forest',
    'bgm_combat_mine',
    'bgm_combat_desert',
    'bgm_combat_snowfield',
    'bgm_combat_volcano',
    'bgm_combat_abyss',
    'bgm_combat_demon_castle',
  ][regionIndex];
}

function setBgmForContext() {
  if (!audioManager || !state) return;
  if (ui.openingVisible) {
    audioManager.setBgm('bgm_opening_ruins_to_hope');
    audioManager.setAmbience('amb_village_ruins_wind');
    return;
  }
  if (ui.dailyRewardVisible) {
    audioManager.setBgm('bgm_reward_ceremony');
    audioManager.setAmbience('amb_castle_hall');
    return;
  }
  if (state.activeTab === 'combat') {
    audioManager.setBgm(combatBgmId());
    audioManager.setAmbience('amb_plains_breeze');
    return;
  }
  if (state.activeTab === 'shop') {
    audioManager.setBgm('bgm_shop_merchant');
    audioManager.setAmbience('amb_shop_interior');
    return;
  }
  if (state.activeTab === 'heroes' || state.activeTab === 'equipment' || state.activeTab === 'settings') {
    audioManager.setBgm('bgm_hero_hall');
    audioManager.setAmbience('amb_castle_hall');
    return;
  }
  audioManager.setBgm(villageBgmId());
  audioManager.setAmbience(state.village.tier.name === '?먰뿀' ? 'amb_village_ruins_wind' : 'amb_village_busy_day');
}

const tutorialSteps = [
  {
    tab: 'village',
    title: '왕국 로비',
    body: '건물 강화 → 왕국 성장',
  },
  {
    tab: 'combat',
    title: '자동 전투',
    body: '자동 전투 + 즉시 타격',
  },
  {
    tab: 'equipment',
    title: '장비 성장',
    body: '상자 열기 → 자동 장착',
  },
];

function storageGet(storage, key) {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(storage, key, value) {
  try {
    storage.setItem(key, value);
  } catch {
    // Storage can be unavailable in restricted browser modes.
  }
}

function isSoundEnabled() {
  return storageGet(localStorage, SOUND_SETTINGS_KEY) !== 'off';
}

function setSoundEnabled(enabled) {
  const nextEnabled = Boolean(enabled);
  storageSet(localStorage, SOUND_SETTINGS_KEY, nextEnabled ? 'on' : 'off');
  audioManager?.setEnabled(nextEnabled);
  return nextEnabled;
}

function formatNumber(value) {
  const numeric = Number(value || 0);
  if (!Number.isFinite(numeric)) return '0';
  const abs = Math.abs(numeric);
  if (abs < 1000) return new Intl.NumberFormat('ko-KR').format(Math.floor(numeric));

  const units = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc'];
  let unitIndex = Math.min(units.length - 1, Math.floor(Math.log10(abs) / 3));
  let scaled = numeric / (1000 ** unitIndex);
  if (Math.abs(scaled) >= 1000 && unitIndex < units.length - 1) {
    unitIndex += 1;
    scaled = numeric / (1000 ** unitIndex);
  }
  const decimals = Math.abs(scaled) >= 100 ? 0 : 1;
  return `${scaled.toFixed(decimals).replace(/\.0$/, '')}${units[unitIndex]}`;
}

function formatWon(value) {
  return `${new Intl.NumberFormat('ko-KR').format(Math.floor(value || 0))}원`;
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function dailyRewardDismissKey(key = todayKey()) {
  return `${DAILY_REWARD_DISMISS_PREFIX}${key}`;
}

function isDailyRewardClaimedToday() {
  return state.retention.claimedDayKeys.includes(todayKey());
}

function isDailyRewardDismissedToday() {
  return storageGet(localStorage, dailyRewardDismissKey()) === '1';
}

function shouldShowDailyRewardOverlay() {
  return !isDailyRewardClaimedToday() && !isDailyRewardDismissedToday();
}

function isDailyRewardBlocking() {
  return ui.dailyRewardVisible && !isDailyRewardClaimedToday() && !isDailyRewardDismissedToday();
}

function dismissDailyRewardOverlay() {
  ui.dailyRewardVisible = false;
  storageSet(localStorage, dailyRewardDismissKey(), '1');
}

function currencyAsset(key) {
  const index = {
    gold: 0,
    diamond: 1,
    food: 2,
    wood: 3,
    ore: 4,
    magicStone: 5,
  }[key];
  return index === undefined ? null : data.assets.currencies[index];
}

function currencyLabel(key) {
  return {
    gold: '골드',
    diamond: '다이아',
    food: '식량',
    wood: '목재',
    ore: '광석',
    magicStone: '마력석',
  }[key] || key;
}

const EQUIPMENT_SLOT_ORDER = ['weapon', 'helmet', 'armor', 'gloves', 'boots', 'necklace', 'ring', 'cloak', 'belt', 'artifact'];

function slotLabel(slot) {
  return {
    weapon: '무기',
    helmet: '투구',
    armor: '갑옷',
    gloves: '장갑',
    boots: '신발',
    necklace: '목걸이',
    ring: '반지',
    cloak: '망토',
    belt: '허리띠',
    artifact: '유물',
  }[slot] || slot;
}

function productTypeLabel(type) {
  return {
    consumable: '소모성 상품',
    non_consumable: '영구 상품',
    subscription: '구독 상품',
    season_pass: '시즌 패스',
  }[type] || type;
}

function restorePolicyLabel(policy) {
  if (policy?.includes('restore')) return '복원 가능';
  return '소모성';
}

function productBenefitItems(product) {
  const byId = {
    iap_starter_pack: ['다이아 1,200', '골드 30K', '마력석 180', '희귀 이상 장비 상자'],
    iap_remove_ads: ['광고 시청 없이 보상 수령', '영구 적용', '복원 가능'],
    iap_monthly_subscription: ['일일 다이아 보급', '경험치 버프', '자원 생산 버프', '30일 혜택'],
    iap_kingdom_pass: ['시즌 프리미엄 보상', '다이아 900', '마력석 220', '패스 전용 보급'],
    iap_growth_pack_1: ['초반 성장 재화', '다이아 795', '골드 106K', '영웅 장비 상자'],
    iap_growth_pack_2: ['중반 성장 재화', '다이아 1,145', '골드 232K', '영웅 장비 상자'],
    iap_growth_pack_3: ['후반 성장 재화', '다이아 1,950', '골드 522K', '전설 장비 상자'],
  };
  return byId[product.id] || [productTypeLabel(product.productType), restorePolicyLabel(product.restorePolicy)];
}

function productShortDescription(product) {
  const byId = {
    iap_starter_pack: '초반 성장에 필요한 핵심 재화와 장비',
    iap_remove_ads: '선택형 광고 보상을 바로 수령',
    iap_monthly_subscription: '30일 동안 매일 받는 성장 혜택',
    iap_kingdom_pass: '시즌 목표 달성 보상 확장',
    iap_growth_pack_1: '초반 구간 빠른 왕국 복구 지원',
    iap_growth_pack_2: '중반 구간 영웅과 장비 성장 지원',
    iap_growth_pack_3: '후반 구간 전투력 상승 집중 지원',
  };
  return byId[product.id] || productTypeLabel(product.productType);
}

function buildingEffectSummary(building) {
  const stage = buildingStageInfo(building);
  const effects = {
    kingdom: '골드 생산 · 왕국 단계 성장',
    hero: '식량 생산 · 영웅 훈련 보조',
    crafting: '광석 생산 · 장비 성장 보조',
    food: '식량 생산',
    wood: '목재 생산',
    stone: '광석 보조 생산',
    ore: '광석 생산',
    magicStone: '마력석 생산',
    gold: '골드 생산',
    expedition: '골드/마력석 탐험 보조',
    research: '마력석 연구 보조',
    defense: '골드 보조 · 방어 전투력',
  };
  return `${effects[building.productionType] || '오프라인 보상 보조'} · ${stage.label} 전투력 x${stage.powerMultiplier.toFixed(2)}`;
}

function buildingStageInfo(building) {
  return Runtime.buildingStageInfo(building);
}

function buildingEraInfo() {
  return Runtime.buildingEraInfo(state);
}

function buildingMilestoneProgress(building, stage) {
  const start = stage.bandStart || Math.max(1, stage.maxLevel - 4);
  const end = stage.maxLevel || building.maxLevel || 5;
  return Math.max(1, Math.min(5, Math.ceil(((building.level - start + 1) / Math.max(1, end - start + 1)) * 5)));
}

function renderBuildingMilestoneTrack(building, stage) {
  const track = el('div', 'building-milestone-track');
  const filled = buildingMilestoneProgress(building, stage);
  for (let index = 1; index <= 5; index += 1) {
    track.append(el('span', index <= filled ? 'filled' : ''));
  }
  return track;
}

function currentAdViews(placementId) {
  const key = todayKey();
  return state.shop.adViewsByDay[key]?.[placementId] || 0;
}

function adStatusText(placementId) {
  const placement = data.shop.adPlacements.find((ad) => ad.id === placementId);
  if (!placement) return '선택형 보상';
  if (state.entitlements.removeAds) return '광고 제거 보유 · 즉시 수령';
  return `선택형 광고 · 오늘 ${Math.min(currentAdViews(placementId), placement.dailyLimit)}/${placement.dailyLimit}`;
}

function shortAdStatusText(placementId) {
  const placement = data.shop.adPlacements.find((ad) => ad.id === placementId);
  if (!placement) return '보상';
  if (state.entitlements.removeAds) return '즉시 수령';
  return `오늘 ${Math.min(currentAdViews(placementId), placement.dailyLimit)}/${placement.dailyLimit}`;
}

function todayRewardStatusText() {
  if (isDailyRewardClaimedToday()) return `오늘 수령 완료 · 내일 ${state.retention.claimedDayKeys.length + 1}일차`;
  if (isDailyRewardDismissedToday()) return '오늘 보류 중 · 전투 탭에서 다시 수령';
  return `${state.retention.claimedDayKeys.length + 1}일차 보급 대기`;
}

function pacingSnapshot() {
  const pacing = state.combat.pacing || {};
  const limit = pacing.windowLimit || 80;
  const clears = Math.min(limit, pacing.autoStageClearsInWindow || 0);
  const minutes = Math.max(1, Math.round((pacing.minStageIntervalMs || 600000) / 60000));
  const interval = pacing.minStageIntervalMs || 600000;
  const elapsed = Math.max(0, (state.timestamps?.now || Date.now()) - (pacing.lastAutoStageClearAt || 0));
  const remainingMs = clears < 5 || clears >= limit ? 0 : Math.max(0, interval - elapsed);
  return { pacing, limit, clears, minutes, remainingMs };
}

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function hpStatusText(value, max) {
  const safeMax = Math.max(1, max || 1);
  return `${formatNumber(value)}/${formatNumber(safeMax)} (${clampPercent(value / safeMax)}%)`;
}

function combatHudStatusText() {
  const enemy = state.combat.enemy;
  if (!enemy) return '적 탐색 중';
  return `적 HP ${hpStatusText(enemy.hp, enemy.hpMax)}`;
}

function partyHpStatusText() {
  return `아군 HP ${hpStatusText(state.combat.partyHp, state.combat.partyHpMax)}`;
}

function combatMomentumText() {
  const { limit, clears, remainingMs } = pacingSnapshot();
  if (clears >= limit) return `오늘 스테이지 진행 완료 · 순찰 보상 ${formatNumber(state.progress.patrolDefeats || 0)}회`;
  if (clears < 5) return `빠른 스테이지 진행 ${clears}/5`;
  return remainingMs > 0 ? `다음 스테이지까지 ${formatDuration(remainingMs)}` : '다음 처치 시 스테이지 진행';
}

function kingdomProgressScore() {
  const palace = state.village.buildings.find((building) => building.id === 'building_palace');
  return (palace?.level || 1) * 2 + Math.floor(state.combat.stage / 5) + state.progress.buildingsUpgraded;
}

function kingdomNextMilestone() {
  const score = kingdomProgressScore();
  const next = KINGDOM_PROGRESS_TIERS.find((tier) => score < tier.minProgress);
  const finalTier = KINGDOM_PROGRESS_TIERS[KINGDOM_PROGRESS_TIERS.length - 1];
  const max = next?.minProgress || Math.max(score, finalTier.minProgress);
  return {
    score,
    max,
    nextName: next?.name || finalTier.name,
    remaining: next ? Math.max(0, next.minProgress - score) : 0,
    complete: !next,
  };
}

function liveTextValues() {
  const { limit, clears, minutes } = pacingSnapshot();
  const kingdom = kingdomNextMilestone();
  return {
    combatPanelStage: `Stage ${state.combat.stage}`,
    metricEnemies: formatNumber(state.progress.enemiesDefeated),
    metricBosses: formatNumber(state.progress.bossesDefeated),
    metricEquipment: formatNumber(state.progress.equipmentLooted),
    metricTier: state.village.tier.name,
    villageTier: state.village.tier.name,
    lobbyStatus: `${state.village.tier.name} 단계 · 전투력 ${formatNumber(state.power.total)}`,
    kingdomNextGoal: kingdom.complete ? '최종 제국 단계 유지 중' : `${kingdom.nextName}까지 ${kingdom.remaining} 진척`,
    kingdomProgressValue: `${Math.min(kingdom.score, kingdom.max)}/${kingdom.max}`,
    combatHudStatus: combatHudStatusText(),
    partyHpStatus: partyHpStatusText(),
    combatMomentum: combatMomentumText(),
    objectiveStageValue: `${Math.min(DAILY_STAGE_TARGET, state.combat.stage)}/${DAILY_STAGE_TARGET}`,
    objectiveEquipmentValue: `${Math.min(DAILY_EQUIPMENT_TARGET, state.progress.equipmentLooted)}/${DAILY_EQUIPMENT_TARGET}`,
    objectiveBuildingValue: `${Math.min(DAILY_BUILDING_TARGET, state.progress.buildingsUpgraded)}/${DAILY_BUILDING_TARGET}`,
    pacingTitle: clears >= limit ? '순찰 모드' : '자동 원정',
    pacingHelp: combatMomentumText(),
    pacingValue: `${clears}/${limit}`,
    dailyStageValue: `현재 Stage ${state.combat.stage}`,
    dailyEquipmentValue: `장비 ${formatNumber(state.progress.equipmentLooted)}개`,
    dailyBuildingValue: `건물 ${formatNumber(state.progress.buildingsUpgraded)}회`,
    dailyRewardStatus: todayRewardStatusText(),
    offlineRewardNote: state.offline.pending && !state.offline.pending.claimed ? '2배 가능' : '없음',
    freeSummonStatus: shortAdStatusText('ad_free_summon'),
    equipmentBoxStatus: shortAdStatusText('ad_equipment_box'),
    dailySpecialStatus: shortAdStatusText('ad_daily_special'),
    dailyLoginStatus: isDailyRewardClaimedToday() ? '수령 완료' : '수령 가능',
    equipmentCount: `${state.inventory.equipment.length}개`,
    equippedCount: `${Object.keys(state.inventory.equipped).length}부위`,
  };
}

function liveProgressValues() {
  const { limit, clears } = pacingSnapshot();
  const kingdom = kingdomNextMilestone();
  const values = {
    enemyHp: { value: state.combat.enemy?.hp || 0, max: state.combat.enemy?.hpMax || 1 },
    partyHp: { value: state.combat.partyHp, max: state.combat.partyHpMax },
    objectiveStage: { value: state.combat.stage, max: DAILY_STAGE_TARGET },
    objectiveEquipment: { value: state.progress.equipmentLooted, max: DAILY_EQUIPMENT_TARGET },
    objectiveBuilding: { value: state.progress.buildingsUpgraded, max: DAILY_BUILDING_TARGET },
    kingdomMilestone: { value: kingdom.score, max: kingdom.max },
    pacingClears: { value: clears, max: limit },
  };
  state.heroes.owned.forEach((hero) => {
    values[`skill_${hero.id}`] = { value: Math.round(hero.skillCharge), max: 100 };
  });
  return values;
}

function renderLivePanelUpdates() {
  if (!state) return;
  Runtime.recalculatePower(state);
  const textValues = liveTextValues();
  document.querySelectorAll('[data-live-text]').forEach((node) => {
    const value = textValues[node.dataset.liveText];
    if (value !== undefined) setStableText(node, value);
  });

  const progressValues = liveProgressValues();
  document.querySelectorAll('[data-live-progress]').forEach((node) => {
    const progress = progressValues[node.dataset.liveProgress];
    if (!progress) return;
    const max = Math.max(1, progress.max || 1);
    const value = Math.max(0, progress.value || 0);
    const label = node.querySelector('[data-live-progress-value]');
    const fill = node.querySelector('[data-live-progress-fill]');
    if (label) setStableText(label, progressValueText(value, max));
    if (fill) fill.style.width = `${clampPercent(value / max)}%`;
  });

  const { limit, clears } = pacingSnapshot();
  document.querySelectorAll('.patrol-status').forEach((node) => {
    node.classList.toggle('capped', clears >= limit);
  });
}

function setStableText(node, value) {
  const text = String(value);
  if (!node || node.textContent === text) return;
  if (node.childNodes.length === 1 && node.firstChild?.nodeType === Node.TEXT_NODE) {
    node.firstChild.nodeValue = text;
    return;
  }
  node.textContent = text;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function image(url) {
  if (!url) return null;
  if (!imageCache.has(url)) {
    const img = new Image();
    img.src = url;
    imageCache.set(url, img);
  }
  return imageCache.get(url);
}

function effectFrameDataUrl(assetUrl, frameIndex, cols = 4, rows = 4) {
  if (!assetUrl) return null;
  const key = `${assetUrl}:${frameIndex}:${cols}x${rows}`;
  if (effectFrameCache.has(key)) return effectFrameCache.get(key);
  const img = image(assetUrl);
  if (!img?.complete || img.naturalWidth <= 0 || img.naturalHeight <= 0) return null;

  const col = frameIndex % cols;
  const row = Math.floor(frameIndex / cols);
  const sx = Math.round((col * img.naturalWidth) / cols);
  const sy = Math.round((row * img.naturalHeight) / rows);
  const ex = Math.round(((col + 1) * img.naturalWidth) / cols);
  const ey = Math.round(((row + 1) * img.naturalHeight) / rows);
  const sw = Math.max(1, ex - sx);
  const sh = Math.max(1, ey - sy);

  const frameCanvas = document.createElement('canvas');
  frameCanvas.width = sw;
  frameCanvas.height = sh;
  const frameCtx = frameCanvas.getContext('2d');
  frameCtx.clearRect(0, 0, sw, sh);
  frameCtx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
  const url = frameCanvas.toDataURL('image/png');
  effectFrameCache.set(key, url);
  return url;
}

function animateEffectFrames(element, assetUrl, cols = 4, rows = 4, duration = 820) {
  const img = image(assetUrl);
  if (!element || !img) return;
  const totalFrames = cols * rows;
  const start = () => {
    const startedAt = performance.now();
    const tick = (now) => {
      if (!element.isConnected) return;
      const progress = Math.min(0.999, Math.max(0, (now - startedAt) / duration));
      const frameIndex = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
      const frameUrl = effectFrameDataUrl(assetUrl, frameIndex, cols, rows);
      if (frameUrl) element.style.backgroundImage = `url("${frameUrl}")`;
      if (progress < 0.999) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (img.complete && img.naturalWidth > 0) {
    start();
  } else {
    img.addEventListener('load', start, { once: true });
  }
}

function saveGame() {
  if (!data || !state) return;
  localStorage.setItem(data.project.saveKey, Runtime.serializeGame(state));
}

function toast(message) {
  if (toastQueue[0]?.message === message) {
    toastQueue[0].ttl = 2400;
    renderToasts();
    return;
  }
  toastQueue.unshift({ id: toastUid += 1, message, ttl: 2400 });
  toastQueue = toastQueue.slice(0, 1);
  renderToasts();
}

function renderToasts() {
  const stack = document.querySelector('.toast-stack');
  if (!stack) return;
  const nextIds = toastQueue.map((item) => String(item.id)).join('|');
  if (stack.dataset.toastIds === nextIds) return;
  stack.dataset.toastIds = nextIds;
  stack.textContent = '';
  for (const item of toastQueue) {
    const node = el('div', 'toast', item.message);
    node.dataset.toastId = String(item.id);
    stack.append(node);
  }
}

function pointInShell(element, fallback = { x: 215, y: 280 }) {
  const shell = document.querySelector('.game-shell');
  if (!shell) return fallback;
  const shellRect = shell.getBoundingClientRect();
  if (!element) return fallback;
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left - shellRect.left + rect.width / 2,
    y: rect.top - shellRect.top + rect.height / 2,
  };
}

function resourceTargetPoint(key) {
  const selector = key === 'power' ? '[data-resource="power"]' : `[data-resource="${key}"]`;
  const target = document.querySelector(selector) || document.querySelector('[data-resource="gold"]');
  return pointInShell(target, { x: 80, y: 78 });
}

function defaultRewardSource(source) {
  if (source === 'combat') return { x: 305, y: 280 };
  if (source === 'daily') return { x: 215, y: 420 };
  if (source === 'shop') return { x: 215, y: 560 };
  return { x: 215, y: 500 };
}

function rewardIconUrl(key) {
  if (key === 'power') return data.navigation[1]?.icon;
  return currencyAsset(key)?.assetUrl || data.assets.currencies[0]?.assetUrl;
}

function rewardEntries(rewards) {
  if (!rewards) return [];
  return [...RESOURCE_KEYS, 'power']
    .map((key) => ({ key, amount: Math.floor(rewards[key] || 0) }))
    .filter((entry) => entry.amount > 0);
}

function createRewardBurst(rewards, options = {}) {
  const layer = document.querySelector('.reward-layer');
  if (!layer) return;
  const entries = rewardEntries(rewards);
  if (entries.length === 0) return;

  const sourcePoint = options.element
    ? pointInShell(options.element, defaultRewardSource(options.source))
    : defaultRewardSource(options.source);

  createScreenFlash(entries.some((entry) => entry.key === 'diamond') ? 'diamond' : 'gold');
  createSparkRain(sourcePoint, entries.some((entry) => entry.key === 'diamond') ? 'diamond' : 'gold');

  entries.forEach((entry, entryIndex) => {
    const count = entry.key === 'gold' || entry.key === 'diamond' ? 5 : 3;
    for (let index = 0; index < count; index += 1) {
      const target = resourceTargetPoint(entry.key);
      const fly = el('div', 'reward-fly');
      fly.dataset.reward = entry.key;
      const img = el('img');
      img.src = rewardIconUrl(entry.key);
      img.alt = '';
      const amount = el('strong', '', index === 0 ? `+${formatNumber(entry.amount)}` : '');
      fly.append(img, amount);
      const spreadX = ((index % 3) - 1) * 18 + entryIndex * 8;
      const spreadY = Math.floor(index / 3) * 14;
      fly.style.setProperty('--sx', `${sourcePoint.x + spreadX}px`);
      fly.style.setProperty('--sy', `${sourcePoint.y + spreadY}px`);
      fly.style.setProperty('--tx', `${target.x}px`);
      fly.style.setProperty('--ty', `${target.y}px`);
      fly.style.setProperty('--delay', `${index * 55 + entryIndex * 80}ms`);
      layer.append(fly);
      window.setTimeout(() => fly.remove(), 1450 + index * 60 + entryIndex * 80);
    }
  });
}

function createScreenFlash(tone = 'gold') {
  const layer = document.querySelector('.reward-layer');
  if (!layer) return;
  const flash = el('div', `screen-flash ${tone}`);
  layer.append(flash);
  window.setTimeout(() => flash.remove(), 520);
}

function createSparkRain(sourcePoint, tone = 'gold') {
  const layer = document.querySelector('.reward-layer');
  if (!layer) return;
  const rain = el('div', `spark-rain ${tone}`);
  rain.style.left = `${sourcePoint.x}px`;
  rain.style.top = `${sourcePoint.y}px`;
  const colors = tone === 'diamond'
    ? ['#9ad7ff', '#3f8cff', '#e8f7ff', '#7bdcff']
    : ['#ffd166', '#d19b38', '#fff1c7', '#f0b84e'];
  for (let index = 0; index < 26; index += 1) {
    const spark = el('span');
    spark.style.setProperty('--dx', `${((index % 7) - 3) * 21}px`);
    spark.style.setProperty('--dy', `${-36 - Math.floor(index / 7) * 16}px`);
    spark.style.setProperty('--delay', `${index * 14}ms`);
    spark.style.background = colors[index % colors.length];
    rain.append(spark);
  }
  layer.append(rain);
  window.setTimeout(() => rain.remove(), 980);
}

function createUpgradeBurst(element, label = 'LEVEL UP', assetUrl) {
  const layer = document.querySelector('.reward-layer');
  if (!layer) return;
  const center = element ? pointInShell(element, defaultRewardSource('upgrade')) : defaultRewardSource('daily');
  createScreenFlash('upgrade');
  createSparkRain(center, 'gold');
  const burst = el('div', 'upgrade-burst');
  burst.style.left = `${center.x}px`;
  burst.style.top = `${center.y}px`;
  const effect = data.assets.effects[(ui.upgradeUid += 1) % Math.max(1, data.assets.effects.length)];
  const effectImg = el('div', 'upgrade-effect');
  if (effect?.assetUrl) animateEffectFrames(effectImg, effect.assetUrl);
  const subject = el('img', 'upgrade-subject');
  subject.src = assetUrl || data.assets.buildings[0]?.assetUrl || data.assets.heroes[0]?.assetUrl;
  subject.alt = '';
  burst.append(effectImg, subject, el('strong', '', label));
  layer.append(burst);
  if (element) {
    element.classList.add('is-upgraded');
    window.setTimeout(() => element.classList.remove('is-upgraded'), 950);
  }
  ui.stageFlashMs = Math.max(ui.stageFlashMs, 360);
  window.setTimeout(() => burst.remove(), 1350);
}

function resourceSnapshot() {
  return RESOURCE_KEYS.reduce((snapshot, key) => {
    snapshot[key] = Math.floor(state.resources[key] || 0);
    return snapshot;
  }, {});
}

function resourceGainSince(before, extra = {}) {
  const gain = {};
  for (const key of RESOURCE_KEYS) {
    const amount = Math.floor((state.resources[key] || 0) - (before[key] || 0));
    if (amount > 0) gain[key] = amount;
  }
  return { ...gain, ...extra };
}

function equippedItem(slot) {
  const uid = state.inventory.equipped[slot];
  if (!uid) return null;
  return state.inventory.equipment.find((item) => item.uid === uid) || null;
}

function heroFocusSlots(index) {
  const sets = [
    ['weapon', 'armor', 'boots', 'artifact'],
    ['weapon', 'helmet', 'gloves', 'ring'],
    ['weapon', 'cloak', 'necklace', 'belt'],
  ];
  return sets[index % sets.length];
}

function slotPreviewItem(slot) {
  return data.equipment.find((item) => item.slot === slot) || null;
}

function renderLoadoutGrid(slots = EQUIPMENT_SLOT_ORDER.slice(0, 6), size = '') {
  const grid = el('div', size ? `loadout-grid ${size}` : 'loadout-grid');
  slots.forEach((slot) => {
    const item = equippedItem(slot);
    const preview = item ? null : slotPreviewItem(slot);
    const cell = el('article', item ? 'loadout-item equipped' : 'loadout-item empty preview');
    const iconWrap = el('div', 'loadout-icon');
    if (item?.assetUrl || preview?.assetUrl) {
      const img = el('img');
      img.src = item?.assetUrl || preview.assetUrl;
      img.alt = item?.name || '';
      if (!item) img.dataset.preview = 'true';
      iconWrap.append(img);
    } else {
      iconWrap.append(el('span', '', slotLabel(slot).slice(0, 1)));
    }
    const copy = el('div');
    copy.append(
      el('strong', '', item ? item.name : `${slotLabel(slot)} 미장착`),
      el('small', '', item ? `${slotLabel(slot)} · ${item.rarity} · ${formatNumber(item.rating)}` : slotLabel(slot))
    );
    cell.append(iconWrap, copy);
    grid.append(cell);
  });
  return grid;
}

function predictedBuildingProduction(building, level = building.level) {
  return Runtime.buildingProduction({ ...building, level });
}

function activeBuildingUpgrade(building) {
  if (!ui.lastBuildingUpgrade || ui.lastBuildingUpgrade.id !== building.id) return null;
  if (Date.now() - ui.lastBuildingUpgrade.at > 7000) return null;
  return ui.lastBuildingUpgrade;
}

function resourceDelta(before, after) {
  const gain = {};
  for (const key of RESOURCE_KEYS) {
    const amount = Math.floor((after?.[key] || 0) - (before?.[key] || 0));
    if (amount > 0) gain[key] = amount;
  }
  return gain;
}

function actionFeedbackSnapshot() {
  return JSON.stringify({
    tab: state.activeTab,
    stage: state.combat.stage,
    resources: RESOURCE_KEYS.map((key) => Math.floor(state.resources[key] || 0)),
    power: state.power.total,
    equipment: state.inventory.equipment.length,
    equipped: Object.keys(state.inventory.equipped).length,
    heroes: state.heroes.owned.map((hero) => `${hero.id}:${hero.level}`),
    buildings: state.village.buildings.map((building) => `${building.id}:${building.level}`),
    dailyVisible: ui.dailyRewardVisible,
    heroDetailId: ui.heroDetailId,
    purchases: state.shop.purchases.length,
    ads: state.shop.adViewsByDay,
  });
}

async function claimRewardedAd(placementId, now = Date.now()) {
  const nativeResult = await requestNativeRewardedAd(placementId);
  if (!nativeResult.success) {
    playSfx('ui_button_disabled');
    return {
      ok: false,
      reason: nativeResult.status || 'ad_unavailable',
      message: nativeResult.message || '광고를 아직 사용할 수 없습니다.',
    };
  }
  const result = Runtime.claimAdReward(state, data, placementId, now);
  if (result.ok) {
    playSfx(state.entitlements.removeAds ? 'ad_skip_entitlement' : 'ad_reward_claim', { volume: 0.52 });
  } else {
    playSfx('ui_button_disabled');
  }
  return result;
}

async function completeStorePurchase(productId, now = Date.now()) {
  playSfx('purchase_open', { volume: 0.42 });
  const nativeResult = await requestNativePurchase(productId);
  if (!nativeResult.success) {
    playSfx('purchase_cancel', { volume: 0.46 });
    return {
      ok: false,
      reason: nativeResult.status || 'purchase_failed',
      message: nativeResult.message || '결제가 완료되지 않았습니다.',
    };
  }
  const result = nativeResult.native === false
    ? Runtime.mockPurchase(state, data, productId, now)
    : Runtime.fulfillStorePurchase(
      state,
      data,
      productId,
      nativeResult.transactionId || nativeResult.orderId || `store_${productId}_${now}`,
      now
    );
  if (result.ok) {
    playSfx('purchase_success');
  } else {
    playSfx('purchase_cancel', { volume: 0.46 });
  }
  return result;
}

function completeMockPurchase(productId, now = Date.now()) {
  return completeStorePurchase(productId, now);
}

async function restoreStorePurchases(now = Date.now()) {
  const nativeResult = await requestNativeRestorePurchases();
  if (!nativeResult.success) {
    return {
      ok: false,
      message: nativeResult.native === false ? 'Android 앱에서 구매 복원을 사용할 수 있습니다.' : '복원할 구매가 없습니다.',
    };
  }
  const restoredProductIds = nativeResult.restoredProductIds || [];
  let restored = 0;
  for (const productId of restoredProductIds) {
    const product = data.shop.iapProducts.find((entry) => entry.id === productId);
    if (!product || product.productType === 'consumable') continue;
    const result = Runtime.fulfillStorePurchase(state, data, productId, `restore_${productId}_${now}`);
    if (result.ok) restored += 1;
  }
  if (restored > 0) {
    playSfx('purchase_restore', { volume: 0.5 });
    return { ok: true, message: `${restored}개 구매 복원 완료` };
  }
  return { ok: false, message: '새로 복원할 구매가 없습니다.' };
}

function makeButton(label, className, onClick) {
  const button = el('button', `btn ${className || ''}`, label);
  button.type = 'button';
  button.addEventListener('click', async () => {
    ui.userInteracted = true;
    audioManager?.unlock();
    playSfx('ui_tap_confirm_01');
    button.disabled = true;
    try {
      const before = actionFeedbackSnapshot();
      const result = await onClick();
      const after = actionFeedbackSnapshot();
      if (result?.message) {
        toast(result.message);
      } else if (!result?.silent) {
        toast(before === after ? `${label}: 변화 없음` : `${label} 완료`);
      }
      saveGame();
      renderAll();
    } catch (error) {
      playSfx('ui_error_soft');
      toast(error.message === 'not_enough_resources' ? '자원이 부족합니다.' : error.message);
    } finally {
      button.disabled = false;
    }
  });
  return button;
}

function panelScrollState(panel) {
  const maxTop = Math.max(0, panel.scrollHeight - panel.clientHeight);
  return {
    top: panel.scrollTop,
    bottomPinned: maxTop > 0 && maxTop - panel.scrollTop <= SCROLL_BOTTOM_EPSILON,
  };
}

function savePanelScroll(panel = document.querySelector('.panel'), options = {}) {
  if (!panel || !ui.renderedPanelTab) return;
  if (ui.suppressPanelScrollSave && !options.force) return;
  ui.panelScrollByTab[ui.renderedPanelTab] = panelScrollState(panel);
}

function restorePanelScroll(panel, tabId, savedState = ui.panelScrollByTab[tabId]) {
  const stateToRestore = savedState || { top: 0, bottomPinned: false };
  requestAnimationFrame(() => {
    if (!panel || ui.renderedPanelTab !== tabId) return;
    const maxTop = Math.max(0, panel.scrollHeight - panel.clientHeight);
    panel.scrollTop = stateToRestore.bottomPinned ? maxTop : Math.min(stateToRestore.top || 0, maxTop);
    requestAnimationFrame(() => {
      if (ui.renderedPanelTab === tabId) {
        ui.suppressPanelScrollSave = false;
        savePanelScroll(panel, { force: true });
      }
    });
  });
}

function installTouchScroll(surface) {
  if (!surface) return;
  surface.classList.add('touch-scroll-surface');
  surface.addEventListener('wheel', (event) => {
    event.preventDefault();
  }, { passive: false });
  surface.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (event.target.closest('button, a, input, textarea, select')) return;
    ui.activeDragScroll = {
      surface,
      pointerId: event.pointerId,
      lastY: event.clientY,
      moved: false,
    };
    try {
      surface.setPointerCapture?.(event.pointerId);
    } catch {
      // Synthetic test events do not always create an active pointer capture target.
    }
  });
  surface.addEventListener('pointermove', (event) => {
    const drag = ui.activeDragScroll;
    if (!drag || drag.pointerId !== event.pointerId || drag.surface !== surface) return;
    const deltaY = event.clientY - drag.lastY;
    if (Math.abs(deltaY) > 0) {
      surface.scrollTop -= deltaY;
      drag.lastY = event.clientY;
      drag.moved = drag.moved || Math.abs(deltaY) > 3;
      if (drag.moved) surface.classList.add('is-dragging');
      savePanelScroll(surface, { force: true });
      event.preventDefault();
    }
  });
  const endDrag = (event) => {
    const drag = ui.activeDragScroll;
    if (!drag || drag.pointerId !== event.pointerId || drag.surface !== surface) return;
    try {
      surface.releasePointerCapture?.(event.pointerId);
    } catch {
      // See setPointerCapture guard above.
    }
    surface.classList.remove('is-dragging');
    savePanelScroll(surface, { force: true });
    ui.activeDragScroll = null;
  };
  surface.addEventListener('pointerup', endDrag);
  surface.addEventListener('pointercancel', endDrag);
}

function renderShell() {
  app.textContent = '';
  const shell = el('section', 'game-shell');
  shell.innerHTML = `
    <header class="topbar">
      <div class="title-row">
        <strong class="game-title"></strong>
        <button class="tier-badge" type="button"></button>
      </div>
      <div class="resource-row"></div>
    </header>
    <section class="play-area">
      <div class="stage-wrap">
        <canvas id="gameCanvas"></canvas>
        <div class="stage-hud">
          <div class="stage-line">
            <strong class="stage-label"></strong>
            <span class="enemy-label"></span>
          </div>
          <div class="combat-status-line enemy-hp-status" data-live-text="combatHudStatus"></div>
          <div class="hp-track"><div class="hp-fill"></div></div>
          <div class="combat-status-line party-hp-status" data-live-text="partyHpStatus"></div>
          <div class="hero-hp-track" data-live-progress="partyHp"><div class="hero-hp-fill" data-live-progress-fill="partyHp"></div></div>
        </div>
      </div>
      <section class="panel"></section>
    </section>
    <nav class="bottom-nav"></nav>
    <div class="reward-layer" aria-hidden="true"></div>
    <div class="daily-reward-mount"></div>
    <div class="opening-mount"></div>
    <div class="tutorial-mount"></div>
    <div class="hero-detail-mount"></div>
    <div class="toast-stack"></div>
  `;

  app.append(shell);
  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');
  const panel = shell.querySelector('.panel');
  installTouchScroll(panel);
  panel.addEventListener('scroll', () => {
    savePanelScroll(panel);
  }, { passive: true });
  shell.addEventListener('wheel', (event) => {
    event.preventDefault();
  }, { passive: false });

  shell.querySelector('.tier-badge').addEventListener('click', () => {
    audioManager?.unlock();
    if (state.activeTab === 'village') {
      playSfx('ui_button_disabled');
      toast('이미 마을 화면입니다.');
      return;
    }
    playSfx('ui_tab_switch');
    Runtime.selectTab(state, 'village');
    renderAll();
    saveGame();
    toast('마을로 이동했습니다.');
  });

  const nav = shell.querySelector('.bottom-nav');
  for (const tab of data.navigation) {
    const button = el('button', '', '');
    button.type = 'button';
    button.dataset.tab = tab.id;
    button.setAttribute('aria-label', tab.label);
    const icon = el('img');
    icon.src = tab.icon;
    icon.alt = '';
    const label = el('span', '', tab.label);
    button.append(icon, label);
    button.addEventListener('click', () => {
      audioManager?.unlock();
      if (state.activeTab === tab.id) {
        playSfx('ui_button_disabled');
        toast(`이미 ${tab.label} 화면입니다.`);
        return;
      }
      playSfx('ui_tab_switch');
      Runtime.selectTab(state, tab.id);
      syncTutorialWithTab(tab.id);
      renderAll();
      saveGame();
    });
    nav.append(button);
  }
}

function syncTutorialWithTab(tabId) {
  if (ui.tutorialStep < 0) return;
  const index = tutorialSteps.findIndex((step) => step.tab === tabId);
  if (index >= 0 && index > ui.tutorialStep) {
    ui.tutorialStep = index;
  }
}

function renderOpening() {
  const mount = document.querySelector('.opening-mount');
  if (!mount) return;
  const existing = mount.querySelector('.opening-cinematic');
  if (!ui.openingVisible) {
    if (existing) mount.textContent = '';
    return;
  }
  if (existing?.dataset.state === 'visible') return;
  mount.textContent = '';

  const overlay = el('section', 'opening-cinematic');
  overlay.dataset.state = 'visible';
  const bg = data.assets.environments[0]?.assetUrl;
  if (bg) overlay.style.setProperty('--opening-bg', `url("${bg}")`);

  const hero = data.assets.heroes[0]?.assetUrl;
  const building = data.assets.buildings.find((asset) => asset.id.includes('palace')) || data.assets.buildings[0];

  const art = el('div', 'opening-art');
  if (building?.assetUrl) {
    const img = el('img', 'opening-building');
    img.src = building.assetUrl;
    img.alt = '';
    art.append(img);
  }
  if (hero) {
    const img = el('img', 'opening-hero');
    img.src = hero;
    img.alt = '';
    art.append(img);
  }

  const copy = el('div', 'opening-copy');
  copy.append(
    el('span', 'opening-kicker', '폐허에서 다시 세우는 왕국'),
    el('h1', '', PROJECT_TITLE),
    el('p', '', '무너진 성벽을 복구하고, 영웅을 모아, 자동 전투와 장비 파밍으로 잃어버린 왕국을 되찾으세요.')
  );

  const actions = el('div', 'opening-actions');
  actions.append(
    makeButton('왕국 재건 시작', 'primary wide', () => {
      ui.openingVisible = false;
      storageSet(sessionStorage, OPENING_SESSION_KEY, '1');
      Runtime.selectTab(state, 'village');
      return { message: '왕국 로비로 이동했습니다.' };
    }),
    makeButton('바로 전투', 'ghost wide', () => {
      ui.openingVisible = false;
      storageSet(sessionStorage, OPENING_SESSION_KEY, '1');
      Runtime.selectTab(state, 'combat');
      createCombatEvent('hit', 'enemy', Math.max(120, Math.round(state.power.total * 0.05)), 'skill');
      return { message: '자동 전투를 시작합니다.' };
    })
  );

  copy.append(actions);
  overlay.append(art, copy);
  mount.append(overlay);
}

function renderTutorial() {
  const mount = document.querySelector('.tutorial-mount');
  if (!mount) return;
  const existing = mount.querySelector('.tutorial-card');
  const step = tutorialSteps[ui.tutorialStep];
  if (ui.openingVisible || isDailyRewardBlocking() || ui.tutorialStep < 0 || !step || state.activeTab !== step.tab) {
    if (existing) mount.textContent = '';
    return;
  }

  if (existing?.dataset.step === String(ui.tutorialStep)) return;
  mount.textContent = '';

  const card = el('section', 'tutorial-card');
  card.dataset.step = String(ui.tutorialStep);
  card.append(el('strong', '', step.title), el('p', '', step.body));

  const dots = el('div', 'tutorial-dots');
  tutorialSteps.forEach((_, index) => {
    dots.append(el('span', index === ui.tutorialStep ? 'active' : ''));
  });

  const actions = el('div', 'tutorial-actions');
  actions.append(
    makeButton('건너뛰기', 'ghost', () => {
      ui.tutorialStep = -1;
      storageSet(localStorage, TUTORIAL_KEY, '1');
      return { message: '튜토리얼을 닫았습니다.' };
    }),
    makeButton(ui.tutorialStep === tutorialSteps.length - 1 ? '완료' : '다음', 'primary', () => {
      Runtime.selectTab(state, step.tab);
      if (ui.tutorialStep >= tutorialSteps.length - 1) {
        ui.tutorialStep = -1;
        storageSet(localStorage, TUTORIAL_KEY, '1');
        return { message: '기본 흐름 준비 완료' };
      }
      ui.tutorialStep += 1;
      Runtime.selectTab(state, tutorialSteps[ui.tutorialStep].tab);
      return { message: tutorialSteps[ui.tutorialStep].title };
    })
  );

  card.append(dots, actions);
  mount.append(card);
}

function nextLoginReward() {
  const nextDay = Math.min((state.retention.claimedDayKeys.length || 0) + 1, 30);
  return data.retention.loginRewards[nextDay - 1] || data.retention.loginRewards[0];
}

function rewardPreviewItems(reward) {
  const items = rewardEntries(reward).map((entry) => ({
    key: entry.key,
    label: currencyLabel(entry.key),
    amount: entry.amount,
    icon: rewardIconUrl(entry.key),
  }));
  if (reward.specialItemId) {
    items.push({
      key: 'special',
      label: specialItemName(reward),
      amount: 1,
      icon: data.assets.effects[0]?.assetUrl || data.assets.currencies[1]?.assetUrl,
    });
  }
  return items;
}

function renderRewardIconGrid(items) {
  const grid = el('div', 'reward-icon-grid');
  items.forEach((item) => {
    const card = el('article', 'reward-icon-card');
    const img = el('img');
    img.src = item.icon;
    img.alt = item.label;
    card.append(img, el('strong', '', item.key === 'special' ? item.label : `+${formatNumber(item.amount)}`), el('span', '', item.label));
    grid.append(card);
  });
  return grid;
}

function claimDailyPerformanceReward() {
  const before = resourceSnapshot();
  const reward = nextLoginReward();
  const result = Runtime.claimLoginReward(state, data, Date.now());
  ui.dailyRewardVisible = false;
  storageSet(localStorage, dailyRewardDismissKey(), '1');

  if (!result.ok) {
    return { message: '오늘 보상은 이미 수령했습니다.' };
  }

  const gained = resourceGainSince(before);
  playSfx('reward_daily_claim');
  createRewardBurst(gained, { source: 'daily' });
  createUpgradeBurst(null, `${result.day}일차 보상`, reward.specialItemId ? data.assets.effects[1]?.assetUrl : data.assets.currencies[1]?.assetUrl);
  return { message: `${result.day}일차 성과 보상 수령` };
}

function renderDailyRewardOverlay() {
  const mount = document.querySelector('.daily-reward-mount');
  if (!mount) return;
  if (isDailyRewardClaimedToday() || isDailyRewardDismissedToday()) {
    ui.dailyRewardVisible = false;
  }
  const rewardKey = todayKey();
  const existing = mount.querySelector('.daily-reward-overlay');
  if (ui.openingVisible || !ui.dailyRewardVisible) {
    if (existing) mount.textContent = '';
    return;
  }
  if (existing?.dataset.rewardKey === rewardKey) return;
  mount.textContent = '';

  const reward = nextLoginReward();
  const overlay = el('section', 'daily-reward-overlay');
  overlay.dataset.rewardKey = rewardKey;
  const card = el('article', 'daily-reward-card');
  const hero = data.assets.heroes[0]?.assetUrl;
  const banner = el('div', 'daily-reward-banner');
  if (hero) {
    const heroImg = el('img');
    heroImg.src = hero;
    heroImg.alt = '';
    banner.append(heroImg);
  }
  const copy = el('div');
  const dailyStatus = el('small', '', todayRewardStatusText());
  dailyStatus.dataset.liveText = 'dailyRewardStatus';
  copy.append(el('span', '', 'DAILY'), el('strong', '', '일일 성과 보상'), dailyStatus);
  banner.append(copy);

  const objectives = el('div', 'daily-objective-strip');
  [
    [data.navigation[1]?.icon, 'dailyStageValue', `현재 Stage ${state.combat.stage}`, '전투'],
    [data.navigation[3]?.icon, 'dailyEquipmentValue', `장비 ${formatNumber(state.progress.equipmentLooted)}개`, '파밍'],
    [data.navigation[0]?.icon, 'dailyBuildingValue', `건물 ${formatNumber(state.progress.buildingsUpgraded)}회`, '재건'],
  ].forEach(([icon, key, value, label]) => {
    const item = el('span');
    const img = el('img');
    img.src = icon;
    img.alt = '';
    const strong = el('strong', '', value);
    strong.dataset.liveText = key;
    item.append(img, strong, el('small', '', label));
    objectives.append(item);
  });

  const actions = el('div', 'daily-reward-actions');
  actions.append(
    makeButton('수령', 'primary wide', claimDailyPerformanceReward),
    makeButton('나중에', 'ghost wide', () => {
      dismissDailyRewardOverlay();
      return { message: '일일 보상을 나중에 받을 수 있습니다.' };
    })
  );

  card.append(banner, objectives, renderRewardIconGrid(rewardPreviewItems(reward)), actions);
  overlay.append(card);
  mount.append(overlay);
}

function renderTopbar() {
  document.querySelector('.game-title').textContent = PROJECT_TITLE;
  document.querySelector('.tier-badge').textContent = state.village.tier.name;
  const resources = document.querySelector('.resource-row');
  resources.textContent = '';
  [
    ['gold', '골드', state.resources.gold],
    ['diamond', '다이아', state.resources.diamond],
    ['power', '전투력', state.power.total],
  ].forEach(([key, label, value]) => {
    const box = el('article', 'resource-pill');
    box.dataset.resource = key;
    const icon = el('img', 'resource-icon');
    icon.src = key === 'power' ? data.navigation[1]?.icon : currencyAsset(key)?.assetUrl;
    icon.alt = '';
    const copy = el('div');
    copy.append(el('span', '', label), el('strong', '', formatNumber(value)));
    box.append(icon, copy);
    resources.append(box);
  });
}

function metric(label, value, liveKey = '') {
  const node = el('article', 'metric');
  const strong = el('strong', '', value);
  if (liveKey) strong.dataset.liveText = liveKey;
  node.append(el('span', '', label), strong);
  return node;
}

function panelHead(title, right, liveKey = '') {
  const head = el('div', 'panel-head');
  const strong = el('strong', '', right || '');
  if (liveKey) strong.dataset.liveText = liveKey;
  head.append(el('h2', '', title), strong);
  return head;
}

function actionCard(title, note, buttons, help = '', noteLiveKey = '') {
  const card = el('article', 'card');
  const top = el('div', 'card-title');
  const noteNode = el('small', '', note);
  if (noteLiveKey) noteNode.dataset.liveText = noteLiveKey;
  top.append(el('strong', '', title), noteNode);
  card.append(top);
  if (help) card.append(el('p', 'card-help', help));
  card.append(...buttons);
  return card;
}

function progressBar(label, value, max, liveKey = '') {
  const wrap = el('div', 'mini-progress');
  if (liveKey) wrap.dataset.liveProgress = liveKey;
  const top = el('div', 'mini-progress-top');
  const valueNode = el('strong', '', progressValueText(value, max));
  if (liveKey) valueNode.dataset.liveProgressValue = liveKey;
  top.append(el('span', '', label), valueNode);
  const track = el('div', 'mini-progress-track');
  const fill = el('div', 'mini-progress-fill');
  if (liveKey) fill.dataset.liveProgressFill = liveKey;
  fill.style.width = `${clampPercent(value / max)}%`;
  track.append(fill);
  wrap.append(top, track);
  return wrap;
}

function progressValueText(value, max) {
  const safeMax = Math.max(1, max || 1);
  const safeValue = Math.max(0, Math.min(safeMax, value || 0));
  if (safeMax >= 1000 || safeValue >= 1000) return `${formatNumber(safeValue)}/${formatNumber(safeMax)}`;
  return `${Math.floor(safeValue)}/${safeMax}`;
}

function renderKingdomProgressCard() {
  const milestone = kingdomNextMilestone();
  const card = el('section', 'kingdom-progress-card');
  const palace = state.village.buildings.find((building) => building.id === 'building_palace') || state.village.buildings[0];
  const icon = el('img');
  icon.src = palace?.assetUrl || data.assets.buildings[0]?.assetUrl;
  icon.alt = '';
  const copy = el('div');
  const head = el('div', 'kingdom-progress-head');
  const next = el('small', '', milestone.complete ? '최종 제국 단계 유지 중' : `${milestone.nextName}까지 ${milestone.remaining} 진척`);
  next.dataset.liveText = 'kingdomNextGoal';
  head.append(el('strong', '', `현재 ${state.village.tier.name}`), next);
  const bar = progressBar('왕국 단계 진척', milestone.score, milestone.max, 'kingdomMilestone');
  const detail = el('small', 'kingdom-progress-detail', `Stage ${state.combat.stage} · 건물 ${state.progress.buildingsUpgraded}회 강화 · 왕궁 Lv.${palace?.level || 1}`);
  copy.append(head, bar, detail);
  card.append(icon, copy);
  return card;
}

function renderObjectiveBoard() {
  const section = el('section', 'objective-board');
  section.append(el('strong', '', '오늘의 재건 명령'));
  section.append(
    progressBar('Stage 10 돌파', state.combat.stage, DAILY_STAGE_TARGET, 'objectiveStage'),
    progressBar('장비 10개 획득', state.progress.equipmentLooted, DAILY_EQUIPMENT_TARGET, 'objectiveEquipment'),
    progressBar('건물 3회 강화', state.progress.buildingsUpgraded, DAILY_BUILDING_TARGET, 'objectiveBuilding')
  );
  return section;
}

function renderCombatReadoutCard() {
  const section = el('section', 'combat-readout-card');
  const title = el('strong', '', '전투 상태');
  const momentum = el('small', 'combat-momentum', combatMomentumText());
  momentum.dataset.liveText = 'combatMomentum';
  section.append(
    title,
    progressBar('적 HP', state.combat.enemy?.hp || 0, state.combat.enemy?.hpMax || 1, 'enemyHp'),
    progressBar('아군 HP', state.combat.partyHp, state.combat.partyHpMax, 'partyHp'),
    momentum
  );
  return section;
}

function renderPacingBoard() {
  const pacing = state.combat.pacing || {};
  const limit = pacing.windowLimit || 80;
  const clears = Math.min(limit, pacing.autoStageClearsInWindow || 0);
  const card = el('section', clears >= limit ? 'patrol-status capped' : 'patrol-status');
  const icon = el('img');
  icon.src = data.navigation[1]?.icon;
  icon.alt = '';
  const copy = el('div');
  const helper = clears >= limit
    ? `순찰 보상 ${formatNumber(state.progress.patrolDefeats || 0)}회 누적`
    : `초반 5회 후 ${Math.round((pacing.minStageIntervalMs || 600000) / 60000)}분마다 스테이지 진행`;
  const title = el('strong', '', clears >= limit ? '순찰 모드' : '자동 원정');
  title.dataset.liveText = 'pacingTitle';
  const help = el('small', '', helper);
  help.dataset.liveText = 'pacingHelp';
  help.textContent = combatMomentumText();
  copy.append(
    title,
    progressBar('오늘 진행', clears, limit, 'pacingClears'),
    help
  );
  card.append(icon, copy);
  return card;
}

function renderSkillRack() {
  const rack = el('section', 'skill-rack');
  state.heroes.owned.slice(0, 4).forEach((hero) => {
    const item = el('article', 'skill-chip');
    const portrait = el('img');
    portrait.src = hero.assetUrl;
    portrait.alt = hero.name;
    const copy = el('div');
    copy.append(el('strong', '', hero.name), progressBar(hero.skillName, Math.round(hero.skillCharge), 100, `skill_${hero.id}`));
    item.append(portrait, copy);
    rack.append(item);
  });
  return rack;
}

function renderCombatPanel(panel) {
  panel.append(panelHead('전투', `Stage ${state.combat.stage}`, 'combatPanelStage'));
  panel.append(renderCombatReadoutCard());
  panel.append(renderObjectiveBoard());
  panel.append(renderPacingBoard());
  panel.append(renderSkillRack());

  const grid = el('div', 'metric-grid');
  grid.append(
    metric('적 처치', formatNumber(state.progress.enemiesDefeated), 'metricEnemies'),
    metric('보스 격파', formatNumber(state.progress.bossesDefeated), 'metricBosses'),
    metric('장비 획득', formatNumber(state.progress.equipmentLooted), 'metricEquipment'),
    metric('왕국 단계', state.village.tier.name, 'metricTier')
  );
  panel.append(grid);

  const actions = el('div', 'card-grid');
  actions.append(
    actionCard('전술 명령', '즉시 타격', [
      makeButton('집중 공격', 'danger', () => {
        const beforeHp = state.combat.enemy?.hp || 0;
        stepRuntime(2400);
        const afterHp = state.combat.enemy?.hp || 0;
        const amount = Math.max(120, Math.round(beforeHp - afterHp));
        createFocusAttackImpact();
        createCombatEvent('hit', 'enemy', amount, 'skill');
        ui.screenShakeMs = Math.max(ui.screenShakeMs, 180);
        return { message: '집중 공격 발동' };
      }),
    ]),
    actionCard('오프라인 보상', state.offline.pending ? '2배 가능' : '없음', [
      makeButton('광고 2배', 'gold', async () => {
        if (!state.offline.pending || state.offline.pending.claimed) {
          return { message: '받을 오프라인 보상이 없습니다.' };
        }
        const before = resourceSnapshot();
        const result = await claimRewardedAd('ad_offline_reward_x2');
        if (!result.ok) return { message: '오늘 광고 보상 한도에 도달했습니다.' };
        createRewardBurst(resourceGainSince(before), { source: 'daily' });
        return { message: '오프라인 보상 2배 적용' };
      }),
    ], '', 'offlineRewardNote'),
    actionCard('무료 소환', shortAdStatusText('ad_free_summon'), [
      makeButton('소환', 'primary', async () => {
        const beforePower = state.power.total;
        const result = await claimRewardedAd('ad_free_summon');
        if (!result.ok) return { message: '오늘 무료 소환 한도에 도달했습니다.' };
        Runtime.recalculatePower(state);
        createRewardBurst({ power: Math.max(0, state.power.total - beforePower) }, { source: 'daily' });
        createUpgradeBurst(null, '영웅 합류', state.heroes.owned[state.heroes.owned.length - 1]?.assetUrl);
        return { message: '영웅 소환 완료' };
      }),
    ], '', 'freeSummonStatus'),
    actionCard('장비 상자', shortAdStatusText('ad_equipment_box'), [
      makeButton('열기', 'primary', async () => {
        const beforePower = state.power.total;
        const result = await claimRewardedAd('ad_equipment_box');
        if (!result.ok) return { message: '오늘 장비 상자 한도에 도달했습니다.' };
        Runtime.equipBest(state, data);
        Runtime.recalculatePower(state);
        createRewardBurst({ power: Math.max(0, state.power.total - beforePower) }, { source: 'daily' });
        createUpgradeBurst(null, '장비 획득', state.inventory.equipment[state.inventory.equipment.length - 1]?.assetUrl);
        return { message: '장비 획득 및 자동 장착' };
      }),
    ], '', 'equipmentBoxStatus'),
    actionCard('출석 보급', isDailyRewardClaimedToday() ? '수령 완료' : '수령 가능', [
      makeButton('수령', 'gold', () => {
        return claimDailyPerformanceReward();
      }),
    ], '', 'dailyLoginStatus')
  );
  panel.append(actions);
  panel.append(renderRetentionRoad());
}

function specialItemName(reward) {
  if (reward.day === 7) return '창건자의 성유물';
  if (reward.day === 30) return '제국의 왕관';
  return reward.specialItemName;
}

function renderRetentionRoad() {
  const section = el('section', 'reward-card');
  const head = el('div', 'panel-head');
  head.append(el('h3', '', '장기 보급'), el('strong', '', `${state.retention.loginStreak}일차`));
  section.append(head);

  const list = el('div', 'retention-road');
  data.retention.loginRewards
    .filter((reward) => reward.specialItemId)
    .forEach((reward) => {
      const item = el('article', 'retention-node');
      const acquired = reward.day <= state.retention.loginStreak;
      item.classList.toggle('acquired', acquired);
      item.append(
        el('strong', '', `${reward.day}일`),
        el('span', '', specialItemName(reward)),
        el('small', '', acquired ? '획득 가능' : `${reward.day - state.retention.loginStreak}일 남음`)
      );
      list.append(item);
    });
  section.append(list);
  return section;
}

function renderVillageLobby() {
  const lobby = el('section', 'village-lobby');
  const bg = data.assets.environments[0]?.assetUrl;
  if (bg) lobby.style.setProperty('--lobby-bg', `url("${bg}")`);

  const art = el('div', 'lobby-art');
  const palace = state.village.buildings.find((building) => building.id === 'building_palace') || state.village.buildings[0];
  if (palace?.assetUrl) {
    const building = el('img', 'lobby-building');
    building.src = palace.assetUrl;
    building.alt = palace.name;
    art.append(building);
  }
  state.heroes.owned.slice(0, 3).forEach((hero) => {
    const heroImg = el('img', 'lobby-hero');
    heroImg.src = hero.assetUrl;
    heroImg.alt = hero.name;
    art.append(heroImg);
  });

  const copy = el('div', 'lobby-copy');
  const lobbyStatus = el('span', '', `${state.village.tier.name} 단계 · 전투력 ${formatNumber(state.power.total)}`);
  lobbyStatus.dataset.liveText = 'lobbyStatus';
  copy.append(
    el('strong', '', '왕국 로비'),
    lobbyStatus
  );

  lobby.append(art, copy);
  return lobby;
}

function renderVillagePanel(panel) {
  panel.append(panelHead('마을', state.village.tier.name, 'villageTier'));
  panel.append(renderVillageLobby());
  panel.append(renderKingdomProgressCard());
  panel.append(renderObjectiveBoard());

  const grid = el('div', 'card-grid');
  for (const building of state.village.buildings) {
    const card = el('article', 'card building-card');
    const row = el('div', 'thumb-row');
    const img = el('img', 'thumb');
    img.src = building.assetUrl;
    img.alt = building.name;
    const copy = el('div');
    const nextProduction = building.level >= building.maxLevel
      ? building.productionPerHour
      : predictedBuildingProduction(building, building.level + 1);
    copy.append(
      el('strong', '', `${building.name} Lv.${building.level}`),
      el('small', 'building-effect-text', `효과: ${buildingEffectSummary(building)}`),
      el('small', '', `${formatNumber(building.productionPerHour)}/시간`),
      el('small', 'upgrade-preview-text', building.level >= building.maxLevel
        ? '최대 레벨'
        : `다음 ${formatNumber(nextProduction)}/시간 (+${formatNumber(nextProduction - building.productionPerHour)})`)
    );
    row.append(img, copy);
    const recentUpgrade = activeBuildingUpgrade(building);
    const resultSlot = el('div', recentUpgrade ? 'building-result-slot active' : 'building-result-slot');
    if (recentUpgrade) {
      const gain = el('div', 'building-upgrade-result');
      gain.append(
        el('strong', '', `Lv.${recentUpgrade.level} 강화 완료`),
        el('span', '', `생산 +${formatNumber(recentUpgrade.productionGain)}/시간 · 전투력 +${formatNumber(recentUpgrade.powerGain)}`)
      );
      resultSlot.append(gain);
    } else if (building.level >= building.maxLevel) {
      resultSlot.append(
        el('strong', '', '최대 강화'),
        el('span', '', `현재 생산 ${formatNumber(building.productionPerHour)}/시간 · 왕국 진척 반영 완료`)
      );
    } else {
      resultSlot.append(
        el('strong', '', `다음 Lv.${building.level + 1}`),
        el('span', '', `생산 +${formatNumber(nextProduction - building.productionPerHour)}/시간 · 왕국 진척 +1`)
      );
    }
    card.append(row, resultSlot);
    card.append(el('p', 'card-help', building.level >= building.maxLevel
      ? '최대 강화 상태입니다. 왕국 단계와 전투력 보너스가 모두 반영되어 있습니다.'
      : '강화하면 시간당 생산량과 전투력이 즉시 오르고 왕국 단계 진행도에 반영됩니다.'));
    card.append(makeButton('강화', 'primary', () => {
      if (building.level >= building.maxLevel) {
        return { message: '최대 강화 상태입니다.' };
      }
      const beforeLevel = building.level;
      const beforeProduction = building.productionPerHour;
      const beforePower = state.power.total;
      Runtime.upgradeBuilding(state, data, building.id);
      if (building.level === beforeLevel) {
        return { message: '강화할 수 없습니다.' };
      }
      Runtime.recalculatePower(state);
      const powerGain = Math.max(0, state.power.total - beforePower);
      ui.lastBuildingUpgrade = {
        id: building.id,
        at: Date.now(),
        level: building.level,
        productionGain: Math.max(0, building.productionPerHour - beforeProduction),
        powerGain,
      };
      playSfx('village_upgrade', { volume: 0.58 });
      createRewardBurst({ power: powerGain }, { element: card });
      createUpgradeBurst(card, '건물 강화', building.assetUrl);
      return { message: `${building.name} 강화 완료` };
    }));
    grid.append(card);
  }
  panel.append(grid);
}

function activeVillageAscension() {
  if (!ui.lastVillageAscension) return null;
  if (Date.now() - ui.lastVillageAscension.at > 8000) return null;
  return ui.lastVillageAscension;
}

function renderBuildingEraGateCardLegacy() {
  const era = buildingEraInfo();
  const card = el('section', era.canAdvance ? 'building-era-card ready' : 'building-era-card');
  card.dataset.eraAction = era.canAdvance ? 'ready' : 'progress';

  const icon = el('img');
  icon.src = data.assets.buildings[Math.min(data.assets.buildings.length - 1, era.index)]?.assetUrl || data.assets.buildings[0]?.assetUrl;
  icon.alt = era.label;

  const copy = el('div');
  const head = el('div', 'building-era-head');
  head.append(
    el('strong', '', era.label),
    el('span', '', `Lv.${Math.max(1, era.unlockedMaxLevel - 4)}-${era.unlockedMaxLevel}`)
  );
  const detail = era.next
    ? `${era.readyCount}/${era.totalBuildings}개 건물이 Lv.${era.unlockedMaxLevel} 달성`
    : '모든 건물 단계가 완성되었습니다';
  copy.append(
    head,
    progressBar('전체 건물 조건', era.readyCount, Math.max(1, era.totalBuildings), ''),
    el('small', 'building-era-detail', detail)
  );

  const recent = activeVillageAscension();
  const result = el('div', recent ? 'building-era-banner active' : 'building-era-banner');
  if (recent) {
    result.append(el('strong', '', `${recent.to} 승급 완료`), el('span', '', `새 해금 상한 Lv.${recent.unlockedMaxLevel}`));
  } else if (era.canAdvance) {
    result.append(el('strong', '', `${era.next.label} 승급 가능`), el('span', '', `승급 후 Lv.${era.unlockedMaxLevel + 1}-${era.next.unlockedMaxLevel} 강화 해금`));
  } else if (era.next) {
    result.append(el('strong', '', '전체 조건 진행 중'), el('span', '', `모든 건물이 Lv.${era.unlockedMaxLevel}에 도달해야 합니다`));
  } else {
    result.append(el('strong', '', '최종 수도 완성'), el('span', '', '전체 건물 효과가 모두 적용되었습니다'));
  }

  const actions = el('div', 'building-era-actions');
  if (era.next) {
    actions.append(makeButton(era.canAdvance ? '왕국 단계 승급' : '승급 조건 확인', era.canAdvance ? 'gold' : 'primary', () => {
      if (!era.canAdvance) {
        return { message: `모든 건물을 Lv.${era.unlockedMaxLevel}까지 올려야 합니다.` };
      }
      const beforePower = state.power.total;
      const result = Runtime.advanceBuildingEra(state, data);
      if (!result.ok) return { message: '아직 왕국 단계 승급 조건이 부족합니다.' };
      Runtime.recalculatePower(state);
      ui.lastVillageAscension = {
        at: Date.now(),
        from: result.from.label,
        to: result.to.label,
        unlockedMaxLevel: result.to.unlockedMaxLevel,
      };
      playSfx('reward_daily_claim', { volume: 0.58 });
      createRewardBurst({ power: Math.max(0, state.power.total - beforePower) }, { element: card });
      createUpgradeBurst(card, '왕국 단계 승급', icon.src);
      card.classList.add('is-ascended');
      window.setTimeout(() => card.classList.remove('is-ascended'), 1500);
      return { message: `${result.to.label} 승급 완료` };
    }));
  }

  card.append(icon, copy, result, actions);
  return card;
}

function renderVillagePanelV2Legacy(panel) {
  panel.append(panelHead('마을', state.village.tier.name, 'villageTier'));
  panel.append(renderVillageLobby());
  panel.append(renderKingdomProgressCard());
  panel.append(renderObjectiveBoard());
  panel.append(renderBuildingEraGateCard());

  const grid = el('div', 'card-grid');
  for (const building of state.village.buildings) {
    const stageInfo = buildingStageInfo(building);
    const card = el('article', `card building-card building-tier-${stageInfo.index}`);
    card.dataset.buildingId = building.id;
    const row = el('div', 'thumb-row');
    const img = el('img', 'thumb');
    img.src = building.assetUrl;
    img.alt = building.name;

    const copy = el('div');
    const titleLine = el('div', 'building-title-line');
    titleLine.append(
      el('strong', '', `${building.name} Lv.${building.level}`),
      el('span', 'building-stage-badge', stageInfo.label)
    );

    const nextProduction = building.level >= building.maxLevel
      ? building.productionPerHour
      : predictedBuildingProduction(building, building.level + 1);
    copy.append(
      titleLine,
      renderBuildingMilestoneTrack(building, stageInfo),
      el('small', 'building-effect-text', `효과: ${buildingEffectSummary(building)}`),
      el('small', '', `${formatNumber(building.productionPerHour)}/시간`),
      el('small', 'upgrade-preview-text', building.level >= building.maxLevel
        ? '최종 단계 완성'
        : `다음 Lv.${building.level + 1} · ${formatNumber(nextProduction)}/시간 (+${formatNumber(nextProduction - building.productionPerHour)})`)
    );
    row.append(img, copy);

    const recentUpgrade = activeBuildingUpgrade(building);
    if (recentUpgrade?.ascended) card.classList.add('is-ascended');
    const resultSlot = el('div', recentUpgrade ? 'building-result-slot active' : 'building-result-slot');
    if (recentUpgrade) {
      const gain = el('div', recentUpgrade.ascended ? 'building-upgrade-result ascended' : 'building-upgrade-result');
      gain.append(
        el('strong', '', recentUpgrade.ascended ? `${recentUpgrade.stageName} 승급 완료` : `Lv.${recentUpgrade.level} 강화 완료`),
        el('span', '', recentUpgrade.ascended
          ? `새 단계 보너스 적용 · 전투력 +${formatNumber(recentUpgrade.powerGain)}`
          : `생산 +${formatNumber(recentUpgrade.productionGain)}/시간 · 전투력 +${formatNumber(recentUpgrade.powerGain)}`)
      );
      resultSlot.append(gain);
    } else if (building.level >= building.maxLevel) {
      resultSlot.append(
        el('strong', '', '최종 단계 완성'),
        el('span', '', `현재 생산 ${formatNumber(building.productionPerHour)}/시간 · 모든 단계 보너스 적용`)
      );
    } else {
      const nextStageInfo = buildingStageInfo({ ...building, level: building.level + 1 });
      const ascendsNext = nextStageInfo.index > stageInfo.index;
      resultSlot.append(
        el('strong', '', ascendsNext ? `다음 ${nextStageInfo.label}` : `다음 Lv.${building.level + 1}`),
        el('span', '', ascendsNext
          ? `승급 시 전투력 계수 x${nextStageInfo.powerMultiplier.toFixed(2)}`
          : `생산 +${formatNumber(nextProduction - building.productionPerHour)}/시간 · 다음 승급 Lv.${stageInfo.nextMilestoneLevel}`)
      );
    }

    card.append(row, resultSlot);
    card.append(el('p', 'card-help', building.level >= building.maxLevel
      ? '최종 단계입니다. 생산, 전투력, 영웅/장비 보너스가 모두 적용되어 있습니다.'
      : '5레벨마다 단계가 승급되어 카드 색, 배지, 광채와 함께 왕국 보너스가 커집니다.'));

    const buttonLabel = building.level < building.maxLevel && buildingStageInfo({ ...building, level: building.level + 1 }).index > stageInfo.index
      ? '승급 강화'
      : '강화';
    card.append(makeButton(buttonLabel, 'primary', () => {
      if (building.level >= building.maxLevel) {
        return { message: '최종 단계 완성 상태입니다.' };
      }

      const beforeLevel = building.level;
      const beforeProduction = building.productionPerHour;
      const beforePower = state.power.total;
      const beforeStage = buildingStageInfo(building);
      Runtime.upgradeBuilding(state, data, building.id);
      if (building.level === beforeLevel) {
        return { message: '강화할 수 없습니다.' };
      }

      Runtime.recalculatePower(state);
      const afterStage = buildingStageInfo(building);
      const ascended = afterStage.index > beforeStage.index;
      const powerGain = Math.max(0, state.power.total - beforePower);
      ui.lastBuildingUpgrade = {
        id: building.id,
        at: Date.now(),
        level: building.level,
        productionGain: Math.max(0, building.productionPerHour - beforeProduction),
        powerGain,
        ascended,
        stageName: afterStage.label,
      };
      playSfx('village_upgrade', { volume: 0.58 });
      if (ascended) playSfx('reward_daily_claim', { volume: 0.5 });
      createRewardBurst({ power: powerGain }, { element: card });
      createUpgradeBurst(card, ascended ? '단계 승급' : '건물 강화', building.assetUrl);
      if (ascended) {
        card.classList.add('is-ascended');
        window.setTimeout(() => card.classList.remove('is-ascended'), 1500);
      }
      return { message: ascended ? `${building.name} ${afterStage.label} 승급` : `${building.name} 강화 완료` };
    }));
    grid.append(card);
  }
  panel.append(grid);
}

function renderBuildingEraGateCard() {
  const era = buildingEraInfo();
  const nextRangeStart = era.next ? era.unlockedMaxLevel + 1 : era.unlockedMaxLevel;
  const card = el('section', era.canAdvance ? 'building-era-card ready' : 'building-era-card');
  card.dataset.eraAction = era.canAdvance ? 'ready' : 'progress';

  const icon = el('img');
  icon.src = data.assets.buildings[Math.min(data.assets.buildings.length - 1, era.index)]?.assetUrl || data.assets.buildings[0]?.assetUrl;
  icon.alt = era.label;

  const copy = el('div');
  const head = el('div', 'building-era-head');
  head.append(
    el('strong', '', era.label),
    el('span', '', `현재 상한 Lv.${era.unlockedMaxLevel}`)
  );

  const detail = era.next
    ? `${era.readyCount}/${era.totalBuildings}개 건물이 Lv.${era.unlockedMaxLevel} 달성`
    : '모든 건물 성장 구간을 완성했습니다.';

  copy.append(
    head,
    progressBar('전체 건물 조건', era.readyCount, Math.max(1, era.totalBuildings), ''),
    el('small', 'building-era-detail', detail)
  );

  const recent = activeVillageAscension();
  const result = el('div', recent ? 'building-era-banner active ascended' : 'building-era-banner');
  if (recent) {
    result.append(
      el('strong', '', `${recent.to} 승급 완료`),
      el('span', '', `새 강화 구간 Lv.${recent.previousMax + 1}-${recent.unlockedMaxLevel} 해금`)
    );
  } else if (era.canAdvance) {
    result.append(
      el('strong', '', `${era.next.label} 승급 가능`),
      el('span', '', `승급하면 Lv.${nextRangeStart}-${era.next.unlockedMaxLevel} 강화가 열립니다.`)
    );
  } else if (era.next) {
    result.append(
      el('strong', '', '전체 조건 진행 중'),
      el('span', '', `모든 건물을 Lv.${era.unlockedMaxLevel}까지 올려야 다음 구간이 열립니다.`)
    );
  } else {
    result.append(
      el('strong', '', '최종 수도 완성'),
      el('span', '', '전체 건물 효과가 최종 단계로 적용되었습니다.')
    );
  }

  const actions = el('div', 'building-era-actions');
  if (era.next) {
    actions.append(makeButton(era.canAdvance ? `${era.next.label} 승급` : '승급 조건 확인', era.canAdvance ? 'gold' : 'primary', () => {
      if (!era.canAdvance) {
        return { message: `모든 건물을 Lv.${era.unlockedMaxLevel}까지 올려야 합니다.` };
      }
      const beforePower = state.power.total;
      const result = Runtime.advanceBuildingEra(state, data);
      if (!result.ok) return { message: '아직 전체 승급 조건이 부족합니다.' };
      Runtime.recalculatePower(state);
      ui.lastVillageAscension = {
        at: Date.now(),
        from: result.from.label,
        to: result.to.label,
        previousMax: result.from.unlockedMaxLevel,
        unlockedMaxLevel: result.to.unlockedMaxLevel,
      };
      playSfx('village_tier_up', { volume: 0.62 });
      createRewardBurst({ power: Math.max(0, state.power.total - beforePower) }, { element: card });
      createUpgradeBurst(card, `${result.to.label} 승급`, icon.src);
      card.classList.add('is-ascended');
      window.setTimeout(() => card.classList.remove('is-ascended'), 1500);
      return { message: `${result.to.label} 승급 완료` };
    }));
  }

  card.append(icon, copy, result, actions);
  return card;
}

function renderVillagePanelV2(panel) {
  panel.append(panelHead('마을', state.village.tier.name, 'villageTier'));
  panel.append(renderVillageLobby());
  panel.append(renderKingdomProgressCard());
  panel.append(renderObjectiveBoard());
  panel.append(renderBuildingEraGateCard());

  const era = buildingEraInfo();
  const recentEra = activeVillageAscension();
  const grid = el('div', 'card-grid');

  for (const building of state.village.buildings) {
    const stageInfo = buildingStageInfo(building);
    const card = el('article', `card building-card building-tier-${stageInfo.index}`);
    card.dataset.buildingId = building.id;
    if (recentEra) card.classList.add('is-ascended');

    const row = el('div', 'thumb-row');
    const img = el('img', 'thumb');
    img.src = building.assetUrl;
    img.alt = building.name;

    const copy = el('div');
    const titleLine = el('div', 'building-title-line');
    titleLine.append(
      el('strong', '', `${building.name} Lv.${building.level}`),
      el('span', 'building-stage-badge', stageInfo.label)
    );

    const nextProduction = building.level >= building.maxLevel
      ? building.productionPerHour
      : predictedBuildingProduction(building, building.level + 1);
    const preview = building.level >= building.maxLevel
      ? (era.next ? `현재 구간 완료 · ${era.next.label} 조건 대기` : '최종 성장 완료')
      : `다음 Lv.${building.level + 1} · ${formatNumber(nextProduction)}/시간 (+${formatNumber(nextProduction - building.productionPerHour)})`;

    copy.append(
      titleLine,
      renderBuildingMilestoneTrack(building, stageInfo),
      el('small', 'building-effect-text', `효과: ${buildingEffectSummary(building)}`),
      el('small', '', `${formatNumber(building.productionPerHour)}/시간`),
      el('small', 'upgrade-preview-text', preview)
    );
    row.append(img, copy);

    const recentUpgrade = activeBuildingUpgrade(building);
    if (recentUpgrade?.ascended) card.classList.add('is-ascended');
    const resultSlot = el('div', recentUpgrade || recentEra ? 'building-result-slot active' : 'building-result-slot');
    if (recentUpgrade) {
      const gain = el('div', recentUpgrade.ascended ? 'building-upgrade-result ascended' : 'building-upgrade-result');
      gain.append(
        el('strong', '', `Lv.${recentUpgrade.level} 강화 완료`),
        el('span', '', `생산 +${formatNumber(recentUpgrade.productionGain)}/시간 · 전투력 +${formatNumber(recentUpgrade.powerGain)}`)
      );
      resultSlot.append(gain);
    } else if (recentEra) {
      const gain = el('div', 'building-upgrade-result ascended');
      gain.append(
        el('strong', '', '새 성장 구간 해금'),
        el('span', '', `Lv.${recentEra.previousMax + 1}-${recentEra.unlockedMaxLevel} 강화 가능`)
      );
      resultSlot.append(gain);
    } else if (building.level >= building.maxLevel) {
      if (era.canAdvance) {
        resultSlot.append(
          el('strong', '', '전체 승급 가능'),
          el('span', '', `상단 카드에서 ${era.next.label}로 승급하세요.`)
        );
      } else if (era.next) {
        resultSlot.append(
          el('strong', '', '현재 구간 완료'),
          el('span', '', `다른 건물도 Lv.${era.unlockedMaxLevel} 필요`)
        );
      } else {
        resultSlot.append(
          el('strong', '', '최종 성장 완료'),
          el('span', '', `현재 생산 ${formatNumber(building.productionPerHour)}/시간`)
        );
      }
    } else {
      resultSlot.append(
        el('strong', '', `다음 Lv.${building.level + 1}`),
        el('span', '', `생산 +${formatNumber(nextProduction - building.productionPerHour)}/시간 · 구간 상한 Lv.${building.maxLevel}`)
      );
    }

    card.append(row, resultSlot);
    card.append(el('p', 'card-help', building.level >= building.maxLevel
      ? '이 건물은 현재 시대 상한에 도달했습니다. 모든 건물이 같은 상한에 도달하면 상단 승급 카드에서 다음 5레벨 구간이 열립니다.'
      : '강화하면 생산량과 건물 전투력이 즉시 오릅니다. 이번 구간을 끝내면 전체 시대 승급 조건에 반영됩니다.'));

    const buttonLabel = building.level >= building.maxLevel ? '구간 완료' : '강화';
    card.append(makeButton(buttonLabel, building.level >= building.maxLevel ? 'ghost' : 'primary', () => {
      if (building.level >= building.maxLevel) {
        if (era.canAdvance) {
          return { message: `상단의 ${era.next.label} 승급 버튼으로 다음 구간을 여세요.` };
        }
        return { message: `이 건물은 현재 구간 상한 Lv.${building.maxLevel}입니다.` };
      }

      const beforeLevel = building.level;
      const beforeProduction = building.productionPerHour;
      const beforePower = state.power.total;
      Runtime.upgradeBuilding(state, data, building.id);
      if (building.level === beforeLevel) {
        return { message: '강화할 수 없습니다.' };
      }

      Runtime.recalculatePower(state);
      const powerGain = Math.max(0, state.power.total - beforePower);
      ui.lastBuildingUpgrade = {
        id: building.id,
        at: Date.now(),
        level: building.level,
        productionGain: Math.max(0, building.productionPerHour - beforeProduction),
        powerGain,
        ascended: building.level >= building.maxLevel,
        stageName: stageInfo.label,
      };
      playSfx('village_upgrade', { volume: 0.58 });
      if (building.level >= building.maxLevel) playSfx('ui_unlock', { volume: 0.5 });
      createRewardBurst({ power: powerGain }, { element: card });
      createUpgradeBurst(card, building.level >= building.maxLevel ? '구간 완료' : '건물 강화', building.assetUrl);
      if (building.level >= building.maxLevel) {
        card.classList.add('is-ascended');
        window.setTimeout(() => card.classList.remove('is-ascended'), 1500);
      }
      return { message: building.level >= building.maxLevel ? `${building.name} 구간 완료` : `${building.name} 강화 완료` };
    }));

    grid.append(card);
  }

  panel.append(grid);
}

function renderHeroesPanel(panel) {
  panel.append(panelHead('영웅', `${state.heroes.owned.length}/50`));
  panel.append(el('p', 'panel-note', '상세 버튼에서 현재 장착 장비를 크게 확인하고, 훈련은 골드와 식량을 사용해 전투력을 올립니다.'));
  const list = el('div', 'hero-list');
  state.heroes.owned.forEach((hero, index) => {
    const card = el('article', 'hero-card');
    const portrait = el('img', 'hero-card-portrait');
    portrait.src = hero.assetUrl;
    portrait.alt = hero.name;
    const copy = el('div', 'hero-card-copy');
    copy.append(
      el('strong', '', `${hero.name} Lv.${hero.level}`),
      el('span', '', `${hero.role} / ${hero.skillName}`),
      el('small', 'hero-card-help', '상세: 장착 장비 확인 · 훈련: 능력치 상승')
    );
    const actions = el('div', 'hero-card-actions');
    actions.append(makeButton('상세', 'gold', () => {
      playSfx('hero_detail_open', { volume: 0.42 });
      ui.heroDetailId = hero.id;
      renderHeroDetailOverlay();
      return null;
    }), makeButton('훈련', 'primary', () => {
      const beforePower = state.power.total;
      Runtime.levelHero(state, data, hero.id);
      Runtime.recalculatePower(state);
      playSfx('hero_train', { volume: 0.5 });
      playSfx('hero_level_up', { volume: 0.54 });
      createRewardBurst({ power: Math.max(0, state.power.total - beforePower) }, { element: card });
      createUpgradeBurst(card, '훈련 완료', hero.assetUrl);
      return { message: `${hero.name} 훈련 완료` };
    }));
    card.append(portrait, copy, actions);
    card.dataset.heroIndex = String(index);
    list.append(card);
  });
  panel.append(list);
}

function renderHeroDetailOverlay() {
  const mount = document.querySelector('.hero-detail-mount');
  if (!mount) return;
  if (!ui.heroDetailId) {
    if (mount.firstChild) mount.textContent = '';
    return;
  }
  const existing = mount.querySelector('.hero-detail-overlay');
  if (existing?.dataset.heroId === ui.heroDetailId) return;
  mount.textContent = '';
  const hero = state.heroes.owned.find((entry) => entry.id === ui.heroDetailId);
  if (!hero) {
    ui.heroDetailId = null;
    return;
  }
  const heroIndex = state.heroes.owned.findIndex((entry) => entry.id === hero.id);
  const overlay = el('section', 'hero-detail-overlay');
  overlay.dataset.heroId = hero.id;
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      ui.heroDetailId = null;
      renderHeroDetailOverlay();
    }
  });
  const modal = el('article', 'hero-detail-modal');
  const heroArt = el('div', 'hero-detail-art');
  const portrait = el('img');
  portrait.src = hero.assetUrl;
  portrait.alt = hero.name;
  heroArt.append(portrait);
  const head = el('div', 'hero-detail-head');
  const title = el('div');
  title.append(el('strong', '', `${hero.name} Lv.${hero.level}`), el('span', '', `${hero.role} · ${hero.skillName}`));
  head.append(title, makeButton('닫기', 'ghost', () => {
    ui.heroDetailId = null;
    renderHeroDetailOverlay();
    return null;
  }));
  const loadout = el('section', 'hero-detail-loadout');
  loadout.append(el('h3', '', '장착 장비 상세'), renderLoadoutGrid(heroFocusSlots(heroIndex), 'large'));
  modal.append(heroArt, head, loadout);
  overlay.append(modal);
  mount.append(overlay);
}

function renderEquippedSet() {
  const section = el('section', 'equipped-set');
  const equippedCount = EQUIPMENT_SLOT_ORDER.filter((slot) => equippedItem(slot)).length;
  section.append(panelHead('현재 장착 세트', `${equippedCount}/${EQUIPMENT_SLOT_ORDER.length}`));
  section.append(renderLoadoutGrid(EQUIPMENT_SLOT_ORDER));
  return section;
}

function renderEquipmentPanel(panel) {
  panel.append(panelHead('장비', `${state.inventory.equipment.length}개`, 'equipmentCount'));
  const buttons = el('div', 'card-grid');
  buttons.append(
    actionCard('보스 보급 상자', '영웅 등급 확률', [
      makeButton('상자 열기', 'gold', () => {
        const beforePower = state.power.total;
        Runtime.openEquipmentChest(state, data, 'epic');
        Runtime.equipBest(state, data);
        createCombatEvent('spark', 'enemy', 0, 'reward');
        Runtime.recalculatePower(state);
        playSfx('chest_open_epic', { volume: 0.58 });
        createRewardBurst({ power: Math.max(0, state.power.total - beforePower) }, { source: 'daily' });
        createUpgradeBurst(null, '상자 개봉', state.inventory.equipment[state.inventory.equipment.length - 1]?.assetUrl);
        return { message: '보스 보급 상자 개봉' };
      }),
    ]),
    actionCard('장비 최적화', `${Object.keys(state.inventory.equipped).length}슬롯`, [
      makeButton('자동 장착', 'primary', () => {
        const beforePower = state.power.total;
        const result = Runtime.equipBest(state, data);
        if (result.changedSlots.length === 0) {
          return { message: '자동장착이 없습니다.' };
        }
        Runtime.recalculatePower(state);
        playSfx('equipment_auto_equip', { volume: 0.5 });
        createRewardBurst({ power: Math.max(0, state.power.total - beforePower) }, { source: 'daily' });
        return { message: `${result.changedSlots.length}개 슬롯 갱신` };
      }),
    ], '', 'equippedCount')
  );
  panel.append(buttons);
  panel.append(renderEquippedSet());

  const list = el('div', 'list');
  state.inventory.equipment.slice(-18).reverse().forEach((item) => {
    const row = el('article', 'row with-thumb');
    const img = el('img', 'row-thumb');
    img.src = item.assetUrl;
    img.alt = item.name;
    const copy = el('div');
    copy.append(el('strong', '', item.name), el('span', '', `${item.slot} / ${item.rarity} / ${item.rating}`));
    row.append(img, copy);
    list.append(row);
  });
  panel.append(list);
}

function renderStoreProductCard(product, shopProduct) {
  const owned = product.productType !== 'consumable'
    && state.shop.purchases.some((purchase) => purchase.productId === product.id);
  const card = el('article', owned ? 'shop-product owned' : 'shop-product');
  const head = el('div', 'shop-product-head');
  const title = el('div');
  title.append(
    el('strong', '', shopProduct?.name || product.id),
    el('span', '', productShortDescription(product))
  );
  const price = el('em', '', formatWon(product.priceKrw));
  head.append(title, price);
  const benefits = el('div', 'shop-benefit-list');
  productBenefitItems(product).forEach((benefit) => {
    benefits.append(el('span', '', benefit));
  });

  const action = el('div', 'shop-action-row');
  const button = makeButton(owned ? '보유중' : product.productType === 'subscription' ? '구독하기' : '결제', owned ? 'ghost' : 'gold store-pay', async () => {
    if (owned) return { message: '이미 보유한 상품입니다.' };
    const before = resourceSnapshot();
    const beforePower = state.power.total;
    const result = await completeStorePurchase(product.id);
    Runtime.recalculatePower(state);
    if (result.ok) {
      createRewardBurst(resourceGainSince(before, { power: Math.max(0, state.power.total - beforePower) }), { source: 'shop' });
      createUpgradeBurst(card, '상품 지급', data.assets.currencies[1]?.assetUrl);
    }
    return { message: result.ok ? '스토어 상품 지급 완료' : '이미 보유한 상품입니다.' };
  });
  if (owned) button.disabled = true;
  action.append(button);

  card.append(head, benefits, action);
  return card;
}

function renderShopFreeRewards() {
  const section = el('section', 'shop-free-rewards');
  section.append(panelHead('무료 보상', state.entitlements.removeAds ? '광고 제거 적용' : '선택형 광고'));
  const grid = el('div', 'card-grid');
  grid.append(
    actionCard('무료 소환', shortAdStatusText('ad_free_summon'), [
      makeButton('소환', 'primary', async () => {
        const beforePower = state.power.total;
        const result = await claimRewardedAd('ad_free_summon');
        if (!result.ok) return { message: '오늘 무료 소환 한도에 도달했습니다.' };
        Runtime.recalculatePower(state);
        createRewardBurst({ power: Math.max(0, state.power.total - beforePower) }, { source: 'shop' });
        createUpgradeBurst(null, '영웅 합류', state.heroes.owned[state.heroes.owned.length - 1]?.assetUrl);
        return { message: '영웅 소환 완료' };
      }),
    ], '', 'freeSummonStatus'),
    actionCard('장비 상자', shortAdStatusText('ad_equipment_box'), [
      makeButton('열기', 'gold', async () => {
        const beforePower = state.power.total;
        const result = await claimRewardedAd('ad_equipment_box');
        if (!result.ok) return { message: '오늘 장비 상자 한도에 도달했습니다.' };
        Runtime.equipBest(state, data);
        Runtime.recalculatePower(state);
        createRewardBurst({ power: Math.max(0, state.power.total - beforePower) }, { source: 'shop' });
        createUpgradeBurst(null, '장비 획득', state.inventory.equipment[state.inventory.equipment.length - 1]?.assetUrl);
        return { message: '장비 획득 및 자동 장착' };
      }),
    ], '', 'equipmentBoxStatus'),
    actionCard('일일 특별 보상', shortAdStatusText('ad_daily_special'), [
      makeButton('수령', 'gold', async () => {
        const before = resourceSnapshot();
        const result = await claimRewardedAd('ad_daily_special');
        if (!result.ok) return { message: '오늘 특별 보상 한도에 도달했습니다.' };
        createRewardBurst(resourceGainSince(before), { source: 'shop' });
        createUpgradeBurst(null, '특별 보상', data.assets.currencies[1]?.assetUrl);
        return { message: '일일 특별 보상 수령' };
      }),
    ], '', 'dailySpecialStatus')
  );
  section.append(grid);
  return section;
}

function renderShopPanel(panel) {
  panel.append(panelHead('상점', state.entitlements.removeAds ? '광고 제거 보유' : '무료/결제 보상'));
  panel.append(renderShopFreeRewards());
  panel.append(panelHead('결제 상품', '출시 상품 구성'));
  panel.append(el('div', 'shop-restore-row', makeButton('구매 복원', 'ghost', async () => restoreStorePurchases())));
  const products = new Map(data.shop.shopProducts.map((product) => [product.id, product]));
  const list = el('div', 'shop-product-list');
  for (const product of data.shop.iapProducts) {
    const shopProduct = products.get(product.shopProductId);
    list.append(renderStoreProductCard(product, shopProduct));
  }
  panel.append(list);
}

function renderSettingsPanel(panel) {
  const enabled = isSoundEnabled();
  panel.append(panelHead('설정', enabled ? '사운드 켜짐' : '사운드 꺼짐'));

  const section = el('section', 'settings-panel');
  const soundRow = el('article', 'settings-row');
  const copy = el('div', 'settings-copy');
  copy.append(
    el('strong', '', '사운드'),
    el('span', '', enabled ? 'BGM, 환경음, 효과음이 재생됩니다.' : '모든 BGM, 환경음, 효과음이 꺼져 있습니다.')
  );

  const toggle = el('button', `sound-toggle ${enabled ? 'on' : 'off'}`);
  toggle.type = 'button';
  toggle.dataset.setting = 'sound';
  toggle.setAttribute('aria-pressed', String(enabled));
  toggle.setAttribute('aria-label', enabled ? '사운드 끄기' : '사운드 켜기');
  const track = el('span', 'toggle-track');
  track.append(el('span', 'toggle-thumb'));
  toggle.append(track, el('strong', '', enabled ? '켜짐' : '꺼짐'));
  toggle.addEventListener('click', () => {
    ui.userInteracted = true;
    audioManager?.unlock();
    const nextEnabled = !isSoundEnabled();
    if (nextEnabled) {
      setSoundEnabled(true);
      playSfx('ui_checkbox_on');
    } else {
      playSfx('ui_checkbox_off');
      setSoundEnabled(false);
    }
    toast(nextEnabled ? '사운드가 켜졌습니다.' : '사운드가 꺼졌습니다.');
    renderAll();
  });

  soundRow.append(copy, toggle);
  section.append(soundRow);
  panel.append(section);
}

function renderPanel() {
  const panel = document.querySelector('.panel');
  if (!panel) return;
  savePanelScroll(panel, { force: true });
  const nextTab = state.activeTab;
  const savedState = ui.panelScrollByTab[nextTab] || { top: 0, bottomPinned: false };
  ui.suppressPanelScrollSave = true;
  panel.textContent = '';
  if (nextTab === 'combat') renderCombatPanel(panel);
  if (nextTab === 'village') renderVillagePanelV2(panel);
  if (nextTab === 'heroes') renderHeroesPanel(panel);
  if (nextTab === 'equipment') renderEquipmentPanel(panel);
  if (nextTab === 'shop') renderShopPanel(panel);
  if (nextTab === 'settings') renderSettingsPanel(panel);
  ui.renderedPanelTab = nextTab;
  restorePanelScroll(panel, nextTab, savedState);
}

function renderNav() {
  document.querySelectorAll('.bottom-nav button').forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === state.activeTab);
  });
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const width = Math.max(1, Math.floor(rect.width * dpr));
  const height = Math.max(1, Math.floor(rect.height * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawSprite(img, x, y, w, h, fallbackColor = '#6d7c69') {
  if (img && img.complete && img.naturalWidth > 0) {
    ctx.drawImage(img, x, y, w, h);
    return;
  }
  ctx.fillStyle = fallbackColor;
  ctx.fillRect(x + w * 0.2, y + h * 0.18, w * 0.6, h * 0.72);
}

function combatSnapshot() {
  const enemy = state.combat.enemy;
  return {
    stage: state.combat.stage,
    enemyKey: enemy ? `${state.combat.stage}:${enemy.id}:${enemy.hpMax}` : 'none',
    enemyHp: enemy ? enemy.hp : 0,
    partyHp: state.combat.partyHp,
    resources: resourceSnapshot(),
    enemiesDefeated: state.progress.enemiesDefeated,
    bossesDefeated: state.progress.bossesDefeated,
    equipmentLooted: state.progress.equipmentLooted,
    patrolDefeats: state.progress.patrolDefeats || 0,
  };
}

function createCombatEvent(type, target, amount, tone = 'damage') {
  const targetBase = target === 'hero'
    ? { x: 0.25, y: 0.57 }
    : { x: 0.73, y: state.combat.enemy?.isBoss ? 0.48 : 0.55 };
  const offset = ((ui.eventUid * 37) % 100) / 100;
  ui.combatEvents.push({
    id: ui.eventUid,
    type,
    target,
    tone,
    amount,
    life: 0,
    ttl: type === 'focus' ? 1080 : tone === 'skill' ? 920 : 720,
    x: targetBase.x + (offset - 0.5) * 0.14,
    y: targetBase.y + (0.5 - offset) * 0.08,
    effectIndex: ui.eventUid % Math.max(1, data.assets.effects.length),
  });
  ui.eventUid += 1;
  ui.combatEvents = ui.combatEvents.slice(-18);
}

function createFocusAttackImpact() {
  const amount = Math.max(300, Math.round(state.power.total * 0.08));
  playCombatSfx('combat_skill_cast', { volume: 0.5 });
  playCombatSfx('combat_skill_impact');
  ui.focusImpactMs = 860;
  ui.screenShakeMs = Math.max(ui.screenShakeMs, 320);
  ui.enemyHitShakeMs = Math.max(ui.enemyHitShakeMs, 300);
  ui.heroAttackPulseMs = Math.max(ui.heroAttackPulseMs, 280);
  ui.stageFlashMs = Math.max(ui.stageFlashMs, 420);
  createCombatEvent('focus', 'enemy', amount, 'skill');
  tryVibrate(42);
}

function captureCombatEvents(before, after) {
  if (!before || !after) return;

  if (after.stage > before.stage || after.enemiesDefeated > before.enemiesDefeated) {
    createCombatEvent('burst', 'enemy', 0, 'reward');
    playCombatSfxThrottled('combat_stage_clear', 900, { volume: 0.5 });
    createRewardBurst(resourceDelta(before.resources, after.resources), { source: 'combat' });
    if (after.equipmentLooted > before.equipmentLooted) {
      const latestItem = state.inventory.equipment[state.inventory.equipment.length - 1];
      playCombatSfx('loot_drop_rare', { volume: 0.52 });
      createUpgradeBurst(null, '장비 획득', latestItem?.assetUrl);
    }
    ui.stageFlashMs = Math.max(ui.stageFlashMs, 560);
  }

  if (after.patrolDefeats > before.patrolDefeats) {
    createCombatEvent('burst', 'enemy', after.patrolDefeats - before.patrolDefeats, 'patrol');
    playCombatSfxThrottled('reward_gold_small', 800, { volume: 0.42 });
    createRewardBurst(resourceDelta(before.resources, after.resources), { source: 'combat' });
    ui.stageFlashMs = Math.max(ui.stageFlashMs, 240);
  }

  const sameEnemy = before.enemyKey === after.enemyKey;
  if (sameEnemy && after.enemyHp < before.enemyHp) {
    const damage = Math.max(1, Math.round(before.enemyHp - after.enemyHp));
    const hasSkill = state.combat.floaters.some((floater) => floater.tone === 'skill');
    const hasCrit = state.combat.floaters.some((floater) => floater.tone === 'crit');
    playCombatSfxThrottled(hasSkill ? 'combat_skill_impact' : hasCrit ? 'combat_critical_hit' : 'combat_sword_light_01', 180, { volume: 0.38 });
    createCombatEvent('hit', 'enemy', damage, hasSkill ? 'skill' : hasCrit ? 'crit' : 'damage');
    ui.enemyHitShakeMs = Math.max(ui.enemyHitShakeMs, 180);
    ui.heroAttackPulseMs = Math.max(ui.heroAttackPulseMs, 160);
    tryVibrate(18);
  }

  if (after.partyHp < before.partyHp) {
    playCombatSfxThrottled('combat_hit_armor', 240, { volume: 0.36 });
    createCombatEvent('hit', 'hero', Math.round(before.partyHp - after.partyHp), 'enemy');
    ui.heroHitShakeMs = Math.max(ui.heroHitShakeMs, 180);
    ui.screenShakeMs = Math.max(ui.screenShakeMs, 140);
    tryVibrate(28);
  }
}

function tryVibrate(ms) {
  const activated = !navigator.userActivation || navigator.userActivation.hasBeenActive;
  if (ui.userInteracted && activated && navigator.vibrate) {
    navigator.vibrate(ms);
  }
}

function stepRuntime(ms) {
  const before = combatSnapshot();
  Runtime.advanceTime(state, data, ms);
  const after = combatSnapshot();
  captureCombatEvents(before, after);
  ui.lastCombatSnapshot = after;
}

function updateVisualEffects(delta) {
  ui.screenShakeMs = Math.max(0, ui.screenShakeMs - delta);
  ui.enemyHitShakeMs = Math.max(0, ui.enemyHitShakeMs - delta);
  ui.heroHitShakeMs = Math.max(0, ui.heroHitShakeMs - delta);
  ui.heroAttackPulseMs = Math.max(0, ui.heroAttackPulseMs - delta);
  ui.focusImpactMs = Math.max(0, ui.focusImpactMs - delta);
  ui.stageFlashMs = Math.max(0, ui.stageFlashMs - delta);

  ui.combatEvents.forEach((event) => {
    event.life += delta;
  });
  ui.combatEvents = ui.combatEvents.filter((event) => event.life < event.ttl);
}

function drawShadow(x, y, w, h) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.26)';
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h * 0.92, w * 0.33, h * 0.055, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawEffectSprite(event, x, y, size, alpha) {
  const asset = data.assets.effects[event.effectIndex % Math.max(1, data.assets.effects.length)];
  const img = image(asset?.assetUrl);
  if (!img || !img.complete || img.naturalWidth <= 0) return false;

  const cols = 4;
  const rows = 4;
  const progress = Math.max(0, Math.min(0.999, event.life / event.ttl));
  const frame = Math.floor(progress * cols * rows);
  const sx = (frame % cols) * (img.naturalWidth / cols);
  const sy = Math.floor(frame / cols) * (img.naturalHeight / rows);
  const sw = img.naturalWidth / cols;
  const sh = img.naturalHeight / rows;
  ctx.save();
  ctx.globalAlpha = alpha * 0.82;
  ctx.globalCompositeOperation = 'lighter';
  ctx.drawImage(img, sx, sy, sw, sh, x - size / 2, y - size / 2, size, size);
  ctx.restore();
  return true;
}

function drawSlash(event, x, y, size, alpha) {
  const color = event.tone === 'skill' ? '#9ad7ff' : event.tone === 'crit' ? '#ffd166' : '#fff8df';
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineCap = 'round';
  ctx.lineWidth = Math.max(3, size * 0.055);
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(x - size * 0.36, y + size * 0.24);
  ctx.quadraticCurveTo(x, y - size * 0.18, x + size * 0.38, y - size * 0.28);
  ctx.stroke();

  ctx.lineWidth = Math.max(1, size * 0.025);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.86)';
  ctx.beginPath();
  ctx.moveTo(x - size * 0.22, y + size * 0.33);
  ctx.lineTo(x + size * 0.28, y - size * 0.15);
  ctx.stroke();
  ctx.restore();
}

function drawImpactRing(event, x, y, size, alpha) {
  const color = event.tone === 'skill' ? '#9ad7ff' : event.tone === 'crit' ? '#ffd166' : event.tone === 'enemy' ? '#ff9f8d' : '#fff1c7';
  const progress = Math.max(0, Math.min(1, event.life / event.ttl));
  const radius = size * (0.16 + progress * 0.22);
  ctx.save();
  ctx.globalAlpha = alpha * 0.76;
  ctx.globalCompositeOperation = 'lighter';
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(2, size * 0.025);
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = Math.max(1.5, size * 0.018);
  for (let index = 0; index < 8; index += 1) {
    const angle = (Math.PI * 2 * index) / 8 + progress * 0.8;
    const inner = radius * 0.72;
    const outer = radius * 1.28;
    ctx.beginPath();
    ctx.moveTo(x + Math.cos(angle) * inner, y + Math.sin(angle) * inner);
    ctx.lineTo(x + Math.cos(angle) * outer, y + Math.sin(angle) * outer);
    ctx.stroke();
  }
  ctx.restore();
}

function drawDamageText(event, w, h) {
  const progress = Math.max(0, Math.min(1, event.life / event.ttl));
  const x = event.x * w;
  const y = event.y * h - progress * 58;
  const alpha = 1 - progress;
  const prefix = event.tone === 'crit' ? 'CRIT ' : event.tone === 'skill' ? 'SKILL ' : '';
  const text = event.tone === 'patrol' ? 'PATROL' : event.amount ? `${prefix}-${formatNumber(event.amount)}` : event.tone === 'reward' ? 'CLEAR' : 'HIT';
  const color = event.tone === 'enemy' ? '#ff9f8d' : event.tone === 'skill' ? '#9ad7ff' : event.tone === 'crit' || event.tone === 'patrol' ? '#ffd166' : '#fff8df';

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = event.tone === 'skill' || event.tone === 'crit' ? '900 20px Segoe UI, sans-serif' : '900 17px Segoe UI, sans-serif';
  ctx.textAlign = 'center';
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.strokeText(text, x, y);
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawFocusImpact(w, h) {
  if (ui.focusImpactMs <= 0) return;
  const duration = 860;
  const remaining = Math.max(0, Math.min(duration, ui.focusImpactMs));
  const progress = 1 - (remaining / duration);
  const alpha = Math.max(0, Math.min(1, remaining / duration));
  const hero = { x: w * 0.35, y: h * 0.58 };
  const enemy = { x: w * 0.76, y: h * 0.48 };
  const pulse = 1 + Math.sin(progress * Math.PI) * 0.18;

  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.globalAlpha = alpha * 0.82;
  const beam = ctx.createLinearGradient(hero.x, hero.y, enemy.x, enemy.y);
  beam.addColorStop(0, 'rgba(255, 248, 223, 0.25)');
  beam.addColorStop(0.48, 'rgba(154, 215, 255, 0.95)');
  beam.addColorStop(1, 'rgba(255, 209, 102, 0.7)');
  ctx.strokeStyle = beam;
  ctx.lineCap = 'round';
  ctx.lineWidth = 18 * pulse;
  ctx.beginPath();
  ctx.moveTo(hero.x, hero.y);
  ctx.lineTo(enemy.x, enemy.y);
  ctx.stroke();

  ctx.lineWidth = 5;
  ctx.strokeStyle = 'rgba(255, 248, 223, 0.92)';
  ctx.beginPath();
  ctx.moveTo(hero.x - 12, hero.y + 18);
  ctx.lineTo(enemy.x + 12, enemy.y - 18);
  ctx.stroke();

  const radius = 38 + progress * 92;
  const ring = ctx.createRadialGradient(enemy.x, enemy.y, 6, enemy.x, enemy.y, radius);
  ring.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
  ring.addColorStop(0.34, 'rgba(154, 215, 255, 0.58)');
  ring.addColorStop(1, 'rgba(154, 215, 255, 0)');
  ctx.fillStyle = ring;
  ctx.beginPath();
  ctx.arc(enemy.x, enemy.y, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = alpha;
  ctx.font = '900 20px Segoe UI, sans-serif';
  ctx.textAlign = 'center';
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.62)';
  ctx.strokeText('집중 공격', w * 0.56, h * 0.23);
  ctx.fillStyle = '#dff3ff';
  ctx.fillText('집중 공격', w * 0.56, h * 0.23);
  ctx.restore();
}

function drawCombatEvents(w, h) {
  for (const event of ui.combatEvents) {
    const progress = Math.max(0, Math.min(1, event.life / event.ttl));
    const alpha = Math.max(0, 1 - progress);
    const x = event.x * w;
    const y = event.y * h;
    const size = (event.type === 'focus' ? 168 : event.tone === 'skill' ? 130 : 96) * (1 + progress * 0.18);

    if (event.target === 'enemy') {
      const usedSprite = drawEffectSprite(event, x, y, size, alpha);
      drawImpactRing(event, x, y, size, alpha);
      if (!usedSprite || event.tone !== 'reward') {
        drawSlash(event, x, y, size * 0.72, alpha);
      }
    } else {
      drawImpactRing(event, x, y, size * 0.72, alpha * 0.68);
      drawSlash(event, x, y, size * 0.56, alpha * 0.72);
    }

    drawDamageText(event, w, h);
  }
}

function renderVillageCanvas(w, h, bg) {
  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop(0, '#3f644f');
  gradient.addColorStop(0.58, '#283d33');
  gradient.addColorStop(1, '#17231f');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  if (bg && bg.complete) {
    ctx.globalAlpha = 0.46;
    ctx.drawImage(bg, 0, 0, w, h);
    ctx.globalAlpha = 1;
  }

  ctx.fillStyle = 'rgba(255, 248, 223, 0.12)';
  ctx.fillRect(0, h * 0.7, w, h * 0.3);

  const palace = state.village.buildings.find((building) => building.id === 'building_palace') || state.village.buildings[0];
  const palaceImg = image(palace?.assetUrl);
  drawShadow(w * 0.52, h * 0.31, w * 0.38, h * 0.44);
  drawSprite(palaceImg, w * 0.50, h * 0.16, w * 0.43, h * 0.54, '#776d52');

  state.heroes.owned.slice(0, 3).forEach((hero, index) => {
    const heroImg = image(hero.assetUrl);
    const x = w * (0.08 + index * 0.105);
    const y = h * (0.33 + index * 0.035);
    const width = w * (index === 0 ? 0.26 : 0.2);
    const height = h * (index === 0 ? 0.46 : 0.36);
    drawShadow(x, y, width, height);
    drawSprite(heroImg, x, y, width, height, '#516a84');
  });

  const glintCount = 5;
  for (let index = 0; index < glintCount; index += 1) {
    const progress = ((state.timestamps.now / 1000) * 0.35 + index * 0.22) % 1;
    const x = w * (0.48 + index * 0.075);
    const y = h * (0.22 + Math.sin(progress * Math.PI * 2) * 0.04);
    ctx.save();
    ctx.globalAlpha = 0.18 + Math.sin(progress * Math.PI) * 0.2;
    ctx.fillStyle = '#ffd166';
    ctx.beginPath();
    ctx.arc(x, y, 3 + progress * 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  ctx.fillStyle = 'rgba(0, 0, 0, 0.32)';
  ctx.fillRect(0, h * 0.83, w, h * 0.17);
  ctx.fillStyle = '#fff8df';
  ctx.font = '800 16px Segoe UI, sans-serif';
  ctx.fillText('왕국 로비', 14, h * 0.89);
  ctx.font = '700 12px Segoe UI, sans-serif';
  ctx.fillStyle = 'rgba(255, 248, 223, 0.78)';
  ctx.fillText(`${state.village.tier.name} 단계 · 건물 ${state.progress.buildingsUpgraded}회 강화`, 14, h * 0.95);
}

function shakeOffset(ms, amount) {
  if (ms <= 0) return 0;
  return Math.sin(ms * 0.21) * amount * (ms / 180);
}

function renderCanvas() {
  resizeCanvas();
  const rect = canvas.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;
  const enemy = state.combat.enemy;
  const regionIndex = Math.min(data.assets.environments.length - 1, Math.floor((state.combat.stage - 1) / 12));
  const bg = image(data.assets.environments[regionIndex]?.assetUrl);

  if (state.activeTab === 'village') {
    renderVillageCanvas(w, h, bg);
    document.querySelector('.stage-label').textContent = '왕국 로비';
    document.querySelector('.enemy-label').textContent = `${state.village.tier.name} 단계`;
    document.querySelector('.hp-fill').style.width = `${clampPercent((state.progress.buildingsUpgraded + state.combat.stage) / 12)}%`;
    return;
  }

  const screenShakeX = shakeOffset(ui.screenShakeMs, 6);
  ctx.save();
  ctx.translate(screenShakeX, 0);

  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop(0, '#334a3c');
  gradient.addColorStop(0.55, '#26352f');
  gradient.addColorStop(1, '#17231f');
  ctx.fillStyle = gradient;
  ctx.fillRect(-8, 0, w + 16, h);

  if (bg && bg.complete) {
    ctx.globalAlpha = 0.32;
    ctx.drawImage(bg, 0, 0, w, h);
    ctx.globalAlpha = 1;
  }

  ctx.fillStyle = 'rgba(255, 248, 223, 0.12)';
  ctx.fillRect(0, h * 0.72, w, h * 0.28);

  const heroImg = image(state.heroes.owned[0]?.assetUrl);
  const enemyImg = image(enemy?.assetUrl);
  const heroPulse = ui.heroAttackPulseMs > 0 ? 9 * (ui.heroAttackPulseMs / 160) : 0;
  const heroShake = shakeOffset(ui.heroHitShakeMs, 8);
  const enemyShake = shakeOffset(ui.enemyHitShakeMs, 10);
  const heroBox = { x: w * 0.03 + heroPulse + heroShake, y: h * 0.34, w: w * 0.45, h: h * 0.58 };
  const enemyBox = {
    x: w * 0.56 + enemyShake,
    y: h * (enemy?.isBoss ? 0.22 : 0.32),
    w: w * 0.42,
    h: h * (enemy?.isBoss ? 0.66 : 0.52),
  };

  drawShadow(heroBox.x, heroBox.y, heroBox.w, heroBox.h);
  drawShadow(enemyBox.x, enemyBox.y, enemyBox.w, enemyBox.h);
  drawSprite(heroImg, heroBox.x, heroBox.y, heroBox.w, heroBox.h, '#516a84');
  drawSprite(enemyImg, enemyBox.x, enemyBox.y, enemyBox.w, enemyBox.h, '#8c6d52');
  drawFocusImpact(w, h);
  drawCombatEvents(w, h);

  if (ui.stageFlashMs > 0) {
    ctx.globalAlpha = Math.min(0.34, ui.stageFlashMs / 560);
    ctx.fillStyle = '#fff1c7';
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;
  }

  ctx.restore();

  document.querySelector('.stage-label').textContent = `Stage ${state.combat.stage}`;
  document.querySelector('.enemy-label').textContent = enemy ? `${enemy.isBoss ? 'BOSS ' : ''}${enemy.name}` : '';
  document.querySelector('.hp-fill').style.width = enemy ? `${clampPercent(enemy.hp / enemy.hpMax)}%` : '0%';
  document.querySelector('.enemy-hp-status').textContent = combatHudStatusText();
  document.querySelector('.party-hp-status').textContent = partyHpStatusText();
  document.querySelector('.hero-hp-fill').style.width = `${clampPercent(state.combat.partyHp / state.combat.partyHpMax)}%`;
}

function clampPercent(value) {
  return Math.max(0, Math.min(100, Math.round(value * 100)));
}

function renderAll() {
  Runtime.recalculatePower(state);
  renderTopbar();
  renderNav();
  renderPanel();
  renderLivePanelUpdates();
  renderCanvas();
  renderDailyRewardOverlay();
  renderOpening();
  renderTutorial();
  renderHeroDetailOverlay();
  renderToasts();
  setBgmForContext();
}

function frame(timestamp) {
  if (!lastFrame) lastFrame = timestamp;
  const delta = Math.min(1000, timestamp - lastFrame);
  lastFrame = timestamp;
  stepRuntime(delta);
  updateVisualEffects(delta);
  renderCanvas();

  if (timestamp > renderUiAt) {
    renderTopbar();
    renderNav();
    renderLivePanelUpdates();
    renderDailyRewardOverlay();
    renderOpening();
    renderTutorial();
    renderHeroDetailOverlay();
    renderUiAt = timestamp + 1000;
  }
  if (timestamp > saveAt) {
    saveGame();
    saveAt = timestamp + 5000;
  }
  toastQueue.forEach((item) => { item.ttl -= delta; });
  toastQueue = toastQueue.filter((item) => item.ttl > 0);
  renderToasts();
  requestAnimationFrame(frame);
}

async function boot() {
  document.title = PROJECT_TITLE;
  data = await fetch('runtime-data.json').then((response) => {
    if (!response.ok) throw new Error(`runtime-data.json ${response.status}`);
    return response.json();
  });
  audioManager = createAudioManager();
  audioManager?.setEnabled(isSoundEnabled());
  audioManager.load(AUDIO_MANIFEST_URL).then(() => {
    audioManager?.setEnabled(isSoundEnabled());
    if (ui.userInteracted) audioManager?.unlock();
    setBgmForContext();
  });

  const saved = localStorage.getItem(data.project.saveKey);
  state = Runtime.loadGame(saved, data, { now: Date.now() });
  Runtime.applyOfflineProgress(state, data, Date.now());
  ui.openingVisible = storageGet(sessionStorage, OPENING_SESSION_KEY) !== '1';
  ui.tutorialStep = storageGet(localStorage, TUTORIAL_KEY) === '1' ? -1 : 0;
  ui.dailyRewardVisible = shouldShowDailyRewardOverlay();
  ui.lastCombatSnapshot = combatSnapshot();

  renderShell();
  window.addEventListener('pointerdown', () => {
    ui.userInteracted = true;
    audioManager?.unlock();
  }, { passive: true });
  renderAll();

  window.advanceTime = (ms) => {
    let remaining = Math.max(0, Math.min(ms, 60000));
    while (remaining > 0) {
      const step = Math.min(remaining, 100);
      stepRuntime(step);
      updateVisualEffects(step);
      remaining -= step;
    }
    renderAll();
  };
  window.render_game_to_text = () => JSON.stringify({
    ...Runtime.stateSummary(state),
    ui: {
      openingVisible: ui.openingVisible,
      tutorialStep: ui.tutorialStep,
      activeEffects: ui.combatEvents.length,
      screenShake: Math.round(ui.screenShakeMs),
      focusImpact: Math.round(ui.focusImpactMs),
      dailyRewardVisible: ui.dailyRewardVisible,
      audio: audioManager?.state() || null,
    },
  });
  window.lostKingdomState = state;
  window.lostKingdomUi = ui;
  window.setSoundEnabled = setSoundEnabled;
  window.claimDailyPerformanceReward = claimDailyPerformanceReward;
  window.triggerCombatEffectDemo = () => {
    createCombatEvent('hit', 'enemy', Math.max(300, Math.round(state.power.total * 0.08)), 'crit');
    createCombatEvent('hit', 'hero', Math.max(40, Math.round(state.power.total * 0.01)), 'enemy');
    createFocusAttackImpact();
    ui.enemyHitShakeMs = 180;
    ui.heroHitShakeMs = 180;
    ui.screenShakeMs = 160;
    renderCanvas();
  };

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }

  requestAnimationFrame(frame);
}

boot().catch((error) => {
  app.innerHTML = `<section class="boot"><strong>런타임 로드 실패</strong><span>${error.message}</span></section>`;
});
