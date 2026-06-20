using System;
using LostKingdom.Monetization;

namespace LostKingdom.Monetization.Tests
{
    internal static class Program
    {
        private static int Main()
        {
            TestRewardedAdPolicyBlocksForcedAdsAndRespectsCaps();
            TestRewardedAdPolicyAllowsRemoveAdsEntitlementWithoutSdkReady();
            TestPurchaseLedgerPreventsDuplicateFulfillment();
            TestRewardedAdServiceGrantsOnlyAfterCompletedCallback();
            TestRewardedAdServiceBlocksClosedAdsWithoutGrant();
            TestRewardedAdServiceInstantGrantsRemoveAdsWithoutShowingSdk();
            TestPurchaseServiceFulfillsValidatedPurchaseOnce();
            TestPurchaseServiceRejectsInvalidReceiptsAndDuplicateTransactions();
            Console.WriteLine("MONETIZATION CORE TESTS PASSED");
            return 0;
        }

        private static void TestRewardedAdPolicyBlocksForcedAdsAndRespectsCaps()
        {
            var placement = new AdPlacement(
                id: "ad_offline_reward_x2",
                dailyLimit: 1,
                cooldownMinutes: 30,
                isForced: false,
                rewardGrantPolicy: "grant_after_completed_view");

            var state = new AdPlacementState(todayClaimCount: 0, lastClaimUtc: null);
            var allowed = RewardedAdPolicy.Evaluate(placement, state, hasRemoveAdsEntitlement: false, isAdSdkReady: true, nowUtc: DateTime.UtcNow);
            AssertTrue(allowed.CanClaim, "first rewarded ad claim should be allowed");
            AssertEqual(RewardedAdClaimMode.WatchAd, allowed.Mode, "non-entitled user should watch ad");

            var capped = RewardedAdPolicy.Evaluate(placement, new AdPlacementState(1, null), false, true, DateTime.UtcNow);
            AssertFalse(capped.CanClaim, "daily cap should block claim");
            AssertEqual("daily_limit_reached", capped.BlockReason, "cap block reason");

            var forced = RewardedAdPolicy.Evaluate(
                new AdPlacement("bad_interstitial", 1, 0, true, "none"),
                state,
                hasRemoveAdsEntitlement: false,
                isAdSdkReady: true,
                nowUtc: DateTime.UtcNow);
            AssertFalse(forced.CanClaim, "forced ads must never be claimable");
            AssertEqual("forced_ads_disabled", forced.BlockReason, "forced ad block reason");
        }

        private static void TestRewardedAdPolicyAllowsRemoveAdsEntitlementWithoutSdkReady()
        {
            var placement = new AdPlacement("ad_daily_special", 1, 60, false, "grant_choice_reward_after_completed_view");
            var state = new AdPlacementState(todayClaimCount: 0, lastClaimUtc: null);

            var result = RewardedAdPolicy.Evaluate(
                placement,
                state,
                hasRemoveAdsEntitlement: true,
                isAdSdkReady: false,
                nowUtc: DateTime.UtcNow);

            AssertTrue(result.CanClaim, "remove ads entitlement should allow instant claim");
            AssertEqual(RewardedAdClaimMode.Instant, result.Mode, "entitled user should claim instantly");
        }

        private static void TestPurchaseLedgerPreventsDuplicateFulfillment()
        {
            var ledger = new PurchaseLedger();
            var first = ledger.TryMarkFulfilled("tx-001", "iap_remove_ads");
            var duplicate = ledger.TryMarkFulfilled("tx-001", "iap_remove_ads");

            AssertTrue(first, "first transaction fulfillment should succeed");
            AssertFalse(duplicate, "duplicate transaction should be ignored");
            AssertTrue(ledger.HasFulfilled("tx-001"), "ledger should remember fulfilled transaction");
        }

