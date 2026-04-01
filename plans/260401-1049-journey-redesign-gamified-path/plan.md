---
title: "Journey Page — Gamified RPG Path Redesign"
description: "Redesign trang /journey từ boring milestone cards sang trải nghiệm gamified RPG path: hero header, node path map, animations, celebrate khi claim quest."
status: pending
priority: P0
effort: 4h
issue:
branch: main
tags: [frontend, ui-ux, gamification, journey, animation]
created: 2026-04-01
blockedBy: []
blocks: []
---

# Journey Page — Gamified RPG Path Redesign

## Overview

Trang /journey hiện tại: boring vertical card timeline + 2-column layout với sidebar.
Mục tiêu: full redesign thành gamified RPG-style path experience.

**4 vấn đề cần giải quyết:**
1. Visual nhàm chán → gamified path với màu sắc sống động
2. UX flow chưa rõ → active milestone nổi bật, clear CTA, next step obvious
3. Thiếu game feel → animation unlock, EXP burst, celebrate khi claim
4. Layout cần làm lại → bỏ sidebar, full-width centered path

**Design direction:** Gamified RPG path — node/checkpoint map dọc, milestone cards mở rộng khi active, animation effects khi unlock/claim.

## Phases

| # | Phase | Status | Effort | Link |
|---|-------|--------|--------|------|
| 1 | Hero Header & Layout Shell | Pending | 45m | [phase-01](./phase-01-hero-header-layout.md) |
| 2 | Node Path Map | Pending | 1h | [phase-02-node-path-map.md](./phase-02-node-path-map.md) |
| 3 | Enhanced Milestone Cards | Pending | 1h | [phase-03-milestone-cards.md](./phase-03-milestone-cards.md) |
| 4 | Animations & Celebrations | Pending | 45m | [phase-04-animations.md](./phase-04-animations.md) |

## Dependency

```
Phase 1 → Phase 2 → Phase 3 → Phase 4
```

## Files to CREATE

```
src/pages/Onboarding/components/JourneyHeroHeader.tsx
src/pages/Onboarding/components/JourneyNodePath.tsx
src/pages/Onboarding/components/JourneyMilestoneNode.tsx
src/pages/Onboarding/components/JourneyQuestRow.tsx
src/pages/Onboarding/components/JourneyClaimBurst.tsx
```

## Files to MODIFY

```
src/pages/Onboarding/OnboardingJourney.tsx     — remove sidebar, full-width layout
src/pages/Onboarding/components/OnboardingProgressHeader.tsx  — replace với JourneyHeroHeader
src/pages/Onboarding/components/MilestoneTimeline.tsx         — replace với JourneyNodePath
src/pages/Onboarding/components/MilestoneCard.tsx             — replace với JourneyMilestoneNode
src/pages/Onboarding/components/QuestCheckItem.tsx            — replace với JourneyQuestRow
```

## Key Constraints

- No file > 200 lines — split nếu cần
- No `any` type
- `@/` aliases, import from `@frontend-team/ui-kit` only
- `@phosphor-icons/react` cho icons
- Animations: CSS transitions + Tailwind animate (không dùng Framer Motion nếu chưa có trong project)
- Business logic stays in `useOnboardingJourney` hook — components chỉ render

## Visual Reference

```
┌─────────────────────────────────────────────────────┐
│  🗺️  HÀNH TRÌNH ONBOARDING                           │  ← gradient hero
│  ████████████████░░░░  75% · 450/600 EXP             │
│  4/6 nhiệm vụ hoàn thành                            │
└─────────────────────────────────────────────────────┘

         ● MILESTONE 1 ✓                              ← done node (filled, accent color)
         │ Khởi đầu — 3/3 quests
         │
         ● MILESTONE 2 ⚡  ← ACTIVE (pulsing glow)
         │ Hòa nhập — 1/3 quests
         │   ✓ Cập nhật hồ sơ          [claimed]
         │   ○ Viết bài Newsfeed  →    [+200 EXP]  ← CTA button
         │   ○ Check-in 5 ngày         [in progress 3/5]
         │
         ◯ MILESTONE 3 🔒              ← locked (grey, translucent)
         │ Đóng góp
         │
         ◯ MILESTONE 4 🔒
           Thành viên
```
