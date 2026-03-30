# Project Memory — ikame-frontend

## Stack
- Vite + React 18 + TypeScript (strict)
- UI: `@frontend-team/ui-kit` (NOT antd, NOT shadcn, NOT MUI)
- State: RTK Query + Redux Toolkit
- Auth: Keycloak SSO (`src/lib/keycloak-config.ts`)
- Styling: Tailwind CSS v4 (`tailwindcss@^4` + `@tailwindcss/vite`) + ui-kit design tokens
- Icons: `lucide-react`
- Forms: React Hook Form + Zod

## Tailwind v4 Setup (completed 2026-02-21)
- Uses `@tailwindcss/vite` plugin — NO `postcss.config.js`, NO `tailwind.config.js`
- Both `tailwindcss@^4` AND `@tailwindcss/vite` must be installed (they are separate packages)
- `src/index.css` uses `@import "tailwindcss"` (not `@tailwind base/components/utilities`)
- ui-kit CSS imported directly: `import '@frontend-team/ui-kit/style.css'` in `main.tsx`
- No `?raw` workaround needed anymore (v3/v4 conflict resolved by upgrading)

## Design Token + Tailwind Variant Limitation (still applies in v4)
Design token classes (`bg_primary`, `text_secondary`, `border_input`, etc.) are regular CSS classes from ui-kit.
Tailwind CANNOT generate variants for them:
- `hover:bg_secondary` — WILL NOT WORK
- `focus:border_input` — WILL NOT WORK
- `placeholder:text_tertiary` — WILL NOT WORK

Workaround: write hover/focus rules as plain CSS in `App.css`.
Tailwind layout/spacing utilities (flex, gap, h-16, px-4, shadow-sm, etc.) are fine.

## Key Files
- `.agents/PLAN.md` — last completed task plan
- `.agents/PROGRESS.md` — last migration review log
- `.agents/skills/ui-kit/UI_KIT.md` — ui-kit component API reference (read before writing UI)
- `.cursorrules` — project rules (200 line limit, path aliases, import order)

## Agent Workflow
- Plans go in `.agents/PLAN.md`, progress in `.agents/PROGRESS.md`
- Codex is the worker; Claude is the reviewer
- After Codex marks DONE, leader reviews and updates PROGRESS.md
