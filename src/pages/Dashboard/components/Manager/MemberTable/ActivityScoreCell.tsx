import type { ActivityScoreInfo } from '@/pages/Dashboard/types/managerDashboard.types';

interface ActivityScoreCellProps {
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

const BREAKDOWN_LABELS: { key: keyof ActivityScoreInfo['breakdown']; label: string }[] = [
  { key: 'checkIn', label: 'iCheck (Check-in)' },
  { key: 'newsfeed', label: 'Newsfeed' },
  { key: 'wiki', label: 'iWiki' },
  { key: 'iGoal', label: 'iGoal' },
];

export default function ActivityScoreCell({ activityScore }: ActivityScoreCellProps) {
  const { total, breakdown } = activityScore;

  return (
    <div className="relative group/score flex flex-col items-center">
      {/* Score + mini bar */}
      <span className={`text-sm font-bold ${getScoreColor(total)}`}>{total}%</span>
      <div className="w-16 h-1 bg_canvas_tertiary radius_round mt-1 overflow-hidden">
        <div
          className={`h-full radius_round ${getBarColor(total)}`}
          style={{ width: `${total}%` }}
        />
      </div>

      {/* CSS group-hover tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-52 p-4 bg_canvas_secondary border border_primary shadow_xl radius_l invisible group-hover/score:visible opacity-0 group-hover/score:opacity-100 transition-all z-20 pointer-events-none">
        <p className="text-[10px] font-bold text_tertiary uppercase tracking-wider mb-3">
          Activity Breakdown
        </p>
        <div className="flex flex-col gap-2">
          {BREAKDOWN_LABELS.map(({ key, label }) => {
            const score = breakdown[key];
            return (
              <div key={key} className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text_secondary">{label}</span>
                  <span className="text_primary">{score}/100</span>
                </div>
                <div className="h-0.5 bg_canvas_tertiary w-full radius_round">
                  <div
                    className={`h-full ${getBarColor(score)}`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
