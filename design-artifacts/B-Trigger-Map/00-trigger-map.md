# Trigger Map: My iKame — 3 Core Features

**Created:** 2026-03-30
**Phase:** 2 — Trigger Map
**Agent:** Saga (Analyst)
**Workshop Mode:** Ngày 2026-03-30 với Dung Nguyen Viet

---

## Documents

| # | Document | Purpose | Status |
|---|----------|---------|--------|
| 01 | [Business Goals](01-business-goals.md) | Vision, SMART objectives, prioritization | ✅ Complete |
| 02 | [Newcomer Ngân](02-newcomer-ngan.md) | Persona — Nhân sự mới (Onboarding) | ✅ Complete |
| 03 | [Employee Em](03-employee-em.md) | Persona — iKamer đang làm việc (iQuest) | ✅ Complete |
| 04 | [Manager Minh](04-manager-minh.md) | Persona — Trưởng nhóm (Team Dashboard) | ✅ Complete |

---

## Trigger Map Visualization

```mermaid
graph TD
    BG["🎯 Business Goals<br/>• Onboarding 100% (T4/2026)<br/>• Engagement > 15%<br/>• Dashboard adoption 70%"]

    APP["📱 My iKame Platform<br/>iQuest · Onboarding · Team Dashboard"]

    BG --> APP

    APP --> NG["👤 Newcomer Ngân<br/>1–90 ngày đầu"]
    APP --> EM["👤 Employee Em<br/>iKamer bình thường"]
    APP --> MM["👤 Manager Minh<br/>Trưởng nhóm"]

    NG --> NG_P["✅ Biết bước tiếp theo ngay<br/>✅ Thấy tiến độ rõ ràng<br/>✅ Cảm giác được dẫn dắt"]
    NG --> NG_N["❌ Sợ bỏ sót bước quan trọng<br/>❌ Sợ hỏi đi hỏi lại<br/>❌ Sợ mất tuần vào setup"]

    EM --> EM_P["✅ Được ghi nhận công khai<br/>✅ Thấy mình tiến bộ<br/>✅ Reward tự nhiên từ việc thật"]
    EM --> EM_N["❌ Sợ vô hình trong tổ chức<br/>❌ Ghét gamification giả tạo<br/>❌ Ghét notification spam"]

    MM --> MM_P["✅ Toàn cảnh team trong 5 phút<br/>✅ Biết ngay ai cần khen<br/>✅ Data để justify quyết định"]
    MM --> MM_N["❌ Sợ mất người vì phát hiện muộn<br/>❌ Sợ không có data khi BGĐ hỏi<br/>❌ Ghét ghép data thủ công"]

    style BG fill:#4A90D9,color:#fff
    style APP fill:#7B68EE,color:#fff
    style NG fill:#5BA85A,color:#fff
    style EM fill:#5BA85A,color:#fff
    style MM fill:#E8833A,color:#fff
    style NG_P fill:#E8F5E9
    style NG_N fill:#FFEBEE
    style EM_P fill:#E8F5E9
    style EM_N fill:#FFEBEE
    style MM_P fill:#E8F5E9
    style MM_N fill:#FFEBEE
```

---

## Strategic Focus

**Priority 1 Goal:** Onboarding 100% trước T4/2026
**Priority 1 User:** Newcomer Ngân
**Priority 1 Drivers:**
- Biết ngay bước tiếp theo (không phải đoán)
- Tiến độ visible có thể nhìn thấy
- Không sợ bỏ sót bước quan trọng

**Priority 2 Goal:** Team Dashboard adoption — BGĐ priority
**Priority 2 User:** Manager Minh
**Priority 2 Drivers:**
- Scan toàn cảnh team trong < 5 phút
- Phát hiện disengagement trước khi muộn
- Data có sẵn khi BGĐ hỏi

**Shared Infrastructure:** iQuest phục vụ cả Ngân (onboarding sequence) lẫn Em (engagement) lẫn Minh (behavior data source)

---

## Vòng lặp giá trị

```
Newcomer Ngân hoàn thành Onboarding qua iQuest
    ↓ trở thành
Employee Em dùng iQuest trong công việc hàng ngày
    ↓ tạo ra
Behavior data feed vào Team Dashboard
    ↓ giúp
Manager Minh khen đúng người, phát hiện risk sớm
    ↓ tạo ra
Môi trường được ghi nhận → Em gắn kết hơn
    ↓ quay lại
Engagement tăng → data phong phú hơn → Dashboard chính xác hơn
```

---

## Next: Phase 3 — UX Scenarios

Freya sẽ sử dụng Trigger Map này để tạo UX Scenarios cho từng persona:
- **Scenario 1:** Newcomer Ngân — Ngày đầu tiên trên My iKame
- **Scenario 2:** Employee Em — Hoàn thành quest từ hành vi thật
- **Scenario 3:** Manager Minh — Monday morning team check-in

Gọi `/freya` để bắt đầu Phase 3.