        private static void TestRewardedAdServiceGrantsOnlyAfterCompletedCallback()
        {
            var placement = new AdPlacement("ad_free_summon", 5, 0, false, "grant_summon_after_completed_view");
            var adapter = new FakeRewardedAdAdapter(isReady: true, new RewardedAdShowResult(completed: true, errorCode: string.Empty));
            RewardedAdClaimResult? result = null;

            RewardedAdService.RequestClaim(
                placement,
                new AdPlacementState(todayClaimCount: 0, lastClaimUtc: null),
                hasRemoveAdsEntitlement: false,
                adapter,
                DateTime.UtcNow,
                completed => result = completed);

            AssertTrue(adapter.ShowCalled, "ready rewarded ad should be shown");
            if (result == null) throw new InvalidOperationException("completed ad should complete claim flow");
            AssertTrue(result.Granted, "completed rewarded ad should grant reward");
            AssertEqual(RewardedAdClaimMode.WatchAd, result.Mode, "completed ad claim mode");
        }

        private static void TestRewardedAdServiceBlocksClosedAdsWithoutGrant()
        {
            var placement = new AdPlacement("ad_gold_x2", 5, 0, false, "grant_timed_buff_after_completed_view");
            var adapter = new FakeRewardedAdAdapter(isReady: true, new RewardedAdShowResult(completed: false, errorCode: "closed_early"));
            RewardedAdClaimResult? result = null;

            RewardedAdService.RequestClaim(
                placement,
                new AdPlacementState(todayClaimCount: 0, lastClaimUtc: null),
                hasRemoveAdsEntitlement: false,
                adapter,
                DateTime.UtcNow,
                completed => result = completed);

            AssertTrue(adapter.ShowCalled, "ready rewarded ad should be shown");
            if (result == null) throw new InvalidOperationException("closed ad should still complete the claim flow");
            AssertFalse(result.Granted, "closed rewarded ad must not grant reward");
            AssertEqual("closed_early", result.ErrorCode, "closed ad error code should be preserved");
        }

        private static void TestRewardedAdServiceInstantGrantsRemoveAdsWithoutShowingSdk()
        {
            var placement = new AdPlacement("ad_daily_special", 1, 60, false, "grant_choice_reward_after_completed_view");
            var adapter = new FakeRewardedAdAdapter(isReady: false, new RewardedAdShowResult(false, "not_ready"));
            RewardedAdClaimResult? result = null;

            RewardedAdService.RequestClaim(
                placement,
                new AdPlacementState(todayClaimCount: 0, lastClaimUtc: null),
                hasRemoveAdsEntitlement: true,
                adapter,
                DateTime.UtcNow,
                completed => result = completed);

            AssertFalse(adapter.ShowCalled, "remove ads instant claim should not show SDK ad");
            if (result == null) throw new InvalidOperationException("remove ads instant claim should complete flow");
            AssertTrue(result.Granted, "remove ads entitlement should grant instantly");
            AssertEqual(RewardedAdClaimMode.Instant, result.Mode, "instant claim mode");
        }

        private static void TestPurchaseServiceFulfillsValidatedPurchaseOnce()
        {
            var store = new FakeIapStoreAdapter(
                isInitialized: true,
                purchaseResult: new PurchaseResult(true, "iap_remove_ads", "tx-100", "receipt-payload", string.Empty),
                restoreResult: new RestorePurchasesResult(true, 0, string.Empty));
            var ledger = new PurchaseLedger();
            PurchaseFulfillmentResult? result = null;

            PurchaseService.Purchase(
                "iap_remove_ads",
                store,
                ledger,
                NonEmptyPurchaseReceiptValidator.Instance,
                completed => result = completed);

            AssertTrue(store.PurchaseCalled, "initialized store should receive purchase request");
            if (result == null) throw new InvalidOperationException("valid purchase should complete flow");
            AssertTrue(result.Fulfilled, "valid purchase should be fulfilled");
            AssertTrue(ledger.HasFulfilled("tx-100"), "fulfilled purchase should be recorded in ledger");
        }

