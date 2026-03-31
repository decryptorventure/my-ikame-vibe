# Lộ trình Dự án — My iKame

## Tổng quan 4 Giai đoạn

```
GĐ1: The Foundation  →  GĐ2: The Enrichment  →  GĐ3: The Intelligence  →  GĐ4: Full Lifecycle
(MVP, core features)     (Nâng cao UX, HRIS)      (AI, Management)           (Career, Offboarding)
```

---

## Giai đoạn 1: The Foundation ✅ (MVP)

**Trụ cột**: Single Portal & Onboarding · Gamification Engine · Culture & Connection

| Tính năng | Trạng thái | Ghi chú |
|---|---|---|
| App Hub & SSO | ✅ Hoàn thành | Keycloak-js, iframe integrations |
| Onboarding WelcomeScreen (splash) | ✅ Hoàn thành | `src/pages/Onboarding/WelcomeScreen.tsx` |
| Onboarding Journey Map (4 milestones) | ✅ Hoàn thành | `src/pages/Onboarding/OnboardingJourney.tsx`, `/journey` |
| iQuest Onboarding Missions | ✅ Hoàn thành | `POST /v3/iquest/onboarding/complete` |
| Quest completed → claim flow | ✅ Hoàn thành | `status: completed` hiển thị claim button trên IQuest |
| Level & EXP System | ✅ Hoàn thành | `exp`, `level`, `title` trên UserProfile |
| iKame Coin Economy | ✅ Hoàn thành | `coinBalance`, `coinTotalEarned`, `coinSeasonEarned` |
| Leaderboard | ✅ Hoàn thành | `LeaderboardEntry`, `useLeaderboard` hook |
| Quest System (IQuest page) | ✅ Hoàn thành | `/v3/iquest/quests`, claim, progress |
| iReward Store | ✅ Hoàn thành | `src/pages/IReward/` |
| Newsfeed (Posts) | ⚠️ Một phần | `post.service.ts` — cần kiểm tra mock vs real |
| Kudos (Ghi nhận đồng nghiệp) | ⚠️ Một phần | `social.service.ts` — còn mock data |
| Milestone Celebration | ⏳ Chưa rõ | Cần kiểm tra |
| HRIS Integration (baseline) | ✅ Hoàn thành | UserProfile data từ HRIS |

**KRs GĐ1**:
- 100% nhân sự mới onboarding qua app
- > 90% nhân sự có ≥1 tương tác/tháng
- > 80% hài lòng với bản cập nhật

---

## Giai đoạn 2: The Enrichment ⏳

**Trụ cột**: Gamification nâng cao · HRIS Self-Service · AI Cấp 1

| Tính năng | Trạng thái | Ghi chú |
|---|---|---|
| Daily/Monthly Quests | ⏳ Planned | Quest types đã có, cần schedule logic |
| Team Challenges | ⏳ Planned | |
| Advanced Badges/Achievements | ⚠️ Một phần | `AchievementList` component có trong Profile |
| Personal Profile Hub | ✅ Hoàn thành | `src/pages/Profile/` |
| Attendance Insights | 🔗 Iframe | iCheck integration |
| Request & Approval | ⏳ Planned | `CreateProposalPayload` type đã có |
| Smart Notifications | ⏳ Planned | |
| Milestone Celebration (tự động) | ⏳ Planned | Birthday/anniversary: social.service mock |
| AI Content Recommendation | ⏳ Planned | |
| Connection Suggestions | ⏳ Planned | |

**KRs GĐ2**:
- MAU > 95%
- Giảm 20% câu hỏi cơ bản gửi HR
- CTR nội dung AI > 15%

---

## Giai đoạn 3: The Intelligence ⏳

**Trụ cột**: AI-Powered Experience (Cấp 2) · Management Intelligence · Full Lifecycle (OKRs)

| Tính năng | Trạng thái | Ghi chú |
|---|---|---|
| AI Chatbot "iKame Mate" (Pilot) | ⏳ Planned | |
| Sentiment Analysis | ⏳ Planned | |
| Disengagement Alert | ⏳ Planned | |
| Team Dashboard (Manager) | ⏳ Planned | |
| P&OD Analytics Dashboard | ⏳ Planned | |
| iGoal Integration (profile) | 🔗 Iframe | iGoal integration hiện tại |

**KRs GĐ3**:
- > 70% câu hỏi lặp xử lý bởi Chatbot
- P&OD dùng Sentiment Report hàng tháng
- > 80% nhân sự xác nhận app hỗ trợ theo dõi mục tiêu

---

## Giai đoạn 4: Full Lifecycle ⏳

**Trụ cột**: Full Lifecycle · Management Intelligence nâng cao

| Tính năng | Trạng thái | Ghi chú |
|---|---|---|
| iGrow & Career Path | ⏳ Planned | |
| Internal Mobility | ⏳ Planned | |
| AI job matching | ⏳ Planned | |
| Off-boarding Journey | ⏳ Planned | |
| Exit Interview | ⏳ Planned | |
| AI career recommendations | ⏳ Planned | |

**KRs GĐ4**:
- Tăng ứng tuyển nội bộ 20%
- 100% nhân sự nghỉ việc hoàn thành offboarding trên app
- Tỷ lệ hoàn thành Exit Interview > 95%

---

## Trạng thái Hiện tại (2026-03-31)

**Giai đoạn đang ở**: Hoàn thành GĐ1 Foundation Demo, chuẩn bị GĐ2

**Đã hoàn thành gần đây**:
- Migrate Lucide Icons → Phosphor Icons (2026-03-27)
- Gamification features (Level/EXP/Coin/Quest/Reward)
- Profile page với achievements + equip/de-equip badge
- Global celebrations, special achievement redesign
- **Onboarding Journey Map** (`/journey`) — 4 milestones, claim EXP flow (2026-03-31)
- **Quest completed state** — phân biệt `completed` vs `claimed`, UI claim button (2026-03-31)
- **iReward Store** đầy đủ — coin header, category filter, grid, redeem modal (2026-03-31)

**Việc cần làm tiếp theo (GĐ2)**:
- Hoàn thiện Social API (birthday/anniversary — hiện còn mock)
- Implement Daily/Monthly Quest schedule
- Personal profile: Request & Approval
- Smart notifications
- AI Content Recommendation trên Newsfeed
