# Gamification Engine — Technical Design Document
## My iKame Platform

**Version:** 2.0  
**Author:** Product Owner  
**Audience:** Backend Dev, Database Engineer, QA  
**Last Updated:** 2026-03-18

---

## 1. Tổng quan & Nguyên tắc Thiết kế

### 1.1 Mục tiêu
Gamification Engine là hệ thống cốt lõi tạo động lực cho iKamer sử dụng My iKame hàng ngày, nâng engagement từ <10% lên >50%. Engine vận hành xuyên suốt mọi tính năng trên nền tảng.

### 1.2 Nguyên tắc thiết kế

- **Dual Currency:** EXP (kinh nghiệm, không tiêu được) và iKame Coin (tiền tệ, tiêu được) là 2 hệ thống **tách biệt hoàn toàn**. Không quy đổi qua lại.
- **Coin from Level Up Only:** iKame Coin **chỉ** nhận được khi lên cấp (level up). Không có Coin từ hành động hàng ngày.
- **Seasonal Reset:** EXP và Level reset về 0 mỗi đầu năm (01/01). Mỗi năm = 1 "Mùa" (Season). iKame Coin **không reset**, tích lũy vĩnh viễn.
- **Fair Play:** Reset hàng năm đảm bảo người mới luôn có cơ hội cạnh tranh công bằng trên Leaderboard.
- **Earn Everywhere:** Mọi hành động có giá trị trên nền tảng đều sinh EXP.
- **Active Rewarded:** Hệ thống thiết kế để phân biệt rõ người chỉ chấm công (Passive ~Level 49/năm) với người thực sự tích cực (Active ~Level 62, Super Active ~Level 93).

---

## 2. Hệ thống EXP & Level

### 2.1 Khái niệm
- **EXP (Experience Points):** Điểm kinh nghiệm tích lũy qua hoạt động trên app. Dùng để xếp hạng Leaderboard và tính Level.
- **Level:** Cấp độ người dùng, tính từ tổng EXP trong mùa hiện tại. **Level cap = 100.**

### 2.2 Seasonal Reset Rule

| Thuộc tính | Khi reset (01/01 hàng năm) |
|---|---|
| EXP hiện tại | → 0 |
| Level hiện tại | → 0 |
| iKame Coin | **Không reset** — giữ nguyên |
| Badges đã nhận | **Không reset** — giữ vĩnh viễn |
| Lịch sử Season trước | Lưu archive (Season History) |

**Lưu trữ lịch sử:** Hệ thống lưu snapshot cuối mùa (final EXP, final Level, final Leaderboard rank) vào bảng `season_history` để user xem lại thành tích các năm trước.

### 2.3 Công thức Level Up

**Công thức:** `EXP_required(L) = 1000 × (L - 1) ^ 1.5`

| Tham số | Giá trị |
|---|---|
| Hằng số cơ bản | 1,000 |
| Hệ số mũ | 1.5 |
| Level cap | 100 |

**Bảng Level tham chiếu (trích):**

| Level | Tổng EXP yêu cầu | Chênh lệch EXP | Danh hiệu |
|---|---|---|---|
| 1 | 0 | — | Tân binh (Rookie) |
| 2 | 1,000 | 1,000 | |
| 5 | 8,000 | 2,804 | |
| 10 | 27,000 | 4,373 | Khám phá (Explorer) |
| 15 | 52,383 | 5,303 | |
| 20 | 82,819 | 6,452 | Thành viên (Member) |
| 25 | 117,576 | 7,271 | |
| 30 | 156,170 | 8,008 | Chiến binh (Warrior) |
| 35 | 198,222 | 8,679 | |
| 40 | 243,513 | 9,298 | Cống hiến (Contributor) |
| 45 | 291,863 | 9,874 | |
| 50 | 343,000 | 10,414 | Ngôi sao (Star) |
| 55 | 396,778 | 10,921 | |
| 60 | 453,028 | 11,400 | Nổi bật (Outstanding) |
| 65 | 511,612 | 11,854 | |
| 70 | 572,431 | 12,286 | Trụ cột (Pillar) |
| 75 | 635,384 | 12,698 | |
| 80 | 700,377 | 13,092 | Huyền thoại (Legend) |
| 85 | 767,323 | 13,470 | |
| 90 | 836,140 | 13,834 | Bậc thầy (Grandmaster) |
| 95 | 906,750 | 14,184 | |
| 100 | 979,090 | 14,522 | iKame Master |

> **Ghi chú cho Dev:** Bảng level nên được config trong database (bảng `level_thresholds`), không hardcode — để PO điều chỉnh qua admin panel mà không cần deploy lại.

### 2.4 Danh hiệu (Title) theo Level

