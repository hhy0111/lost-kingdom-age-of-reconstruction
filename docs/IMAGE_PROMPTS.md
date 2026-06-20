# 잃어버린 왕국 : 재건의 시대 - AI 이미지 제작 프롬프트 v1.1

## 문서 원칙

이 문서는 게임 기획, 시스템, 경제, BM, 콘텐츠, UI, 개발문서 설계가 완료된 뒤 마지막 단계에서 사용하는 이미지 제작 프롬프트 문서다.

모든 프롬프트는 개별 이미지 생성에 바로 사용할 수 있는 완성형 문장이다. 이름 치환 토큰이나 공통 suffix 치환 토큰을 남기지 않는다.

## 이미지 생성 순서

1. UI 아이콘
2. 재화 아이콘
3. 주인공
4. 몬스터
5. 보스
6. 장비
7. 건물
8. 이펙트
9. 배경 오브젝트

## 프롬프트 수량

| 구분 | 수량 |
|---|---:|
| UI 아이콘 | 16 |
| 재화 아이콘 | 6 |
| 주인공 | 3 |
| 일반 몬스터 | 104 |
| 보스 | 32 |
| 장비 | 200 |
| 건물 | 60 |
| 이펙트 | 6 |
| 배경 오브젝트 | 8 |
| 합계 | 435 |

## 공통 규칙

아래 규칙은 단일 오브젝트 프롬프트에 모두 반영되어 있다.

```text
transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

## 1순위: UI 아이콘

### 마을

```text
fantasy mobile RPG icon, small restored castle village menu symbol, gold and stone material, clear silhouette, high readability at 64px, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 전투

```text
fantasy mobile RPG icon, crossed sword combat menu symbol, polished steel blades with small red cloth accent, high readability at 64px, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 영웅

```text
fantasy mobile RPG icon, heroic helmet symbol for hero menu, blue plume, antique silver, high readability at 64px, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 장비

```text
fantasy mobile RPG icon, open treasure chest symbol for equipment menu, warm gold glow contained inside object, high readability at 64px, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 상점

```text
fantasy mobile RPG icon, merchant pouch and coin symbol for shop menu, readable fantasy store icon, high readability at 64px, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 건물

```text
fantasy mobile RPG icon, hammer and small stone tower symbol for building menu, clean readable silhouette, high readability at 64px, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 연구

```text
fantasy mobile RPG icon, ancient book and glowing gear symbol for research menu, blue magic accent, high readability at 64px, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 탐험

```text
fantasy mobile RPG icon, rolled map and compass symbol for expedition menu, leather and brass material, high readability at 64px, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 우편

```text
fantasy mobile RPG icon, sealed parchment envelope with wax seal, no readable letters, high readability at 64px, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 알림

```text
fantasy mobile RPG icon, small silver bell with red ribbon, notification symbol, high readability at 64px, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 설정

```text
fantasy mobile RPG icon, ornate cogwheel settings symbol, antique metal, high readability at 64px, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 보상

```text
fantasy mobile RPG icon, wrapped reward box with gold trim, contained glow, high readability at 64px, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 보스

```text
fantasy mobile RPG icon, horned boss skull emblem, dramatic but readable, high readability at 64px, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 소환

```text
fantasy mobile RPG icon, glowing summoning crystal circle symbol, no background circle UI, high readability at 64px, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 패스

```text
fantasy mobile RPG icon, royal season pass ticket symbol, gold border, no readable text, high readability at 64px, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 광고 보상

```text
fantasy mobile RPG icon, small play triangle carved on gold reward token, no UI frame, high readability at 64px, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

## 2순위: 재화 아이콘

### 골드

```text
single fantasy gold coin stack, royal crest engraving without readable letters, warm metallic highlights, mobile RPG currency icon, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 다이아

```text
single blue diamond crystal, faceted gemstone, bright rim light, premium currency icon, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 식량

```text
single food basket with bread, apple, and grain, cozy medieval fantasy resource icon, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 목재

```text
single bundle of cut wooden logs tied with rope, medieval resource icon, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 광석

```text
single pile of iron ore rocks with small metallic shine, mining resource icon, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 마력석

```text
single purple magic stone crystal cluster, soft inner glow, rare resource icon, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

## 3순위: 주인공

### 폐허 단계 주인공

```text
lost royal heir hero, young kingdom restorer, worn royal cloak, simple leather armor, short sword, hopeful but battle-ready expression, classic fantasy RPG, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 왕국 단계 주인공

```text
upgraded royal heir hero, restored kingdom commander, blue royal cloak, polished silver armor, ornate sword, confident stance, classic fantasy RPG, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 제국 단계 주인공

```text
imperial royal heir hero, founder of restored empire, elegant white and blue royal armor, golden crown accent without text, radiant sword, calm commanding stance, classic fantasy RPG, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

## 4순위: 몬스터

### 001 초원 - 허기진 슬라임

```text
허기진 슬라임, small fantasy idle RPG monster, ruined grassland, beginner friendly, worn leather and moss accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 002 초원 - 들쥐 도적

```text
들쥐 도적, small fantasy idle RPG monster, ruined grassland, beginner friendly, worn leather and moss accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 003 초원 - 갈기 늑대

```text
갈기 늑대, small fantasy idle RPG monster, ruined grassland, beginner friendly, worn leather and moss accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 004 초원 - 낡은 해골병

```text
낡은 해골병, small fantasy idle RPG monster, ruined grassland, beginner friendly, worn leather and moss accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 005 초원 - 풀잎 고블린

```text
풀잎 고블린, small fantasy idle RPG monster, ruined grassland, beginner friendly, worn leather and moss accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 006 초원 - 들판 박쥐

```text
들판 박쥐, small fantasy idle RPG monster, ruined grassland, beginner friendly, worn leather and moss accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 007 초원 - 무너진 허수아비

```text
무너진 허수아비, small fantasy idle RPG monster, ruined grassland, beginner friendly, worn leather and moss accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 008 초원 - 멧돼지 돌격병

```text
멧돼지 돌격병, small fantasy idle RPG monster, ruined grassland, beginner friendly, worn leather and moss accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 009 초원 - 잡초 정령

```text
잡초 정령, small fantasy idle RPG monster, ruined grassland, beginner friendly, worn leather and moss accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 010 초원 - 초원 코볼트

```text
초원 코볼트, small fantasy idle RPG monster, ruined grassland, beginner friendly, worn leather and moss accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 011 초원 - 도망병 망령

```text
도망병 망령, small fantasy idle RPG monster, ruined grassland, beginner friendly, worn leather and moss accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 012 초원 - 흙투성이 좀비

```text
흙투성이 좀비, small fantasy idle RPG monster, ruined grassland, beginner friendly, worn leather and moss accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 013 초원 - 작은 오크

```text
작은 오크, small fantasy idle RPG monster, ruined grassland, beginner friendly, worn leather and moss accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 014 숲 - 덩굴 슬라임

```text
덩굴 슬라임, small fantasy idle RPG monster, ancient forest, vines, leaves, mushroom and bark accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 015 숲 - 나무껍질 고블린

```text
나무껍질 고블린, small fantasy idle RPG monster, ancient forest, vines, leaves, mushroom and bark accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 016 숲 - 숲 늑대

```text
숲 늑대, small fantasy idle RPG monster, ancient forest, vines, leaves, mushroom and bark accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 017 숲 - 독버섯 정령

```text
독버섯 정령, small fantasy idle RPG monster, ancient forest, vines, leaves, mushroom and bark accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 018 숲 - 가시 멧돼지

```text
가시 멧돼지, small fantasy idle RPG monster, ancient forest, vines, leaves, mushroom and bark accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 019 숲 - 이끼 해골병

```text
이끼 해골병, small fantasy idle RPG monster, ancient forest, vines, leaves, mushroom and bark accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 020 숲 - 숲 그림자

```text
숲 그림자, small fantasy idle RPG monster, ancient forest, vines, leaves, mushroom and bark accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 021 숲 - 도토리 도적

```text
도토리 도적, small fantasy idle RPG monster, ancient forest, vines, leaves, mushroom and bark accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 022 숲 - 올빼미 사역마

```text
올빼미 사역마, small fantasy idle RPG monster, ancient forest, vines, leaves, mushroom and bark accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 023 숲 - 고대 뿌리괴물

```text
고대 뿌리괴물, small fantasy idle RPG monster, ancient forest, vines, leaves, mushroom and bark accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 024 숲 - 독침 벌떼

```text
독침 벌떼, small fantasy idle RPG monster, ancient forest, vines, leaves, mushroom and bark accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 025 숲 - 녹색 코볼트

```text
녹색 코볼트, small fantasy idle RPG monster, ancient forest, vines, leaves, mushroom and bark accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 026 숲 - 숲 오크 정찰병

```text
숲 오크 정찰병, small fantasy idle RPG monster, ancient forest, vines, leaves, mushroom and bark accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 027 폐광 - 광부 좀비

```text
광부 좀비, small fantasy idle RPG monster, abandoned mine, rusted metal, crystal dust, dark stone accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 028 폐광 - 녹슨 골렘

```text
녹슨 골렘, small fantasy idle RPG monster, abandoned mine, rusted metal, crystal dust, dark stone accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 029 폐광 - 박쥐 무리

