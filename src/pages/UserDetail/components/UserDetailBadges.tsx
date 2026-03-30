import { Card, CardContent } from '@frontend-team/ui-kit';
import type { BadgeItem } from '@/types/social.types';

interface UserDetailBadgesProps {
  badges: BadgeItem[];
}

const RARITY_STYLES: Record<BadgeItem['rarity'], { border: string; bg: string; label: string }> = {
  common: { border: 'border_tertiary', bg: 'bg_secondary', label: 'Thường' },
  rare: { border: 'border-[var(--color-accent-primary)]', bg: 'bg_accent_primary/5', label: 'Hiếm' },
  epic: { border: 'border-[#a855f7]', bg: 'bg-[#a855f7]/5', label: 'Sử thi' },
  legendary: { border: 'border-[#f59e0b]', bg: 'bg-[#f59e0b]/5', label: 'Huyền thoại' },
};

const RARITY_LABEL_STYLES: Record<BadgeItem['rarity'], string> = {
  common: 'text_tertiary bg_secondary',
  rare: 'fg_accent_primary bg_accent_primary/10',
  epic: 'text-[#a855f7] bg-[#a855f7]/10',
  legendary: 'text-[#f59e0b] bg-[#f59e0b]/10',
};

export default function UserDetailBadges({ badges }: UserDetailBadgesProps) {
  if (badges.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-base font-bold text_primary">Bộ sưu tập huy chương ({badges.length})</h2>

      <div className="grid grid-cols-3 gap-3">
        {badges.map((badge) => {
          const style = RARITY_STYLES[badge.rarity];
          const labelStyle = RARITY_LABEL_STYLES[badge.rarity];

          return (
            <Card
              key={badge.id}
              shadow="none"
              className={`border ${style.border} ${style.bg} hover:shadow_m transition-all cursor-default`}
            >
              <CardContent className="p-4 flex flex-col items-center gap-2 text-center">
                <span className="text-3xl">{badge.iconUrl}</span>
                <span className="text-sm font-semibold text_primary leading-tight">{badge.name}</span>
                <span className="text-xs text_secondary leading-snug">{badge.description}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 radius_round ${labelStyle}`}>
                  {RARITY_STYLES[badge.rarity].label}
                </span>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
