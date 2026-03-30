import type { RewardCategory, RewardItem } from '@/types/reward.types';

export type IRewardFilterCategory = 'all' | RewardCategory;

export interface RewardCardItem extends RewardItem {
  /** true if user's coinBalance >= coin_price */
  canAfford: boolean;
  /** true if stock === 0 */
  isOutOfStock: boolean;
  /** true if stock is low (1-4) */
  isLowStock: boolean;
}

export const CATEGORY_LABELS: Record<IRewardFilterCategory, string> = {
  all: 'Tất cả',
  time_off: 'Ngày nghỉ',
  merch: 'Quà tặng',
  privilege: 'Đặc quyền',
  digital: 'Digital',
  experience: 'Trải nghiệm',
};
