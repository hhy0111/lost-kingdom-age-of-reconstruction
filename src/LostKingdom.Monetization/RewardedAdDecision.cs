namespace LostKingdom.Monetization
{
    public sealed class RewardedAdDecision
    {
        private RewardedAdDecision(bool canClaim, RewardedAdClaimMode mode, string blockReason)
        {
            CanClaim = canClaim;
            Mode = mode;
            BlockReason = blockReason;
        }

        public bool CanClaim { get; }
        public RewardedAdClaimMode Mode { get; }
        public string BlockReason { get; }

        public static RewardedAdDecision Allow(RewardedAdClaimMode mode)
        {
            return new RewardedAdDecision(true, mode, string.Empty);
        }

        public static RewardedAdDecision Block(string reason)
        {
            return new RewardedAdDecision(false, RewardedAdClaimMode.Blocked, reason);
        }
    }
}
