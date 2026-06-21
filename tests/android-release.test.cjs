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
  const strings = read('android-app/src/main/res/values/strings.xml');
  const styles = read('android-app/src/main/res/values/styles.xml');
  const splashStyles = read('android-app/src/main/res/values-v31/styles.xml');

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
  assert.match(styles, /android:windowBackground">@color\/app_splash_background/);
  assert.match(splashStyles, /android:windowSplashScreenBackground">@color\/app_splash_background/);
  assert.match(splashStyles, /android:windowSplashScreenAnimatedIcon">@mipmap\/ic_launcher/);
  assert.match(strings, /name="app_launch_title">왕국 재건 준비 중/);
  assert.match(strings, /name="app_launch_message">전투 기록과 사운드 자원을 준비/);

  assert.match(activity, /REWARDED_AD_UNIT_ID = "ca-app-pub-4402708884038037\/6509654325"/);
  assert.match(activity, /MobileAds\.initialize/);
  assert.match(activity, /import android\.widget\.LinearLayout;/);
  assert.match(activity, /import android\.widget\.TextView;/);
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
  assert.match(activity, /FrameLayout createLaunchRoot\(\)/);
  assert.match(activity, /setText\(R\.string\.app_launch_title\)/);
  assert.match(activity, /setText\(R\.string\.app_launch_message\)/);
  assert.match(activity, /void attachWebView\(FrameLayout root\)/);
  assert.match(activity, /void showGameSurface\(\)/);
  assert.match(activity, /root\.postDelayed\(\(\) -> attachWebView\(root\), 6500\)/);
  assert.doesNotMatch(activity, /root\.postDelayed\(\(\) -> attachWebView\(root\), 1000\)/);
  assert.match(activity, /onPageFinished/);
  assert.match(activity, /webView\.setBackgroundColor\(getColor\(R\.color\.app_splash_background\)\)/);
  assert.doesNotMatch(activity, /showGameSurface\(\), 6000/);
  assert.match(activity, /showGameSurface\(\), 45000/);
  assert.match(activity, /void ensureAdsInitialized\(\)/);
  assert.match(activity, /void ensureBillingInitialized\(\)/);
  assert.doesNotMatch(activity, /postDelayed\(\(\) -> startNativeMonetization/);

  const firstContentIndex = activity.indexOf('setContentView(root);');
  const createWebViewIndex = activity.indexOf('new WebView(this);');
  const loadGameIndex = activity.indexOf('webView.loadUrl(GAME_URL);');
  const showRewardedIndex = activity.indexOf('private void showRewardedAd');
  const adsInitializeIndex = activity.indexOf('ensureAdsInitialized();', showRewardedIndex);
  const adShowIndex = activity.indexOf('if (rewardedAd == null)', showRewardedIndex);
  const startPurchaseIndex = activity.indexOf('private void startPurchase');
  const billingInitializeIndex = activity.indexOf('ensureBillingInitialized();', startPurchaseIndex);
  const billingReadyIndex = activity.indexOf('runWhenBillingReady(', startPurchaseIndex);
  assert.ok(firstContentIndex !== -1, 'native launch content must be attached before WebView creation');
  assert.ok(createWebViewIndex !== -1, 'WebView creation must exist');
  assert.ok(firstContentIndex < createWebViewIndex, 'native launch content must draw before WebView engine creation');
  assert.ok(loadGameIndex !== -1, 'game load call must exist');
  assert.ok(showRewardedIndex !== -1, 'rewarded ad bridge method must exist');
  assert.ok(adsInitializeIndex !== -1, 'ads must be initialized lazily from the ad bridge');
  assert.ok(adShowIndex !== -1, 'rewarded ad readiness check must exist');
  assert.ok(adsInitializeIndex < adShowIndex, 'ad SDK initialization must happen before ad readiness is checked');
  assert.ok(startPurchaseIndex !== -1, 'purchase bridge method must exist');
  assert.ok(billingInitializeIndex !== -1, 'billing must be initialized lazily from purchase and restore flows');
  assert.ok(billingReadyIndex !== -1, 'billing readiness check must exist');
  assert.ok(billingInitializeIndex < billingReadyIndex, 'billing client must be created before billing readiness is checked');
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
