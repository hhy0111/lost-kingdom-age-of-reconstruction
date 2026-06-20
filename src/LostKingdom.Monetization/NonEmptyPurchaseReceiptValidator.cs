namespace LostKingdom.Monetization
{
    public sealed class NonEmptyPurchaseReceiptValidator : IPurchaseReceiptValidator
    {
        public static readonly NonEmptyPurchaseReceiptValidator Instance = new NonEmptyPurchaseReceiptValidator();

        private NonEmptyPurchaseReceiptValidator()
        {
        }

        public bool IsValid(PurchaseResult purchase)
        {
            return purchase != null
                && purchase.Success
                && !string.IsNullOrWhiteSpace(purchase.ProductId)
                && !string.IsNullOrWhiteSpace(purchase.TransactionId)
                && !string.IsNullOrWhiteSpace(purchase.Receipt);
        }
    }
}
