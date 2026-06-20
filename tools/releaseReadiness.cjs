const fs = require('node:fs');
const path = require('node:path');

const REQUIRED_DOCS = [
  'docs/FINAL_RELEASE_MASTER_PLAN.md',
  'docs/MONETIZATION_PRODUCTION_READINESS.md',
  'docs/privacy-policy.html',
  'docs/superpowers/specs/2026-06-20-final-release-readiness-design.md',
  'docs/superpowers/plans/2026-06-20-final-release-readiness.md',
  'web-game/privacy-policy.html',
];

const REQUIRED_OFFICIAL_REFERENCES = [
  'https://developer.android.com/google/play/billing/integrate',
  'https://developer.android.com/google/play/billing/release-notes',
  'https://support.google.com/googleplay/android-developer/answer/11926878',
  'https://support.google.com/googleplay/android-developer/answer/10787469',
  'https://developer.android.com/google/play/billing/test',
  'https://developer.android.com/google/play/billing/security',
  'https://support.google.com/googleplay/android-developer/answer/10281818',
  'https://support.google.com/googleplay/android-developer/answer/6223646',
  'https://developer.apple.com/app-store/review/guidelines/',
  'https://developer.apple.com/help/app-store-connect/manage-in-app-purchases/create-consumable-or-non-consumable-in-app-purchases/',
  'https://docs.unity.com/en-us/iap/purchases',
  'https://docs.unity.com/en-us/iap/receipt-validation',
  'https://docs.unity.com/en-us/grow/levelplay/platform/settings/capping-pacing',
  'https://docs.unity.com/en-us/grow/levelplay/sdk/unity/rewarded-ad-integration-package',
];

const REQUIRED_ANALYTICS_EVENTS = [
  'ad_reward_offer_shown',
  'ad_reward_offer_clicked',
  'ad_reward_started',
  'ad_reward_completed',
  'ad_reward_failed',
  'ad_reward_granted',
  'ad_reward_limit_reached',
  'ad_reward_cooldown_blocked',
  'iap_product_catalog_loaded',
  'iap_product_catalog_failed',
  'iap_purchase_started',
  'iap_purchase_cancelled',
  'iap_purchase_pending',
  'iap_purchase_completed',
  'iap_purchase_failed',
  'iap_receipt_validation_started',
  'iap_receipt_validation_succeeded',
  'iap_receipt_validation_failed',
  'iap_entitlement_granted',
  'iap_entitlement_duplicate_ignored',
  'iap_restore_started',
  'iap_restore_completed',
  'iap_restore_failed',
  'iap_purchase_restored',
];

const REQUIRED_PURCHASE_RULES = [
  'validation_unity_iap_receipt',
  'validation_google_play_billing',
  'validation_apple_storekit_restore',
  'validation_pending_purchase_queue',
  'validation_idempotent_fulfillment',
  'validation_purchase_restore_button',
];

function readJson(rootDir, relativePath) {
  const filePath = path.join(rootDir, relativePath);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function assertUnique(errors, name, values) {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) {
      errors.push(`${name} has duplicate value: ${value}`);
    }
    seen.add(value);
  }
}

function validateDocs(rootDir, errors) {
  let officialReferenceCount = 0;

  for (const relativePath of REQUIRED_DOCS) {
    const filePath = path.join(rootDir, relativePath);
    if (!fs.existsSync(filePath)) {
      errors.push(`missing release readiness document: ${relativePath}`);
      continue;
    }

    const text = fs.readFileSync(filePath, 'utf8');
    if (/\b(TBD|TODO|FIXME)\b/i.test(text)) {
      errors.push(`${relativePath} contains unfinished placeholder text`);
    }
    if (relativePath === 'web-game/privacy-policy.html') {
      if (!text.includes('Lost Kingdom')) {
        errors.push(`${relativePath} must name the app`);
      }
      if (!text.includes('young02hwi@gmail.com')) {
        errors.push(`${relativePath} must include the privacy contact email`);
      }
      if (!text.includes('개인정보처리방침')) {
        errors.push(`${relativePath} must be clearly labeled as a privacy policy`);
      }
    }
    for (const reference of REQUIRED_OFFICIAL_REFERENCES) {
      if (text.includes(reference)) {
        officialReferenceCount += 1;
      }
    }
  }

  return officialReferenceCount;
}

