const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const { parseCatalog, buildTables } = require('../tools/catalogData.cjs');

const rootDir = path.resolve(__dirname, '..');
const catalogPath = path.join(rootDir, 'docs', 'CONTENT_CATALOG.md');
const catalogMarkdown = fs.readFileSync(catalogPath, 'utf8');

test('buildTables includes retention and growth upgrade tables', () => {
  const tables = buildTables(parseCatalog(catalogMarkdown));

  assert.equal(tables.retentionHooks.length, 12);
  assert.equal(tables.liveEvents.length, 8);
  assert.equal(tables.storeExperiments.length, 8);
  assert.equal(tables.analyticsEvents.length, 28);
});

test('growth upgrade tables include the core launch priorities', () => {
  const tables = buildTables(parseCatalog(catalogMarkdown));
  const retentionHookIds = new Set(tables.retentionHooks.map((entry) => entry.id));
  const liveEventIds = new Set(tables.liveEvents.map((entry) => entry.id));
  const storeExperimentIds = new Set(tables.storeExperiments.map((entry) => entry.id));
  const analyticsEventIds = new Set(tables.analyticsEvents.map((entry) => entry.id));

  assert.ok(retentionHookIds.has('retention_first_10_minute_kingdom_rebuild'));
  assert.ok(retentionHookIds.has('retention_return_kingdom_report'));
  assert.ok(retentionHookIds.has('retention_comeback_rescue'));

  assert.ok(liveEventIds.has('event_ruin_rebuild_week'));
  assert.ok(liveEventIds.has('event_abyss_rift_weekend'));

  assert.ok(storeExperimentIds.has('store_google_icon_castle_progression'));
  assert.ok(storeExperimentIds.has('store_apple_in_app_event_rebuild_week'));

  assert.ok(analyticsEventIds.has('analytics_first_boss_clear'));
  assert.ok(analyticsEventIds.has('analytics_d1_return'));
});
