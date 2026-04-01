---
phase: 1
title: "Hero Header & Layout Shell"
status: pending
effort: 45m
---

# Phase 01 — Hero Header & Layout Shell

## Overview

Thay đổi layout tổng thể: bỏ 2-column sidebar, full-width centered layout. Xây dựng `JourneyHeroHeader` thay thế `OnboardingProgressHeader` đơn giản hiện tại.

## Context Links

- Plan: `plans/260401-1049-journey-redesign-gamified-path/plan.md`
- Current page: `src/pages/Onboarding/OnboardingJourney.tsx`
- Current header: `src/pages/Onboarding/components/OnboardingProgressHeader.tsx`
- Hook: `src/pages/Onboarding/hooks/useOnboardingJourney.ts`

## Related Code Files

**Create:**
- `src/pages/Onboarding/components/JourneyHeroHeader.tsx`

**Modify:**
- `src/pages/Onboarding/OnboardingJourney.tsx`
- `src/pages/Onboarding/components/OnboardingProgressHeader.tsx` — keep file, update to just re-export JourneyHeroHeader for backward compat (or delete if no other consumers)

## Implementation Steps

### Step 1 — Update `OnboardingJourney.tsx` layout

Remove 2-column grid + sidebar entirely. Replace với centered single-column layout:

```tsx
export default function OnboardingJourney() {
  const { milestones, totalCount, claimedCount, isClaiming, handleClaim, isLoading } = useOnboardingJourney();
  const totalExp = milestones.reduce((sum, m) => sum + m.totalExp, 0);

  return (
    <div className="min-h-screen p-6 pb-20">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        {isLoading ? (
          <JourneySkeleton />
        ) : (
          <>
            <JourneyHeroHeader
              claimedCount={claimedCount}
              totalCount={totalCount}
              totalExp={totalExp}
            />
            <JourneyNodePath
              milestones={milestones}
              isClaiming={isClaiming}
              onClaim={handleClaim}
            />
          </>
        )}
      </div>
    </div>
  );
}
```

**max-w-3xl** — đủ rộng để đọc, không quá to, giữ focus.

### Step 2 — Create `JourneyHeroHeader.tsx`

Gradient banner với animated progress arc:

```tsx
interface JourneyHeroHeaderProps {
  claimedCount: number;
  totalCount: number;
  totalExp: number;
}
```

**Layout:**
```
┌──────────────────────────────────────────────────────────────┐
│  [gradient bg: indigo-600 → purple-700]                      │
│                                                              │
│   🗺️  Hành Trình Onboarding                   [75%  ring]   │
│   Chào mừng {name}!                           ████████      │
│   4/6 nhiệm vụ · 450 EXP đã tích lũy         ░░░░ 75%     │
│                                                              │
│   [Badge: "🎯 Đang hoạt động"] [Badge: "🏆 Lv.{n}"]         │
└──────────────────────────────────────────────────────────────┘
```

**Spec:**
- Background: `bg-gradient-to-r from-indigo-600 to-purple-700` với dark overlay subtle
- Progress ring: dùng SVG circle stroke (không dùng Progress component — cần custom size)
- Text: `text-white` / `text-white/80`
- Completed state (100%): đổi gradient sang `from-emerald-500 to-teal-600` + thêm 🎉 message

**SVG ring pattern:**
```tsx
const circumference = 2 * Math.PI * 36; // r=36
const offset = circumference - (percent / 100) * circumference;
// <circle stroke-dasharray={circumference} stroke-dashoffset={offset} />
```

**File size target:** < 80 lines.

## Todo

- [ ] Update `OnboardingJourney.tsx`: remove sidebar, full-width layout, import JourneyHeroHeader
- [ ] Create `JourneyHeroHeader.tsx`: gradient banner + SVG progress ring + stats
- [ ] Verify: trang không có horizontal scroll
- [ ] Verify: completed state (100%) hiển thị celebration variant

## Success Criteria

- Trang full-width centered (max-w-3xl), không còn 2-column sidebar
- Hero header gradient với SVG progress ring
- Stats: count + EXP visible
- `npx tsc --noEmit` 0 errors
