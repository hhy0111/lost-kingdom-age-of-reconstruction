namespace LostKingdom.Monetization
{
    public sealed class PurchaseFulfillmentResult
    {
        private PurchaseFulfillmentResult(bool fulfilled, string productId, string transactionId, string errorCode)
        {
            Fulfilled = fulfilled;
            ProductId = productId ?? string.Empty;
            TransactionId = transactionId ?? string.Empty;
            ErrorCode = errorCode ?? string.Empty;
        }

        public bool Fulfilled { get; }

        public string ProductId { get; }

        public string TransactionId { get; }

        public string ErrorCode { get; }

        public static PurchaseFulfillmentResult Fulfill(string productId, string transactionId)
        {
            return new PurchaseFulfillmentResult(true, productId, transactionId, string.Empty);
        }

        public static PurchaseFulfillmentResult Reject(string productId, string transactionId, string errorCode)
        {
            return new PurchaseFulfillmentResult(false, productId, transactionId, errorCode);
        }
    }
}
