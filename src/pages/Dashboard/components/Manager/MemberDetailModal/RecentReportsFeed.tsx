import { Badge, ScrollArea } from '@frontend-team/ui-kit';
import {
  FileTextIcon,
  SealCheckIcon,
  TargetIcon,
  CalendarXIcon,
} from '@phosphor-icons/react';
import type { RecentReport, ReportType } from '@/pages/Dashboard/types/managerDashboard.types';

interface RecentReportsFeedProps {
  reports: RecentReport[];
}

const REPORT_ICON: Record<ReportType, React.ReactNode> = {
  weekly_report: <FileTextIcon size={16} className="text-indigo-600" />,
  okr_update: <SealCheckIcon size={16} className="text-emerald-600" />,
  goal_check_in: <TargetIcon size={16} className="text-amber-600" />,
};

const REPORT_BG: Record<ReportType, string> = {
  weekly_report: 'bg-indigo-500/10',
  okr_update: 'bg-emerald-500/10',
  goal_check_in: 'bg-amber-500/10',
};

// Compute human-readable relative time from ISO string
function formatRelativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return 'Vừa xong';
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Hôm qua';
  return `${days} ngày trước`;
}

function isNew(isoString: string): boolean {
  return Date.now() - new Date(isoString).getTime() < 24 * 3_600_000;
}

export default function RecentReportsFeed({ reports }: RecentReportsFeedProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <FileTextIcon size={16} weight="bold" className="text-amber-500" />
        <h3 className="text-sm font-semibold text_primary">Báo cáo iGoal gần đây</h3>
      </div>

      {reports.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center bg_canvas_tertiary/20 radius_m border border_primary border-dashed">
          <CalendarXIcon size={24} className="text_tertiary opacity-50" />
          <p className="text-xs text_tertiary font-medium">Chưa có báo cáo tuần này</p>
        </div>
      ) : (
        <ScrollArea viewportClassName={reports.length > 5 ? 'max-h-72' : undefined}>
          <div className="flex flex-col gap-2">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex items-start gap-3 p-3 bg_canvas_secondary border border_primary radius_m"
              >
                <div className={`p-1.5 radius_s shrink-0 ${REPORT_BG[report.type]}`}>
                  {REPORT_ICON[report.type]}
                </div>
                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                  <p className="text-sm font-medium text_primary line-clamp-1">{report.title}</p>
                  <p className="text-[11px] text_tertiary font-medium">
                    {formatRelativeTime(report.submittedAt)}
                  </p>
                </div>
                {isNew(report.submittedAt) && (
                  <Badge
                    variant="outline"
                    size="sm"
                    className="shrink-0 px-1.5 text-[9px] font-bold border-none bg-emerald-500/10 text-emerald-600"
                  >
                    MỚI
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