| Level | Danh hiệu | Mô tả | Ai thường đạt |
|---|---|---|---|
| 1–9 | Tân binh (Rookie) | Mới bắt đầu, đang khám phá | Tất cả, tháng đầu |
| 10–19 | Khám phá (Explorer) | Đã quen app, bắt đầu tương tác | Passive ~tháng 2 |
| 20–29 | Thành viên (Member) | Sử dụng đều đặn | Passive ~tháng 4 |
| 30–39 | Chiến binh (Warrior) | Đóng góp ổn định | Passive ~tháng 7 |
| 40–49 | Cống hiến (Contributor) | Gắn bó, có đóng góp rõ ràng | Passive max ở đây |
| 50–59 | Ngôi sao (Star) | Vượt "bức tường" — chỉ active | **Chỉ Active trở lên** |
| 60–69 | Nổi bật (Outstanding) | Tích cực vượt trội | Active ~tháng 8 |
| 70–79 | Trụ cột (Pillar) | Ảnh hưởng trong team | Active max ở đây |
| 80–89 | Huyền thoại (Legend) | Top performer | **Chỉ Super Active** |
| 90–99 | Bậc thầy (Grandmaster) | Rất hiếm, nỗ lực phi thường | Super Active cuối năm |
| 100 | iKame Master | Đạt đỉnh mùa | Top 1–2% |

**"Bức tường Level 50":** Đây là ranh giới thiết kế có chủ đích. Người chỉ chấm công không bao giờ vượt qua Level 50, tạo động lực rõ ràng để tham gia các hoạt động khác.

### 2.5 Bảng EXP cho từng hành động

#### Nguồn EXP cố định

| Hành động | EXP | Giới hạn | Ghi chú |
|---|---|---|---|
| Check-in hàng ngày | 1,000 | 1 lần/ngày | Nguồn EXP nền tảng |
| Chuỗi 7 ngày check-in đúng giờ | 2,000 | 1 lần/tuần | Thưởng consistency, reset nếu gián đoạn |
| Check-in OKR | 10,000 | 1 lần/kỳ (4 kỳ/năm) | Gắn với chu kỳ OKR của công ty |
| Hoàn thành nhiệm vụ tân thủ | 5,000 | 1 lần duy nhất | Chỉ Newcomer |
| Hoàn thành cập nhật Profile | 5,000 | 1 lần duy nhất | Điền đầy đủ thông tin cá nhân |
| Thưởng thâm niên | 100,000 × số năm | 1 lần/năm | Tự động trigger vào ngày kỷ niệm |
| Thưởng sinh nhật | 50,000 | 1 lần/năm | Tự động trigger vào ngày sinh nhật |

#### Nguồn EXP linh hoạt (hành vi active)

| Hành động | EXP | Giới hạn | Ghi chú |
|---|---|---|---|
| Viết bài iWiki | 500 | Max 1 bài/ngày, 3 bài/tuần | Hành vi tạo nội dung giá trị |
| Tương tác bài viết trên newsfeed/iWiki | 50 | Max 5 lần/ngày | Like, comment, share |
| Chúc mừng sinh nhật đồng nghiệp | 50 | Max 5 người/ngày | Khuyến khích kết nối |
| Chúc mừng thâm niên đồng nghiệp | 50 | Max 5 người/ngày | Khuyến khích kết nối |

### 2.6 Simulation — Phân biệt 3 nhóm User

> Dữ liệu này giúp dev và QA hiểu bối cảnh thiết kế, validate hệ thống sau khi build.

**Passive User (chỉ chấm công, 260 ngày làm việc/năm):**

| Nguồn | Tính toán | EXP |
|---|---|---|
| Check-in | 1,000 × 260 | 260,000 |
| Chuỗi 7 ngày | 2,000 × 37 tuần | 74,000 |
| **Tổng** | | **~334,000** |
| **Level cuối năm** | | **~49** |

**Active User (tích cực vừa):**

| Nguồn | Tính toán | EXP |
|---|---|---|
| Base (Passive) | | 334,000 |
| iWiki 1 bài/tuần | 500 × 45 | 22,500 |
| Tương tác 3/ngày | 50 × 3 × 200 | 30,000 |
| Chúc mừng 2/tuần | 50 × 2 × 50 | 5,000 |
| Check-in OKR | 10,000 × 4 | 40,000 |
| Sinh nhật | | 50,000 |
| **Tổng** | | **~481,500** |
| **Level cuối năm** | | **~62** |

**Super Active User (tối đa hóa mọi hoạt động):**

| Nguồn | Tính toán | EXP |
|---|---|---|
| Base (Passive) | | 334,000 |
| iWiki max 3/tuần | 500 × 3 × 50 | 75,000 |
| Tương tác max 5/ngày | 50 × 5 × 260 | 65,000 |
| Chúc mừng max | 50 × 5 × 200 | 50,000 |
| Check-in OKR | 10,000 × 4 | 40,000 |
| Sinh nhật | | 50,000 |
| Thâm niên 3 năm | 100,000 × 3 | 300,000 |
| Profile + Tân thủ | | 10,000 |
| **Tổng** | | **~924,000** |
| **Level cuối năm** | | **~93** |

**Tóm tắt:**

| Profile | EXP/năm | Level | Danh hiệu max |
|---|---|---|---|
| Passive | ~334K | ~49 | Cống hiến (Contributor) |
| Active | ~482K | ~62 | Nổi bật (Outstanding) |
| Super Active | ~924K | ~93 | Bậc thầy (Grandmaster) |

---

## 3. Hệ thống iKame Coin

### 3.1 Khái niệm
- **iKame Coin:** Đơn vị tiền tệ nội bộ, dùng để đổi phần thưởng tại iReward Store.
- **Tách biệt hoàn toàn với EXP** — không quy đổi qua lại.
- **Không reset** — Coin tích lũy vĩnh viễn qua các mùa.
- **Chỉ nhận khi level up** — không earn từ hành động hàng ngày.

