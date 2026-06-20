using System;

namespace LostKingdom.Monetization
{
    public static class PurchaseService
    {
        public static void Purchase(
            string productId,
            IIapStoreAdapter store,
            PurchaseLedger ledger,
            IPurchaseReceiptValidator receiptValidator,
            Action<PurchaseFulfillmentResult> onCompleted)
        {
            if (string.IsNullOrWhiteSpace(productId))
            {
                throw new ArgumentException("Product id is required.", nameof(productId));
            }

            if (store == null)
            {
                throw new ArgumentNullException(nameof(store));
            }

            if (ledger == null)
            {
                throw new ArgumentNullException(nameof(ledger));
            }

            if (receiptValidator == null)
            {
                throw new ArgumentNullException(nameof(receiptValidator));
            }

            if (onCompleted == null)
            {
                throw new ArgumentNullException(nameof(onCompleted));
            }

            if (!store.IsInitialized)
            {
                onCompleted(PurchaseFulfillmentResult.Reject(productId, string.Empty, "store_not_initialized"));
                return;
            }

            store.Purchase(productId, result =>
            {
                if (result == null)
                {
                    onCompleted(PurchaseFulfillmentResult.Reject(productId, string.Empty, "purchase_callback_missing"));
                    return;
                }

                if (!result.Success)
                {
                    var failure = string.IsNullOrWhiteSpace(result.ErrorCode) ? "purchase_failed" : result.ErrorCode;
                    onCompleted(PurchaseFulfillmentResult.Reject(result.ProductId, result.TransactionId, failure));
                    return;
                }

                if (!string.Equals(productId, result.ProductId, StringComparison.Ordinal))
                {
                    onCompleted(PurchaseFulfillmentResult.Reject(result.ProductId, result.TransactionId, "product_mismatch"));
                    return;
                }

                if (string.IsNullOrWhiteSpace(result.TransactionId))
                {
                    onCompleted(PurchaseFulfillmentResult.Reject(result.ProductId, result.TransactionId, "invalid_transaction_id"));
                    return;
                }

                if (!receiptValidator.IsValid(result))
                {
                    onCompleted(PurchaseFulfillmentResult.Reject(result.ProductId, result.TransactionId, "invalid_receipt"));
                    return;
                }

                if (!ledger.TryMarkFulfilled(result.TransactionId, result.ProductId))
                {
                    onCompleted(PurchaseFulfillmentResult.Reject(result.ProductId, result.TransactionId, "duplicate_transaction"));
                    return;
                }

                onCompleted(PurchaseFulfillmentResult.Fulfill(result.ProductId, result.TransactionId));
            });
        }

        public static void Restore(IIapStoreAdapter store, Action<RestorePurchasesResult> onCompleted)
        {
            if (store == null)
            {
                throw new ArgumentNullException(nameof(store));
            }

            if (onCompleted == null)
            {
                throw new ArgumentNullException(nameof(onCompleted));
            }

            if (!store.IsInitialized)
            {
                onCompleted(new RestorePurchasesResult(false, 0, "store_not_initialized"));
                return;
            }

            store.RestorePurchases(result =>
            {
                onCompleted(result ?? new RestorePurchasesResult(false, 0, "restore_callback_missing"));
            });
        }
    }
}
