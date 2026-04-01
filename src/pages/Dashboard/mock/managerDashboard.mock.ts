import type { TeamMember, TeamStats } from '@/pages/Dashboard/types/managerDashboard.types';

// 5 members with diverse attendance statuses and activity scores.
// Dates are near 2026-04-01. "reportsThisWeek" window = last 7 days from runtime.
// Mock AI prediction values match computeAiPulse() rule engine in useManagerDashboard.
export const MOCK_TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Nguyễn Văn An',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=An',
    role: 'Frontend Developer',
    level: 4,
    attendance: {
      status: 'online',
      checkInTime: '08:15',
    },
    activityScore: {
      total: 92,
      breakdown: { checkIn: 95, newsfeed: 90, wiki: 88, iGoal: 95 },
    },
    recentReports: [
      { id: 'r1a', title: 'Weekly Report - Tuần 13', type: 'weekly_report', submittedAt: '2026-03-31T07:45:00.000Z' },
      { id: 'r1b', title: 'OKR Update: UI Kit Completion Q1', type: 'okr_update', submittedAt: '2026-03-28T09:00:00.000Z' },
      { id: 'r1c', title: 'Goal Check-in: Component Library', type: 'goal_check_in', submittedAt: '2026-03-21T10:30:00.000Z' },
    ],
    aiPrediction: {
      pulse: 'uptrend',
      summary: 'Nguyễn Văn An đang duy trì phong độ cao, dự kiến hoàn thành OKR sớm hạn.',
      detailedAnalysis: 'Dựa trên tần suất check-in iGoal đều đặn và chất lượng báo cáo chi tiết, An đang có sự tập trung cao độ vào mục tiêu then chốt. Sự tham gia tích cực trên iWiki cũng cho thấy vai trò dẫn dắt kỹ thuật tốt.',
    },
  },
  {
    id: '2',
    name: 'Trần Thị Bình',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Binh',
    role: 'Backend Developer',
    level: 3,
    attendance: {
      status: 'sick_leave',
      reasonLabel: 'Nghỉ ốm',
    },
    activityScore: {
      total: 45,
      breakdown: { checkIn: 50, newsfeed: 40, wiki: 42, iGoal: 48 },
    },
    recentReports: [
      // Intentionally > 7 days ago → reportsThisWeek = 0 → at_risk rule triggers
      { id: 'r2a', title: 'Weekly Report - Tuần 10', type: 'weekly_report', submittedAt: '2026-03-14T08:00:00.000Z' },
      { id: 'r2b', title: 'OKR Update: API Optimization', type: 'okr_update', submittedAt: '2026-03-08T11:00:00.000Z' },
    ],
    aiPrediction: {
      pulse: 'at_risk',
      summary: 'Trần Thị Bình đang ở ngưỡng rủi ro — hoạt động thấp và vắng mặt kéo dài.',
      detailedAnalysis: 'Bình đang gặp khó khăn trong việc duy trì nhịp độ làm việc. Không có báo cáo iGoal trong 7 ngày qua, kết hợp với điểm hoạt động thấp và nghỉ ốm kéo dài. Cần có sự hỗ trợ từ team để đảm bảo timeline dự án.',
    },
  },
  {
    id: '3',
    name: 'Lê Văn Cường',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cuong',
    role: 'UX Designer',
    level: 2,
    attendance: {
      status: 'online',
      checkInTime: '08:45',
    },
    activityScore: {
      total: 72,
      breakdown: { checkIn: 72, newsfeed: 70, wiki: 75, iGoal: 71 },
    },
    recentReports: [
      { id: 'r3a', title: 'Weekly Report - Tuần 13', type: 'weekly_report', submittedAt: '2026-03-31T09:15:00.000Z' },
      { id: 'r3b', title: 'Goal Check-in: UX Audit Q1', type: 'goal_check_in', submittedAt: '2026-03-27T14:00:00.000Z' },
    ],
    aiPrediction: {
      pulse: 'stable',
      summary: 'Lê Văn Cường duy trì nhịp độ ổn định, bám sát kế hoạch đề ra.',
      detailedAnalysis: 'Cường duy trì sự hiện diện đều đặn trên các nền tảng iKame. Mặc dù không quá bùng nổ, nhưng các đầu việc được giải quyết tuần tự và có báo cáo đầy đủ trên iGoal.',
    },
  },
  {
    id: '4',
    name: 'Phạm Thị Dung',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dung',
    role: 'Product Manager',
    level: 5,
    attendance: {
      status: 'wfh',
      checkInTime: '08:30',
      reasonLabel: 'WFH',
    },
    activityScore: {
      total: 68,
      breakdown: { checkIn: 65, newsfeed: 72, wiki: 68, iGoal: 67 },
    },
    recentReports: [
      { id: 'r4a', title: 'Weekly Report - Tuần 12', type: 'weekly_report', submittedAt: '2026-03-22T16:00:00.000Z' },
      { id: 'r4b', title: 'OKR Update: Product Roadmap Q2', type: 'okr_update', submittedAt: '2026-03-18T10:00:00.000Z' },
    ],
    aiPrediction: {
      pulse: 'stable',
      summary: 'Phạm Thị Dung duy trì nhịp độ ổn định, bám sát kế hoạch đề ra.',
      detailedAnalysis: 'Dung làm việc hiệu quả từ xa với tỉ lệ tham gia Newsfeed cao. Báo cáo OKR được cập nhật đều đặn, thể hiện sự chủ động trong quản lý sản phẩm.',
    },
  },
  {
    id: '5',
    name: 'Hoàng Minh Đức',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Duc',
    role: 'QA Engineer',
    level: 2,
    attendance: {
      status: 'annual_leave',
      reasonLabel: 'Nghỉ phép năm',
    },
    activityScore: {
      total: 30,
      breakdown: { checkIn: 30, newsfeed: 28, wiki: 32, iGoal: 30 },
    },
    recentReports: [
      // Has 1 report this week → prevents at_risk → stays downtrend (score < 60)
      { id: 'r5a', title: 'Weekly Report - Tuần 13', type: 'weekly_report', submittedAt: '2026-03-31T17:00:00.000Z' },
    ],
    aiPrediction: {
      pulse: 'downtrend',
      summary: 'Hoàng Minh Đức có dấu hiệu giảm hoạt động, cần theo dõi thêm.',
      detailedAnalysis: 'Đức hiện đang nghỉ phép năm. Điểm hoạt động tổng thể khá thấp trong tháng qua. Sau khi trở lại cần đặt mục tiêu rõ ràng để cải thiện tỉ lệ tham gia các nền tảng iKame.',
    },
  },
];

export const MOCK_TEAM_STATS: TeamStats = {
  total: 5,
  onlineCount: 2,   // An + Cường
  wfhCount: 1,      // Dung
  absentCount: 2,   // Bình (sick_leave) + Đức (annual_leave)
  averageActivityScore: 61,  // Math.round((92+45+72+68+30)/5)
  atRiskCount: 1,   // Bình — computed by hook at runtime; static value for reference
};
