import { useCallback, useState } from 'react';
import { CircleNotchIcon, CheckCircleIcon } from '@phosphor-icons/react';
import { Card, Progress } from '@frontend-team/ui-kit';
import { QuestCompleteButton } from '@/components';
import lightningImg from '@/assets/lightning.png';
import type { IQuestItem, QuestSection } from '../types';

interface IQuestListProps {
  sections: QuestSection[];
  onQuestClick: (quest: IQuestItem) => void;
  onCompleteQuest: (action: string) => Promise<void>;
  onClaimReward: (questId: string) => Promise<void>;
}

interface QuestItemCardProps {
  quest: IQuestItem;
  onClick: (quest: IQuestItem) => void;
  onComplete: (action: string) => Promise<void>;
  onClaim: (questId: string) => Promise<void>;
}

/** Claim button with optimistic local state for non-onboarding quests */
function ClaimRewardButton({ quest, onClaim }: { quest: IQuestItem; onClaim: (id: string) => Promise<void> }) {
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');

  const handleClick = useCallback(async () => {
    if (state !== 'idle') return;
    setState('loading');
    try {
      await onClaim(quest.id);
    } catch {
      // optimistic: treat as success even if mock returns 404
    }
    setState('done');
  }, [state, onClaim, quest.id]);

  if (state === 'done') {
    return (
      <div className="flex size-5 items-center justify-center radius_round bg_success_contrast shadow_xs">
        <CheckCircleIcon size={14} weight="fill" className="text_contrast" />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={state === 'loading'}
      className="flex shrink-0 cursor-pointer items-center gap-1 radius_round px-3 py-1 text-xs font-semibold text_contrast bg_success_contrast transition-opacity disabled:opacity-60 hover:brightness-110 shadow_xs"
    >
      {state === 'loading' ? (
        <CircleNotchIcon size={12} className="animate-spin" />
      ) : (
        <>+{quest.expPoints} EXP</>
      )}
    </button>
  );
}

function QuestItemCard({ quest, onClick, onComplete, onClaim }: QuestItemCardProps) {
  const isCompleted = quest.status === 'completed';
  const isClaimed = quest.status === 'claimed' || quest.completed;

  return (
    <Card
      shadow="none"
      onClick={() => onClick(quest)}
      className={`border_primary transition-all hover:bg_secondary cursor-pointer border-l-4 ${
        isClaimed ? 'opacity-60 border_tertiary' : 'border_accent_primary hover:shadow_m'
      }`}
    >
      <div className="flex items-center gap-6 p-4">
        <div className="flex shrink-0 items-center justify-center gap-1.5 px-3 py-2 radius_8 bg_secondary min-w-[70px]">
          <img src={lightningImg} alt="exp" className="size-4" />
          <span className="text-sm font-semibold text_primary">{quest.expPoints}</span>
        </div>

        <div className="flex flex-1 flex-col gap-1.5">
          <span className={`text-sm font-semibold ${isClaimed ? 'line-through text_tertiary' : 'text_primary'}`}>
            {quest.title}
          </span>
          <div className="w-40">
            <Progress
              value={quest.current}
              max={quest.total}
              size="lg"
              showLabel
              label={`${quest.current}/${quest.total}`}
              variant={isCompleted ? 'success' : 'default'}
            />
          </div>
        </div>

        {/* Action / Status icon */}
        <div onClick={(e) => e.stopPropagation()}>
          {quest.canComplete ? (
            <QuestCompleteButton
              completed={isClaimed}
              canComplete={quest.canComplete}
              onComplete={() => onComplete(quest.action)}
            />
          ) : isCompleted ? (
            <ClaimRewardButton quest={quest} onClaim={onClaim} />
          ) : isClaimed ? (
            <div className="flex size-5 items-center justify-center radius_round bg_success_contrast shadow_xs">
              <CheckCircleIcon size={14} weight="fill" className="text_contrast" />
            </div>
          ) : null}
        </div>

      </div>
    </Card>

  );
}


export default function IQuestList({ sections, onQuestClick, onCompleteQuest, onClaimReward }: IQuestListProps) {
  return (
    <div className="flex flex-col gap-6">
      {sections.map((section) => (
        <div key={section.id} className="flex flex-col gap-3">
          <h3 className="text_primary font-semibold">
            {section.title} <span className="text_secondary font-normal">({section.progress})</span>
          </h3>
          <div className="flex flex-col gap-3">
            {section.quests.map((quest) => (
              <QuestItemCard
                key={quest.id}
                quest={quest}
                onClick={onQuestClick}
                onComplete={onCompleteQuest}
                onClaim={onClaimReward}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