```text
박쥐 무리, small fantasy idle RPG monster, abandoned mine, rusted metal, crystal dust, dark stone accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 030 폐광 - 돌가루 슬라임

```text
돌가루 슬라임, small fantasy idle RPG monster, abandoned mine, rusted metal, crystal dust, dark stone accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 031 폐광 - 곡괭이 고블린

```text
곡괭이 고블린, small fantasy idle RPG monster, abandoned mine, rusted metal, crystal dust, dark stone accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 032 폐광 - 어둠 코볼트

```text
어둠 코볼트, small fantasy idle RPG monster, abandoned mine, rusted metal, crystal dust, dark stone accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 033 폐광 - 수정 거미

```text
수정 거미, small fantasy idle RPG monster, abandoned mine, rusted metal, crystal dust, dark stone accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 034 폐광 - 갱도 해골병

```text
갱도 해골병, small fantasy idle RPG monster, abandoned mine, rusted metal, crystal dust, dark stone accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 035 폐광 - 폐광 도적

```text
폐광 도적, small fantasy idle RPG monster, abandoned mine, rusted metal, crystal dust, dark stone accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 036 폐광 - 광석 벌레

```text
광석 벌레, small fantasy idle RPG monster, abandoned mine, rusted metal, crystal dust, dark stone accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 037 폐광 - 무너진 수레 망령

```text
무너진 수레 망령, small fantasy idle RPG monster, abandoned mine, rusted metal, crystal dust, dark stone accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 038 폐광 - 철갑 오크

```text
철갑 오크, small fantasy idle RPG monster, abandoned mine, rusted metal, crystal dust, dark stone accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 039 폐광 - 검은 먼지 정령

```text
검은 먼지 정령, small fantasy idle RPG monster, abandoned mine, rusted metal, crystal dust, dark stone accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 040 사막 - 모래 슬라임

```text
모래 슬라임, small fantasy idle RPG monster, desert ruin, sand, brass, mummy cloth and sun-baked stone accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 041 사막 - 사막 도적

```text
사막 도적, small fantasy idle RPG monster, desert ruin, sand, brass, mummy cloth and sun-baked stone accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 042 사막 - 전갈병

```text
전갈병, small fantasy idle RPG monster, desert ruin, sand, brass, mummy cloth and sun-baked stone accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 043 사막 - 미라 보초

```text
미라 보초, small fantasy idle RPG monster, desert ruin, sand, brass, mummy cloth and sun-baked stone accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 044 사막 - 황금 코볼트

```text
황금 코볼트, small fantasy idle RPG monster, desert ruin, sand, brass, mummy cloth and sun-baked stone accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 045 사막 - 모래늑대

```text
모래늑대, small fantasy idle RPG monster, desert ruin, sand, brass, mummy cloth and sun-baked stone accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 046 사막 - 유적 해골검사

```text
유적 해골검사, small fantasy idle RPG monster, desert ruin, sand, brass, mummy cloth and sun-baked stone accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 047 사막 - 열풍 정령

```text
열풍 정령, small fantasy idle RPG monster, desert ruin, sand, brass, mummy cloth and sun-baked stone accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 048 사막 - 사막 박쥐

```text
사막 박쥐, small fantasy idle RPG monster, desert ruin, sand, brass, mummy cloth and sun-baked stone accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 049 사막 - 석상 파수꾼

```text
석상 파수꾼, small fantasy idle RPG monster, desert ruin, sand, brass, mummy cloth and sun-baked stone accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 050 사막 - 독침 전갈

```text
독침 전갈, small fantasy idle RPG monster, desert ruin, sand, brass, mummy cloth and sun-baked stone accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 051 사막 - 모래 오크

```text
모래 오크, small fantasy idle RPG monster, desert ruin, sand, brass, mummy cloth and sun-baked stone accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 052 사막 - 항아리 망령

```text
항아리 망령, small fantasy idle RPG monster, desert ruin, sand, brass, mummy cloth and sun-baked stone accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 053 설원 - 얼음 슬라임

```text
얼음 슬라임, small fantasy idle RPG monster, frozen northern field, ice, fur, pale blue frost accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 054 설원 - 눈늑대

```text
눈늑대, small fantasy idle RPG monster, frozen northern field, ice, fur, pale blue frost accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 055 설원 - 서리 고블린

```text
서리 고블린, small fantasy idle RPG monster, frozen northern field, ice, fur, pale blue frost accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 056 설원 - 설원 해골병

```text
설원 해골병, small fantasy idle RPG monster, frozen northern field, ice, fur, pale blue frost accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 057 설원 - 얼어붙은 좀비

```text
얼어붙은 좀비, small fantasy idle RPG monster, frozen northern field, ice, fur, pale blue frost accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 058 설원 - 빙결 박쥐

```text
빙결 박쥐, small fantasy idle RPG monster, frozen northern field, ice, fur, pale blue frost accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 059 설원 - 눈보라 정령

```text
눈보라 정령, small fantasy idle RPG monster, frozen northern field, ice, fur, pale blue frost accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 060 설원 - 북방 오크

```text
북방 오크, small fantasy idle RPG monster, frozen northern field, ice, fur, pale blue frost accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 061 설원 - 얼음 갑옷병

```text
얼음 갑옷병, small fantasy idle RPG monster, frozen northern field, ice, fur, pale blue frost accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 062 설원 - 설산 코볼트

```text
설산 코볼트, small fantasy idle RPG monster, frozen northern field, ice, fur, pale blue frost accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 063 설원 - 동상 망령

```text
동상 망령, small fantasy idle RPG monster, frozen northern field, ice, fur, pale blue frost accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 064 설원 - 흰곰 돌격병

```text
흰곰 돌격병, small fantasy idle RPG monster, frozen northern field, ice, fur, pale blue frost accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 065 설원 - 얼음 가시괴물

```text
얼음 가시괴물, small fantasy idle RPG monster, frozen northern field, ice, fur, pale blue frost accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 066 화산 - 용암 슬라임

```text
용암 슬라임, small fantasy idle RPG monster, volcanic forge, lava cracks, ash, black iron and ember accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 067 화산 - 불꽃 고블린

```text
불꽃 고블린, small fantasy idle RPG monster, volcanic forge, lava cracks, ash, black iron and ember accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 068 화산 - 재투성이 해골병

```text
재투성이 해골병, small fantasy idle RPG monster, volcanic forge, lava cracks, ash, black iron and ember accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 069 화산 - 화산 박쥐

```text
화산 박쥐, small fantasy idle RPG monster, volcanic forge, lava cracks, ash, black iron and ember accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 070 화산 - 용암 골렘

```text
용암 골렘, small fantasy idle RPG monster, volcanic forge, lava cracks, ash, black iron and ember accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 071 화산 - 불도마뱀

```text
불도마뱀, small fantasy idle RPG monster, volcanic forge, lava cracks, ash, black iron and ember accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 072 화산 - 화염 코볼트

```text
화염 코볼트, small fantasy idle RPG monster, volcanic forge, lava cracks, ash, black iron and ember accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 073 화산 - 잿불 정령

```text
잿불 정령, small fantasy idle RPG monster, volcanic forge, lava cracks, ash, black iron and ember accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 074 화산 - 검은 오크

```text
검은 오크, small fantasy idle RPG monster, volcanic forge, lava cracks, ash, black iron and ember accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 075 화산 - 화산 전갈

```text
화산 전갈, small fantasy idle RPG monster, volcanic forge, lava cracks, ash, black iron and ember accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 076 화산 - 녹은 갑옷병

```text
녹은 갑옷병, small fantasy idle RPG monster, volcanic forge, lava cracks, ash, black iron and ember accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 077 화산 - 불씨 망령

```text
불씨 망령, small fantasy idle RPG monster, volcanic forge, lava cracks, ash, black iron and ember accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 078 화산 - 마그마 벌레

```text
마그마 벌레, small fantasy idle RPG monster, volcanic forge, lava cracks, ash, black iron and ember accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 079 심연 - 심연 슬라임

```text
심연 슬라임, small fantasy idle RPG monster, abyss corruption, dark purple energy, cursed marks, void accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 080 심연 - 공허 해골병

```text
공허 해골병, small fantasy idle RPG monster, abyss corruption, dark purple energy, cursed marks, void accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 081 심연 - 그림자 고블린

```text
그림자 고블린, small fantasy idle RPG monster, abyss corruption, dark purple energy, cursed marks, void accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 082 심연 - 어둠 사제

```text
어둠 사제, small fantasy idle RPG monster, abyss corruption, dark purple energy, cursed marks, void accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 083 심연 - 균열 박쥐

```text
균열 박쥐, small fantasy idle RPG monster, abyss corruption, dark purple energy, cursed marks, void accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 084 심연 - 심연 늑대

```text
심연 늑대, small fantasy idle RPG monster, abyss corruption, dark purple energy, cursed marks, void accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 085 심연 - 검은 촉수

