# Tổng quan Sản phẩm — My iKame

## 1. Tầm nhìn & Mục tiêu

**My iKame** là super app nội bộ với tiêu chí _"Everything in App"_ — cổng thông tin duy nhất (Single Portal) tích hợp toàn bộ hệ sinh thái ứng dụng iKame (iCheck, iWiki, iGoal, iGrow,...), tối ưu hóa toàn bộ vòng đời trải nghiệm nhân sự từ ngày gia nhập đến ngày kết thúc.

### Vấn đề hiện trạng

- **Trải nghiệm rời rạc**: Nhiều hệ thống phân mảnh, phải đăng nhập nhiều lần
- **Engagement thấp**: Tỷ lệ tương tác < 10%, chỉ dùng để chấm công
- **Thiếu gắn kết văn hoá**: Không có cơ chế kết nối iKamer với nhau và công ty

### Mục tiêu chiến lược

| Mục tiêu | Mô tả |
|---|---|
| Single Portal | Biến My iKame thành điểm truy cập duy nhất |
| Tăng engagement | Tăng 50% tương tác (từ < 10% hiện tại) |
| Cá nhân hoá | Áp dụng Gamification + AI cho hành trình cá nhân |

---

## 2. User Personas

### Newcomer (Nhân sự mới)
- Nhân viên mới trong giai đoạn onboarding
- **Nhu cầu**: Hành trình rõ ràng, kết nối đồng nghiệp, truy cập nhanh hệ thống
- **Pain point**: _"Mới vào công ty, không biết phải làm gì đầu tiên"_

### Employee (Nhân sự toàn công ty)
- Tất cả iKamer đang làm việc
- **Nhu cầu**: Một nơi tin tức/sự kiện, tra cứu thông tin cá nhân, ghi nhận đồng nghiệp
- **Pain point**: _"Vào app chỉ để chấm công xong thoát"_

### Manager / Leader (Quản lý)
- Trưởng nhóm/bộ phận
- **Nhu cầu**: Tình hình team, công cụ khen thưởng, insight để ra quyết định
- **Pain point**: _"Không biết tình hình team đang thế nào"_

### P&OD / HR Admin (Quản trị nhân sự)
- Bộ phận nhân sự, vận hành nền tảng
- **Nhu cầu**: Quản trị tập trung, giảm câu hỏi lặp, analytics engagement
- **Pain point**: _"Hàng ngày trả lời cả chục câu hỏi giống nhau"_

---

## 3. 7 Trụ cột Tính năng

### (1) Single Portal & Onboarding
- **App Hub & SSO**: Đăng nhập một lần, tự động vào iCheck/iGoal/iWiki
- **Onboarding Journey Map**: Bản đồ hành trình trực quan cho nhân sự mới
- **iQuest Onboarding Missions**: Nhiệm vụ onboarding → thưởng EXP/Coin/Huy hiệu
- **Smart Home Dashboard**: Trang chủ tùy chỉnh theo vai trò và giai đoạn user

### (2) Gamification Engine
- **Level & EXP System**: Tích luỹ EXP qua mọi hoạt động
- **iKame Coin Economy**: Đồng coin nội bộ, đổi thưởng tại iReward
- **Leaderboard**: Xếp hạng cá nhân/team theo tuần/tháng/quý
- **Daily & Monthly Quests**: Nhiệm vụ hàng ngày/tháng
- **Team Challenges**: Cuộc thi theo phòng ban
- **iReward Store**: Đổi Coin lấy vật phẩm phi tiền mặt
- **Achievement Badges**: Huy hiệu cột mốc đặc biệt

### (3) Culture & Connection
- **Newsfeed**: Tin tức P&OD, sinh nhật, kỷ niệm ngày làm việc
- **Kudos**: Gửi lời cảm ơn/ghi nhận công khai, nhận EXP/Coin
- **Milestone Celebration**: Tự động vinh danh qua thử việc, kỷ niệm 1/3/5 năm
- **Connection Suggestions**: AI gợi ý đồng nghiệp nên làm quen

### (4) HRIS Self-Service
- **Personal Profile Hub**: Hồ sơ cá nhân, ngày phép, hợp đồng
- **Attendance Insights**: Thống kê chấm công, cảnh báo đi muộn
- **Request & Approval**: Gửi đề xuất nghỉ phép, mua sắm trên app
- **Smart Notifications**: Nhắc nhở cá nhân hoá

### (5) Management Intelligence
- **Team Dashboard**: Tổng quan engagement, OKRs, top contributor
- **Disengagement Alert**: Cảnh báo thành viên có dấu hiệu tụt hậu
- **Sentiment Analysis**: AI phân tích sắc thái Kudos/bình luận
- **P&OD Analytics Dashboard**: Báo cáo tổng hợp cho HR

### (6) AI-Powered Experience
- **AI Content Recommendation**: Gợi ý iWiki, khoá học theo vai trò
- **iKame Mate (Chatbot)**: Trả lời 24/7 câu hỏi nội bộ, thực hiện tác vụ
- **Personalized Newsfeed**: Nội dung phù hợp theo sở thích/lịch sử

### (7) Full Lifecycle
- **iGoal Integration**: Tiến độ OKRs trên profile, thưởng khi hoàn thành
- **iGrow & Career Path**: Lộ trình nghề nghiệp, AI đề xuất khoá học
- **Internal Mobility**: Cơ hội nội bộ, AI gợi ý vị trí phù hợp
- **Off-boarding Journey**: Checklist bàn giao, Exit Interview, quà chia tay

---

## 4. Yêu cầu Phi chức năng

| Danh mục | Yêu cầu |
|---|---|
| Performance | App load < 3s, Chatbot phản hồi < 3s, Push notification real-time |
| Security | SSO toàn hệ sinh thái, RBAC theo vai trò, AI tuân thủ phân quyền |
| Reliability | Uptime > 99.5%, không mất dữ liệu khi submit |
| Cross-platform | iOS, Android, Web nhất quán |
| Data Integration | Đồng bộ real-time với HRIS/iCheck/iGoal/iWiki, Data Warehouse |

---

## 5. KPIs & Success Metrics

| Mục tiêu | Metric | Baseline | Target |
|---|---|---|---|
| Adoption | Nhân sự có ≥1 tương tác/tháng | Chỉ chấm công | > 90% |
| Engagement | Tương tác ngoài chấm công | < 10% | > 15% (+50%) |
| Onboarding | Hoàn thành onboarding qua app | 0% | 100% |
| HR Self-Service | Giảm câu hỏi cơ bản đến P&OD | Baseline | -20% |
| AI Chatbot | Câu hỏi lặp xử lý bởi Chatbot | 0% | > 70% |
| Satisfaction | Điểm hài lòng bản cập nhật | - | > 80% |
| Internal Mobility | Tỷ lệ ứng tuyển nội bộ | Baseline | +20% |
| Off-boarding | Hoàn thành off-boarding trên app | 0% | 100% |
