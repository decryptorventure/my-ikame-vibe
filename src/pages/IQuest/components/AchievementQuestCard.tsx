import { Card, Progress } from '@frontend-team/ui-kit';
import type { IQuestItem } from '../types';

interface AchievementQuestCardProps {
  quest: IQuestItem;
}



export default function AchievementQuestCard({ quest }: AchievementQuestCardProps) {
  const badgeIcon = quest.badgeReward || '🏅';
  const isClaimed = quest.status === 'claimed';

  return (
    <Card
      shadow="none"
      className={`border_primary p-3 bg_canvas_primary transition-all hover:bg_secondary ${
        isClaimed ? 'opacity-60 grayscale' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Badge Icon */}
        <div className="size-10 shrink-0 radius_8 bg_secondary flex items-center justify-center text-xl shadow_xs border border_primary">
          {badgeIcon}
        </div>

        <div className="flex-1 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text_primary leading-tight">
              {quest.title}
            </span>
          </div>

          <p className="text-xs text_secondary line-clamp-1">
            {quest.description || 'Hoàn thành để nhận huy hiệu'}
          </p>

          <div className="mt-1">
            <Progress
              value={quest.current}
              max={quest.total}
              size="sm"
              showLabel
              label={`${quest.current}/${quest.total}`}
              variant={isClaimed ? 'success' : 'default'}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
