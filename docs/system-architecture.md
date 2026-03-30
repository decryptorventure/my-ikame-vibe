# Kiến trúc Hệ thống — My iKame

## 1. Tech Stack

| Danh mục | Công nghệ | Phiên bản |
|---|---|---|
| Framework | Vite + React | 5.0 + 18.2 |
| Ngôn ngữ | TypeScript | 5.2 (strict) |
| UI Kit | @frontend-team/ui-kit | 1.1.1 |
| Rich Text | @frontend-team/tiptap-kit + TipTap | 0.2.7 + 3.x |
| State (server) | RTK Query (@reduxjs/toolkit) | 2.0.1 |
| State (global) | Redux Toolkit + React Redux | 2.0.1 + 9.0.4 |
| Routing | React Router DOM | 6.20 |
| Auth | keycloak-js | 24.0.2 |
| Styling | Tailwind CSS | 4.x |
| Form | React Hook Form + Zod | 7.48 + 3.22 |
| Icons | @phosphor-icons/react | 2.1.10 |
| Animations | lottie-react | 2.4.1 |
| Primitives | @radix-ui/react-dropdown-menu, popover | 2.x |
| Hotkeys | react-hotkeys-hook | 5.2.4 |

---

## 2. Kiến trúc Tổng quan

```
Browser
  └── React SPA (Vite)
        ├── ErrorBoundary (toàn app)
        ├── Redux Store (Provider)
        ├── AuthProvider (Keycloak context)
        ├── TooltipProvider (UI Kit)
        └── BrowserRouter
              ├── /onboarding     → WelcomeScreen (public, full-screen)
              └── ProtectedRoute → AppLayout (sidebar + outlet)
                    ├── /dashboard
                    ├── /iquest
                    ├── /events, /events/:id
                    ├── /ireward
                    ├── /profile
                    ├── /icheck    (iframe → iCheck)
                    ├── /igoal     (iframe → iGoal)
                    ├── /iwiki     (iframe → iWiki)
                    └── /users/:id
```

---

## 3. Cấu trúc Thư mục

```
src/
├── App.tsx                  # Root component, routing
├── main.tsx                 # Entry point, Keycloak init
├── components/
│   ├── AppLayout.tsx        # Sidebar layout wrapper
│   ├── SidebarFooter.tsx    # Sidebar footer
│   └── common/              # Shared components
│       ├── ProtectedRoute.tsx
│       ├── ErrorBoundary.tsx
│       ├── Loading.tsx
│       ├── EmptyState.tsx
│       ├── LeaderboardCard.tsx
│       ├── UserStatsCard.tsx
│       └── QuestCompleteButton.tsx
├── pages/                   # Feature-based pages
│   ├── Dashboard/
│   ├── IQuest/
│   ├── Events/
│   ├── IReward/
│   ├── Profile/
│   ├── ICheck/
│   ├── IGoal/
│   ├── IWiki/
│   ├── Onboarding/
│   ├── UserDetail/
│   └── NotFound/
├── services/                # RTK Query API services
│   ├── api.ts               # Base API (inject pattern)
│   ├── userProfile.service.ts
│   ├── quest.service.ts
│   ├── event.service.ts
│   ├── reward.service.ts
│   ├── social.service.ts    # ⚠️ Mock data
│   └── post.service.ts
├── state/
│   ├── contexts/
│   │   └── auth-context.tsx # Keycloak auth state
│   ├── slices/
│   │   ├── authSlice.ts     # ⚠️ Unused (TODO: migrate or remove)
│   │   └── demoSlice.ts
│   └── store/
│       └── index.ts
├── lib/
│   ├── keycloak-config.ts   # Keycloak instance + UserService
│   ├── keycloak-utils.ts    # Auth utilities
│   ├── customFetchBase.ts   # RTK Query base với token injection
│   ├── mock-fetch-base.ts   # Mock base cho dev
│   └── mock-*.ts            # Mock data files
├── types/                   # Domain type definitions
│   ├── api.types.ts
│   ├── userProfile.types.ts
│   ├── quest.types.ts
│   ├── event.types.ts
│   ├── reward.types.ts
│   ├── social.types.ts
│   ├── post.types.ts
│   └── shared.types.ts
├── hooks/                   # Global hooks
│   ├── useAuthActions.ts
│   ├── useAuthState.ts
│   ├── useLeaderboard.ts
│   ├── useSSOCallback.ts
│   ├── useSidebarNav.tsx
│   └── useSidebarData.ts
├── utils/                   # Helper functions
│   ├── getInitials.ts
│   ├── getLevelProgress.ts
│   └── getTimeAgo.ts
├── tiptap/                  # Rich text editor
│   ├── chat-box-editor.tsx
│   └── use-chat-box-editor.ts
└── constants/
    └── index.ts             # ROUTES, STORAGE_KEYS
```

