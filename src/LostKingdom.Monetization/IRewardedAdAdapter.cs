using System;

namespace LostKingdom.Monetization
{
    public interface IRewardedAdAdapter
    {
        bool IsReady(string placementId);
        void Show(string placementId, Action<RewardedAdShowResult> onCompleted);
    }
}
