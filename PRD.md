My iKame - Nền tảng Trải nghiệm Nhân sự Toàn diện
1. Tổng quan dự án (Project Overview)
Tóm tắt sản phẩm: My iKame là super app nội bộ với tiêu chí "Everything in App" — cổng thông tin duy nhất (Single-portal) tích hợp toàn bộ hệ sinh thái ứng dụng của iKame (iCheck, iWiki, iGoal, iGrow,...), tối ưu hóa toàn bộ vòng đời trải nghiệm nhân sự từ ngày gia nhập đến ngày kết thúc.
Vấn đề hiện trạng (Problem Space): My iKame v1.0 đã ra mắt Q1/2024 nhưng đang đối mặt với những thách thức lớn, tạo thành một "vòng lặp đi xuống":
Trải nghiệm rời rạc: iKame đang sử dụng nhiều hệ thống phân mảnh (iCheck, iGoal, iWiki,...). Nhân sự phải đăng nhập và chuyển đổi giữa nhiều ứng dụng, gây khó khăn và giảm hiệu suất.
Tỷ lệ sử dụng thấp & thiếu tương tác: Người dùng chỉ sử dụng My iKame với mục đích đơn giản là chấm công. Tỷ lệ tương tác (engagement) hiện tại dưới 10%, chưa có hoạt động tương tác và đóng góp trên app.
Chưa đạt mục đích gắn kết & văn hoá: Thiếu công cụ và cơ chế để kết nối iKamer với nhau và với công ty, thiếu nền tảng lan toả và xây dựng văn hoá.
Mục tiêu chiến lược (Business Objectives):
Xây dựng Single Portal: Biến My iKame thành cổng thông tin duy nhất, tích hợp toàn bộ hệ sinh thái ứng dụng iKame.
Tăng gắn kết nhân sự: Mức độ tương tác tăng 50% sau khi triển khai Gamification (từ dưới 10% hiện tại).
Cá nhân hoá trải nghiệm: Ứng dụng Gamification và AI để kiến tạo hành trình cá nhân hoá cho mỗi nhân viên.

2. Chân dung người dùng mục tiêu (User Personas & Core Roles)
Hệ thống tập trung vào 4 nhóm người dùng chính:
Newcomer (Nhân sự mới)
Họ là ai: Nhân viên mới gia nhập iKame, đang trong giai đoạn onboarding và hội nhập.
Nhu cầu & Kỳ vọng:
Hiểu rõ hành trình onboarding: cần làm gì, ở đâu, khi nào.
Nắm bắt nhanh văn hoá, giá trị cốt lõi, quy trình nội bộ.
Kết nối với đồng nghiệp, không cảm thấy lạc lõng.
Truy cập nhanh các hệ thống cần thiết mà không phải đăng nhập nhiều lần.
"Câu cửa miệng": "Mới vào công ty, không biết phải làm gì đầu tiên, hỏi ai, dùng app nào."
Employee (Nhân sự toàn công ty)
Họ là ai: Tất cả iKamer đang làm việc, sử dụng app hàng ngày.
Nhu cầu & Kỳ vọng:
Một nơi duy nhất để nắm bắt tin tức, thông báo, sự kiện.
Công cụ tra cứu thông tin cá nhân (ngày phép, phiếu lương, hồ sơ).
Kênh ghi nhận, cảm ơn đồng nghiệp — cảm thấy được trân trọng.
Theo dõi mục tiêu cá nhân (OKRs) và lộ trình phát triển nghề nghiệp.
Trải nghiệm app thú vị, có động lực quay lại hàng ngày.
"Câu cửa miệng": "Vào app chỉ để chấm công xong thoát, không có lý do gì để ở lại."
Manager / Leader (Quản lý)
Họ là ai: Trưởng nhóm, trưởng bộ phận, người chịu trách nhiệm quản trị team.
Nhu cầu & Kỳ vọng:
Nắm bắt tình hình team: ai đang gắn kết, ai có dấu hiệu tụt lại.
Công cụ để ghi nhận, khen thưởng thành viên kịp thời.
Dữ liệu và insight để đưa ra quyết định quản trị con người.
Cảnh báo sớm khi có vấn đề (đi muộn nhiều, thiếu tương tác, không hoàn thành mục tiêu).
"Câu cửa miệng": "Tôi không biết tình hình team đang thế nào, phải hỏi từng người một."
P&OD / HR Admin (Quản trị nhân sự)
Họ là ai: Bộ phận nhân sự, người vận hành và quản trị nền tảng.
Nhu cầu & Kỳ vọng:
Quản trị tập trung: onboarding, offboarding, thông tin nhân sự trên một nền tảng.
Giảm các câu hỏi lặp đi lặp lại từ nhân sự (ngày phép, chính sách,...).
Dữ liệu phân tích về engagement, sentiment, văn hoá tổ chức.
Công cụ truyền thông nội bộ hiệu quả.
"Câu cửa miệng": "Hàng ngày trả lời cả chục câu hỏi giống nhau, không có thời gian làm việc chiến lược."

