# 잃어버린 왕국 : 재건의 시대 - 게임 기획/시스템 문서 v1.0

## 문서 원칙

- 본 프로젝트는 개인 개발자가 제작하는 모바일 세로형 방치형 RPG다.
- Android/iOS 동시 출시를 목표로 하며, 싱글 플레이와 로컬 저장을 기본으로 한다.
- 대규모 MMORPG, 실시간 서버 전투, 길드 레이드, 유저 간 경쟁 중심 구조는 설계에서 제외한다.
- 수익 모델은 선택형 광고 보상과 인앱결제를 중심으로 한다.
- 모든 이미지 제작 프롬프트는 게임 설계와 콘텐츠 설계가 끝난 뒤 마지막 단계에서만 작성한다.

## 1. 기획

### 게임 개요

| 항목 | 내용 |
|---|---|
| 프로젝트명 | 잃어버린 왕국 : 재건의 시대 |
| 장르 | 모바일 세로형 싱글 플레이 중심 방치형 RPG |
| 플랫폼 | Android / iOS |
| 핵심 콘셉트 | 전투와 방치 보상으로 자원을 모아 폐허가 된 왕국을 단계적으로 복구하는 고전 RPG 감성의 성장 게임 |
| 주요 경험 | 마을 성장, 왕국 복구, 장비 파밍, 영웅 수집, 방치 보상 |
| 플레이 방식 | 자동 전투, 오프라인 보상, 영웅/장비 성장, 건물 업그레이드, 탐험, 연구 |
| 서버 의존성 | 결제 검증, 클라우드 저장, 공지, 이벤트 설정, 원격 밸런스 정도로 최소화 |

### 세계관

아스테리온 왕국은 오래전 마왕 모르가스의 침공으로 수도와 영지가 무너졌다. 왕가의 마지막 후계자인 플레이어는 폐허가 된 생존자 캠프에서 시작해 흩어진 주민, 잃어버린 영웅, 봉인된 유적을 되찾는다.

왕국의 발전 단계는 `폐허 -> 마을 -> 도시 -> 왕국 -> 제국`이다. 단계가 오를수록 마을 화면의 성벽, 도로, 건물 밀도, NPC 수, 조명, 상점 장식, 왕궁 외형이 눈에 띄게 변한다. 플레이어는 전투력 숫자뿐 아니라 복구된 공간 자체를 보며 성취를 느껴야 한다.

### 핵심 재미

- 폐허가 실제 왕국으로 변하는 시각적 복구감
- 접속하지 않아도 쌓이는 오프라인 보상과 복귀 동기
- 장비 드롭, 강화, 재련, 세트 완성을 통한 파밍 재미
- 50종 이상 영웅의 수집, 편성, 비전투 배치 활용
- 건물, 주민, 연구가 전투 성장과 경제 성장에 동시에 연결되는 구조
- 지역 보스 격파가 새로운 지역, 건물, 제작식, 마을 외형을 여는 명확한 진척감

### 게임 루프

1. 자동 전투로 골드, 장비, 영웅 경험치, 지역 재료를 획득한다.
2. 오프라인 보상을 수령하고 선택형 광고로 보상을 증폭한다.
3. 영웅 레벨업, 장비 강화, 장비 재련, 연구로 전투력을 올린다.
4. 식량, 목재, 광석, 마력석으로 건물을 건설하고 왕국 단계를 올린다.
5. 영웅을 탐험에 보내 주민, 영웅 조각, 희귀 재료, 보스 열쇠를 획득한다.
6. 보스를 격파해 신규 지역, 건물 레벨, 제작식, 스토리 조각을 해금한다.
7. 다시 더 높은 스테이지를 방치 파밍하며 왕국 복구 속도를 끌어올린다.

### 타겟 유저

- 20~40대 모바일 RPG 및 방치형 RPG 이용자
- 하루 여러 번 짧게 접속하는 유저
- 장비 파밍, 수집, 도감, 마을 성장, 누적 보상을 선호하는 유저
- 강제 경쟁보다 자기 속도 성장과 장기 누적 성취를 선호하는 유저
- 고전 RPG 감성, 왕국 재건, 판타지 영웅 수집에 매력을 느끼는 유저

### BM 전략

