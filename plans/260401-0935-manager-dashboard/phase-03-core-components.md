---
phase: 3
title: "Core Components"
status: completed
effort: 2h
---

# Phase 03 — Core Components

## Overview

Tạo các components cho main table view: TeamStatsBar, AiPulseBadge, ActivityScoreCell, MemberTableRow, MemberTable.

## Context Links

- Types: `src/pages/Dashboard/types/managerDashboard.types.ts` (Phase 01)
- Hook: `src/pages/Dashboard/hooks/useManagerDashboard.ts` (Phase 02)
- Plan: `plans/260401-0935-manager-dashboard/plan.md`
- UI Kit docs: `.agents/skills/ui-kit/UI_KIT.md`

## Related Code Files

**Create:**
- `src/pages/Dashboard/components/Manager/TeamStatsBar.tsx`
- `src/pages/Dashboard/components/Manager/AiPulseBadge.tsx`
- `src/pages/Dashboard/components/Manager/MemberTable/ActivityScoreCell.tsx`
- `src/pages/Dashboard/components/Manager/MemberTable/MemberTableRow.tsx`
- `src/pages/Dashboard/components/Manager/MemberTable/MemberTable.tsx`

## Implementation Steps

### Step 1 — `AiPulseBadge.tsx`

Reusable badge, size variant (sm for table, md for modal).

```typescript
interface AiPulseBadgeProps {
  pulse: AiPulse;
  size?: 'sm' | 'md';
}
```

Color mapping:
| Pulse | Icon (Phosphor) | Classes |
|-------|-----------------|---------|
| uptrend | `TrendUpIcon` fill | `bg-emerald-500/10 text-emerald-600 ring-emerald-500/20` |
| stable | `ArrowRightIcon` fill | `bg-indigo-500/10 text-indigo-600 ring-indigo-500/20` |
| downtrend | `TrendDownIcon` fill | `bg-amber-500/10 text-amber-600 ring-amber-500/20` |
| at_risk | `WarningCircleIcon` fill | `bg-red-500/10 text-red-600 ring-red-500/20` |

Label tiếng Việt: `{ uptrend: 'Tích cực', stable: 'Ổn định', downtrend: 'Giảm dần', at_risk: 'Rủi ro' }`

Use `Badge` from `@frontend-team/ui-kit` with `variant="outline"` + custom className.

---

### Step 2 — `TeamStatsBar.tsx`

```typescript
interface TeamStatsBarProps {
  stats: TeamStats;
  activeFilter: FilterTab;
  onFilterChange: (tab: FilterTab) => void;
}
```

**Layout (two rows):**

**Row 1 — 4 stat chips:**
```
[ 🟢 {onlineCount} Online ]  [ 🟡 {wfhCount} WFH ]
[ 🔴 {absentCount} Vắng ]    [ ⚡ {atRiskCount} Rủi ro ]  [ Avg: {avg}% ]
```
Each chip: `Card` with icon + count + label. Clickable chips cho online/offline/at_risk filter.

**Row 2 — Filter tabs:**
```
[ Tất cả ]  [ Online ]  [ Vắng mặt ]  [ Rủi ro ]
```
Active tab: `bg_primary text_contrast`. Inactive: `text_secondary hover:bg_canvas_tertiary`.

Use `Button` from UI kit with `variant="ghost"` for inactive, `variant="primary"` for active.

---

### Step 3 — `ActivityScoreCell.tsx`

```typescript
interface ActivityScoreCellProps {
  activityScore: ActivityScoreInfo;
}
```

**Render:**
- Score % number — color-coded: `≥80 text-emerald-600`, `≥60 text-amber-600`, `<60 text-red-500`
- Mini progress bar (w-16, h-1) — same color coding
- CSS group-hover tooltip (same pattern as existing TeamDashboard — no Radix needed)

