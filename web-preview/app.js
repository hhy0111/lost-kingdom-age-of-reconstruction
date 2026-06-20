const app = document.getElementById('app');

const tabLabels = ['마을', '전투', '영웅', '장비', '상점'];

function formatNumber(value) {
  return new Intl.NumberFormat('ko-KR').format(value);
}

function formatKrw(value) {
  return `${formatNumber(value)}원`;
}

function formatProductType(type) {
  const labels = {
    consumable: '소모품',
    non_consumable: '영구 상품',
    subscription: '구독',
    season_pass: '시즌 패스',
  };
  return labels[type] || type;
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text !== undefined) {
    element.textContent = text;
  }
  return element;
}

function imageCard(item, options = {}) {
  const card = createElement('article', `asset-card ${options.compact ? 'compact' : ''}`);
  const media = createElement('div', 'asset-media');
  const img = document.createElement('img');
  img.src = item.assetUrl;
  img.alt = item.name || item.id;
  img.loading = 'eager';
  media.appendChild(img);

  const name = createElement('strong', 'asset-name', item.name || item.id);
  const meta = createElement('span', 'asset-meta', item.role || item.rarity || item.category || item.id);
  card.append(media, name, meta);
  return card;
}

function metricCard(label, value, tone = '') {
  const card = createElement('article', `metric ${tone}`);
  card.append(createElement('span', 'metric-label', label));
  card.append(createElement('strong', 'metric-value', value));
  return card;
}

function listItem(title, detail) {
  const item = createElement('li', 'data-row');
  item.append(createElement('strong', '', title));
  item.append(createElement('span', '', detail));
  return item;
}

function renderHeader(data) {
  const header = createElement('header', 'topbar');
  const titleBox = createElement('div', 'title-box');
  titleBox.append(createElement('strong', 'game-title', data.project.title));
  titleBox.append(createElement('span', 'game-subtitle', data.project.subtitle));

  const status = createElement('div', 'resource-strip');
  status.append(metricCard('골드', '12.8M', 'gold'));
  status.append(metricCard('다이아', '4,260', 'diamond'));
  status.append(metricCard('전투력', '986K', 'power'));
  header.append(titleBox, status);
  return header;
}

function renderOverview(data) {
  const section = createElement('section', 'overview');
  const art = data.featured.village[4] || data.featured.village[0];
  const hero = data.featured.heroes.stages[2] || data.featured.heroes.stages[0];

  const visual = createElement('div', 'overview-visual');
  for (const item of [art, hero].filter(Boolean)) {
    const img = document.createElement('img');
    img.src = item.assetUrl;
    img.alt = item.name;
    img.loading = 'eager';
    visual.appendChild(img);
  }

  const details = createElement('div', 'overview-details');
  details.append(createElement('span', 'stage-pill', '폐허 > 마을 > 도시 > 왕국 > 제국'));
  details.append(createElement('h1', '', '현재 제작 완성도'));
  details.append(
    createElement(
      'p',
      '',
      `${formatNumber(data.completion.assets.applied)}개 아트 자산과 핵심 데이터 테이블이 웹 프리뷰에 연결되었습니다.`
    )
  );

  const metrics = createElement('div', 'metric-grid');
  metrics.append(metricCard('아트', formatNumber(data.completion.assets.applied), 'gold'));
  metrics.append(metricCard('몬스터', formatNumber(data.completion.content.monsters), 'danger'));
  metrics.append(metricCard('영웅', formatNumber(data.completion.content.heroes), 'diamond'));
  metrics.append(metricCard('장비', formatNumber(data.completion.content.equipment), 'power'));
  details.append(metrics);

  section.append(details, visual);
  return section;
}

function renderVillage(data) {
  const root = createElement('section', 'tab-panel');
  root.append(createElement('h2', '', '왕국 복구'));
  root.append(createElement('p', 'section-copy', '건물 레벨별 이미지와 마을 성장 흐름을 한 화면에서 확인합니다.'));

  const gallery = createElement('div', 'asset-grid buildings');
  data.featured.village.forEach((item) => gallery.appendChild(imageCard(item)));
  root.append(gallery);

  const rows = createElement('ul', 'data-list');
  rows.append(listItem('건물 종류', `${data.completion.content.buildingTypes}종`));
  rows.append(listItem('건물 레벨 이미지', `${data.completion.content.buildingAssetLevels}개`));
  rows.append(listItem('지역 진행', `${data.completion.content.regions}개 지역`));
  root.append(rows);
  return root;
}

