# Final Release Readiness Design

Date: 2026-06-20

## Purpose

Prepare the project as a final production release candidate, not as a staged Android-first or iOS-later launch. The release definition includes Android, iOS, production payments, rewarded ads, privacy disclosures, review evidence, QA, and local validation gates.

## Current Project Context

The project already has a playable web reference runtime at `web-game/`, generated content and art under `Assets/`, data tables under `Assets/Data/Tables/`, and a C# monetization core under `src/LostKingdom.Monetization/`. The latest local verification baseline is `npm run check` passing 28 tests plus data, prompt, asset, preview, and game build validation.

The repository does not currently include a complete Unity project root because `ProjectSettings/` and `Packages/` are absent. That means local work can finalize the contracts, documentation, and automated readiness validation, while actual store console registration and SDK keys require external account access.

## Approaches Considered

### Approach A: Ship The Web/PWA Runtime

This is fastest because `web-game/` already exists and passes checks. It is not acceptable for the final target because real Google Play and App Store IAP, AdMob rewarded ads, native build signing, and platform review flows need native integration.

### Approach B: Native Unity Final Release With Local Release Gates

This uses the existing data, art, web runtime, and C# monetization core as source-of-truth inputs for a production Unity client. The local repository receives final release documents and an automated validator that prevents payment/ad readiness drift. This is the selected approach because it matches the final Android+iOS requirement while respecting the repository's current shape.

### Approach C: Backend-First Commerce Platform

This gives the strongest fraud and restore posture, especially for consumables and season entitlements. It is too large to make a prerequisite for the local readiness pass, but the design requires server-backed acknowledgement and entitlement persistence before production submission if the final Unity client supports account-linked cross-device entitlements.

## Selected Design

Use Approach B with a mandatory production entitlement contract. The repository will define:

- Final release master plan.
- Monetization production readiness guide.
- Release readiness validator and CLI.
- Implementation plan for completing Unity, store, privacy, QA, and submission work.

The shipped game must use native store payment systems:

- Google Play Billing through Unity IAP or a compliant Unity billing package.
- App Store IAP through Unity IAP or StoreKit-backed Unity integration.
- AdMob rewarded ads for optional rewarded placements.

The local validator checks only facts that can be verified inside this repository. External facts, such as Play Console product status, App Store Connect IAP review status, AdMob app and ad unit setup, signing certificates, and device test evidence, remain release gates in the master plan.

## Monetization Contract

IAP products:

- 7 products in `Assets/Data/Tables/iap_products.json`.
- Product IDs must stay stable and unique.
- Consumables must not be treated as restorable local entitlements.
- Remove-ads must be restorable and permanent.
- Subscription state must be restorable.
- Current season entitlement must be restorable for the active season.

Rewarded ads:

- 10 placements in `Assets/Data/Tables/ad_placements.json`.
- Every placement is `rewarded`.
- `isForced` is always `false`.
- Daily limits and cooldowns are required.
- Rewards are granted only after completed rewarded views.
- Remove-ads changes the claim mode to instant reward, not unlimited reward.

Analytics:

- Monetization events in `Assets/Data/Tables/monetization_analytics_events.json` are the production event names.
- Android and iOS must emit the same names.

## Compliance Contract

Google Play:

- Target API 35 or higher for the final new app submission.
- Use Play Billing for in-app digital goods.
- Enable and support pending purchases.
- Acknowledge or confirm purchases only after fulfillment.
- Complete Data safety declarations.
- Disclose randomized paid reward odds.

App Store:

- Register matching IAP product IDs.
- Provide restore purchase access.
- Add App Review notes and screenshots for IAP.
- Complete App Privacy details.
- Use ATT only when tracking is performed.
- Disclose randomized paid reward odds.

Unity:

- Use Unity IAP purchase pending, fetch purchases, receipt validation, entitlement restore, and purchase confirmation patterns.
- Use AdMob rewarded ad readiness and local placement capping checks before showing rewarded ads.

Official references:

- https://developer.android.com/google/play/billing/integrate
- https://developer.android.com/google/play/billing/release-notes
- https://support.google.com/googleplay/android-developer/answer/11926878
- https://support.google.com/googleplay/android-developer/answer/10787469
- https://developer.android.com/google/play/billing/test
- https://developer.android.com/google/play/billing/security
- https://support.google.com/googleplay/android-developer/answer/10281818
- https://support.google.com/googleplay/android-developer/answer/6223646
- https://developer.apple.com/app-store/review/guidelines/
- https://developer.apple.com/help/app-store-connect/manage-in-app-purchases/create-consumable-or-non-consumable-in-app-purchases/
- https://docs.unity.com/en-us/iap/purchases
- https://docs.unity.com/en-us/iap/receipt-validation
- https://docs.unity.com/en-us/grow/levelplay/platform/settings/capping-pacing
- https://docs.unity.com/en-us/grow/levelplay/sdk/unity/rewarded-ad-integration-package

## Files

Create:

- `docs/FINAL_RELEASE_MASTER_PLAN.md`
- `docs/MONETIZATION_PRODUCTION_READINESS.md`
- `tools/releaseReadiness.cjs`
- `tools/validate-release-readiness.cjs`
- `tests/release-readiness.test.cjs`
- `docs/superpowers/plans/2026-06-20-final-release-readiness.md`

Modify:

- `package.json`

## Error Handling

The release validator reports all readiness errors at once instead of failing on the first issue. This makes catalog drift easier to fix. Store-console-only requirements are documented as release gates and are not treated as locally passable checks.

## Testing

Add `tests/release-readiness.test.cjs` first and verify it fails because `tools/releaseReadiness.cjs` does not exist. Then implement the validator, add release documents, update package scripts, and run:

```bash
node --test tests/release-readiness.test.cjs
npm run validate:release
npm run check
```

## Completion Criteria

- Release readiness test passes.
- Release validator passes.
- Full `npm run check` passes.
- The final release plan states all remaining external gates clearly.
- Payment and ad setup can be executed from the documented catalog without inventing new IDs or rules.

## Self-Review

- Placeholder scan: no unfinished placeholder terms are used.
- Scope check: the design is focused on final release readiness, not a full Unity project implementation inside this repository.
- Ambiguity check: local readiness and external console gates are explicitly separated.
- Consistency check: product counts, ad counts, and document paths match the validator.
