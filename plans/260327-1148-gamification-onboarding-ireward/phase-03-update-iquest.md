# Phase 03 — Update IQuest (completed vs claimed)

## Overview
- **Priority:** P2
- **Effort:** 1h
- **Status:** Pending
- **Depends on:** Phase 01

## Mục tiêu

IQuest hiện chỉ phân biệt `claimed` vs chưa. Cần thêm trạng thái `completed` (đã xong criteria, chưa nhận thưởng) để demo gamification loop đúng: hoàn thành → nút "Nhận thưởng" → claimed.

## Files cần thay đổi

| File | Action | Mô tả |
|------|--------|-------|
| `src/pages/IQuest/types.ts` | Modify | Thêm `completed` status vào `IQuestItem` |
| `src/pages/IQuest/hooks/useIQuest.ts` | Modify | Map `completed` status từ progress data |
| `src/pages/IQuest/components/IQuestList.tsx` | Modify | Hiển thị nút "Nhận thưởng" cho completed quests |
| `src/services/quest.service.ts` | Modify | Thêm `claimQuestReward` mutation endpoint |

## Type Change (`types.ts`)

Hiện tại `IQuestItem`:
```typescript
completed: boolean  // true = claimed
```

Cần đổi thành:
```typescript
status: 'in_progress' | 'completed' | 'claimed'
// completed = xong criteria, chưa nhận thưởng
// claimed   = đã nhận thưởng
```

Backward compat: giữ `completed` computed boolean `= status === 'claimed'` để các component khác không bị break.

## Hook Change (`useIQuest.ts`)

Mapping logic:
```typescript
const progressEntry = progressMap.get(quest.id);
const status = progressEntry?.status ?? 'in_progress';
// API trả: 'in_progress' | 'completed' | 'claimed'
```

Hiện tại `canComplete` chỉ check `!== 'claimed'`. Giữ nguyên vì đó là logic claim onboarding riêng.

## Service Change (`quest.service.ts`)

Thêm endpoint claim reward cho daily/weekly/monthly quests:
```typescript
claimQuestReward: builder.mutation<null, { questId: string }>({
  query: (body) => ({
    url: '/v3/iquest/quests/claim',
    method: 'POST',
    body,
  }),
  transformResponse: (response: ApiResponse<null>) => response.data,
  invalidatesTags: ['Quest', 'UserProfile'],
}),
```

> Với mock mode, endpoint này sẽ không có mock response — nhưng mock-fetch-base trả 404, UI cần handle gracefully (show toast error hoặc optimistic update).

**Approach cho mock mode:** Dùng optimistic update — khi click "Nhận thưởng", update local state sang `claimed` ngay (không cần API response).

## UI Change (`IQuestList.tsx`)

Với quest có `status === 'completed'`:
- Hiện badge màu vàng/amber: "Sẵn sàng nhận thưởng!"
- Nút "Nhận {expReward} EXP" (primary button)
- Khi click: optimistic update → status = 'claimed', show toast "Đã nhận X EXP!"

Layout priority trong list:
1. `completed` quests lên đầu (cần action ngay)
2. `in_progress` quests
3. `claimed` quests xuống cuối (mờ)

## Mock Data Update (Phase 01)

Cần update `MOCK_QUEST_PROGRESS` để thêm ít nhất 1 quest với `status: 'completed'`:
```typescript
{ questId: 'quest-r-01', progress: 5, status: 'completed', target: 5 }
```
→ Quest "Tương tác tích cực" (like 5 bài) đã xong, chờ claim.

## Todo

- [ ] Update `IQuestItem` type: thêm `status` field
- [ ] Update `useIQuest.ts`: map đúng `status` từ progress data
- [ ] Update `IQuestList.tsx`: hiển thị completed state + claim button
- [ ] Thêm `claimQuestReward` mutation vào `quest.service.ts`
- [ ] Handle optimistic update trong mock mode
- [ ] Confirm `MOCK_QUEST_PROGRESS` có 1 quest `completed` (từ Phase 01)

## Success Criteria

- Quest có `status: 'completed'` hiển thị badge vàng + nút "Nhận EXP"
- Click "Nhận EXP" → quest chuyển sang `claimed` state ngay (optimistic)
- Toast thông báo nhận thưởng thành công
- Thứ tự list: completed → in_progress → claimed
- Quest `in_progress` vẫn hiện progress bar như cũ
