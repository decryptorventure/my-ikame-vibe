import { Card, Progress } from '@frontend-team/ui-kit';
import { Achievement } from '../types';

interface AchievementListProps {
  achievements: Achievement[];
  title?: string;
  onEquip?: (id: string) => void;
}

export default function AchievementList({ achievements, title = 'Thành tựu', onEquip }: AchievementListProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text_primary">{title}</h3>

      <div className="flex flex-col gap-3">
        {achievements.map((achievement) => {
          const isLocked = achievement.status !== 'claimed';
          return (
            <Card key={achievement.id} shadow="none" className={`border_primary ${isLocked ? 'opacity-60 bg_canvas_subtle' : ''}`}>
              <div className="flex items-center gap-4 p-4">
                <div className={`size-14 shrink-0 bg_canvas_background radius_12 flex items-center justify-center text-3xl ${isLocked ? 'grayscale' : ''}`}>
                  {achievement.badgeUrl ?? '🏆'}
                </div>

                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text_primary">{achievement.title}</span>
                    {achievement.isEquipped ? (
                      <span className="text-[10px] font-bold bg_accent_primary_subtle text_accent_primary px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Đang đeo
                      </span>
                    ) : achievement.canEquip ? (
                      <button 
                        onClick={() => onEquip?.(achievement.id)}
                        className="text-[10px] font-bold bg_secondary text_primary border border_secondary px-2 py-0.5 rounded-full uppercase tracking-wider hover:bg_tertiary transition-colors"
                      >
                        Đeo
                      </button>
                    ) : null}
                  </div>
                  <div className="w-full">
                    <Progress
                      value={achievement.current}
                      max={achievement.total}
                      size="sm"
                      variant={isLocked ? 'default' : 'success'}
                    />
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[10px] text_tertiary uppercase font-medium">{achievement.description}</span>
                      <span className="text-[10px] font-bold text_secondary">{achievement.current}/{achievement.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
