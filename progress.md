Original prompt: 헤르메스 엔지니어링 게임 개발 프롬프트 기반으로 모바일 세로형 방치형 RPG 설계/데이터/이미지 적용을 진행하고, 웹으로 현재 완성도를 확인할 수 있는 프리뷰를 만든다.

## 2026-06-17

## 2026-06-17 Playable runtime completion
- Added a playable vertical web/PWA runtime at `web-game/` for `잃어버린 왕국 : 재건의 시대`.
- Runtime includes automatic combat, boss stages, hero growth, equipment drops/equip-best, village building upgrades, resource production, offline rewards, optional rewarded-ad mocks, mock IAP products, local save/load, PWA manifest, and service worker caching.
- Added long-term retention rewards: daily login, weekly order, 7-day special item `창건자의 성유물`, and 30-day special item `제국의 왕관`.
- Applied generated image assets into the runtime through `runtime-data.json`; verified 435 assets across UI icons, currencies, heroes, monsters, bosses, equipment, buildings, effects, and environments.
- Verification passed: `npm run check` completed 25/25 Node tests, data validation, prompt manifest validation, asset validation, preview build, and game runtime build.
- Browser verification passed at `http://localhost:5176/web-game/`: Playwright state advanced through combat, equipment auto-equip increased total power, login claim and shop purchase changed resources, canvas was nonblank, and console errors/warnings were 0.
- Android emulator verification passed at `http://10.0.2.2:5176/web-game/`: Chrome/WebView showed the real game screen with `gameCanvas`, combat stage, boss/enemy, resources, bottom tabs, reward buttons, and 7-day/30-day retention reward text.
- Current server: `npm run serve:game` is available; a local server was running on port `5176` during verification.

## 2026-06-18 presentation and combat feel upgrade
- Added a first-run opening cinematic overlay with hero/building/environment assets and start/quick-combat actions.
- Added tutorial flow for village, combat, and equipment. Tutorial now follows tab changes and can be skipped.
- Reworked the village tab into a clearer lobby: the top canvas renders a kingdom/village scene instead of always showing combat, and the panel includes a visual 왕국 로비 block with quick actions.
- Added combat feel effects: detected HP changes create floating damage text, slash arcs, sprite-sheet effect bursts, enemy/hero shake, screen shake, and stage-clear flash. Vibration is gated behind real user activation to avoid browser console errors.
- Added skill charge panels and a `집중 공격` action for a more active idle-RPG feel.
- Updated service worker cache to `lost-kingdom-runtime-v5` so the new runtime shell is not hidden behind stale cached files.
- Verification passed: `npm run check` completed 25/25 tests, data validation, prompt validation, asset validation, preview build, and game runtime build.
- Browser verification passed: opening, lobby, and combat-effect screenshots were captured; Playwright console reported 0 errors and 0 warnings.

## 2026-06-18 reward and upgrade feedback pass
- Added icon-first top resource pills for gold, diamond, and power.
- Added a daily performance reward overlay shown after the opening when today's login reward is unclaimed.
- Added reward icon cards for daily rewards, including resource icons and special-item preview support.
- Added `createRewardBurst` so gold, diamond, resources, and power gains fly from the reward source to the top resource area.
- Added `createUpgradeBurst` for building upgrades, hero training, chest opening, purchases, and equipment/power upgrades.
- Battle victories now detect resource gains and equipment drops, then trigger reward-fly and upgrade burst effects automatically.
- Updated service worker cache to `lost-kingdom-runtime-v6`.
- Verification passed: `node --test tests/web-game-runtime.test.cjs`, web-game Playwright action client, Playwright console 0 errors/0 warnings, and `npm run check` with 25/25 tests.
- Captured screenshots: daily reward overlay, reward flying effect, upgrade burst, and combat reward effect under `output/playwright/`.
- 웹 프리뷰 데이터 생성 도구, 정적 프리뷰 화면, 로컬 서버 스크립트를 추가했다.
- 검증 대상: `npm run check`, 로컬 프리뷰 서버, Playwright 기반 탭 전환 및 이미지 로딩 확인.
- `npm run check` 통과: Node 테스트 17개 통과, 데이터/프롬프트/이미지/프리뷰 빌드 검증 통과, 프리뷰 이미지 435개 확인.
- 상점 프리뷰에서 내부 IAP ID 대신 `shopProducts` 표시명과 한국어 상품 타입을 노출하도록 개선했고, 관련 회귀 테스트를 추가했다.
- 로컬 서버 응답 확인: `/web-preview/` 200, `/web-preview/preview-data.json` 200.
- Playwright 확인: 마을/전투/영웅/장비/상점 탭 전환 정상, 각 탭 이미지 로딩 실패 0개, 브라우저 콘솔 오류/경고 0개.
- TODO: Unity 런타임 화면 구현 단계로 넘어갈 때 이 웹 프리뷰를 기준 화면으로 사용한다.

