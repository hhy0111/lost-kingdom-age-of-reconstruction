# Playable Runtime Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a playable portrait idle RPG web runtime with combat, village growth, heroes, equipment, monetization mock, local save, and long-term login rewards.

**Architecture:** A deterministic runtime core is shared by Node tests and browser UI through a UMD module. Browser code renders a mobile shell, canvas combat, and interactive panels using generated runtime data.

**Tech Stack:** Vanilla JavaScript, Node test runner, HTML/CSS/canvas, localStorage, Android emulator via Chrome.

---

### Task 1: Runtime Data

**Files:**
- Create: `tools/build-runtime-data.cjs`
- Create: `web-game/runtime-data.json`
- Test: `tests/web-game-runtime.test.cjs`

- [ ] Write failing tests for generated runtime data counts and asset URLs.
- [ ] Implement runtime data builder from `Assets/Data/Tables`.
- [ ] Add `build:game` script.

### Task 2: Runtime Core

**Files:**
- Create: `web-game/runtime-core.js`
- Test: `tests/web-game-runtime.test.cjs`

- [ ] Write failing tests for initial state, combat tick, victory rewards, offline rewards, building upgrades, hero upgrades, equipment equip, ad rewards, purchase mock, and day 7/day 30 login rewards.
- [ ] Implement deterministic state and action API.
- [ ] Export UMD module for Node and browser.

### Task 3: Playable Web App

**Files:**
- Create: `web-game/index.html`
- Create: `web-game/styles.css`
- Create: `web-game/app.js`
- Create: `web-game/manifest.webmanifest`
- Create: `web-game/sw.js`
- Create: `tools/serve-game.cjs`
- Modify: `package.json`

- [ ] Build portrait mobile shell with canvas combat and bottom tabs.
- [ ] Bind runtime actions to UI controls.
- [ ] Add localStorage save/load and PWA metadata.
- [ ] Add server script reachable from Android emulator.

### Task 4: Verification

**Files:**
- Modify: `progress.md`

- [ ] Run `npm run check`.
- [ ] Run web-game tests.
- [ ] Serve game and verify PC browser with Playwright.
- [ ] Verify Android emulator URL and screenshot.
- [ ] Review screenshots and fix visible quality problems.
