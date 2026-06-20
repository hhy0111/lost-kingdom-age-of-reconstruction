const REGION_IDS = {
  초원: 'region_grassland',
  숲: 'region_forest',
  폐광: 'region_abandoned_mine',
  사막: 'region_desert',
  설원: 'region_snowfield',
  화산: 'region_volcano',
  심연: 'region_abyss',
  마왕성: 'region_demon_castle',
};

const REGION_ELEMENTS = {
  초원: 'neutral',
  숲: 'wind',
  폐광: 'earth',
  사막: 'fire',
  설원: 'water',
  화산: 'fire',
  심연: 'dark',
  마왕성: 'dark',
};

const EQUIPMENT_SLOTS = [
  'weapon',
  'helmet',
  'armor',
  'gloves',
  'boots',
  'necklace',
  'ring',
  'cloak',
  'belt',
  'artifact',
];

const BUILDINGS = [
  ['building_palace', '왕궁', 'kingdom'],
  ['building_inn', '여관', 'hero'],
  ['building_blacksmith', '대장간', 'crafting'],
  ['building_farm', '농장', 'food'],
  ['building_lumber_mill', '벌목소', 'wood'],
  ['building_quarry', '채석장', 'stone'],
  ['building_mine', '광산', 'ore'],
  ['building_magic_tower', '마법탑', 'magicStone'],
  ['building_market', '시장', 'gold'],
  ['building_explorer_guild', '탐험가 길드', 'expedition'],
  ['building_research_lab', '연구소', 'research'],
  ['building_city_wall', '성벽', 'defense'],
];

const CURRENCIES = [
  ['gold', '골드', 'basic'],
  ['diamond', '다이아', 'premium'],
  ['food', '식량', 'resource'],
  ['wood', '목재', 'resource'],
  ['ore', '광석', 'resource'],
  ['magic_stone', '마력석', 'resource'],
];

const AD_PLACEMENTS = [
  ['ad_offline_reward_x2', '오프라인 보상 2배', 5, 0, 'offline_reward_popup', 'grant_after_completed_view'],
  ['ad_gold_x2', '골드 2배', 5, 30, 'combat_reward_panel', 'grant_timed_buff_after_completed_view'],
  ['ad_resource_x2', '자원 2배', 5, 30, 'village_production_panel', 'grant_timed_buff_after_completed_view'],
  ['ad_expedition_complete', '영웅 탐험 즉시 완료', 3, 20, 'expedition_detail', 'grant_completion_after_completed_view'],
  ['ad_building_complete', '건물 건설 즉시 완료', 3, 20, 'building_detail', 'grant_completion_after_completed_view'],
  ['ad_equipment_box', '장비 상자 획득', 5, 15, 'equipment_reward_panel', 'grant_item_after_completed_view'],
  ['ad_boss_retry', '보스 재도전권', 3, 20, 'boss_retry_popup', 'grant_ticket_after_completed_view'],
  ['ad_free_summon', '무료 소환', 5, 15, 'summon_panel', 'grant_summon_after_completed_view'],
  ['ad_legendary_box_boost', '전설 상자 확률 증가', 1, 60, 'equipment_chest_panel', 'grant_next_chest_modifier_after_completed_view'],
  ['ad_daily_special', '일일 특별 보상', 1, 60, 'daily_reward_panel', 'grant_choice_reward_after_completed_view'],
];

const ADMOB_ANDROID = {
  appId: 'ca-app-pub-4402708884038037~5285192241',
  rewardedCoreUnitName: 'rewarded_core',
  rewardedCoreAdUnitId: 'ca-app-pub-4402708884038037/6509654325',
};

const SHOP_PRODUCTS = [
  ['starter_pack', '스타터 패키지', 1500, 'package'],
  ['remove_ads', '광고 제거 패키지', 8900, 'convenience'],
  ['monthly_subscription', '월정액', 6500, 'subscription'],
  ['kingdom_pass', '왕국 패스', 12900, 'season_pass'],
  ['growth_pack_1', '성장 패키지 I', 5900, 'growth'],
  ['growth_pack_2', '성장 패키지 II', 12900, 'growth'],
  ['growth_pack_3', '성장 패키지 III', 29000, 'growth'],
];

