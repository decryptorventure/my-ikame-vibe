# Claude Code Instructions

> This file is read automatically by Claude Code. Keep it concise — full rules are in `.cursorrules`.

## Project
Vite + React 18 + TypeScript, internal UI kit (`@frontend-team/ui-kit`), RTK Query, Keycloak SSO.

## Hard Rules (enforce always)

- **No file > 200 lines** — split into smaller modules
- **No business logic in components** — extract to hooks under `hooks/`
- **No prop drilling beyond 2 levels** — use Context (`src/state/contexts/`) or Redux slice (`src/state/slices/`)
- **No raw Tailwind colors** — use design token classes (`bg_primary`, `text_secondary`, etc.)
- **No fetch/axios** — all API calls via RTK Query service files in `src/services/`
- **No Ant Design / shadcn / MUI** — import only from `@frontend-team/ui-kit`
- **No relative imports** when a path alias is available — use `@/...`
- **No `any` type** — use proper interfaces or `unknown`

## State Decision Guide

| Situation | Solution |
|---|---|
| State used in 1 component | `useState` |
| State shared within a feature/page (3+ levels deep) | React Context in `src/state/contexts/` |
| State shared across multiple features/pages | Redux slice in `src/state/slices/` |
| Server/API data | RTK Query (`src/services/`) |

## Path Aliases
`@/*` → `src/*` (also `@/components`, `@/hooks`, `@/services`, `@/state`, `@/types`, `@/lib`, `@/utils`, `@/constants`, `@/assets`, `@/pages`)

## UI Kit
Before writing any UI code, read `.agents/skills/ui-kit/UI_KIT.md` for available components and APIs.
Always import from `@frontend-team/ui-kit` (never sub-paths).

## Import Order
1. React core
2. Third-party packages
3. Internal `@/...` (services → hooks → types → components → state → lib/utils)
4. Relative (same-level only)
5. `import type` for type-only imports

## Naming Conventions
- Components / Pages: `PascalCase.tsx`
- Hooks: `useCamelCase.ts`
- Services: `domain.service.ts`
- Types files: `domain.types.ts`
- Slices: `domainSlice.ts`
- Constants: `UPPER_SNAKE_CASE.ts`

## When Writing Code — Checklist
1. File > 200 lines? → split
2. Logic in component? → move to hook
3. Props passing 3+ levels? → use Context or Redux slice
4. Using colors directly? → use design tokens
5. Making an API call? → use RTK Query
6. Relative import? → switch to `@/` alias