```text
검은 촉수, small fantasy idle RPG monster, abyss corruption, dark purple energy, cursed marks, void accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 086 심연 - 저주받은 갑옷

```text
저주받은 갑옷, small fantasy idle RPG monster, abyss corruption, dark purple energy, cursed marks, void accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 087 심연 - 공허 정령

```text
공허 정령, small fantasy idle RPG monster, abyss corruption, dark purple energy, cursed marks, void accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 088 심연 - 심연 코볼트

```text
심연 코볼트, small fantasy idle RPG monster, abyss corruption, dark purple energy, cursed marks, void accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 089 심연 - 악몽 망령

```text
악몽 망령, small fantasy idle RPG monster, abyss corruption, dark purple energy, cursed marks, void accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 090 심연 - 타락한 오크

```text
타락한 오크, small fantasy idle RPG monster, abyss corruption, dark purple energy, cursed marks, void accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 091 심연 - 눈 없는 추적자

```text
눈 없는 추적자, small fantasy idle RPG monster, abyss corruption, dark purple energy, cursed marks, void accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 092 마왕성 - 마성 슬라임

```text
마성 슬라임, small fantasy idle RPG monster, demon castle army, black steel, red magic, final enemy accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 093 마왕성 - 마왕군 보병

```text
마왕군 보병, small fantasy idle RPG monster, demon castle army, black steel, red magic, final enemy accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 094 마왕성 - 지옥 박쥐

```text
지옥 박쥐, small fantasy idle RPG monster, demon castle army, black steel, red magic, final enemy accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 095 마왕성 - 검은 해골기사

```text
검은 해골기사, small fantasy idle RPG monster, demon castle army, black steel, red magic, final enemy accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 096 마왕성 - 마성 고블린

```text
마성 고블린, small fantasy idle RPG monster, demon castle army, black steel, red magic, final enemy accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 097 마왕성 - 지옥견

```text
지옥견, small fantasy idle RPG monster, demon castle army, black steel, red magic, final enemy accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 098 마왕성 - 마왕성 궁수

```text
마왕성 궁수, small fantasy idle RPG monster, demon castle army, black steel, red magic, final enemy accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 099 마왕성 - 악마 사제

```text
악마 사제, small fantasy idle RPG monster, demon castle army, black steel, red magic, final enemy accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 100 마왕성 - 저주 골렘

```text
저주 골렘, small fantasy idle RPG monster, demon castle army, black steel, red magic, final enemy accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 101 마왕성 - 피의 망령

```text
피의 망령, small fantasy idle RPG monster, demon castle army, black steel, red magic, final enemy accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 102 마왕성 - 마성 오크

```text
마성 오크, small fantasy idle RPG monster, demon castle army, black steel, red magic, final enemy accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 103 마왕성 - 암흑 기사

```text
암흑 기사, small fantasy idle RPG monster, demon castle army, black steel, red magic, final enemy accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 104 마왕성 - 지옥 화염정령

```text
지옥 화염정령, small fantasy idle RPG monster, demon castle army, black steel, red magic, final enemy accents design, readable silhouette, exaggerated mobile game proportions, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

## 5순위: 보스

### 001 초원 - 들판의 폭군 그룸

```text
들판의 폭군 그룸, fantasy mobile idle RPG boss monster, ruined grassland, beginner friendly, worn leather and moss accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 002 초원 - 해골 대장 발락

```text
해골 대장 발락, fantasy mobile idle RPG boss monster, ruined grassland, beginner friendly, worn leather and moss accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 003 초원 - 굶주린 늑대왕

```text
굶주린 늑대왕, fantasy mobile idle RPG boss monster, ruined grassland, beginner friendly, worn leather and moss accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 004 초원 - 폐허의 첫 수문장

```text
폐허의 첫 수문장, fantasy mobile idle RPG boss monster, ruined grassland, beginner friendly, worn leather and moss accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 005 숲 - 독버섯 군주

```text
독버섯 군주, fantasy mobile idle RPG boss monster, ancient forest, vines, leaves, mushroom and bark accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 006 숲 - 고대나무 파수꾼

```text
고대나무 파수꾼, fantasy mobile idle RPG boss monster, ancient forest, vines, leaves, mushroom and bark accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 007 숲 - 녹색 칼날 레인저

```text
녹색 칼날 레인저, fantasy mobile idle RPG boss monster, ancient forest, vines, leaves, mushroom and bark accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 008 숲 - 숲의 타락한 드루이드

```text
숲의 타락한 드루이드, fantasy mobile idle RPG boss monster, ancient forest, vines, leaves, mushroom and bark accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 009 폐광 - 수정 거미 여왕

```text
수정 거미 여왕, fantasy mobile idle RPG boss monster, abandoned mine, rusted metal, crystal dust, dark stone accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 010 폐광 - 녹슨 골렘 장군

```text
녹슨 골렘 장군, fantasy mobile idle RPG boss monster, abandoned mine, rusted metal, crystal dust, dark stone accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 011 폐광 - 광산 망령 감독관

```text
광산 망령 감독관, fantasy mobile idle RPG boss monster, abandoned mine, rusted metal, crystal dust, dark stone accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 012 폐광 - 검은 곡괭이 오크

```text
검은 곡괭이 오크, fantasy mobile idle RPG boss monster, abandoned mine, rusted metal, crystal dust, dark stone accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 013 사막 - 모래왕 전갈

```text
모래왕 전갈, fantasy mobile idle RPG boss monster, desert ruin, sand, brass, mummy cloth and sun-baked stone accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 014 사막 - 황금 미라 파라크

```text
황금 미라 파라크, fantasy mobile idle RPG boss monster, desert ruin, sand, brass, mummy cloth and sun-baked stone accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 015 사막 - 유적의 석상 거인

```text
유적의 석상 거인, fantasy mobile idle RPG boss monster, desert ruin, sand, brass, mummy cloth and sun-baked stone accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 016 사막 - 열풍의 도적왕

```text
열풍의 도적왕, fantasy mobile idle RPG boss monster, desert ruin, sand, brass, mummy cloth and sun-baked stone accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 017 설원 - 서리늑대 대족장

```text
서리늑대 대족장, fantasy mobile idle RPG boss monster, frozen northern field, ice, fur, pale blue frost accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 018 설원 - 얼음 갑옷 기사

```text
얼음 갑옷 기사, fantasy mobile idle RPG boss monster, frozen northern field, ice, fur, pale blue frost accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 019 설원 - 북방 설인왕

```text
북방 설인왕, fantasy mobile idle RPG boss monster, frozen northern field, ice, fur, pale blue frost accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 020 설원 - 눈보라 마녀

```text
눈보라 마녀, fantasy mobile idle RPG boss monster, frozen northern field, ice, fur, pale blue frost accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 021 화산 - 마그마 골렘

```text
마그마 골렘, fantasy mobile idle RPG boss monster, volcanic forge, lava cracks, ash, black iron and ember accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 022 화산 - 화염 도마뱀 군주

```text
화염 도마뱀 군주, fantasy mobile idle RPG boss monster, volcanic forge, lava cracks, ash, black iron and ember accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 023 화산 - 용암 대장장이

```text
용암 대장장이, fantasy mobile idle RPG boss monster, volcanic forge, lava cracks, ash, black iron and ember accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 024 화산 - 불의 사도 칼도르

```text
불의 사도 칼도르, fantasy mobile idle RPG boss monster, volcanic forge, lava cracks, ash, black iron and ember accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 025 심연 - 공허의 눈

```text
공허의 눈, fantasy mobile idle RPG boss monster, abyss corruption, dark purple energy, cursed marks, void accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 026 심연 - 악몽 수확자

```text
악몽 수확자, fantasy mobile idle RPG boss monster, abyss corruption, dark purple energy, cursed marks, void accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 027 심연 - 타락한 대사제

```text
타락한 대사제, fantasy mobile idle RPG boss monster, abyss corruption, dark purple energy, cursed marks, void accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 028 심연 - 심연의 쌍검귀

```text
심연의 쌍검귀, fantasy mobile idle RPG boss monster, abyss corruption, dark purple energy, cursed marks, void accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 029 마왕성 - 암흑 기사단장

```text
암흑 기사단장, fantasy mobile idle RPG boss monster, demon castle army, black steel, red magic, final enemy accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 030 마왕성 - 지옥문 파수꾼

```text
지옥문 파수꾼, fantasy mobile idle RPG boss monster, demon castle army, black steel, red magic, final enemy accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 031 마왕성 - 마왕의 왼팔 아그론

```text
마왕의 왼팔 아그론, fantasy mobile idle RPG boss monster, demon castle army, black steel, red magic, final enemy accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 032 마왕성 - 마왕 모르가스

```text
마왕 모르가스, fantasy mobile idle RPG boss monster, demon castle army, black steel, red magic, final enemy accents design, larger and more intimidating than regular monsters, readable silhouette, clear attack pose potential, front-facing 3/4 view, full body, clear silhouette, separated readable limbs, weapon and arms easy to separate for animation, idle pose, fantasy mobile RPG style, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

## 6순위: 장비

### 001 녹슨 개척자 - 녹슨 검

