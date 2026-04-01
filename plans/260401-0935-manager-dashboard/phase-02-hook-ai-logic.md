---
phase: 2
title: "Hook & AI Logic"
status: completed
effort: 30m
---

# Phase 02 — Hook & AI Logic

## Overview

Tạo `useManagerDashboard.ts` — business logic hook xử lý filter, sort, search, và tính toán AI prediction từ mock data.

## Context Links

- Types: `src/pages/Dashboard/types/managerDashboard.types.ts` (Phase 01)
- Mock data: `src/pages/Dashboard/mock/managerDashboard.mock.ts` (Phase 01)
- Plan: `plans/260401-0935-manager-dashboard/plan.md`

## Related Code Files

**Create:**
- `src/pages/Dashboard/hooks/useManagerDashboard.ts`

## Implementation Steps

### Step 1 — AI Prediction Rule Engine

Tạo helper `computeAiPrediction` (private, unexported) trong hook file:

```typescript
const PULSE_SUMMARIES: Record<AiPulse, (name: string) => string> = {
  uptrend: (name) => `${name} đang duy trì phong độ cao, dự kiến hoàn thành OKR sớm hạn.`,
  stable: (name) => `${name} duy trì nhịp độ ổn định, bám sát kế hoạch đề ra.`,
  downtrend: (name) => `${name} có dấu hiệu giảm hoạt động, cần theo dõi thêm.`,
  at_risk: (name) => `${name} đang ở ngưỡng rủi ro — hoạt động thấp và vắng mặt kéo dài.`,
};

function computeAiPulse(member: TeamMember): AiPulse {
  const { total } = member.activityScore;
  const isAbsent = member.attendance.status === 'sick_leave'
    || member.attendance.status === 'annual_leave'
    || member.attendance.status === 'offline';
  const reportsThisWeek = member.recentReports.filter((r) => {
    const submitted = new Date(r.submittedAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return submitted >= weekAgo;
  }).length;

  if (isAbsent && total < 50 && reportsThisWeek === 0) return 'at_risk';
  if (total >= 80 && reportsThisWeek >= 1) return 'uptrend';
  if (total >= 60) return 'stable';
  return 'downtrend';
}
```

**Note:** Mock data's `aiPrediction` field dùng static values. Hook sẽ override bằng computed values để đảm bảo consistency.

### Step 2 — `useManagerDashboard` Hook

```typescript
export interface UseManagerDashboardReturn {
  // Data
  filteredMembers: TeamMember[];
  stats: TeamStats;
  // Selected member for modal
  selectedMember: TeamMember | null;
  isModalOpen: boolean;
  // Filter/search state
  activeFilter: FilterTab;
  searchQuery: string;
  sortField: SortField;
  sortOrder: SortOrder;
  // Handlers
  handleMemberClick: (member: TeamMember) => void;
  handleModalClose: () => void;
  setActiveFilter: (tab: FilterTab) => void;
  setSearchQuery: (q: string) => void;
  setSortField: (f: SortField) => void;
  toggleSortOrder: () => void;
}
```

**Filter logic:**
- `all` → no filter
- `online` → status === 'online' OR 'wfh'
- `offline` → status === 'sick_leave' OR 'annual_leave' OR 'offline'
- `at_risk` → aiPrediction.pulse === 'at_risk'

**Sort logic:**
- `name` → alphabetical (Vietnamese locale)
- `score` → by `activityScore.total`
- `pulse` → order: at_risk > downtrend > stable > uptrend (worst first by default)

**useMemo for `filteredMembers`:** chain filter → search → sort.

**`stats` computation:** derive từ full members array (không filtered), counts: online, wfh, absent, atRisk, avg score.

### Step 3 — Hook file size check

File phải < 200 lines. Nếu vượt, tách `computeAiPulse` + `PULSE_SUMMARIES` ra file `src/pages/Dashboard/utils/compute-ai-pulse.ts`.

## Todo

- [x] Create `src/pages/Dashboard/hooks/useManagerDashboard.ts`
- [x] Implement `computeAiPulse` rule engine
- [x] Implement `useManagerDashboard` với filter/search/sort/modal state
- [x] Verify hook < 200 lines (tách utils nếu cần)
- [x] No `any` type, no relative imports

## Success Criteria

- Hook trả về `filteredMembers` đúng với mỗi FilterTab
- `stats.atRiskCount` = 1 khi dùng mock data (member Bình)
- `computeAiPulse` trả đúng pulse cho 5 mock members theo rule
- Filter `at_risk` chỉ trả member có pulse === 'at_risk'
