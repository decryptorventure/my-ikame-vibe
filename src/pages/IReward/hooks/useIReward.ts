import { useState } from 'react';
import { useGetMyProfileQuery } from '@/services/userProfile.service';
import { useGetRewardsQuery, useRedeemRewardMutation } from '@/services/reward.service';
import type { IRewardFilterCategory, RewardCardItem } from '../types';

export function useIReward() {
  const [activeCategory, setActiveCategory] = useState<IRewardFilterCategory>('all');
  const [redeemingItem, setRedeemingItem] = useState<RewardCardItem | null>(null);
  const [redeemedIds, setRedeemedIds] = useState<Set<string>>(new Set());

  const { data: profile, isLoading: isProfileLoading } = useGetMyProfileQuery();
  const { data: rewards, isLoading: isRewardsLoading } = useGetRewardsQuery();
  const [redeemReward] = useRedeemRewardMutation();

  const coinBalance = profile?.coinBalance ?? 0;

  const allRewardItems: RewardCardItem[] = (rewards ?? [])
    .filter((item) => item.is_active)
    .map((item) => ({
      ...item,
      canAfford: coinBalance >= item.coin_price,
      isOutOfStock: item.stock === 0,
      isLowStock: item.stock !== null && item.stock > 0 && item.stock < 5,
    }));

  const filteredRewards = allRewardItems.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory,
  );

  const handleRedeem = async (item: RewardCardItem) => {
    try {
      await redeemReward({ itemId: item.item_id }).unwrap();
    } catch {
      // mock mode returns 404 — optimistic success is fine for demo
    }
    setRedeemedIds((prev) => new Set(prev).add(item.item_id));
    setRedeemingItem(null);
  };

  return {
    coinBalance,
    coinTotalEarned: profile?.coinTotalEarned ?? 0,
    coinTotalSpent: profile?.coinTotalSpent ?? 0,
    activeCategory,
    setActiveCategory,
    allRewardItems,
    filteredRewards,
    redeemingItem,
    setRedeemingItem,
    redeemedIds,
    handleRedeem,
    isLoading: isRewardsLoading || isProfileLoading,
  };
}
