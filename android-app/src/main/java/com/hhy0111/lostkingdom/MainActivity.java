package com.hhy0111.lostkingdom;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.pm.ApplicationInfo;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.ImageView;

import androidx.webkit.WebViewAssetLoader;

import com.android.billingclient.api.AcknowledgePurchaseParams;
import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.BillingClientStateListener;
import com.android.billingclient.api.BillingFlowParams;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.ConsumeParams;
import com.android.billingclient.api.PendingPurchasesParams;
import com.android.billingclient.api.ProductDetails;
import com.android.billingclient.api.Purchase;
import com.android.billingclient.api.QueryProductDetailsParams;
import com.android.billingclient.api.QueryPurchasesParams;
import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.OnUserEarnedRewardListener;
import com.google.android.gms.ads.rewarded.RewardedAd;
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback;
import com.google.android.gms.ads.rewarded.ServerSideVerificationOptions;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

public final class MainActivity extends Activity {
    private static final String TAG = "LostKingdom";
    private static final String GAME_URL = "https://appassets.androidplatform.net/assets/web-game/index.html";
    private static final String REWARDED_AD_UNIT_ID = "ca-app-pub-4402708884038037/6509654325";

    private static final Map<String, ProductConfig> PRODUCTS_BY_INTERNAL_ID = buildProductConfigs();
    private static final Map<String, ProductConfig> PRODUCTS_BY_GOOGLE_ID = indexProductConfigs(PRODUCTS_BY_INTERNAL_ID);

    private WebView webView;
    private FrameLayout rootView;
    private View launchOverlay;
    private RewardedAd rewardedAd;
    private boolean rewardedAdLoading;
    private boolean adsInitialized;
    private BillingClient billingClient;
    private boolean billingConnecting;
    private PurchaseRequest activePurchaseRequest;
    private final List<BillingAction> pendingBillingActions = new ArrayList<>();

