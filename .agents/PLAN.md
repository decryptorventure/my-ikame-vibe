# Dashboard Right Column: UserStats + Leaderboard + Events

> **Assigned to:** Codex
> **Reviewed by:** Leader (Claude)
> **Goal:** Build the 3 components for the right column of the dashboard: UserStatsCard, LeaderboardCard, UpcomingEventsCard.
> **Reference:** User screenshots + Figma nodes 59-1000, 74-658, 64-649.

---

## Non-Negotiable Rules

1. Execute tasks in the exact order listed (TASK 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8)
2. **MUST read `CLAUDE.md` at project root** — understand all hard rules before coding
3. **MUST read `.agents/skills/ui-kit/UI_KIT.md`** — understand available components
4. Import ALL UI components from `@frontend-team/ui-kit` only — never sub-paths
5. Use `@/...` path aliases — no relative imports crossing directories
6. No file may exceed 200 lines
7. No business logic in components — extract to hooks
8. Use design token classes — never raw Tailwind colors
9. Follow import order: React → Third-party → Internal `@/` → Relative → `import type`
10. No `any` types

---

## Architecture Context

```
New files:

src/types/sidebar.types.ts                          → LeaderboardUser, UpcomingEvent, UserStats
src/hooks/useDashboardSidebar.ts                    → Mock data hook for right column
src/components/dashboard/UserStatsCard.tsx          → Credits + Level + XP progress
src/components/dashboard/LeaderboardCard.tsx        → Weekly leaderboard with medals
src/components/dashboard/UpcomingEventsCard.tsx     → Upcoming events list

Modified files:

src/components/dashboard/index.ts                  → Add 3 new exports
src/hooks/index.ts                                  → Add useDashboardSidebar export
src/pages/DashboardPage.tsx                         → Replace <div /> with right column
```

---

## Design Spec (from screenshots)

### UserStatsCard
```
┌────────────────────────────────────┐
│  [flame.png]  50 Credits           │
│  [lightning.png]  Lv.20   100/1000 │
│  [═══════════════════════════════] │
└────────────────────────────────────┘
```
- White card, rounded, padding `p-6`
- Row 1: flame icon (`size-4`) + "50 Credits" bold large text
- Row 2: lightning icon (`size-4`) + "Lv.20" bold + "100 / 1000" secondary right-aligned
- Row 3: Progress bar full-width, `variant="success"` (green), no label

### LeaderboardCard
```
┌────────────────────────────────────┐
│  Bảng xếp hạng tuần               │
│  [medal-1] [Avatar] Name / lv.12  │
│  ─────────────────────────────     │
│  [medal-2] [Avatar] Name / lv.12  │
│  ─────────────────────────────     │
│  [medal-3] [Avatar] Name / lv.12  │
│  ─────────────────────────────     │
│  [  #4   ] [Avatar] Name / lv.12  │
│        Xem tất cả                  │
└────────────────────────────────────┘
```
- White card, rounded, padding `p-6`
- Title, then list of 4 users with `<hr>` dividers between them
- Rank 1-3: `medal-1.png`, `medal-2.png`, `medal-3.png` (`size-8`)
- Rank 4+: `#4` text (`text-sm font-semibold text_secondary`)
- Avatar: `size="m"` from ui-kit
- Name: `text-sm font-semibold text_primary` + Level: `text-xs text_secondary`
- "Xem tất cả": `Link` centered, `fg_Info` color

### UpcomingEventsCard
```
┌────────────────────────────────────┐
│  Sự kiện sắp tới                   │
│  ┌──────────────────────────────┐  │
│  │ iKame town hall              │  │
│  │ 26 Th3 • 14:00 - 16:00      │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │ iKame town hall              │  │
│  └──────────────────────────────┘  │
└────────────────────────────────────┘
```
- Outer: white card, rounded, padding `p-6`
- Title at top
- Each event in its own `<Card shadow="xs">` with `p-4` padding
- Event name: `text-sm font-semibold text_primary`
- Date + time: `text-sm text_secondary` (format: `{date} • {time}`)
- `gap-3` between event cards

---

## Tasks

---

### TASK 1 — Create sidebar types

**File:** `src/types/sidebar.types.ts`

```ts
export interface UserStats {
  credits: number;
  level: number;
  currentXP: number;
  maxXP: number;
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  level: number;
  avatarInitials: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
}
```

---

### TASK 2 — Create useDashboardSidebar hook

**File:** `src/hooks/useDashboardSidebar.ts`