## 2026-06-18 long-session pacing and effect pass
- Fixed active idle runaway progression. A one-day active simulation previously reached Stage 26893 with hero levels around 8069; after the cap it ends around Stage 81, hero level 25, 80 equipment drops, and then continues as patrol rewards instead of unlimited stage/level growth.
- Added a 24-hour auto stage-clear pacing window: 80 automatic stage clears per day, then `순찰 모드` gives smaller gold/resource rewards without stage, equipment, or hero EXP runaway.
- Added patrol tracking to save/load state and combat UI so long-running sessions show the daily pacing state instead of silently stopping.
- Strengthened reward and upgrade feedback: denser spark rain, stronger screen flashes, compact reward fly effects, shorter nonblocking toast notifications, and clearer upgrade burst timing.
- Strengthened combat hit readability: larger damage text, `SKILL`/`CRIT` labels, impact rings, hit slashes, and existing hero/enemy shake remain active.
- Updated service worker cache to `lost-kingdom-runtime-v8`.
- Verification passed: `npm run check` completed 26/26 tests plus data, prompt, asset, preview, and game runtime builds.
- Browser verification passed: Playwright console issues 0, web-game action client exited normally, and screenshots were captured under `output/playwright/web-game-*-v8.png`.

## 2026-06-19 store, scroll, and mobile UI polish pass
- Reworked the shop panel from visible `/ mock` rows into store product cards. Each product now shows Korean product name, KRW price, product type, restore status, Google Play product ID, Apple App Store product ID, and 결제/구독 buttons.
- Added hero loadout visibility. The hero panel now shows current equipped weapon/armor-related slots per hero card, and the equipment panel shows the full party equipped set.
- Added per-tab panel scroll preservation so building upgrade and combat reward rerenders no longer jump the village/combat panel back to the top.
- Added touch-friendly mobile scrolling and game-styled custom scrollbars for the main panel.
- Improved visual polish: more compact stage area, better village/castle/hero composition, stronger parchment/game-card styling, readable gold buttons, and compact large-number formatting such as `34.6B`, `153K`, `4.7K`.
- Updated service worker cache to `lost-kingdom-runtime-v9`.
- Verification passed: `npm run check` completed 26/26 tests plus data, prompt, asset, preview, and game runtime builds.
- Browser verification passed: Playwright console issues 0, store `/ mock` text false, store IDs visible, hero loadout items visible, village scroll stayed 560 -> 560, combat scroll stayed 460 -> 460.
- Captured screenshots: `web-game-lobby-polish-v9.png`, `web-game-village-scroll-stable-v9.png`, `web-game-heroes-loadout-v9.png`, `web-game-shop-store-products-v9.png`, and `web-game-combat-scroll-stable-v9.png`.

## 2026-06-19 touch scroll and building feedback hotfix
- Disabled mouse-wheel scrolling inside the game shell and added pointer/touch drag scrolling for the main game panel.
- Fixed the critical scroll drift bug: render-time `scrollTop=0` events are now ignored, per-tab scroll state stores bottom-pinned status, and bottom scroll remains anchored during automatic UI rerenders.
- Hid desktop-style scrollbars for a more mobile-app presentation while preserving touch/drag scrolling.
- Strengthened `장비 정리`/gold button readability with darker text and stronger gold contrast.
- Added building upgrade clarity: building cards show next production gain before upgrade and display a highlighted result panel after upgrade, e.g. `Lv.2 강화 완료`, `생산 +50/시간`, `전투력 +82`.
- Updated service worker cache to `lost-kingdom-runtime-v10`.
- Verification passed: `npm run check` completed 26/26 tests plus all data/prompt/asset/preview/runtime builds; web-game Playwright client exited normally.
- Browser verification passed: wheel scroll stayed 260 -> 260, drag scroll moved 0 -> 180, bottom scroll stayed 1061 -> 1061 for 3.6s, upgrade scroll stayed 360 -> 360, console issues 0.
- Captured screenshot: `output/playwright/web-game-touch-scroll-upgrade-v10.png`.