const IAP_PRODUCTS = [
  ['iap_starter_pack', 'starter_pack', 'lostkingdom.starter_pack', 'com.lostkingdom.starterpack', 'consumable', 1500, 'grant_once_then_mark_claimed', 'not_restorable_consumable'],
  ['iap_remove_ads', 'remove_ads', 'lostkingdom.remove_ads', 'com.lostkingdom.removeads', 'non_consumable', 8900, 'unlock_ad_skip_entitlement_permanently', 'restore_non_consumable'],
  ['iap_monthly_subscription', 'monthly_subscription', 'lostkingdom.monthly_subscription', 'com.lostkingdom.monthlysubscription', 'subscription', 6500, 'grant_30_day_membership_and_daily_claims', 'restore_subscription_state'],
  ['iap_kingdom_pass', 'kingdom_pass', 'lostkingdom.kingdom_pass', 'com.lostkingdom.kingdompass', 'season_pass', 12900, 'unlock_current_season_premium_track', 'restore_current_season_entitlement'],
  ['iap_growth_pack_1', 'growth_pack_1', 'lostkingdom.growth_pack_1', 'com.lostkingdom.growthpack1', 'consumable', 5900, 'grant_growth_rewards_for_early_regions', 'not_restorable_consumable'],
  ['iap_growth_pack_2', 'growth_pack_2', 'lostkingdom.growth_pack_2', 'com.lostkingdom.growthpack2', 'consumable', 12900, 'grant_growth_rewards_for_mid_regions', 'not_restorable_consumable'],
  ['iap_growth_pack_3', 'growth_pack_3', 'lostkingdom.growth_pack_3', 'com.lostkingdom.growthpack3', 'consumable', 29000, 'grant_growth_rewards_for_late_regions', 'not_restorable_consumable'],
];

const PURCHASE_VALIDATION_RULES = [
  ['validation_unity_iap_receipt', 'Unity IAP receipt validation', 'client_and_optional_server', 'Validate local receipt structure before fulfillment and send receipt to server when available.'],
  ['validation_google_play_billing', 'Google Play Billing validation', 'server_recommended', 'Store purchase token and verify entitlement before granting durable value.'],
  ['validation_apple_storekit_restore', 'Apple StoreKit restore', 'client_required', 'Provide restore flow for non-consumables and subscriptions.'],
  ['validation_pending_purchase_queue', 'Pending purchase queue', 'client_required', 'Do not grant product until store reports completed purchase and receipt exists.'],
  ['validation_idempotent_fulfillment', 'Idempotent fulfillment', 'client_required', 'Track transaction ids so retry or restore cannot duplicate rewards.'],
  ['validation_purchase_restore_button', 'Visible restore purchases button', 'ui_required', 'Expose purchase restore in settings and package screen.'],
];

const MONETIZATION_OFFER_SURFACES = [
  ['surface_offline_reward_popup', '오프라인 보상 팝업', 'ad_offline_reward_x2', 'return_session', 'show_after_reward_preview'],
  ['surface_combat_reward_panel', '전투 보상 패널', 'ad_gold_x2', 'combat_loop', 'show_after_stage_rewards'],
  ['surface_village_production_panel', '마을 생산 패널', 'ad_resource_x2', 'village_loop', 'show_when_resources_claimable'],
  ['surface_expedition_detail', '탐험 상세', 'ad_expedition_complete', 'expedition_loop', 'show_when_remaining_time_allowed'],
  ['surface_building_detail', '건물 상세', 'ad_building_complete', 'village_loop', 'show_when_remaining_time_allowed'],
  ['surface_equipment_reward_panel', '장비 보상 패널', 'ad_equipment_box', 'equipment_loop', 'show_after_boss_or_daily_reward'],
  ['surface_ad_remove_package', '광고 제거 패키지', 'iap_remove_ads', 'shop', 'show_after_three_ad_accepts_or_settings'],
  ['surface_monthly_subscription', '월정액', 'iap_monthly_subscription', 'shop', 'show_after_d1_return'],
  ['surface_kingdom_pass', '왕국 패스', 'iap_kingdom_pass', 'season', 'show_after_weekly_orders_unlock'],
];

