# 광고/IAP SDK 연동 다음 단계

## 현재 완료된 범위

- 광고/IAP 정책 데이터 테이블 생성
- 보상형 광고 강제 노출 방지, 일일 제한, 쿨다운 정책 C# 코어 구현
- 광고 제거 구매자 즉시 수령 정책 C# 코어 구현
- 구매 transactionId 중복 지급 방지 C# 코어 구현
- SDK 어댑터 인터페이스 정의

## Unity SDK 설치 후 연결할 어댑터

| 어댑터 | 대상 SDK | 역할 |
|---|---|---|
| `IRewardedAdAdapter` | Google Mobile Ads SDK for AdMob | 광고 ready 확인, 광고 표시, 완료 콜백 전달 |
| `IIapStoreAdapter` | Unity IAP | 구매 시작, 구매 결과, 구매 복원 결과 전달 |

## 구현 순서

1. Unity Package Manager에서 광고 SDK와 Unity IAP 설치
2. `Assets/Data/Tables/ad_placements.json`을 로드해 AdMob app ID `ca-app-pub-4402708884038037~5285192241` 및 rewarded ad unit ID `ca-app-pub-4402708884038037/6509654325` 매핑
3. `Assets/Data/Tables/iap_products.json`을 로드해 store product ID 매핑
4. `IRewardedAdAdapter` 구현체 작성
5. `IIapStoreAdapter` 구현체 작성
6. 구매 결과 수신 시 `PurchaseLedger.TryMarkFulfilled`로 중복 지급 방지
7. 광고 보상 수령 시 `RewardedAdPolicy.Evaluate`로 표시/즉시수령/차단 결정
8. `monetization_analytics_events.json`의 이벤트 이름으로 분석 SDK 연결

## 주의 사항

- 광고 완료 콜백 전에는 보상을 지급하지 않는다.
- 광고 실패/취소는 일일 횟수를 차감하지 않는다.
- 광고 제거 구매자는 SDK ready 여부와 무관하게 즉시 수령 가능하다.
- iOS에는 구매 복원 버튼을 설정 화면과 패키지 화면에 노출한다.
- 소비성 상품은 transactionId 중복 지급만 방지하고, 일반 복원 보상으로 다시 지급하지 않는다.
