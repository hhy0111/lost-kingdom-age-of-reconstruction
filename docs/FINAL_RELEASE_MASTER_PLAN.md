# Lost Kingdom Final Release Master Plan

Date: 2026-06-20

This plan treats the next release as the final production release. There is no Android-first or iOS-later split. Google Play, App Store, production billing, rewarded ads, privacy disclosures, QA, and review evidence must all be complete before the release is considered ready.

## Current Baseline

- Playable reference runtime: `web-game/` v22.
- Current verification baseline: `npm run check` passes 28 Node tests plus data, prompt, asset, preview, and runtime builds.
- Source-of-truth content: `Assets/Data/Tables/*.json`, `web-game/runtime-data.json`, and the C# monetization core under `src/LostKingdom.Monetization/`.
- Current repository shape: Unity-style `Assets/` exists, but `ProjectSettings/` and `Packages/` are not present. A production Unity project must import these assets and contracts before store submission.
- Monetization data already exists: 7 IAP products, 10 rewarded ad placements, 6 purchase validation rules, 30 monetization analytics events.

## Final Release Definition

The release is complete only when all gates below are satisfied:

1. Native Unity client builds for Android and iOS from the same gameplay, data, and monetization contracts.
2. Google Play and App Store product catalogs match `Assets/Data/Tables/iap_products.json`.
3. Unity IAP purchase handling validates receipts, prevents duplicate fulfillment, confirms completed purchases, and restores eligible entitlements.
4. Unity LevelPlay rewarded ads use the 10 configured placements, never force ads, and grant rewards only after completed rewarded callbacks.
5. Remove-ads entitlement changes rewarded-ad claim mode to instant reward while preserving daily limits and reward economy.
6. Data safety, app privacy, tracking consent, randomized reward odds, review notes, store screenshots, and age rating disclosures are complete.
7. QA evidence covers clean install, offline return, IAP success/failure/pending/restore, rewarded ad success/failure/cap/cooldown, remove-ads, localization, and device performance.
8. Crash-free smoke tests and store sandbox purchases pass on real Android and iOS devices.

## Official Requirements

- Google Play Billing Library integration: https://developer.android.com/google/play/billing/integrate
- Google Play Billing Library 9.0.0 release notes: https://developer.android.com/google/play/billing/release-notes
- Google Play target API level requirements: https://support.google.com/googleplay/android-developer/answer/11926878
- Google Play Data safety form: https://support.google.com/googleplay/android-developer/answer/10787469
- Google Play billing test requirements: https://developer.android.com/google/play/billing/test
- Google Play purchase fraud and acknowledgement guidance: https://developer.android.com/google/play/billing/security
- Google Play payments policy: https://support.google.com/googleplay/android-developer/answer/10281818
- Google Play randomized virtual item odds disclosure: https://support.google.com/googleplay/android-developer/answer/6223646
- Apple App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Apple IAP creation guide: https://developer.apple.com/help/app-store-connect/manage-in-app-purchases/create-consumable-or-non-consumable-in-app-purchases/
- Unity IAP purchase handling: https://docs.unity.com/en-us/iap/purchases
- Unity IAP receipt validation: https://docs.unity.com/en-us/iap/receipt-validation
- Unity LevelPlay capping and pacing: https://docs.unity.com/en-us/grow/levelplay/platform/settings/capping-pacing
- Unity LevelPlay rewarded ads integration: https://docs.unity.com/en-us/grow/levelplay/sdk/unity/rewarded-ad-integration-package

## Gate 1: Unity Production Project

Required local work:

- Create or attach a real Unity project with `ProjectSettings/`, `Packages/`, and `Assets/`.
- Import generated assets from `Assets/Art/`, data tables from `Assets/Data/Tables/`, and C# monetization core from `src/LostKingdom.Monetization/`.
- Build scenes for opening, village, combat, heroes, equipment, shop, settings, restore purchases, privacy, and support.
- Use `web-game/` v22 as the visual and flow reference, not as the shipped mobile runtime.
- Add build scripting for Android App Bundle and iOS Xcode export.

Release gate:

- Android release AAB installs through internal testing.
- iOS TestFlight build installs through App Store Connect.
- Both clients load the same catalog counts: 104 monsters, 200 equipment, 50 heroes, 12 buildings, 7 IAP products, 10 rewarded ad placements.

## Gate 2: Store Catalog

Store products must match `Assets/Data/Tables/iap_products.json` exactly.

| Product | Google Play ID | Apple ID | Store Type | Restore |
|---|---|---|---|---|
| `iap_starter_pack` | `lostkingdom.starter_pack` | `com.lostkingdom.starterpack` | Consumable | No |
| `iap_remove_ads` | `lostkingdom.remove_ads` | `com.lostkingdom.removeads` | Non-consumable | Yes |
| `iap_monthly_subscription` | `lostkingdom.monthly_subscription` | `com.lostkingdom.monthlysubscription` | Subscription | Yes |
| `iap_kingdom_pass` | `lostkingdom.kingdom_pass` | `com.lostkingdom.kingdompass` | Season entitlement | Current season entitlement |
| `iap_growth_pack_1` | `lostkingdom.growth_pack_1` | `com.lostkingdom.growthpack1` | Consumable | No |
| `iap_growth_pack_2` | `lostkingdom.growth_pack_2` | `com.lostkingdom.growthpack2` | Consumable | No |
| `iap_growth_pack_3` | `lostkingdom.growth_pack_3` | `com.lostkingdom.growthpack3` | Consumable | No |

