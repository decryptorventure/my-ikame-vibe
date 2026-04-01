import { Avatar, Badge } from '@frontend-team/ui-kit';
import {
  ClockIcon,
  HouseIcon,
  FileTextIcon,
  SealCheckIcon,
  TargetIcon,
  CaretRightIcon,
} from '@phosphor-icons/react';
import type { TeamMember, ReportType } from '@/pages/Dashboard/types/managerDashboard.types';
import ActivityScoreCell from './ActivityScoreCell';
import AiPulseBadge from '@/pages/Dashboard/components/Manager/AiPulseBadge';

interface MemberTableRowProps {
  member: TeamMember;
  onClick: (member: TeamMember) => void;
}

const REPORT_ICON: Record<ReportType, React.ReactNode> = {
  weekly_report: <FileTextIcon size={12} className="text-indigo-500" />,
  okr_update: <SealCheckIcon size={12} className="text-emerald-500" />,
  goal_check_in: <TargetIcon size={12} className="text-amber-500" />,
};

function AttendanceIndicator({ member }: { member: TeamMember }) {
  const { status, checkInTime, reasonLabel } = member.attendance;

  if (status === 'online') {
    return (
      <>
        <div className="size-2.5 rounded-full bg-emerald-500 shrink-0" />
        <span className="text-[10px] font-bold text-emerald-600 uppercase flex items-center gap-1">
          <ClockIcon size={11} weight="fill" /> {checkInTime}
        </span>
      </>
    );
  }
  if (status === 'wfh') {
    return (
      <>
        <div className="size-2.5 rounded-full bg-amber-500 shrink-0" />
        <span className="text-[10px] font-bold text-amber-600 uppercase flex items-center gap-1">
          <HouseIcon size={11} weight="fill" /> WFH
        </span>
      </>
    );
  }
  return (
    <>
      <div className="size-2.5 rounded-full bg-red-500 shrink-0" />
      <span className="text-[10px] font-bold text-red-500 uppercase">{reasonLabel}</span>
    </>
  );
}

// Status dot color for avatar overlay
const STATUS_DOT: Record<string, string> = {
  online: 'bg-emerald-500',
  wfh: 'bg-amber-500',
  sick_leave: 'bg-red-500',
  annual_leave: 'bg-red-500',
  offline: 'bg-red-500',
};

export default function MemberTableRow({ member, onClick }: MemberTableRowProps) {
  const topReports = member.recentReports.slice(0, 2);

  return (
    <div
      className="grid grid-cols-[minmax(280px,1fr)_120px_160px_200px_180px_48px] gap-4 px-8 py-5 items-center hover:bg_canvas_tertiary/20 transition-all cursor-pointer group"
      onClick={() => onClick(member)}
    >
      {/* Col 1 — Member info */}
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <Avatar src={member.avatar} alt={member.name} size="m" className="border border_primary" />
          <div className={`absolute -bottom-1 -right-1 size-3 rounded-full border-2 border_canvas_secondary ${STATUS_DOT[member.attendance.status]}`} />
        </div>
        <div className="flex flex-col min-w-0">
          <p className="text-sm font-semibold text_primary group-hover:text-indigo-600 transition-colors uppercase tracking-tight truncate">
            {member.name}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[10px] text_tertiary font-bold uppercase truncate">{member.role}</span>
            <span className="text-[10px] opacity-20">|</span>
            <AttendanceIndicator member={member} />
          </div>
        </div>
      </div>

      {/* Col 2 — Level */}
      <div className="flex justify-center">
        <Badge variant="outline" className="px-2 bg_canvas_tertiary text_secondary border-none font-bold text-xs">
          Lv.{member.level}
        </Badge>
      </div>

      {/* Col 3 — Activity Score */}
      <div className="flex justify-center">
        <ActivityScoreCell activityScore={member.activityScore} />
      </div>

      {/* Col 4 — Recent reports */}
      <div className="flex flex-col gap-1.5">
        {topReports.map((report) => (
          <div key={report.id} className="flex items-center gap-2 text-[11px] text_secondary font-medium">
            <div className="shrink-0 p-1 bg_canvas_tertiary radius_s">
              {REPORT_ICON[report.type]}
            </div>
            <span className="truncate group-hover:text-indigo-600 transition-colors">{report.title}</span>
          </div>
        ))}
        <p className="text-[9px] text_tertiary font-bold pl-1 uppercase">
          {member.recentReports.length} báo cáo
        </p>
      </div>

      {/* Col 5 — AI Pulse */}
      <div className="flex flex-col gap-1">
        <AiPulseBadge pulse={member.aiPrediction.pulse} size="sm" />
        <p className="text-[11px] text_primary font-medium italic line-clamp-1 opacity-70">
          "{member.aiPrediction.summary}"
        </p>
      </div>

      {/* Col 6 — Arrow */}
      <div className="flex justify-end pr-2">
        <CaretRightIcon
          size={20}
          weight="bold"
          className="text_tertiary group-hover:text-indigo-600 group-hover:translate-x-1 transition-all"
        />
      </div>
    </div>
  );
}
