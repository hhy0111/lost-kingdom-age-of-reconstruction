const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const { parseCatalog, buildTables } = require('../tools/catalogData.cjs');

const rootDir = path.resolve(__dirname, '..');
const catalogPath = path.join(rootDir, 'docs', 'CONTENT_CATALOG.md');
const catalogMarkdown = fs.readFileSync(catalogPath, 'utf8');

function tables() {
  return buildTables(parseCatalog(catalogMarkdown));
}

test('ad placements are reward-only and include capping and pacing fields', () => {
  const { adPlacements } = tables();

  assert.equal(adPlacements.length, 10);

  for (const placement of adPlacements) {
    assert.equal(placement.format, 'rewarded');
    assert.equal(placement.isForced, false);
    assert.ok(placement.dailyLimit >= 1);
    assert.ok(placement.cooldownMinutes >= 0);
    assert.ok(placement.placementScreen.length > 0);
    assert.ok(placement.rewardGrantPolicy.length > 0);
  }
});

test('rewarded ad placements use the production AdMob rewarded unit', () => {
  const { adPlacements } = tables();

  for (const placement of adPlacements) {
    assert.equal(placement.adProvider, 'admob');
    assert.equal(placement.adUnitName, 'rewarded_core');
    assert.equal(placement.androidAdMobAppId, 'ca-app-pub-4402708884038037~5285192241');
    assert.equal(placement.androidAdMobAdUnitId, 'ca-app-pub-4402708884038037/6509654325');
  }
});

test('iap product catalog contains store ids and fulfillment policies', () => {
  const { iapProducts } = tables();

  assert.equal(iapProducts.length, 7);
  assert.ok(iapProducts.some((product) => product.id === 'iap_remove_ads' && product.productType === 'non_consumable'));
  assert.ok(iapProducts.some((product) => product.id === 'iap_monthly_subscription' && product.productType === 'subscription'));
  assert.ok(iapProducts.some((product) => product.id === 'iap_kingdom_pass' && product.productType === 'season_pass'));

  for (const product of iapProducts) {
    assert.match(product.googlePlayProductId, /^lostkingdom\./);
    assert.match(product.appleProductId, /^com\.lostkingdom\./);
    assert.ok(product.fulfillmentPolicy.length > 0);
    assert.ok(product.restorePolicy.length > 0);
  }
});

test('purchase validation rules cover receipt validation, restore, and pending purchases', () => {
  const { purchaseValidationRules } = tables();
  const ids = new Set(purchaseValidationRules.map((rule) => rule.id));

  assert.equal(purchaseValidationRules.length, 6);
  assert.ok(ids.has('validation_unity_iap_receipt'));
  assert.ok(ids.has('validation_google_play_billing'));
  assert.ok(ids.has('validation_apple_storekit_restore'));
  assert.ok(ids.has('validation_pending_purchase_queue'));
  assert.ok(ids.has('validation_idempotent_fulfillment'));
  assert.ok(ids.has('validation_purchase_restore_button'));
});

test('offer surfaces and monetization analytics are ready for tuning', () => {
  const { monetizationOfferSurfaces, monetizationAnalyticsEvents } = tables();

  assert.equal(monetizationOfferSurfaces.length, 9);
  assert.equal(monetizationAnalyticsEvents.length, 30);

  const surfaceIds = new Set(monetizationOfferSurfaces.map((surface) => surface.id));
  const eventNames = new Set(monetizationAnalyticsEvents.map((event) => event.eventName));

  assert.ok(surfaceIds.has('surface_offline_reward_popup'));
  assert.ok(surfaceIds.has('surface_ad_remove_package'));
  assert.ok(surfaceIds.has('surface_kingdom_pass'));

  assert.ok(eventNames.has('ad_reward_offer_shown'));
  assert.ok(eventNames.has('ad_reward_granted'));
  assert.ok(eventNames.has('iap_purchase_started'));
  assert.ok(eventNames.has('iap_receipt_validation_failed'));
  assert.ok(eventNames.has('iap_purchase_restored'));
});
