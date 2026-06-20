# 잃어버린 왕국 : 재건의 시대 - 광고/결제 구현 문서 v1.0

## 목적

광고와 인앱결제는 출시 전 반드시 데이터 계약, 검증 정책, 복원 정책, 분석 이벤트를 먼저 고정해야 한다. 본 문서는 Unity SDK 연동 전에 준비할 수 있는 광고/IAP 구조를 정의한다.

## 공식 문서 기준

- AdMob Android 보상형 광고와 테스트 광고 문서는 광고 로드, 표시, 완료 콜백, 테스트 기기 사용을 통해 유저 경험, 리텐션, 수익 균형을 검증하는 기준으로 사용한다.
  - 출처: https://docs.unity.com/grow/levelplay/platform/settings/capping-pacing
- Unity IAP receipt validation은 구매 영수증의 진위를 검증해 사기와 비정상 결제를 방지하는 절차다.
  - 출처: https://docs.unity.com/en-us/iap/receipt-validation
- Google Play Billing Library는 Google Play와 통신해 현지화된 상품 정보, 구매 흐름, 구매 결과 처리를 제공한다.
  - 출처: https://developer.android.com/google/play/billing
  - 출처: https://developer.android.com/google/play/billing/integrate
- Apple StoreKit은 App Store를 통해 결제를 처리하고 앱에 거래 결과를 전달한다. Apple은 구매 복원 기능을 제공해 기존 구매 접근 권한을 유지하도록 안내한다.
  - 출처: https://developer.apple.com/documentation/storekit/in-app-purchase
  - 출처: https://developer.apple.com/documentation/storekit/restoring-purchased-products

## 생성 데이터 테이블

| 파일 | 목적 |
|---|---|
| `Assets/Data/Tables/ad_placements.json` | 보상형 광고 배치, 일일 제한, 쿨다운, 보상 지급 정책 |
| `Assets/Data/Tables/shop_products.json` | 상점에 노출되는 상품 기본 정보 |
| `Assets/Data/Tables/iap_products.json` | Google Play / Apple 상품 ID와 지급/복원 정책 |
| `Assets/Data/Tables/purchase_validation_rules.json` | 영수증 검증, 구매 복원, 중복 지급 방지 정책 |
| `Assets/Data/Tables/monetization_offer_surfaces.json` | 광고/결제 상품 노출 위치와 표시 규칙 |
| `Assets/Data/Tables/monetization_analytics_events.json` | 광고/IAP 분석 이벤트 |

## 광고 정책

강제 광고는 사용하지 않는다. 모든 광고는 보상형 광고이며, 보상 내용과 남은 횟수를 유저가 확인하고 선택해야 한다.

### 광고 배치 원칙

| 원칙 | 내용 |
|---|---|
| format | 모든 광고는 `rewarded` |
| isForced | 항상 `false` |
| dailyLimit | 배치별 일일 제한 |
| cooldownMinutes | 동일 배치 반복 시 최소 간격 |
| placementScreen | 광고가 노출되는 화면 |
| rewardGrantPolicy | 광고 완료 후 지급 정책 |

### SDK 연동 시 처리 순서

```text
1. ad_placements.json 로드
2. 현재 유저의 일일 시청 횟수와 cooldown 확인
3. 광고 SDK ready 상태 확인
4. 광고 시청 시작 이벤트 기록
5. 광고 완료 콜백 수신
6. rewardGrantPolicy에 따라 보상 지급
7. 지급 성공 이벤트와 일일 카운트 저장
```

광고 실패, 닫기, 네트워크 오류는 보상 미지급으로 처리한다. 단, 횟수와 쿨다운은 성공 완료 후에만 차감한다.

## 인앱결제 정책

### 상품 타입

| 타입 | 예시 | 복원 정책 |
|---|---|---|
| consumable | 스타터 패키지, 성장 패키지 | 일반적으로 복원 불가, 거래 ID 중복 지급만 방지 |
| non_consumable | 광고 제거 | 복원 가능 |
| subscription | 월정액 | 구독 상태 복원 가능 |
| season_pass | 왕국 패스 | 현재 시즌 권한 복원 |

