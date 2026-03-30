# Phase 02 — Onboarding Journey Map

## Overview
- **Priority:** P1
- **Effort:** 2h
- **Status:** Pending
- **Depends on:** Phase 01

## Mục tiêu

Tạo full page `/onboarding` dành cho Newcomer, hiển thị hành trình hội nhập dạng timeline/stepper 4 milestones. Demo stakeholder thấy được "entry point" rõ ràng cho nhân sự mới.

## Files cần tạo/thay đổi

| File | Action | Mô tả |
|------|--------|-------|
| `src/pages/Onboarding/Onboarding.tsx` | Create | Main page component |
| `src/pages/Onboarding/types.ts` | Create | OnboardingMilestone, OnboardingQuest types |
| `src/pages/Onboarding/hooks/useOnboardingJourney.ts` | Create | Logic: map quests → milestones |
| `src/pages/Onboarding/components/MilestoneTimeline.tsx` | Create | Vertical timeline container |
| `src/pages/Onboarding/components/MilestoneCard.tsx` | Create | 1 milestone với quest list |
| `src/pages/Onboarding/components/OnboardingProgressHeader.tsx` | Create | Header với overall progress + welcome message |
| `src/pages/Onboarding/index.ts` | Create | Barrel export |
| `src/constants/index.ts` | Modify | Thêm `ONBOARDING: '/onboarding'` vào ROUTES |
| `src/App.tsx` | Modify | Thêm route `/onboarding` → `<Onboarding />` |
| `src/hooks/useSidebarNav.tsx` | Modify | Thêm sidebar item "Hành trình" → ROUTES.ONBOARDING |

## Architecture

```
Onboarding.tsx
├── OnboardingProgressHeader   ← overall progress (3/10 hoàn thành)
├── MilestoneTimeline
│   ├── MilestoneCard (Ngày 1)        ← status: done/active/locked
│   ├── MilestoneCard (Tuần đầu)
│   ├── MilestoneCard (Tháng đầu)
│   └── MilestoneCard (Hết thử việc)
└── sidebar: UserStatsCard + LeaderboardCard (dùng useSidebarData)
```

## Types (`types.ts`)

```typescript
export type MilestoneStatus = 'done' | 'active' | 'locked';

export interface OnboardingQuestItem {
  id: string;
  title: string;
  expReward: number;
  status: 'in_progress' | 'completed' | 'claimed';
  current: number;
  total: number;
  action: string;
}

export interface OnboardingMilestone {
  id: string;
  label: string;      // "Ngày 1", "Tuần đầu"...
  description: string;
  status: MilestoneStatus;
  quests: OnboardingQuestItem[];
  totalExp: number;   // tổng EXP của milestone
  completedCount: number;
  totalCount: number;
}
```

## Hook `useOnboardingJourney.ts`

**Logic:**
1. Fetch quests (useGetQuestsQuery) + progress (useGetMyQuestProgressQuery)
2. Filter quests có `type === 'onboarding'`
3. Map theo `sortOrder` vào 4 milestones cố định
4. Milestone status: `done` nếu tất cả quests `claimed`, `active` nếu có quest đang làm, `locked` nếu milestone trước chưa done

**Milestone mapping (dựa sortOrder):**
- sortOrder 1: "Ngày đầu tiên" (Ngày 1)
- sortOrder 2-3: "Tuần đầu"
- sortOrder 4-5: "Tháng đầu"
- sortOrder 6+: "Hết thử việc"

## Component Design

### `OnboardingProgressHeader`
- Greeting: "Chào mừng {name} đến với iKame! 👋"
- Progress ring lớn: X/Y nhiệm vụ hoàn thành
- Subtitle: "Hoàn thành hành trình để nhận {totalExp} EXP"

### `MilestoneCard`
- Header: icon số thứ tự + label + status badge (Hoàn thành / Đang làm / Chưa tới)
- Progress: `2/3 nhiệm vụ`
- Quest list: checkbox style, mỗi quest hiện exp reward
- Nếu `status === 'locked'`: hiện blur overlay + "Hoàn thành milestone trước"
- Nếu quest `completed` (chưa claim): nút "Nhận {exp} EXP" → gọi handleClaim

### `MilestoneTimeline`
- Vertical line nối các MilestoneCard
- Connector color: green (done) → blue (active) → gray (locked)

## Routing Changes

**`src/constants/index.ts`:**
```typescript
ONBOARDING: '/onboarding',
```

**`src/App.tsx`:** thêm import + route:
```tsx
import Onboarding from '@/pages/Onboarding';
// ...
<Route path={ROUTES.ONBOARDING} element={<Onboarding />} />
```

**`src/hooks/useSidebarNav.tsx`:** thêm sidebar item vào group `main`:
```tsx
{ id: 'onboarding', label: 'Hành trình', icon: <...>, href: ROUTES.ONBOARDING }
```
> Cần thêm icon asset nếu có, hoặc dùng emoji/placeholder tạm.

## Modularization Notes

- `Onboarding.tsx` < 100 lines: chỉ compose layout
- `useOnboardingJourney.ts` < 80 lines: chỉ data transform
- `MilestoneCard.tsx` < 100 lines: nếu quest list dài, tách `QuestCheckItem.tsx`
- `MilestoneTimeline.tsx` < 60 lines: chỉ layout wrapper

## Todo

- [ ] Tạo `src/types/reward.types.ts` → `src/pages/Onboarding/types.ts`
- [ ] Tạo `useOnboardingJourney.ts` hook
- [ ] Tạo `OnboardingProgressHeader.tsx`
- [ ] Tạo `MilestoneCard.tsx` (+ `QuestCheckItem.tsx` nếu cần)
- [ ] Tạo `MilestoneTimeline.tsx`
- [ ] Tạo `Onboarding.tsx` (compose layout + sidebar)
- [ ] Tạo `index.ts` barrel
- [ ] Update `ROUTES` constant
- [ ] Update `App.tsx` routing
- [ ] Update `useSidebarNav.tsx`

## Success Criteria

- `/onboarding` hiển thị 4 milestones theo thứ tự
- Milestone "Ngày đầu tiên" ở trạng thái `active` (có quest đang làm)
- Quest đã `claimed` hiện checkmark ✓ + tên mờ
- Quest `completed` (chưa claim) hiện nút "Nhận EXP"
- Quest `in_progress` hiện progress bar con
- Milestone `locked` hiện blur/disabled state
- Sidebar có item "Hành trình" navigate đến `/onboarding`