- 강제 광고는 사용하지 않는다. 모든 광고는 플레이어가 선택하는 보상형 광고다.
- 광고 제거 패키지는 광고 보상 버튼을 광고 없이 즉시 수령 버튼으로 바꾼다.
- 인앱결제는 시간 단축, 성장 가속, 편의, 시즌 보상 중심으로 설계한다.
- 핵심 콘텐츠 진행, 필수 영웅, 필수 장비, 지역 입장을 유료 전용으로 잠그지 않는다.
- 확률형 상품은 확률 고지, 천장, 조각 교환, 무료 획득 경로를 제공한다.
- 개인 개발 규모에 맞춰 실시간 PvP, 거래소, 길드 경제는 제외한다.
- 다운로드 전환, D1/D7 재접속, 복귀율 개선을 위한 세부 설계는 [RETENTION_GROWTH_UPGRADE.md](RETENTION_GROWTH_UPGRADE.md)에 분리한다.
- 광고/IAP 구현 정책, 상품 ID, 검증, 복원, 분석 이벤트는 [MONETIZATION_IMPLEMENTATION.md](MONETIZATION_IMPLEMENTATION.md)에 분리한다.

## 2. 시스템

### 전투 시스템

| 항목 | 설계 |
|---|---|
| 화면 구조 | 세로형 화면 상단 적, 하단 아군 5인 파티 |
| 전투 방식 | 자동 전투 기반, 궁극기 자동/수동 토글 |
| 편성 | 전열 2명, 후열 3명 |
| 역할 | 탱커, 전사, 암살자, 궁수, 마법사, 사제, 지원가 |
| 속성 | 무, 불, 물, 바람, 땅, 빛, 어둠 |
| 스테이지 | 일반 스테이지 10웨이브 후 보스전 |
| 패배 처리 | 현재 스테이지 유지, 이전 안정 스테이지 자동 파밍, 성장 후 재도전 |
| 보스 재도전 | 일일 기본권, 광고 보상, 일부 패스 보상으로 획득 |

피해 공식 초안:

```text
최종 피해 =
공격력
x 스킬 계수
x 속성 보정
x 치명 보정
x 방어 감쇠
x 보스/일반 대상 보정
x 랜덤 보정
```

속성 상성은 초반 이해도를 위해 강한 상성보다 약한 보너스로 둔다. 일반 구간은 방치 진행이 막히지 않게 하고, 보스전에서 편성, 장비, 연구의 차이가 드러나도록 설계한다.

### 성장 시스템

| 성장 축 | 내용 |
|---|---|
| 계정 성장 | 왕국 레벨, 최고 클리어 스테이지, 도감 달성도 |
| 주인공 성장 | 왕권 레벨, 칭호, 유물 슬롯 |
| 영웅 성장 | 레벨, 별 승급, 스킬 레벨, 각성, 전용 장비 |
| 장비 성장 | 강화, 승급, 재련, 세트 효과 |
| 마을 성장 | 건물 레벨, 주민 수, 행복도, 생산 효율 |
| 연구 성장 | 경제, 전투, 제작, 탐험 4개 트리 |

성장 우선순위는 초반에 영웅 레벨과 장비 강화, 중반에 건물과 연구, 후반에 재련과 각성으로 이동한다. 모든 성장 축은 서로 독립적이지 않고, 전투 진행과 왕국 복구를 함께 밀어주도록 연결한다.

### 장비 시스템

| 항목 | 설계 |
|---|---|
| 등급 | 일반, 고급, 희귀, 영웅, 전설, 신화 |
| 슬롯 | 무기, 투구, 갑옷, 장갑, 신발, 목걸이, 반지, 망토, 허리띠, 유물 |
| 획득처 | 전투 드롭, 보스 상자, 제작, 탐험, 광고 상자, 패스 보상 |
| 옵션 | 주옵션 1개, 보조옵션 1~4개, 세트 효과 |
| 강화 | 골드와 광석 사용, 실패 없음 |
| 재련 | 마력석 사용, 보조옵션 재부여 |
| 승급 | 동일 장비 또는 장비 조각 사용 |
| 분해 | 불필요 장비를 광석, 강화석, 제작 파편으로 환급 |