```text
녹슨 검, single fantasy RPG equipment item, ruined beginner adventurer gear, worn iron, patched leather, survival fantasy, 일반 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 002 녹슨 개척자 - 찌그러진 투구

```text
찌그러진 투구, single fantasy RPG equipment item, ruined beginner adventurer gear, worn iron, patched leather, survival fantasy, 일반 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 003 녹슨 개척자 - 낡은 흉갑

```text
낡은 흉갑, single fantasy RPG equipment item, ruined beginner adventurer gear, worn iron, patched leather, survival fantasy, 일반 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 004 녹슨 개척자 - 해진 장갑

```text
해진 장갑, single fantasy RPG equipment item, ruined beginner adventurer gear, worn iron, patched leather, survival fantasy, 일반 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 005 녹슨 개척자 - 먼지 신발

```text
먼지 신발, single fantasy RPG equipment item, ruined beginner adventurer gear, worn iron, patched leather, survival fantasy, 일반 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 006 녹슨 개척자 - 나무 목걸이

```text
나무 목걸이, single fantasy RPG equipment item, ruined beginner adventurer gear, worn iron, patched leather, survival fantasy, 일반 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 007 녹슨 개척자 - 구리 반지

```text
구리 반지, single fantasy RPG equipment item, ruined beginner adventurer gear, worn iron, patched leather, survival fantasy, 일반 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 008 녹슨 개척자 - 천 망토

```text
천 망토, single fantasy RPG equipment item, ruined beginner adventurer gear, worn iron, patched leather, survival fantasy, 일반 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 009 녹슨 개척자 - 낡은 허리띠

```text
낡은 허리띠, single fantasy RPG equipment item, ruined beginner adventurer gear, worn iron, patched leather, survival fantasy, 일반 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 010 녹슨 개척자 - 깨진 왕가 문장

```text
깨진 왕가 문장, single fantasy RPG equipment item, ruined beginner adventurer gear, worn iron, patched leather, survival fantasy, 일반 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 011 초원 수호자 - 초원 창

```text
초원 창, single fantasy RPG equipment item, grassland guardian gear, green cloth, leather, simple polished metal, 고급 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 012 초원 수호자 - 가죽 두건

```text
가죽 두건, single fantasy RPG equipment item, grassland guardian gear, green cloth, leather, simple polished metal, 고급 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 013 초원 수호자 - 초원 갑옷

```text
초원 갑옷, single fantasy RPG equipment item, grassland guardian gear, green cloth, leather, simple polished metal, 고급 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 014 초원 수호자 - 풀잎 장갑

```text
풀잎 장갑, single fantasy RPG equipment item, grassland guardian gear, green cloth, leather, simple polished metal, 고급 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 015 초원 수호자 - 사냥꾼 장화

```text
사냥꾼 장화, single fantasy RPG equipment item, grassland guardian gear, green cloth, leather, simple polished metal, 고급 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 016 초원 수호자 - 들꽃 목걸이

```text
들꽃 목걸이, single fantasy RPG equipment item, grassland guardian gear, green cloth, leather, simple polished metal, 고급 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 017 초원 수호자 - 초록 반지

```text
초록 반지, single fantasy RPG equipment item, grassland guardian gear, green cloth, leather, simple polished metal, 고급 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 018 초원 수호자 - 초원 망토

```text
초원 망토, single fantasy RPG equipment item, grassland guardian gear, green cloth, leather, simple polished metal, 고급 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 019 초원 수호자 - 사냥 허리띠

```text
사냥 허리띠, single fantasy RPG equipment item, grassland guardian gear, green cloth, leather, simple polished metal, 고급 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 020 초원 수호자 - 들판의 부적

```text
들판의 부적, single fantasy RPG equipment item, grassland guardian gear, green cloth, leather, simple polished metal, 고급 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 021 생존자 - 생존자의 도끼

```text
생존자의 도끼, single fantasy RPG equipment item, rugged survivor gear, practical tools, repaired leather and bone accents, 고급 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 022 생존자 - 생존자의 모자

```text
생존자의 모자, single fantasy RPG equipment item, rugged survivor gear, practical tools, repaired leather and bone accents, 고급 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 023 생존자 - 덧댄 갑옷

```text
덧댄 갑옷, single fantasy RPG equipment item, rugged survivor gear, practical tools, repaired leather and bone accents, 고급 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 024 생존자 - 두꺼운 장갑

```text
두꺼운 장갑, single fantasy RPG equipment item, rugged survivor gear, practical tools, repaired leather and bone accents, 고급 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 025 생존자 - 튼튼한 신발

```text
튼튼한 신발, single fantasy RPG equipment item, rugged survivor gear, practical tools, repaired leather and bone accents, 고급 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 026 생존자 - 뼈 목걸이

```text
뼈 목걸이, single fantasy RPG equipment item, rugged survivor gear, practical tools, repaired leather and bone accents, 고급 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 027 생존자 - 철 반지

```text
철 반지, single fantasy RPG equipment item, rugged survivor gear, practical tools, repaired leather and bone accents, 고급 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 028 생존자 - 방수 망토

```text
방수 망토, single fantasy RPG equipment item, rugged survivor gear, practical tools, repaired leather and bone accents, 고급 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 029 생존자 - 도구 허리띠

```text
도구 허리띠, single fantasy RPG equipment item, rugged survivor gear, practical tools, repaired leather and bone accents, 고급 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 030 생존자 - 생존 일지

```text
생존 일지, single fantasy RPG equipment item, rugged survivor gear, practical tools, repaired leather and bone accents, 고급 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 031 숲 그림자 - 그림자 단검

```text
그림자 단검, single fantasy RPG equipment item, forest shadow gear, dark green leather, stealth fantasy, leaf motifs, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 032 숲 그림자 - 숲그늘 후드

```text
숲그늘 후드, single fantasy RPG equipment item, forest shadow gear, dark green leather, stealth fantasy, leaf motifs, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 033 숲 그림자 - 그림자 가죽갑옷

```text
그림자 가죽갑옷, single fantasy RPG equipment item, forest shadow gear, dark green leather, stealth fantasy, leaf motifs, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 034 숲 그림자 - 은신 장갑

```text
은신 장갑, single fantasy RPG equipment item, forest shadow gear, dark green leather, stealth fantasy, leaf motifs, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 035 숲 그림자 - 고요한 장화

```text
고요한 장화, single fantasy RPG equipment item, forest shadow gear, dark green leather, stealth fantasy, leaf motifs, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 036 숲 그림자 - 흑엽 목걸이

```text
흑엽 목걸이, single fantasy RPG equipment item, forest shadow gear, dark green leather, stealth fantasy, leaf motifs, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 037 숲 그림자 - 그림자 반지

```text
그림자 반지, single fantasy RPG equipment item, forest shadow gear, dark green leather, stealth fantasy, leaf motifs, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 038 숲 그림자 - 위장 망토

```text
위장 망토, single fantasy RPG equipment item, forest shadow gear, dark green leather, stealth fantasy, leaf motifs, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 039 숲 그림자 - 은신 허리띠

```text
은신 허리띠, single fantasy RPG equipment item, forest shadow gear, dark green leather, stealth fantasy, leaf motifs, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 040 숲 그림자 - 숲의 표식

```text
숲의 표식, single fantasy RPG equipment item, forest shadow gear, dark green leather, stealth fantasy, leaf motifs, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 041 고대 수목 - 수목 지팡이

```text
수목 지팡이, single fantasy RPG equipment item, ancient tree gear, bark, roots, moss, druidic fantasy, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 042 고대 수목 - 나무관 투구

```text
나무관 투구, single fantasy RPG equipment item, ancient tree gear, bark, roots, moss, druidic fantasy, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 043 고대 수목 - 수피 갑옷

```text
수피 갑옷, single fantasy RPG equipment item, ancient tree gear, bark, roots, moss, druidic fantasy, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 044 고대 수목 - 뿌리 장갑

```text
뿌리 장갑, single fantasy RPG equipment item, ancient tree gear, bark, roots, moss, druidic fantasy, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 045 고대 수목 - 이끼 장화

```text
이끼 장화, single fantasy RPG equipment item, ancient tree gear, bark, roots, moss, druidic fantasy, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 046 고대 수목 - 수액 목걸이

```text
수액 목걸이, single fantasy RPG equipment item, ancient tree gear, bark, roots, moss, druidic fantasy, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 047 고대 수목 - 나이테 반지

```text
나이테 반지, single fantasy RPG equipment item, ancient tree gear, bark, roots, moss, druidic fantasy, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 048 고대 수목 - 잎사귀 망토

```text
잎사귀 망토, single fantasy RPG equipment item, ancient tree gear, bark, roots, moss, druidic fantasy, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 049 고대 수목 - 덩굴 허리띠

```text
덩굴 허리띠, single fantasy RPG equipment item, ancient tree gear, bark, roots, moss, druidic fantasy, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 050 고대 수목 - 고대 씨앗

```text
고대 씨앗, single fantasy RPG equipment item, ancient tree gear, bark, roots, moss, druidic fantasy, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 051 폐광 채굴자 - 채굴 곡괭이

```text
채굴 곡괭이, single fantasy RPG equipment item, abandoned miner gear, iron tools, lantern glow, dust and stone, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 052 폐광 채굴자 - 광부 헬멧

```text
광부 헬멧, single fantasy RPG equipment item, abandoned miner gear, iron tools, lantern glow, dust and stone, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 053 폐광 채굴자 - 광부 조끼