const MONETIZATION_ANALYTICS_EVENTS = [
  ['monetization_screen_opened', 'monetization_screen_opened', 'screen'],
  ['shop_tab_opened', 'shop_tab_opened', 'screen'],
  ['package_detail_opened', 'package_detail_opened', 'screen'],
  ['ad_reward_offer_shown', 'ad_reward_offer_shown', 'ad'],
  ['ad_reward_offer_clicked', 'ad_reward_offer_clicked', 'ad'],
  ['ad_reward_started', 'ad_reward_started', 'ad'],
  ['ad_reward_completed', 'ad_reward_completed', 'ad'],
  ['ad_reward_failed', 'ad_reward_failed', 'ad'],
  ['ad_reward_granted', 'ad_reward_granted', 'ad'],
  ['ad_reward_limit_reached', 'ad_reward_limit_reached', 'ad'],
  ['ad_reward_cooldown_blocked', 'ad_reward_cooldown_blocked', 'ad'],
  ['remove_ads_offer_shown', 'remove_ads_offer_shown', 'iap'],
  ['iap_product_catalog_loaded', 'iap_product_catalog_loaded', 'iap'],
  ['iap_product_catalog_failed', 'iap_product_catalog_failed', 'iap'],
  ['iap_purchase_started', 'iap_purchase_started', 'iap'],
  ['iap_purchase_cancelled', 'iap_purchase_cancelled', 'iap'],
  ['iap_purchase_pending', 'iap_purchase_pending', 'iap'],
  ['iap_purchase_completed', 'iap_purchase_completed', 'iap'],
  ['iap_purchase_failed', 'iap_purchase_failed', 'iap'],
  ['iap_receipt_validation_started', 'iap_receipt_validation_started', 'iap'],
  ['iap_receipt_validation_succeeded', 'iap_receipt_validation_succeeded', 'iap'],
  ['iap_receipt_validation_failed', 'iap_receipt_validation_failed', 'iap'],
  ['iap_entitlement_granted', 'iap_entitlement_granted', 'iap'],
  ['iap_entitlement_duplicate_ignored', 'iap_entitlement_duplicate_ignored', 'iap'],
  ['iap_restore_started', 'iap_restore_started', 'iap'],
  ['iap_restore_completed', 'iap_restore_completed', 'iap'],
  ['iap_restore_failed', 'iap_restore_failed', 'iap'],
  ['iap_purchase_restored', 'iap_purchase_restored', 'iap'],
  ['kingdom_pass_premium_viewed', 'kingdom_pass_premium_viewed', 'pass'],
  ['kingdom_pass_premium_unlocked', 'kingdom_pass_premium_unlocked', 'pass'],
];

