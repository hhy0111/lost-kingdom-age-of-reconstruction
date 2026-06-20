const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const rootDir = path.resolve(__dirname, '..');

test('privacy policy html is available for store submission and in-app linking', () => {
  const policyPath = path.join(rootDir, 'web-game/privacy-policy.html');
  const docsPolicyPath = path.join(rootDir, 'docs/privacy-policy.html');
  const html = fs.readFileSync(policyPath, 'utf8');
  const docsHtml = fs.readFileSync(docsPolicyPath, 'utf8');

  assert.match(html, /<html lang="ko">/);
  assert.match(html, /<title>Lost Kingdom 개인정보처리방침<\/title>/);
  assert.match(html, /young02hwi@gmail\.com/);
  assert.match(html, /Google AdMob/);
  assert.match(html, /2026-06-20/);

  for (const section of [
    '개인정보처리방침',
    '처리하는 개인정보 항목',
    '개인정보의 이용 목적',
    '제3자 제공 및 처리위탁',
    '보관 기간 및 파기',
    '이용자 권리와 선택',
    '아동의 개인정보',
    '문의',
  ]) {
    assert.match(html, new RegExp(section));
  }

  assert.doesNotMatch(html, /\b(TBD|TODO|FIXME|INSERT|example\.com)\b/i);

  const indexHtml = fs.readFileSync(path.join(rootDir, 'web-game/index.html'), 'utf8');
  assert.match(indexHtml, /rel="privacy-policy" href="privacy-policy\.html"/);

  const serviceWorker = fs.readFileSync(path.join(rootDir, 'web-game/sw.js'), 'utf8');
  assert.match(serviceWorker, /lost-kingdom-runtime-v26/);
  assert.match(serviceWorker, /\/web-game\/privacy-policy\.html/);

  assert.match(docsHtml, /<html lang="ko">/);
  assert.match(docsHtml, /<title>Lost Kingdom 개인정보처리방침<\/title>/);
  assert.match(docsHtml, /young02hwi@gmail\.com/);
  assert.match(docsHtml, /Google AdMob/);
  assert.match(docsHtml, /2026-06-20/);
  assert.doesNotMatch(docsHtml, /\b(TBD|TODO|FIXME|INSERT|example\.com)\b/i);
});
