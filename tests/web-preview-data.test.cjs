const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const { buildPreviewData } = require('../tools/webPreviewData.cjs');

const rootDir = path.resolve(__dirname, '..');

test('buildPreviewData summarizes current game completeness for the web preview', () => {
  const data = buildPreviewData(rootDir);

  assert.equal(data.project.title, '잃어버린 왕국 : 재건의 시대');
  assert.equal(data.project.orientation, 'portrait-mobile');
  assert.equal(data.completion.assets.applied, 435);
  assert.equal(data.completion.assets.categories.monster, 104);
  assert.equal(data.completion.content.monsters, 104);
  assert.equal(data.completion.content.bosses, 32);
  assert.equal(data.completion.content.heroes, 50);
  assert.equal(data.completion.content.equipment, 200);
  assert.equal(data.completion.content.buildingAssetLevels, 60);

  assert.deepEqual(
    data.navigation.map((item) => item.label),
    ['마을', '전투', '영웅', '장비', '상점']
  );

  assert.equal(data.featured.village.length, 8);
  assert.equal(data.featured.combat.monsters.length, 8);
  assert.equal(data.featured.combat.bosses.length, 4);
  assert.equal(data.featured.equipment.length, 12);
  assert.equal(data.featured.effects.length, 6);
  assert.match(data.featured.village[0].assetUrl, /^\/Assets\/Art\/Buildings\/building_001\.png$/);
  assert.match(data.featured.combat.monsters[0].assetUrl, /^\/Assets\/Art\/Monsters\/monster_001\.png$/);

  assert.equal(data.economy.currencies.length, 6);
  assert.equal(data.monetization.ads.total, 10);
  assert.equal(data.monetization.ads.forcedAds, 0);
  assert.equal(data.monetization.iapProducts.length, 7);
  assert.ok(data.retention.hooks.length >= 8);
});

test('preview data can be serialized to the browser payload path', () => {
  const data = buildPreviewData(rootDir);
  const serialized = JSON.stringify(data, null, 2);

  assert.doesNotThrow(() => JSON.parse(serialized));
  assert.ok(serialized.includes('"completion"'));
  assert.ok(serialized.includes('"잃어버린 왕국 : 재건의 시대"'));
});

test('static web preview files expose the mobile dashboard shell', () => {
  const indexPath = path.join(rootDir, 'web-preview', 'index.html');
  const appPath = path.join(rootDir, 'web-preview', 'app.js');
  const stylesPath = path.join(rootDir, 'web-preview', 'styles.css');
  const serverPath = path.join(rootDir, 'tools', 'serve-preview.cjs');

  assert.ok(fs.existsSync(indexPath), 'web-preview/index.html is missing');
  assert.ok(fs.existsSync(appPath), 'web-preview/app.js is missing');
  assert.ok(fs.existsSync(stylesPath), 'web-preview/styles.css is missing');
  assert.ok(fs.existsSync(serverPath), 'tools/serve-preview.cjs is missing');

  const index = fs.readFileSync(indexPath, 'utf8');
  const app = fs.readFileSync(appPath, 'utf8');
  const styles = fs.readFileSync(stylesPath, 'utf8');
  const server = fs.readFileSync(serverPath, 'utf8');

  assert.match(index, /id="app"/);
  assert.match(app, /fetch\('preview-data\.json'\)/);
  for (const label of ['마을', '전투', '영웅', '장비', '상점']) {
    assert.match(app, new RegExp(label));
  }
  assert.doesNotMatch(app, /loading = 'lazy'/);
  assert.match(app, /shopProductsById/);
  assert.doesNotMatch(app, /listItem\(product\.id/);
  assert.match(styles, /max-width:\s*430px/);
  assert.match(server, /createServer/);
  assert.match(server, /favicon\.ico/);
  assert.match(server, /process\.env\.HOST/);
  assert.match(server, /0\.0\.0\.0/);
  assert.doesNotMatch(server, /listen\(port,\s*'127\.0\.0\.1'/);
  assert.match(styles, /height:\s*min\(900px,\s*calc\(100dvh - 36px\)\)/);
  assert.doesNotMatch(styles, /min-height:\s*min\(900px,\s*calc\(100vh - 36px\)\)/);
});
