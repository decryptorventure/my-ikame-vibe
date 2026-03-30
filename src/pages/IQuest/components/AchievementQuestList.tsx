import AchievementQuestCard from './AchievementQuestCard';
import type { IQuestItem } from '../types';

interface AchievementQuestListProps {
  quests: IQuestItem[];
  isLoading?: boolean;
}

export default function AchievementQuestList({ quests, isLoading }: AchievementQuestListProps) {
  if (isLoading) return <div className="h-48 w-full bg_secondary animate-pulse radius_16" />;
  if (quests.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 bg_secondary outline-none border border_primary radius_16 p-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-bold text_primary uppercase tracking-wider flex items-center gap-2">
          <span>🏆 Danh hiệu & Thành tựu</span>
          <span className="text-xs font-normal text_secondary lowercase">
            ({quests.filter(q => q.status === 'claimed').length}/{quests.length})
          </span>
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {quests.map((quest) => (
          <AchievementQuestCard key={quest.id} quest={quest} />
        ))}
      </div>
    </div>
  );
}