3. Yêu cầu Chức năng Cốt lõi (Core Features)
Nỗi đau hiện tại (Pain Points)
Kỳ vọng của Người dùng
Giải pháp Sản phẩm (Trụ cột)
Hệ thống phân mảnh, phải đăng nhập nhiều app. Nhân sự mới không biết bắt đầu từ đâu.
Một cổng duy nhất, đăng nhập một lần, có hành trình onboarding rõ ràng và được hướng dẫn từng bước.
(1) Single Portal & Onboarding
App chỉ dùng để chấm công, không có lý do quay lại. Engagement < 10%.
Trải nghiệm app thú vị, có động lực tương tác hàng ngày thông qua cơ chế thưởng, xếp hạng, nhiệm vụ.
(2) Gamification Engine
Thiếu kênh gắn kết, không có nơi ghi nhận đóng góp, văn hoá lan toả yếu.
Nền tảng kết nối iKamer với nhau và với công ty, nơi ghi nhận, vinh danh và lan toả văn hoá.
(3) Culture & Connection
Nhân sự phải hỏi HR các thông tin cơ bản, không tự tra cứu được.
Tự xem thông tin cá nhân, các cột mốc được tự động ghi nhận, giảm tải cho HR.
(4) HRIS Self-Service
Manager không nắm được tình hình team, thiếu data để ra quyết định.
Công cụ phân tích, cảnh báo sớm, insight về engagement và sentiment của team.
(5) Management Intelligence
Chưa có AI hỗ trợ, nhân sự tự tìm thông tin thủ công.
Trợ lý AI trả lời 24/7, gợi ý cá nhân hoá, hỗ trợ tác vụ đơn giản.
(6) AI-Powered Experience
Không có công cụ theo dõi phát triển nghề nghiệp, offboarding thủ công.
Hiển thị career path, gợi ý phát triển, quy trình offboarding số hoá.
(7) Full Lifecycle


4. Chi tiết 7 Trụ cột Tính năng (Feature Pillars)
(1) Single Portal & Onboarding (Cổng thông tin & Hành trình Tân thủ)
Mục tiêu: Xoá bỏ trải nghiệm rời rạc, biến My iKame thành điểm truy cập duy nhất cho toàn bộ hệ sinh thái, đồng thời đảm bảo 100% nhân sự mới được hội nhập qua nền tảng.
Mô tả chi tiết: Tích hợp tất cả hệ thống nội bộ (iCheck, iGoal, iWiki, HRIS,...) vào một app duy nhất với SSO. Song song đó, xây dựng hành trình onboarding gamified giúp nhân sự mới chủ động hội nhập thay vì phụ thuộc vào HR.
Năng lực Cốt lõi (Core Capabilities):
App Hub & Single Sign-On (SSO): Đăng nhập một lần vào My iKame (web + app), tự động đăng nhập khi truy cập iCheck, iGoal, iWiki,... Không cần chuyển đổi ứng dụng.
Onboarding Journey Map: Hiển thị bản đồ hành trình onboarding trực quan cho nhân sự mới, với các mốc rõ ràng cần hoàn thành.
iQuest Onboarding Missions: Tích hợp nhiệm vụ cụ thể: cập nhật thông tin cá nhân, đọc sổ tay văn hoá, truy cập thử các ứng dụng, làm quen đồng nghiệp. Hoàn thành → thưởng EXP, iKame Coin, Huy hiệu.
Smart Home Dashboard: Trang chủ hiển thị events sắp tới, công cụ tiện ích, văn hoá & giá trị cốt lõi — tuỳ chỉnh theo vai trò và giai đoạn của user (mới/cũ).
Giá trị mang lại:
Newcomer: Hành trình rõ ràng, chủ động, không bị lạc lõng ngày đầu.
Employee: Một điểm truy cập duy nhất, tiết kiệm thời gian chuyển đổi giữa các hệ thống.
P&OD: Giảm tải onboarding thủ công, dữ liệu tracking tiến độ hội nhập.

