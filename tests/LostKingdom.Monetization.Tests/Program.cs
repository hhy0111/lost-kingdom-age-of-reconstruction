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
    }
}
