# Phase 04 — iReward Store

## Overview
- **Priority:** P1
- **Effort:** 2h
- **Status:** Pending
- **Depends on:** Phase 01 (RewardItem type + mock data)

## Mục tiêu

Fill stub `IReward.tsx` thành trang shop đầy đủ: coin balance header, category filter, reward grid, redeem modal. Demo stakeholder thấy được "coin economy" hoạt động end-to-end.

## Files cần tạo/thay đổi

| File | Action | Mô tả |
|------|--------|-------|
| `src/pages/IReward/IReward.tsx` | Modify | Replace stub bằng full page layout |
| `src/pages/IReward/types.ts` | Create | IReward-specific UI types |
| `src/pages/IReward/hooks/useIReward.ts` | Create | Data fetching + redeem logic |
| `src/pages/IReward/components/RewardCoinHeader.tsx` | Create | Coin balance + season stats header |
| `src/pages/IReward/components/RewardCategoryFilter.tsx` | Create | Category tabs/filter |
| `src/pages/IReward/components/RewardGrid.tsx` | Create | Grid layout container |
| `src/pages/IReward/components/RewardCard.tsx` | Create | 1 reward item card |
| `src/pages/IReward/components/RedeemModal.tsx` | Create | Confirm redeem dialog |
| `src/pages/IReward/index.ts` | Modify | Export default IReward |
| `src/services/reward.service.ts` | Create | RTK Query endpoints for rewards |

## Architecture

```
IReward.tsx
├── RewardCoinHeader          ← coinBalance + totalEarned + totalSpent
├── RewardCategoryFilter      ← All | Ngày nghỉ | Quà tặng | Đặc quyền | Digital | Trải nghiệm
├── RewardGrid
│   ├── RewardCard (×N)       ← image + name + price + stock + redeem button
│   └── EmptyState            ← nếu không có item trong category
└── RedeemModal               ← confirm dialog với coin balance preview
```

## Types (`types.ts`)

```typescript
import type { RewardCategory, RewardItem } from '@/types/reward.types';

export type IRewardFilterCategory = 'all' | RewardCategory;

export interface RewardCardItem extends RewardItem {
  canAfford: boolean;   // coinBalance >= coin_price
  isOutOfStock: boolean; // stock === 0
}
```

## Service (`reward.service.ts`)

```typescript
export const rewardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRewards: builder.query<RewardItem[], void>({
      query: () => '/v3/rewards',
      transformResponse: (response: ApiResponse<RewardItem[]>) => response.data,
      providesTags: ['Reward'],  // thêm 'Reward' vào api.ts tagTypes
    }),
    redeemReward: builder.mutation<null, { itemId: string }>({
      query: (body) => ({ url: '/v3/rewards/redeem', method: 'POST', body }),
      transformResponse: (response: ApiResponse<null>) => response.data,
      invalidatesTags: ['UserProfile'],  // refresh coin balance
    }),
  }),
});
```

> Cần thêm `'Reward'` vào `tagTypes` trong `src/services/api.ts`.

## Hook (`useIReward.ts`)

```typescript
export function useIReward() {
  const [activeCategory, setActiveCategory] = useState<IRewardFilterCategory>('all');
  const [redeemingItem, setRedeemingItem] = useState<RewardCardItem | null>(null);
  const { data: rewards, isLoading: isRewardsLoading } = useGetRewardsQuery();
  const { data: profile, isLoading: isProfileLoading } = useGetMyProfileQuery();
  const [redeemReward] = useRedeemRewardMutation();

  const coinBalance = profile?.coinBalance ?? 0;

  const filteredRewards: RewardCardItem[] = (rewards ?? [])
    .filter(item => item.is_active)
    .filter(item => activeCategory === 'all' || item.category === activeCategory)
    .map(item => ({
      ...item,
      canAfford: coinBalance >= item.coin_price,
      isOutOfStock: item.stock === 0,
    }));

  const handleRedeem = async (item: RewardCardItem) => {
    // mock mode: optimistic — close modal, show toast
    await redeemReward({ itemId: item.item_id }).unwrap();
    setRedeemingItem(null);
  };

  return {
    coinBalance,
    profile,
    activeCategory,
    setActiveCategory,
    filteredRewards,
    redeemingItem,
    setRedeemingItem,
    handleRedeem,
    isLoading: isRewardsLoading || isProfileLoading,
  };
}
```

