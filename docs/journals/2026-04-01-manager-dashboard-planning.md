# 2026-04-01 — Manager Dashboard Planning

## Summary

Brainstormed và tạo implementation plan cho Manager Dashboard redesign. Session dẫn đến 5-phase plan tại `plans/260401-0935-manager-dashboard/`.

## Context

Project đã có 5 UI components (TeamDashboard, MemberInsightModal, AlertMemberCard, ContributorCard, TeamHealthWidget) với mock data nhưng chưa đáp ứng đủ 4 goals của manager:
1. Attendance status hôm nay (on/off + lý do)
2. Activity score với hover breakdown tooltip
3. Recent iGoal reports
4. AI prediction per member

## Key Decisions

| Quyết định | Lựa chọn | Lý do |
|---|---|---|
| Layout | Table + Detail Modal | Tối ưu scan speed, scale tốt 10-50 members |
| API | Mock data only | Chưa có backend |
| Team scope | Direct reports | KISS — dùng `official_manager_id` |
| AI | Rule-based | YAGNI — no LLM call cho MVP |
| Tooltip | CSS group-hover | Đã có pattern sẵn, không cần Radix |

## Architecture Mới

```
Manager/
├── ManagerDashboard.tsx         # container < 60 lines
├── TeamStatsBar.tsx             # stats + filter tabs
├── AiPulseBadge.tsx             # reusable badge
├── MemberTable/
│   ├── MemberTable.tsx          # search + sort + table
│   ├── MemberTableRow.tsx       # 6-col row
│   └── ActivityScoreCell.tsx    # score + tooltip
└── MemberDetailModal/
    ├── MemberDetailModal.tsx    # modal shell
    ├── ActivityBreakdownGrid.tsx # 2x2 metrics
    └── RecentReportsFeed.tsx    # iGoal reports list
```

Supporting:
- `types/managerDashboard.types.ts` — clean TypeScript interfaces, no `any`
- `hooks/useManagerDashboard.ts` — filter/sort/AI logic tách khỏi components

## Plan

5 phases, ~5h effort:
- Phase 1: Types + mock data (5 members, diverse statuses)
- Phase 2: Hook + rule-based AI pulse algorithm
- Phase 3: Core table components
- Phase 4: Detail modal components
- Phase 5: Container + Dashboard.tsx integration + delete old files

No cross-plan dependency với gamification plan (`260327-1148-gamification-onboarding-ireward`).

## AI Pulse Algorithm

```
absent && score < 50 && reports === 0  → at_risk
score >= 80 && reportsThisWeek >= 1    → uptrend
score >= 60                            → stable
else                                   → downtrend
```

## Next

Implement theo thứ tự phase 1 → 5. Dùng `/ck:dev` hoặc `fullstack-developer` agent để execute.
