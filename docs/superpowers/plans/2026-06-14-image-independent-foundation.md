# Image Independent Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the image-independent foundation for `잃어버린 왕국 : 재건의 시대`: data generation, validation, Unity-ready folder structure, and generated JSON tables.

**Architecture:** Keep the source of truth in `docs/CONTENT_CATALOG.md` and generate runtime data tables from it. Use Node's built-in test runner so this works before a Unity project exists. Generated data lives under `Assets/Data/Tables`.

**Tech Stack:** Node.js 20 built-in `node:test`, CommonJS tools, JSON tables for Unity ingestion, Unity-style `Assets/` folder layout.

---

## File Structure

- Create `package.json`: project scripts for test, data generation, data validation, and full checks.
- Create `tests/catalog-data.test.cjs`: test-first coverage for catalog parsing and generated table shape.
- Create `tools/catalogData.cjs`: parser and table builder for regions, monsters, bosses, heroes, equipment, buildings, currencies, ads, and products.
- Create `tools/build-data.cjs`: writes generated JSON tables to `Assets/Data/Tables`.
- Create `tools/validate-data.cjs`: verifies generated tables exist, counts match design, IDs are unique, and required references are valid.
- Create `Assets/Data/Tables/*.json`: generated image-independent game data.
- Create Unity-ready folder placeholders under `Assets/Art`, `Assets/Audio`, `Assets/Prefabs`, `Assets/Scenes`, `Assets/Scripts`, and `Assets/Addressables`.
- Create `.gitignore`: Unity, Node, generated temp, and `.superpowers` ignore rules.

---

### Task 1: Test Harness And Catalog Parser

**Files:**
- Create: `package.json`
- Create: `tests/catalog-data.test.cjs`
- Create: `tools/catalogData.cjs`

- [ ] **Step 1: Write the failing test**

Create `tests/catalog-data.test.cjs` with tests that import `parseCatalog` and `buildTables`, then assert:

- 8 regions
- 104 monsters
- 32 bosses
- 50 heroes
- 20 equipment sets
- 200 equipment items
- 12 buildings
- 6 currencies
- 10 ad placements
- 7 shop products

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/catalog-data.test.cjs`

Expected: fail because `tools/catalogData.cjs` does not exist yet.

- [ ] **Step 3: Implement parser and table builder**

Create `tools/catalogData.cjs` with:

- `parseCatalog(markdown)` for extracting catalog tables from Markdown.
- `buildTables(parsed)` for creating normalized JSON-friendly records.
- Stable IDs such as `region_grassland`, `monster_001`, `boss_001`, `hero_001`, `equipment_001`.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/catalog-data.test.cjs`

Expected: all tests pass.

---

### Task 2: Data Generation And Validation

**Files:**
- Create: `tools/build-data.cjs`
- Create: `tools/validate-data.cjs`
- Generate: `Assets/Data/Tables/*.json`

- [ ] **Step 1: Write generated table files**

Run: `node tools/build-data.cjs`

Expected output includes generated counts for:

- `regions.json`: 8
- `monsters.json`: 104
- `bosses.json`: 32
- `heroes.json`: 50
- `equipment_sets.json`: 20
- `equipment.json`: 200
- `buildings.json`: 12
- `currencies.json`: 6
- `ad_placements.json`: 10
- `shop_products.json`: 7

- [ ] **Step 2: Validate generated data**

Run: `node tools/validate-data.cjs`

Expected: `DATA VALIDATION PASSED`.

- [ ] **Step 3: Add package scripts**

Add scripts:

```json
{
  "test": "node --test tests/*.test.cjs",
  "build:data": "node tools/build-data.cjs",
  "validate:data": "node tools/validate-data.cjs",
  "check": "npm test && npm run build:data && npm run validate:data"
}
```

- [ ] **Step 4: Run full check**

Run: `npm run check`

Expected: tests pass, data builds, data validation passes.

---

### Task 3: Unity-Ready Project Skeleton

**Files:**
- Create: Unity-style folder placeholders under `Assets/`
- Create: `.gitignore`

- [ ] **Step 1: Create folder placeholders**

Create `.gitkeep` files in these directories:

```text
Assets/Art/Characters
Assets/Art/Monsters
Assets/Art/Equipment
Assets/Art/Buildings
Assets/Art/UI
Assets/Art/Effects
Assets/Art/Environment
Assets/Audio/BGM
Assets/Audio/SFX
Assets/Data/ScriptableObjects
Assets/Prefabs/Combat
Assets/Prefabs/Village
Assets/Prefabs/UI
Assets/Prefabs/Effects
Assets/Scenes
Assets/Scripts/Core
Assets/Scripts/Combat
Assets/Scripts/Economy
Assets/Scripts/Hero
Assets/Scripts/Equipment
Assets/Scripts/Village
Assets/Scripts/Research
Assets/Scripts/Expedition
Assets/Scripts/Monetization
Assets/Scripts/UI
Assets/Addressables
```

- [ ] **Step 2: Add `.gitignore`**

Ignore Unity generated directories, Node dependencies, OS clutter, and `.superpowers/`.

- [ ] **Step 3: Verify skeleton**

Run: `Get-ChildItem -Recurse -File Assets | Measure-Object`

Expected: generated JSON files and `.gitkeep` placeholders are present.

