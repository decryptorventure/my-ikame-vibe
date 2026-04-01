---
phase: 1
title: "Types & Mock Data"
status: completed
effort: 45m
---

# Phase 01 — Types & Mock Data

## Overview

Định nghĩa TypeScript interfaces mới và cập nhật mock data với richer dataset (5+ members).

## Context Links

- Brainstorm: `plans/reports/brainstorm-260401-0935-manager-dashboard.md`
- Existing mock: `src/pages/Dashboard/mock/managerDashboard.mock.ts`
- Plan overview: `plans/260401-0935-manager-dashboard/plan.md`

## Related Code Files

**Create:**
- `src/pages/Dashboard/types/managerDashboard.types.ts`

**Modify:**
- `src/pages/Dashboard/mock/managerDashboard.mock.ts` — replace với new types + 5 members

## Implementation Steps

### Step 1 — Create `managerDashboard.types.ts`

Create file `src/pages/Dashboard/types/managerDashboard.types.ts`:

```typescript
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
```

### Step 2 — Update `managerDashboard.mock.ts`

Rewrite toàn bộ file. Bỏ old interfaces, import types từ `managerDashboard.types.ts`. Thêm 5 members đa dạng:

| # | Name | Status | Score | Pulse |
|---|------|--------|-------|-------|
| 1 | Nguyễn Văn An | online | 92 | uptrend |
| 2 | Trần Thị Bình | sick_leave | 45 | at_risk |
| 3 | Lê Văn Cường | online | 72 | stable |
| 4 | Phạm Thị Dung | wfh | 68 | stable |
| 5 | Hoàng Minh Đức | annual_leave | 30 | downtrend |

**Mock data rules:**
- `recentReports` dùng ISO dates gần ngày 2026-04-01 (không dùng relative "2h ago" — tính tại runtime)
- `activityScore.total` = average của 4 breakdown scores
- `aiPrediction` values match rule-based algorithm (sẽ dùng trong phase 2)
- KHÔNG có `sourceReports: any[]` — removed

**Export:**
```typescript
export const MOCK_TEAM_MEMBERS: TeamMember[] = [...];
export const MOCK_TEAM_STATS: TeamStats = {...};  // computed from MOCK_TEAM_MEMBERS
```

## Todo

- [x] Create `src/pages/Dashboard/types/managerDashboard.types.ts` với đầy đủ interfaces
- [x] Rewrite `src/pages/Dashboard/mock/managerDashboard.mock.ts` — new types, 5 members
- [x] Verify: `MOCK_TEAM_STATS` counts khớp với members array (onlineCount, wfhCount, etc.)
- [x] Verify: không còn `any` type

## Success Criteria

- TypeScript strict mode compiles without errors
- 5 mock members với diverse attendance statuses (online, wfh, sick_leave, annual_leave, offline/downtrend)
- `MOCK_TEAM_STATS.atRiskCount` = 1 (Bình)
- No `any` type anywhere