## 2026-06-19 overlay, hero detail, and shop cleanup hotfix
- Fixed the daily performance reward overlay reopening/flickering loop. Same-day dismiss now writes `lost_kingdom_daily_reward_dismissed_<date>`, and the overlay keeps the same DOM node while idle instead of being recreated every second.
- Removed visible panel flicker from periodic UI updates. The frame loop no longer rebuilds the active panel; opening, tutorial, daily reward, and hero detail overlays now only rebuild when their display state changes.
- Reworked the hero panel so hero cards show portrait, name, role, and `상세`/`훈련` actions only. Equipment is moved into a modal-style detail popup.
- Added large hero detail popup equipment imagery. Equipped items use the actual item art, while empty slots show muted slot preview equipment images instead of letter placeholders.
- Cleaned shop product cards for player-facing presentation: no Google Play ID, App Store ID, package ID, or `상품등록` badge is displayed. Cards now show title, user-facing description, benefit chips, price, and 결제/구독 button.
- Updated service worker cache to `lost-kingdom-runtime-v11`.
- Verification passed: `node --test tests/web-game-runtime.test.cjs`, `npm run check`, and the develop-web-game Playwright client all passed.
- Browser verification passed: daily overlay node stable for 2.3s with 0 mutations, dismissed reward stayed hidden after reload, hero/shop panels had 0 idle child mutations, hero cards had 0 embedded loadout rows, hero detail popup showed 4 large equipment images, shop had 7 benefit lists and 7 payment buttons with no internal store text, console issues 0.
- Captured screenshots: `output/playwright/web-game-daily-stable-v11c.png`, `output/playwright/web-game-hero-detail-v11c.png`, and `output/playwright/web-game-shop-clean-v11c.png`.

## 2026-06-19 sound prompt planning
- Added `docs/SOUND_PROMPTS.md` as the single AI sound generation prompt file.
- Covered 156 sound prompts: 20 BGM, 12 ambience loops, 22 UI SFX, 32 combat SFX, 20 reward/economy SFX, 14 village/building SFX, 16 hero/equipment SFX, 12 shop/ad/IAP/retention SFX, and 8 system notification SFX.
- Included output paths, target length, loop flags, usage notes, English generation prompts, common negative rules, AudioMixer grouping, and a 35-file minimum launch sound set.

## 2026-06-19 multi-agent playtest review
- Ran four read-only playtest agents for onboarding, mobile UI, growth/economy, and BM/retention, plus a lead Playwright pass under `output/playtest-lead-review/`.
- No crash-level issue was found and browser console issues were 0 in the lead pass.
- Highest-priority findings: stale panel/objective UI while auto-combat progresses, daily reward/tutorial overlap, unclear building upgrade value, too-fast early auto progression, equipment power hidden until auto-equip, shop appearing too payment-heavy, and weak ad/retention reward state feedback.
- Lead quantitative checks: first building upgrade changed power `3577 -> 3659` and kingdom tier `폐허 -> 마을`; hero detail popup opened; focus attack advanced combat but panel explanations remain weak.