function renderCombat(data) {
  const root = createElement('section', 'tab-panel');
  root.append(createElement('h2', '', '전투 콘텐츠'));

  const environments = createElement('div', 'asset-strip');
  data.featured.combat.environments.forEach((item) => environments.appendChild(imageCard(item, { compact: true })));
  root.append(environments);

  const monsters = createElement('div', 'asset-grid monsters');
  data.featured.combat.monsters.forEach((item) => monsters.appendChild(imageCard(item)));
  root.append(createElement('h3', '', '초반 몬스터'));
  root.append(monsters);

  const bosses = createElement('div', 'asset-grid bosses');
  data.featured.combat.bosses.forEach((item) => bosses.appendChild(imageCard(item)));
  root.append(createElement('h3', '', '보스'));
  root.append(bosses);
  return root;
}

function renderHeroes(data) {
  const root = createElement('section', 'tab-panel');
  root.append(createElement('h2', '', '영웅 성장'));

  const stages = createElement('div', 'hero-stage-grid');
  data.featured.heroes.stages.forEach((item) => stages.appendChild(imageCard(item)));
  root.append(stages);

  const roster = createElement('ul', 'data-list roster');
  data.featured.heroes.roster.forEach((hero) => {
    roster.append(listItem(`${hero.name} · ${hero.rarity}`, `${hero.role} / ${hero.skillName}`));
  });
  root.append(roster);
  return root;
}

function renderEquipment(data) {
  const root = createElement('section', 'tab-panel');
  root.append(createElement('h2', '', '장비 파밍'));

  const gallery = createElement('div', 'asset-grid equipment');
  data.featured.equipment.forEach((item) => gallery.appendChild(imageCard(item, { compact: true })));
  root.append(gallery);

  const effects = createElement('div', 'asset-strip effects');
  data.featured.effects.forEach((item) => effects.appendChild(imageCard(item, { compact: true })));
  root.append(createElement('h3', '', '전투 이펙트'));
  root.append(effects);
  return root;
}

function renderShop(data) {
  const root = createElement('section', 'tab-panel');
  root.append(createElement('h2', '', '상점 / 광고 / 결제'));

  const monetization = createElement('div', 'metric-grid');
  monetization.append(metricCard('광고 지면', `${data.monetization.ads.total}개`, 'gold'));
  monetization.append(metricCard('강제 광고', `${data.monetization.ads.forcedAds}개`, 'danger'));
  monetization.append(metricCard('IAP 상품', `${data.monetization.iapProducts.length}개`, 'diamond'));
  monetization.append(metricCard('리텐션 훅', `${data.retention.hooks.length}개`, 'power'));
  root.append(monetization);

  const products = createElement('ul', 'data-list');
  const shopProductsById = new Map(data.monetization.shopProducts.map((product) => [product.id, product]));
  data.monetization.iapProducts.forEach((product) => {
    const shopProduct = shopProductsById.get(product.shopProductId);
    const title = shopProduct?.name || product.shopProductId || product.id;
    products.append(listItem(title, `${formatProductType(product.productType)} / ${formatKrw(product.priceKrw)}`));
  });
  root.append(products);
  return root;
}

const renderers = {
  village: renderVillage,
  combat: renderCombat,
  heroes: renderHeroes,
  equipment: renderEquipment,
  shop: renderShop,
};

function renderApp(data) {
  let activeTab = 'village';

  app.textContent = '';
  const shell = createElement('div', 'phone-shell');
  const content = createElement('div', 'content');
  const panelMount = createElement('div', 'panel-mount');
  const nav = createElement('nav', 'bottom-nav');

  function switchTab(tabId) {
    activeTab = tabId;
    panelMount.textContent = '';
    panelMount.appendChild(renderers[activeTab](data));

    for (const button of nav.querySelectorAll('button')) {
      button.classList.toggle('active', button.dataset.tab === activeTab);
    }
  }

  data.navigation.forEach((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.tab = item.id;
    button.setAttribute('aria-label', tabLabels[index]);

    const img = document.createElement('img');
    img.src = item.icon;
    img.alt = '';
    img.loading = 'eager';
    const span = createElement('span', '', tabLabels[index]);
    button.append(img, span);
    button.addEventListener('click', () => switchTab(item.id));
    nav.appendChild(button);
  });

  content.append(renderHeader(data), renderOverview(data), panelMount);
  shell.append(content, nav);
  app.appendChild(shell);
  switchTab(activeTab);
}

async function boot() {
  try {
    const response = await fetch('preview-data.json');
    if (!response.ok) {
      throw new Error(`preview-data.json ${response.status}`);
    }
    renderApp(await response.json());
  } catch (error) {
    app.innerHTML = `<section class="loading error"><strong>프리뷰 데이터를 불러오지 못했습니다.</strong><span>${error.message}</span></section>`;
  }
}

boot();
