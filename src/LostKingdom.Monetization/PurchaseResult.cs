namespace LostKingdom.Monetization
{
    public sealed class PurchaseResult
    {
        public PurchaseResult(bool success, string productId, string transactionId, string receipt, string errorCode)
        {
            Success = success;
            ProductId = productId ?? string.Empty;
            TransactionId = transactionId ?? string.Empty;
            Receipt = receipt ?? string.Empty;
            ErrorCode = errorCode ?? string.Empty;
        }

        public bool Success { get; }
        public string ProductId { get; }
        public string TransactionId { get; }
        public string Receipt { get; }
        public string ErrorCode { get; }
    }
}
