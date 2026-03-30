# Phase 01 — Fix Mock Data & Types

## Overview
- **Priority:** P1 (blocker cho phase 2/3/4)
- **Effort:** 1h
- **Status:** Pending

## Vấn đề hiện tại

| File | Vấn đề |
|------|--------|
| `src/lib/mock-data.ts` | Level configs dùng giá trị linear sai, titles sai, thiếu RewardItem |
| `src/lib/mock-data.ts` | Quest progress chỉ có `claimed`/`in_progress`, thiếu `completed` |
| `src/types/` | Chưa có `RewardItem` type |

## Files cần thay đổi

| File | Action | Mô tả |
|------|--------|-------|
| `src/lib/mock-data.ts` | Modify | Fix MOCK_LEVEL_CONFIGS, thêm MOCK_REWARDS, update quest progress |
| `src/types/reward.types.ts` | Create | RewardItem, RewardCategory, RedemptionStatus types |
| `src/lib/mock-fetch-base.ts` | Modify | Thêm route `/v3/rewards` → MOCK_REWARDS |

## Implementation Steps

### 1. Tạo `src/types/reward.types.ts`

```typescript
export type RewardCategory = 'time_off' | 'merch' | 'privilege' | 'digital' | 'experience';
export type FulfillmentType = 'auto' | 'manual';
export type RedemptionStatus = 'pending' | 'confirmed' | 'fulfilled' | 'awaiting_fulfillment' | 'cancelled';

export interface RewardItem {
  item_id: string;
  name: string;
  description: string;
  category: RewardCategory;
  coin_price: number;
  stock: number | null;
  max_per_user: number | null;
  available_from: string;
  available_to: string | null;
  is_active: boolean;
  image_url: string;
  fulfillment_type: FulfillmentType;
}
```

### 2. Fix `MOCK_LEVEL_CONFIGS` trong `mock-data.ts`

Dùng công thức đúng: `EXP_required(L) = 1000 × (L - 1)^1.5`

Titles chính xác theo docs:
- Lv 1–9: Tân binh (Rookie)
- Lv 10–19: Khám phá (Explorer)
- Lv 20–29: Thành viên (Member)
- Lv 30–39: Chiến binh (Warrior)
- Lv 40–49: Cống hiến (Contributor)
- Lv 50+: Ngôi sao (Star)...

Coin reward khi level up (từ docs):
- Lv 2-4: 30/level, Lv 5 milestone: 100, Lv 6-9: 40/level, Lv 10 milestone: 250...

Mock data cần ít nhất 15 levels đầu với giá trị đúng.

### 3. Update `MOCK_MY_PROFILE`

Cập nhật `exp: 1350` → phải match với level 5 theo công thức mới.
- EXP_required(5) = 1000 × (5-1)^1.5 = 1000 × 8 = 8,000
- Profile hiện có exp=1350 → level 2 theo công thức mới (EXP_required(2) = 1000)
- Cập nhật thành `exp: 9500, level: 5` để demo level 5 hợp lý

### 4. Update `MOCK_QUEST_PROGRESS` — thêm `completed` status

Phân biệt:
- `in_progress`: đang làm, chưa đủ criteria
- `completed`: đã xong criteria, CHƯA claim thưởng (có nút "Nhận thưởng")
- `claimed`: đã nhận thưởng xong

Thêm ít nhất 1 quest với status `completed` để demo claim flow.

### 5. Thêm `MOCK_REWARDS` — 8-10 reward items

Categories: time_off / merch / privilege / digital / experience
Coin prices: 100 → 5000 (range hợp lý)

### 6. Update `MOCK_RESPONSES` trong `mock-data.ts`

Thêm: `'/v3/rewards': apiOk(MOCK_REWARDS)`

### 7. Update `mock-fetch-base.ts`

Thêm route handler cho `/v3/rewards`.

## Todo

- [ ] Tạo `src/types/reward.types.ts`
- [ ] Fix `MOCK_LEVEL_CONFIGS` (exponential formula, đúng titles, đúng coin rewards)
- [ ] Update `MOCK_MY_PROFILE` (exp và level nhất quán)
- [ ] Update `MOCK_QUEST_PROGRESS` (thêm `completed` status cho 1-2 quests)
- [ ] Thêm `MOCK_REWARDS` array (8-10 items, 5 categories)
- [ ] Update `MOCK_RESPONSES` + `mock-fetch-base.ts`
- [ ] Verify: `getLevelProgress()` vẫn hoạt động đúng với data mới (utility đã correct)

## Success Criteria

- Level 5 user hiển thị đúng progress bar (exp đang tiến đến level 6)
- Title "Tân binh" / "Khám phá" hiển thị đúng theo level
- `/v3/rewards` trả về mock rewards data
- 1-2 quests có status `completed` (hiển thị nút "Nhận thưởng")
