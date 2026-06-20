namespace LostKingdom.Monetization
{
    public interface IPurchaseReceiptValidator
    {
        bool IsValid(PurchaseResult purchase);
    }
}