        private static void TestPurchaseServiceRejectsInvalidReceiptsAndDuplicateTransactions()
        {
            var ledger = new PurchaseLedger();
            var invalidStore = new FakeIapStoreAdapter(
                isInitialized: true,
                purchaseResult: new PurchaseResult(true, "iap_growth_pack_1", "tx-200", string.Empty, string.Empty),
                restoreResult: new RestorePurchasesResult(true, 0, string.Empty));
            PurchaseFulfillmentResult? invalid = null;

            PurchaseService.Purchase(
                "iap_growth_pack_1",
                invalidStore,
                ledger,
                NonEmptyPurchaseReceiptValidator.Instance,
                completed => invalid = completed);

            if (invalid == null) throw new InvalidOperationException("invalid purchase should complete flow");
            AssertFalse(invalid.Fulfilled, "missing receipt should not be fulfilled");
            AssertEqual("invalid_receipt", invalid.ErrorCode, "missing receipt error code");

            var duplicateStore = new FakeIapStoreAdapter(
                isInitialized: true,
                purchaseResult: new PurchaseResult(true, "iap_growth_pack_1", "tx-201", "receipt-payload", string.Empty),
                restoreResult: new RestorePurchasesResult(true, 0, string.Empty));
            PurchaseFulfillmentResult? first = null;
            PurchaseFulfillmentResult? duplicate = null;

            PurchaseService.Purchase("iap_growth_pack_1", duplicateStore, ledger, NonEmptyPurchaseReceiptValidator.Instance, completed => first = completed);
            PurchaseService.Purchase("iap_growth_pack_1", duplicateStore, ledger, NonEmptyPurchaseReceiptValidator.Instance, completed => duplicate = completed);

            if (first == null) throw new InvalidOperationException("first valid transaction should complete flow");
            if (duplicate == null) throw new InvalidOperationException("duplicate purchase should complete flow");
            AssertTrue(first.Fulfilled, "first valid transaction should fulfill");
            AssertFalse(duplicate.Fulfilled, "duplicate transaction must not be fulfilled again");
            AssertEqual("duplicate_transaction", duplicate.ErrorCode, "duplicate error code");
        }

        private static void AssertTrue(bool value, string message)
        {
            if (!value) throw new InvalidOperationException(message);
        }

        private static void AssertFalse(bool value, string message)
        {
            if (value) throw new InvalidOperationException(message);
        }

        private static void AssertEqual<T>(T expected, T actual, string message)
        {
            if (!Equals(expected, actual))
            {
                throw new InvalidOperationException($"{message}: expected {expected}, got {actual}");
            }
        }

        private sealed class FakeRewardedAdAdapter : IRewardedAdAdapter
        {
            private readonly bool isReady;
            private readonly RewardedAdShowResult result;

            public FakeRewardedAdAdapter(bool isReady, RewardedAdShowResult result)
            {
                this.isReady = isReady;
                this.result = result;
            }

            public bool ShowCalled { get; private set; }

            public bool IsReady(string placementId)
            {
                return isReady;
            }

            public void Show(string placementId, Action<RewardedAdShowResult> onCompleted)
            {
                ShowCalled = true;
                onCompleted(result);
            }
        }

        private sealed class FakeIapStoreAdapter : IIapStoreAdapter
        {
            private readonly PurchaseResult purchaseResult;
            private readonly RestorePurchasesResult restoreResult;

            public FakeIapStoreAdapter(bool isInitialized, PurchaseResult purchaseResult, RestorePurchasesResult restoreResult)
            {
                IsInitialized = isInitialized;
                this.purchaseResult = purchaseResult;
                this.restoreResult = restoreResult;
            }

            public bool IsInitialized { get; }
            public bool PurchaseCalled { get; private set; }

            public void Purchase(string productId, Action<PurchaseResult> onCompleted)
            {
                PurchaseCalled = true;
                onCompleted(purchaseResult);
            }

            public void RestorePurchases(Action<RestorePurchasesResult> onCompleted)
            {
                onCompleted(restoreResult);
            }
        }
    }
}
