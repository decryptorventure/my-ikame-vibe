---
title: "Manager Dashboard — Redesign UI (Mock Data)"
description: "Redesign Manager Dashboard: table-based team view với attendance status, activity score tooltip, recent iGoal reports, rule-based AI prediction. No API — mock data only."
status: completed
priority: P1
effort: 5h
issue:
branch: main
tags: [frontend, feature, manager, dashboard]
created: 2026-04-01
blockedBy: []
blocks: []
---

# Manager Dashboard — Redesign UI

## Overview

Replace 5 old Manager components với architecture mới. Scope: UI only, mock data, no API.

**4 goals:**
1. Attendance status: on/off + lý do, TeamStatsBar counts
2. Activity score: % + color + Radix Popover breakdown tooltip
3. Recent iGoal reports: badge count in row, full list in modal
4. AI prediction: rule-based pulse (uptrend/stable/downtrend/at_risk)

**Brainstorm report:** `plans/reports/brainstorm-260401-0935-manager-dashboard.md`

## Phases

| # | Phase | Status | Effort | Link |
|---|-------|--------|--------|------|
| 1 | Types & Mock Data | Done | 45m | [phase-01](./phase-01-types-mock-data.md) |
| 2 | Hook & AI Logic | Done | 30m | [phase-02](./phase-02-hook-ai-logic.md) |
| 3 | Core Components | Done | 2h | [phase-03](./phase-03-core-components.md) |
| 4 | Detail Modal | Done | 1h | [phase-04](./phase-04-detail-modal.md) |
| 5 | Container & Integration | Done | 30m | [phase-05](./phase-05-container-integration.md) |

## Dependency

```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5
```

Sequential — each phase depends on the previous.

## Files to CREATE

```
src/pages/Dashboard/types/managerDashboard.types.ts
src/pages/Dashboard/hooks/useManagerDashboard.ts
src/pages/Dashboard/components/Manager/ManagerDashboard.tsx
src/pages/Dashboard/components/Manager/TeamStatsBar.tsx
src/pages/Dashboard/components/Manager/AiPulseBadge.tsx
src/pages/Dashboard/components/Manager/MemberTable/MemberTable.tsx
src/pages/Dashboard/components/Manager/MemberTable/MemberTableRow.tsx
src/pages/Dashboard/components/Manager/MemberTable/ActivityScoreCell.tsx
src/pages/Dashboard/components/Manager/MemberDetailModal/MemberDetailModal.tsx
src/pages/Dashboard/components/Manager/MemberDetailModal/ActivityBreakdownGrid.tsx
src/pages/Dashboard/components/Manager/MemberDetailModal/RecentReportsFeed.tsx
```

## Files to DELETE

```
src/pages/Dashboard/components/Manager/TeamDashboard.tsx
src/pages/Dashboard/components/Manager/MemberInsightModal.tsx
src/pages/Dashboard/components/Manager/AlertMemberCard.tsx
src/pages/Dashboard/components/Manager/ContributorCard.tsx
src/pages/Dashboard/components/Manager/TeamHealthWidget.tsx
```

## Files to MODIFY

```
src/pages/Dashboard/Dashboard.tsx           — update import: TeamDashboard → ManagerDashboard
src/pages/Dashboard/mock/managerDashboard.mock.ts — update with new TeamMember type, 5+ members
```

## Key Constraints

- No file > 200 lines
- No `any` type (remove `sourceReports: any[]` from existing mock)
- No relative imports — use `@/` aliases
- Import from `@frontend-team/ui-kit` only (no antd/shadcn)
- Business logic in hooks, not components
- Tooltip: use CSS group-hover (same pattern as existing) — Radix not needed for this use case
