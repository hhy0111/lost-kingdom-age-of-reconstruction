# Playable Runtime Design

## Goal

Build a real playable portrait idle RPG runtime for "잃어버린 왕국 : 재건의 시대" that runs in the browser and Android emulator using the existing 435 applied art assets and data tables.

## Product Standard

The runtime must feel like a game, not a catalog. The first screen is live combat with automatic attacks, enemy HP, damage feedback, rewards, and persistent progression. The bottom navigation exposes village, combat, heroes, equipment, and shop. Progress must save locally and resume with offline rewards.

## Architecture

The runtime is a standalone web app under `web-game/`, separate from `web-preview/`.

- `web-game/runtime-core.js` owns deterministic game state, combat ticks, rewards, upgrades, daily/weekly/monthly login rewards, ads, purchases, equipment, and save serialization.
- `web-game/app.js` owns DOM rendering, canvas rendering, input handling, localStorage save/load, and browser hooks.
- `tools/build-runtime-data.cjs` creates a compact runtime payload from existing table and image manifests.
- `tools/serve-game.cjs` serves both PC browser and Android emulator via `0.0.0.0`.
- `tests/web-game-runtime.test.cjs` verifies gameplay behavior in Node.

## Gameplay

Combat runs automatically. The player squad attacks enemies, enemies attack back, skills charge, bosses appear on milestone stages, and victory grants gold, experience, equipment drops, and kingdom progress. The game exposes `window.advanceTime(ms)` and `window.render_game_to_text()` for deterministic browser verification.

Village buildings generate resources, upgrade with gold/wood/ore/food, and visibly advance kingdom tiers from ruins toward empire. Heroes can be leveled and assigned. Equipment can be opened, equipped, and upgraded. Shop interactions mock rewarded ads and purchases without real payment APIs.

## Retention

The runtime includes daily login, 7-day login, 30-day login, weekly orders, monthly relic rewards, and comeback rewards. Day 7 and Day 30 grant special items. These are computed locally from calendar day keys so they can be verified without a server.

## Quality Bar

The runtime must pass automated tests, browser Playwright checks, image-load checks, console checks, and Android emulator visual checks. It must not claim native Unity/APK status. It must clearly be a playable web/PWA runtime.
