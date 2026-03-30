import { Card, Progress } from '@frontend-team/ui-kit';
import frameImg from '@/assets/frame.png';
import type { Achievement } from '../types';

interface AchievementListProps {
  achievements: Achievement[];
}

export default function AchievementList({ achievements }: AchievementListProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text_primary">Thành tựu</h3>

      <div className="flex flex-col gap-3">
        {achievements.map((achievement) => (
          <Card key={achievement.id} shadow="none" className="border_primary">
            <div className="flex items-center gap-4 p-4">
              <img
                src={achievement.badgeUrl ?? frameImg}
                alt=""
                className="size-14 shrink-0 rounded-lg object-cover"
              />

              <div className="flex flex-1 flex-col gap-1.5">
                <span className="text-sm font-semibold text_primary">{achievement.title}</span>
                <div className="w-40">
                  <Progress
                    value={achievement.current}
                    max={achievement.total}
                    size="lg"
                    showLabel
                    label={`${achievement.current}/${achievement.total}`}
                    variant="success"
                  />
                </div>
                <p className="text-xs text_secondary">{achievement.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
