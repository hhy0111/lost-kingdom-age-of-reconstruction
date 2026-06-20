# Monetization SDK Integration Status

Date: 2026-06-21

This repository now contains the internal monetization contract and service layer for rewarded ads and in-app purchases. It does not contain a native Android, iOS, or Unity app project, so SDK package installation and device-level store testing must happen in the native app project that consumes this repository.

## Completed In This Repository

- Rewarded ad catalog and AdMob production identifiers are defined in `Assets/Data/Tables/ad_placements.json`.
- All current ad placements are optional rewarded ads, never forced interstitials.
- `IRewardedAdAdapter` defines the SDK bridge required from Google Mobile Ads SDK for AdMob.
- `RewardedAdService` checks placement caps, cooldowns, remove-ads entitlement, SDK readiness, and rewarded completion before granting value.
- `IIapStoreAdapter` defines the SDK bridge required from Unity IAP, Google Play Billing, or StoreKit.
- `PurchaseService` starts purchases through the store adapter, rejects failed/pending-invalid results, validates receipt presence, checks product identity, prevents duplicate transaction fulfillment, and exposes restore flow handling.
- `PurchaseLedger` prevents duplicate fulfillment by transaction ID.
- `NonEmptyPurchaseReceiptValidator` provides the local validation gate and can be replaced by a server-backed validator later.
- `npm run check` now runs both Node release checks and C# monetization core tests.

## Production Android Identifiers

| Item | Value |
|---|---|
| AdMob app ID | `ca-app-pub-4402708884038037~5285192241` |
| Rewarded ad unit name | `rewarded_core` |
| Rewarded ad unit ID | `ca-app-pub-4402708884038037/6509654325` |

## Native App Integration Required Outside This Repository

1. Add Google Mobile Ads SDK for AdMob to the Android or Unity app project.
2. Add Unity IAP, Google Play Billing, or StoreKit to the native app project.
3. Implement `IRewardedAdAdapter` by loading and showing the configured AdMob rewarded unit.
4. Implement `IIapStoreAdapter` by forwarding purchase, pending, failure, restore, transaction ID, and receipt payload events from the platform store.
5. Persist `PurchaseLedger` state with the app save data or server account state.
6. Replace `NonEmptyPurchaseReceiptValidator` with server-backed validation before granting high-value durable goods in production, when a server is available.
7. Run real-device sandbox tests for purchase success, cancellation, pending purchase, restore, rewarded complete, rewarded close, not-ready, cap, cooldown, and remove-ads instant claim.

## Safety Rules

- Never grant rewarded value before the rewarded completion callback.
- Never show forced ads.
- Do not count failed or closed ads as claimed rewards.
- Do not grant purchases without a receipt or transaction ID.
- Do not grant the same transaction ID twice.
- Non-consumable and subscription restore should restore entitlement state, not duplicate consumable rewards.