### 3.2 Coin Flow

```
[User Level Up] → [Coin credited to wallet]
                → Milestone level (×5) nhận bonus lớn hơn
[User] → spends at → [iReward Store] → [Coin deducted]
```

### 3.3 Bảng Coin Reward khi Level Up

| Level | Coin thưởng | Ghi chú |
|---|---|---|
| 2–4 | 30 /level | |
| **5** | **100** | Milestone |
| 6–9 | 40 /level | |
| **10** | **250** | Milestone — lên Khám phá |
| 11–14 | 50 /level | |
| **15** | **400** | Milestone |
| 16–19 | 60 /level | |
| **20** | **600** | Milestone — lên Thành viên |
| 21–24 | 80 /level | |
| **25** | **900** | Milestone |
| 26–29 | 100 /level | |
| **30** | **1,200** | Milestone — lên Chiến binh |
| 31–34 | 120 /level | |
| **35** | **1,600** | Milestone |
| 36–39 | 150 /level | |
| **40** | **2,500** | Milestone — lên Cống hiến |
| 41–44 | 180 /level | |
| **45** | **3,500** | Milestone |
| 46–49 | 200 /level | |
| **50** | **5,000** | Milestone — lên Ngôi sao |
| 51–54 | 220 /level | |
| **55** | **5,500** | Milestone |
| 56–59 | 250 /level | |
| **60** | **6,000** | Milestone — lên Nổi bật |
| 61–64 | 280 /level | |
| **65** | **6,500** | Milestone |
| 66–69 | 300 /level | |
| **70** | **7,000** | Milestone — lên Trụ cột |
| 71–74 | 330 /level | |
| **75** | **7,500** | Milestone |
| 76–79 | 350 /level | |
| **80** | **8,000** | Milestone — lên Huyền thoại |
| 81–84 | 380 /level | |
| **85** | **8,500** | Milestone |
| 86–89 | 400 /level | |
| **90** | **10,000** | Milestone — lên Bậc thầy |
| 91–94 | 450 /level | |
| **95** | **12,000** | Milestone |
| 96–99 | 500 /level | |
| **100** | **20,000** | Milestone — iKame Master |

### 3.4 Tổng Coin ước tính theo Profile

| Profile | Level cuối năm | Tổng Coin kiếm được trong mùa |
|---|---|---|
| Passive | ~49 | ~14,790 |
| Active | ~62 | ~24,150 |
| Super Active | ~93 | ~62,970 |

> **Ghi chú:** Bảng Coin nên config trong DB (bảng `level_coin_rewards`), PO có thể điều chỉnh qua admin panel.

### 3.5 Coin Wallet

Mỗi user có 1 wallet với các thuộc tính:

| Field | Mô tả |
|---|---|
| `balance` | Số Coin hiện có (all-time earned − all-time spent) |
| `total_earned` | Tổng Coin từng kiếm được (all-time, cross-season) |
| `total_spent` | Tổng Coin đã tiêu (all-time) |
| `season_earned` | Coin kiếm được trong mùa hiện tại (reset theo mùa, dùng cho analytics) |

**Transaction log:** Mọi thay đổi balance (earn/spend) đều ghi vào `coin_transactions` với timestamp, source (level_up / redemption / refund), amount, balance_after. Đây là source of truth — balance được tính từ transaction log.

---

## 4. Hệ thống Nhiệm vụ (Quest System)

### 4.1 Phân loại Quest

| Loại | Chu kỳ | Mô tả | Ví dụ |
|---|---|---|---|
| **Daily Quest** | Reset hàng ngày (00:00) | Nhiệm vụ nhỏ, tạo thói quen | Chấm công, đọc 1 bài Newsfeed, gửi 1 Kudos |
| **Weekly Quest** | Reset thứ 2 hàng tuần | Nhiệm vụ trung bình | Viết 1 bài iWiki, hoàn thành 5/5 daily quest, check-in iGoal |
| **Monthly Quest** | Reset ngày 1 hàng tháng | Nhiệm vụ lớn, reward cao | Hoàn thành 20 daily quest, đạt top 10 leaderboard tuần |
| **Onboarding Quest** | 1 lần duy nhất | Dành cho Newcomer | Cập nhật profile, đọc sổ tay văn hoá, kết nối 5 đồng nghiệp |
| **Team Challenge** | Theo event, P&OD tạo | Cuộc thi nhóm | Team engagement score cao nhất tháng |
| **Special Event Quest** | Theo event, P&OD tạo | Nhiệm vụ dịp đặc biệt | Tuần lễ văn hoá, anniversary công ty |

> **Lưu ý:** Quest reward chỉ trả bằng **EXP** (và Badge nếu có). Không trả Coin trực tiếp — Coin chỉ đến từ level up.

### 4.2 Cấu trúc 1 Quest