(2) Gamification Engine (Hệ thống Động lực học)
Mục tiêu: Tạo động lực để iKamer chủ động sử dụng app và tương tác hàng ngày, nâng engagement từ <10% lên >50%.
Mô tả chi tiết: Xây dựng hệ thống "game hoá" toàn diện, áp dụng vào mọi hoạt động trên nền tảng — từ chấm công, viết bài, ghi nhận đồng nghiệp đến hoàn thành mục tiêu — tạo vòng lặp thói quen (habit loop) cho người dùng.
Năng lực Cốt lõi (Core Capabilities):
Level & EXP System: Hệ thống cấp độ (Level) và điểm kinh nghiệm (EXP), tích luỹ qua mọi hoạt động trên app.
iKame Coin Economy: Đồng coin nội bộ, nhận được khi hoàn thành nhiệm vụ, được ghi nhận, hoặc đạt milestone. Dùng để đổi thưởng tại iReward.
Leaderboard (Bảng xếp hạng): Xếp hạng cá nhân và theo team/phòng ban, cập nhật theo tuần/tháng/quý.
Daily & Monthly Quests (Nhiệm vụ): Tuyến nhiệm vụ hàng ngày/tháng: viết bài iWiki, check-in iGoal, gửi Kudos, tổ chức đào tạo nội bộ,...
Team Challenges (Cuộc thi nhóm): Các cuộc thi theo phòng ban/nhóm để thúc đẩy tinh thần đồng đội.
iReward Store (Cửa hàng đổi thưởng): Đổi Coin lấy vật phẩm phi tiền mặt (ngày nghỉ bonus, quà tặng, đặc quyền,...).
Achievement Badges (Huy hiệu): Huy hiệu chuyên sâu cho các cột mốc đặc biệt.
Giá trị mang lại:
Employee: Có lý do quay lại app mỗi ngày, trải nghiệm thú vị thay vì nghĩa vụ.
Manager: Công cụ khuyến khích team tương tác, dùng leaderboard để ghi nhận.
Tổ chức: Tăng adoption rate và engagement bền vững.

(3) Culture & Connection (Văn hoá & Kết nối)
Mục tiêu: Xây dựng môi trường kết nối iKamer với nhau và với công ty, lan toả và nuôi dưỡng văn hoá tổ chức trên nền tảng số.
Mô tả chi tiết: Tạo ra các kênh tương tác xã hội trong nội bộ — nơi iKamer ghi nhận nhau, cập nhật tin tức, chia sẻ khoảnh khắc — biến app từ công cụ hành chính thành "ngôi nhà số" của tổ chức.
Năng lực Cốt lõi (Core Capabilities):
Newsfeed: Tin tức từ P&OD, thông báo sinh nhật, kỷ niệm ngày làm việc, sự kiện công ty. Nội dung được tạo bởi cả AI Agent và biên tập viên.
Kudos (Vinh danh & Ghi nhận): Cho phép mọi iKamer gửi lời cảm ơn, ghi nhận công khai đến đồng nghiệp. Người nhận được thưởng EXP/Coin. Hiển thị trên trang "Ghi nhận" chung.
Milestone Celebration (Tự động vinh danh): Tự động thông báo và thưởng Coin cho các cột mốc: qua thử việc, kỷ niệm 1/3/5 năm làm việc.
Connection Suggestions (Gợi ý kết nối): AI gợi ý đồng nghiệp "nên làm quen" dựa trên cùng dự án (iGoal), cùng sở thích (profile), hoặc cùng thời điểm gia nhập.
Giá trị mang lại:
Employee: Cảm thấy được ghi nhận, kết nối với đồng nghiệp, gắn bó hơn với công ty.
Newcomer: Nhanh chóng hoà nhập, tìm được người kết nối.
Tổ chức: Văn hoá được lan toả tự nhiên, không phụ thuộc vào event offline.

