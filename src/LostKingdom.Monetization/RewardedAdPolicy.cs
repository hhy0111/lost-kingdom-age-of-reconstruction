using System;

namespace LostKingdom.Monetization
{
    public static class RewardedAdPolicy
    {
        public static RewardedAdDecision Evaluate(
            AdPlacement placement,
            AdPlacementState state,
            bool hasRemoveAdsEntitlement,
            bool isAdSdkReady,
            DateTime nowUtc)
        {
            if (placement == null) throw new ArgumentNullException(nameof(placement));
            if (state == null) throw new ArgumentNullException(nameof(state));

            if (placement.IsForced)
            {
                return RewardedAdDecision.Block("forced_ads_disabled");
            }

            if (placement.DailyLimit > 0 && state.TodayClaimCount >= placement.DailyLimit)
            {
                return RewardedAdDecision.Block("daily_limit_reached");
            }

            if (state.LastClaimUtc.HasValue)
            {
                var cooldownEndsAt = state.LastClaimUtc.Value.AddMinutes(placement.CooldownMinutes);
                if (nowUtc < cooldownEndsAt)
                {
                    return RewardedAdDecision.Block("cooldown_active");
                }
            }

            if (hasRemoveAdsEntitlement)
            {
                return RewardedAdDecision.Allow(RewardedAdClaimMode.Instant);
            }

            if (!isAdSdkReady)
            {
                return RewardedAdDecision.Block("ad_sdk_not_ready");
            }

            return RewardedAdDecision.Allow(RewardedAdClaimMode.WatchAd);
        }
    }
}
