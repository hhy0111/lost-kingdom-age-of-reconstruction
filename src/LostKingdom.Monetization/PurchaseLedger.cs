using System;
using System.Collections.Generic;

namespace LostKingdom.Monetization
{
    public sealed class PurchaseLedger
    {
        private readonly Dictionary<string, string> fulfilledTransactions = new Dictionary<string, string>();

        public bool TryMarkFulfilled(string transactionId, string productId)
        {
            if (string.IsNullOrWhiteSpace(transactionId)) throw new ArgumentException("Transaction id is required.", nameof(transactionId));
            if (string.IsNullOrWhiteSpace(productId)) throw new ArgumentException("Product id is required.", nameof(productId));

            if (fulfilledTransactions.ContainsKey(transactionId))
            {
                return false;
            }

            fulfilledTransactions.Add(transactionId, productId);
            return true;
        }

        public bool HasFulfilled(string transactionId)
        {
            if (string.IsNullOrWhiteSpace(transactionId)) return false;
            return fulfilledTransactions.ContainsKey(transactionId);
        }
    }
}