장비는 파밍의 핵심이므로 드롭 빈도는 높게 유지하되, 고등급 완성에는 제작, 분해, 조각 교환을 섞어 장기 목표를 만든다.

### 제작 시스템

| 제작 건물 | 기능 |
|---|---|
| 대장간 | 무기, 방어구, 장비 승급 재료 제작 |
| 연금공방 | 소모품, 재료 합성, 버프 아이템 제작 |
| 마법탑 | 재련석, 마력석 변환, 전용 장비 제작 |

- 짧은 제작은 즉시 완료한다.
- 희귀 이상 장비, 고급 재료, 전용 장비는 제작 대기 시간을 둔다.
- 제작 실패 확률은 배제한다.
- 즉시 완료는 선택형 광고 또는 다이아로 처리한다.
- 제작 레시피는 지역 보스 격파와 건물 레벨로 해금한다.

### 주민 시스템

주민은 왕국 복구의 시각적 밀도와 생산 효율을 담당한다. 단순한 숫자 자원이 아니라 마을 화면에 표시되는 생활감의 핵심이다.

| 항목 | 설계 |
|---|---|
| 직업 | 농부, 벌목꾼, 광부, 대장장이, 상인, 학자, 사제, 정찰병 |
| 획득처 | 지역 구출, 탐험 보상, 건물 업그레이드, 스토리 해금 |
| 배치 | 건물별 슬롯에 배치해 생산량, 제작 속도, 탐험 효율 증가 |
| 행복도 | 식량, 주거, 시장, 축제 이벤트, 사제 보너스로 상승 |
| 시각 표현 | 주민 수가 늘수록 마을에 NPC 이동, 작업, 상점 활동이 증가 |

### 건물 시스템

핵심 건물은 왕국 복구와 시스템 해금을 담당한다.

| 건물 | 주요 기능 |
|---|---|
| 왕궁 | 왕국 단계, 전체 생산 보너스, 신규 시스템 해금 |
| 여관 | 영웅 관리, 영웅 회복, 주민 수용 |
| 대장간 | 장비 제작, 강화 관련 보너스 |
| 농장 | 식량 생산 |
| 벌목소 | 목재 생산 |
| 채석장 | 건설용 석재 보조 생산 |
| 광산 | 광석 생산 |
| 마법탑 | 마력석 생산, 재련, 전용 장비 |
| 시장 | 골드 보너스, 상점, 축제 |
| 탐험가 길드 | 탐험 슬롯, 탐험 지역, 보상 증가 |
| 연구소 | 연구 트리, 연구 슬롯 |
| 성벽 | 방어 보너스, 왕국 외형, 보스 피해 감소 |

모든 주요 건물은 Lv1~Lv5로 구성한다.

| 레벨 | 외형 방향 | 기능 방향 |
|---:|---|---|
| Lv1 | 임시 천막, 부서진 목재, 폐허 흔적 | 기본 기능 해금 |
| Lv2 | 간단한 목조 건물 | 생산량 증가, 슬롯 1개 |
| Lv3 | 석조 구조, 정돈된 도로 | 신규 제작식/연구/탐험 해금 |
| Lv4 | 깃발, 조명, 장식 강화 | 효율 증가, 자동화 일부 해금 |
| Lv5 | 왕국 양식 완성, 제국 장식 | 상위 보너스와 외형 완성 |

왕국 단계는 왕궁 레벨과 주요 건물 평균 레벨로 결정한다.

```text
폐허: 시작 상태
마을: 왕궁 Lv2, 주요 생산 건물 3개 이상 Lv2
도시: 왕궁 Lv3, 주요 건물 평균 Lv3
왕국: 왕궁 Lv4, 성벽/시장/연구소 Lv4
제국: 왕궁 Lv5, 주요 건물 평균 Lv5
```

### 영웅 시스템

- 기본 설계 영웅 수는 50종 이상이다.
- 획득 경로는 스토리 가입, 무료 소환, 다이아 소환, 영웅 조각, 탐험 구출로 나눈다.
- 중복 영웅은 영웅 조각으로 전환한다.
- 영웅은 전투 편성과 비전투 보너스를 동시에 가진다.
- 비전투 보너스는 건물 생산, 탐험 성공률, 제작 시간, 연구 시간, 자원 보너스 등으로 구성한다.