    @Override
    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        FrameLayout root = createLaunchRoot();
        rootView = root;
        setContentView(root);
        root.postDelayed(() -> attachWebView(root), 1000);
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (billingClient != null && !billingClient.isReady()) {
            connectBilling();
        }
        if (adsInitialized) {
            loadRewardedAd();
        }
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.destroy();
            webView = null;
        }
        launchOverlay = null;
        rootView = null;
        if (billingClient != null) {
            billingClient.endConnection();
            billingClient = null;
        }
        adsInitialized = false;
        super.onDestroy();
    }

    private FrameLayout createLaunchRoot() {
        FrameLayout root = new FrameLayout(this);
        root.setLayoutParams(new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
        ));
        root.setBackgroundColor(getColor(R.color.app_splash_background));

        FrameLayout overlay = new FrameLayout(this);
        overlay.setBackgroundColor(getColor(R.color.app_splash_background));
        ImageView logo = new ImageView(this);
        logo.setImageResource(R.mipmap.ic_launcher);
        logo.setScaleType(ImageView.ScaleType.FIT_CENTER);
        int logoSize = dp(156);
        FrameLayout.LayoutParams logoParams = new FrameLayout.LayoutParams(logoSize, logoSize, Gravity.CENTER);
        overlay.addView(logo, logoParams);
        root.addView(overlay, new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
        ));
        launchOverlay = overlay;
        return root;
    }

    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    private void attachWebView(FrameLayout root) {
        if (webView != null) {
            return;
        }

        webView = new WebView(this);
        webView.setAlpha(0f);
        webView.setBackgroundColor(getColor(R.color.app_splash_background));
        webView.setLayoutParams(new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
        ));
        configureWebView(webView);
        webView.addJavascriptInterface(new AdsBridge(), "LostKingdomAds");
        webView.addJavascriptInterface(new BillingBridge(), "LostKingdomBilling");
        root.addView(webView, 0);

        webView.loadUrl(GAME_URL);
        webView.postDelayed(() -> showGameSurface(), 45000);
    }

    private void showGameSurface() {
        if (webView != null) {
            webView.animate().alpha(1f).setDuration(180).start();
        }

        View overlay = launchOverlay;
        if (overlay == null) {
            return;
        }
        launchOverlay = null;
        overlay.animate()
                .alpha(0f)
                .setDuration(180)
                .withEndAction(() -> {
                    if (rootView != null) {
                        rootView.removeView(overlay);
                    }
                })
                .start();
    }

    private int dp(int value) {
        return Math.round(value * getResources().getDisplayMetrics().density);
    }

    @SuppressLint("SetJavaScriptEnabled")
    private void configureWebView(WebView view) {
        if ((getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0) {
            WebView.setWebContentsDebuggingEnabled(true);
        }
        WebSettings settings = view.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setAllowFileAccess(false);
        settings.setAllowFileAccessFromFileURLs(false);
        settings.setAllowUniversalAccessFromFileURLs(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);

        WebViewAssetLoader assetLoader = new WebViewAssetLoader.Builder()
                .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this))
                .addPathHandler("/Assets/", new WebViewAssetLoader.AssetsPathHandler(this))
                .build();
        view.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView webView, WebResourceRequest request) {
                return assetLoader.shouldInterceptRequest(request.getUrl());
            }

            @Override
            public void onPageFinished(WebView webView, String url) {
                showGameSurface();
            }
        });
    }

    private void ensureAdsInitialized() {
        if (adsInitialized) {
            loadRewardedAd();
            return;
        }
        adsInitialized = true;
        MobileAds.initialize(this, initializationStatus -> loadRewardedAd());
    }

    private void loadRewardedAd() {
        if (!adsInitialized || rewardedAd != null || rewardedAdLoading) {
            return;
        }
        rewardedAdLoading = true;
        RewardedAd.load(
                this,
                REWARDED_AD_UNIT_ID,
                new AdRequest.Builder().build(),
                new RewardedAdLoadCallback() {
                    @Override
                    public void onAdLoaded(RewardedAd ad) {
                        rewardedAdLoading = false;
                        rewardedAd = ad;
                        Log.d(TAG, "Rewarded ad loaded.");
                    }

                    @Override
                    public void onAdFailedToLoad(LoadAdError error) {
                        rewardedAdLoading = false;
                        rewardedAd = null;
                        Log.w(TAG, "Rewarded ad failed to load: " + error.getMessage());
                    }
                }
        );
    }

    private void showRewardedAd(String placementId, String requestId) {
        ensureAdsInitialized();
        if (rewardedAd == null) {
            notifyRewardedResult(requestId, placementId, false, "not_ready", "Rewarded ad is not ready yet.");
            return;
        }

        RewardedAd adToShow = rewardedAd;
        rewardedAd = null;
        final boolean[] earned = {false};
        adToShow.setServerSideVerificationOptions(
                new ServerSideVerificationOptions.Builder().setCustomData(placementId).build()
        );
        adToShow.setFullScreenContentCallback(new FullScreenContentCallback() {
            @Override
            public void onAdDismissedFullScreenContent() {
                if (!earned[0]) {
                    notifyRewardedResult(requestId, placementId, false, "closed", "Rewarded ad was closed before reward.");
                }
                loadRewardedAd();
            }

            @Override
            public void onAdFailedToShowFullScreenContent(AdError adError) {
                notifyRewardedResult(requestId, placementId, false, "show_failed", adError.getMessage());
                loadRewardedAd();
            }
        });

        adToShow.show(this, (OnUserEarnedRewardListener) rewardItem -> {
            earned[0] = true;
            notifyRewardedResult(requestId, placementId, true, "earned", rewardItem.getType());
        });
    }

    private void notifyRewardedResult(String requestId, String placementId, boolean success, String status, String message) {
        JSONObject payload = new JSONObject();
        try {
            payload.put("requestId", requestId);
            payload.put("placementId", placementId);
            payload.put("success", success);
            payload.put("status", status);
            payload.put("message", message);
        } catch (JSONException error) {
            Log.w(TAG, "Reward payload failed.", error);
        }
        callJavaScript("window.onLostKingdomRewardedAdResult", payload);
    }

    private void ensureBillingInitialized() {
        if (billingClient != null) {
            return;
        }
        billingClient = BillingClient.newBuilder(this)
                .setListener(this::onPurchasesUpdated)
                .enablePendingPurchases(PendingPurchasesParams.newBuilder().enableOneTimeProducts().build())
                .build();
        connectBilling();
    }

    private void connectBilling() {
        runWhenBillingReady(() -> {
            queryExistingPurchases(BillingClient.ProductType.INAPP);
            queryExistingPurchases(BillingClient.ProductType.SUBS);
        }, () -> Log.w(TAG, "Billing setup failed."));
    }

    private void runWhenBillingReady(Runnable onReady, Runnable onFailure) {
        if (billingClient == null) {
            onFailure.run();
            return;
        }
        if (billingClient.isReady()) {
            onReady.run();
            return;
        }
        pendingBillingActions.add(new BillingAction(onReady, onFailure));
        if (billingConnecting) {
            return;
        }
        billingConnecting = true;
        billingClient.startConnection(new BillingClientStateListener() {
            @Override
            public void onBillingSetupFinished(BillingResult billingResult) {
                billingConnecting = false;
                List<BillingAction> actions = new ArrayList<>(pendingBillingActions);
                pendingBillingActions.clear();
                if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                    for (BillingAction action : actions) {
                        action.onReady.run();
                    }
                } else {
                    Log.w(TAG, "Billing setup failed: " + billingResult.getDebugMessage());
                    for (BillingAction action : actions) {
                        action.onFailure.run();
                    }
                }
            }

            @Override
            public void onBillingServiceDisconnected() {
                billingConnecting = false;
            }
        });
    }

    private void startPurchase(String productId, String requestId) {
        ProductConfig config = PRODUCTS_BY_INTERNAL_ID.get(productId);
        if (config == null) {
            notifyPurchaseResult(requestId, productId, false, "unknown_product", "Unknown product.", null);
            return;
        }
        ensureBillingInitialized();
        runWhenBillingReady(
                () -> queryAndLaunchBillingFlow(config, requestId),
                () -> notifyPurchaseResult(requestId, productId, false, "billing_unavailable", "Google Play Billing is unavailable.", null)
        );
    }

    private void queryAndLaunchBillingFlow(ProductConfig config, String requestId) {
        QueryProductDetailsParams.Product product = QueryProductDetailsParams.Product.newBuilder()
                .setProductId(config.googlePlayProductId)
                .setProductType(config.billingProductType)
                .build();
        QueryProductDetailsParams params = QueryProductDetailsParams.newBuilder()
                .setProductList(Collections.singletonList(product))
                .build();

        billingClient.queryProductDetailsAsync(params, (billingResult, productDetailsResult) -> {
            if (billingResult.getResponseCode() != BillingClient.BillingResponseCode.OK) {
                notifyPurchaseResult(requestId, config.internalId, false, "query_failed", billingResult.getDebugMessage(), null);
                return;
            }
            List<ProductDetails> detailsList = productDetailsResult.getProductDetailsList();
            if (detailsList == null || detailsList.isEmpty()) {
                notifyPurchaseResult(requestId, config.internalId, false, "product_unavailable", "Product is not active in Google Play Console.", null);
                return;
            }

            ProductDetails details = detailsList.get(0);
            BillingFlowParams.ProductDetailsParams.Builder detailsParams =
                    BillingFlowParams.ProductDetailsParams.newBuilder().setProductDetails(details);
            if (BillingClient.ProductType.SUBS.equals(config.billingProductType)) {
                List<ProductDetails.SubscriptionOfferDetails> offers = details.getSubscriptionOfferDetails();
                if (offers == null || offers.isEmpty()) {
                    notifyPurchaseResult(requestId, config.internalId, false, "subscription_offer_unavailable", "Subscription base plan is not active.", null);
                    return;
                }
                detailsParams.setOfferToken(offers.get(0).getOfferToken());
            }

            activePurchaseRequest = new PurchaseRequest(requestId, config);
            BillingFlowParams flowParams = BillingFlowParams.newBuilder()
                    .setProductDetailsParamsList(Collections.singletonList(detailsParams.build()))
                    .build();
            BillingResult launchResult = billingClient.launchBillingFlow(this, flowParams);
            if (launchResult.getResponseCode() != BillingClient.BillingResponseCode.OK) {
                activePurchaseRequest = null;
                notifyPurchaseResult(requestId, config.internalId, false, "launch_failed", launchResult.getDebugMessage(), null);
            }
        });
    }

    private void onPurchasesUpdated(BillingResult billingResult, List<Purchase> purchases) {
        if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK && purchases != null) {
            for (Purchase purchase : purchases) {
                processPurchase(purchase, false);
            }
            return;
        }

        PurchaseRequest request = activePurchaseRequest;
        activePurchaseRequest = null;
        if (request == null) {
            return;
        }
        String status = billingResult.getResponseCode() == BillingClient.BillingResponseCode.USER_CANCELED
                ? "cancelled"
                : "purchase_failed";
        notifyPurchaseResult(request.requestId, request.config.internalId, false, status, billingResult.getDebugMessage(), null);
    }

    private void queryExistingPurchases(String billingProductType) {
        QueryPurchasesParams params = QueryPurchasesParams.newBuilder()
                .setProductType(billingProductType)
                .build();
        billingClient.queryPurchasesAsync(params, (billingResult, purchases) -> {
            if (billingResult.getResponseCode() != BillingClient.BillingResponseCode.OK || purchases == null) {
                return;
            }
            for (Purchase purchase : purchases) {
                processPurchase(purchase, true);
            }
        });
    }

    private void restorePurchases(String requestId) {
        ensureBillingInitialized();
        runWhenBillingReady(
                () -> queryRestorableProducts(requestId),
                () -> notifyRestoreResult(requestId, false, "billing_unavailable", Collections.emptyList())
        );
    }

    private void queryRestorableProducts(String requestId) {
        List<String> restoredProductIds = new ArrayList<>();
        queryRestorableProductsForType(BillingClient.ProductType.INAPP, restoredProductIds, () ->
                queryRestorableProductsForType(BillingClient.ProductType.SUBS, restoredProductIds, () ->
                        notifyRestoreResult(requestId, true, "ok", restoredProductIds)
                )
        );
    }

    private void queryRestorableProductsForType(String billingProductType, List<String> restoredProductIds, Runnable onComplete) {
        QueryPurchasesParams params = QueryPurchasesParams.newBuilder()
                .setProductType(billingProductType)
                .build();
        billingClient.queryPurchasesAsync(params, (billingResult, purchases) -> {
            if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK && purchases != null) {
                for (Purchase purchase : purchases) {
                    if (purchase.getPurchaseState() != Purchase.PurchaseState.PURCHASED) {
                        continue;
                    }
                    for (String googleProductId : purchase.getProducts()) {
                        ProductConfig config = PRODUCTS_BY_GOOGLE_ID.get(googleProductId);
                        if (config != null && config.restorable && !restoredProductIds.contains(config.internalId)) {
                            restoredProductIds.add(config.internalId);
                        }
                    }
                    processPurchase(purchase, true);
                }
            }
            onComplete.run();
        });
    }

    private void processPurchase(Purchase purchase, boolean restored) {
        for (String googleProductId : purchase.getProducts()) {
            ProductConfig config = PRODUCTS_BY_GOOGLE_ID.get(googleProductId);
            if (config == null) {
                continue;
            }
            String requestId = activePurchaseRequest != null
                    && activePurchaseRequest.config.googlePlayProductId.equals(config.googlePlayProductId)
                    ? activePurchaseRequest.requestId
                    : "";

            if (purchase.getPurchaseState() == Purchase.PurchaseState.PENDING) {
                notifyPurchaseResult(requestId, config.internalId, false, "pending", "Purchase is pending.", purchase);
                continue;
            }
            if (purchase.getPurchaseState() != Purchase.PurchaseState.PURCHASED) {
                notifyPurchaseResult(requestId, config.internalId, false, "not_purchased", "Purchase was not completed.", purchase);
                continue;
            }

            if (config.consumable) {
                consumePurchase(requestId, config, purchase);
            } else {
                acknowledgePurchase(requestId, config, purchase, restored);
            }
        }
    }

    private void consumePurchase(String requestId, ProductConfig config, Purchase purchase) {
        ConsumeParams params = ConsumeParams.newBuilder()
                .setPurchaseToken(purchase.getPurchaseToken())
                .build();
        billingClient.consumeAsync(params, (billingResult, purchaseToken) -> {
            if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                notifyPurchaseResult(requestId, config.internalId, true, "consumed", "Purchase consumed.", purchase);
            } else {
                notifyPurchaseResult(requestId, config.internalId, false, "consume_failed", billingResult.getDebugMessage(), purchase);
            }
        });
    }

    private void acknowledgePurchase(String requestId, ProductConfig config, Purchase purchase, boolean restored) {
        if (purchase.isAcknowledged()) {
            notifyPurchaseResult(requestId, config.internalId, true, restored ? "restored" : "acknowledged", "Purchase acknowledged.", purchase);
            return;
        }
        AcknowledgePurchaseParams params = AcknowledgePurchaseParams.newBuilder()
                .setPurchaseToken(purchase.getPurchaseToken())
                .build();
        billingClient.acknowledgePurchase(params, billingResult -> {
            if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                notifyPurchaseResult(requestId, config.internalId, true, "acknowledged", "Purchase acknowledged.", purchase);
            } else {
                notifyPurchaseResult(requestId, config.internalId, false, "acknowledge_failed", billingResult.getDebugMessage(), purchase);
            }
        });
    }

    private void notifyPurchaseResult(String requestId, String productId, boolean success, String status, String message, Purchase purchase) {
        if (requestId == null || requestId.isEmpty()) {
            return;
        }
        JSONObject payload = new JSONObject();
        try {
            payload.put("requestId", requestId);
            payload.put("productId", productId);
            payload.put("success", success);
            payload.put("status", status);
            payload.put("message", message);
            if (purchase != null) {
                payload.put("transactionId", transactionIdForPurchase(purchase));
                payload.put("quantity", purchase.getQuantity());
            }
        } catch (JSONException error) {
            Log.w(TAG, "Purchase payload failed.", error);
        }
        callJavaScript("window.onLostKingdomPurchaseResult", payload);
        if (activePurchaseRequest != null && requestId.equals(activePurchaseRequest.requestId)) {
            activePurchaseRequest = null;
        }
    }

    private void notifyRestoreResult(String requestId, boolean success, String status, List<String> restoredProductIds) {
        JSONObject payload = new JSONObject();
        try {
            payload.put("requestId", requestId);
            payload.put("success", success);
            payload.put("status", status);
            payload.put("restoredProductIds", new JSONArray(restoredProductIds));
        } catch (JSONException error) {
            Log.w(TAG, "Restore payload failed.", error);
        }
        callJavaScript("window.onLostKingdomRestoreResult", payload);
    }

    private String transactionIdForPurchase(Purchase purchase) {
        if (purchase.getOrderId() != null && !purchase.getOrderId().isEmpty()) {
            return purchase.getOrderId();
        }
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(purchase.getPurchaseToken().getBytes(StandardCharsets.UTF_8));
            StringBuilder builder = new StringBuilder("token_");
            for (int index = 0; index < 12 && index < hash.length; index += 1) {
                builder.append(String.format(Locale.US, "%02x", hash[index]));
            }
            return builder.toString();
        } catch (NoSuchAlgorithmException error) {
            return "token_" + Math.abs(purchase.getPurchaseToken().hashCode());
        }
    }

    private void callJavaScript(String functionName, JSONObject payload) {
        if (webView == null) {
            return;
        }
        String script = functionName + " && " + functionName + "(" + JSONObject.quote(payload.toString()) + ");";
        webView.post(() -> webView.evaluateJavascript(script, null));
    }

    public final class AdsBridge {
        @JavascriptInterface
        public void showRewardedAd(String placementId, String requestId) {
            runOnUiThread(() -> MainActivity.this.showRewardedAd(placementId, requestId));
        }
    }

    public final class BillingBridge {
        @JavascriptInterface
        public void purchaseProduct(String productId, String requestId) {
            runOnUiThread(() -> MainActivity.this.startPurchase(productId, requestId));
        }

        @JavascriptInterface
        public void restorePurchases(String requestId) {
            runOnUiThread(() -> MainActivity.this.restorePurchases(requestId));
        }
    }

    private static Map<String, ProductConfig> buildProductConfigs() {
        Map<String, ProductConfig> products = new LinkedHashMap<>();
        addProduct(products, new ProductConfig("iap_starter_pack", "lostkingdom.starter_pack", BillingClient.ProductType.INAPP, true, false));
        addProduct(products, new ProductConfig("iap_remove_ads", "lostkingdom.remove_ads", BillingClient.ProductType.INAPP, false, true));
        addProduct(products, new ProductConfig("iap_monthly_subscription", "lostkingdom.monthly_subscription", BillingClient.ProductType.SUBS, false, true));
        addProduct(products, new ProductConfig("iap_kingdom_pass", "lostkingdom.kingdom_pass", BillingClient.ProductType.INAPP, false, true));
        addProduct(products, new ProductConfig("iap_growth_pack_1", "lostkingdom.growth_pack_1", BillingClient.ProductType.INAPP, true, false));
        addProduct(products, new ProductConfig("iap_growth_pack_2", "lostkingdom.growth_pack_2", BillingClient.ProductType.INAPP, true, false));
        addProduct(products, new ProductConfig("iap_growth_pack_3", "lostkingdom.growth_pack_3", BillingClient.ProductType.INAPP, true, false));
        return Collections.unmodifiableMap(products);
    }

    private static void addProduct(Map<String, ProductConfig> products, ProductConfig product) {
        products.put(product.internalId, product);
    }

    private static Map<String, ProductConfig> indexProductConfigs(Map<String, ProductConfig> configs) {
        Map<String, ProductConfig> products = new LinkedHashMap<>();
        for (ProductConfig config : configs.values()) {
            products.put(config.googlePlayProductId, config);
        }
        return Collections.unmodifiableMap(products);
    }

    private static final class ProductConfig {
        final String internalId;
        final String googlePlayProductId;
        final String billingProductType;
        final boolean consumable;
        final boolean restorable;

        ProductConfig(String internalId, String googlePlayProductId, String billingProductType, boolean consumable, boolean restorable) {
            this.internalId = internalId;
            this.googlePlayProductId = googlePlayProductId;
            this.billingProductType = billingProductType;
            this.consumable = consumable;
            this.restorable = restorable;
        }
    }

    private static final class PurchaseRequest {
        final String requestId;
        final ProductConfig config;

        PurchaseRequest(String requestId, ProductConfig config) {
            this.requestId = requestId;
            this.config = config;
        }
    }

    private static final class BillingAction {
        final Runnable onReady;
        final Runnable onFailure;

        BillingAction(Runnable onReady, Runnable onFailure) {
            this.onReady = onReady;
            this.onFailure = onFailure;
        }
    }
}
