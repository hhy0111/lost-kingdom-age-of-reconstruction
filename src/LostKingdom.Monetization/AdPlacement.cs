using System;

namespace LostKingdom.Monetization
{
    public sealed class AdPlacement
    {
        public AdPlacement(string id, int dailyLimit, int cooldownMinutes, bool isForced, string rewardGrantPolicy)
        {
            if (string.IsNullOrWhiteSpace(id)) throw new ArgumentException("Ad placement id is required.", nameof(id));
            if (dailyLimit < 0) throw new ArgumentOutOfRangeException(nameof(dailyLimit));
            if (cooldownMinutes < 0) throw new ArgumentOutOfRangeException(nameof(cooldownMinutes));
            if (string.IsNullOrWhiteSpace(rewardGrantPolicy)) throw new ArgumentException("Reward policy is required.", nameof(rewardGrantPolicy));

            Id = id;
            DailyLimit = dailyLimit;
            CooldownMinutes = cooldownMinutes;
            IsForced = isForced;
            RewardGrantPolicy = rewardGrantPolicy;
        }

        public string Id { get; }
        public int DailyLimit { get; }
        public int CooldownMinutes { get; }
        public bool IsForced { get; }
        public string RewardGrantPolicy { get; }
    }
}
