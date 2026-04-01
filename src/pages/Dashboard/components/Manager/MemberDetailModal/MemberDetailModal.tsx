import { Modal, Avatar, Badge, Button } from '@frontend-team/ui-kit';
import { ClockIcon, HouseIcon, CalendarXIcon, SparkleIcon } from '@phosphor-icons/react';
import type { TeamMember } from '@/pages/Dashboard/types/managerDashboard.types';
import AiPulseBadge from '@/pages/Dashboard/components/Manager/AiPulseBadge';
import ActivityBreakdownGrid from './ActivityBreakdownGrid';
import RecentReportsFeed from './RecentReportsFeed';

interface MemberDetailModalProps {
  open: boolean;
  member: TeamMember | null;
  onClose: () => void;
}

function getStatusBadgeClass(status: TeamMember['attendance']['status']): string {
  if (status === 'online' || status === 'wfh') return 'bg-emerald-500/10 text-emerald-600 ring-emerald-500/20';
  return 'bg-red-500/10 text-red-600 ring-red-500/20';
}

function getStatusLabel(status: TeamMember['attendance']['status']): string {
  if (status === 'online') return 'Đang làm việc';
  if (status === 'wfh') return 'WFH';
  return 'Vắng mặt';
}

function AttendanceRow({ member }: { member: TeamMember }) {
  const { status, checkInTime, reasonLabel } = member.attendance;
  if (status === 'online') {
    return (
      <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
        <ClockIcon size={13} weight="fill" /> Check-in lúc {checkInTime}
      </span>
    );
  }
  if (status === 'wfh') {
    return (
      <span className="flex items-center gap-1 text-xs text-amber-600 font-medium">
        <HouseIcon size={13} weight="fill" /> WFH hôm nay
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-xs text-red-500 font-medium">
      <CalendarXIcon size={13} weight="fill" /> {reasonLabel}
    </span>
  );
}

export default function MemberDetailModal({ open, member, onClose }: MemberDetailModalProps) {
  if (!member) return null;

  const { activityScore } = member;
  const scoreColor =
    activityScore.total >= 80
      ? 'text-emerald-600'
      : activityScore.total >= 60
        ? 'text-amber-600'
        : 'text-red-500';
  const barColor =
    activityScore.total >= 80
      ? 'bg-emerald-500'
      : activityScore.total >= 60
        ? 'bg-amber-500'
        : 'bg-red-500';

  return (
    <Modal
      open={open}
      onOpenChange={(isOpen: boolean) => !isOpen && onClose()}
      title="Chi tiết nhân sự"
      size="xl"
    >
      <div className="flex flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex items-start gap-4 pb-5 border-b border_primary">
          <div className="relative shrink-0">
            <Avatar src={member.avatar} alt={member.name} size="xl" className="border border_primary shadow_sm" />
            <div className={`absolute -bottom-1 -right-1 size-4 rounded-full border-2 border_canvas_secondary ${member.attendance.status === 'online' ? 'bg-emerald-500' : member.attendance.status === 'wfh' ? 'bg-amber-500' : 'bg-red-500'}`} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text_primary tracking-tight">{member.name}</h2>
              <Badge
                variant="outline"
                className={`px-2 py-0.5 text-[10px] font-bold uppercase border-none shadow-none ring-1 ring-inset ${getStatusBadgeClass(member.attendance.status)}`}
              >
                {getStatusLabel(member.attendance.status)}
              </Badge>
              <AiPulseBadge pulse={member.aiPrediction.pulse} size="md" />
            </div>
            <p className="text-xs text_tertiary font-semibold uppercase tracking-wide mb-2">
              {member.role} · Lv.{member.level}
            </p>
            <AttendanceRow member={member} />

            {/* Overall activity score */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-[11px] font-bold text_tertiary uppercase tracking-wider">
                Activity Score
              </span>
              <span className={`text-xl font-bold ${scoreColor}`}>{activityScore.total}%</span>
              <div className="flex-1 h-2 bg_canvas_tertiary radius_round overflow-hidden max-w-[200px]">
                <div
                  className={`h-full radius_round ${barColor}`}
                  style={{ width: `${activityScore.total}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Body — 2 columns */}
        <div className="grid grid-cols-[1fr_320px] gap-6">
          {/* Left — Activity breakdown */}
          <ActivityBreakdownGrid activityScore={member.activityScore} />

          {/* Right — Reports + AI Insight */}
          <div className="flex flex-col gap-5">
            <RecentReportsFeed reports={member.recentReports} />

            {/* AI Insight */}
            <div className="flex flex-col gap-3 p-4 bg-indigo-50/50 dark:bg-indigo-950/20 radius_l border border-indigo-100 dark:border-indigo-900/50">
              <div className="flex items-center gap-2">
                <SparkleIcon size={16} weight="fill" className="text-indigo-600" />
                <AiPulseBadge pulse={member.aiPrediction.pulse} size="md" />
              </div>
              <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 italic leading-relaxed">
                "{member.aiPrediction.summary}"
              </p>
              <p className="text-xs text_secondary leading-relaxed">
                {member.aiPrediction.detailedAnalysis}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4 border-t border_primary">
          <Button variant="border" onClick={onClose} className="text-[11px] uppercase tracking-widest font-bold px-6">
            Đóng
          </Button>
        </div>
      </div>
    </Modal>
  );
}