const RETENTION_HOOKS = [
  ['retention_first_10_minute_kingdom_rebuild', '첫 10분 왕국 복구', 'ftue', 'install_to_d1', '첫 세션에 건물 2개 복구, 영웅 3명 편성, 첫 보스 예고를 완료한다.'],
  ['retention_first_boss_goal', '첫 보스 목표 고정', 'ftue', 'install_to_d1', '시작 후 15분 안에 폐허의 첫 수문장 도전 목표를 노출한다.'],
  ['retention_day_1_rebuild_road', '1일차 재건 로드', 'daily', 'd1', '마을 단계 진입까지 3단계 미션과 보상을 제공한다.'],
  ['retention_day_3_crafting_unlock', '3일차 제작 해금 목표', 'daily', 'd3', '숲 진입과 첫 제작 장비를 연결해 중기 목표를 만든다.'],
  ['retention_day_7_city_milestone', '7일차 도시 이정표', 'weekly', 'd7', '왕궁 Lv3와 영웅 15명 보유를 주간 목표로 제시한다.'],
  ['retention_daily_kingdom_orders', '일일 왕국 명령', 'daily', 'repeat', '매일 3개의 짧은 미션을 제공하고 완주 보상은 과하지 않게 둔다.'],
  ['retention_weekly_restoration_orders', '주간 복구 명령', 'weekly', 'd7_repeat', '전투, 건설, 탐험, 제작, 광고 보상 사용을 골고루 유도한다.'],
  ['retention_return_kingdom_report', '복귀 왕국 보고서', 'return', 'd1_d7', '오프라인 보상 수령 전 왕국 변화, 놓친 보상, 추천 행동 3개를 보여준다.'],
  ['retention_comeback_rescue', '복귀자 구출 작전', 'return', 'd7_d14', '3일 이상 미접속 유저에게 주민 구출 이벤트와 완만한 따라잡기 보상을 제공한다.'],
  ['retention_collection_album', '재건 도감 앨범', 'collection', 'long_term', '몬스터, 영웅, 장비, 건물 외형 수집률을 시각 보상으로 연결한다.'],
  ['retention_soft_notification_triggers', '선택형 알림 트리거', 'notification', 'return', '탐험 완료, 건설 완료, 오프라인 보상 포화만 사용자 동의 후 알림으로 보낸다.'],
  ['retention_ab_rewarded_ad_tuning', '보상형 광고 A/B 조정', 'monetization', 'repeat', '광고 보상 배치, 제한 횟수, 간격을 원격 설정으로 비교한다.'],
];

const LIVE_EVENTS = [
  ['event_ruin_rebuild_week', '폐허 복구 주간', 'weekly', '초원/숲', '건물 건설과 주민 구출 보상 증가'],
  ['event_forest_rescue_week', '숲의 생존자 구출', 'weekly', '숲', '탐험 성공률과 주민 획득률 증가'],
  ['event_mine_treasure_week', '폐광 보물 탐사', 'weekly', '폐광', '광석과 장비 상자 보상 증가'],
  ['event_desert_caravan', '사막 상단 축제', 'weekly', '사막', '골드와 시장 교환 보너스'],
  ['event_snow_fortress_defense', '설원 요새 방어전', 'weekend', '설원', '성벽/방어 연구 보너스'],
  ['event_volcano_forge_fever', '화산 제련 열풍', 'weekend', '화산', '제작 시간 단축과 전설 조각 보상'],
  ['event_abyss_rift_weekend', '심연 균열 주말', 'weekend', '심연', '마력석과 각성 재료 보상'],
  ['event_demon_castle_countdown', '마왕성 결전 예고', 'season', '마왕성', '시즌 보스와 패스 미션 연동'],
];

const STORE_EXPERIMENTS = [
  ['store_google_icon_castle_progression', 'Google Play 아이콘 테스트: 성 복구 단계', 'google_play', 'icon', '폐허 성 vs 복구된 왕궁 아이콘 전환율 비교'],
  ['store_google_screenshot_first_10_minutes', 'Google Play 스크린샷 테스트: 첫 10분 복구', 'google_play', 'screenshot', '전투력 숫자보다 폐허에서 마을로 바뀌는 화면을 첫 장에 배치'],
  ['store_google_video_idle_loop', 'Google Play 영상 테스트: 방치 루프', 'google_play', 'video', '전투-보상-건설-왕국 변화 20초 루프 비교'],
  ['store_google_copy_classic_rpg', 'Google Play 문구 테스트: 고전 RPG 감성', 'google_play', 'copy', '마을 재건/장비 파밍/영웅 수집 키워드 비교'],
  ['store_apple_in_app_event_rebuild_week', 'Apple In-App Event: 폐허 복구 주간', 'app_store', 'in_app_event', '신규/기존/복귀 유저에게 기간 한정 복구 이벤트 노출'],
  ['store_apple_in_app_event_abyss_rift', 'Apple In-App Event: 심연 균열', 'app_store', 'in_app_event', '중후반 유저 재접속용 주말 이벤트 노출'],
  ['store_localized_korea_japan_us', '지역별 스토어 현지화', 'both', 'localization', '한국/일본/미국 스크린샷 순서와 문구를 분리 테스트'],
  ['store_pre_registration_rewards', '사전예약 보상 테스트', 'google_play', 'pre_registration', '희귀 장비 선택권 vs 다이아+소환권 구성 비교'],
];