성장 구조:

```text
영웅 획득 -> 레벨업 -> 별 승급 -> 스킬 강화 -> 각성 -> 전용 장비
```

초반에는 희귀 영웅도 충분히 활용 가능해야 한다. 전설/신화 영웅은 더 강하지만 특정 지역 진행에 필수로 만들지 않는다.

### 연구 시스템

| 연구 트리 | 효과 |
|---|---|
| 경제 | 생산량, 저장량, 오프라인 보상 시간 증가 |
| 전투 | 공격력, 체력, 치명타, 보스 피해 증가 |
| 제작 | 제작 시간 감소, 고등급 제작 확률, 분해 환급량 증가 |
| 탐험 | 탐험 시간 감소, 희귀 보상 확률, 부상 확률 감소 |

연구 비용은 골드, 목재, 광석, 마력석 조합으로 구성한다. 초반 연구는 빠르게 체감되게 하고, 후반 연구는 장기 목표가 되도록 시간과 비용을 늘린다.

### 탐험 시스템

영웅을 일정 시간 파견해 재료, 주민, 영웅 조각, 보스 열쇠를 획득한다.

| 탐험 등급 | 시간 | 설계 목적 |
|---|---:|---|
| 짧음 | 30분 | 자주 접속하는 유저용 |
| 보통 | 2시간 | 기본 탐험 |
| 긴급 | 4시간 | 중간 보상과 광고 즉시 완료 대상 |
| 장기 | 8시간 | 수면/업무 시간 방치용 |

- 위험도는 낮음, 보통, 높음으로 나눈다.
- 실패해도 최소 보상을 지급한다.
- 지역 속성, 영웅 역할, 영웅 태그에 따라 추천 편성과 성공률을 표시한다.
- 즉시 완료는 선택형 광고 또는 다이아로 처리한다.

### 오프라인 보상

| 항목 | 설계 |
|---|---|
| 기본 누적 시간 | 8시간 |
| 연구 확장 | 최대 10시간 |
| 월정액 확장 | 최대 12시간 |
| 기준 스테이지 | 최고 안정 클리어 스테이지 |
| 포함 보상 | 골드, 영웅 경험치, 장비, 식량, 목재, 광석 |
| 제외 보상 | 다이아, 시즌 패스 핵심 보상, 최초 클리어 보상 |
| 광고 보상 | 수령 시 2배, 일 5회 |

보상 공식 초안:

```text
오프라인 보상 =
최고 안정 스테이지의 분당 보상
x 오프라인 시간
x 연구 보너스
x 월정액 보너스
```

### 콘텐츠 설계 요약

상세 콘텐츠는 [CONTENT_CATALOG.md](CONTENT_CATALOG.md)에 분리한다.

| 콘텐츠 | 수량 | 설계 |
|---|---:|---|
| 지역 | 8종 | 초원, 숲, 폐광, 사막, 설원, 화산, 심연, 마왕성 |
| 일반 몬스터 | 104종 | 지역별 13종 |
| 보스 | 32종 | 지역별 4종 |
| 영웅 | 50종 | 등급, 역할, 속성, 전투 스킬, 비전투 보너스 포함 |
| 장비 | 200종 | 20개 세트 x 10개 슬롯 |

### 리텐션/다운로드 성장 시스템

세부 설계는 [RETENTION_GROWTH_UPGRADE.md](RETENTION_GROWTH_UPGRADE.md)에 분리한다.

| 시스템 | 목적 | 서버 의존성 |
|---|---|---|
| 첫 10분 왕국 복구 루프 | 설치 직후 이탈 감소, 첫 보스 목표 형성 | 없음 |
| 복귀 왕국 보고서 | 재접속 시 보상과 다음 행동을 명확히 제시 | 없음 |
| 7일 재건 로드 | D1/D3/D7 목표 제공 | 없음 |
| 일일/주간 왕국 명령 | 반복 접속 루틴 형성 | 없음 |
| 로컬 LiveOps 이벤트 | 주간/주말 재방문 이유 제공 | 원격 설정 선택 |
| 복귀자 구출 작전 | 3일/7일/14일 미접속 복귀 유도 | 없음 |
| 스토어 실험 계획 | 다운로드 전환율 개선 | 스토어 콘솔 |
| 분석 이벤트 | 이탈 지점과 개선 우선순위 파악 | 분석 SDK |