```text
광부 조끼, single fantasy RPG equipment item, abandoned miner gear, iron tools, lantern glow, dust and stone, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 054 폐광 채굴자 - 작업 장갑

```text
작업 장갑, single fantasy RPG equipment item, abandoned miner gear, iron tools, lantern glow, dust and stone, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 055 폐광 채굴자 - 철심 장화

```text
철심 장화, single fantasy RPG equipment item, abandoned miner gear, iron tools, lantern glow, dust and stone, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 056 폐광 채굴자 - 광석 목걸이

```text
광석 목걸이, single fantasy RPG equipment item, abandoned miner gear, iron tools, lantern glow, dust and stone, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 057 폐광 채굴자 - 납 반지

```text
납 반지, single fantasy RPG equipment item, abandoned miner gear, iron tools, lantern glow, dust and stone, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 058 폐광 채굴자 - 먼지 망토

```text
먼지 망토, single fantasy RPG equipment item, abandoned miner gear, iron tools, lantern glow, dust and stone, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 059 폐광 채굴자 - 작업 허리띠

```text
작업 허리띠, single fantasy RPG equipment item, abandoned miner gear, iron tools, lantern glow, dust and stone, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 060 폐광 채굴자 - 갱도 램프

```text
갱도 램프, single fantasy RPG equipment item, abandoned miner gear, iron tools, lantern glow, dust and stone, 희귀 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 061 수정 파수꾼 - 수정검

```text
수정검, single fantasy RPG equipment item, crystal guardian gear, bright crystal facets, silver metal, magical glow, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 062 수정 파수꾼 - 수정 투구

```text
수정 투구, single fantasy RPG equipment item, crystal guardian gear, bright crystal facets, silver metal, magical glow, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 063 수정 파수꾼 - 수정 갑옷

```text
수정 갑옷, single fantasy RPG equipment item, crystal guardian gear, bright crystal facets, silver metal, magical glow, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 064 수정 파수꾼 - 수정 장갑

```text
수정 장갑, single fantasy RPG equipment item, crystal guardian gear, bright crystal facets, silver metal, magical glow, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 065 수정 파수꾼 - 수정 장화

```text
수정 장화, single fantasy RPG equipment item, crystal guardian gear, bright crystal facets, silver metal, magical glow, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 066 수정 파수꾼 - 수정 목걸이

```text
수정 목걸이, single fantasy RPG equipment item, crystal guardian gear, bright crystal facets, silver metal, magical glow, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 067 수정 파수꾼 - 수정 반지

```text
수정 반지, single fantasy RPG equipment item, crystal guardian gear, bright crystal facets, silver metal, magical glow, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 068 수정 파수꾼 - 수정 망토

```text
수정 망토, single fantasy RPG equipment item, crystal guardian gear, bright crystal facets, silver metal, magical glow, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 069 수정 파수꾼 - 수정 허리띠

```text
수정 허리띠, single fantasy RPG equipment item, crystal guardian gear, bright crystal facets, silver metal, magical glow, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 070 수정 파수꾼 - 빛나는 수정핵

```text
빛나는 수정핵, single fantasy RPG equipment item, crystal guardian gear, bright crystal facets, silver metal, magical glow, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 071 사막 유랑자 - 유랑자의 곡도

```text
유랑자의 곡도, single fantasy RPG equipment item, desert wanderer gear, cloth wrap, brass, sand-worn ornament, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 072 사막 유랑자 - 천막 두건

```text
천막 두건, single fantasy RPG equipment item, desert wanderer gear, cloth wrap, brass, sand-worn ornament, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 073 사막 유랑자 - 사막 로브

```text
사막 로브, single fantasy RPG equipment item, desert wanderer gear, cloth wrap, brass, sand-worn ornament, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 074 사막 유랑자 - 모래 장갑

```text
모래 장갑, single fantasy RPG equipment item, desert wanderer gear, cloth wrap, brass, sand-worn ornament, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 075 사막 유랑자 - 방열 장화

```text
방열 장화, single fantasy RPG equipment item, desert wanderer gear, cloth wrap, brass, sand-worn ornament, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 076 사막 유랑자 - 오아시스 목걸이

```text
오아시스 목걸이, single fantasy RPG equipment item, desert wanderer gear, cloth wrap, brass, sand-worn ornament, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 077 사막 유랑자 - 황동 반지

```text
황동 반지, single fantasy RPG equipment item, desert wanderer gear, cloth wrap, brass, sand-worn ornament, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 078 사막 유랑자 - 모래 망토

```text
모래 망토, single fantasy RPG equipment item, desert wanderer gear, cloth wrap, brass, sand-worn ornament, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 079 사막 유랑자 - 물주머니 허리띠

```text
물주머니 허리띠, single fantasy RPG equipment item, desert wanderer gear, cloth wrap, brass, sand-worn ornament, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 080 사막 유랑자 - 항해 나침반

```text
항해 나침반, single fantasy RPG equipment item, desert wanderer gear, cloth wrap, brass, sand-worn ornament, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 081 황금 유적 - 황금 창

```text
황금 창, single fantasy RPG equipment item, golden ruin gear, ancient sun motifs, polished gold, relic fantasy, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 082 황금 유적 - 황금 가면

```text
황금 가면, single fantasy RPG equipment item, golden ruin gear, ancient sun motifs, polished gold, relic fantasy, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 083 황금 유적 - 황금 흉갑

```text
황금 흉갑, single fantasy RPG equipment item, golden ruin gear, ancient sun motifs, polished gold, relic fantasy, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 084 황금 유적 - 황금 장갑

```text
황금 장갑, single fantasy RPG equipment item, golden ruin gear, ancient sun motifs, polished gold, relic fantasy, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 085 황금 유적 - 황금 샌들

```text
황금 샌들, single fantasy RPG equipment item, golden ruin gear, ancient sun motifs, polished gold, relic fantasy, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 086 황금 유적 - 태양 목걸이

```text
태양 목걸이, single fantasy RPG equipment item, golden ruin gear, ancient sun motifs, polished gold, relic fantasy, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 087 황금 유적 - 황금 반지

```text
황금 반지, single fantasy RPG equipment item, golden ruin gear, ancient sun motifs, polished gold, relic fantasy, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 088 황금 유적 - 왕가 망토

```text
왕가 망토, single fantasy RPG equipment item, golden ruin gear, ancient sun motifs, polished gold, relic fantasy, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 089 황금 유적 - 장식 허리띠

```text
장식 허리띠, single fantasy RPG equipment item, golden ruin gear, ancient sun motifs, polished gold, relic fantasy, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 090 황금 유적 - 유적 석판

```text
유적 석판, single fantasy RPG equipment item, golden ruin gear, ancient sun motifs, polished gold, relic fantasy, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 091 서리 감시자 - 서리검

```text
서리검, single fantasy RPG equipment item, frost watcher gear, ice crystal, fur, pale blue metal, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 092 서리 감시자 - 서리 투구

```text
서리 투구, single fantasy RPG equipment item, frost watcher gear, ice crystal, fur, pale blue metal, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 093 서리 감시자 - 털가죽 갑옷

```text
털가죽 갑옷, single fantasy RPG equipment item, frost watcher gear, ice crystal, fur, pale blue metal, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 094 서리 감시자 - 방한 장갑

```text
방한 장갑, single fantasy RPG equipment item, frost watcher gear, ice crystal, fur, pale blue metal, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 095 서리 감시자 - 설원 장화

```text
설원 장화, single fantasy RPG equipment item, frost watcher gear, ice crystal, fur, pale blue metal, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 096 서리 감시자 - 얼음 목걸이

```text
얼음 목걸이, single fantasy RPG equipment item, frost watcher gear, ice crystal, fur, pale blue metal, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 097 서리 감시자 - 은빛 반지

```text
은빛 반지, single fantasy RPG equipment item, frost watcher gear, ice crystal, fur, pale blue metal, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 098 서리 감시자 - 눈보라 망토

```text
눈보라 망토, single fantasy RPG equipment item, frost watcher gear, ice crystal, fur, pale blue metal, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 099 서리 감시자 - 방한 허리띠

```text
방한 허리띠, single fantasy RPG equipment item, frost watcher gear, ice crystal, fur, pale blue metal, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 100 서리 감시자 - 서리 결정

```text
서리 결정, single fantasy RPG equipment item, frost watcher gear, ice crystal, fur, pale blue metal, 영웅 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 101 북방 기사 - 북방 대검

```text
북방 대검, single fantasy RPG equipment item, northern knight gear, white cloak, steel plate, oathbound fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 102 북방 기사 - 기사 투구

```text
기사 투구, single fantasy RPG equipment item, northern knight gear, white cloak, steel plate, oathbound fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 103 북방 기사 - 북방 판금갑옷

```text
북방 판금갑옷, single fantasy RPG equipment item, northern knight gear, white cloak, steel plate, oathbound fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 104 북방 기사 - 기사 장갑

```text
기사 장갑, single fantasy RPG equipment item, northern knight gear, white cloak, steel plate, oathbound fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 105 북방 기사 - 강철 장화