| Field | Type | Mô tả |
|---|---|---|
| `quest_id` | string | ID duy nhất |
| `title` | string | Tên nhiệm vụ |
| `description` | string | Mô tả chi tiết yêu cầu |
| `type` | enum | daily / weekly / monthly / onboarding / team_challenge / special |
| `criteria` | JSON | Điều kiện hoàn thành (VD: `{"action": "send_kudos", "count": 3}`) |
| `exp_reward` | int | EXP nhận được khi hoàn thành |
| `badge_reward` | string / null | Badge ID nhận được (nếu có) |
| `target_persona` | enum[] | Ai nhận quest: all / newcomer / employee / manager / hr_admin |
| `start_date` | datetime | Thời điểm bắt đầu |
| `end_date` | datetime | Thời điểm kết thúc |
| `max_completions` | int | Số lần tối đa (1 cho onboarding, unlimited cho daily) |
| `is_active` | boolean | P&OD có thể bật/tắt |

### 4.3 Quest Progress Tracking

Mỗi user có progress record cho mỗi quest đang active:

| Field | Mô tả |
|---|---|
| `user_id` | |
| `quest_id` | |
| `current_progress` | Số lượng đã hoàn thành (VD: 2/3 Kudos) |
| `status` | `in_progress` / `completed` / `claimed` / `expired` |
| `completed_at` | Thời điểm hoàn thành |
| `claimed_at` | Thời điểm nhận thưởng |

**Lưu ý:** Phân biệt `completed` (đã hoàn thành điều kiện) và `claimed` (đã nhận reward). User cần chủ động claim reward → tạo thêm 1 touchpoint với app.

### 4.4 Quest Assignment Logic

| Loại Quest | Cách assign |
|---|---|
| Daily / Weekly / Monthly | Hệ thống tự assign cho tất cả user active theo persona target. Reset tự động theo chu kỳ. |
| Onboarding | Tự động assign khi user mới được tạo tài khoản. Không reset. |
| Team Challenge | P&OD tạo qua Admin Panel, chọn team/phòng ban tham gia. |
| Special Event | P&OD tạo qua Admin Panel, chọn audience. |

### 4.5 Admin Panel — Quest Management

P&OD cần giao diện để:
- Tạo / sửa / tắt quest
- Xem danh sách quest đang active
- Xem thống kê: tỷ lệ hoàn thành, quest phổ biến nhất, quest bị bỏ qua
- Tạo Team Challenge / Special Event Quest với deadline và audience tùy chỉnh

---

## 5. Leaderboard

### 5.1 Tiêu chí xếp hạng
- Xếp hạng theo **EXP tích lũy trong mùa hiện tại**
- Reset cùng thời điểm EXP reset (01/01)

### 5.2 Loại Leaderboard

| Loại | Phạm vi | Cập nhật |
|---|---|---|
| **Global — Cá nhân** | Toàn công ty, xếp hạng từng người | Real-time hoặc mỗi 15 phút |
| **Team / Phòng ban** | EXP trung bình/thành viên trong team | Real-time hoặc mỗi 15 phút |
| **Weekly Snapshot** | Top 10 cá nhân tuần vừa qua | Snapshot mỗi thứ 2 |
| **Monthly Snapshot** | Top 10 cá nhân tháng vừa qua | Snapshot ngày 1 hàng tháng |

**Team Leaderboard:** Tính bằng **EXP trung bình/thành viên** (không phải tổng) → tránh bất lợi cho team nhỏ.

### 5.3 Display Rules
- User luôn thấy rank của mình + 2 người trên/dưới
- Top 3 có hiệu ứng đặc biệt (crown icon, highlight)
- Hiển thị Level, Danh hiệu và Badge nổi bật nhất bên cạnh tên

### 5.4 Season Archive
Khi kết thúc mùa:
- Top 10 cá nhân + Top 5 team → hiển thị ở "Hall of Fame"
- Mỗi user lưu final rank trong `season_history`
- Top 3 cá nhân + Top 1 team nhận Season Badge (giữ vĩnh viễn)

---

## 6. iReward Store (Cửa hàng Đổi thưởng)

### 6.1 Cơ chế đổi thưởng

```
User chọn item → Kiểm tra balance ≥ price → Deduct Coin → Tạo redemption record → Notify P&OD để fulfill
```

### 6.2 Cấu trúc Reward Item

| Field | Type | Mô tả |
|---|---|---|
| `item_id` | string | ID duy nhất |
| `name` | string | Tên phần thưởng |
| `description` | string | Mô tả chi tiết |
| `category` | enum | experience / merch / time_off / privilege / digital |
| `coin_price` | int | Giá (Coin) |
| `stock` | int / null | Số lượng còn lại. `null` = unlimited |
| `max_per_user` | int / null | Giới hạn mỗi user. `null` = unlimited |
| `max_per_period` | JSON / null | Giới hạn theo chu kỳ. VD: `{"limit": 1, "period": "quarter"}` |
| `available_from` | datetime | Thời điểm bắt đầu khả dụng |
| `available_to` | datetime / null | Thời điểm hết hạn. `null` = không hết hạn |
| `is_active` | boolean | P&OD bật/tắt |
| `image_url` | string | Ảnh hiển thị |
| `fulfillment_type` | enum | auto (VD: avatar frame) / manual (VD: quà vật lý) |

### 6.3 Redemption Flow

