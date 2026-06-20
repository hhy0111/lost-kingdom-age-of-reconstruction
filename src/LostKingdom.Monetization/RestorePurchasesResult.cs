namespace LostKingdom.Monetization
{
    public sealed class RestorePurchasesResult
    {
        public RestorePurchasesResult(bool success, int restoredCount, string errorCode)
        {
            Success = success;
            RestoredCount = restoredCount;
            ErrorCode = errorCode ?? string.Empty;
        }

        public bool Success { get; }
        public int RestoredCount { get; }
        public string ErrorCode { get; }
    }
}
