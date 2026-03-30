# Tóm tắt Codebase — My iKame

## 1. Pages (Trang)

| Page | Đường dẫn | Mô tả | Trạng thái |
|---|---|---|---|
| Dashboard | `src/pages/Dashboard/` | Trang chủ: quests, leaderboard, events sidebar | ✅ Real API |
| IQuest | `src/pages/IQuest/` | Hệ thống nhiệm vụ gamification | ✅ Real API |
| Events | `src/pages/Events/` | Danh sách + chi tiết sự kiện công ty | ✅ Real API |
| IReward | `src/pages/IReward/` | Cửa hàng đổi iKame Coin | ✅ Real API |
| Profile | `src/pages/Profile/` | Hồ sơ cá nhân, stats, achievements | ✅ Real API |
| ICheck | `src/pages/ICheck/` | Chấm công (iframe → iCheck) | 🔗 Iframe |
| IGoal | `src/pages/IGoal/` | Mục tiêu OKRs (iframe → iGoal) | 🔗 Iframe |
| IWiki | `src/pages/IWiki/` | Wiki nội bộ (iframe → iWiki) | 🔗 Iframe |
| Onboarding | `src/pages/Onboarding/` | Màn hình chào mừng nhân sự mới | ✅ Real API |
| UserDetail | `src/pages/UserDetail/` | Xem hồ sơ người dùng khác | ✅ Real API |
| NotFound | `src/pages/NotFound/` | Trang 404 | - |

### Chi tiết cấu trúc mỗi page

```
pages/[FeatureName]/
├── [FeatureName].tsx     # Main component (< 200 lines)
├── components/           # Sub-components
│   └── index.ts
├── hooks/                # Feature hooks
│   ├── use[Feature].ts
│   └── index.ts
├── types.ts              # Feature-specific types
└── index.ts              # Barrel export
```

---

## 2. Services (API)

| Service | File | Endpoints | Trạng thái |
|---|---|---|---|
| Base API | `src/services/api.ts` | Base createApi | ✅ |
| UserProfile | `src/services/userProfile.service.ts` | Profile, leaderboard, proposal | ✅ Real |
| Quest | `src/services/quest.service.ts` | Quests, progress, levels, claim, onboarding | ✅ Real |
| Event | `src/services/event.service.ts` | Events list, detail | ✅ Real |
| Reward | `src/services/reward.service.ts` | Rewards list, redeem | ✅ Real |
| Social | `src/services/social.service.ts` | Birthday/anniversary, send wish | ⚠️ Mock data |
| Post | `src/services/post.service.ts` | Newsfeed posts, likes, comments | ⚠️ Cần kiểm tra |

### Quest Service Endpoints

```typescript
GET  /v3/iquest/quests                    → QuestResponse[]
GET  /v3/iquest/quests/me/progress        → QuestProgressEntry[]
GET  /v3/iquest/quests/criteria-actions   → CriteriaAction[]
GET  /v3/iquest/level-configs             → LevelConfigResponse[]
POST /v3/iquest/quests/claim              → null (invalidates Quest, UserProfile)
POST /v3/iquest/onboarding/complete       → null (invalidates Quest, UserProfile, Leaderboard)
```

---

## 3. State Management

### Redux Store (`src/state/store/index.ts`)

```typescript
{
  auth: authReducer,          // ⚠️ Unused — auth managed by AuthContext
  demo: demoReducer,          // Demo/placeholder slice
  [api.reducerPath]: api.reducer  // RTK Query cache
}
```

### Auth Context (`src/state/contexts/auth-context.tsx`)

Provider chính để quản lý auth state. Expose:
- `isAuthenticated: boolean`
- `token: string | null`
- `user` (từ Keycloak token decode)
- `login()`, `logout()`

### Slices

| Slice | File | Trạng thái | Ghi chú |
|---|---|---|---|
| authSlice | `src/state/slices/authSlice.ts` | ⚠️ Unused | TODO: migrate to AuthContext hoặc remove |
| demoSlice | `src/state/slices/demoSlice.ts` | Demo | Placeholder |

---

## 4. Shared Components (`src/components/`)