| Bước | Hành động | Status |
|---|---|---|
| 1 | User chọn item, confirm đổi | `pending` |
| 2 | Hệ thống kiểm tra balance, trừ Coin | `confirmed` |
| 3a | Nếu `fulfillment_type = auto` → phát thưởng ngay | `fulfilled` |
| 3b | Nếu `fulfillment_type = manual` → notify P&OD | `awaiting_fulfillment` |
| 4 | P&OD xác nhận đã giao | `fulfilled` |
| ❌ | Nếu P&OD cancel (hết hàng thực tế) | `cancelled` → **hoàn Coin** |

### 6.4 Reward Pricing Framework

#### Sức mua theo Profile (target: user tiêu 70–80% Coin/năm)

| Profile | Coin/năm | Budget tiêu/năm (75%) | Budget/quý |
|---|---|---|---|
| Passive (~Lv49) | ~14,790 | ~11,000 | ~2,750 |
| Active (~Lv62) | ~24,150 | ~18,000 | ~4,500 |
| Super Active (~Lv93) | ~62,970 | ~47,000 | ~11,750 |

#### 5 Tier giá

| Tier | Giá (Coin) | Tần suất mua kỳ vọng | Ai mua thoải mái |
|---|---|---|---|
| **Tier 1 — Everyday** | 500–1,500 | 2–4 lần/tháng | Tất cả |
| **Tier 2 — Monthly** | 2,000–4,000 | 1 lần/tháng | Active trở lên |
| **Tier 3 — Quarterly** | 5,000–8,000 | 1 lần/quý | Active trở lên |
| **Tier 4 — Premium** | 10,000–20,000 | 1–2 lần/năm | Super Active |
| **Tier 5 — Legendary** | 30,000–50,000 | Tích lũy nhiều mùa | Chỉ top user |

### 6.5 Reward Catalog

#### Tier 1 — Everyday (500–1,500 Coin)

| Item | Giá | Category | Stock | Giới hạn/user | Fulfillment |
|---|---|---|---|---|---|
| Sticker pack iKame (bộ 5) | 500 | digital | Unlimited | 1 bộ/tháng | Auto |
| Avatar frame — Basic | 800 | digital | Unlimited | — | Auto |
| Profile theme — Basic | 800 | digital | Unlimited | — | Auto |
| Cốc iKame branded | 1,200 | merch | 50/quý | 1 cái/năm | Manual |
| Notebook iKame | 1,500 | merch | 30/quý | 1 cuốn/năm | Manual |

#### Tier 2 — Monthly (2,000–4,000 Coin)

| Item | Giá | Category | Stock | Giới hạn/user | Fulfillment |
|---|---|---|---|---|---|
| Avatar frame — Rare | 2,000 | digital | Unlimited | — | Auto |
| Profile theme — Rare | 2,000 | digital | Unlimited | — | Auto |
| Áo phông iKame | 3,000 | merch | 30/quý | 1 cái/năm | Manual |
| Voucher trà sữa/cafe 50K | 2,500 | merch | 20/tháng | 2 lần/tháng | Manual |
| Túi tote iKame limited | 3,500 | merch | 20/quý | 1 cái/năm | Manual |
| Chọn nhạc phát văn phòng 1 ngày | 2,000 | privilege | 4/tháng | 1 lần/tháng | Manual |

#### Tier 3 — Quarterly (5,000–8,000 Coin)

| Item | Giá | Category | Stock | Giới hạn/user | Fulfillment |
|---|---|---|---|---|---|
| Nghỉ phép bonus 0.5 ngày | 5,000 | time_off | 10/quý | 1 lần/quý | Manual — P&OD duyệt |
| Hoodie iKame limited edition | 6,000 | merch | 15/quý | 1 cái/năm | Manual |
| Avatar frame — Epic | 5,000 | digital | Unlimited | — | Auto |
| Voucher ăn trưa 200K | 5,000 | merch | 10/tháng | 1 lần/tháng | Manual |
| Parking slot ưu tiên 1 tháng | 6,000 | privilege | 3/tháng | 1 lần/quý | Manual |
| Chọn chỗ ngồi ưa thích 1 tháng | 7,000 | privilege | 2/tháng | 1 lần/quý | Manual |
| Bộ quà tặng iKame (cốc + sổ + áo) | 8,000 | merch | 10/quý | 1 bộ/năm | Manual |

#### Tier 4 — Premium (10,000–20,000 Coin)

| Item | Giá | Category | Stock | Giới hạn/user | Fulfillment |
|---|---|---|---|---|---|
| Nghỉ phép bonus 1 ngày | 10,000 | time_off | 5/quý | 1 lần/năm | Manual — P&OD duyệt |
| Coffee chat 1:1 với C-level | 12,000 | experience | 2/tháng | 1 lần/năm | Manual |
| Work from anywhere 1 tuần | 15,000 | privilege | 3/quý | 1 lần/năm | Manual — Manager duyệt |
| Avatar frame — Legendary | 12,000 | digital | Unlimited | — | Auto |
| Ghế gaming / ergonomic upgrade | 18,000 | merch | 2/quý | 1 lần | Manual |
| Tai nghe chống ồn | 20,000 | merch | 2/quý | 1 lần | Manual |

#### Tier 5 — Legendary (30,000–50,000 Coin)

