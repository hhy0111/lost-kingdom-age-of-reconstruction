# Monetization SDK Integration Status

Date: 2026-06-21

This repository now contains the internal monetization contract, service layer, and a native Android App Bundle project for rewarded ads and in-app purchases. The Android app wraps `web-game/` in a WebView and connects it to Google Mobile Ads and Google Play Billing.

## Completed In This Repository

- Rewarded ad catalog and AdMob production identifiers are defined in `Assets/Data/Tables/ad_placements.json`.
- All current ad placements are optional rewarded ads, never forced interstitials.
- `IRewardedAdAdapter` defines the SDK bridge required from Google Mobile Ads SDK for AdMob.
- `RewardedAdService` checks placement caps, cooldowns, remove-ads entitlement, SDK readiness, and rewarded completion before granting value.
- `IIapStoreAdapter` defines the SDK bridge required from Unity IAP, Google Play Billing, or StoreKit.
- `PurchaseService` starts purchases through the store adapter, rejects failed/pending-invalid results, validates receipt presence, checks product identity, prevents duplicate transaction fulfillment, and exposes restore flow handling.
- `PurchaseLedger` prevents duplicate fulfillment by transaction ID.
- `NonEmptyPurchaseReceiptValidator` provides the local validation gate and can be replaced by a server-backed validator later.
- `android-app/` builds the Google Play Android App Bundle with package `com.lostkingdom.reconstruction`.
- Android rewarded ads use Google Mobile Ads SDK `25.0.0` and grant value only after `OnUserEarnedRewardListener`.
- Android purchases use Google Play Billing Library `9.1.0`, consume consumables, acknowledge non-consumables/subscriptions, and expose purchase restore.
- `npm run build:android:aab` creates `android-app/build/outputs/bundle/release/lost-kingdom-release-signed.aab` when local signing files are present.
- `npm run check` now runs both Node release checks and C# monetization core tests.

## Production Android Identifiers

| Item | Value |
|---|---|
| AdMob app ID | `ca-app-pub-4402708884038037~5285192241` |
| Rewarded ad unit name | `rewarded_core` |
| Rewarded ad unit ID | `ca-app-pub-4402708884038037/6509654325` |

## Remaining Store-Side Setup

1. In Google Play Console, create/activate every product ID from `Assets/Data/Tables/iap_products.json`.
2. Configure the subscription base plan/offer for `lostkingdom.monthly_subscription`.
3. Upload the signed AAB and enroll the generated upload key with Play App Signing.
4. Run real-device internal testing for purchase success, cancellation, pending purchase, restore, rewarded complete, rewarded close, not-ready, cap, cooldown, and remove-ads instant claim.
5. Replace client-only validation with server-backed validation before granting high-value durable goods, when a server is available.

## Safety Rules

- Never grant rewarded value before the rewarded completion callback.
- Never show forced ads.
- Do not count failed or closed ads as claimed rewards.
- Do not grant purchases without a receipt or transaction ID.
- Do not grant the same transaction ID twice.
- Non-consumable and subscription restore should restore entitlement state, not duplicate consumable rewards.
