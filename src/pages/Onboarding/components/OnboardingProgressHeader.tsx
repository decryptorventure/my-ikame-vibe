/** Onboarding page header — welcome greeting + overall progress ring */

import { Progress } from '@frontend-team/ui-kit';
import { useGetMyProfileQuery } from '@/services/userProfile.service';

interface OnboardingProgressHeaderProps {
  claimedCount: number;
  totalCount: number;
  totalExp: number;
}

export default function OnboardingProgressHeader({
  claimedCount,
  totalCount,
  totalExp,
}: OnboardingProgressHeaderProps) {
  const { data: profile } = useGetMyProfileQuery();
  const name = profile?.name ?? 'bạn';
  const percent = totalCount > 0 ? Math.round((claimedCount / totalCount) * 100) : 0;

  return (
    <div className="bg_canvas_secondary radius_l p-6 flex items-center gap-6">
      {/* Progress ring */}
      <div className="relative shrink-0 flex items-center justify-center size-20">
        <Progress value={percent} max={100} size="lg" className="w-20" />
        <span className="absolute text-sm font-bold text_primary">{percent}%</span>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text_primary">
          Chào mừng {name} đến với iKame! 👋
        </h1>
        <p className="text-sm text_secondary">
          {claimedCount}/{totalCount} nhiệm vụ hoàn thành
          {totalExp > 0 && (
            <span className="ml-2 text_accent_primary font-medium">
              · Tổng {totalExp.toLocaleString()} EXP
            </span>
          )}
        </p>
        {claimedCount === totalCount && totalCount > 0 && (
          <p className="text-sm font-medium" style={{ color: 'var(--color-success)' }}>
            🎉 Bạn đã hoàn thành hành trình onboarding!
          </p>
        )}
      </div>
    </div>
  );
}
