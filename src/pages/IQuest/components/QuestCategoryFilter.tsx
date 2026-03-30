import { CheckCircleIcon } from '@phosphor-icons/react';
import { SegmentedControl } from '@frontend-team/ui-kit';
import type { QuestCategory } from '../types';

interface QuestCategoryFilterProps {
  activeCategory: QuestCategory;
  onCategoryChange: (category: QuestCategory) => void;
  onboardingFinished?: boolean;
}

export default function QuestCategoryFilter({
  activeCategory,
  onCategoryChange,
  onboardingFinished,
}: QuestCategoryFilterProps) {
  const options = [
    { label: 'Tất cả', value: 'all' },
    {
      label: (
        <div className="flex items-center gap-1.5">
          Tân thủ
          {onboardingFinished && <CheckCircleIcon size={14} weight="fill" className="fg_success" />}
        </div>
      ) as any,
      value: 'onboarding',
    },
    { label: 'Hàng ngày', value: 'daily' },
    { label: 'Hàng tuần', value: 'weekly' },
    { label: 'Hàng tháng', value: 'monthly' },
  ];

  return (
    <SegmentedControl
      options={options}
      value={activeCategory}
      onValueChange={(val) => onCategoryChange(val as QuestCategory)}
      className="w-full h-10"
    />
  );
}