## 3. 경제

### 재화 설계

| 재화 | 획득처 | 사용처 | 밸런스 원칙 |
|---|---|---|---|
| 골드 | 전투, 오프라인 보상, 보스, 퀘스트, 광고 2배 | 영웅 레벨업, 장비 강화, 연구, 상점 | 항상 부족하지만 진행을 멈추게 하지 않는 기본 성장 재화 |
| 다이아 | 업적, 일일/주간 미션, 최초 클리어, 결제, 패스 | 소환, 제작 즉시 완료, 탐험 즉시 완료, 인벤토리 확장 | 무료 지급은 꾸준히, 대량 소비는 선택형 |
| 식량 | 농장, 탐험, 지역 보상, 이벤트 | 주민 유지, 탐험 출발, 축제, 일부 연구 | 주민 성장과 탐험 빈도 조절 |
| 목재 | 벌목소, 숲 지역, 탐험, 일일 보상 | 건물 건설, 제작, 연구 | 초중반 건물 병목 재화 |
| 광석 | 광산, 폐광/화산, 장비 분해, 보스 | 장비 강화, 건물, 제작 | 중반 장비 성장 병목 재화 |
| 마력석 | 마법탑, 심연/마왕성, 보스, 패스 | 재련, 각성, 고급 연구, 전용 장비 | 후반 핵심 병목 재화 |

### 획득 밸런스

- 골드는 전투와 오프라인 보상에서 가장 안정적으로 공급한다.
- 식량, 목재, 광석은 건물 생산과 지역 파밍을 통해 공급한다.
- 마력석은 후반 병목을 담당하되, 보스와 탐험으로 무료 획득 경로를 둔다.
- 다이아는 매일 소량 지급하고, 결제는 시간 단축과 선택지 확장 중심으로 둔다.

### 사용 밸런스

| 구간 | 주요 병목 | 목표 플레이 |
|---|---|---|
| 초반 30분 | 목재, 골드 | 건물 3개 건설, 영웅 5명 확보, 장비 강화 10회 |
| 1일차 | 목재, 식량 | 폐허에서 마을 진입, 초원 보스 2종 격파 |
| 3일차 | 광석 | 숲 진입, 장비 제작 해금, 첫 전설 조각 획득 |
| 7일차 | 광석, 연구 비용 | 폐광 후반, 왕궁 Lv3, 영웅 15명 보유 |
| 14일차 이후 | 마력석 | 재련, 각성, 전설 장비 완성 목표 |

### 비용 증가 원칙

```text
영웅 성장 비용 = 기본 비용 x 레벨 계수 x 등급 계수
장비 강화 비용 = 기본 비용 x 강화 단계 계수 x 장비 등급 계수
건물 비용 = 왕국 단계별 계단식 비용 x 건물 중요도 계수
연구 비용 = 트리 단계 비용 x 누적 연구 수 보정
```

초반 비용은 빠른 보상을 주고, 중후반에는 여러 시스템을 병행해야 효율이 나오게 한다. 단일 재화가 완전히 막히는 구간은 피하고, 탐험/분해/광고/이벤트로 우회 경로를 제공한다.

## 4. 광고

강제 광고는 사용하지 않는다. 모든 광고는 플레이어가 보상 내용을 보고 직접 선택하는 보상형 광고로만 운영한다.

### 광고 보상 설계

| 번호 | 광고 보상 | 효과 | 시청 제한 |
|---:|---|---|---|
| 1 | 오프라인 보상 2배 | 현재 수령 가능한 오프라인 보상 2배 | 일 5회 |
| 2 | 골드 2배 | 30분간 전투 골드 2배 | 일 5회 |
| 3 | 자원 2배 | 30분간 식량/목재/광석 생산 2배 | 일 5회 |
| 4 | 영웅 탐험 즉시 완료 | 남은 시간이 4시간 이하인 탐험 1개 완료 | 일 3회 |
| 5 | 건물 건설 즉시 완료 | 남은 시간이 2시간 이하인 건설 1개 완료 | 일 3회 |
| 6 | 장비 상자 획득 | 희귀~전설 장비 상자 1개 지급 | 일 5회 |
| 7 | 보스 재도전권 | 보스 입장권 1개 지급 | 일 3회 |
| 8 | 무료 소환 | 일반 영웅/장비 소환 1회 | 일 5회 |
| 9 | 전설 상자 확률 증가 | 다음 장비 상자 전설 확률 +50% 상대 증가 | 일 1회 |
| 10 | 일일 특별 보상 | 다이아, 마력석, 소환권 중 1개 | 일 1회 |