```text
강철 장화, single fantasy RPG equipment item, northern knight gear, white cloak, steel plate, oathbound fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 106 북방 기사 - 맹세 목걸이

```text
맹세 목걸이, single fantasy RPG equipment item, northern knight gear, white cloak, steel plate, oathbound fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 107 북방 기사 - 기사 반지

```text
기사 반지, single fantasy RPG equipment item, northern knight gear, white cloak, steel plate, oathbound fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 108 북방 기사 - 백색 망토

```text
백색 망토, single fantasy RPG equipment item, northern knight gear, white cloak, steel plate, oathbound fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 109 북방 기사 - 판금 허리띠

```text
판금 허리띠, single fantasy RPG equipment item, northern knight gear, white cloak, steel plate, oathbound fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 110 북방 기사 - 북방 깃발

```text
북방 깃발, single fantasy RPG equipment item, northern knight gear, white cloak, steel plate, oathbound fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 111 화염 제련 - 화염 망치

```text
화염 망치, single fantasy RPG equipment item, flame-forged gear, black iron, red ember, forge fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 112 화염 제련 - 제련 투구

```text
제련 투구, single fantasy RPG equipment item, flame-forged gear, black iron, red ember, forge fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 113 화염 제련 - 화염 갑옷

```text
화염 갑옷, single fantasy RPG equipment item, flame-forged gear, black iron, red ember, forge fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 114 화염 제련 - 제련 장갑

```text
제련 장갑, single fantasy RPG equipment item, flame-forged gear, black iron, red ember, forge fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 115 화염 제련 - 용암 장화

```text
용암 장화, single fantasy RPG equipment item, flame-forged gear, black iron, red ember, forge fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 116 화염 제련 - 불씨 목걸이

```text
불씨 목걸이, single fantasy RPG equipment item, flame-forged gear, black iron, red ember, forge fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 117 화염 제련 - 홍염 반지

```text
홍염 반지, single fantasy RPG equipment item, flame-forged gear, black iron, red ember, forge fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 118 화염 제련 - 불꽃 망토

```text
불꽃 망토, single fantasy RPG equipment item, flame-forged gear, black iron, red ember, forge fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 119 화염 제련 - 제련 허리띠

```text
제련 허리띠, single fantasy RPG equipment item, flame-forged gear, black iron, red ember, forge fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 120 화염 제련 - 불의 룬

```text
불의 룬, single fantasy RPG equipment item, flame-forged gear, black iron, red ember, forge fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 121 용암 군주 - 용암 도끼

```text
용암 도끼, single fantasy RPG equipment item, lava lord gear, magma cracks, obsidian, heavy volcanic fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 122 용암 군주 - 용암 왕관

```text
용암 왕관, single fantasy RPG equipment item, lava lord gear, magma cracks, obsidian, heavy volcanic fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 123 용암 군주 - 용암 갑주

```text
용암 갑주, single fantasy RPG equipment item, lava lord gear, magma cracks, obsidian, heavy volcanic fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 124 용암 군주 - 용암 건틀릿

```text
용암 건틀릿, single fantasy RPG equipment item, lava lord gear, magma cracks, obsidian, heavy volcanic fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 125 용암 군주 - 용암 발굽장화

```text
용암 발굽장화, single fantasy RPG equipment item, lava lord gear, magma cracks, obsidian, heavy volcanic fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 126 용암 군주 - 마그마 목걸이

```text
마그마 목걸이, single fantasy RPG equipment item, lava lord gear, magma cracks, obsidian, heavy volcanic fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 127 용암 군주 - 용암 반지

```text
용암 반지, single fantasy RPG equipment item, lava lord gear, magma cracks, obsidian, heavy volcanic fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 128 용암 군주 - 재의 망토

```text
재의 망토, single fantasy RPG equipment item, lava lord gear, magma cracks, obsidian, heavy volcanic fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 129 용암 군주 - 검은 허리띠

```text
검은 허리띠, single fantasy RPG equipment item, lava lord gear, magma cracks, obsidian, heavy volcanic fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 130 용암 군주 - 용암 심장

```text
용암 심장, single fantasy RPG equipment item, lava lord gear, magma cracks, obsidian, heavy volcanic fantasy, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 131 심연 추적자 - 심연 단검

```text
심연 단검, single fantasy RPG equipment item, abyss tracker gear, dark leather, void marks, purple shadow, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 132 심연 추적자 - 무음 후드

```text
무음 후드, single fantasy RPG equipment item, abyss tracker gear, dark leather, void marks, purple shadow, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 133 심연 추적자 - 심연 갑옷

```text
심연 갑옷, single fantasy RPG equipment item, abyss tracker gear, dark leather, void marks, purple shadow, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 134 심연 추적자 - 어둠 장갑

```text
어둠 장갑, single fantasy RPG equipment item, abyss tracker gear, dark leather, void marks, purple shadow, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 135 심연 추적자 - 추적 장화

```text
추적 장화, single fantasy RPG equipment item, abyss tracker gear, dark leather, void marks, purple shadow, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 136 심연 추적자 - 공허 목걸이

```text
공허 목걸이, single fantasy RPG equipment item, abyss tracker gear, dark leather, void marks, purple shadow, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 137 심연 추적자 - 검은 반지

```text
검은 반지, single fantasy RPG equipment item, abyss tracker gear, dark leather, void marks, purple shadow, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 138 심연 추적자 - 밤의 망토

```text
밤의 망토, single fantasy RPG equipment item, abyss tracker gear, dark leather, void marks, purple shadow, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 139 심연 추적자 - 그림자 허리띠

```text
그림자 허리띠, single fantasy RPG equipment item, abyss tracker gear, dark leather, void marks, purple shadow, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 140 심연 추적자 - 심연 눈동자

```text
심연 눈동자, single fantasy RPG equipment item, abyss tracker gear, dark leather, void marks, purple shadow, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 141 공허 사제 - 공허 지팡이

```text
공허 지팡이, single fantasy RPG equipment item, void priest gear, ritual cloth, dark silver, cursed runes without readable text, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 142 공허 사제 - 사제관

```text
사제관, single fantasy RPG equipment item, void priest gear, ritual cloth, dark silver, cursed runes without readable text, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 143 공허 사제 - 공허 로브

```text
공허 로브, single fantasy RPG equipment item, void priest gear, ritual cloth, dark silver, cursed runes without readable text, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 144 공허 사제 - 의식 장갑

```text
의식 장갑, single fantasy RPG equipment item, void priest gear, ritual cloth, dark silver, cursed runes without readable text, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 145 공허 사제 - 의식 신발

```text
의식 신발, single fantasy RPG equipment item, void priest gear, ritual cloth, dark silver, cursed runes without readable text, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 146 공허 사제 - 저주 목걸이

```text
저주 목걸이, single fantasy RPG equipment item, void priest gear, ritual cloth, dark silver, cursed runes without readable text, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 147 공허 사제 - 공허 반지

```text
공허 반지, single fantasy RPG equipment item, void priest gear, ritual cloth, dark silver, cursed runes without readable text, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 148 공허 사제 - 의식 망토

```text
의식 망토, single fantasy RPG equipment item, void priest gear, ritual cloth, dark silver, cursed runes without readable text, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 149 공허 사제 - 룬 허리띠

```text
룬 허리띠, single fantasy RPG equipment item, void priest gear, ritual cloth, dark silver, cursed runes without readable text, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 150 공허 사제 - 공허 성서

```text
공허 성서, single fantasy RPG equipment item, void priest gear, ritual cloth, dark silver, cursed runes without readable text, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 151 왕국 재건자 - 재건자의 검

```text
재건자의 검, single fantasy RPG equipment item, kingdom restorer gear, royal blue, silver, construction and crown motifs, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 152 왕국 재건자 - 왕국 투구

```text
왕국 투구, single fantasy RPG equipment item, kingdom restorer gear, royal blue, silver, construction and crown motifs, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 153 왕국 재건자 - 왕국 갑옷

```text
왕국 갑옷, single fantasy RPG equipment item, kingdom restorer gear, royal blue, silver, construction and crown motifs, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 154 왕국 재건자 - 재건 장갑

```text
재건 장갑, single fantasy RPG equipment item, kingdom restorer gear, royal blue, silver, construction and crown motifs, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 155 왕국 재건자 - 순찰 장화

```text
순찰 장화, single fantasy RPG equipment item, kingdom restorer gear, royal blue, silver, construction and crown motifs, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 156 왕국 재건자 - 왕국 목걸이

```text
왕국 목걸이, single fantasy RPG equipment item, kingdom restorer gear, royal blue, silver, construction and crown motifs, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 157 왕국 재건자 - 왕국 반지

```text
왕국 반지, single fantasy RPG equipment item, kingdom restorer gear, royal blue, silver, construction and crown motifs, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 158 왕국 재건자 - 왕실 망토

```text
왕실 망토, single fantasy RPG equipment item, kingdom restorer gear, royal blue, silver, construction and crown motifs, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 159 왕국 재건자 - 건설 허리띠

```text
건설 허리띠, single fantasy RPG equipment item, kingdom restorer gear, royal blue, silver, construction and crown motifs, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 160 왕국 재건자 - 재건 칙령

```text
재건 칙령, single fantasy RPG equipment item, kingdom restorer gear, royal blue, silver, construction and crown motifs, 전설 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 161 별빛 왕가 - 별빛 성검

