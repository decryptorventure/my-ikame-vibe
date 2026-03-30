import { useEffect, useRef, useState } from 'react';
import { Card, Progress } from '@frontend-team/ui-kit';
import { QuestCompleteButton } from '@/components';
import lightningImg from '@/assets/lightning.png';
import type { AnimatedQuest } from '../types';

interface AnimatedQuestCardProps {
  quest: AnimatedQuest;
  onExitComplete: (questId: string) => void;
  onEnterComplete: () => void;
  onCompleteQuest: (action: string) => Promise<void>;
}

export default function AnimatedQuestCard({
  quest,
  onExitComplete,
  onEnterComplete,
  onCompleteQuest,
}: AnimatedQuestCardProps) {
  const [enterActive, setEnterActive] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (quest.animationState !== 'entering') {
      setEnterActive(false);
      return;
    }
    const frameId = requestAnimationFrame(() => {
      requestAnimationFrame(() => setEnterActive(true));
    });
    return () => cancelAnimationFrame(frameId);
  }, [quest.animationState]);

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target !== wrapperRef.current) return;
    if (quest.animationState === 'exiting') onExitComplete(quest.id);
    if (quest.animationState === 'entering' && enterActive) onEnterComplete();
  };

  const wrapperClass = [
    'quest-card-wrapper',
    quest.animationState === 'exiting' && 'quest-exit',
    quest.animationState === 'entering' && !enterActive && 'quest-enter',
    quest.animationState === 'entering' && enterActive && 'quest-enter quest-enter-active',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={wrapperRef} className={wrapperClass} onTransitionEnd={handleTransitionEnd}>
      <div className="quest-card-inner">
        <Card className="shadow-none border_primary">
          <div className="p-4 flex items-center gap-6">
            <div className="flex shrink-0 items-center gap-1.5 px-4 py-2 radius_8 bg_secondary min-w-[85px]">
              <img src={lightningImg} alt="exp" className="size-4" />
              <span className="text-sm font-semibold text_primary">{quest.expPoints}</span>
            </div>

            <div className="flex-1 flex flex-col gap-1.5">
              <span className="text-sm font-semibold text_primary">{quest.title}</span>
              <div className="w-36">
                <Progress
                  value={quest.current}
                  max={quest.total}
                  size="lg"
                  showLabel
                  label={`${quest.current}/${quest.total}`}
                  variant="success"
                />
              </div>
            </div>

            <QuestCompleteButton
              completed={quest.completed}
              canComplete={quest.canComplete}
              onComplete={() => onCompleteQuest(quest.action)}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
