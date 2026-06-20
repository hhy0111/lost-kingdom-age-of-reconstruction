namespace LostKingdom.Monetization
{
    public sealed class RewardedAdShowResult
    {
        public RewardedAdShowResult(bool completed, string errorCode)
        {
            Completed = completed;
            ErrorCode = errorCode ?? string.Empty;
        }

        public bool Completed { get; }
        public string ErrorCode { get; }
    }
}