```text
별빛 성검, single fantasy RPG equipment item, mythic royal starlight gear, silver, blue star glow, elegant legendary fantasy, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 162 별빛 왕가 - 별빛 왕관

```text
별빛 왕관, single fantasy RPG equipment item, mythic royal starlight gear, silver, blue star glow, elegant legendary fantasy, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 163 별빛 왕가 - 별빛 갑주

```text
별빛 갑주, single fantasy RPG equipment item, mythic royal starlight gear, silver, blue star glow, elegant legendary fantasy, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 164 별빛 왕가 - 별빛 건틀릿

```text
별빛 건틀릿, single fantasy RPG equipment item, mythic royal starlight gear, silver, blue star glow, elegant legendary fantasy, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 165 별빛 왕가 - 별빛 장화

```text
별빛 장화, single fantasy RPG equipment item, mythic royal starlight gear, silver, blue star glow, elegant legendary fantasy, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 166 별빛 왕가 - 별의 목걸이

```text
별의 목걸이, single fantasy RPG equipment item, mythic royal starlight gear, silver, blue star glow, elegant legendary fantasy, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 167 별빛 왕가 - 별의 반지

```text
별의 반지, single fantasy RPG equipment item, mythic royal starlight gear, silver, blue star glow, elegant legendary fantasy, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 168 별빛 왕가 - 은하 망토

```text
은하 망토, single fantasy RPG equipment item, mythic royal starlight gear, silver, blue star glow, elegant legendary fantasy, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 169 별빛 왕가 - 왕권 허리띠

```text
왕권 허리띠, single fantasy RPG equipment item, mythic royal starlight gear, silver, blue star glow, elegant legendary fantasy, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 170 별빛 왕가 - 별의 유물

```text
별의 유물, single fantasy RPG equipment item, mythic royal starlight gear, silver, blue star glow, elegant legendary fantasy, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 171 마왕 학살자 - 마왕학살검

```text
마왕학살검, single fantasy RPG equipment item, demon slayer mythic gear, black steel, red magic, final battle fantasy, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 172 마왕 학살자 - 결전 투구

```text
결전 투구, single fantasy RPG equipment item, demon slayer mythic gear, black steel, red magic, final battle fantasy, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 173 마왕 학살자 - 결전 갑옷

```text
결전 갑옷, single fantasy RPG equipment item, demon slayer mythic gear, black steel, red magic, final battle fantasy, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 174 마왕 학살자 - 결전 장갑

```text
결전 장갑, single fantasy RPG equipment item, demon slayer mythic gear, black steel, red magic, final battle fantasy, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 175 마왕 학살자 - 결전 장화

```text
결전 장화, single fantasy RPG equipment item, demon slayer mythic gear, black steel, red magic, final battle fantasy, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 176 마왕 학살자 - 결전 목걸이

```text
결전 목걸이, single fantasy RPG equipment item, demon slayer mythic gear, black steel, red magic, final battle fantasy, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 177 마왕 학살자 - 결전 반지

```text
결전 반지, single fantasy RPG equipment item, demon slayer mythic gear, black steel, red magic, final battle fantasy, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 178 마왕 학살자 - 붉은 망토

```text
붉은 망토, single fantasy RPG equipment item, demon slayer mythic gear, black steel, red magic, final battle fantasy, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 179 마왕 학살자 - 결전 허리띠

```text
결전 허리띠, single fantasy RPG equipment item, demon slayer mythic gear, black steel, red magic, final battle fantasy, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 180 마왕 학살자 - 마왕의 파편

```text
마왕의 파편, single fantasy RPG equipment item, demon slayer mythic gear, black steel, red magic, final battle fantasy, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 181 제국 창건자 - 제국의 창

```text
제국의 창, single fantasy RPG equipment item, imperial founder gear, gold, white metal, emperor fantasy without text, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 182 제국 창건자 - 황제관

```text
황제관, single fantasy RPG equipment item, imperial founder gear, gold, white metal, emperor fantasy without text, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 183 제국 창건자 - 제국 갑주

```text
제국 갑주, single fantasy RPG equipment item, imperial founder gear, gold, white metal, emperor fantasy without text, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 184 제국 창건자 - 황금 건틀릿

```text
황금 건틀릿, single fantasy RPG equipment item, imperial founder gear, gold, white metal, emperor fantasy without text, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 185 제국 창건자 - 제국 장화

```text
제국 장화, single fantasy RPG equipment item, imperial founder gear, gold, white metal, emperor fantasy without text, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 186 제국 창건자 - 황제 목걸이

```text
황제 목걸이, single fantasy RPG equipment item, imperial founder gear, gold, white metal, emperor fantasy without text, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 187 제국 창건자 - 옥좌 반지

```text
옥좌 반지, single fantasy RPG equipment item, imperial founder gear, gold, white metal, emperor fantasy without text, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 188 제국 창건자 - 제국 망토

```text
제국 망토, single fantasy RPG equipment item, imperial founder gear, gold, white metal, emperor fantasy without text, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 189 제국 창건자 - 황실 허리띠

```text
황실 허리띠, single fantasy RPG equipment item, imperial founder gear, gold, white metal, emperor fantasy without text, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 190 제국 창건자 - 창건 선언문

```text
창건 선언문, single fantasy RPG equipment item, imperial founder gear, gold, white metal, emperor fantasy without text, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 191 영원의 수호 - 영원의 검

```text
영원의 검, single fantasy RPG equipment item, eternal guardian gear, time crystal, white gold, timeless fantasy artifact, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 192 영원의 수호 - 영원 투구

```text
영원 투구, single fantasy RPG equipment item, eternal guardian gear, time crystal, white gold, timeless fantasy artifact, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 193 영원의 수호 - 영원 갑옷

```text
영원 갑옷, single fantasy RPG equipment item, eternal guardian gear, time crystal, white gold, timeless fantasy artifact, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 194 영원의 수호 - 영원 장갑

```text
영원 장갑, single fantasy RPG equipment item, eternal guardian gear, time crystal, white gold, timeless fantasy artifact, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 195 영원의 수호 - 영원 장화

```text
영원 장화, single fantasy RPG equipment item, eternal guardian gear, time crystal, white gold, timeless fantasy artifact, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 196 영원의 수호 - 영원 목걸이

```text
영원 목걸이, single fantasy RPG equipment item, eternal guardian gear, time crystal, white gold, timeless fantasy artifact, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 197 영원의 수호 - 영원 반지

```text
영원 반지, single fantasy RPG equipment item, eternal guardian gear, time crystal, white gold, timeless fantasy artifact, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 198 영원의 수호 - 영원 망토

```text
영원 망토, single fantasy RPG equipment item, eternal guardian gear, time crystal, white gold, timeless fantasy artifact, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 199 영원의 수호 - 영원 허리띠

```text
영원 허리띠, single fantasy RPG equipment item, eternal guardian gear, time crystal, white gold, timeless fantasy artifact, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 200 영원의 수호 - 시간의 핵

```text
시간의 핵, single fantasy RPG equipment item, eternal guardian gear, time crystal, white gold, timeless fantasy artifact, 신화 grade item design, polished icon asset, readable at small mobile size, single equipment item only, at least 30 percent transparent margin, readable shape at small mobile icon size, clean fantasy item render, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

## 7순위: 건물

### 001 왕궁 Lv1

```text
royal palace level 1, ruined temporary camp version, broken wood, cloth tent, early survival settlement, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 002 왕궁 Lv2

```text
royal palace level 2, simple wooden village version, repaired frame, small tools, beginner town restoration, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 003 왕궁 Lv3

```text
royal palace level 3, sturdy stone town version, tiled roof, clean medieval details, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 004 왕궁 Lv4

```text
royal palace level 4, prosperous kingdom version, banners without text, refined stone and wood, decorative lamps, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 005 왕궁 Lv5

```text
royal palace level 5, imperial restored version, ornate royal architecture, bright clean fantasy details, premium village centerpiece, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 006 여관 Lv1

```text
inn level 1, ruined temporary camp version, broken wood, cloth tent, early survival settlement, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 007 여관 Lv2

```text
inn level 2, simple wooden village version, repaired frame, small tools, beginner town restoration, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 008 여관 Lv3

```text
inn level 3, sturdy stone town version, tiled roof, clean medieval details, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 009 여관 Lv4

```text
inn level 4, prosperous kingdom version, banners without text, refined stone and wood, decorative lamps, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 010 여관 Lv5

```text
inn level 5, imperial restored version, ornate royal architecture, bright clean fantasy details, premium village centerpiece, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 011 대장간 Lv1

```text
blacksmith level 1, ruined temporary camp version, broken wood, cloth tent, early survival settlement, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 012 대장간 Lv2

```text
blacksmith level 2, simple wooden village version, repaired frame, small tools, beginner town restoration, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 013 대장간 Lv3

```text
blacksmith level 3, sturdy stone town version, tiled roof, clean medieval details, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 014 대장간 Lv4

```text
blacksmith level 4, prosperous kingdom version, banners without text, refined stone and wood, decorative lamps, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 015 대장간 Lv5

