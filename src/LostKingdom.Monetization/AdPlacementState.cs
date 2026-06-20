using System;

namespace LostKingdom.Monetization
{
    public sealed class AdPlacementState
    {
        public AdPlacementState(int todayClaimCount, DateTime? lastClaimUtc)
        {
            if (todayClaimCount < 0) throw new ArgumentOutOfRangeException(nameof(todayClaimCount));

            TodayClaimCount = todayClaimCount;
            LastClaimUtc = lastClaimUtc;
        }

        public int TodayClaimCount { get; }
        public DateTime? LastClaimUtc { get; }
    }
}