| Item | Giá | Category | Stock | Giới hạn/user | Fulfillment |
|---|---|---|---|---|---|
| Nghỉ phép bonus 3 ngày | 30,000 | time_off | 2/năm | 1 lần/2 năm | Manual — P&OD duyệt |
| Ăn tối nhóm 4 người do công ty sponsor | 35,000 | experience | 2/quý | 1 lần/năm | Manual |
| Khoá học bên ngoài (budget 2 triệu VNĐ) | 40,000 | experience | 5/năm | 1 lần/năm | Manual — P&OD duyệt |
| Vé sự kiện/conference do user chọn | 45,000 | experience | 2/năm | 1 lần/năm | Manual — P&OD duyệt |
| "Golden Badge" — custom badge cá nhân do user tự thiết kế | 50,000 | digital | 5/năm | 1 lần | Manual — Design team |

### 6.6 Cơ chế Chống lạm phát (Anti-Inflation System)

#### Vấn đề tiềm ẩn
Coin không reset → user tích lũy qua nhiều mùa → lượng Coin lưu hành ngày càng lớn → phần thưởng mất giá trị → mất động lực.

#### 6 cơ chế kiểm soát

**① Stock giới hạn (Supply Control)**
- Mỗi item có stock giới hạn theo tháng/quý/năm
- Hết stock = hết cơ hội → tạo urgency, khuyến khích tiêu sớm
- P&OD điều chỉnh stock theo nhu cầu thực tế

**② Giới hạn mua/user (Demand Control)**
- `max_per_user`: giới hạn tổng lần mua (VD: ghế gaming chỉ mua 1 lần)
- `max_per_period`: giới hạn theo chu kỳ (VD: nghỉ phép bonus 1 lần/quý)
- Ngăn Super Active "vét" hết item giá trị

**③ Limited Edition & Seasonal Items**
- P&OD tung item đặc biệt theo mùa/event (VD: quà Tết, kỷ niệm công ty)
- Chỉ available trong thời gian ngắn (2-4 tuần)
- Giá cao hơn item thường 20-30% → Coin sink hiệu quả
- VD: "Áo Hoodie Tết 2027 Limited" — 8,000 Coin, stock 20, chỉ bán tháng 1

**④ Coin Sink Events (Sự kiện hút Coin)**
- Tổ chức 2-4 lần/năm, trùng với event công ty
- **Đấu giá (Auction):** Item đặc biệt (VD: ăn trưa với CEO, 1 ngày làm "CEO for a day") — user đặt giá cạnh tranh, người trả cao nhất thắng → hút Coin lớn
- **Lucky Draw:** Bỏ Coin mua vé xổ số (500 Coin/vé, max 10 vé/user), phần thưởng giá trị cao → Coin bị tiêu nhưng chỉ 1 người nhận reward
- **Group Goal:** Toàn công ty cùng đóng góp Coin vào quỹ chung (VD: đạt 500,000 Coin → công ty tổ chức team building đặc biệt) → hút Coin tập thể

**⑤ Dynamic Pricing (Điều chỉnh giá linh hoạt)**
- P&OD có quyền điều chỉnh giá item qua admin panel
- Review pricing mỗi quý dựa trên:
  - Tổng Coin đang lưu hành (total_earned − total_spent across all users)
  - Tỷ lệ tiêu/kiếm trung bình
  - Item nào bán chạy/ế
- Nếu Coin lưu hành tăng quá 30% so với quý trước → tăng giá item 10-15% hoặc tung thêm Coin sink event

**⑥ Dashboard giám sát Economy**
P&OD cần dashboard real-time hiển thị:

| Metric | Mô tả | Ngưỡng cảnh báo |
|---|---|---|
| Total Coin in circulation | Tổng (earned − spent) toàn hệ thống | Tăng >30%/quý |
| Average balance/user | Coin trung bình mỗi user đang giữ | >15,000 (tức user không tiêu) |
| Spend rate | % Coin earned đã được tiêu | <50% (Coin mất giá trị) |
| Top holders | Top 10 user giữ nhiều Coin nhất | Phát hiện hoarding |
| Redemption velocity | Số lượt đổi thưởng/tuần | Giảm >20% so với tháng trước |
| Item sell-through rate | % stock đã bán/item | <30% (item không hấp dẫn) |

> **Quy tắc vàng:** Nếu Spend rate < 50% trong 2 tháng liên tiếp → P&OD cần hành động: tung limited edition, Coin sink event, hoặc thêm item mới hấp dẫn hơn.

### 6.7 Admin Panel — iReward Management

P&OD cần:
- CRUD reward items (thêm / sửa / xoá / ẩn)
- Quản lý stock và pricing (bao gồm dynamic pricing)
- Xem lịch sử redemption
- Xử lý fulfillment queue (confirm / cancel)
- Tạo Limited Edition / Seasonal items
- Tạo Coin Sink Events (Auction / Lucky Draw / Group Goal)
- Economy Dashboard (Section 6.6)

---

## 7. Achievement Badges (Hệ thống Huy hiệu)

### 7.1 Khái niệm
- Badge là huy hiệu vinh danh khi đạt các **cột mốc đặc biệt**
- Badge **không reset** — giữ vĩnh viễn, thể hiện lịch sử đóng góp
- Hiển thị trên profile, Leaderboard, và Kudos card

### 7.2 Phân loại Badge

