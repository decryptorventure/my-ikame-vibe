import { Card } from '@frontend-team/ui-kit';
import {
  CalendarCheckIcon,
  MegaphoneIcon,
  BookOpenIcon,
  TargetIcon,
} from '@phosphor-icons/react';
import type { ActivityScoreInfo } from '@/pages/Dashboard/types/managerDashboard.types';

interface ActivityBreakdownGridProps {
  activityScore: ActivityScoreInfo;
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 60) return 'text-amber-600';
  return 'text-red-500';
}

function getBarColor(score: number): string {
  if (score >= 80) return 'bg-emerald-500';
  if (score >= 60) return 'bg-amber-500';
  return 'bg-red-500';
}

const METRICS = [
  { key: 'checkIn' as const, label: 'iCheck', icon: <CalendarCheckIcon size={20} /> },
  { key: 'newsfeed' as const, label: 'Newsfeed', icon: <MegaphoneIcon size={20} /> },
  { key: 'wiki' as const, label: 'iWiki', icon: <BookOpenIcon size={20} /> },
  { key: 'iGoal' as const, label: 'iGoal', icon: <TargetIcon size={20} /> },
];

export default function ActivityBreakdownGrid({ activityScore }: ActivityBreakdownGridProps) {
  const { breakdown } = activityScore;

  return (
    <div className="grid grid-cols-2 gap-3">
      {METRICS.map(({ key, label, icon }) => {
        const score = breakdown[key];
        return (
          <Card key={key} className="p-4 bg_canvas_secondary border_primary flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text_tertiary">{icon}</span>
              <span className="text-[10px] font-bold text_tertiary uppercase tracking-wider">
                {label}
              </span>
            </div>
            <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}%</span>
            <div className="h-1 bg_canvas_tertiary w-full radius_round overflow-hidden">
              <div
                className={`h-full radius_round ${getBarColor(score)}`}
                style={{ width: `${score}%` }}
              />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