(4) HRIS Self-Service (Tự phục vụ Nhân sự)
Mục tiêu: Cho phép nhân sự tự tra cứu và quản lý thông tin cá nhân, giảm thiểu câu hỏi lặp gửi đến P&OD.
Mô tả chi tiết: Tích hợp dữ liệu HRIS vào profile cá nhân trên My iKame, để nhân sự chủ động tra cứu thay vì phải hỏi HR.
Năng lực Cốt lõi (Core Capabilities):
Personal Profile Hub: Xem thông tin hồ sơ cá nhân: chức vụ, phòng ban, ngày vào làm, hợp đồng, ngày phép còn lại.
Attendance Insights: Thống kê cá nhân: số ngày đi muộn, lịch sử chấm công, cảnh báo.
Request & Approval (Đề xuất): Gửi đề xuất trực tiếp trên app: nghỉ phép, mua văn phòng phẩm, đề xuất khác — thay vì giấy tờ/email.
Smart Notifications (Thông báo thông minh): Nhắc nhở cá nhân hoá: sắp tới checkin, checkpoint, cảnh báo đi muộn, deadline đề xuất.
Giá trị mang lại:
Employee: Chủ động tra cứu, không phải chờ HR trả lời.
P&OD: Giảm 20%+ câu hỏi cơ bản, tập trung vào việc chiến lược.
Tổ chức: Dữ liệu nhân sự đồng bộ, chính xác, tập trung một nơi.

(5) Management Intelligence (Trí tuệ Quản trị)
Mục tiêu: Cung cấp cho Manager/Leader công cụ và dữ liệu để nắm bắt tình hình team, ra quyết định quản trị dựa trên insight thay vì cảm tính.
Mô tả chi tiết: Xây dựng bộ công cụ phân tích và cảnh báo dành riêng cho quản lý, tổng hợp dữ liệu từ nhiều nguồn (chấm công, engagement, OKRs, Kudos,...) thành insight có thể hành động ngay.
Năng lực Cốt lõi (Core Capabilities):
Team Dashboard: Bảng điều khiển tổng quan: engagement score của team, hoạt động tương tác, tiến độ OKRs, top contributor.
Disengagement Alert (Cảnh báo "Tụt hậu"): Hệ thống gửi cảnh báo riêng cho Manager khi thành viên có dấu hiệu thiếu gắn kết: ít tương tác, không hoàn thành nhiệm vụ, đi muộn liên tục.
Sentiment Analysis (Phân tích cảm xúc): AI phân tích sắc thái của Kudos, bình luận, đo lường tinh thần nhân viên theo thời gian thực. Cảnh báo khi có xu hướng tiêu cực.
P&OD Analytics Dashboard: Báo cáo tổng hợp cho HR: engagement toàn công ty, tỷ lệ onboarding hoàn thành, adoption rate, sentiment trend.
Giá trị mang lại:
Manager: Chủ động phát hiện vấn đề sớm, can thiệp kịp thời thay vì reactive.
P&OD: Dữ liệu trực quan để đưa ra chương trình cải thiện môi trường làm việc.
Tổ chức: Quản trị con người dựa trên data, không dựa trên cảm tính.