### 광고 UX 원칙

- 전투 도중 강제 광고를 삽입하지 않는다.
- 보상 버튼 옆에 보상량과 일일 남은 횟수를 표시한다.
- 광고 로딩 실패 시 보상을 소모하지 않고 재시도 가능하게 한다.
- 광고 제거 패키지 구매자는 동일 제한 안에서 광고 없이 즉시 보상을 받는다.
- 광고 보상은 유료 구매자와 무료 유저 모두에게 의미가 있어야 한다.

## 5. 결제

### 인앱결제 상품

| 상품 | 가격 | 구성 | 목적 |
|---|---:|---|---|
| 스타터 패키지 | 1,500원 | 다이아 300, 희귀 장비 선택 상자 1개, 골드 2시간분 | 첫 결제 진입 |
| 광고 제거 패키지 | 8,900원 | 광고 시청 없이 광고 보상 즉시 수령, 영구 적용 | 장기 편의 |
| 월정액 | 6,500원 | 매일 다이아 100, 경험치 +10%, 자원 +10%, 오프라인 최대 12시간 | 반복 결제 |
| 왕국 패스 | 12,900원 | 시즌 미션, 무료/프리미엄 보상, 한정 영웅 조각, 전설 장비 상자 | 시즌형 매출 |
| 성장 패키지 I | 5,900원 | 초원~숲 구간 다이아, 골드, 희귀 장비, 목재 | 초반 정착 |
| 성장 패키지 II | 12,900원 | 폐광~사막 구간 다이아, 광석, 영웅 소환권, 영웅 장비 | 중반 성장 |
| 성장 패키지 III | 29,000원 | 설원 이후 다이아, 마력석, 전설 선택 상자, 각성 재료 | 후반 가속 |

### 상품별 세부 원칙

- 스타터 패키지는 첫 결제 부담을 낮추고, 초반 체감 장비를 제공한다.
- 광고 제거는 광고 보상의 가치를 유지하면서 시청 피로를 없앤다.
- 월정액은 매일 접속 동기를 만들되, 전투 필수권한을 부여하지 않는다.
- 왕국 패스는 시즌 미션 기반이며 무료 라인과 프리미엄 라인을 모두 둔다.
- 성장 패키지는 구간 해금형으로 노출하고, 구매하지 않아도 같은 구간을 플레이 가능하게 한다.

### 확률형 상품 원칙

- 영웅/장비 소환 확률은 등급별로 명확히 고지한다.
- 일정 횟수 이상 소환 시 고등급 보장 천장을 제공한다.
- 중복 영웅과 장비는 조각 또는 교환 재화로 환급한다.
- 한정 영웅은 일정 기간 이후 조각 교환 또는 복각 경로를 제공한다.

## 6. UI

### 공통 UI

| 항목 | 설계 |
|---|---|
| 화면 방향 | 세로형 고정 |
| 상단 영역 | 골드, 다이아, 전투력, 알림 |
| 하단 메뉴 | 마을, 전투, 영웅, 장비, 상점 |
| 조작 원칙 | 한 손 조작 가능 |
| 접근 원칙 | 주요 기능 3클릭 이내 이동 |
| 보상 버튼 | 엄지 접근 영역 우선 배치 |
| 시각 톤 | 고전 RPG 감성의 세미 SD 판타지, 과도한 MMO 정보 밀도 금지 |

### 네비게이션 구조

```text
Title
  -> Main
      -> 마을
      -> 전투
      -> 영웅
      -> 장비
      -> 상점
      -> 건물 상세
      -> 패키지
      -> 설정
```

### 시작 화면