```ts
import type { UserStats, LeaderboardUser, UpcomingEvent } from '@/types/sidebar.types';

const USER_STATS: UserStats = {
  credits: 50,
  level: 20,
  currentXP: 100,
  maxXP: 1000,
};

const MOCK_LEADERBOARD: LeaderboardUser[] = [
  { id: '1', rank: 1, name: 'Nguyễn Phương Anh', level: 12, avatarInitials: 'NA' },
  { id: '2', rank: 2, name: 'Nguyễn Phương Anh', level: 12, avatarInitials: 'NA' },
  { id: '3', rank: 3, name: 'Nguyễn Phương Anh', level: 12, avatarInitials: 'NA' },
  { id: '4', rank: 4, name: 'Nguyễn Phương Anh', level: 12, avatarInitials: 'NA' },
];

const MOCK_EVENTS: UpcomingEvent[] = [
  { id: '1', title: 'iKame town hall', date: '26 Th3', time: '14:00 - 16:00' },
  { id: '2', title: 'iKame town hall', date: '26 Th3', time: '14:00 - 16:00' },
  { id: '3', title: 'iKame town hall', date: '26 Th3', time: '14:00 - 16:00' },
];

export function useDashboardSidebar() {
  return {
    userStats: USER_STATS,
    leaderboard: MOCK_LEADERBOARD,
    events: MOCK_EVENTS,
  };
}
```

---

### TASK 3 — Create UserStatsCard

**File:** `src/components/dashboard/UserStatsCard.tsx`

```tsx
import { Progress } from '@frontend-team/ui-kit';
import flameImg from '@/assets/flame.png';
import lightningImg from '@/assets/lightning.png';
import type { UserStats } from '@/types/sidebar.types';

interface UserStatsCardProps {
  stats: UserStats;
}

export default function UserStatsCard({ stats }: UserStatsCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-white flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <img src={flameImg} alt="credits" className="size-4" />
        <span className="font-semibold text_primary">{stats.credits} Credits</span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={lightningImg} alt="level" className="size-4" />
            <span className="font-semibold text_primary">Lv.{stats.level}</span>
          </div>
          <span className="text-sm text_secondary">
            {stats.currentXP} / {stats.maxXP}
          </span>
        </div>
        <Progress
          value={stats.currentXP}
          max={stats.maxXP}
          variant="success"
          size="sm"
        />
      </div>
    </div>
  );
}
```

**Import order:**
```ts
import { Progress } from '@frontend-team/ui-kit';    // Third-party
import flameImg from '@/assets/flame.png';             // Internal assets
import lightningImg from '@/assets/lightning.png';     // Internal assets
import type { UserStats } from '@/types/sidebar.types'; // import type
```

---

### TASK 4 — Create LeaderboardCard

**File:** `src/components/dashboard/LeaderboardCard.tsx`

Medal lookup object maps rank → image. For rank > 3, render `#rank` text. "Xem tất cả" is centered at bottom.

```tsx
import { Link } from 'react-router-dom';
import { Avatar } from '@frontend-team/ui-kit';
import { ROUTES } from '@/constants';
import medal1 from '@/assets/medal-1.png';
import medal2 from '@/assets/medal-2.png';
import medal3 from '@/assets/medal-3.png';
import type { LeaderboardUser } from '@/types/sidebar.types';

const MEDAL_MAP: Record<number, string> = {
  1: medal1,
  2: medal2,
  3: medal3,
};

interface LeaderboardCardProps {
  users: LeaderboardUser[];
}

export default function LeaderboardCard({ users }: LeaderboardCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-white">
      <h3 className="font-semibold text_primary mb-4">Bảng xếp hạng tuần</h3>

      <div className="flex flex-col">
        {users.map((user, index) => (
          <div key={user.id}>
            {index > 0 && <hr className="border_separator my-3" />}
            <div className="flex items-center gap-3">
              {MEDAL_MAP[user.rank] ? (
                <img
                  src={MEDAL_MAP[user.rank]}
                  alt={`rank ${user.rank}`}
                  className="size-8 shrink-0"
                />
              ) : (
                <span className="text-sm font-semibold text_secondary w-8 text-center shrink-0">
                  #{user.rank}
                </span>
              )}
              <Avatar size="m" alt={user.name} fallback={user.avatarInitials} />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text_primary">{user.name}</span>
                <span className="text-xs text_secondary">lv.{user.level}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <Link
          to={ROUTES.IQUEST}
          className="text-sm fg_Info font-medium hover:underline"
        >
          Xem tất cả
        </Link>
      </div>
    </div>
  );
}
```

**Notes:**
- `MEDAL_MAP[user.rank]` uses optional chaining with truthiness check — rank 4 has no entry, renders text fallback
- `ROUTES.IQUEST` is placeholder — no leaderboard route defined yet
- Rank text `#4` uses `w-8 text-center` to match the medal icon width (visual alignment)

---

### TASK 5 — Create UpcomingEventsCard

**File:** `src/components/dashboard/UpcomingEventsCard.tsx`