const ANALYTICS_EVENTS = [
  ['analytics_install', 'install', 'acquisition'],
  ['analytics_first_open', 'first_open', 'ftue'],
  ['analytics_tutorial_start', 'tutorial_start', 'ftue'],
  ['analytics_first_battle_start', 'first_battle_start', 'ftue'],
  ['analytics_first_battle_win', 'first_battle_win', 'ftue'],
  ['analytics_first_hero_equip', 'first_hero_equip', 'ftue'],
  ['analytics_first_building_restore', 'first_building_restore', 'ftue'],
  ['analytics_first_ad_reward_offer', 'first_ad_reward_offer', 'monetization'],
  ['analytics_first_ad_reward_accept', 'first_ad_reward_accept', 'monetization'],
  ['analytics_first_boss_attempt', 'first_boss_attempt', 'ftue'],
  ['analytics_first_boss_clear', 'first_boss_clear', 'activation'],
  ['analytics_d1_return', 'd1_return', 'retention'],
  ['analytics_d3_return', 'd3_return', 'retention'],
  ['analytics_d7_return', 'd7_return', 'retention'],
  ['analytics_d14_return', 'd14_return', 'retention'],
  ['analytics_offline_reward_claim', 'offline_reward_claim', 'retention'],
  ['analytics_kingdom_tier_up', 'kingdom_tier_up', 'progression'],
  ['analytics_daily_orders_complete', 'daily_orders_complete', 'retention'],
  ['analytics_weekly_orders_complete', 'weekly_orders_complete', 'retention'],
  ['analytics_expedition_complete', 'expedition_complete', 'engagement'],
  ['analytics_crafting_unlock', 'crafting_unlock', 'progression'],
  ['analytics_first_purchase_view', 'first_purchase_view', 'monetization'],
  ['analytics_first_purchase_complete', 'first_purchase_complete', 'monetization'],
  ['analytics_pass_view', 'pass_view', 'monetization'],
  ['analytics_pass_purchase', 'pass_purchase', 'monetization'],
  ['analytics_comeback_event_start', 'comeback_event_start', 'retention'],
  ['analytics_store_variant_seen', 'store_variant_seen', 'acquisition'],
  ['analytics_notification_opt_in', 'notification_opt_in', 'retention'],
];

function section(markdown, startHeading, endHeading) {
  const start = markdown.indexOf(startHeading);
  if (start < 0) {
    throw new Error(`Missing section: ${startHeading}`);
  }

  const end = endHeading ? markdown.indexOf(endHeading, start + startHeading.length) : -1;
  return end < 0 ? markdown.slice(start) : markdown.slice(start, end);
}

function parseRow(line) {
  return line
    .split('|')
    .slice(1, -1)
    .map((value) => value.trim());
}

function tableRows(markdownSection) {
  return markdownSection
    .split(/\r?\n/)
    .filter((line) => line.startsWith('| '))
    .map(parseRow)
    .filter((columns) => columns.length > 0 && !columns[0].startsWith('---'));
}

function splitList(value) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function pad3(value) {
  return String(value).padStart(3, '0');
}

