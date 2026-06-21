const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const rootDir = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
}

function pngSize(relativePath) {
  const buffer = fs.readFileSync(path.join(rootDir, relativePath));
  assert.equal(buffer.toString('ascii', 1, 4), 'PNG', `${relativePath} must be a PNG`);
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

test('android app bundle project uses the production AdMob and Play Billing SDKs', () => {
  const settings = read('settings.gradle.kts');
  const build = read('android-app/build.gradle.kts');
  const manifest = read('android-app/src/main/AndroidManifest.xml');
  const activity = read('android-app/src/main/java/com/hhy0111/lostkingdom/MainActivity.java');

  assert.match(settings, /include\(":android-app"\)/);
  assert.match(build, /namespace = "com\.hhy0111\.lostkingdom"/);
  assert.match(build, /applicationId = "com\.hhy0111\.lostkingdom"/);
  assert.match(build, /compileSdk = 35/);
  assert.match(build, /targetSdk = 35/);
  assert.match(build, /versionCode = 1/);
  assert.match(build, /com\.google\.android\.gms:play-services-ads:25\.0\.0/);
  assert.match(build, /com\.android\.billingclient:billing:9\.1\.0/);
  assert.match(build, /androidx\.webkit:webkit:1\.12\.1/);
  assert.match(build, /tasks\.register<Sync>\("syncWebGameAssets"/);
  assert.match(build, /val maxAndroidArtDimension = 640/);
  assert.match(build, /tasks\.register\("prepareAndroidArtAssets"\)/);
  assert.match(build, /val androidAudioSampleRate = 22050\.0f/);
  assert.match(build, /tasks\.register\("prepareAndroidAudioAssets"\)/);
  assert.match(build, /exclude\("audio\/\*\*"\)/);
  assert.match(build, /tasks\.register\("signReleaseAab"\)/);
  assert.match(build, /from\(rootProject\.layout\.projectDirectory\.dir\("web-game"\)\)/);
  assert.match(build, /rootProject\.layout\.projectDirectory\.dir\("Assets\/Art"\)/);
  assert.match(build, /into\("Art"\)/);

  assert.match(manifest, /android\.permission\.INTERNET/);
  assert.match(manifest, /android\.permission\.ACCESS_NETWORK_STATE/);
  assert.match(manifest, /com\.google\.android\.gms\.ads\.APPLICATION_ID/);
  assert.match(manifest, /ca-app-pub-4402708884038037~5285192241/);

  assert.match(activity, /REWARDED_AD_UNIT_ID = "ca-app-pub-4402708884038037\/6509654325"/);
  assert.match(activity, /MobileAds\.initialize/);
  assert.match(activity, /WebViewAssetLoader/);
  assert.match(activity, /https:\/\/appassets\.androidplatform\.net\/assets\/web-game\/index\.html/);
  assert.match(activity, /\.addPathHandler\("\/Assets\/", new WebViewAssetLoader\.AssetsPathHandler\(this\)\)/);
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
  const activity = read('android-app/src/main/java/com/hhy0111/lostkingdom/MainActivity.java');

  for (const product of products) {
    assert.match(activity, new RegExp(product.id));
    assert.match(activity, new RegExp(product.googlePlayProductId.replace(/\./g, '\\.')));
  }
});

test('android launcher icons use install-safe density assets', () => {
  assert.deepEqual(pngSize('android-app/src/main/res/drawable-nodpi/ic_launcher_foreground.png'), {
    width: 1024,
    height: 1024,
  });

  for (const [density, size] of [
    ['mipmap-mdpi', 48],
    ['mipmap-hdpi', 72],
    ['mipmap-xhdpi', 96],
    ['mipmap-xxhdpi', 144],
    ['mipmap-xxxhdpi', 192],
  ]) {
    assert.deepEqual(pngSize(`android-app/src/main/res/${density}/ic_launcher.png`), { width: size, height: size });
    assert.deepEqual(pngSize(`android-app/src/main/res/${density}/ic_launcher_round.png`), { width: size, height: size });
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
