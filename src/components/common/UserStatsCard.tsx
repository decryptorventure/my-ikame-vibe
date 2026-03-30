import { Progress } from '@frontend-team/ui-kit';
import flameImg from '@/assets/flame.png';
import lightningImg from '@/assets/lightning.png';
import type { UserStats } from '@/types/shared.types';

interface UserStatsCardProps {
  stats: UserStats;
}

export default function UserStatsCard({ stats }: UserStatsCardProps) {
  return (
    <div className="px-4 py-6 radius_16 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <img src={flameImg} alt="credits" className="size-4" />
        <span className="font-semibold fg_amber_strong">{stats.credits} Credits</span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={lightningImg} alt="level" className="size-4" />
            <span className="font-semibold fg_amber_strong">Lv.{stats.level}</span>
          </div>
          <span className="text-sm text_tertiary">
            {stats.currentXP} / {stats.maxXP}
          </span>
        </div>
        <Progress value={stats.currentXP} max={stats.maxXP} size="md" variant="success" />
      </div>
    </div>
  );
}
