import { Button } from '@frontend-team/ui-kit';
import {
  CheckCircleIcon,
  HouseIcon,
  CalendarXIcon,
  WarningCircleIcon,
  ChartBarIcon,
} from '@phosphor-icons/react';
import type { TeamStats, FilterTab } from '@/pages/Dashboard/types/managerDashboard.types';

interface TeamStatsBarProps {
  stats: TeamStats;
  activeFilter: FilterTab;
  onFilterChange: (tab: FilterTab) => void;
}

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'Tất cả' },
  { key: 'online', label: 'Online' },
  { key: 'offline', label: 'Vắng mặt' },
  { key: 'at_risk', label: 'Rủi ro' },
];

export default function TeamStatsBar({ stats, activeFilter, onFilterChange }: TeamStatsBarProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Row 1 — Stat chips */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2.5 bg_canvas_secondary border border_primary radius_l shadow_sm">
          <CheckCircleIcon size={16} weight="fill" className="text-emerald-500" />
          <span className="text-sm font-bold text_primary">{stats.onlineCount}</span>
          <span className="text-[11px] text_tertiary font-medium">Online</span>
        </div>

        <div className="flex items-center gap-2 px-4 py-2.5 bg_canvas_secondary border border_primary radius_l shadow_sm">
          <HouseIcon size={16} weight="fill" className="text-amber-500" />
          <span className="text-sm font-bold text_primary">{stats.wfhCount}</span>
          <span className="text-[11px] text_tertiary font-medium">WFH</span>
        </div>

        <div className="flex items-center gap-2 px-4 py-2.5 bg_canvas_secondary border border_primary radius_l shadow_sm">
          <CalendarXIcon size={16} weight="fill" className="text-red-500" />
          <span className="text-sm font-bold text_primary">{stats.absentCount}</span>
          <span className="text-[11px] text_tertiary font-medium">Vắng</span>
        </div>

        <div className="flex items-center gap-2 px-4 py-2.5 bg_canvas_secondary border border_primary radius_l shadow_sm">
          <WarningCircleIcon size={16} weight="fill" className="text-red-500" />
          <span className="text-sm font-bold text_primary">{stats.atRiskCount}</span>
          <span className="text-[11px] text_tertiary font-medium">Rủi ro</span>
        </div>

        <div className="flex items-center gap-2 px-4 py-2.5 bg_canvas_secondary border border_primary radius_l shadow_sm">
          <ChartBarIcon size={16} weight="fill" className="text-indigo-500" />
          <span className="text-sm font-bold text_primary">{stats.averageActivityScore}%</span>
          <span className="text-[11px] text_tertiary font-medium">Avg Score</span>
        </div>
      </div>

      {/* Row 2 — Filter tabs */}
      <div className="flex items-center gap-1">
        {FILTER_TABS.map((tab) => (
          <Button
            key={tab.key}
            variant={activeFilter === tab.key ? 'primary' : 'subtle'}
            size="sm"
            onClick={() => onFilterChange(tab.key)}
            className="text-xs font-bold"
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
