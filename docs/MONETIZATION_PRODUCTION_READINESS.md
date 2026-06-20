# Monetization Production Readiness

Date: 2026-06-20

This document closes the production preparation for payments and rewarded ads. The local repository cannot register products in Play Console, App Store Connect, or LevelPlay without account access, but it now defines the exact product catalog, ad placement catalog, grant rules, restore rules, analytics contract, and validation gate those consoles must match.

## Production Rule

Every paid digital item must go through the platform store payment system for the store where the app is distributed. Rewarded ads must be optional, capped, paced, and reward only after the completed rewarded callback.

Official references:

- Google Play Billing integration: https://developer.android.com/google/play/billing/integrate
- Google Play Billing 9.0.0 release notes: https://developer.android.com/google/play/billing/release-notes
- Google Play target API requirements: https://support.google.com/googleplay/android-developer/answer/11926878
- Google Play Data safety form: https://support.google.com/googleplay/android-developer/answer/10787469
- Google Play billing testing: https://developer.android.com/google/play/billing/test
- Google Play fraud and purchase acknowledgement: https://developer.android.com/google/play/billing/security
- Google Play payments policy: https://support.google.com/googleplay/android-developer/answer/10281818
- Google Play randomized item disclosure: https://support.google.com/googleplay/android-developer/answer/6223646
- Apple App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Apple IAP setup: https://developer.apple.com/help/app-store-connect/manage-in-app-purchases/create-consumable-or-non-consumable-in-app-purchases/
- Unity IAP purchase handling: https://docs.unity.com/en-us/iap/purchases
- Unity IAP receipt validation: https://docs.unity.com/en-us/iap/receipt-validation
- Unity LevelPlay capping and pacing: https://docs.unity.com/en-us/grow/levelplay/platform/settings/capping-pacing
- Unity LevelPlay rewarded ads: https://docs.unity.com/en-us/grow/levelplay/sdk/unity/rewarded-ad-integration-package

## IAP Catalog

Source file: `Assets/Data/Tables/iap_products.json`

| Internal ID | Google Play Product ID | Apple Product ID | Game Type | Price KRW | Fulfillment | Restore |
|---|---|---|---|---:|---|---|
| `iap_starter_pack` | `lostkingdom.starter_pack` | `com.lostkingdom.starterpack` | Consumable | 1500 | `grant_once_then_mark_claimed` | No |
| `iap_remove_ads` | `lostkingdom.remove_ads` | `com.lostkingdom.removeads` | Non-consumable | 8900 | `unlock_ad_skip_entitlement_permanently` | Yes |
| `iap_monthly_subscription` | `lostkingdom.monthly_subscription` | `com.lostkingdom.monthlysubscription` | Subscription | 6500 | `grant_30_day_membership_and_daily_claims` | Yes |
| `iap_kingdom_pass` | `lostkingdom.kingdom_pass` | `com.lostkingdom.kingdompass` | Season entitlement | 12900 | `unlock_current_season_premium_track` | Current season entitlement |
| `iap_growth_pack_1` | `lostkingdom.growth_pack_1` | `com.lostkingdom.growthpack1` | Consumable | 5900 | `grant_growth_rewards_for_early_regions` | No |
| `iap_growth_pack_2` | `lostkingdom.growth_pack_2` | `com.lostkingdom.growthpack2` | Consumable | 12900 | `grant_growth_rewards_for_mid_regions` | No |
| `iap_growth_pack_3` | `lostkingdom.growth_pack_3` | `com.lostkingdom.growthpack3` | Consumable | 29000 | `grant_growth_rewards_for_late_regions` | No |

## Store Console Setup

Google Play:

- Use Google Play Billing Library 9.0.0 or the current Unity IAP package that embeds a compliant Billing Library.
- Target Android API 35 or higher.
- Enable pending purchases.
- Register all one-time products and subscriptions using the exact Google Play IDs above.
- Add license testers before purchase testing.
- Verify purchases are acknowledged. License tester purchases are refunded after a short test window if not acknowledged, and production purchases can be refunded when acknowledgement is missing.
- Use Google Play Billing for all in-app digital goods.

App Store:

- Register all IAPs in App Store Connect with the exact Apple product IDs above.
- Add localized display name, description, price, availability, review screenshot, and review notes for every product.
- Allow sandbox metadata propagation time before testing.
- Add restore purchase access in settings and package screens.
- Provide App Review test instructions that reach the shop, restore, and rewarded-ad paths.

## Purchase Flow Contract

Client flow:

1. Load `iap_products.json`.
2. Connect Unity IAP to the active store.
3. Fetch store product metadata and localized prices.
4. Render player-facing product cards without internal store IDs.
5. Start purchase only from user input.
6. On pending purchase, keep UI in pending state and do not grant.
7. On completed purchase, validate receipt or store payload.
8. Check `PurchaseLedger` for transaction duplication.
9. Apply the fulfillment policy once.
10. Persist entitlement or consumed reward result.
11. Confirm or acknowledge the purchase after successful fulfillment.
12. Emit analytics for start, pending, completion, failure, validation, entitlement, duplicate ignored, and restore.

