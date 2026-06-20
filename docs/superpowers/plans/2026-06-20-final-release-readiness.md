# Final Release Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a final Android+iOS production release plan and enforce local payment/ad readiness with an automated validation gate.

**Architecture:** Keep `Assets/Data/Tables/` as the source of truth for IAP, rewarded ads, purchase rules, and analytics. Add a small Node validator that reads the generated tables and final release documents, then reports catalog or documentation drift before store submission work proceeds.

**Tech Stack:** Node.js test runner, CommonJS tools, existing JSON data tables, Markdown release documents, Unity IAP and Unity LevelPlay as production integration targets.

---

### Task 1: Add Final Release Readiness Test

**Files:**
- Create: `tests/release-readiness.test.cjs`

- [ ] **Step 1: Write the failing test**

```js
const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');

const { validateReleaseReadiness } = require('../tools/releaseReadiness.cjs');

const rootDir = path.resolve(__dirname, '..');

test('final launch readiness covers both stores, billing, ads, privacy, and QA gates', () => {
  const result = validateReleaseReadiness(rootDir);

  assert.equal(result.ok, true, result.errors.join('\n'));
  assert.equal(result.summary.iapProducts, 7);
  assert.equal(result.summary.rewardedAdPlacements, 10);
  assert.equal(result.summary.requiredDocs, 6);
  assert.deepEqual(result.summary.platforms, ['app_store', 'google_play']);
  assert.ok(result.summary.officialReferenceCount >= 8);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
node --test tests/release-readiness.test.cjs
```

Expected: FAIL with `Cannot find module '../tools/releaseReadiness.cjs'`.

- [ ] **Step 3: Commit**

This workspace is not a git repository, so record the file change in the final response instead of committing.

### Task 2: Implement Release Readiness Validator

**Files:**
- Create: `tools/releaseReadiness.cjs`
- Create: `tools/validate-release-readiness.cjs`

- [ ] **Step 1: Implement the validator module**

Create `tools/releaseReadiness.cjs` with:

```js
const fs = require('node:fs');
const path = require('node:path');

const REQUIRED_DOCS = [
  'docs/FINAL_RELEASE_MASTER_PLAN.md',
  'docs/MONETIZATION_PRODUCTION_READINESS.md',
  'docs/superpowers/specs/2026-06-20-final-release-readiness-design.md',
  'docs/superpowers/plans/2026-06-20-final-release-readiness.md',
];

function readJson(rootDir, relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), 'utf8'));
}

function validateReleaseReadiness(rootDir) {
  const errors = [];
  const iapProducts = readJson(rootDir, 'Assets/Data/Tables/iap_products.json');
  const adPlacements = readJson(rootDir, 'Assets/Data/Tables/ad_placements.json');

  for (const relativePath of REQUIRED_DOCS) {
    if (!fs.existsSync(path.join(rootDir, relativePath))) {
      errors.push(`missing release readiness document: ${relativePath}`);
    }
  }

  for (const product of iapProducts) {
    if (!/^lostkingdom\./.test(product.googlePlayProductId)) {
      errors.push(`${product.id} has invalid Google Play product id`);
    }
    if (!/^com\.lostkingdom\./.test(product.appleProductId)) {
      errors.push(`${product.id} has invalid Apple product id`);
    }
  }

  for (const placement of adPlacements) {
    if (placement.format !== 'rewarded') errors.push(`${placement.id} must be rewarded`);
    if (placement.isForced !== false) errors.push(`${placement.id} must not be forced`);
  }

  return {
    ok: errors.length === 0,
    errors,
    summary: {
      platforms: ['app_store', 'google_play'],
      requiredDocs: REQUIRED_DOCS.length,
      officialReferenceCount: 0,
      iapProducts: iapProducts.length,
      rewardedAdPlacements: adPlacements.length,
    },
  };
}

module.exports = { validateReleaseReadiness };
```

- [ ] **Step 2: Expand validator checks**

Add checks for:

