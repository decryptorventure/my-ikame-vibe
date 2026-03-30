import { Badge } from '@frontend-team/ui-kit';
import type { RewardCardItem } from '../types';
import { CATEGORY_LABELS, type IRewardFilterCategory } from '../types';

const FILTER_CATEGORIES: IRewardFilterCategory[] = [
  'all', 'time_off', 'merch', 'privilege', 'digital', 'experience',
];

interface RewardCategoryFilterProps {
  activeCategory: IRewardFilterCategory;
  allItems: RewardCardItem[];
  onCategoryChange: (category: IRewardFilterCategory) => void;
}

export default function RewardCategoryFilter({
  activeCategory,
  allItems,
  onCategoryChange,
}: RewardCategoryFilterProps) {
  const countByCategory = (cat: IRewardFilterCategory) =>
    cat === 'all' ? allItems.length : allItems.filter((i) => i.category === cat).length;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {FILTER_CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat;
        const count = countByCategory(cat);
        return (
          <Badge
            key={cat}
            role="button"
            tabIndex={0}
            aria-pressed={isActive}
            color={isActive ? 'blue' : undefined}
            size="l"
            className="cursor-pointer"
            onClick={() => onCategoryChange(cat)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onCategoryChange(cat);
              }
            }}
          >
            {CATEGORY_LABELS[cat]} ({count})
          </Badge>
        );
      })}
    </div>
  );
}
