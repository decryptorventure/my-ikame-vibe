/** Single quest row inside a MilestoneCard */

import { Button, Progress } from '@frontend-team/ui-kit';
import { CheckCircleIcon, CircleIcon } from '@phosphor-icons/react';
import type { OnboardingQuestItem } from '../types';

interface QuestCheckItemProps {
  quest: OnboardingQuestItem;
  disabled: boolean;
  onClaim: (questId: string) => void;
}

export default function QuestCheckItem({ quest, disabled, onClaim }: QuestCheckItemProps) {
  const isClaimed = quest.status === 'claimed';
  const isCompleted = quest.status === 'completed';
  const isInProgress = quest.status === 'in_progress';

  return (
    <div className={`flex items-start gap-3 py-2 ${isClaimed ? 'opacity-50' : ''}`}>
      {/* Status icon */}
      <div className="mt-0.5 shrink-0">
        {isClaimed ? (
          <CheckCircleIcon size={20} weight="fill" className="text_accent_primary" />
        ) : (
          <CircleIcon size={20} className="text_tertiary" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${isClaimed ? 'line-through text_tertiary' : 'text_primary'}`}>
          {quest.title}
        </p>

        {/* Progress bar for multi-step quests */}
        {isInProgress && quest.total > 1 && (
          <div className="mt-1">
            <Progress value={quest.current} max={quest.total} size="sm" />
            <span className="text-xs text_tertiary mt-0.5">{quest.current}/{quest.total}</span>
          </div>
        )}
      </div>

      {/* EXP badge / Claim button */}
      <div className="shrink-0">
        {isCompleted ? (
          <Button
            size="s"
            disabled={disabled}
            onClick={() => onClaim(quest.id)}
            className="bg_accent_primary text_contrast text-xs"
          >
            +{quest.expReward} EXP
          </Button>
        ) : (
          <span className="text-xs text_tertiary font-medium">+{quest.expReward} EXP</span>
        )}
      </div>
    </div>
  );
}