### 상품 ID 규칙

| 플랫폼 | 규칙 |
|---|---|
| Google Play | `lostkingdom.<product>` |
| Apple App Store | `com.lostkingdom.<product>` |

실제 스토어 등록 시 상품 ID를 변경하면 `iap_products.json`도 함께 변경해야 한다.

### 결제 처리 순서

```text
1. iap_products.json 로드
2. 스토어 상품 메타데이터 요청
3. 가격/상품 상태를 상점 UI에 반영
4. 구매 시작 이벤트 기록
5. 스토어 구매 결과 수신
6. 영수증 구조 확인
7. 서버가 있으면 영수증 검증 요청
8. transactionId 기준 중복 지급 여부 확인
9. fulfillmentPolicy에 따라 상품 지급
10. 지급 완료와 entitlement 상태 저장
```

서버가 아직 없는 초기 빌드에서는 로컬 영수증 검증과 transactionId 중복 방지를 적용한다. 출시 빌드에서는 최소한 광고 제거, 월정액, 패스는 서버 검증을 권장한다.

## 구매 복원

iOS는 설정 화면과 패키지 화면에 구매 복원 버튼을 제공한다. Android도 계정 재동기화와 구독 상태 재조회 버튼을 같은 위치에 둔다.

복원 버튼 위치:

- 설정 화면
- 패키지 화면 하단
- 광고 제거 상품 상세
- 월정액 상품 상세

복원 처리:

```text
1. 복원 시작 이벤트 기록
2. 스토어 복원/재조회 API 호출
3. 구매 내역 수신
4. 영수증/거래 ID 검증
5. non_consumable/subscription/season_pass 권한 복원
6. 복원 결과 팝업 표시
```

## 중복 지급 방지

모든 구매 지급은 `transactionId` 또는 스토어 purchase token을 기준으로 한 번만 처리한다.

```text
PurchaseLedger
  transactionId
  productId
  platform
  purchaseState
  validationState
  fulfilledAt
```

이미 지급된 transactionId가 다시 들어오면 보상은 다시 지급하지 않고 entitlement 상태만 재확인한다.

## 광고 제거 패키지

광고 제거 구매자는 동일한 일일 제한 안에서 광고 시청 없이 보상을 즉시 수령한다.

처리 원칙:

- 광고 보상 경제량은 그대로 유지한다.
- `ad_placements.json`의 dailyLimit/cooldown 정책은 유지한다.
- 버튼 문구는 “광고 시청”에서 “즉시 수령”으로 바꾼다.
- 분석 이벤트는 `ad_skip_reward_claimed`를 별도 추가할 수 있다.

## 분석 이벤트

`monetization_analytics_events.json`에는 광고 노출, 클릭, 시작, 완료, 실패, 보상 지급, 결제 시작, 결제 완료, 영수증 검증, 복원 관련 이벤트를 정의한다.

초기 핵심 지표:

| 지표 | 목적 |
|---|---|
| 광고 제안 노출 대비 수락률 | 보상 매력도 확인 |
| 광고 완료 대비 보상 지급률 | SDK/네트워크 문제 확인 |
| 광고 후 세션 길이 | 광고가 이탈을 유발하는지 확인 |
| 상품 상세 진입 대비 구매 시작률 | 가격/구성 매력도 확인 |
| 구매 시작 대비 완료율 | 결제 흐름 문제 확인 |
| 영수증 검증 실패율 | 비정상 결제 또는 구현 문제 확인 |
| 복원 성공률 | 구매 복원 UX 문제 확인 |

## 출시 전 체크리스트

- Google Play Console에 모든 `googlePlayProductId` 등록
- App Store Connect에 모든 `appleProductId` 등록
- 광고 배치별 placement name과 SDK 설정 매핑
- iOS 구매 복원 버튼 구현
- 영수증 검증 실패 시 보상 미지급 처리
- transactionId 중복 지급 방지
- 광고 완료 전 보상 지급 금지
- 광고 제거 구매 후 광고 없는 즉시 수령 확인
- 월정액 만료/갱신/복원 상태 확인
- 결제 실패, 취소, pending 상태 UI 처리
