using System;

namespace LostKingdom.Monetization
{
    public static class RewardedAdService
    {
        public static void RequestClaim(
            AdPlacement placement,
            AdPlacementState state,
            bool hasRemoveAdsEntitlement,
            IRewardedAdAdapter adapter,
            DateTime nowUtc,
            Action<RewardedAdClaimResult> onCompleted)
        {
            if (placement == null) throw new ArgumentNullException(nameof(placement));
            if (state == null) throw new ArgumentNullException(nameof(state));
            if (adapter == null) throw new ArgumentNullException(nameof(adapter));
            if (onCompleted == null) throw new ArgumentNullException(nameof(onCompleted));

            var sdkReady = hasRemoveAdsEntitlement || adapter.IsReady(placement.Id);
            var decision = RewardedAdPolicy.Evaluate(placement, state, hasRemoveAdsEntitlement, sdkReady, nowUtc);
            if (!decision.CanClaim)
            {
                onCompleted(RewardedAdClaimResult.Block(decision.BlockReason));
                return;
            }

            if (decision.Mode == RewardedAdClaimMode.Instant)
            {
                onCompleted(RewardedAdClaimResult.Grant(RewardedAdClaimMode.Instant));
                return;
            }

            adapter.Show(placement.Id, result =>
            {
                if (result != null && result.Completed)
                {
                    onCompleted(RewardedAdClaimResult.Grant(RewardedAdClaimMode.WatchAd));
                    return;
                }

                onCompleted(RewardedAdClaimResult.Fail(result == null ? "ad_callback_missing" : result.ErrorCode));
            });
        }
    }
}
