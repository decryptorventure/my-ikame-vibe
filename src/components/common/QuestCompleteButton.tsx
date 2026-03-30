import Lottie from 'lottie-react';
import { useCallback, useState } from 'react';
import { CheckCircleIcon, CheckIcon, CircleNotchIcon } from '@phosphor-icons/react';
import confettiAnimation from '@/assets/confetti.json';

type ButtonState = 'idle' | 'loading' | 'celebrating' | 'done';


interface QuestCompleteButtonProps {
  completed: boolean;
  canComplete: boolean;
  onComplete: () => Promise<void>;
}

function DoneIcon() {
  return (
    <div className="flex size-5 items-center justify-center radius_round bg_success_contrast shadow_xs">
      <CheckIcon size={12} weight="bold" className="text_contrast" />
    </div>
  );
}

export default function QuestCompleteButton({
  completed,
  canComplete,
  onComplete,
}: QuestCompleteButtonProps) {
  const [state, setState] = useState<ButtonState>(completed ? 'done' : 'idle');

  const handleClick = useCallback(async () => {
    if (state !== 'idle' || !canComplete) return;

    setState('loading');
    try {
      await onComplete();
      setState('celebrating');
    } catch {
      setState('idle');
    }
  }, [state, canComplete, onComplete]);

  const handleAnimationComplete = useCallback(() => {
    setState('done');
  }, []);

  if (state === 'loading') {
    return (
      <div className="flex size-5 items-center justify-center">
        <CircleNotchIcon size={22} className="animate-spin icon_tertiary" />
      </div>
    );
  }

  if (state === 'celebrating') {
    return (
      <div className="relative flex size-5 items-center justify-center">
        <DoneIcon />
        <div className="pointer-events-none absolute -inset-4">
          <Lottie
            animationData={confettiAnimation}
            loop={false}
            onComplete={handleAnimationComplete}
            className="size-full"
          />
        </div>

      </div>
    );
  }

  if (state === 'done' || completed) {
    return <DoneIcon />;
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!canComplete}
      aria-label="Hoàn thành nhiệm vụ"
      className="flex size-5 cursor-pointer items-center justify-center text_tertiary transition-colors hover:text_success disabled:cursor-not-allowed disabled:opacity-50"
    >
      <CheckCircleIcon size={20} weight="light" />
    </button>
  );
}