## 2026-06-19 multi-agent improvement implementation
- Implemented the playtest review improvement pass in `web-game/`.
- Added live panel updates through `data-live-text` and `data-live-progress`, using stable text-node updates so automatic combat refreshes visible numbers without rebuilding the active panel.
- Daily performance reward now blocks tutorial overlap, shows labeled Stage/equipment/building objectives, and keeps live objective values while the overlay is open.
- Tutorial cards now appear only on their matching tab, preventing old combat guidance from covering shop/village screens.
- Rebalanced active idle pacing further: first 5 auto clears are immediate, then auto stage progression requires a 10-minute interval while the 80-clear daily cap remains.
- Expanded online village production effects for support buildings so hero/crafting/stone/expedition/research/defense buildings also feed resources, not only display power.
- Clarified button behavior across combat, village, heroes, equipment, and shop with compact in-card helper text.
- Village building cards now show effect, current hourly production, next production gain, and the explicit power/production result after upgrade.
- Shop now leads with a free rewards section for optional ad rewards, then separates paid products below. Store/internal ids remain hidden.
- Updated service worker cache to `lost-kingdom-runtime-v14`.
- Verification passed: `npm run check` completed 26/26 tests plus data, prompt, asset, preview, and runtime builds.
- Browser verification passed at `http://localhost:5176/web-game/?v=14`: daily overlay visible without tutorial overlap, daily claim closes overlay, combat panel child mutations stayed 0 during live updates, village upgrade result kept scroll 360 -> 360, shop free rewards were first, internal store IDs hidden, and console issues were 0.
- Captured screenshots: `output/playwright/web-game-v13-daily-overlay.png`, `output/playwright/web-game-v13-combat-live.png`, `output/playwright/web-game-v13-village-effects.png`, `output/playwright/web-game-v13-building-upgrade.png`, and `output/playwright/web-game-v14-shop-free-first.png`.

## 2026-06-19 concise UI and effect hotfix
- Reduced action-card text density. Combat/equipment/shop reward cards now use short status labels such as `오늘 0/5`, `즉시 타격`, `2배 가능`, and no longer show sentence-length helper text in the two-column cards.
- Shortened tutorial bodies to keyword lines: `건물 강화 -> 왕국 성장`, `자동 전투 + 즉시 타격`, `상자 열기 -> 자동 장착`.
- Fixed chest/upgrade effect rendering. `createUpgradeBurst` now uses a `div.upgrade-effect` with 4x4 sprite-sheet background animation instead of inserting the whole effect PNG as an `<img>`.
- Added default button feedback through `actionFeedbackSnapshot`: buttons now show an explicit toast when an action succeeds or when no state changed, even if the individual handler did not provide its own message.
- Updated service worker cache to `lost-kingdom-runtime-v16`.
- Verification passed: `npm run check` completed 26/26 tests plus data, prompt, asset, preview, and runtime builds.
- Browser verification passed at `http://localhost:5176/web-game/?v=16`: chest effect used `DIV` with `background-size: 400% 400%`, `upgrade-effect` contained 0 child images, button feedback toast appeared, tutorial text was reduced, and console issues were 0.
- Captured screenshots: `output/playwright/web-game-v16-equipment-short-before.png`, `output/playwright/web-game-v16-chest-effect.png`, and `output/playwright/web-game-v16-combat-short-text.png`.

## 2026-06-19 final button feedback and effect hotfix
- Replaced reward/upgrade overlay effect rendering with cropped 4x4 sprite-sheet frames, so chest opening no longer shows the full effect sheet behind items.
- Removed duplicate village lobby action buttons; navigation now stays in the bottom tab bar only.
- Added common button feedback for no-op/fail states, with visible single-line toast messages above the bottom navigation.
- Fixed toast visibility by preserving toast DOM nodes across frame updates; previous code recreated the node every frame and kept the animation at opacity 0.
- Auto-equip now reports `Auto equip unavailable` when no better equipment can be equipped, and repeated messages update the same toast instead of stacking.
- Max-level building upgrades now report the max-level state without playing a success burst/effect.
- Updated service worker cache to `lost-kingdom-runtime-v21`.
- Verification passed: `npm run check` completed 26/26 tests plus data, prompt, asset, preview, and runtime builds; develop-web-game Playwright client exited normally.
- Browser verification passed at `http://localhost:5176/web-game/?v=21`: lobby duplicate buttons false, chest effect uses a data-frame background with no child image, auto-equip shows one visible no-op toast, max building click adds no new upgrade burst, and console errors were 0.
- Captured screenshots: `output/playwright/web-game-v21-lobby-final.png`, `output/playwright/web-game-v21-chest-final.png`, `output/playwright/web-game-v21-autoequip-final.png`, and `output/playwright/web-game-v21-maxbuilding-final.png`.