## Component Design

### `RewardCoinHeader`
```
┌─────────────────────────────────────────────┐
│  🪙 Coin của bạn                            │
│  [240]  coin hiện có                        │
│  ──────────────────────────────             │
│  Đã kiếm: 580  |  Đã dùng: 340            │
│  "Coin chỉ nhận được khi lên cấp"          │
└─────────────────────────────────────────────┘
```

### `RewardCategoryFilter`
Tabs: **Tất cả** | Ngày nghỉ | Quà tặng | Đặc quyền | Digital | Trải nghiệm
- Active tab: highlight
- Hiện số lượng items trong mỗi category

### `RewardCard`
```
┌───────────────────┐
│   [image 16:9]    │
│                   │
│ Tên phần thưởng   │
│ Mô tả ngắn       │
│ ─────────────── │
│ 🪙 200 coin       │
│ Còn: 5 cái       │
│ [Đổi ngay]        │  ← disabled nếu !canAfford hoặc isOutOfStock
└───────────────────┘
```
- Nếu `!canAfford`: button mờ + tooltip "Cần thêm X coin"
- Nếu `isOutOfStock`: badge "Hết hàng", button disabled
- Nếu `stock < 5`: badge "Sắp hết" (amber)

### `RedeemModal`
```
Xác nhận đổi thưởng
──────────────────
[image]  Ngày nghỉ thưởng
         200 coin

Coin hiện có:   240
Sau khi đổi:    40

     [Hủy]    [Xác nhận đổi]
```
- Show redemption flow note: "P&OD sẽ liên hệ trong 1-2 ngày làm việc"

## Mock Data (từ Phase 01)

10 reward items cần có:
| Tên | Category | Coin | Stock |
|-----|----------|------|-------|
| Ngày nghỉ thưởng | time_off | 500 | 10 |
| WFH bonus 1 ngày | privilege | 300 | 20 |
| Voucher Grab Food 100K | digital | 150 | 50 |
| Voucher The Coffee House | digital | 100 | 30 |
| Áo iKame Limited | merch | 400 | 15 |
| Mũ iKame | merch | 200 | 25 |
| Flexible check-in 1 tuần | privilege | 800 | 5 |
| Khóa học Udemy | experience | 600 | null |
| Team lunch với CEO | experience | 2000 | 3 |
| Laptop sticker pack | merch | 80 | null |

## `api.ts` Change

Thêm `'Reward'` vào tagTypes:
```typescript
tagTypes: ['UserProfile', 'Quest', 'Post', 'Event', 'Leaderboard', 'Reward'],
```

## Todo

- [ ] Thêm `'Reward'` vào `src/services/api.ts` tagTypes
- [ ] Tạo `src/services/reward.service.ts`
- [ ] Tạo `src/pages/IReward/types.ts`
- [ ] Tạo `useIReward.ts` hook
- [ ] Tạo `RewardCoinHeader.tsx`
- [ ] Tạo `RewardCategoryFilter.tsx`
- [ ] Tạo `RewardCard.tsx`
- [ ] Tạo `RewardGrid.tsx`
- [ ] Tạo `RedeemModal.tsx`
- [ ] Update `IReward.tsx` — replace stub
- [ ] Update `index.ts`

## Success Criteria

- Trang `/ireward` hiển thị coin balance đúng (240 từ mock profile)
- 10 reward items hiển thị đúng theo grid
- Filter by category hoạt động
- Item giá 500 coin hiển thị disabled (user chỉ có 240)
- Click "Đổi ngay" → RedeemModal mở với preview coin còn lại
- Confirm → toast "Đổi thưởng thành công! P&OD sẽ liên hệ sớm."
