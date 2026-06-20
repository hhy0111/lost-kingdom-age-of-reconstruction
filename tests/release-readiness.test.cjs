const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
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

test('release readiness rejects rewarded ads without production AdMob identifiers', () => {
  const fixtureDir = fs.mkdtempSync(path.join(os.tmpdir(), 'lost-kingdom-release-'));
  fs.mkdirSync(path.join(fixtureDir, 'web-game'), { recursive: true });
  fs.mkdirSync(path.join(fixtureDir, 'Assets', 'Data'), { recursive: true });
  fs.cpSync(path.join(rootDir, 'docs'), path.join(fixtureDir, 'docs'), { recursive: true });
  fs.cpSync(path.join(rootDir, 'web-game', 'privacy-policy.html'), path.join(fixtureDir, 'web-game', 'privacy-policy.html'), { recursive: true });
  fs.cpSync(path.join(rootDir, 'Assets', 'Data', 'Tables'), path.join(fixtureDir, 'Assets', 'Data', 'Tables'), { recursive: true });

  const adPlacementsPath = path.join(fixtureDir, 'Assets', 'Data', 'Tables', 'ad_placements.json');
  const adPlacements = JSON.parse(fs.readFileSync(adPlacementsPath, 'utf8')).map((placement) => {
    const { adProvider, adUnitName, androidAdMobAppId, androidAdMobAdUnitId, ...rest } = placement;
    return rest;
  });
  fs.writeFileSync(adPlacementsPath, JSON.stringify(adPlacements, null, 2));

  const result = validateReleaseReadiness(fixtureDir);

  assert.equal(result.ok, false);
  assert.match(result.errors.join('\n'), /production AdMob provider/);
  assert.match(result.errors.join('\n'), /androidAdMobAppId/);
  assert.match(result.errors.join('\n'), /androidAdMobAdUnitId/);
});
