using System;

namespace LostKingdom.Monetization
{
    public interface IIapStoreAdapter
    {
        bool IsInitialized { get; }
        void Purchase(string productId, Action<PurchaseResult> onCompleted);
        void RestorePurchases(Action<RestorePurchasesResult> onCompleted);
    }
}