## 2026-06-20 stable upgrade UI and focus attack feedback hotfix
- Stabilized village building card layout. Each building card now reserves a fixed `building-result-slot`, so upgrade result text replaces the existing status area instead of inserting new height and shaking the screen.
- Fixed button sizing drift by giving game buttons a fixed 42px minimum touch height, full-width grid centering, and ellipsis protection for longer labels.
- Added a `kingdom-progress-card` under the village lobby showing current kingdom tier, next milestone remaining progress, stage/building/palace contributors, and live progress.
- Added dedicated focus-attack canvas feedback through `createFocusAttackImpact` and `drawFocusImpact`: a large skill beam, impact ring, stronger shake, and `focusImpact` state in `render_game_to_text`.
- Updated service worker cache to `lost-kingdom-runtime-v22`.
- Verification passed: `node --test tests/web-game-runtime.test.cjs` completed 11/11 tests and `npm run check` completed 28/28 tests plus data, prompt, asset, preview, and runtime builds.
- Browser verification passed at `http://localhost:5176/web-game/?v=22`: building card height stayed `285 -> 285`, button height `42 -> 42`, result slot `52 -> 52`, kingdom progress card visible, focus attack reported `focusImpact: 710`, active effects 4, and console issues 0.
- Captured screenshots: `output/playwright/web-game-v22-village-progress.png`, `output/playwright/web-game-v22-building-upgrade-stable.png`, and `output/playwright/web-game-v22-focus-attack-impact.png`.

## 2026-06-20 sound asset integration
- Applied all 156 generated WAV files from `sound/SOUND_PROMPTS` into the native-style asset tree under `Assets/Audio/` and the playable web build under `web-game/audio/`.
- Added audio manifest generation and validation through `tools/soundManifest.cjs`, `tools/apply-sounds.cjs`, and `tools/validate-sounds.cjs`.
- Added `Assets/Data/Tables/audio_asset_manifest.json` and `web-game/audio-manifest.json` so BGM, ambience, UI, combat, reward, village, hero, shop, and system sounds are discoverable by group and id.
- Integrated the web runtime audio manager: audio loads from `audio-manifest.json`, unlocks on first user input, loops contextual BGM/ambience, and plays SFX for button taps, errors, combat impacts, rewards, building upgrades, hero training, equipment, ads, and purchases.
- Updated the static server WAV MIME type and service worker cache to `lost-kingdom-runtime-v23`, including `audio-manifest.json` in the cached core assets.
- Added audio coverage tests in `tests/audio-assets.test.cjs` and wired sound validation into `npm run check`.

## 2026-06-20 privacy policy HTML
- Added the public privacy policy page at `web-game/privacy-policy.html` with the contact email `young02hwi@gmail.com`.
- Covered gameplay data, device/app data, purchases, rewarded ads, support email, third-party processors, retention/deletion, user rights, children, overseas processing, security, and policy changes.
- Linked the policy from `web-game/index.html` using `rel="privacy-policy"` for in-app and hosted discovery.
- Updated service worker cache to `lost-kingdom-runtime-v24` and cached `/web-game/privacy-policy.html`.
- Added `tests/privacy-policy.test.cjs`, included it in `npm test`, and made `tools/releaseReadiness.cjs` require the privacy policy as a release document.
- Verification passed: `node --test tests/privacy-policy.test.cjs`, `npm run validate:release`, targeted runtime/audio/release tests, and full `npm run check` completed with 32/32 tests passing.
- Browser verification passed at `http://localhost:5176/web-game/privacy-policy.html`: desktop and mobile snapshots exposed the policy title, 2026-06-20 date, and email link, with screenshots saved to `output/playwright/privacy-policy-v24.png` and `output/playwright/privacy-policy-v24-mobile.png`.

## 2026-06-20 GitHub Pages privacy policy fallback
- Added `docs/privacy-policy.html` so GitHub Pages can publish the policy from the lightweight `/docs` source instead of the large repository root.
- Added `docs/index.html` to redirect visitors to `privacy-policy.html` and `docs/.nojekyll` to disable Jekyll processing.
- Updated privacy and release readiness tests so the `/docs` policy copy is required and release readiness now reports `requiredDocs: 6`.

