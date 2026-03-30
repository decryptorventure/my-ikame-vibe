import { EmptyState } from '@/components';
import type { RewardCardItem } from '../types';
import RewardCard from './RewardCard';

interface RewardGridProps {
  items: RewardCardItem[];
  redeemedIds: Set<string>;
  onRedeem: (item: RewardCardItem) => void;
}

export default function RewardGrid({ items, redeemedIds, onRedeem }: RewardGridProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="Không có phần thưởng"
        description="Không có phần thưởng nào trong danh mục này."
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
      {items.map((item) => (
        <RewardCard
          key={item.item_id}
          item={item}
          isRedeemed={redeemedIds.has(item.item_id)}
          onRedeem={onRedeem}
        />
      ))}
    </div>
  );
}