Release gate:

- Product metadata, localized names, descriptions, prices, screenshots, and review notes are complete in both stores.
- Sandbox metadata is visible before testing.
- No external payment link or alternate payment copy appears in the app unless a platform-specific program has been explicitly enrolled and implemented.

## Gate 3: Billing Implementation

Required client behavior:

- Fetch products from the active store before showing final prices.
- Start purchase only from user action.
- Accept pending purchase states without granting rewards.
- Validate receipt or store payload before fulfillment.
- Grant rewards once through a persistent transaction ledger.
- Confirm or acknowledge purchases only after fulfillment succeeds.
- Restore non-consumable, subscription, and current season entitlements from the store.
- Never restore consumable pack rewards without a server-backed durable account ledger.

Release gate:

- Google Play license testers pass purchase, cancel, pending, refund, and restore checks.
- iOS sandbox testers pass purchase, ask-to-buy or pending where available, restore, subscription renewal, and expired subscription checks.
- Purchase acknowledgement is verified before refund windows are reached.

## Gate 4: Rewarded Ads

Configured placements:

- `ad_offline_reward_x2`
- `ad_gold_x2`
- `ad_resource_x2`
- `ad_expedition_complete`
- `ad_building_complete`
- `ad_equipment_box`
- `ad_boss_retry`
- `ad_free_summon`
- `ad_legendary_box_boost`
- `ad_daily_special`

Rules:

- All ads are rewarded ads.
- Forced ads are prohibited.
- Daily limits and cooldowns are enforced locally and mirrored in LevelPlay capping/pacing.
- Rewards are granted only after the rewarded completion callback.
- Failed, closed, capped, unavailable, or network-error ads do not grant rewards or consume daily limits.
- Remove-ads entitlement grants instant claim for reward placements while still recording analytics and respecting economy limits.

Release gate:

- LevelPlay app IDs, ad unit IDs, placement names, and dashboard caps match local IDs.
- Test mode validates ready, not ready, capped, failed, closed, and rewarded callbacks.
- Production mode is enabled only after sandbox ad verification passes.

## Gate 5: Privacy, Policy, And Review

Google Play:

- Target Android API 35 or higher for new app submission.
- Complete App content, Data safety, Ads declaration, Content rating, Target audience, App access, and testing credentials.
- Disclose randomized virtual item odds near any paid chest or paid randomized reward.
- Use Google Play Billing for in-app digital goods.

App Store:

- Complete App Privacy details.
- Add ATT prompt only if tracking is actually performed for ads or cross-app attribution.
- Add IAP review notes and screenshots.
- Provide restore purchase access in settings and package screens.
- Disclose randomized item odds before purchase.

Release gate:

- Reviewers can reach purchase, restore, rewarded-ad, and support flows without private credentials beyond provided test access.
- Privacy policy URL and support URL are live.

## Gate 6: QA Matrix

Required test devices:

- Android low-end phone, Android current flagship, Android tablet or foldable emulator.
- iPhone current iOS, older supported iPhone, iPad.

Required scenarios:

- First install and first 10 minutes.
- Offline return at 1 hour, 8 hours, 24 hours.
- Combat, boss, focus attack, village upgrade, hero training, equipment chest, auto-equip.
- All five bottom tabs, all shop cards, restore purchase button, privacy/support/settings.
- Purchase success, cancel, failure, pending, duplicate callback, restore, subscription expired.
- Rewarded ad ready, not ready, completed, closed early, failed, capped, cooldown.
- Remove-ads entitlement instant reward path.
- Korean, English, Japanese display pass for critical store and purchase text.
- Airplane mode, slow network, app background/resume during purchase or ad.

Release gate:

- No blocking crash.
- No duplicate entitlement grant.
- No reward without completed ad.
- No forced ad.
- No unacknowledged purchase.
- No visible internal store IDs in player-facing shop UI.

## Gate 7: Store Assets

Required assets:

- App icon.
- Feature graphic or promotional art where required by store.
- At least phone screenshots for village, combat, hero detail, equipment reward, shop/free rewards, daily reward.
- iPad screenshots for App Store if iPad support is enabled.
- Preview video using the battle-reward-build-kingdom loop.
- Store descriptions in Korean, English, and Japanese if those locales are enabled.
- Support URL, privacy policy URL, marketing URL if used.

Release gate:

- Store screenshots show real gameplay and current UI.
- No mock payment IDs, internal debug strings, or development server URLs appear in assets.

## Gate 8: Release Decision

The final release can be submitted only when:

- `npm run check` passes.
- `npm run validate:release` passes.
- Android internal testing purchase and rewarded-ad evidence is captured.
- iOS TestFlight purchase and rewarded-ad evidence is captured.
- Store metadata and privacy forms are complete.
- Final build numbers, signing keys, bundle IDs, and app identifiers are locked.

## Local Automation

This repository now includes a release readiness validator:

```bash
npm run validate:release
```

The validator checks:

- Final release documents exist.
- Release documents include current official store, billing, privacy, and ad references.
- 7 IAP products use valid product ID patterns, prices, fulfillment policies, and restore policies.
- 10 ad placements are rewarded-only, never forced, capped, paced, and completion-gated.
- Required purchase validation rules and monetization analytics events exist.

