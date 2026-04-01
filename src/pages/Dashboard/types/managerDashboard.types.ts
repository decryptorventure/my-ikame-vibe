export type AttendanceStatus = 'online' | 'wfh' | 'sick_leave' | 'annual_leave' | 'offline';

export type AiPulse = 'uptrend' | 'stable' | 'downtrend' | 'at_risk';

export type ReportType = 'weekly_report' | 'okr_update' | 'goal_check_in';

export interface AttendanceInfo {
  status: AttendanceStatus;
  checkInTime?: string;   // "08:15" — only when online/wfh
  reasonLabel?: string;   // "Nghỉ ốm", "WFH", "Nghỉ phép năm" — only when offline
}

export interface ActivityBreakdown {
  checkIn: number;    // 0–100 score
  newsfeed: number;
  wiki: number;
  iGoal: number;
}

export interface ActivityScoreInfo {
  total: number;           // 0–100, computed average
  breakdown: ActivityBreakdown;
}

export interface RecentReport {
  id: string;
  title: string;
  type: ReportType;
  submittedAt: string;   // ISO 8601
}

export interface AiPrediction {
  pulse: AiPulse;
  summary: string;           // 1-line Vietnamese
  detailedAnalysis: string;  // full paragraph
}

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  level: number;
  attendance: AttendanceInfo;
  activityScore: ActivityScoreInfo;
  recentReports: RecentReport[];
  aiPrediction: AiPrediction;
}

export interface TeamStats {
  total: number;
  onlineCount: number;
  wfhCount: number;
  absentCount: number;        // sick_leave + annual_leave + offline
  averageActivityScore: number;
  atRiskCount: number;
}

export type FilterTab = 'all' | 'online' | 'offline' | 'at_risk';

export type SortField = 'name' | 'score' | 'pulse';
export type SortOrder = 'asc' | 'desc';
