---
project: my-ikame-web-dev
user: Tom
generated: 2026-03-30
language: Vietnamese
status: complete
mode: frontend-only-mock-prototype
sections_completed:
  - technology-stack
  - language-rules
  - framework-rules
  - testing-rules
  - code-quality-rules
  - workflow-rules
  - critical-dont-miss-rules
---

# Project Context — My iKame

> File này dành cho AI agents. Chứa các rules quan trọng, patterns, và conventions cần tuân thủ khi implement code trong project này.

---

## Technology Stack

| Category | Technology | Version |
|---|---|---|
| Framework | Vite + React | 5.0 + 18.2 |
| Language | TypeScript | 5.2 (strict) |
| UI Kit | @frontend-team/ui-kit | 1.1.1 (vendored local package) |
| Rich Text | @frontend-team/tiptap-kit + TipTap | 0.2.7 + 3.x |
| State (server) | RTK Query / @reduxjs/toolkit | 2.0.1 |
| State (global) | Redux Toolkit + React Redux | 2.0.1 + 9.0.4 |
| Routing | React Router DOM | 6.20 |
| Auth | keycloak-js | 24.0.2 |
| Styling | Tailwind CSS | 4.x |
| Forms | React Hook Form + Zod | 7.48 + 3.22 |
| Icons | @phosphor-icons/react | 2.1.10 |
| Animations | lottie-react | 2.4.1 |
| Primitives | @radix-ui/react-dropdown-menu, popover | 2.x |
| Hotkeys | react-hotkeys-hook | 5.2.4 |

### Version Constraints

- `@frontend-team/ui-kit` và `@frontend-team/tiptap-kit` là **private packages vendored tại `vendors/`** — không install từ npm registry
- Tailwind CSS 4.x dùng plugin `@tailwindcss/vite`, **không dùng `tailwind.config.js`** theo cách cũ
- TypeScript `moduleResolution: "bundler"` — yêu cầu Vite bundler, không dùng Node resolution

---

## Language-Specific Rules (TypeScript)

### TypeScript Configuration
- Strict mode đầy đủ: `strict: true`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- `moduleResolution: "bundler"` — Vite only, không phải Node
- `isolatedModules: true` — không dùng `const enum`
- `noEmit: true` — TypeScript chỉ type-check, Vite build thực tế

### Type Definitions
- Dùng `interface` cho object shapes, `type` cho union/intersection
- **Không dùng `any`** — dùng `unknown` rồi narrow, hoặc định nghĩa interface
- Luôn dùng `import type` cho type-only imports
- Dùng `as const` cho literal arrays và readonly configs
- Luôn định nghĩa return type cho public functions

### Import/Export Conventions
- **Path aliases bắt buộc** khi có thể — không dùng relative `../../../`
  - `@/components/*`, `@/services/*`, `@/hooks/*`, `@/types/*`, v.v.
  - Relative import (`./`) chỉ dùng trong cùng folder
- Import order:
  1. React core (`react`, `react-dom`)
  2. Third-party packages
  3. Internal `@/` (services → hooks → types → components → state → lib/utils)
  4. Relative cùng cấp (`./`)
  5. `import type` ở cuối

### Error Handling
- RTK Query mutations: dùng `.unwrap()` với `try/catch`
- Queries: handle `isLoading`, `isError`, `data` trong component/hook
- Không suppress TypeScript errors bằng `// @ts-ignore` hoặc `// @ts-expect-error`

---

## Framework-Specific Rules (React)

### Component Structure
- **Props interface** luôn định nghĩa tách biệt, đặt trên component
- Thứ tự trong component: hooks → derived state (`useMemo`) → event handlers (`useCallback`) → effects (`useEffect`) → early returns → JSX
- **Không logic business trong component** — extract sang hook trong `hooks/` cùng feature

### Hooks Usage
- `useState` — state chỉ dùng trong 1 component
- React Context (`src/state/contexts/`) — state chia sẻ trong 1 feature (≥3 levels deep)
- Redux slice (`src/state/slices/`) — state chia sẻ nhiều feature/page
- RTK Query (`src/services/`) — mọi server/API data
- Hook mà không trigger re-render → `useRef`, không phải `useState`

