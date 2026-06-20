# Web Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local browser preview that shows current project completeness using the generated data tables and applied image assets.

**Architecture:** Generate a compact `web-preview/preview-data.json` from existing `Assets/Data/Tables/*.json` and `Assets/Art/**` files. Serve a static mobile-first dashboard from `web-preview/index.html` with no build framework and a tiny Node static server.

**Tech Stack:** Node.js CommonJS scripts, Node test runner, static HTML/CSS/JavaScript, local HTTP server, Playwright/browser verification.

---

### Task 1: Preview Data Builder

**Files:**
- Create: `tests/web-preview-data.test.cjs`
- Create: `tools/webPreviewData.cjs`
- Create: `tools/build-preview-data.cjs`
- Modify: `package.json`

- [ ] **Step 1: Write the failing test**

Create `tests/web-preview-data.test.cjs` with assertions that `buildPreviewData(rootDir)` returns project counts, category counts, featured asset paths, economy/monetization summaries, and tab metadata for the mobile preview.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/web-preview-data.test.cjs`
Expected: FAIL with `Cannot find module '../tools/webPreviewData.cjs'`.

- [ ] **Step 3: Write minimal implementation**

Create `tools/webPreviewData.cjs` with:
- `loadJson(rootDir, relativePath)`
- `assetUrl(outputPath)`
- `byCategory(records)`
- `takeCategoryAssets(records, category, limit)`
- `buildPreviewData(rootDir)`

Create `tools/build-preview-data.cjs` to write `web-preview/preview-data.json`.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/web-preview-data.test.cjs`
Expected: PASS.

- [ ] **Step 5: Add npm scripts**

Add `build:preview` and include the new test in `npm test`.

### Task 2: Static Web App

**Files:**
- Create: `web-preview/index.html`
- Create: `web-preview/styles.css`
- Create: `web-preview/app.js`
- Create: `tools/serve-preview.cjs`

- [ ] **Step 1: Write the failing smoke test**

Extend `tests/web-preview-data.test.cjs` to assert the static app files exist and contain the root mount, `preview-data.json` fetch, and bottom navigation labels.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/web-preview-data.test.cjs`
Expected: FAIL because the static app files do not exist.

- [ ] **Step 3: Create static app files**

Create a vertical mobile dashboard with:
- Top resource/status bar.
- Bottom tabs: 마을, 전투, 영웅, 장비, 상점.
- A completion overview.
- Asset gallery sections.
- Data summaries for regions, monsters, bosses, heroes, equipment, buildings, ads, IAP, retention.

- [ ] **Step 4: Create static server**

Create `tools/serve-preview.cjs` using Node `http`, serve project files from the repository root, and default to port `5173`.

- [ ] **Step 5: Run smoke tests**

Run: `node --test tests/web-preview-data.test.cjs`
Expected: PASS.

### Task 3: Verification and Browser Check

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Build preview data**

Run: `npm run build:preview`
Expected: writes `web-preview/preview-data.json`.

- [ ] **Step 2: Run full checks**

Run: `npm run check`
Expected: tests, data validation, prompt validation, asset validation, and preview data build all pass.

- [ ] **Step 3: Start server**

Run: `node tools/serve-preview.cjs` or start it in a hidden background PowerShell process.
Expected: local URL `http://localhost:5173/web-preview/`.

- [ ] **Step 4: Browser verification**

Open `http://localhost:5173/web-preview/`, verify the dashboard renders, navigation tabs switch sections, images load, and no major console/page errors block the preview.

### Plan Self-Review

- Spec coverage: The plan covers browser preview, data aggregation, asset display, local server, and direct verification.
- Placeholder scan: No TBD/TODO placeholders.
- Type consistency: `buildPreviewData(rootDir)` and `web-preview/preview-data.json` are used consistently across tasks.
- Scope: Static local preview only; not a Unity runtime or production web game.