---

## 4. Authentication Flow (Keycloak)

```
main.tsx
  └── UserService.initKeycloak(onAuthCallback)
        ├── keycloak.init({ onLoad: 'check-sso', pkceMethod: 'S256' })
        └── onAuthCallback → ReactDOM.render(<App/>)

App.tsx
  └── AuthProvider (auth-context.tsx)
        ├── isAuthenticated = keycloak.authenticated
        ├── token = keycloak.token
        └── ProtectedRoute
              ├── if !isAuthenticated → keycloak.login()
              └── if authenticated → render children
```

**Token refresh**: `keycloak.updateToken(0)` trong `customFetchBase` trước mỗi request API.

**Keycloak config**:
- URL: `https://keycloak.ikameglobal.com`
- Realm: `ikame-platform`
- Client: `ikame-sso`

---

## 5. State Management (3 lớp)

```
┌─────────────────────────────────────────┐
│  Layer 1: Server State (RTK Query)      │
│  • Tất cả dữ liệu từ API               │
│  • Caching tự động theo tags            │
│  • Inject pattern: một api base + nhiều │
│    service injectEndpoints()            │
├─────────────────────────────────────────┤
│  Layer 2: Global Client State (Redux)   │
│  • authSlice (⚠️ unused hiện tại)       │
│  • demoSlice                            │
├─────────────────────────────────────────┤
│  Layer 3: Auth Context (React Context)  │
│  • Keycloak auth state                  │
│  • isAuthenticated, token, user info    │
└─────────────────────────────────────────┘
```

**RTK Query Inject Pattern** — tất cả services dùng một `api` base:
```
api.ts (base) → api.injectEndpoints()
  ├── userProfile.service.ts
  ├── quest.service.ts
  ├── event.service.ts
  ├── reward.service.ts
  ├── social.service.ts
  └── post.service.ts
```

**Tag types**: `UserProfile`, `Quest`, `Post`, `Event`, `Leaderboard`, `Reward`, `Social`, `Comment`

---

## 6. API Architecture

### Base URL
- Dev: `VITE_API_BASE_URL` (env variable)
- Tất cả endpoints dùng prefix `/v3/`

### Endpoint patterns
```
GET  /v3/iquest/quests
GET  /v3/iquest/quests/me/progress
GET  /v3/iquest/level-configs
POST /v3/iquest/quests/claim
POST /v3/iquest/onboarding/complete
```

### customFetchBase
- Tự động attach `Authorization: Bearer {token}`
- Token refresh tự động qua Keycloak trước mỗi request
- Redirect về login nếu 401

---

## 7. Routing

| Route | Component | Auth |
|---|---|---|
| `/onboarding` | WelcomeScreen | Public |
| `/dashboard` | Dashboard | ✅ Protected |
| `/iquest` | IQuest | ✅ Protected |
| `/events` | Events | ✅ Protected |
| `/events/:id` | EventDetail | ✅ Protected |
| `/ireward` | IReward | ✅ Protected |
| `/profile` | Profile | ✅ Protected |
| `/icheck` | ICheck (iframe) | ✅ Protected |
| `/igoal` | IGoal (iframe) | ✅ Protected |
| `/iwiki` | IWiki (iframe) | ✅ Protected |
| `/users/:id` | UserDetail | ✅ Protected |

---

## 8. Path Aliases (vite.config.ts)

| Alias | Trỏ đến |
|---|---|
| `@/*` | `src/*` |
| `@/components` | `src/components` |
| `@/pages` | `src/pages` |
| `@/services` | `src/services` |
| `@/state` | `src/state` |
| `@/hooks` | `src/hooks` |
| `@/types` | `src/types` |
| `@/lib` | `src/lib` |
| `@/utils` | `src/utils` |
| `@/constants` | `src/constants` |
| `@/assets` | `src/assets` |