| Loại | Điều kiện | Ví dụ |
|---|---|---|
| **Milestone** | Đạt cột mốc tích lũy | "100 ngày chấm công đúng giờ", "50 bài iWiki", "1 năm tại iKame" |
| **Season** | Thành tích cuối mùa | "Top 3 Season 2026", "Top 1 Team Season 2026" |
| **Quest** | Hoàn thành quest đặc biệt | "Hoàn thành Onboarding 100%", "30/30 Daily Quest tháng X" |
| **Culture** | Ghi nhận văn hoá | "Kudos Master — nhận 100 Kudos", "Connector — kết nối 20 đồng nghiệp" |
| **Special** | Event đặc biệt, P&OD tạo | "Người tiên phong — early adopter My iKame 2.0", "Hackathon Winner 2026" |

### 7.3 Cấu trúc Badge

| Field | Type | Mô tả |
|---|---|---|
| `badge_id` | string | ID duy nhất |
| `name` | string | Tên badge |
| `description` | string | Mô tả điều kiện đạt |
| `icon_url` | string | Ảnh badge |
| `category` | enum | milestone / season / quest / culture / special |
| `criteria` | JSON | Điều kiện tự động. `null` nếu P&OD cấp thủ công |
| `is_auto` | boolean | `true` = hệ thống tự cấp. `false` = P&OD cấp tay |
| `rarity` | enum | common / rare / epic / legendary |
| `exp_bonus` | int | EXP bonus khi nhận badge (one-time) |

### 7.4 Badge Display
- User chọn **1 badge nổi bật** (featured badge) hiển thị bên tên trên Leaderboard, Kudos, Newsfeed
- Profile hiển thị toàn bộ bộ sưu tập badge, chia theo category
- Badge chưa đạt hiển thị dạng "silhouette" + điều kiện → tạo motivation

---

## 8. Business Rules & Edge Cases

### 8.1 Anti-Abuse Rules

| Rule | Mô tả | Xử lý |
|---|---|---|
| **Self-Kudos** | Không cho phép gửi Kudos cho chính mình | Block ở UI + API validation |
| **Kudos Farming** | 2 người gửi Kudos qua lại liên tục | Cooldown 24h cho cùng 1 cặp user. Max Kudos gửi/ngày. |
| **Quest Exploit** | Hoàn thành quest bằng hành vi vô nghĩa | Criteria phải đủ cụ thể. Monitoring dashboard cho P&OD. |
| **Multi-device Checkin** | Chấm công từ nhiều thiết bị cùng lúc | Deduplicate — chỉ tính 1 lần/ngày |
| **Inactive Coin Hoarding** | User tích Coin không tiêu | Không penalty — P&OD có thể tạo limited-time offer để kích thích |

### 8.2 Edge Cases

| Case | Xử lý |
|---|---|
| **User nghỉ việc giữa mùa** | Freeze tài khoản. EXP/Level giữ nguyên cho archive. Coin balance freeze. Redemption pending → cancel + hoàn Coin. |
| **User quay lại (rehire)** | Tạo tài khoản mới, bắt đầu lại từ 0. Tài khoản cũ lưu archive. |
| **Chuyển team/phòng ban** | EXP/Coin/Badge giữ nguyên. Team Leaderboard tự cập nhật theo team mới. |
| **Thay đổi quest giữa chừng** | User đang `in_progress` giữ version cũ. User mới nhận version mới. |
| **Server downtime** | Hành động offline → queue và xử lý khi server up. EXP credited retroactively. |
| **Season transition (31/12 → 01/01)** | Batch job: snapshot → archive → reset EXP + Level. Notification tổng kết mùa cho all users. |
| **Level up nhiều level cùng lúc** | VD: nhận 100,000 EXP thâm niên → có thể nhảy nhiều level. Tất cả Coin reward của các level bị nhảy qua đều được credited. |

### 8.3 Phân quyền (RBAC)

| Role | Quyền Gamification |
|---|---|
| **Employee** | Xem EXP/Level/Coin của mình, nhận quest, claim reward, gửi Kudos, xem Leaderboard |
| **Manager** | Employee + xem Team Leaderboard, xem engagement score team |
| **P&OD / HR Admin** | Manager + CRUD Quest, CRUD Reward, cấp Badge thủ công, xem analytics toàn hệ thống, điều chỉnh config |
| **System Admin** | Full access + config hệ thống, reset mùa, data migration |

---

## 9. Data Model Overview

> **Mục đích:** Hướng dẫn dev về các entity chính và quan hệ. Đây **không phải** DB schema cuối cùng — dev thiết kế schema chi tiết dựa trên tài liệu này.

### 9.1 Core Entities

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   users      │────→│  user_exp_wallet │     │  user_coin_wallet│
│              │     │  (season_id,     │     │  (balance,       │
│              │     │   current_exp,   │     │   total_earned,  │
│              │     │   current_level, │     │   total_spent,   │
│              │     │   title)         │     │   season_earned) │
└──────┬───────┘     └──────────────────┘     └─────────────────┘
       │
       │         ┌──────────────────┐     ┌──────────────────┐
       ├────────→│  quest_progress  │────→│     quests       │
       │         │  (status,        │     │  (type, criteria,│
       │         │   progress)      │     │   exp_reward)    │
       │         └──────────────────┘     └──────────────────┘
       │
       │         ┌──────────────────┐     ┌──────────────────┐
       ├────────→│  user_badges     │────→│     badges       │
       │         │  (earned_at,     │     │  (criteria,      │
       │         │   is_featured)   │     │   rarity)        │
       │         └──────────────────┘     └──────────────────┘
       │
       │         ┌──────────────────┐     ┌──────────────────┐
       └────────→│  redemptions     │────→│  reward_items    │
                 │  (status,        │     │  (price, stock,  │
                 │   coin_spent)    │     │   category)      │
                 └──────────────────┘     └──────────────────┘