(6) AI-Powered Experience (Trải nghiệm Tăng cường bởi AI)
Mục tiêu: Biến My iKame thành trợ lý thông minh cá nhân hoá cho mỗi iKamer, giảm thiểu thao tác thủ công và tăng giá trị sử dụng app.
Mô tả chi tiết: Triển khai AI theo 2 cấp độ: (1) Gợi ý cá nhân hoá — AI thụ động đề xuất nội dung phù hợp; (2) Trợ lý chủ động — AI Chatbot có thể trả lời câu hỏi và thực hiện tác vụ.
Năng lực Cốt lõi (Core Capabilities):
AI Content Recommendation (Cấp 1 — Gợi ý): Gợi ý bài viết iWiki, khoá học nội bộ phù hợp dựa trên vai trò, phòng ban, lịch sử sử dụng. Hiển thị trên Newsfeed.
AI Chatbot — "iKame Mate" (Cấp 2 — Trợ lý): Chatbot trả lời 24/7 các câu hỏi về chính sách, quy trình, thông tin nội bộ. Hỗ trợ thực hiện tác vụ đơn giản: "Tạo giúp tôi yêu cầu mua văn phòng phẩm".
Personalized Newsfeed: Hệ thống tự động đề xuất nội dung phù hợp theo vai trò, sở thích, lịch sử tương tác.
Giá trị mang lại:
Employee: Nhận được thông tin đúng lúc, đúng nhu cầu, không bị overload.
P&OD: >70% câu hỏi lặp được xử lý bởi Chatbot, giải phóng thời gian.
Tổ chức: Tăng giá trị sử dụng app, tạo lý do để user quay lại thường xuyên.

(7) Full Lifecycle (Toàn bộ Vòng đời Nhân sự)
Mục tiêu: Hoàn thiện trải nghiệm từ phát triển nghề nghiệp đến khi rời đi, đảm bảo mọi giai đoạn đều được hỗ trợ trên nền tảng.
Mô tả chi tiết: Mở rộng My iKame sang hai mảng chưa được cover: phát triển sự nghiệp nội bộ (career growth) và quy trình nghỉ việc (offboarding) — hoàn thiện vòng đời nhân sự trên một nền tảng duy nhất.
Năng lực Cốt lõi (Core Capabilities):
iGoal Integration: Hiển thị tiến độ OKRs/iGoal cá nhân ngay trên profile. Tự động thưởng EXP/Coin khi hoàn thành mục tiêu quan trọng.
iGrow & Career Path: Hiển thị lộ trình nghề nghiệp tại iKame. AI đề xuất khoá học, nội dung phù hợp cho vị trí tiếp theo.
Internal Mobility (Cơ hội nội bộ): Mục "Cơ hội Nội bộ" — nhân viên thấy các vị trí, bài toán đang cần nhân sự. AI gợi ý vị trí phù hợp với kỹ năng.
Off-boarding Journey: Khi nghỉ việc, tài khoản chuyển sang chế độ "Off-boarding" với checklist bàn giao (thiết bị, tài liệu, tài khoản), link Exit Interview, quà chia tay khi hoàn thành.
Giá trị mang lại:
Employee: Thấy rõ con đường phát triển, có động lực gắn bó lâu dài.
P&OD: Quy trình offboarding chuyên nghiệp, thu được phản hồi giá trị, tăng ứng tuyển nội bộ.
Tổ chức: Giữ chân nhân tài tốt hơn, quy trình bàn giao không bị gián đoạn.

5. Yêu cầu Phi chức năng (Non-functional Requirements)
Hiệu năng (Performance): App load < 3 giây. AI Chatbot phản hồi < 3 giây. Push notification real-time.
Bảo mật & Phân quyền (Security & RBAC): SSO toàn hệ sinh thái. Phân quyền theo vai trò (Employee / Manager / HR Admin). AI tuân thủ nghiêm ngặt ma trận phân quyền — không trả lời thông tin user không có quyền truy cập.
Tính ổn định (Reliability): Uptime > 99.5%. Không lỗi mất dữ liệu khi submit form hay đề xuất.
Cross-platform: Hỗ trợ iOS, Android và Web với trải nghiệm nhất quán.
Data Integration: Đồng bộ real-time với HRIS, iCheck, iGoal, iWiki. Data warehouse lưu trữ hành vi người dùng phục vụ analytics.