function validateIapProducts(products, errors) {
  assertUnique(errors, 'iap product ids', products.map((product) => product.id));
  assertUnique(errors, 'google play product ids', products.map((product) => product.googlePlayProductId));
  assertUnique(errors, 'apple product ids', products.map((product) => product.appleProductId));

  for (const product of products) {
    if (!/^iap_/.test(product.id)) {
      errors.push(`${product.id} must use the iap_ prefix`);
    }
    if (!/^lostkingdom\.[a-z0-9_]+$/.test(product.googlePlayProductId)) {
      errors.push(`${product.id} has invalid Google Play product id: ${product.googlePlayProductId}`);
    }
    if (!/^com\.lostkingdom\.[a-z0-9]+$/.test(product.appleProductId)) {
      errors.push(`${product.id} has invalid Apple product id: ${product.appleProductId}`);
    }
    if (!Number.isInteger(product.priceKrw) || product.priceKrw <= 0) {
      errors.push(`${product.id} must have a positive KRW price`);
    }
    if (!product.fulfillmentPolicy) {
      errors.push(`${product.id} must define fulfillmentPolicy`);
    }
    if (!product.restorePolicy) {
      errors.push(`${product.id} must define restorePolicy`);
    }
    if (product.productType === 'consumable' && product.restorePolicy !== 'not_restorable_consumable') {
      errors.push(`${product.id} consumable products must not use restore entitlement policy`);
    }
    if (product.productType === 'non_consumable' && product.restorePolicy !== 'restore_non_consumable') {
      errors.push(`${product.id} non-consumable products must restore`);
    }
    if (product.productType === 'subscription' && product.restorePolicy !== 'restore_subscription_state') {
      errors.push(`${product.id} subscriptions must restore subscription state`);
    }
    if (product.productType === 'season_pass' && product.restorePolicy !== 'restore_current_season_entitlement') {
      errors.push(`${product.id} season pass must restore the current season entitlement`);
    }
  }
}

function validateAdPlacements(placements, errors) {
  assertUnique(errors, 'ad placement ids', placements.map((placement) => placement.id));

  for (const placement of placements) {
    if (!/^ad_/.test(placement.id)) {
      errors.push(`${placement.id} must use the ad_ prefix`);
    }
    if (placement.format !== 'rewarded') {
      errors.push(`${placement.id} must be rewarded format`);
    }
    if (placement.isForced !== false) {
      errors.push(`${placement.id} must never be forced`);
    }
    if (!Number.isInteger(placement.dailyLimit) || placement.dailyLimit < 1) {
      errors.push(`${placement.id} must have a positive dailyLimit`);
    }
    if (!Number.isInteger(placement.cooldownMinutes) || placement.cooldownMinutes < 0) {
      errors.push(`${placement.id} must have a non-negative cooldownMinutes`);
    }
    if (!placement.placementScreen) {
      errors.push(`${placement.id} must define placementScreen`);
    }
    if (!placement.rewardGrantPolicy || !placement.rewardGrantPolicy.includes('completed_view')) {
      errors.push(`${placement.id} must grant only after completed rewarded view`);
    }
  }
}

function validateIdSet(records, requiredIds, label, errors) {
  const ids = new Set(records.map((record) => record.id));
  for (const id of requiredIds) {
    if (!ids.has(id)) {
      errors.push(`${label} missing ${id}`);
    }
  }
}

function validateEventSet(records, requiredEvents, errors) {
  const eventNames = new Set(records.map((record) => record.eventName));
  for (const eventName of requiredEvents) {
    if (!eventNames.has(eventName)) {
      errors.push(`monetization analytics missing ${eventName}`);
    }
  }
}

function validateReleaseReadiness(rootDir) {
  const errors = [];
  const docsReferenceCount = validateDocs(rootDir, errors);

  const iapProducts = readJson(rootDir, 'Assets/Data/Tables/iap_products.json');
  const adPlacements = readJson(rootDir, 'Assets/Data/Tables/ad_placements.json');
  const purchaseRules = readJson(rootDir, 'Assets/Data/Tables/purchase_validation_rules.json');
  const monetizationEvents = readJson(rootDir, 'Assets/Data/Tables/monetization_analytics_events.json');

  validateIapProducts(iapProducts, errors);
  validateAdPlacements(adPlacements, errors);
  validateIdSet(purchaseRules, REQUIRED_PURCHASE_RULES, 'purchase validation rules', errors);
  validateEventSet(monetizationEvents, REQUIRED_ANALYTICS_EVENTS, errors);

  return {
    ok: errors.length === 0,
    errors,
    summary: {
      platforms: ['app_store', 'google_play'],
      requiredDocs: REQUIRED_DOCS.length,
      officialReferenceCount: docsReferenceCount,
      iapProducts: iapProducts.length,
      rewardedAdPlacements: adPlacements.length,
    },
  };
}

module.exports = {
  validateReleaseReadiness,
};