function parseCatalog(markdown) {
  const regionRows = tableRows(section(markdown, '## 지역 8종', '## 일반 몬스터 104종'))
    .filter((row) => REGION_IDS[row[0]])
    .map(([name, stageRange, mainResources, unlocks, mood]) => ({
      name,
      stageRange,
      mainResources: splitList(mainResources),
      unlocks: splitList(unlocks),
      mood,
    }));

  const monsterRows = tableRows(section(markdown, '## 일반 몬스터 104종', '## 보스 32종'))
    .filter((row) => REGION_IDS[row[0]])
    .flatMap(([region, names]) => splitList(names).map((name) => ({ region, name })));

  const bossRows = tableRows(section(markdown, '## 보스 32종', '## 영웅 50종'))
    .filter((row) => REGION_IDS[row[0]])
    .flatMap(([region, names]) => splitList(names).map((name) => ({ region, name })));

  const heroRows = tableRows(section(markdown, '## 영웅 50종', '## 장비 200종'))
    .filter((row) => /^\d+$/.test(row[0]))
    .map(([number, name, rarity, role, element, skill, nonCombatBonus]) => ({
      number: Number(number),
      name,
      rarity,
      role,
      element,
      skill,
      nonCombatBonus,
    }));

  const equipmentSetRows = tableRows(section(markdown, '## 장비 200종', '## 장비 세트 효과'))
    .filter((row) => /^\d+$/.test(row[0]))
    .map(([number, name, rarity, equipmentNames]) => ({
      number: Number(number),
      name,
      rarity,
      equipmentNames: splitList(equipmentNames),
    }));

  return {
    regions: regionRows,
    monsters: monsterRows,
    bosses: bossRows,
    heroes: heroRows,
    equipmentSets: equipmentSetRows,
  };
}