6. Chỉ số Đo lường Thành công (Success Metrics & KPIs)
Mục tiêu Chiến lược
Chỉ số Đo lường (Metric)
Baseline hiện tại
Mục tiêu (Target)
Mức độ Sử dụng (Adoption)
Tỷ lệ nhân sự cài đặt và có ít nhất 1 tương tác/tháng
Chỉ dùng chấm công
> 90%
Mức độ Gắn kết (Engagement)
Tỷ lệ tương tác trên app (ngoài chấm công)
< 10%
Tăng 50% → > 15%
Onboarding Completion
Tỷ lệ nhân sự mới hoàn thành Onboarding qua app
0% (chưa có)
100%
HR Self-Service
Giảm câu hỏi cơ bản gửi đến P&OD
Baseline cần đo
Giảm 20%
AI Chatbot Efficiency
Tỷ lệ câu hỏi lặp được xử lý bởi Chatbot
0% (chưa có)
> 70%
Mức độ Hài lòng (Satisfaction)
Điểm hài lòng với bản cập nhật mới
Cần đo baseline
> 80%
Internal Mobility
Tỷ lệ ứng tuyển nội bộ
Baseline cần đo
Tăng 20%
Off-boarding Completion
Tỷ lệ hoàn thành off-boarding trên app
0% (chưa có)
100%


7. Lộ trình Triển khai (Implementation Roadmap)
Giai đoạn
Trụ cột SP tập trung
Tính năng (Features)
Mục tiêu & Kết quả chính (Outcome)
GĐ 1: The Foundation
- Single Portal & Onboarding - Gamification Engine - Culture & Connection
- App Hub & SSO toàn hệ sinh thái - Onboarding Journey + iQuest Missions - Level/EXP/Coin system + Leaderboard + iReward Store - Newsfeed + Kudos (Vinh danh & Ghi nhận) - Data Warehouse & HRIS Integration (baseline)
Mục tiêu: Ra mắt MVP, giải quyết vấn đề cấp bách nhất — onboarding, kết nối, và tạo động lực sử dụng app. KR: - 100% nhân sự mới onboarding qua app. - >90% nhân sự cài đặt và có ≥1 tương tác/tháng. - >80% hài lòng với bản cập nhật.
GĐ 2: The Enrichment
- Gamification Engine (nâng cao) - HRIS Self-Service - AI-Powered Experience (Cấp 1)
- Daily/Monthly Quests + Team Challenges + Advanced Badges - Personal Profile Hub + Attendance Insights + Request & Approval - Milestone Celebration tự động - AI Content Recommendation trên Newsfeed - Connection Suggestions
Mục tiêu: Làm giàu trải nghiệm, tích hợp sâu vào công việc hàng ngày, bắt đầu cá nhân hoá. KR: - MAU > 95%. - Giảm 20% câu hỏi cơ bản gửi HR. - CTR nội dung AI gợi ý > 15%.
GĐ 3: The Intelligence
- AI-Powered Experience (Cấp 2) - Management Intelligence - Full Lifecycle (OKRs)
- AI Chatbot "iKame Mate" (Pilot) - Sentiment Analysis + Disengagement Alert - Team Dashboard cho Manager - P&OD Analytics Dashboard - iGoal Integration trên profile
Mục tiêu: Biến My iKame thành trợ lý thông minh, cung cấp insight quản trị. KR: - >70% câu hỏi lặp xử lý bởi Chatbot. - P&OD sử dụng Sentiment Report hàng tháng. - >80% nhân sự xác nhận app giúp theo dõi mục tiêu tốt hơn.
GĐ 4: The Full Lifecycle
- Full Lifecycle - Management Intelligence (nâng cao)
- iGrow & Career Path display - Internal Mobility (Cơ hội nội bộ) + AI job matching - Off-boarding Journey + Exit Interview - AI-powered career recommendations
Mục tiêu: Hoàn thiện vòng đời nhân sự, từ phát triển sự nghiệp đến offboarding chuyên nghiệp. KR: - Tăng ứng tuyển nội bộ 20%. - 100% nhân sự nghỉ việc hoàn thành offboarding trên app. - Tỷ lệ hoàn thành Exit Interview > 95%.


