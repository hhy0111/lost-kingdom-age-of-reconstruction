namespace LostKingdom.Monetization
{
    public sealed class RewardedAdClaimResult
    {
        private RewardedAdClaimResult(bool granted, RewardedAdClaimMode mode, string blockReason, string errorCode)
        {
            Granted = granted;
            Mode = mode;
            BlockReason = blockReason ?? string.Empty;
            ErrorCode = errorCode ?? string.Empty;
        }

        public bool Granted { get; }
        public RewardedAdClaimMode Mode { get; }
        public string BlockReason { get; }
        public string ErrorCode { get; }

        public static RewardedAdClaimResult Grant(RewardedAdClaimMode mode)
        {
            return new RewardedAdClaimResult(true, mode, string.Empty, string.Empty);
        }

        public static RewardedAdClaimResult Block(string blockReason)
        {
            return new RewardedAdClaimResult(false, RewardedAdClaimMode.WatchAd, blockReason, string.Empty);
        }

        public static RewardedAdClaimResult Fail(string errorCode)
        {
            return new RewardedAdClaimResult(false, RewardedAdClaimMode.WatchAd, string.Empty, errorCode);
        }
    }
}