Restore flow:

1. Show restore purchase in settings and package screens.
2. Fetch completed store purchases.
3. Restore `iap_remove_ads`, `iap_monthly_subscription`, and `iap_kingdom_pass` entitlements where valid.
4. Do not restore consumable pack rewards without a server-backed durable ledger.
5. Show a player-facing result: restored count, nothing to restore, or failure reason.

## Rewarded Ad Catalog

Source file: `Assets/Data/Tables/ad_placements.json`

| Placement | Daily Limit | Cooldown | Screen | Grant Policy |
|---|---:|---:|---|---|
| `ad_offline_reward_x2` | 5 | 0 | `offline_reward_popup` | `grant_after_completed_view` |
| `ad_gold_x2` | 5 | 30 | `combat_reward_panel` | `grant_timed_buff_after_completed_view` |
| `ad_resource_x2` | 5 | 30 | `village_production_panel` | `grant_timed_buff_after_completed_view` |
| `ad_expedition_complete` | 3 | 20 | `expedition_detail` | `grant_completion_after_completed_view` |
| `ad_building_complete` | 3 | 20 | `building_detail` | `grant_completion_after_completed_view` |
| `ad_equipment_box` | 5 | 15 | `equipment_reward_panel` | `grant_item_after_completed_view` |
| `ad_boss_retry` | 3 | 20 | `boss_retry_popup` | `grant_ticket_after_completed_view` |
| `ad_free_summon` | 5 | 15 | `summon_panel` | `grant_summon_after_completed_view` |
| `ad_legendary_box_boost` | 1 | 60 | `equipment_chest_panel` | `grant_next_chest_modifier_after_completed_view` |
| `ad_daily_special` | 1 | 60 | `daily_reward_panel` | `grant_choice_reward_after_completed_view` |

## LevelPlay Setup

- Create one rewarded ad unit for the game.
- Create placement names matching the local placement IDs.
- Configure dashboard capping and pacing to match daily limit and cooldown intent.
- Before showing an ad, check ad readiness and placement cap state.
- Show ads with the placement name.
- Grant only from the rewarded callback.
- Treat close, load failure, display failure, no fill, network error, or capped state as no reward.
- Keep forced interstitials disabled.

## Remove Ads Entitlement

`iap_remove_ads` does not remove the reward economy. It changes the claim path:

- Without entitlement: eligible rewarded placement uses `WatchAd`.
- With entitlement: eligible rewarded placement uses `Instant`.
- Daily limits and reward economy still apply.
- Analytics still record offer, instant claim, and reward grant.

## Randomized Rewards And Odds

Any paid chest, paid equipment box, paid summon, or paid pass reward that can produce randomized virtual items must show odds before purchase or claim. This includes:

- Equipment chest paid boosts.
- Growth packs containing randomized item boxes.
- Paid pass rewards containing randomized item boxes.
- Any future paid summon configuration imported into this catalog.

The player-facing odds panel must be near the purchase or claim button and must not require opening an external webpage.

## Privacy And Data Declarations

Google Play Data safety must cover:

- Purchases.
- App activity and gameplay analytics.
- Crash diagnostics.
- Advertising identifiers if used by the ad SDK.
- Approximate or precise location only if a selected SDK actually collects it.
- Data sharing with ad, analytics, crash, and store providers.

App Store Privacy must cover:

- Purchases.
- Product interaction analytics.
- Diagnostics.
- Identifiers used for ads or attribution.
- Tracking through ATT only if cross-app or third-party tracking is enabled.

## Required Analytics Events

The local catalog includes the production event names for:

- Ad offer shown, clicked, started, completed, failed, granted, capped, and cooldown blocked.
- IAP catalog loaded and failed.
- IAP purchase started, cancelled, pending, completed, and failed.
- Receipt validation started, succeeded, and failed.
- Entitlement granted and duplicate ignored.
- Restore started, completed, failed, and restored.

Release builds must send the same event names from both Android and iOS.

## Production Test Matrix

Billing:

- Product catalog loads localized prices.
- Purchase success grants exactly once.
- Duplicate purchase callback is ignored.
- Purchase cancel grants nothing.
- Pending purchase grants nothing until completion.
- Receipt validation failure grants nothing.
- App kill during purchase does not lose entitlement.
- Restore returns eligible entitlements.
- Consumable packs do not restore from local-only state.
- Subscription expiration removes membership benefits.

Ads:

- Ready rewarded ad completes and grants.
- Closed rewarded ad grants nothing.
- Failed display grants nothing.
- No fill grants nothing.
- Daily limit blocks.
- Cooldown blocks.
- Remove-ads entitlement gives instant claim.
- LevelPlay dashboard cap and local cap agree.

Review:

- Store IDs are hidden from player UI.
- Randomized item odds are visible before paid random rewards.
- Privacy and support links open.
- Reviewers can reach shop, restore, and ad flows.

## Local Validation

Run:

```bash
npm run validate:release
```

Expected result:

```json
{
  "platforms": ["app_store", "google_play"],
  "requiredDocs": 5,
  "iapProducts": 7,
  "rewardedAdPlacements": 10
}
```