**Tooltip layout (w-52, absolute positioned above):**
```
Activity Breakdown
─────────────────────────────
✅ iCheck (Check-in)    {n}/100
📣 Newsfeed             {n}/100
📚 iWiki                {n}/100
🎯 iGoal                {n}/100
─────────────────────────────
```
Each row: label + score bar (h-0.5, filled to score%) + value.

**Important:** wrap in `<div className="relative group/score">` — tooltip uses `invisible group-hover/score:visible`.

---

### Step 4 — `MemberTableRow.tsx`

```typescript
interface MemberTableRowProps {
  member: TeamMember;
  onClick: (member: TeamMember) => void;
}
```

**Grid columns** (match MemberTable header): `grid-cols-[minmax(280px,1fr)_120px_160px_200px_180px_48px]`

| Col | Content |
|-----|---------|
| 1 — Member | Avatar (size="m") + online dot + Name (uppercase, group-hover:text-indigo-600) + Role + check-in time OR reason badge |
| 2 — Level | `Lv.{n}` badge — `bg_canvas_tertiary text_secondary` |
| 3 — Score | `<ActivityScoreCell />` |
| 4 — Reports | Top 2 report titles (icon + truncated text) + `"{n} báo cáo"` sub-label |
| 5 — AI Pulse | `<AiPulseBadge size="sm" />` + 1-line summary (italic, line-clamp-1, opacity-70) |
| 6 — Arrow | `CaretRightIcon` weight="bold" — group-hover:translate-x-1 + text-indigo-600 |

**Attendance status rendering:**
- `online`: green dot (`bg-emerald-500`) + `ClockIcon` + checkInTime
- `wfh`: yellow dot (`bg-amber-500`) + `HouseIcon` + "WFH"
- `sick_leave` / `annual_leave` / `offline`: red dot (`bg-red-500`) + reasonLabel as red text

**Report icon mapping:** `weekly_report` → `FileTextIcon` blue, `okr_update` → `SealCheckIcon` emerald, `goal_check_in` → `TargetIcon` amber.

---

### Step 5 — `MemberTable.tsx`

```typescript
interface MemberTableProps {
  members: TeamMember[];
  searchQuery: string;
  sortField: SortField;
  sortOrder: SortOrder;
  onSearchChange: (q: string) => void;
  onSortFieldChange: (f: SortField) => void;
  onToggleSortOrder: () => void;
  onMemberClick: (member: TeamMember) => void;
}
```

**Layout:**
1. Search bar + sort controls row (same style as existing: `bg_canvas_secondary border border_primary radius_l p-3`)
   - `MagnifyingGlassIcon` left-padded input
   - Sort buttons: `Name ↕` / `Score ↕` / `AI Pulse ↕` — active sort button highlighted
2. Table container (`bg_canvas_secondary radius_xl border border_primary shadow_sm overflow-hidden`)
   - Header row: `bg_canvas_tertiary/50 border-b border_primary` — column labels (uppercase, text_tertiary, text-[10px])
   - Body: `divide-y divide_primary` → map `filteredMembers` → `<MemberTableRow />`
3. Empty state (no members match filter): `<EmptyState />` from `@/components`

## Todo

- [x] Create `AiPulseBadge.tsx` — pulse color mapping + label Vietnamese
- [x] Create `TeamStatsBar.tsx` — stat chips + filter tabs
- [x] Create `ActivityScoreCell.tsx` — score + mini bar + CSS tooltip
- [x] Create `MemberTableRow.tsx` — 6-col grid với all 4 goals visible
- [x] Create `MemberTable.tsx` — search/sort controls + table + empty state
- [x] Verify each file < 200 lines
- [x] All imports use `@/` aliases

## Success Criteria

- Table hiển thị đủ 5 mock members
- Filter tabs đổi `filteredMembers` đúng
- Hover vào score cell → tooltip hiện 4 metrics
- Attendance: online dot green, wfh dot yellow, absent dot red + reason text
- AI pulse badge đúng màu theo pulse value