```tsx
import { Card } from '@frontend-team/ui-kit';
import type { UpcomingEvent } from '@/types/sidebar.types';

interface UpcomingEventsCardProps {
  events: UpcomingEvent[];
}

export default function UpcomingEventsCard({ events }: UpcomingEventsCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-white">
      <h3 className="font-semibold text_primary mb-4">Sự kiện sắp tới</h3>

      <div className="flex flex-col gap-3">
        {events.map((event) => (
          <Card key={event.id} shadow="xs">
            <div className="p-4">
              <p className="text-sm font-semibold text_primary">{event.title}</p>
              <p className="text-sm text_secondary">
                {event.date} • {event.time}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

**Note:** `<Card shadow="xs">` wraps each event (no `CardContent` — use plain `div` to avoid gray box issue). Same pattern as QuestList item cards.

---

### TASK 6 — Update dashboard barrel export

**File:** `src/components/dashboard/index.ts`

**Current:**
```ts
export { default as WelcomeCard } from './WelcomeCard';
export { default as QuestList } from './QuestList';
export { default as PostFeed } from './PostFeed';
```

**Target:**
```ts
export { default as WelcomeCard } from './WelcomeCard';
export { default as QuestList } from './QuestList';
export { default as PostFeed } from './PostFeed';
export { default as UserStatsCard } from './UserStatsCard';
export { default as LeaderboardCard } from './LeaderboardCard';
export { default as UpcomingEventsCard } from './UpcomingEventsCard';
```

---

### TASK 7 — Update hooks/index.ts

**File:** `src/hooks/index.ts`

Add one line:
```ts
export { useDashboardSidebar } from './useDashboardSidebar';
```

---

### TASK 8 — Update DashboardPage

**File:** `src/pages/DashboardPage.tsx`

Replace the empty `<div />` placeholder with the 3 right-column components.

**Current:**
```tsx
import { useDashboard, usePostFeed } from '@/hooks';
import { WelcomeCard, QuestList, PostFeed } from '@/components/dashboard';

export default function DashboardPage() {
  const { user, quests, questProgress } = useDashboard();
  const { posts } = usePostFeed();

  return (
    <div className="p-6">
      <div className="grid grid-cols-[6fr_4fr] gap-12">
        <div className="flex flex-col gap-4">
          <WelcomeCard userName={user.name} />
          <QuestList quests={quests} progress={questProgress} />
          <PostFeed posts={posts} />
        </div>
        <div />
      </div>
    </div>
  );
}
```

**Target:**
```tsx
import { useDashboard, usePostFeed, useDashboardSidebar } from '@/hooks';
import {
  WelcomeCard,
  QuestList,
  PostFeed,
  UserStatsCard,
  LeaderboardCard,
  UpcomingEventsCard,
} from '@/components/dashboard';

export default function DashboardPage() {
  const { user, quests, questProgress } = useDashboard();
  const { posts } = usePostFeed();
  const { userStats, leaderboard, events } = useDashboardSidebar();

  return (
    <div className="p-6">
      <div className="grid grid-cols-[6fr_4fr] gap-12">
        <div className="flex flex-col gap-4">
          <WelcomeCard userName={user.name} />
          <QuestList quests={quests} progress={questProgress} />
          <PostFeed posts={posts} />
        </div>
        <div className="flex flex-col gap-4">
          <UserStatsCard stats={userStats} />
          <LeaderboardCard users={leaderboard} />
          <UpcomingEventsCard events={events} />
        </div>
      </div>
    </div>
  );
}
```

---

## Verification Checklist

```bash
npm run build
npm run lint
```

**Visual checks:**
- [ ] Right column shows 3 sections stacked vertically
- [ ] UserStatsCard: flame icon + "50 Credits", lightning icon + "Lv.20" + "100 / 1000", green progress bar
- [ ] LeaderboardCard: title, 4 users with medal icons (rank 1-3) and "#4" text (rank 4)
- [ ] LeaderboardCard: "Xem tất cả" link centered at bottom
- [ ] UpcomingEventsCard: title + 3 event cards, each with name + date•time
- [ ] No gray box inside event cards (using plain div not CardContent)
- [ ] Build passes, Lint passes (0 warnings)

---

## Common Pitfalls

1. **`MEDAL_MAP[user.rank]`** — TypeScript may complain about `Record<number, string>` index returning `string` (not `string | undefined`). Use `MEDAL_MAP[user.rank] as string | undefined` or change to `Record<number, string | undefined>` if TS strict mode complains
2. **No `CardContent` inside event cards** — use plain `<div className="p-4">` directly inside `<Card>` to avoid the gray box issue
3. **`lightning.png` not `lighning.png`** — the file was renamed; use `@/assets/lightning.png`
4. **`useDashboardSidebar` is a named export** — `export function`, not default
5. **`bg-white` is allowed** — base utility, same as `text-white`
6. **Do NOT import `CardContent`** in UpcomingEventsCard — only `Card` is needed
