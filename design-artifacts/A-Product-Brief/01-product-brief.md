# Product Brief: My iKame — 3 Core Features

> Strategic foundation cho iQuest/Gamification, Onboarding Journey, và Team Dashboard.

**Created:** 2026-03-30
**Phase:** 1 — Product Brief
**Agent:** Saga (Analyst)
**Scope:** 3 features: iQuest, Onboarding, Team Dashboard

---

## 1. Tại sao sản phẩm này tồn tại?

**My iKame** là super app nội bộ của iKame Group — cổng thông tin duy nhất (Single Portal) tích hợp toàn bộ hệ sinh thái (iCheck, iGoal, iWiki, Asana,...).

### Vấn đề cốt lõi cần giải quyết

| Feature | Pain Point hiện tại |
|---|---|
| **Onboarding** | Nhân sự mới ngày đầu nhận hàng chục task trên Asana, nhiều link tool, không có trình tự rõ ràng → cảm giác "loạn" và không biết mình đang đúng hay sai |
| **iQuest/Gamification** | Engagement < 10% — người dùng chỉ vào chấm công rồi thoát. Không có cơ chế kéo người dùng tương tác với các hoạt động có giá trị |
| **Team Dashboard** | Manager phải mở Asana + iGoal + nhắn tin từng người để biết tình hình team. Không có 1 nơi tổng hợp để đưa ra quyết định |

### Tầm nhìn

> Giúp mọi iKamer làm việc hiệu quả hơn, được ghi nhận xứng đáng, và gắn kết với văn hóa công ty — tất cả trong một nơi duy nhất.

*(Nguồn: BGĐ — chị Nguyệt: "mục tiêu lớn nhất là để iKamer làm việc hiệu quả, tạo ra giá trị, được ghi nhận")*

---

## 2. Ba features trong scope

### Feature A: Onboarding Journey (Ưu tiên #1 — deadline cuối T4/2026)

**Vấn đề:** Nhân sự mới bị overwhelmed ngay ngày đầu. Quá nhiều thứ đổ vào cùng lúc, không có trình tự, không có checkpoint để biết mình đang đúng không.

**Giải pháp:** Biến quá trình onboarding thành journey có map rõ ràng — mỗi bước là 1 mission với trạng thái hoàn thành cụ thể. Newcomer luôn biết: "Tôi đang ở đây, bước tiếp theo là gì."

**Cơ chế:** iQuest tự động ghi nhận khi newcomer hoàn thành các bước (setup iCheck, đăng nhập iGoal, đọc tài liệu iWiki,...) → mission tự complete → progress bar tiến lên.

### Feature B: iQuest / Gamification

**Vấn đề:** Không có lý do để mở app ngoài chấm công.

**Giải pháp:** iQuest là lớp behavior tracking phủ lên tất cả hành vi có giá trị thật:
- Chấm công trên iCheck → quest "Chấm công đúng giờ" complete
- Viết bài trên iWiki → quest "Đóng góp tri thức" complete
- Check-in report trên iGoal → quest "Cập nhật tiến độ" complete
- Chúc mừng sinh nhật/thâm niên đồng nghiệp → quest "Kết nối đồng đội" complete

**Thiết kế chống reward inflation:** Quest gắn với hành vi có giá trị thật (không phải click ảo). EXP/Coin chỉ được trao khi action thật được hệ thống nguồn xác nhận.

### Feature C: Team Dashboard (Ưu tiên BGĐ)

**Vấn đề:** Manager không có visibility về team. Phải "lắp ghép" thủ công từ nhiều nguồn.

**Giải pháp:** Dashboard tổng hợp data từ Asana + iGoal + iCheck + My iKame activity → 1 màn hình duy nhất phục vụ 3 quyết định:
1. **"Tuần này tôi nên khen ai?"** — Top contributors, recent achievements
2. **"Ai đang có dấu hiệu disengagement?"** — Activity drop alerts
3. **"Team tôi đang perform thế nào so với OKR?"** — iGoal progress overview

---

## 3. Target Users

| Persona | Mô tả | Feature chính |
|---|---|---|
| **Newcomer** | Nhân sự mới, 1-90 ngày đầu | Onboarding + iQuest |
| **Employee** | Tất cả iKamer đang làm việc | iQuest/Gamification |
| **Manager** | Trưởng nhóm/bộ phận | Team Dashboard |

---

## 4. Success Metrics

| Feature | Metric | Target |
|---|---|---|
| Onboarding | % newcomer hoàn thành onboarding qua app | 100% (cuối T4/2026) |
| iQuest | Engagement ngoài chấm công | > 15% (từ < 10%) |
| Team Dashboard | % Manager sử dụng dashboard ≥3x/tuần | > 70% |
| Overall | iKamer có ≥1 tương tác ngoài chấm công/tháng | > 90% |

---

## 5. Platform & Constraints

**Platform:** Web (primary), iOS/Android (secondary)
**Tech Stack:** Vite + React 18 + TypeScript, RTK Query, Keycloak SSO
**Integrations bắt buộc:** iCheck (chấm công), iGoal (OKR), iWiki (knowledge), Asana (tasks)

**Constraint quan trọng:**
- Gamification KHÔNG được tạo ra hành vi giả tạo → reward chỉ gắn với action thật từ hệ thống nguồn
- Dashboard phải load nhanh (< 3s) — Manager dùng để scan nhanh, không phải phân tích sâu
- Onboarding phải hoàn thành MVP trước cuối tháng 4/2026

---

*Product Brief này dựa trên workshop discovery ngày 2026-03-30*
*Nguồn: docs/project-overview-pdr.md + session discovery với Dung Nguyen Viet*