```text
blacksmith level 5, imperial restored version, ornate royal architecture, bright clean fantasy details, premium village centerpiece, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 016 농장 Lv1

```text
farm level 1, ruined temporary camp version, broken wood, cloth tent, early survival settlement, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 017 농장 Lv2

```text
farm level 2, simple wooden village version, repaired frame, small tools, beginner town restoration, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 018 농장 Lv3

```text
farm level 3, sturdy stone town version, tiled roof, clean medieval details, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 019 농장 Lv4

```text
farm level 4, prosperous kingdom version, banners without text, refined stone and wood, decorative lamps, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 020 농장 Lv5

```text
farm level 5, imperial restored version, ornate royal architecture, bright clean fantasy details, premium village centerpiece, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 021 벌목소 Lv1

```text
lumber mill level 1, ruined temporary camp version, broken wood, cloth tent, early survival settlement, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 022 벌목소 Lv2

```text
lumber mill level 2, simple wooden village version, repaired frame, small tools, beginner town restoration, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 023 벌목소 Lv3

```text
lumber mill level 3, sturdy stone town version, tiled roof, clean medieval details, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 024 벌목소 Lv4

```text
lumber mill level 4, prosperous kingdom version, banners without text, refined stone and wood, decorative lamps, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 025 벌목소 Lv5

```text
lumber mill level 5, imperial restored version, ornate royal architecture, bright clean fantasy details, premium village centerpiece, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 026 채석장 Lv1

```text
quarry level 1, ruined temporary camp version, broken wood, cloth tent, early survival settlement, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 027 채석장 Lv2

```text
quarry level 2, simple wooden village version, repaired frame, small tools, beginner town restoration, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 028 채석장 Lv3

```text
quarry level 3, sturdy stone town version, tiled roof, clean medieval details, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 029 채석장 Lv4

```text
quarry level 4, prosperous kingdom version, banners without text, refined stone and wood, decorative lamps, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 030 채석장 Lv5

```text
quarry level 5, imperial restored version, ornate royal architecture, bright clean fantasy details, premium village centerpiece, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 031 광산 Lv1

```text
mine level 1, ruined temporary camp version, broken wood, cloth tent, early survival settlement, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 032 광산 Lv2

```text
mine level 2, simple wooden village version, repaired frame, small tools, beginner town restoration, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 033 광산 Lv3

```text
mine level 3, sturdy stone town version, tiled roof, clean medieval details, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 034 광산 Lv4

```text
mine level 4, prosperous kingdom version, banners without text, refined stone and wood, decorative lamps, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 035 광산 Lv5

```text
mine level 5, imperial restored version, ornate royal architecture, bright clean fantasy details, premium village centerpiece, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 036 마법탑 Lv1

```text
magic tower level 1, ruined temporary camp version, broken wood, cloth tent, early survival settlement, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 037 마법탑 Lv2

```text
magic tower level 2, simple wooden village version, repaired frame, small tools, beginner town restoration, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 038 마법탑 Lv3

```text
magic tower level 3, sturdy stone town version, tiled roof, clean medieval details, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 039 마법탑 Lv4

```text
magic tower level 4, prosperous kingdom version, banners without text, refined stone and wood, decorative lamps, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 040 마법탑 Lv5

```text
magic tower level 5, imperial restored version, ornate royal architecture, bright clean fantasy details, premium village centerpiece, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 041 시장 Lv1

```text
market level 1, ruined temporary camp version, broken wood, cloth tent, early survival settlement, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 042 시장 Lv2

```text
market level 2, simple wooden village version, repaired frame, small tools, beginner town restoration, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 043 시장 Lv3

```text
market level 3, sturdy stone town version, tiled roof, clean medieval details, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 044 시장 Lv4

```text
market level 4, prosperous kingdom version, banners without text, refined stone and wood, decorative lamps, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 045 시장 Lv5

```text
market level 5, imperial restored version, ornate royal architecture, bright clean fantasy details, premium village centerpiece, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 046 탐험가 길드 Lv1

```text
explorer guild level 1, ruined temporary camp version, broken wood, cloth tent, early survival settlement, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 047 탐험가 길드 Lv2

```text
explorer guild level 2, simple wooden village version, repaired frame, small tools, beginner town restoration, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 048 탐험가 길드 Lv3

```text
explorer guild level 3, sturdy stone town version, tiled roof, clean medieval details, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 049 탐험가 길드 Lv4

```text
explorer guild level 4, prosperous kingdom version, banners without text, refined stone and wood, decorative lamps, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 050 탐험가 길드 Lv5

```text
explorer guild level 5, imperial restored version, ornate royal architecture, bright clean fantasy details, premium village centerpiece, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 051 연구소 Lv1

```text
research lab level 1, ruined temporary camp version, broken wood, cloth tent, early survival settlement, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 052 연구소 Lv2

```text
research lab level 2, simple wooden village version, repaired frame, small tools, beginner town restoration, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 053 연구소 Lv3

```text
research lab level 3, sturdy stone town version, tiled roof, clean medieval details, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 054 연구소 Lv4

```text
research lab level 4, prosperous kingdom version, banners without text, refined stone and wood, decorative lamps, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 055 연구소 Lv5

```text
research lab level 5, imperial restored version, ornate royal architecture, bright clean fantasy details, premium village centerpiece, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 056 성벽 Lv1

```text
city wall level 1, ruined temporary camp version, broken wood, cloth tent, early survival settlement, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 057 성벽 Lv2

```text
city wall level 2, simple wooden village version, repaired frame, small tools, beginner town restoration, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 058 성벽 Lv3

```text
city wall level 3, sturdy stone town version, tiled roof, clean medieval details, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 059 성벽 Lv4

```text
city wall level 4, prosperous kingdom version, banners without text, refined stone and wood, decorative lamps, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 060 성벽 Lv5

```text
city wall level 5, imperial restored version, ornate royal architecture, bright clean fantasy details, premium village centerpiece, single building only, isometric 3/4 front view, shadow separable, expansion level version, readable construction parts, mobile village builder asset, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

## 8순위: 이펙트

### 검격

```text
4x4 sprite sheet, sword slash impact effect, white and gold arc, fantasy RPG melee hit, transparent background, evenly spaced cells, no cropped frames, clear alpha edges, game VFX ready
```

### 회복

```text
4x4 sprite sheet, healing magic effect, green and gold particles, soft circular pulse, transparent background, evenly spaced cells, no cropped frames, clear alpha edges, game VFX ready
```

### 화염 폭발

```text
8x8 sprite sheet, fireball explosion effect, orange flame and smoke, fantasy RPG spell impact, transparent background, evenly spaced cells, no cropped frames, clear alpha edges, game VFX ready
```

### 심연 저주

```text
8x8 sprite sheet, dark abyss curse effect, purple black energy swirl, fantasy RPG debuff, transparent background, evenly spaced cells, no cropped frames, clear alpha edges, game VFX ready
```

### 얼음 충격

```text
4x4 sprite sheet, ice shard impact effect, pale blue frost burst, fantasy RPG magic hit, transparent background, evenly spaced cells, no cropped frames, clear alpha edges, game VFX ready
```

### 레벨업 빛

```text
4x4 sprite sheet, level up sparkle effect, gold rays and small stars, fantasy RPG reward effect, transparent background, evenly spaced cells, no cropped frames, clear alpha edges, game VFX ready
```

## 9순위: 배경 오브젝트

### 초원 타일

```text
single grassland battle ground tile object, ruined stone path segment, fantasy mobile RPG environment prop, no characters, no full scene, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 숲 타일

```text
single forest battle ground tile object, ancient root and mossy stone segment, fantasy mobile RPG environment prop, no characters, no full scene, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 폐광 타일

```text
single abandoned mine battle ground tile object, dark stone floor and crystal shard segment, fantasy mobile RPG environment prop, no characters, no full scene, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 사막 타일

```text
single desert ruin battle ground tile object, sand-covered stone road segment, brass ruin fragments, fantasy mobile RPG environment prop, no characters, no full scene, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 설원 타일

```text
single frozen field battle ground tile object, icy stone path segment with snow and frost, fantasy mobile RPG environment prop, no characters, no full scene, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 화산 타일

```text
single volcanic forge battle ground tile object, black rock floor segment with orange lava cracks, fantasy mobile RPG environment prop, no characters, no full scene, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 심연 타일

```text
single abyss battle ground tile object, dark stone floor segment with purple void cracks, fantasy mobile RPG environment prop, no characters, no full scene, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

### 마왕성 타일

```text
single demon castle battle ground tile object, black stone floor with red cracks segment, fantasy mobile RPG environment prop, no characters, no full scene, transparent background, isolated object, large transparent padding, minimum 200px empty spacing, easy sprite slicing, no overlap, no cropped edges, single object per image, centered composition, clean alpha edges, mobile game ready, asset pack ready, no text, no watermark, no UI, no background scene
```

## 사용 메모

- 각 코드블록 하나가 이미지 1개 생성용 완성 프롬프트다.
- 단일 오브젝트는 투명 배경 PNG를 기본 출력으로 사용한다.
- 이펙트는 PNG 스프라이트 시트로 제작하고, 셀 간 여백을 충분히 둔다.
- 배경 항목은 전체 배경 장면이 아니라 전투 배경 조립용 단일 타일/오브젝트다.
