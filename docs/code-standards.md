# Quy chuẩn Code — My iKame

> Nguồn: CLAUDE.md + README.md (cursorrules). Áp dụng bắt buộc cho mọi thay đổi.

## 1. Nguyên tắc cốt lõi

- **YAGNI** — Không code thứ chưa cần
- **KISS** — Giữ đơn giản
- **DRY** — Không lặp code
- **Giới hạn file**: Tuyệt đối không vượt quá **200 lines** mỗi file

---

## 2. Naming Conventions

| Loại | Convention | Ví dụ |
|---|---|---|
| Component / Page | PascalCase | `ProfileHeader.tsx`, `Dashboard.tsx` |
| Hook | camelCase bắt đầu `use` | `useProfile.ts`, `useAuthState.ts` |
| Service | `[domain].service.ts` | `quest.service.ts` |
| Types file | `[domain].types.ts` | `userProfile.types.ts` |
| Slice | `[domain]Slice.ts` | `authSlice.ts` |
| Constants | `UPPER_SNAKE_CASE` | `ROUTES`, `STORAGE_KEYS` |
| Utility | camelCase | `getInitials.ts`, `getTimeAgo.ts` |
| File tổng quát | kebab-case | `custom-fetch-base.ts` → hiện đang camelCase per convention |

---

## 3. Cấu trúc Component

```typescript
// Luôn định nghĩa Props interface tách biệt
interface MyComponentProps {
  requiredProp: string;
  optionalProp?: number;
  onAction?: () => void;
}

export default function MyComponent({ requiredProp, optionalProp, onAction }: MyComponentProps) {
  // 1. Hooks (state, effects, context)
  // 2. Derived state (useMemo)
  // 3. Event handlers (useCallback)
  // 4. Effects (useEffect)
  // 5. Early returns (loading, error)
  // 6. Render JSX
}
```

**KHÔNG làm trong component**:
- Gọi API trực tiếp
- Business logic
- State phức tạp → extract sang hook

---

## 4. State Decision Guide

| Tình huống | Giải pháp |
|---|---|
| State chỉ dùng trong 1 component | `useState` |
| State chia sẻ trong 1 feature (≥3 levels deep) | React Context trong `src/state/contexts/` |
| State chia sẻ nhiều feature/page | Redux slice trong `src/state/slices/` |
| Server/API data | RTK Query (`src/services/`) |

---

## 5. Import Order

```typescript
// 1. React core
import React, { useState, useCallback } from 'react';

// 2. Third-party
import { useDispatch } from 'react-redux';

// 3. Internal @/ (services → hooks → types → components → state → lib/utils)
import { useGetProfileQuery } from '@/services/userProfile.service';
import { useAuthState } from '@/hooks/useAuthState';
import type { UserProfileResponse } from '@/types/userProfile.types';
import { ProfileHeader } from '@/components';

// 4. Relative (cùng cấp only)
import { ProfileStats } from './components';

// 5. Type-only imports
import type { ProfilePageProps } from './types';
```

---

## 6. RTK Query Service Pattern

```typescript
// src/services/[domain].service.ts
import { api } from '@/services/api';
import type { ApiResponse } from '@/types/api.types';
import type { EntityType, CreateRequest } from '@/types/[domain].types';

export const domainApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEntities: builder.query<EntityType[], void>({
      query: () => '/v3/domain/entities',
      transformResponse: (res: ApiResponse<EntityType[]>) => res.data,
      providesTags: ['TagName'],
    }),
    createEntity: builder.mutation<EntityType, CreateRequest>({
      query: (body) => ({ url: '/v3/domain/entities', method: 'POST', body }),
      transformResponse: (res: ApiResponse<EntityType>) => res.data,
      invalidatesTags: ['TagName'],
    }),
  }),
});

export const { useGetEntitiesQuery, useCreateEntityMutation } = domainApi;
```

---

## 7. Custom Hook Pattern

```typescript
// src/pages/[Feature]/hooks/use[Feature].ts
interface UseFeatureProps {
  id?: string;
  onSuccess?: () => void;
}

export function useFeature({ id, onSuccess }: UseFeatureProps = {}) {
  const { data, isLoading, error } = useGetFeatureQuery(id!, { skip: !id });
  const [createMutation] = useCreateFeatureMutation();

  const computedValue = useMemo(() => data?.map(transform), [data]);

  const handleAction = useCallback(async () => {
    try {
      await createMutation(payload).unwrap();
      onSuccess?.();
    } catch (e) {
      console.error(e);
    }
  }, [createMutation, onSuccess]);

  return { data, isLoading, error, computedValue, handleAction };
}
```

---

## 8. TypeScript Standards

- **No `any`** — dùng `unknown` rồi narrow, hoặc định nghĩa interface
- **`interface`** cho object shapes, **`type`** cho union/intersection
- **`import type`** cho type-only imports
- Luôn định nghĩa return type cho functions public
- `as const` cho literal types và readonly arrays

---

## 9. Forbidden Patterns

| ❌ Không làm | ✅ Thay bằng |
|---|---|
| `import { X } from 'antd'` | `import { X } from '@frontend-team/ui-kit'` |
| `import { X } from 'lucide-react'` | `import { X } from '@phosphor-icons/react'` |
| `fetch()` hoặc `axios` trực tiếp | RTK Query service |
| Relative import khi có alias | `@/...` alias |
| `any` type | Interface hoặc `unknown` |
| Prop drilling > 2 levels | Context hoặc Redux slice |
| Raw Tailwind colors (`bg-blue-500`) | Design token classes (`bg_primary`) |
| Business logic trong component | Extract sang hook |
| File > 200 lines | Split thành modules nhỏ hơn |

---

## 10. Feature Organization

```
pages/FeatureName/
├── FeatureName.tsx          # < 200 lines, chỉ render + gọi hooks
├── components/
│   ├── FeatureHeader.tsx
│   ├── FeatureContent.tsx
│   └── index.ts             # Barrel export
├── hooks/
│   ├── useFeatureName.ts    # Main hook
│   └── index.ts
├── types.ts                 # Feature-specific types
└── index.ts                 # Barrel export
```

---

## 11. Error Handling

```typescript
// Mutation với try/catch
try {
  const result = await mutation(payload).unwrap();
  // success handling
} catch (error: unknown) {
  console.error('Operation failed:', error);
  // show user-friendly message
}

// Component với loading/error states
const { data, isLoading, error } = useGetDataQuery();
if (isLoading) return <Loading />;
if (error) return <EmptyState message="Không tải được dữ liệu" />;
```

---

## 12. Pre-commit Checklist

- [ ] File < 200 lines?
- [ ] Logic trong hook, không trong component?
- [ ] Dùng `@/` alias thay relative import?
- [ ] Không có `any` type?
- [ ] Props interface định nghĩa tách biệt?
- [ ] Import từ `@frontend-team/ui-kit` (không phải antd)?
- [ ] Icons từ `@phosphor-icons/react`?
- [ ] Không commit file `.env` hoặc credentials?
- [ ] `yarn lint` pass?
