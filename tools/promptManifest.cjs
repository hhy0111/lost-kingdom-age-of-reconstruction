const CATEGORY_BY_HEADING = {
  '## 1순위: UI 아이콘': {
    category: 'ui_icon',
    outputDir: 'Assets/Art/UI',
    prefix: 'ui_icon',
  },
  '## 2순위: 재화 아이콘': {
    category: 'currency_icon',
    outputDir: 'Assets/Art/UI/Currencies',
    prefix: 'currency_icon',
  },
  '## 3순위: 주인공': {
    category: 'main_hero',
    outputDir: 'Assets/Art/Characters/Heroes',
    prefix: 'main_hero',
  },
  '## 4순위: 몬스터': {
    category: 'monster',
    outputDir: 'Assets/Art/Monsters',
    prefix: 'monster',
  },
  '## 5순위: 보스': {
    category: 'boss',
    outputDir: 'Assets/Art/Monsters/Bosses',
    prefix: 'boss',
  },
  '## 6순위: 장비': {
    category: 'equipment',
    outputDir: 'Assets/Art/Equipment',
    prefix: 'equipment',
  },
  '## 7순위: 건물': {
    category: 'building',
    outputDir: 'Assets/Art/Buildings',
    prefix: 'building',
  },
  '## 8순위: 이펙트': {
    category: 'effect',
    outputDir: 'Assets/Art/Effects',
    prefix: 'effect',
  },
  '## 9순위: 배경 오브젝트': {
    category: 'environment',
    outputDir: 'Assets/Art/Environment',
    prefix: 'environment',
  },
};

const SECTION_HEADINGS = Object.keys(CATEGORY_BY_HEADING);

function parsePromptDocument(markdown) {
  const lines = markdown.split(/\r?\n/);
  const entries = [];
  let currentSection = null;
  let currentTitle = null;
  let inCodeBlock = false;
  let promptLines = [];

  for (const line of lines) {
    if (SECTION_HEADINGS.includes(line.trim())) {
      currentSection = CATEGORY_BY_HEADING[line.trim()];
      currentTitle = null;
      inCodeBlock = false;
      promptLines = [];
      continue;
    }

    if (line.startsWith('## ') && !SECTION_HEADINGS.includes(line.trim())) {
      currentSection = null;
      currentTitle = null;
      inCodeBlock = false;
      promptLines = [];
      continue;
    }

    if (!currentSection) {
      continue;
    }

    if (line.startsWith('### ')) {
      currentTitle = line.replace(/^###\s+/, '').trim();
      promptLines = [];
      inCodeBlock = false;
      continue;
    }

    if (currentTitle && line.trim() === '```text') {
      inCodeBlock = true;
      promptLines = [];
      continue;
    }

    if (currentTitle && inCodeBlock && line.trim() === '```') {
      const prompt = promptLines.join('\n').trim();
      if (prompt.length > 0) {
        entries.push({
          title: currentTitle,
          category: currentSection.category,
          outputDir: currentSection.outputDir,
          prefix: currentSection.prefix,
          prompt,
        });
      }
      inCodeBlock = false;
      promptLines = [];
      continue;
    }

    if (inCodeBlock) {
      promptLines.push(line);
    }
  }

  return entries;
}

function buildPromptManifest(entries) {
  const categoryCounts = new Map();

  return entries.map((entry) => {
    const nextIndex = (categoryCounts.get(entry.category) || 0) + 1;
    categoryCounts.set(entry.category, nextIndex);

    const id = `${entry.prefix}_${String(nextIndex).padStart(3, '0')}`;
    return {
      id,
      category: entry.category,
      name: entry.title,
      prompt: entry.prompt,
      outputPath: `${entry.outputDir}/${id}.png`,
    };
  });
}

module.exports = {
  parsePromptDocument,
  buildPromptManifest,
};
