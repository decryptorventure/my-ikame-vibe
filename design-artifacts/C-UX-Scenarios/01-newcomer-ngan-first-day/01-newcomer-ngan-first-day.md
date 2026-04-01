# 01: Newcomer Ngân's First Day

**Project:** My iKame
**Created:** 2026-03-30
**Method:** Whiteport Design Studio (WDS)

---

## Transaction (Q1)

**What this scenario covers:**
Ngân định hướng ngày đầu tiên — biết chính xác mình cần làm gì mà không cần hỏi ai

---

## Business Goal (Q2)

**Goal:** Onboarding 100% newcomer hoàn thành qua app
**Objective:** 100% newcomer complete Onboarding Journey Map trên app trước T4/2026

---

## User & Situation (Q3)

**Persona:** Newcomer Ngân (Primary)
**Situation:** Nhân sự mới tuần đầu tiên, ngồi tại bàn làm việc sáng đầu tiên đi làm, vừa nhận laptop, HR vừa dặn *"vào My iKame để xem việc cần làm hôm nay"*

---

## Driving Forces (Q4)

**Hope:** Biết ngay bước đầu tiên cần làm và cảm thấy mình đang đi đúng hướng

**Worry:** Bỏ sót bước quan trọng nào đó mà không ai báo, ảnh hưởng đến thử việc

---

## Device & Starting Point (Q5 + Q6)

**Device:** Desktop (laptop công ty)
**Entry:** HR gửi link My iKame qua email/Slack sáng ngày đầu tiên. Ngân click link trên laptop, đăng nhập lần đầu qua Keycloak SSO.

---

## Best Outcome (Q7)

**User Success:**
Hoàn thành ≥3 missions Day 1 theo đúng trình tự, có xác nhận rõ ràng từng bước

**Business Success:**
Newcomer complete onboarding có cấu trúc qua app mà không cần HR support cá nhân

---

## Shortest Path (Q8)

~~1. **Onboarding Landing** — removed: Journey Map đã chứa đủ context (tên, progress, milestone). Landing page thêm là friction.~~

1. **Journey Map** — Ngân thấy welcome header (tên + progress %) + toàn bộ journey có trình tự, mission đầu tiên được highlight
2. **Mission Detail** — Ngân click mission đầu tiên, thấy hướng dẫn + link đến tool cần làm (ví dụ: "Chấm công lần đầu trên iCheck")
3. **Mission Auto-Complete** — Sau khi iCheck ghi nhận check-in, quest tự complete + celebration + EXP reward
4. **Progress Update** — Progress bar cập nhật, bước tiếp theo hiện ra rõ ràng ✓

---

## Trigger Map Connections

**Persona:** Newcomer Ngân (Primary)

**Driving Forces Addressed:**
- ✅ **Want:** Biết rõ bước tiếp theo ngay lập tức — không phải đoán hay hỏi
- ✅ **Want:** Cảm giác tiến độ có thể nhìn thấy
- ❌ **Fear:** Sợ bỏ sót bước onboarding quan trọng mà không ai báo
- ❌ **Fear:** Sợ mất cả tuần vào setup thay vì đóng góp giá trị thật

**Business Goal:** Onboarding 100% — 100% newcomer complete onboarding qua app trước T4/2026

---

## Scenario Steps

| Step | Folder | Purpose | Exit Action |
|------|--------|---------|-------------|
| 1.1 | REMOVED | Merged vào Journey Map header (welcome + progress) | — |
| 1.2 | `1.2-journey-map/` | Welcome header + toàn bộ onboarding path, chọn mission | Click vào mission đầu tiên được highlight |
| 1.3 | `1.3-mission-detail/` | Đọc hướng dẫn, click link đến tool | Thực hiện action trên tool ngoài (iCheck) |
| 1.4 | `1.4-mission-auto-complete/` | Nhận xác nhận + reward sau khi action ghi nhận | Tự động hoặc click "Tiếp tục" |
| 1.5 | `1.5-progress-update/` | Xem progress cập nhật, biết bước tiếp theo | Scenario success ✓ |
