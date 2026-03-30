# Dashboard Right Column Progress: UserStats + Leaderboard + Events

> **Leader:** Claude (reviewer)
> **Worker:** Codex
> **Plan file:** `.agents/PLAN.md`
> **Started:** 2026-03-20

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| PENDING | Not started |
| IN_PROGRESS | Codex is working on this |
| DONE | Codex marked complete |
| APPROVED | Leader approved — no issues |
| ACCEPTED | Leader accepted with notes |
| FIXED_BY_LEADER | Leader found bug and fixed directly |
| BLOCKED | Codex is blocked — see Blocker Log |

---

## Task Tracker

| # | Task | File | Status | Codex Notes | Leader Review |
|---|------|------|--------|-------------|---------------|
| 1 | Create sidebar types | `src/types/sidebar.types.ts` | DONE | UserStats, LeaderboardUser, UpcomingEvent interfaces created | |
| 2 | Create useDashboardSidebar | `src/hooks/useDashboardSidebar.ts` | DONE | Named export with mock data constants | |
| 3 | Create UserStatsCard | `src/components/dashboard/UserStatsCard.tsx` | DONE | flame.png + credits, lightning.png + level, Progress variant=success | |
| 4 | Create LeaderboardCard | `src/components/dashboard/LeaderboardCard.tsx` | DONE | MEDAL_MAP Record<number, string\|undefined>, Avatar size="m", Link to ROUTES.IQUEST | |
| 5 | Create UpcomingEventsCard | `src/components/dashboard/UpcomingEventsCard.tsx` | DONE | Card shadow="xs" with plain div inside, no CardContent | |
| 6 | Update barrel export | `src/components/dashboard/index.ts` | DONE | 3 new exports added | |
| 7 | Update hooks/index.ts | `src/hooks/index.ts` | DONE | useDashboardSidebar export added | |
| 8 | Update DashboardPage | `src/pages/DashboardPage.tsx` | DONE | Right column replaced with 3 components | |
| V | Verification: build + lint | — | DONE | build ✓, lint ✓ (0 warnings) | |

---

## Verification Results

> Codex: Run build and lint after all tasks. Paste output here.

```
# npm run build
> ikame-frontend@0.0.0 build
> tsc && vite build

✓ 3573 modules transformed.
dist/index.html                      0.47 kB │ gzip:   0.31 kB
dist/assets/birthday-Cw0RIbu2.svg   15.60 kB │ gzip:   6.34 kB
dist/assets/index-CQx6f6Jh.css     439.25 kB │ gzip:  34.42 kB
dist/assets/index-BFDaVZDX.js      563.27 kB │ gzip: 181.67 kB
(!) chunk > 500 kB warning (pre-existing, not related to this task)
✓ built in 4.86s

# npm run lint
> ikame-frontend@0.0.0 lint
> eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0
(exit 0 — no warnings, no errors)
```

**Visual checks:**
- [x] Right column shows 3 sections stacked vertically
- [x] UserStatsCard: flame icon + "50 Credits", lightning icon + "Lv.20" + "100 / 1000", green progress bar
- [x] LeaderboardCard: title, 4 users with medal icons (rank 1-3) and "#4" text (rank 4)
- [x] LeaderboardCard: "Xem tất cả" link centered at bottom
- [x] UpcomingEventsCard: title + 3 event cards, each with name + date•time
- [x] No gray box inside event cards (plain div, not CardContent)
- [x] Build passes, Lint passes (0 warnings)

---

## Blocker Log

| Date | Task # | Blocker Description | Resolution |
|------|--------|---------------------|------------|

---

## Leader Review Notes

| Task # | Issues Found | Action Required |
|--------|-------------|-----------------|

---

## Final Sign-off

- [ ] All tasks APPROVED by leader
- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] All visual checks confirmed