┌──────────────────┐     ┌──────────────────┐
│ exp_transactions │     │ coin_transactions│
│ (user, amount,   │     │ (user, amount,   │
│  source, action, │     │  source_type,    │
│  idempotency_key,│     │  source_id,      │
│  ts)             │     │  balance_after,  │
│                  │     │  idempotency_key,│
│                  │     │  ts)             │
└──────────────────┘     └──────────────────┘

┌──────────────────┐     ┌──────────────────┐
│  seasons         │     │ season_history   │
│ (year, start,    │     │ (user, season,   │
│  end, is_active) │     │  final_exp,      │
│                  │     │  final_level,    │
│                  │     │  final_rank,     │
│                  │     │  final_title)    │
└──────────────────┘     └──────────────────┘

┌──────────────────┐     ┌──────────────────┐
│ leaderboard_     │     │ level_thresholds │
│ snapshots        │     │ (level, exp_req, │
│ (type, period,   │     │  title,          │
│  rankings JSON)  │     │  coin_reward)    │
└──────────────────┘     └──────────────────┘

┌──────────────────┐
│ exp_action_config│
│ (action_type,    │
│  exp_amount,     │
│  daily_limit,    │
│  weekly_limit,   │
│  is_active)      │
└──────────────────┘
```

### 9.2 Key Relationships
- `user` → 1 `user_exp_wallet` per active season
- `user` → 1 `user_coin_wallet` (all-time, no reset)
- `user` → many `quest_progress` records
- `user` → many `user_badges`
- `user` → many `redemptions`
- `coin_transactions.source_type` = `level_up` / `redemption` / `refund` (chỉ 3 loại, vì Coin chỉ đến từ level up)
- `exp_transactions` và `coin_transactions` là **immutable append-only logs** — source of truth cho balance
- `leaderboard_snapshots` lưu pre-computed rankings theo chu kỳ
- `level_thresholds` và `exp_action_config` là **config tables** — PO điều chỉnh qua admin panel

### 9.3 Lưu ý cho Dev

- **Transaction log là source of truth:** Balance trong wallet là cache, luôn có thể tính lại từ transaction log.
- **Idempotency:** Mỗi action trigger cần có `idempotency_key` để tránh duplicate reward khi retry.
- **Event-driven architecture:** Nên dùng event system:
  - `action.completed` → trigger EXP credit + quest progress check
  - `exp.credited` → trigger level check
  - `level.up` → trigger Coin credit + badge check + notification
  - Tránh coupling trực tiếp giữa action handler và gamification logic.
- **Multi-level jump:** Khi user nhận EXP lớn (VD: thâm niên 300,000), có thể nhảy nhiều level cùng lúc. Logic phải iterate qua tất cả level bị nhảy và credit Coin cho từng level.
- **Config-driven:** Level thresholds, EXP per action, daily caps, Coin per level — tất cả nên là config trong DB, điều chỉnh qua admin panel.
- **Audit trail:** Mọi thay đổi config bởi admin phải có audit log (ai, khi nào, thay đổi gì).

---

## Appendix A: Glossary

| Thuật ngữ | Định nghĩa |
|---|---|
| **EXP** | Experience Points — điểm kinh nghiệm, dùng tính Level và xếp hạng Leaderboard. Reset theo mùa. |
| **iKame Coin** | Tiền tệ nội bộ, chỉ nhận khi level up, dùng đổi thưởng tại iReward Store. Không reset. |
| **Level** | Cấp độ user (1–100), tính từ EXP trong mùa hiện tại. Reset theo mùa. |
| **Title (Danh hiệu)** | Tên gọi gắn với nhóm Level (VD: Tân binh, Chiến binh,...). Reset theo mùa cùng Level. |
| **Season (Mùa)** | Chu kỳ 1 năm (01/01 — 31/12). EXP và Level reset đầu mỗi mùa. |
| **Quest** | Nhiệm vụ user cần hoàn thành để nhận EXP. |
| **Badge** | Huy hiệu vinh danh, giữ vĩnh viễn. |
| **Leaderboard** | Bảng xếp hạng theo EXP trong mùa hiện tại. |
| **iReward Store** | Cửa hàng đổi Coin lấy phần thưởng. |
| **Redemption** | Giao dịch đổi Coin lấy reward item. |
| **Fulfillment** | Quá trình P&OD giao phần thưởng thực tế cho user. |
| **Milestone Level** | Level chia hết cho 5 (5, 10, 15,...) — nhận Coin bonus lớn hơn. |
| **"Bức tường Level 50"** | Ranh giới thiết kế: Passive user max ~Level 49, chỉ Active user vượt qua. |
