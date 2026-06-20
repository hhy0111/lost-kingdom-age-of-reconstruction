const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const rootDir = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
}

test('android app bundle project uses the production AdMob and Play Billing SDKs', () => {
  const settings = read('settings.gradle.kts');
  const build = read('android-app/build.gradle.kts');
  const manifest = read('android-app/src/main/AndroidManifest.xml');
  const activity = read('android-app/src/main/java/com/lostkingdom/reconstruction/MainActivity.java');

  assert.match(settings, /include\(":android-app"\)/);
  assert.match(build, /namespace = "com\.lostkingdom\.reconstruction"/);
  assert.match(build, /applicationId = "com\.lostkingdom\.reconstruction"/);
  assert.match(build, /compileSdk = 35/);
  assert.match(build, /targetSdk = 35/);
  assert.match(build, /versionCode = 1/);
  assert.match(build, /com\.google\.android\.gms:play-services-ads:25\.0\.0/);
  assert.match(build, /com\.android\.billingclient:billing:9\.1\.0/);
  assert.match(build, /tasks\.register<Copy>\("syncWebGameAssets"/);
  assert.match(build, /tasks\.register\("signReleaseAab"\)/);
  assert.match(build, /from\(rootProject\.layout\.projectDirectory\.dir\("web-game"\)\)/);

  assert.match(manifest, /android\.permission\.INTERNET/);
  assert.match(manifest, /android\.permission\.ACCESS_NETWORK_STATE/);
  assert.match(manifest, /com\.google\.android\.gms\.ads\.APPLICATION_ID/);
  assert.match(manifest, /ca-app-pub-4402708884038037~5285192241/);

  assert.match(activity, /REWARDED_AD_UNIT_ID = "ca-app-pub-4402708884038037\/6509654325"/);
  assert.match(activity, /MobileAds\.initialize/);
  assert.match(activity, /RewardedAd\.load/);
  assert.match(activity, /OnUserEarnedRewardListener/);
  assert.match(activity, /notifyRewardedResult\(requestId, placementId, true/);
  assert.match(activity, /BillingClient\.newBuilder/);
  assert.match(activity, /PendingPurchasesParams\.newBuilder\(\)\.enableOneTimeProducts\(\)\.build\(\)/);
  assert.match(activity, /queryProductDetailsAsync/);
  assert.match(activity, /launchBillingFlow/);
  assert.match(activity, /consumeAsync/);
  assert.match(activity, /acknowledgePurchase/);
  assert.match(activity, /queryPurchasesAsync/);
});

test('android purchase bridge covers every Google Play product id in the catalog', () => {
  const products = JSON.parse(read('Assets/Data/Tables/iap_products.json'));
  const activity = read('android-app/src/main/java/com/lostkingdom/reconstruction/MainActivity.java');

  for (const product of products) {
    assert.match(activity, new RegExp(product.id));
    assert.match(activity, new RegExp(product.googlePlayProductId.replace(/\./g, '\\.')));
  }
});

test('web game requests native monetization before granting ad or purchase value', () => {
  const app = read('web-game/app.js');

  assert.match(app, /function requestNativeRewardedAd\(placementId\)/);
  assert.match(app, /window\.LostKingdomAds\.showRewardedAd/);
  assert.match(app, /window\.onLostKingdomRewardedAdResult/);
  assert.match(app, /async function claimRewardedAd/);
  assert.match(app, /await requestNativeRewardedAd\(placementId\)/);
  assert.match(app, /Runtime\.claimAdReward\(state, data, placementId, now\)/);

  assert.match(app, /function requestNativePurchase\(productId\)/);
  assert.match(app, /window\.LostKingdomBilling\.purchaseProduct/);
  assert.match(app, /window\.onLostKingdomPurchaseResult/);
  assert.match(app, /async function completeStorePurchase/);
  assert.match(app, /await requestNativePurchase\(productId\)/);
  assert.match(app, /Runtime\.mockPurchase\(state, data, productId, now\)/);
});
