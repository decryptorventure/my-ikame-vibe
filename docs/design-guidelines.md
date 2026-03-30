# Hướng dẫn Thiết kế UI — My iKame

## 1. UI Kit (@frontend-team/ui-kit)

**Quy tắc bắt buộc**: Chỉ import từ `@frontend-team/ui-kit`, không dùng antd/shadcn/MUI.

```typescript
// ✅ Đúng
import { Button, Toaster, TooltipProvider } from '@frontend-team/ui-kit';

// ❌ Sai
import { Button } from 'antd';
import { Button } from '@shadcn/ui';
```

Trước khi viết UI component bất kỳ, đọc `.agents/skills/ui-kit/UI_KIT.md` để kiểm tra component đã có sẵn chưa.

### Components đang dùng (quan sát từ code)
- `TooltipProvider` — wrap toàn app
- `Toaster` — global toast notifications
- Các component khác: xem `UI_KIT.md`

---

## 2. Icons (@phosphor-icons/react)

**Thư viện icon duy nhất** được dùng trong project (đã migrate từ lucide-react).

```typescript
import { CameraIcon, SignOutIcon, LockKeyIcon, ThumbsUpIcon } from '@phosphor-icons/react';

// Dùng prop weight thay vì strokeWidth (khác lucide)
<CameraIcon weight="light" size={24} />
<ThumbsUpIcon weight="fill" size={20} />
```

**Lưu ý khi migrate từ lucide**:
- `strokeWidth` → `weight` (`"thin" | "light" | "regular" | "bold" | "fill" | "duotone"`)
- Tên icon có thể khác: `LockKeyhole` → `LockKeyIcon`, `LogOut` → `SignOutIcon`

---

## 3. Tailwind CSS (v4)

Dùng Tailwind cho layout và spacing, **không dùng raw color classes**.

```typescript
// ✅ Layout, spacing
<div className="flex items-center justify-between p-4 gap-3">

// ✅ Design token classes
<div className="bg_primary text_secondary">

// ❌ Raw color (vi phạm design system)
<div className="bg-blue-500 text-gray-700">
```

**Giới hạn**: Tối đa 5-6 Tailwind classes mỗi element để giữ readable.

---

## 4. Radix UI Primitives

Dùng Radix cho interactive components không có trong UI Kit:

```typescript
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
```

---

## 5. Animations (Lottie React)

```typescript
import Lottie from 'lottie-react';
import animationData from '@/assets/animations/success.json';

<Lottie
  animationData={animationData}
  loop={false}
  style={{ width: 200, height: 200 }}
/>
```

Dùng cho:
- Quest completion animations
- Level up celebrations
- Onboarding transitions

---

## 6. Rich Text Editor (TipTap)

Dùng `@frontend-team/tiptap-kit` hoặc `src/tiptap/chat-box-editor.tsx` cho mọi input rich text.

```typescript
import { ChatBoxEditor } from '@/tiptap/chat-box-editor';
import { useChatBoxEditor } from '@/tiptap/use-chat-box-editor';

// Hook quản lý editor state
const { editor, content, reset } = useChatBoxEditor();
```

**Extensions đang active**: emoji, highlight, image, mention, starter-kit

---

## 7. Form (React Hook Form + Zod)

```typescript
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Tên không được để trống'),
  email: z.string().email('Email không hợp lệ'),
});

type FormData = z.infer<typeof schema>;

function MyForm() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  // ...
}
```

---

## 8. Hotkeys (react-hotkeys-hook)

```typescript
import { useHotkeys } from 'react-hotkeys-hook';

useHotkeys('ctrl+k', () => openSearch(), { preventDefault: true });
```

---

## 9. Responsive Design

- Hỗ trợ: iOS, Android, Web
- Dùng Tailwind responsive prefixes: `sm:`, `md:`, `lg:`
- Sidebar: collapse trên mobile

---

## 10. Component Checklist UI

Trước khi tạo component mới:
- [ ] Đã check UI_KIT.md chưa? Component có sẵn không?
- [ ] Icon dùng `@phosphor-icons/react`?
- [ ] Không có raw Tailwind color classes?
- [ ] Animation dùng Lottie (không CSS animation phức tạp)?
- [ ] Rich text dùng TipTap component có sẵn?
