# 02: Employee Em's Quest Auto-Complete

**Project:** My iKame
**Created:** 2026-03-31
**Method:** Whiteport Design Studio (WDS)

---

## Transaction (Q1)

**What this scenario covers:**
Em hoàn thành quest tự động sau khi thực hiện hành vi thật — nhận ghi nhận mà không cần làm thêm gì

---

## Business Goal (Q2)

**Goal:** Tăng engagement ngoài chấm công
**Objective:** Engagement ngoài chấm công tăng từ < 10% lên > 15% trong Q2/2026

---

## User & Situation (Q3)

**Persona:** Employee Em (Primary)
**Situation:** iKamer đang làm việc bình thường, vừa chấm công xong trên iCheck lúc 8:30 sáng, đang chuẩn bị mở app tiếp tục công việc

---

## Driving Forces (Q4)

**Hope:** Thấy hành động hàng ngày của mình được ghi nhận — dù nhỏ cũng được thấy

**Worry:** App push notification vô nghĩa làm phiền, hoặc quest chỉ là click ảo không có giá trị thật

---

## Device & Starting Point (Q5 + Q6)

**Device:** Mobile (điện thoại cá nhân)
**Entry:** Em chấm công trên iCheck → My iKame nhận webhook từ iCheck → push notification "Quest hoàn thành: Chấm công đúng giờ! +50 EXP" → Em tap vào notification.

---

## Best Outcome (Q7)

**User Success:**
Thấy quest auto-complete + EXP tăng + streak duy trì mà không cần làm thêm bước nào

**Business Success:**
Em có lý do cảm xúc để mở app hàng ngày → DAU tăng → engagement metric > 15%

---

## Shortest Path (Q8)

1. **Quest Notification** — Em nhận push notification "Quest hoàn thành!" với EXP reward, tap vào
2. **Quest Celebration** — Màn hình celebration: quest name, EXP earned, streak count, level progress
3. **Quest List** — Em thấy danh sách quests hôm nay: đã complete + còn pending
4. **Home Dashboard** — Em quay về home, thấy EXP bar đã cập nhật, biết mình đang ở level nào ✓

---

## Trigger Map Connections

**Persona:** Employee Em (Primary)

**Driving Forces Addressed:**
- ✅ **Want:** Được ghi nhận công khai khi làm tốt — dù là hành động nhỏ hàng ngày
- ✅ **Want:** Reward tự nhiên từ việc thật — không phải click ảo
- ✅ **Want:** Thấy mình tiến bộ có thể đo lường (EXP, level, streak)
- ❌ **Fear:** Ghét gamification giả tạo — quest phải gắn với việc thật
- ❌ **Fear:** Ghét notification spam — chỉ notify khi có giá trị thật

**Business Goal:** Engagement > 15% — Em mở app hàng ngày vì có lý do cảm xúc thật

---

## Scenario Steps

| Step | Folder | Purpose | Exit Action |
|------|--------|---------|-------------|
| 2.1 | `2.1-quest-notification/` | Nhận push notification có giá trị, quyết định tap | Tap vào notification |
| 2.2 | `2.2-quest-celebration/` | Thấy celebration + EXP reward + streak | Tap "Xem tất cả quests" hoặc swipe dismiss |
| 2.3 | `2.3-quest-list/` | Xem danh sách quests hôm nay, biết còn gì pending | Tap "Về trang chủ" |
| 2.4 | `2.4-home-dashboard/` | Thấy EXP bar cập nhật, level progress visible | Scenario success ✓ |