### RTK Query Patterns
- Tất cả API services dùng `api.injectEndpoints()` từ `src/services/api.ts`
- Base API có sẵn tagTypes: `['UserProfile', 'Quest', 'Post', 'Event', 'Leaderboard', 'Reward', 'Social', 'Comment']`
- `transformResponse` bóc `res.data` ra khỏi `ApiResponse<T>` wrapper
- Token Keycloak tự inject qua `customFetchBase` — không thêm Authorization header thủ công
- Service file export hooks trực tiếp: `export const { useGetXxxQuery, useCreateXxxMutation } = xxxApi`

### Auth (Keycloak)
- Auth state lấy từ `useAuthState()` hook — không access keycloak trực tiếp trong component
- `UserService` từ `@/lib/keycloak-config` cho các thao tác programmatic
- Route protected qua `<ProtectedRoute>` — không check auth manually trong page
- Routes `/icheck`, `/igoal`, `/iwiki` là iframe — không render React content

### Routing
- React Router DOM 6: `useNavigate`, `useParams`, `Link`
- Routes định nghĩa tập trung tại `src/constants/index.ts` (ROUTES)
- Không hardcode path strings trong component — luôn dùng `ROUTES.xxx`

### File Size Rule
- **Tuyệt đối không vượt 200 lines** mỗi file — split thành components/hooks nhỏ hơn
- Page component chỉ render + gọi hooks, không chứa logic

---

## Testing Rules

### Current State
- **Chưa có test framework** trong project (không có vitest/jest trong dependencies)
- Khi thêm tests: dùng **Vitest** (tích hợp tốt với Vite) + React Testing Library

### Test File Conventions (khi implement)
- Test files đặt cạnh source: `ComponentName.test.tsx`, `useHookName.test.ts`
- Naming: `describe('ComponentName')` → `it('should do X when Y')`

### Mock Strategy
- RTK Query: dùng `msw` (Mock Service Worker) — không mock fetch trực tiếp
- `social.service.ts` và `post.service.ts` dùng mock data — đây là intentional trong bản prototype này
- Keycloak: mock `@/lib/keycloak-config` module

### What to Test
- Hooks: logic + state transitions (không test implementation details)
- Components: user interactions, render states (loading/error/data)
- Services: integration test với MSW mock server — không unit test
- **Không test** TypeScript types, styling, hay implementation internals

---

## Code Quality & Style Rules

### Naming Conventions
| Loại | Convention | Ví dụ |
|---|---|---|
| Component / Page | PascalCase | `ProfileHeader.tsx`, `Dashboard.tsx` |
| Hook | `use` + camelCase | `useProfile.ts`, `useAuthState.ts` |
| Service | `[domain].service.ts` | `quest.service.ts` |
| Types file | `[domain].types.ts` | `userProfile.types.ts` |
| Redux Slice | `[domain]Slice.ts` | `authSlice.ts` |
| Constants | `UPPER_SNAKE_CASE` | `ROUTES`, `STORAGE_KEYS` |
| Utilities | camelCase | `getInitials.ts`, `getTimeAgo.ts` |

### File Organization
- **200 lines max** — nguyên tắc cứng, không ngoại lệ
- Feature structure bắt buộc:
  ```
  pages/FeatureName/
  ├── FeatureName.tsx       # chỉ render + gọi hooks
  ├── components/           # sub-components + index.ts barrel
  ├── hooks/                # hooks + index.ts barrel
  ├── types.ts
  └── index.ts
  ```
- Barrel exports (`index.ts`) cho mỗi folder components/ và hooks/

### ESLint (max-warnings: 0)
- `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `@typescript-eslint` đều bật
- Build fail nếu có warning: `tsc && vite build`
- Chạy lint trước khi commit: `npm run lint`

### Styling
- Tailwind CSS 4.x cho layout/spacing
- Design token classes cho màu: `bg_primary`, `text_secondary` — không dùng `bg-blue-500`
- Tối đa 5-6 Tailwind classes mỗi element
- Icons: `weight` prop (`"thin"|"light"|"regular"|"bold"|"fill"|"duotone"`) — không dùng `strokeWidth`

### Comments
- Chỉ comment khi logic không self-evident
- Không JSDoc cho simple functions
- Dùng `// ⚠️` để đánh dấu known issues hoặc mock data còn tồn tại

---

## Development Workflow Rules