- Required official reference URLs.
- Duplicate product IDs.
- Google and Apple product ID patterns.
- Positive KRW prices.
- Fulfillment and restore policies.
- Rewarded-only ad placements.
- No forced ads.
- Positive daily limits.
- Non-negative cooldowns.
- Reward policies containing `completed_view`.
- Required purchase validation rules.
- Required monetization analytics events.

- [ ] **Step 3: Add CLI wrapper**

Create `tools/validate-release-readiness.cjs`:

```js
const path = require('node:path');
const { validateReleaseReadiness } = require('./releaseReadiness.cjs');

const result = validateReleaseReadiness(path.resolve(__dirname, '..'));

if (!result.ok) {
  console.error('RELEASE READINESS VALIDATION FAILED');
  for (const error of result.errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(JSON.stringify(result.summary, null, 2));
```

- [ ] **Step 4: Run targeted test**

Run:

```bash
node --test tests/release-readiness.test.cjs
```

Expected: FAIL until the required release documents exist, then PASS.

### Task 3: Add Final Release Documents

**Files:**
- Create: `docs/FINAL_RELEASE_MASTER_PLAN.md`
- Create: `docs/MONETIZATION_PRODUCTION_READINESS.md`
- Create: `docs/superpowers/specs/2026-06-20-final-release-readiness-design.md`

- [ ] **Step 1: Write final release master plan**

Include these sections:

```markdown
# Lost Kingdom Final Release Master Plan

## Current Baseline
## Final Release Definition
## Official Requirements
## Gate 1: Unity Production Project
## Gate 2: Store Catalog
## Gate 3: Billing Implementation
## Gate 4: Rewarded Ads
## Gate 5: Privacy, Policy, And Review
## Gate 6: QA Matrix
## Gate 7: Store Assets
## Gate 8: Release Decision
## Local Automation
```

- [ ] **Step 2: Write monetization production readiness guide**

Include these sections:

```markdown
# Monetization Production Readiness

## Production Rule
## IAP Catalog
## Store Console Setup
## Purchase Flow Contract
## Rewarded Ad Catalog
## LevelPlay Setup
## Remove Ads Entitlement
## Randomized Rewards And Odds
## Privacy And Data Declarations
## Required Analytics Events
## Production Test Matrix
## Local Validation
```

- [ ] **Step 3: Write design spec**

Include current context, approaches considered, selected design, monetization contract, compliance contract, files, error handling, testing, completion criteria, and self-review.

- [ ] **Step 4: Run unfinished-marker scan**

Run:

```bash
npm run validate:release
```

Expected: no unfinished-marker error.

### Task 4: Wire Validator Into Project Scripts

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add release validation script**

Change scripts to include:

```json
"validate:release": "node tools/validate-release-readiness.cjs"
```

- [ ] **Step 2: Add release readiness test to test command**

Append:

```text
tests/release-readiness.test.cjs
```

to the existing `test` script.

- [ ] **Step 3: Add release validator to full check**

Append:

```text
&& npm run validate:release
```

to the existing `check` script after `npm run build:game`.

- [ ] **Step 4: Run package script check**

Run:

```bash
npm run validate:release
```

Expected: JSON summary with `app_store`, `google_play`, 7 IAP products, and 10 rewarded ad placements.

### Task 5: Verify Full Readiness

**Files:**
- Read: `package.json`
- Read: `docs/FINAL_RELEASE_MASTER_PLAN.md`
- Read: `docs/MONETIZATION_PRODUCTION_READINESS.md`
- Read: `tools/releaseReadiness.cjs`

- [ ] **Step 1: Run targeted release test**

Run:

```bash
node --test tests/release-readiness.test.cjs
```

Expected: PASS.

- [ ] **Step 2: Run release validator**

Run:

```bash
npm run validate:release
```

Expected: PASS with JSON summary.

- [ ] **Step 3: Run full project check**

Run:

```bash
npm run check
```

Expected: PASS, including tests, data build, data validation, prompt build, prompt validation, asset validation, preview build, game build, and release readiness validation.

- [ ] **Step 4: Record external gates**

In the final response, state that local readiness is complete and that Play Console, App Store Connect, LevelPlay dashboard, signing, native device sandbox testing, and submission remain external account actions outside this repository.
