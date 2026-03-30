# PLAN: Migrate Lucide Icons to Phosphor Icons

> Leader: Claude | Executor: Codex
> Created: 2026-03-27
> Status: READY

---

## Tong quan

Go bo `lucide-react`, chuyen sang `@phosphor-icons/react`.
- 9 file can sua import + component
- 1 file config (`.cursorrules`) can cap nhat
- 1 thao tac package: go `lucide-react`, cai `@phosphor-icons/react`

---

## Phase 0: Package swap

### Task 0.1 — Go lucide-react, cai @phosphor-icons/react

```bash
npm uninstall lucide-react
npm install @phosphor-icons/react
```

### Task 0.2 — Cap nhat `.cursorrules`

**File**: `.cursorrules` (dong 304)

```
// TRUOC:
- Icons: icons exported from `@frontend-team/ui-kit` or lucide-react

// SAU:
- Icons: icons exported from `@frontend-team/ui-kit` or @phosphor-icons/react
```

---

## Phase 1: Thay icon trong cac file

### BANG MAPPING ICON

| # | Lucide | Phosphor | Luu y |
|---|--------|----------|-------|
| 1 | `Pencil` | `PencilSimpleIcon` | |
| 2 | `ChevronDown` | `CaretDownIcon` | |
| 3 | `ChevronUp` | `CaretUpIcon` | |
| 4 | `Camera` | `CameraIcon` | |
| 5 | `Check` | `CheckIcon` | |
| 6 | `CircleCheck` | `CheckCircleIcon` | |
| 7 | `Loader2` | `CircleNotchIcon` | Dung cho spinner, can giu `animate-spin` |
| 8 | `Flame` | `FireIcon` | |
| 9 | `MessageCircle` | `ChatCircleIcon` | |
| 10 | `LogOut` | `SignOutIcon` | |
| 11 | `LockKeyhole` | `LockKeyIcon` | |
| 12 | `ThumbsUp` | `ThumbsUpIcon` | |

### MAPPING PROPS

Phosphor KHONG co `strokeWidth`. Thay bang `weight`:

| Lucide prop | Phosphor prop | Giai thich |
|-------------|---------------|------------|
| `size={N}` | `size={N}` | Giu nguyen, API giong nhau |
| `strokeWidth={1.5}` | `weight="light"` | Net mong |
| `strokeWidth={2}` | Bo (hoac `weight="regular"`) | `regular` la default, KHONG can ghi |
| `strokeWidth={2.5}` | `weight="bold"` | Net dam |
| `className="..."` | `className="..."` | Giu nguyen |

**QUAN TRONG**: Phosphor icon ten co hau to `Icon` (vd: `FireIcon`, `CheckIcon`). PHAI dung dung ten.

---

### Task 1.1 — `src/pages/Profile/components/ProfileHeader.tsx`

**Thay import**:
```tsx
// TRUOC:
import { ChevronDown, Pencil } from 'lucide-react';

// SAU:
import { CaretDownIcon, PencilSimpleIcon } from '@phosphor-icons/react';
```

**Thay component trong JSX**:
- `<Pencil size={20} />` → `<PencilSimpleIcon size={20} />`
- `<ChevronDown size={20} className={...} />` → `<CaretDownIcon size={20} className={...} />`

---

### Task 1.2 — `src/pages/Profile/components/AvatarWithEdit.tsx`

**Thay import**:
```tsx
// TRUOC:
import { Camera } from 'lucide-react';

// SAU:
import { CameraIcon } from '@phosphor-icons/react';
```

**Thay component**:
- `<Camera size={20} className="text-white" />` → `<CameraIcon size={20} className="text-white" />`

---

### Task 1.3 — `src/components/common/QuestCompleteButton.tsx`

**Thay import**:
```tsx
// TRUOC:
import { Check, CircleCheck, Loader2 } from 'lucide-react';

// SAU:
import { CheckIcon, CheckCircleIcon, CircleNotchIcon } from '@phosphor-icons/react';
```

**Thay component**:
- `<Check size={12} strokeWidth={2.5} className="text-white" />`
  → `<CheckIcon size={12} weight="bold" className="text-white" />`

- `<Loader2 size={22} className="animate-spin icon_tertiary" />`
  → `<CircleNotchIcon size={22} className="animate-spin icon_tertiary" />`

- `<CircleCheck size={20} strokeWidth={1.5} />`
  → `<CheckCircleIcon size={20} weight="light" />`

---

