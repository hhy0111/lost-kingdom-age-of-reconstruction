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
