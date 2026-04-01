import { Badge } from '@frontend-team/ui-kit';
import {
  TrendUpIcon,
  ArrowRightIcon,
  TrendDownIcon,
  WarningCircleIcon,
} from '@phosphor-icons/react';
import type { AiPulse } from '@/pages/Dashboard/types/managerDashboard.types';

interface AiPulseBadgeProps {
  pulse: AiPulse;
  size?: 'sm' | 'md';
}

const PULSE_CONFIG: Record<
  AiPulse,
  { label: string; className: string; icon: React.ReactNode }
> = {
  uptrend: {
    label: 'Tích cực',
    className: 'bg-emerald-500/10 text-emerald-600 ring-emerald-500/20',
    icon: <TrendUpIcon weight="fill" />,
  },
  stable: {
    label: 'Ổn định',
    className: 'bg-indigo-500/10 text-indigo-600 ring-indigo-500/20',
    icon: <ArrowRightIcon weight="fill" />,
  },
  downtrend: {
    label: 'Giảm dần',
    className: 'bg-amber-500/10 text-amber-600 ring-amber-500/20',
    icon: <TrendDownIcon weight="fill" />,
  },
  at_risk: {
    label: 'Rủi ro',
    className: 'bg-red-500/10 text-red-600 ring-red-500/20',
    icon: <WarningCircleIcon weight="fill" />,
  },
};

export default function AiPulseBadge({ pulse, size = 'sm' }: AiPulseBadgeProps) {
  const { label, className, icon } = PULSE_CONFIG[pulse];
  const textSize = size === 'sm' ? 'text-[9px]' : 'text-[11px]';
  const iconSize = size === 'sm' ? 12 : 14;
  const px = size === 'sm' ? 'px-2 py-0.5' : 'px-3 py-1';

  return (
    <Badge
      variant="outline"
      size="sm"
      className={`${px} ${textSize} font-bold uppercase border-none shadow-none ring-1 ring-inset flex items-center gap-1 ${className}`}
    >
      {/* Clone icon with correct size */}
      <span style={{ fontSize: iconSize, lineHeight: 1 }}>{icon}</span>
      {label}
    </Badge>
  );
}
