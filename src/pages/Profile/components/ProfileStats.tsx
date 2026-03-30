import { Card, Progress } from '@frontend-team/ui-kit';
import flameImg from '@/assets/flame.png';
import heartImg from '@/assets/heart.png';
import lightningImg from '@/assets/lightning.png';
import starImg from '@/assets/star.png';
import type { ProfileStatItem } from '../types';

interface ProfileStatsProps {
  stats: ProfileStatItem[];
}

export default function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text_primary">Thống kê</h3>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <Card key={stat.id} shadow="none" className="border_primary bg_canvas_primary">
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <StatIcon icon={stat.icon} />
                  <span className="text-2xl font-semibold text_primary">{stat.value}</span>
                </div>

                {stat.progress ? (
                  <span className="text-xs text_tertiary">
                    {stat.progress.current}/{stat.progress.max}
                  </span>
                ) : null}
              </div>

              {stat.progress ? (
                <Progress
                  value={stat.progress.current}
                  max={stat.progress.max}
                  size="md"
                  variant="success"
                />
              ) : (
                <span className="text-sm text_secondary">{stat.label}</span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

interface StatIconProps {
  icon: ProfileStatItem['icon'];
}

function StatIcon({ icon }: StatIconProps) {
  switch (icon) {
    case 'flame':
      return <img src={flameImg} alt="" aria-hidden className="size-5" />;
    case 'lightning':
      return <img src={lightningImg} alt="" aria-hidden className="size-5" />;
    case 'heart':
      return <img src={heartImg} alt="" aria-hidden className="size-5" />;
    case 'star':
      return <img src={starImg} alt="" aria-hidden className="size-5" />;
    default:
      return null;
  }
}
