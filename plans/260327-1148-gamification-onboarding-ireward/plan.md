---
title: "GĐ1 Foundation Demo — Gamification, Onboarding, iReward"
description: "Vibe coding Phase 1 demo: fix gamification mock data, build Onboarding Journey Map, update IQuest, build iReward Store"
status: pending
priority: P1
effort: 6h
issue:
branch: vibe/foundation-demo
tags: [frontend, feature, gamification]
created: 2026-03-27
---

# GĐ1 Foundation Demo — Gamification, Onboarding, iReward

## Overview

Prototype các tính năng Phase 1 (The Foundation) để demo stakeholder. Source đã có Dashboard, IQuest, Profile, Events với mock data. Cần fix mock data cho đúng gamification spec, rồi build 2 tính năng mới (Onboarding Journey Map + iReward Store) và cập nhật IQuest.

**Môi trường:** VITE_USE_MOCK=true, dev server http://localhost:5174

## Phases

| # | Phase | Status | Effort | Link |
|---|-------|--------|--------|------|
| 1 | Fix Mock Data & Types | Pending | 1h | [phase-01](./phase-01-fix-mock-data.md) |
| 2 | Onboarding Journey Map | Pending | 2h | [phase-02](./phase-02-onboarding-journey-map.md) |
| 3 | Update IQuest (completed vs claimed) | Pending | 1h | [phase-03](./phase-03-update-iquest.md) |
| 4 | iReward Store | Pending | 2h | [phase-04](./phase-04-ireward-store.md) |

## Dependency

```
Phase 1 → Phase 2
Phase 1 → Phase 3
Phase 1 → Phase 4
```

Phase 1 phải xong trước. Phase 2/3/4 có thể làm tuần tự sau Phase 1.

## Key Constraints

- Chỉ dùng `@frontend-team/ui-kit` — không dùng Ant Design/shadcn/MUI
- Max 200 lines/file — split nếu cần
- Business logic trong hooks, không trong components
- Path alias `@/` thay vì relative imports
- VITE_USE_MOCK=true — không cần API thật

## Gamification Rules (từ docs)

- **EXP** = tích lũy qua hành động, reset 1/1 hàng năm
- **Coin** = CHỈ từ level up (không từ quest), không bao giờ reset
- **Level formula:** `EXP_required(L) = 1000 × (L - 1)^1.5`
- **Quest reward:** EXP only (không có Coin trực tiếp)
- **Quest status:** `in_progress` → `completed` (xong criteria) → `claimed` (đã nhận thưởng)

## Demo Story

> Newcomer vào app → thấy hành trình onboarding rõ ràng (Journey Map) → hoàn thành quest → EXP tăng → level up → nhận Coin → vào iReward đổi quà
