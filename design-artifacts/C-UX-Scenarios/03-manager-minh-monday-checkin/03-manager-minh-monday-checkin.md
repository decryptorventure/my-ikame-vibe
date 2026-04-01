# 03: Manager Minh's Monday Check-In

**Project:** My iKame
**Created:** 2026-03-31
**Method:** Whiteport Design Studio (WDS)

---

## Transaction (Q1)

**What this scenario covers:**
Minh scan tình hình team đầu tuần — biết ai cần chú ý, team đang perform thế nào, có AI nhận định từ check-in reports

---

## Business Goal (Q2)

**Goal:** Team Dashboard adoption — BGĐ priority
**Objective:** 70% Manager dùng Team Dashboard ≥3x/tuần; BGĐ có data đo lường chất lượng nhân sự

---

## User & Situation (Q3)

**Persona:** Manager Minh (Primary)
**Situation:** Trưởng nhóm, sáng thứ Hai 8:00 trước khi vào weekly team meeting, mở app để chuẩn bị nắm tình hình team

---

## Driving Forces (Q4)

**Hope:** Nhìn thấy ngay ai đang làm tốt và ai đang có dấu hiệu cần chú ý — kèm AI nhận định từ check-in reports — trong < 5 phút

**Worry:** Phải click vào nhiều chỗ mới ghép được thông tin, hoặc data không đủ tin cậy để ra quyết định

---

## Device & Starting Point (Q5 + Q6)

**Device:** Mobile (check nhanh trước meeting)
**Entry:** My iKame push notification thứ Hai sáng: "Team weekly summary sẵn sàng — 2 thành viên cần chú ý". Minh tap vào notification trực tiếp vào Team Dashboard.

---

## Best Outcome (Q7)

**User Success:**
Trong 5 phút biết đủ để vào meeting tự tin — ai cần check-in, OKR tuần này thế nào, có AI nhận định công việc từng người

**Business Success:**
Minh dùng dashboard mỗi tuần → data-driven decisions → BGĐ có insight về engagement và performance toàn công ty

---

## Shortest Path (Q8)

1. **Team Dashboard** — Minh thấy 3 sections: Top contributors tuần này / Alert members (2 người) / OKR progress tổng
2. **Disengagement Alert** — Tap vào alert: xem chi tiết thành viên giảm activity + AI nhận định nguyên nhân
3. **Member Insight** — Tap vào thành viên: xem activity breakdown + AI summary từ check-in reports iGoal ✓

---

## Trigger Map Connections

**Persona:** Manager Minh (Primary)

**Driving Forces Addressed:**
- ✅ **Want:** Toàn cảnh team trong < 5 phút — không cần mở Asana/iGoal riêng
- ✅ **Want:** Phát hiện sớm dấu hiệu disengagement trước khi muộn
- ✅ **Want:** Data cụ thể để justify quyết định — AI nhận định từ check-in reports
- ❌ **Fear:** Sợ mất người vì không phát hiện kịp
- ❌ **Fear:** Ghét phải ghép data thủ công từ nhiều nguồn

**Business Goal:** Team Dashboard adoption 70% + BGĐ đo lường được chất lượng nhân sự

---

## Scenario Steps

| Step | Folder | Purpose | Exit Action |
|------|--------|---------|-------------|
| 3.1 | `3.1-team-dashboard/` | Overview: top contributors + alerts + OKR | Tap vào Disengagement Alert section |
| 3.2 | `3.2-disengagement-alert/` | Chi tiết thành viên giảm activity + AI nhận định | Tap vào tên thành viên để xem chi tiết |
| 3.3 | `3.3-member-insight/` | Activity breakdown + AI summary check-in reports | Scenario success ✓ |
