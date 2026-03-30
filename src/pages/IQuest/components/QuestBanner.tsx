import { CheckCircleIcon } from '@phosphor-icons/react';
import { Card, CardContent } from '@frontend-team/ui-kit';
import giftImg from '@/assets/gift.png';

interface QuestBannerProps {
  title: string;
  subtitle: string;
  onboardingFinished?: boolean;
}

export default function QuestBanner({ title, subtitle, onboardingFinished }: QuestBannerProps) {
  return (
    <Card shadow="none" className="border_primary relative overflow-hidden bg_canvas_primary">
      <CardContent className="flex items-center gap-6 p-6">
        <div className="relative z-10 size-16 shrink-0 radius_12 bg_secondary flex items-center justify-center p-2.5">
          <img src={giftImg} alt="reward" className="size-full object-contain" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text_primary leading-tight">
              {title}
            </h2>
            {onboardingFinished && (
              <CheckCircleIcon size={20} weight="fill" className="fg_success" />
            )}
          </div>
          <p className="text-sm text_secondary leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 size-36 radius_round bg_accent_primary/10 opacity-60 blur-2xl" />
        <div className="absolute right-12 top-2 size-2.5 radius_round bg_accent_primary opacity-40" />
        <div className="absolute right-24 bottom-4 size-1.5 radius_round bg_accent_secondary opacity-40" />
      </CardContent>
    </Card>
  );
}