## 2026-06-20 AdMob rewarded ad configuration
- Applied Android AdMob app ID `ca-app-pub-4402708884038037~5285192241`.
- Applied rewarded ad unit `rewarded_core` with ad unit ID `ca-app-pub-4402708884038037/6509654325`.
- Mapped all 10 optional rewarded ad placements in `Assets/Data/Tables/ad_placements.json` to the single production rewarded unit.
- Updated release readiness validation to reject missing or mismatched AdMob provider, app ID, ad unit name, and ad unit ID.
- Updated monetization, release, SDK, and privacy documents from LevelPlay wording to the active AdMob setup.

## 2026-06-20 settings tab and sound toggle
- Added a sixth bottom navigation tab, `settings`, for in-game settings.
- Added a settings panel with a sound on/off toggle for BGM, ambience, and SFX.
- Persisted sound preference in localStorage key `lost_kingdom_sound_enabled_v1` using `on`/`off` values.
- Updated the web audio manager so disabled sound pauses BGM/ambience, stops one-shot SFX, suppresses future SFX, and restores contextual audio when re-enabled after user activation.
- Updated service worker cache to `lost-kingdom-runtime-v25` so existing installs receive the settings and sound toggle update.
- Browser verification passed at `http://localhost:5176/web-game/?v=settings-sound-v25c`: settings tab active, sound toggle present, audio state changed `true -> false -> true`, localStorage changed `on -> off -> on`, console errors 0, screenshot saved to `output/playwright/settings-sound-toggle-v25c.png`.

## 2026-06-20 combat audio scene gating
- Gated combat SFX behind the visible combat scene, so background combat progression no longer plays hit, skill, stage clear, or combat loot sounds while the player is on village, settings, shop, hero, or equipment tabs.
- Kept normal combat SFX active on the combat tab and left contextual BGM/ambience controlled by the current tab.
- Updated service worker cache to `lost-kingdom-runtime-v26` so existing installs receive the combat audio gating update.
- Verification passed: targeted runtime/audio/privacy tests completed 14/14.
- Browser verification passed at `http://127.0.0.1:5176/web-game/`: village tab played 0 combat audio files during 45 seconds of simulated progression, combat tab played combat sword/hit/skill/critical sounds, and screenshot saved to `output/playwright/combat-audio-gate-v26.png`.

## 2026-06-20 install icon readiness
- Added PWA install icons under `web-game/icons/`: 192px, 512px, and a 512px maskable icon.
- Updated `manifest.webmanifest` to use project-safe relative `start_url`, `scope`, and icon paths so GitHub Pages project hosting resolves the installed app correctly.
- Added browser favicon and `apple-touch-icon` links to `web-game/index.html`.
- Updated service worker cache to `lost-kingdom-runtime-v27`, cached the manifest and install icons, and switched core cached URLs to relative paths.
- Added install icon coverage to runtime tests, including PNG dimension checks for all install icon files.
- Browser verification passed at `http://127.0.0.1:5176/web-game/`: manifest, Apple touch icon, service worker, and all three app icons resolved as 200 PNG responses; screenshot saved to `output/playwright/install-icons-v27.png`.

## 2026-06-20 combat balance and feedback pass
- Reworked hero stat progression so legacy saves with multiplicative overgrowth are normalized on load while preserving hero levels.
- Rebalanced enemy HP and attack around stage growth plus a capped square-root power pressure instead of direct total-power scaling.
- Added party HP regeneration with visible enemy pressure, preventing party HP from staying pinned at 1 while still letting enemy attacks move the HP bar.
- Added combat HUD readouts for enemy HP and party HP, plus a combat status card in the panel with readable compact HP values and next-stage/patrol status.
- Added patrol reward event detection so kills during pacing-limited windows still create reward feedback, screen response, and reward sound.
- Updated service worker cache to `lost-kingdom-runtime-v28`.
- Verification passed: targeted runtime/audio/privacy tests completed 16/16.
- Browser verification passed with an injected legacy Stage 2459 overgrown save: power normalized from `1.2Dc` scale to `681K`, enemy HP dropped from 84% to 32% in 10 seconds, party HP moved from 100% to 98%, and screenshot saved to `output/playwright/combat-balance-feedback-v28-rerun.png`.