```text
[게임 로고]
[폐허가 된 성 실루엣]
[터치하여 시작]
[계정 연동] [설정]
```

### 마을 화면

```text
[골드] [다이아] [전투력] [알림]
[왕국 전경: 폐허/마을/도시/왕국/제국 단계별 변화]
[건물 생산 말풍선] [건설 완료 아이콘] [탐험 완료 아이콘]
[하단 메뉴: 마을 | 전투 | 영웅 | 장비 | 상점]
```

### 전투 화면

```text
[스테이지] [골드] [전투력]
[적 웨이브 / 보스 HP]
[전투 로그 최소 영역]
[아군 5인 편성 + 스킬 게이지]
[보스 도전] [자동진행] [보상]
[하단 메뉴]
```

### 영웅 화면

```text
[영웅 목록 필터: 역할/속성/등급]
[선택 영웅 모델]
[전투 스탯] [비전투 보너스]
[레벨업] [승급] [스킬] [장비]
[편성 바로가기]
```

### 장비 화면

```text
[장비 슬롯 10개]
[선택 장비 상세]
[인벤토리 정렬: 등급/부위/세트]
[강화] [재련] [분해] [자동장착]
```

### 건물 화면

```text
[건물 이미지 Lv1~Lv5]
[현재 효과 / 다음 레벨 효과]
[필요 재료]
[배치 주민 슬롯]
[건설] [광고 즉시완료] [주민 배치]
```

### 상점 화면

```text
[무료 보상]
[다이아 상품]
[패키지]
[왕국 패스]
[광고 보상]
```

### 패키지 화면

```text
[추천 상품 1개]
[구간별 성장 패키지]
[월정액]
[광고 제거]
[확률 고지 / 구매 복원]
```

### 설정 화면

```text
[사운드] [진동] [알림]
[언어] [계정 연동] [클라우드 저장]
[문의] [약관] [개인정보 처리방침]
[구매 복원]
```

## 7. 개발문서

### 기술 방향

- Unity 기반 모바일 프로젝트로 설계한다.
- 데이터는 ScriptableObject 또는 JSON/CSV 테이블로 관리한다.
- 유저 저장 데이터는 로컬 암호화 저장을 기본으로 하고, 선택형 클라우드 백업을 제공한다.
- 서버는 결제 검증, 공지, 이벤트 설정, 원격 밸런스 값 배포 정도로 최소화한다.
- 전투 검증 서버는 만들지 않는다. 싱글 플레이 중심으로 완결한다.

### DB 구조

| 구분 | 테이블 |
|---|---|
| 정적 데이터 | Hero, Monster, Boss, Equipment, EquipmentSet, Item, Building, Research, Stage, Region, Expedition, RewardTable, ShopProduct, RetentionHook, LiveEvent |
| 유저 데이터 | PlayerProfile, Inventory, HeroState, EquipmentState, BuildingState, ResidentState, ResearchState, ExpeditionState, QuestState |
| 운영 데이터 | Notice, EventConfig, RemoteBalance, ProductCatalog, AdPlacementConfig, IapProduct, PurchaseValidationRule, MonetizationOfferSurface, StoreExperiment, AnalyticsEvent |

### 저장 구조

```text
SaveData
  profile
    playerId
    kingdomName
    createdAt
    lastLoginAt
  progress
    regionId
    stageId
    highestStableStageId
    kingdomTier
    tutorialFlags
  currencies
    gold
    diamond
    food
    wood
    ore
    magicStone
  heroes
    ownedHeroStates
    partySlots
  inventory
    equipmentInstances
    itemStacks
  village
    buildings
    residents
    assignments
    happiness
  research
    unlockedNodes
    activeResearch
  expeditions
    activeMissions
    completedMissions
  monetization
    purchases
    adLimits
    passProgress
  retention
    sevenDayRoadProgress
    dailyOrders
    weeklyOrders
    comebackState
    localEventState
  analytics
    firstSessionFlags
    funnelMilestones
    storeVariantId
```

### 클래스 구조