| Component | Mô tả |
|---|---|
| `AppLayout.tsx` | Layout chính với sidebar |
| `SidebarFooter.tsx` | Footer sidebar (logout button) |
| `common/ProtectedRoute.tsx` | Route guard — redirect về Keycloak nếu chưa auth |
| `common/ErrorBoundary.tsx` | Error boundary toàn app |
| `common/Loading.tsx` | Loading spinner |
| `common/EmptyState.tsx` | Empty state placeholder |
| `common/LeaderboardCard.tsx` | Card bảng xếp hạng (dùng chung) |
| `common/UserStatsCard.tsx` | Card thống kê user (level, EXP, Coin) |
| `common/QuestCompleteButton.tsx` | Nút hoàn thành quest |

---

## 5. Global Hooks (`src/hooks/`)

| Hook | Mô tả |
|---|---|
| `useAuthActions` | Login, logout actions |
| `useAuthState` | Đọc auth state từ context |
| `useLeaderboard` | Fetch và xử lý leaderboard data |
| `useSSOCallback` | Xử lý SSO callback sau khi đăng nhập |
| `useSidebarNav` | Navigation items cho sidebar |
| `useSidebarData` | Data cho sidebar (events, user stats) |

---

## 6. Types (`src/types/`)

| File | Interfaces chính |
|---|---|
| `userProfile.types.ts` | `UserProfileResponse`, `LeaderboardEntry`, `CreateProposalPayload` |
| `quest.types.ts` | `QuestResponse`, `QuestCriteria`, `QuestProgressEntry`, `LevelConfigResponse` |
| `event.types.ts` | Event-related types |
| `reward.types.ts` | Reward, redeem types |
| `social.types.ts` | `SocialTodayItem`, `SendWishRequest/Response` |
| `post.types.ts` | Post, comment, like types |
| `shared.types.ts` | `UserStats`, `LeaderboardUser`, `UpcomingEvent` |
| `api.types.ts` | `ApiResponse<T>` wrapper |

### UserProfileResponse — key fields

```typescript
{
  id, name, email, avatar
  team_name, position_name, department_name, bu_name
  exp, level, title, seasonId
  coinBalance, coinTotalEarned, coinTotalSpent, coinSeasonEarned
  totalExpEarned
  start_date, official_date, employee_status, work_status
}
```

---

## 7. Lib (`src/lib/`)

| File | Mô tả |
|---|---|
| `keycloak-config.ts` | Keycloak instance + `UserService` (init, login, logout, getToken, refreshToken) |
| `keycloak-utils.ts` | Auth helper utilities |
| `customFetchBase.ts` | RTK Query base — attach Bearer token, auto refresh |
| `mock-fetch-base.ts` | Mock base cho development offline |
| `mock-data.ts` | Mock data chung |
| `mock-quest-data.ts` | Mock quest data |
| `mock-reward-data.ts` | Mock reward data |
| `mock-post-event-data.ts` | Mock post/event data |
| `mock-profile-level-data.ts` | Mock profile/level data |

---

## 8. Tích hợp TipTap (Rich Text Editor)

File: `src/tiptap/`

- `chat-box-editor.tsx` — Component editor chat
- `use-chat-box-editor.ts` — Hook quản lý editor state
- Extensions đang dùng: emoji, highlight, image, mention, starter-kit

---

## 9. Mock Data Status

| Module | Trạng thái |
|---|---|
| Social (birthday/anniversary, send wish) | ⚠️ Mock — chờ BE |
| Quest | ✅ Real API |
| UserProfile | ✅ Real API |
| Events | ✅ Real API |
| Reward | ✅ Real API |
| Posts/Comments | ⚠️ Cần kiểm tra |

---

## 10. Known Issues / TODOs

| Vị trí | Vấn đề |
|---|---|
| `src/state/slices/authSlice.ts` | TODO: Unused — cần migrate auth sang Redux hoặc remove file |
| `src/services/social.service.ts` | Mock data — chờ BE implement API |
| `src/lib/mock-*.ts` | Multiple mock files — cần cleanup khi BE hoàn thành |
| README.md | Đề cập Ant Design (outdated) — project đã migrate sang `@frontend-team/ui-kit` |
