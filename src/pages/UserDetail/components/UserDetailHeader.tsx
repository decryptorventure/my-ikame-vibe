import { Avatar, Card, CardContent, Progress } from '@frontend-team/ui-kit';
import { EnvelopeSimpleIcon, MapPinIcon, CalendarIcon, BriefcaseIcon } from '@phosphor-icons/react';
import lightningImg from '@/assets/lightning.png';

interface UserDetailHeaderProps {
  user: {
    name: string;
    avatar?: string;
    initials: string;
    position: string;
    department: string;
    team: string;
    email: string;
    status: string;
    level: number;
    title: string;
    currentXP: number;
    maxXP: number;
    joinDate?: string;
  };
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  newcomer: { label: 'Tân thủ', color: 'fg_warning' },
  official: { label: 'Chính thức', color: 'fg_success' },
  probation: { label: 'Thử việc', color: 'fg_amber_strong' },
};

export default function UserDetailHeader({ user }: UserDetailHeaderProps) {
  const statusInfo = STATUS_LABELS[user.status] || { label: user.status, color: 'text_secondary' };

  return (
    <Card shadow="none" className="border_primary overflow-hidden">
      {/* Banner gradient */}
      <div className="h-24 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary,var(--color-accent-primary))] opacity-80" />

      <CardContent className="-mt-12 px-6 pb-6 flex flex-col gap-4">
        {/* Avatar + Basic Info */}
        <div className="flex items-end gap-4">
          <Avatar
            size="xl"
            src={user.avatar}
            fallback={user.initials}
            alt={user.name}
            className="border-4 border-[var(--color-canvas-primary)] shadow_m"
          />
          <div className="flex-1 flex flex-col gap-1 pb-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text_primary">{user.name}</h1>
              <span className={`text-xs font-semibold px-2 py-0.5 radius_round bg_secondary ${statusInfo.color}`}>
                {statusInfo.label}
              </span>
            </div>
            <p className="text-sm text_secondary">{user.position}</p>
          </div>
        </div>

        {/* Level bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg_secondary radius_12">
          <img src={lightningImg} alt="level" className="size-5" />
          <div className="flex-1 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text_primary">Lv.{user.level} — {user.title}</span>
              <span className="text-xs text_tertiary">{user.currentXP}/{user.maxXP} EXP</span>
            </div>
            <Progress
              value={user.currentXP}
              max={user.maxXP}
              size="lg"
            />
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm text_secondary">
            <BriefcaseIcon size={16} className="fg_accent_primary shrink-0" />
            <span>{user.department}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text_secondary">
            <MapPinIcon size={16} className="fg_accent_primary shrink-0" />
            <span>{user.team}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text_secondary">
            <EnvelopeSimpleIcon size={16} className="fg_accent_primary shrink-0" />
            <span>{user.email}</span>
          </div>
          {user.joinDate && (
            <div className="flex items-center gap-2 text-sm text_secondary">
              <CalendarIcon size={16} className="fg_accent_primary shrink-0" />
              <span>Gia nhập: {user.joinDate}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