```text
GameBootstrap
SaveManager
TimeManager
TableDataLoader
CurrencyService
RewardService

CombatController
StageController
BattleUnit
SkillResolver
DamageCalculator

HeroService
EquipmentService
InventoryService
VillageService
BuildingService
ResidentService
ResearchService
ExpeditionService

AdService
IapService
ProductCatalogService
CloudSaveService

UiNavigationController
TopBarView
BottomNavView
PopupManager
ToastManager
```

### 폴더 구조

```text
Assets/
  Art/
    Characters/
    Monsters/
    Equipment/
    Buildings/
    UI/
    Effects/
    Environment/
  Audio/
    BGM/
    SFX/
  Data/
    Tables/
    ScriptableObjects/
  Prefabs/
    Combat/
    Village/
    UI/
    Effects/
  Scenes/
    Boot.unity
    Title.unity
    Main.unity
    Combat.unity
    Village.unity
    Shop.unity
  Scripts/
    Core/
    Combat/
    Economy/
    Hero/
    Equipment/
    Village/
    Research/
    Expedition/
    Monetization/
    UI/
  Addressables/
```

### 씬 구조

| 씬 | 역할 |
|---|---|
| Boot | 앱 초기화, 테이블 로드, 저장 데이터 로드, SDK 초기화 |
| Title | 시작 화면, 계정 연동, 공지, 설정 진입 |
| Main | 하단 메뉴 기반 메인 컨테이너 |
| Combat | 전투 연출, 스테이지 진행, 보스 도전 |
| Village | 마을 전경, 건물 상호작용, 주민 배치 |
| Shop | 결제, 패스, 광고 보상, 구매 복원 |

### 데이터 테이블 구조

| 테이블 | 주요 컬럼 |
|---|---|
| Region | id, name, unlockStage, elementTheme, mainResource, visualTier |
| Stage | id, regionId, stageNo, monsterGroupId, bossId, goldPerMin, expPerMin, dropTableId |
| Monster | id, name, regionId, role, element, hp, atk, defense, dropTableId |
| Boss | id, name, regionId, pattern, hpScale, atkScale, rewardId |
| Hero | id, name, rarity, role, element, skillId, passiveId, buildingBonus |
| Skill | id, name, targetType, coefficient, cooldown, effectType |
| Equipment | id, name, slot, rarity, setId, mainStat, subStatPool |
| EquipmentSet | id, name, rarity, twoSetEffect, fourSetEffect, sixSetEffect |
| Building | id, name, maxLevel, costTableId, productionType, unlockCondition |
| Resident | id, job, grade, productionBonus, assignmentType |
| Research | id, tree, prerequisiteId, cost, duration, effectType, effectValue |
| Expedition | id, regionId, duration, risk, requiredPower, rewardTableId |
| RewardTable | id, rewardType, itemId, amountMin, amountMax, weight |
| ShopProduct | id, type, price, rewardId, purchaseLimit, displayCondition |
| AdPlacement | id, rewardType, dailyLimit, cooldown, unlockCondition |
| IapProduct | id, shopProductId, googlePlayProductId, appleProductId, productType, priceKrw, fulfillmentPolicy, restorePolicy |
| PurchaseValidationRule | id, name, enforcement, policy |
| MonetizationOfferSurface | id, name, monetizationId, flow, displayRule |
| MonetizationAnalyticsEvent | id, eventName, category |
| RetentionHook | id, name, type, targetMetric, design |
| LiveEvent | id, name, cadence, targetRegion, design, serverDependency |
| StoreExperiment | id, name, platform, assetType, hypothesis |
| AnalyticsEvent | id, eventName, category |

## 8. 이미지 제작 프롬프트

이미지 제작 프롬프트는 게임 설계와 콘텐츠 설계 완료 후 마지막 단계에서만 작성한다. 전체 프롬프트는 [IMAGE_PROMPTS.md](IMAGE_PROMPTS.md)에 분리한다.

이미지 제작 순서:

1. UI 아이콘
2. 재화 아이콘
3. 주인공
4. 몬스터
5. 장비
6. 건물
7. 이펙트
8. 배경 오브젝트

공통 원칙:

- transparent background
- isolated object
- large transparent padding
- minimum 200px empty spacing
- easy sprite slicing
- no overlap
- no cropped edges
- single object per image
- centered composition
- clean alpha edges
- mobile game ready
- asset pack ready
- no text
- no watermark
- no UI
- no background scene
