/** One milestone card with quest list and status-aware styling */

import { Card, CardContent, Badge } from '@frontend-team/ui-kit';
import { LockSimpleIcon } from '@phosphor-icons/react';
import QuestCheckItem from './QuestCheckItem';
import type { OnboardingMilestone } from '../types';

interface MilestoneCardProps {
  milestone: OnboardingMilestone;
  index: number;
  isClaiming: boolean;
  onClaim: (questId: string) => void;
}

const STATUS_BADGE: Record<OnboardingMilestone['status'], { label: string; variant: 'success' | 'primary' | 'default' }> = {
  done:   { label: 'Hoàn thành', variant: 'success' },
  active: { label: 'Đang làm',   variant: 'primary' },
  locked: { label: 'Chưa tới',   variant: 'default' },
};

export default function MilestoneCard({ milestone, index, isClaiming, onClaim }: MilestoneCardProps) {
  const badge = STATUS_BADGE[milestone.status];
  const isLocked = milestone.status === 'locked';

  return (
    <Card className={`relative overflow-hidden ${isLocked ? 'opacity-60' : ''}`}>
      <CardContent className="p-4 flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {/* Step number bubble */}
            <div
              className={`size-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                milestone.status === 'done'
                  ? 'bg_accent_primary text_contrast'
                  : milestone.status === 'active'
                  ? 'bg_primary text_contrast'
                  : 'bg_canvas_tertiary text_tertiary'
              }`}
            >
              {index + 1}
            </div>
            <div>
              <p className="text-sm font-bold text_primary leading-tight">{milestone.label}</p>
              <p className="text-xs text_tertiary">{milestone.description}</p>
            </div>
          </div>
          <Badge variant={badge.variant} size="sm" className="shrink-0">
            {badge.label}
          </Badge>
        </div>

        {/* Progress summary */}
        <p className="text-xs text_secondary">
          {milestone.completedCount}/{milestone.totalCount} nhiệm vụ
          <span className="ml-1 text_accent_primary font-medium">
            · {milestone.totalExp.toLocaleString()} EXP
          </span>
        </p>

        {/* Quest list */}
        {!isLocked && (
          <div className="flex flex-col divide-y divide_primary">
            {milestone.quests.map((quest) => (
              <QuestCheckItem
                key={quest.id}
                quest={quest}
                disabled={isClaiming}
                onClaim={onClaim}
              />
            ))}
          </div>
        )}

        {/* Locked overlay message */}
        {isLocked && (
          <div className="flex items-center gap-2 text_tertiary">
            <LockSimpleIcon size={16} />
            <span className="text-xs">Hoàn thành milestone trước để mở khoá</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
