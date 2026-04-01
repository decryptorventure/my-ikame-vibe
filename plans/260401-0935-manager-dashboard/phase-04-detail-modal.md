---
phase: 4
title: "Detail Modal"
status: completed
effort: 1h
---

# Phase 04 — Detail Modal

## Overview

Tạo MemberDetailModal và các sub-components: ActivityBreakdownGrid, RecentReportsFeed. Click row trong table → modal hiển thị full info.

## Context Links

- Types: `src/pages/Dashboard/types/managerDashboard.types.ts` (Phase 01)
- AiPulseBadge: `src/pages/Dashboard/components/Manager/AiPulseBadge.tsx` (Phase 03)
- Plan: `plans/260401-0935-manager-dashboard/plan.md`

## Related Code Files

**Create:**
- `src/pages/Dashboard/components/Manager/MemberDetailModal/ActivityBreakdownGrid.tsx`
- `src/pages/Dashboard/components/Manager/MemberDetailModal/RecentReportsFeed.tsx`
- `src/pages/Dashboard/components/Manager/MemberDetailModal/MemberDetailModal.tsx`

## Implementation Steps

### Step 1 — `ActivityBreakdownGrid.tsx`

```typescript
interface ActivityBreakdownGridProps {
  activityScore: ActivityScoreInfo;
}
```

**Layout — 2×2 grid:**

```
┌──────────────────────┬──────────────────────┐
│  ✅ iCheck           │  📣 Newsfeed          │
│  {checkIn}%          │  {newsfeed}%          │
│  ████████░░          │  ██████░░░░           │
├──────────────────────┼──────────────────────┤
│  📚 iWiki            │  🎯 iGoal             │
│  {wiki}%             │  {iGoal}%             │
│  ██████░░░░          │  ████████░░           │
└──────────────────────┴──────────────────────┘
```

Each cell (`Card` with `p-4 bg_canvas_secondary`):
- Icon (Phosphor, size=20) + label (text-[10px] uppercase text_tertiary)
- Score value (text-2xl font-bold, color-coded: ≥80 emerald, ≥60 amber, <60 red)
- Progress bar (`Progress` from UI kit OR `div` h-1 with colored fill)

---

### Step 2 — `RecentReportsFeed.tsx`

```typescript
interface RecentReportsFeedProps {
  reports: RecentReport[];
}
```

**Layout:**
- Section header: `FileTextIcon` + "Báo cáo iGoal gần đây" (text-sm font-semibold)
- List of reports (max-height + ScrollArea if > 5):
  - Icon by type (same mapping as MemberTableRow)
  - Title (text-sm font-medium text_primary, line-clamp-1)
  - Relative time (compute from `submittedAt` ISO → "2 giờ trước", "Hôm qua", "3 ngày trước")
  - "MỚI" badge if submitted within last 24h (`bg-emerald-500/10 text-emerald-600`)
- Empty state: `CalendarXIcon` + "Chưa có báo cáo tuần này"

**Time formatting helper** (inline, not a separate file — YAGNI):
```typescript
function formatRelativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return 'Vừa xong';
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Hôm qua';
  return `${days} ngày trước`;
}
```

---

### Step 3 — `MemberDetailModal.tsx`

```typescript
interface MemberDetailModalProps {
  open: boolean;
  member: TeamMember | null;
  onClose: () => void;
}
```

Use `Modal` from `@frontend-team/ui-kit`. If Modal is not available/suitable, use `Dialog` pattern with fixed overlay.

**Layout:**

```
┌─ Modal (max-w-3xl) ──────────────────────────────────────┐
│ HEADER                                                    │
│  [Avatar lg]  {name}              [Status badge]         │
│               {role} · Lv.{n}     [AiPulseBadge md]      │
│               {checkInTime OR reasonLabel}               │
│                                                          │
│  Activity Score: {total}%  ███████░░░  (large bar)       │
├──────────────────────────┬───────────────────────────────┤
│ LEFT — ActivityBreakdown │ RIGHT — RecentReportsFeed     │
│  (ActivityBreakdownGrid) │   (RecentReportsFeed)         │
│                          │                               │
│                          │ AI Insight                    │
│                          │  [AiPulseBadge md]            │
│                          │  "{summary}" (italic)         │
│                          │  {detailedAnalysis} (sm text) │
└──────────────────────────┴───────────────────────────────┘
│  [Đóng] button (right-aligned)                           │
└──────────────────────────────────────────────────────────┘
```

**Status badge** (header, separate từ AiPulseBadge):
- `online` / `wfh` → `bg-emerald-500/10 text-emerald-600` + dot
- absent → `bg-red-500/10 text-red-600` + reasonLabel

**Attendance display:**
- Online: `ClockIcon` + checkInTime
- WFH: `HouseIcon` + "WFH"
- Absent: `CalendarXIcon` + reasonLabel

**Guard:** `if (!member) return null` — prevent render when no member selected.

**File size check:** MemberDetailModal.tsx likely approaches 150-180 lines. If > 200, extract header section to `MemberModalHeader.tsx`.

## Todo

- [x] Create `ActivityBreakdownGrid.tsx` — 2×2 grid với color-coded scores
- [x] Create `RecentReportsFeed.tsx` — report list + relative time + "MỚI" badge
- [x] Create `MemberDetailModal.tsx` — modal shell với header + 2-column body
- [x] Guard `if (!member) return null`
- [x] Relative time function in RecentReportsFeed
- [x] Verify each file < 200 lines (split nếu cần)

## Success Criteria

- Click table row → modal opens với đúng member data
- ActivityBreakdownGrid hiện 4 metrics đúng màu
- RecentReportsFeed hiện reports với relative time đúng
- "MỚI" badge xuất hiện cho report trong 24h
- AI Insight section hiện pulse + summary + analysis
- Modal đóng khi click Đóng hoặc overlay
