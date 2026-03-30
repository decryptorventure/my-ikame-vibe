import { useState } from 'react';
import { CakeIcon, MedalIcon, PaperPlaneRightIcon } from '@phosphor-icons/react';
import { Avatar, Card, CardContent } from '@frontend-team/ui-kit';
import { useGetTodaySocialsQuery } from '@/services/social.service';
import SendWishModal from './SendWishModal';
import type { SocialTodayItem } from '@/types/social.types';

export default function SocialTodayCard() {
  const { data: socials } = useGetTodaySocialsQuery();
  const [wishTarget, setWishTarget] = useState<SocialTodayItem | null>(null);

  const socialItems = socials ?? [];
  if (socialItems.length === 0) return null;

  return (
    <>
      <Card shadow="none" className="border_primary bg_canvas_primary overflow-hidden">
        <CardContent className="p-4 flex flex-col gap-4">
          <h3 className="text-xs font-bold text_tertiary uppercase tracking-wider flex items-center gap-2">
            <div className="size-1.5 radius_round bg_error animate-pulse" />
            Hôm nay tại iKame
          </h3>

          <div className="flex flex-col gap-4">
            {socialItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="relative">
                  <Avatar size="s" src={item.avatar} fallback={item.name[0]} className="border border_primary" />
                  <div className="absolute -bottom-1 -right-1 size-5 radius_round bg_canvas_primary flex items-center justify-center shadow_xs">
                    {item.type === 'birthday' ? (
                      <CakeIcon size={12} weight="fill" className="fg_accent_primary" />
                    ) : (
                      <MedalIcon size={12} weight="fill" className="fg_accent_primary" />
                    )}
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <span className="text-sm font-semibold text_primary">{item.name}</span>
                  <span className="text-xs text_secondary">
                    {item.type === 'birthday' ? 'Sinh nhật vui vẻ! 🎂' : `Kỷ niệm ${item.years} năm 🎖️`}
                  </span>
                </div>

                <button
                  onClick={() => setWishTarget(item)}
                  className="size-8 radius_round bg_accent_primary/10 fg_accent_primary hover:bg_accent_primary hover:text_contrast transition-all flex items-center justify-center cursor-pointer border-none shadow_xs group"
                  title="Gửi lời chúc"
                >
                  <PaperPlaneRightIcon size={14} weight="bold" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <SendWishModal
        isOpen={!!wishTarget}
        onClose={() => setWishTarget(null)}
        target={wishTarget}
      />
    </>
  );
}