function buildTables(parsed) {
  const regions = parsed.regions.map((region, index) => ({
    id: REGION_IDS[region.name],
    order: index + 1,
    name: region.name,
    stageRange: region.stageRange,
    mainResources: region.mainResources,
    unlocks: region.unlocks,
    elementTheme: REGION_ELEMENTS[region.name],
    mood: region.mood,
  }));

  const monsters = parsed.monsters.map((monster, index) => ({
    id: `monster_${pad3(index + 1)}`,
    name: monster.name,
    regionId: REGION_IDS[monster.region],
    role: inferCombatRole(monster.name),
    element: REGION_ELEMENTS[monster.region],
    dropTableId: `drop_${REGION_IDS[monster.region]}`,
  }));

  const bosses = parsed.bosses.map((boss, index) => ({
    id: `boss_${pad3(index + 1)}`,
    name: boss.name,
    regionId: REGION_IDS[boss.region],
    pattern: inferBossPattern(boss.name),
    element: REGION_ELEMENTS[boss.region],
    rewardId: `reward_boss_${pad3(index + 1)}`,
  }));

  const heroes = parsed.heroes.map((hero) => ({
    id: `hero_${pad3(hero.number)}`,
    name: hero.name,
    rarity: hero.rarity,
    role: hero.role,
    element: hero.element,
    skillName: hero.skill,
    nonCombatBonus: hero.nonCombatBonus,
  }));

  const equipmentSets = parsed.equipmentSets.map((set) => ({
    id: `equipment_set_${pad3(set.number)}`,
    name: set.name,
    rarity: set.rarity,
  }));

  const equipment = parsed.equipmentSets.flatMap((set) => {
    const setId = `equipment_set_${pad3(set.number)}`;
    return set.equipmentNames.map((name, slotIndex) => ({
      id: `equipment_${pad3((set.number - 1) * EQUIPMENT_SLOTS.length + slotIndex + 1)}`,
      name,
      setId,
      slot: EQUIPMENT_SLOTS[slotIndex],
      rarity: set.rarity,
    }));
  });

  const buildings = BUILDINGS.map(([id, name, productionType], index) => ({
    id,
    order: index + 1,
    name,
    maxLevel: 30,
    productionType,
  }));

  const currencies = CURRENCIES.map(([id, name, type]) => ({ id, name, type }));

  const adPlacements = AD_PLACEMENTS.map(([id, name, dailyLimit, cooldownMinutes, placementScreen, rewardGrantPolicy]) => ({
    id,
    name,
    dailyLimit,
    cooldownMinutes,
    placementScreen,
    rewardGrantPolicy,
    format: 'rewarded',
    isForced: false,
    rewardType: id.replace(/^ad_/, ''),
    adProvider: 'admob',
    adUnitName: ADMOB_ANDROID.rewardedCoreUnitName,
    androidAdMobAppId: ADMOB_ANDROID.appId,
    androidAdMobAdUnitId: ADMOB_ANDROID.rewardedCoreAdUnitId,
  }));

  const shopProducts = SHOP_PRODUCTS.map(([id, name, priceKrw, type]) => ({
    id,
    name,
    priceKrw,
    type,
  }));

  const iapProducts = IAP_PRODUCTS.map(([
    id,
    shopProductId,
    googlePlayProductId,
    appleProductId,
    productType,
    priceKrw,
    fulfillmentPolicy,
    restorePolicy,
  ]) => ({
    id,
    shopProductId,
    googlePlayProductId,
    appleProductId,
    productType,
    priceKrw,
    fulfillmentPolicy,
    restorePolicy,
  }));

  const purchaseValidationRules = PURCHASE_VALIDATION_RULES.map(([id, name, enforcement, policy]) => ({
    id,
    name,
    enforcement,
    policy,
  }));

  const monetizationOfferSurfaces = MONETIZATION_OFFER_SURFACES.map(([id, name, monetizationId, flow, displayRule]) => ({
    id,
    name,
    monetizationId,
    flow,
    displayRule,
  }));

  const monetizationAnalyticsEvents = MONETIZATION_ANALYTICS_EVENTS.map(([id, eventName, category]) => ({
    id,
    eventName,
    category,
  }));

  const retentionHooks = RETENTION_HOOKS.map(([id, name, type, targetMetric, design]) => ({
    id,
    name,
    type,
    targetMetric,
    design,
  }));

  const liveEvents = LIVE_EVENTS.map(([id, name, cadence, targetRegion, design]) => ({
    id,
    name,
    cadence,
    targetRegion,
    design,
    serverDependency: 'remote_config_optional',
  }));

  const storeExperiments = STORE_EXPERIMENTS.map(([id, name, platform, assetType, hypothesis]) => ({
    id,
    name,
    platform,
    assetType,
    hypothesis,
  }));

  const analyticsEvents = ANALYTICS_EVENTS.map(([id, eventName, category]) => ({
    id,
    eventName,
    category,
  }));

  return {
    regions,
    monsters,
    bosses,
    heroes,
    equipmentSets,
    equipment,
    buildings,
    currencies,
    adPlacements,
    shopProducts,
    iapProducts,
    purchaseValidationRules,
    monetizationOfferSurfaces,
    monetizationAnalyticsEvents,
    retentionHooks,
    liveEvents,
    storeExperiments,
    analyticsEvents,
  };
}

function inferCombatRole(name) {
  if (name.includes('슬라임') || name.includes('정령')) return 'caster';
  if (name.includes('해골') || name.includes('갑옷') || name.includes('골렘')) return 'tank';
  if (name.includes('도적') || name.includes('암흑') || name.includes('추적')) return 'assassin';
  if (name.includes('궁수')) return 'ranger';
  return 'fighter';
}

function inferBossPattern(name) {
  if (name.includes('마녀') || name.includes('사제') || name.includes('드루이드')) return 'magic_burst';
  if (name.includes('골렘') || name.includes('거인') || name.includes('수문장')) return 'heavy_guard';
  if (name.includes('전갈') || name.includes('거미') || name.includes('쌍검')) return 'multi_hit';
  if (name.includes('마왕')) return 'final_phase';
  return 'elite_assault';
}

module.exports = {
  parseCatalog,
  buildTables,
  constants: {
    REGION_IDS,
    EQUIPMENT_SLOTS,
    ADMOB_ANDROID,
  },
};