### Git & Commits
- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`
- Không commit: `.env`, API keys, credentials, mock data files
- Chạy `npm run lint` trước khi commit
- Không dùng `--no-verify` để bypass hooks

### Build & Deploy
- Build command: `tsc && vite build` — TypeScript check trước, Vite build sau
- Build fail = TypeScript error HOẶC ESLint warning → phải fix, không workaround
- Preview local: `npm run preview`
- Deploy: Vercel (xem `docs/deployment-guide.md`)

### Environment
- Private packages vendored tại `vendors/` — không install từ npm registry
- Dùng `.npmrc` để configure vendor package resolution
- Keycloak config lấy từ environment variables — không hardcode realm/client ID

### API Versioning
- Tất cả endpoints dùng prefix `/v3/` (ví dụ: `/v3/iquest/quests`)
- Base URL từ environment variable — không hardcode

---

## ⚠️ CRITICAL: Frontend-Only / Mock-Data Mode

> **Bản source code này KHÔNG tích hợp backend hay real API.**
> Mục tiêu: build frontend và demo luồng tính năng. Toàn bộ data dùng mock.

### Quy tắc bắt buộc
- **Không implement real API calls** — tất cả services dùng mock data
- Dùng `src/lib/mock-fetch-base.ts` làm base query thay vì `customFetchBase.ts`
- Mock data files đặt tại `src/lib/mock-*.ts`
- Khi cần data mới: tạo mock data file tương ứng, không gọi backend thật

### Mock Data Strategy
- Mỗi service domain có mock data riêng (`mock-social.ts`, `mock-posts.ts`, v.v.)
- Mock data phải **realistic** — reflect đúng schema types đã định nghĩa trong `src/types/`
- Simulate loading states bằng `setTimeout` delay nếu cần demo UX flow
- Simulate error states cho error handling demo nếu cần

### Không cần quan tâm
- Real authentication flow (Keycloak có thể mock/bypass)
- API error handling thực tế từ server
- Token refresh logic
- CORS, network errors từ server thật

---

## Critical Don't-Miss Rules

### Absolute Forbidden Patterns
| ❌ Không bao giờ làm | ✅ Thay bằng |
|---|---|
| `import { X } from 'antd'` | `import { X } from '@frontend-team/ui-kit'` |
| `import { X } from 'lucide-react'` | `import { X } from '@phosphor-icons/react'` |
| `fetch('/api/...')` hoặc `axios.get(...)` trực tiếp | RTK Query service với mock base |
| `import X from '../../components/X'` | `import X from '@/components/X'` |
| `type Props = { data: any }` | Định nghĩa interface cụ thể |
| Prop drilling > 2 levels | Context hoặc Redux slice |
| `className="bg-blue-500 text-gray-700"` | Design token classes |
| Business logic trong `.tsx` component | Extract sang hook |
| File > 200 lines | Split thành modules |
| `// @ts-ignore` hoặc `// @ts-expect-error` | Fix type error đúng cách |
| Gọi real backend API | Dùng mock data — đây là frontend-only prototype |

### Known Mock Files (sử dụng và mở rộng tại đây)
- `src/lib/mock-fetch-base.ts` — base query cho tất cả services
- `src/lib/mock-*.ts` — mock data theo domain
- `src/services/social.service.ts` — birthday/anniversary mock
- `src/services/post.service.ts` — posts mock

### Security Rules (vẫn áp dụng dù là mock)
- Không log sensitive data ra console
- Sanitize user input trước khi render HTML (TipTap editor output)
- Không expose biến môi trường nhạy cảm trong bundle

### Performance Gotchas
- `useMemo`/`useCallback` chỉ dùng khi thực sự cần — không overuse
- RTK Query cache tự động — không fetch lại thủ công nếu không cần
- Lottie animations nặng — lazy load nếu không visible on mount
- Không tạo object/array inline trong JSX props (gây re-render)

---

## Usage Guidelines

**Cho AI Agents:**
- Đọc file này TRƯỚC KHI implement bất kỳ code nào
- Tuân thủ TẤT CẢ rules — đặc biệt section **⚠️ CRITICAL: Frontend-Only / Mock-Data Mode**
- Khi nghi ngờ → chọn option restrictive hơn
- Cập nhật file này khi có patterns mới được thiết lập

**Cho Humans:**
- Giữ file này lean — chỉ capture unobvious rules
- Cập nhật khi tech stack thay đổi
- Review định kỳ để remove rules đã lỗi thời

_Last Updated: 2026-03-30_