### Task 1.4 — `src/pages/Dashboard/components/PostCard.tsx`

**Thay import**:
```tsx
// TRUOC:
import { Flame, MessageCircle } from 'lucide-react';

// SAU:
import { FireIcon, ChatCircleIcon } from '@phosphor-icons/react';
```

**Thay component**:
- `<Flame size={16} strokeWidth={1.5} />` → `<FireIcon size={16} weight="light" />`
- `<MessageCircle size={16} strokeWidth={1.5} />` → `<ChatCircleIcon size={16} weight="light" />`

---

### Task 1.5 — `src/pages/Dashboard/components/PostDetailContent.tsx`

Giong hệt Task 1.4 (cung `Flame`, `MessageCircle` voi cung props).

**Thay import**:
```tsx
// TRUOC:
import { Flame, MessageCircle } from 'lucide-react';

// SAU:
import { FireIcon, ChatCircleIcon } from '@phosphor-icons/react';
```

**Thay component**:
- `<Flame size={16} strokeWidth={1.5} />` → `<FireIcon size={16} weight="light" />`
- `<MessageCircle size={16} strokeWidth={1.5} />` → `<ChatCircleIcon size={16} weight="light" />`

---

### Task 1.6 — `src/components/SidebarFooter.tsx`

**Thay import**:
```tsx
// TRUOC:
import { LogOut } from 'lucide-react';

// SAU:
import { SignOutIcon } from '@phosphor-icons/react';
```

**Thay component**:
- `<LogOut className="size-4" />` → `<SignOutIcon className="size-4" />`

---

### Task 1.7 — `src/pages/IQuest/components/LockedQuestBox.tsx`

**Thay import**:
```tsx
// TRUOC:
import { LockKeyhole } from 'lucide-react';

// SAU:
import { LockKeyIcon } from '@phosphor-icons/react';
```

**Thay component**:
- `<LockKeyhole className="size-5 text_tertiary" strokeWidth={2} />`
  → `<LockKeyIcon className="size-5 text_tertiary" />`

(`strokeWidth={2}` tuong duong `weight="regular"` la default, bo di)

---

### Task 1.8 — `src/pages/Dashboard/components/CommentItem.tsx`

**Thay import**:
```tsx
// TRUOC:
import { ChevronDown, ChevronUp, ThumbsUp } from 'lucide-react';

// SAU:
import { CaretDownIcon, CaretUpIcon, ThumbsUpIcon } from '@phosphor-icons/react';
```

**Thay component**:
- `<ThumbsUp size={14} strokeWidth={1.5} />` → `<ThumbsUpIcon size={14} weight="light" />`
- `<ChevronDown size={14} />` → `<CaretDownIcon size={14} />`
- `<ChevronUp size={14} />` → `<CaretUpIcon size={14} />`

---

### Task 1.9 — `src/pages/Dashboard/components/ReplyItem.tsx`

**Thay import**:
```tsx
// TRUOC:
import { ThumbsUp } from 'lucide-react';

// SAU:
import { ThumbsUpIcon } from '@phosphor-icons/react';
```

**Thay component**:
- `<ThumbsUp size={12} strokeWidth={1.5} />` → `<ThumbsUpIcon size={12} weight="light" />`

---

## Phase 2: Verification

### Task 2.1 — Chay build + lint

```bash
npm run build
npm run lint
```

Dam bao:
- Khong con bat ky import nao tu `lucide-react`
- Khong co TypeScript errors
- Build thanh cong

### Task 2.2 — Double check: grep con sot khong

```bash
grep -r "lucide-react" src/
grep -r "lucide" package.json
```

Neu con ket qua → chua xong, can sua tiep.

---

## Luu y chung cho Codex

1. **KHONG thay doi gi khac ngoai icon migration** — Chi thay import va component, KHONG refactor, KHONG them feature
2. **Moi file KHONG qua 200 dong**
3. **Import order**: React core > `@phosphor-icons/react` (3rd party) > `@/...` > relative > type
4. **KHONG dung `any`**
5. **Dung design token classes** — KHONG dung raw Tailwind colors
6. **Sau moi task, cap nhat PROGRESS.md** voi status va notes
7. **Lam theo thu tu Phase 0 → 2**
8. **KHONG thay doi logic, UI layout, hay styling** — chi thay ten icon va props
9. **Phosphor icon name co hau to `Icon`** — vd: `FireIcon`, KHONG phai `Fire`
10. **`weight` la optional** — neu la `"regular"` (default) thi KHONG can ghi, giu code sach
