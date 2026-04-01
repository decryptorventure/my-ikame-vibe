# Brainstorm Report: Manager Dashboard

**Date**: 2026-04-01 | **Project**: My iKame | **Author**: Brainstorm Session

---

## Problem Statement

Manager cần 1 dashboard để nhanh chóng nắm được 4 thông tin về team direct reports:
1. Ai đi làm hôm nay, ai nghỉ và lý do (on/off status)
2. Activity score của từng nhân sự + hover để xem chi tiết breakdown
3. Recent reports mà nhân sự đã submit lên iGoal
4. AI prediction per user dựa trên activity + reports

---

## Context Codebase

- **Tech stack**: Vite + React 18 + TypeScript, `@frontend-team/ui-kit`, RTK Query, Keycloak SSO
- **Existing components** (5 cái, cần replace hoàn toàn):
  - `TeamDashboard.tsx`, `MemberInsightModal.tsx`, `AlertMemberCard.tsx`, `ContributorCard.tsx`, `TeamHealthWidget.tsx`
- **Mock data**: `src/pages/Dashboard/mock/managerDashboard.mock.ts`
- **View toggle**: `Dashboard.tsx` có `viewMode: 'employee' | 'manager'`, auto-detect qua `position_name`
- **No backend API yet** — toàn bộ dùng mock data

---

## Decisions Made

| Quyết định | Lựa chọn | Lý do |
|---|---|---|
| Scope | Chỉ thiết kế + implement UI mới | Chưa có API backend |
| Layout | Table + Detail Modal | Tối ưu scan speed cho manager |
| Team scope | Direct reports (`official_manager_id`) | Đơn giản, tránh over-fetch |
| AI Prediction | Rule-based | KISS, không cần LLM call cho MVP |

---

## Architecture Mới

### Component Structure

```
src/pages/Dashboard/components/Manager/
├── ManagerDashboard.tsx          # Container chính (< 50 lines)
├── TeamStatsBar.tsx              # Bar: online/offline/at-risk/avg score
├── MemberTable/
│   ├── MemberTable.tsx           # Table với search + filter tabs
│   ├── MemberTableRow.tsx        # Row: avatar + status + score + reports + AI pulse
│   └── ActivityScoreCell.tsx     # Score % + Radix Popover tooltip breakdown
├── MemberDetailModal/
│   ├── MemberDetailModal.tsx     # Modal shell
│   ├── ActivityBreakdownGrid.tsx # 2x2 grid: Check-in / Newsfeed / Wiki / iGoal
│   └── RecentReportsFeed.tsx     # Danh sách báo cáo iGoal
└── AiPulseBadge.tsx              # Reusable: uptrend / stable / downtrend / at_risk
```

### Hook Structure

```
src/pages/Dashboard/hooks/
└── useManagerDashboard.ts        # Business logic: filter, sort, AI compute
```

### Types

```
src/pages/Dashboard/types/
└── managerDashboard.types.ts     # TeamMember, TeamStats, AttendanceInfo, etc.
```

---

## Data Model (TypeScript)

```typescript
interface AttendanceInfo {
  status: 'online' | 'wfh' | 'sick_leave' | 'annual_leave' | 'offline';
  checkInTime?: string;    // "08:03"
  reasonLabel?: string;    // "Nghỉ ốm", "WFH", "Nghỉ phép năm"
}

interface ActivityScore {
  total: number;           // 0-100
  breakdown: {
    checkIn: number;       // 0-100
    newsfeed: number;
    wiki: number;
    iGoal: number;
  };
}

interface RecentReport {
  id: string;
  title: string;
  type: 'weekly_report' | 'okr_update' | 'goal_check_in';
  submittedAt: string;     // ISO timestamp
}

interface AiPrediction {
  pulse: 'uptrend' | 'stable' | 'downtrend' | 'at_risk';
  summary: string;         // 1-line Vietnamese
  detailedAnalysis: string;
}

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  level: number;
  attendance: AttendanceInfo;
  activityScore: ActivityScore;
  recentReports: RecentReport[];
  aiPrediction: AiPrediction;
}

interface TeamStats {
  total: number;
  onlineCount: number;
  wfhCount: number;
  absentCount: number;
  averageActivityScore: number;
  atRiskCount: number;
}
```

---

## UI Design Spec

### TeamStatsBar

```
[ 🟢 12 Online ] [ 🟡 2 WFH ] [ 🔴 1 Nghỉ ốm · 1 Nghỉ phép ] [ ⚡ 2 At Risk ] [ Avg: 78% ]
```

### MemberTable

Columns: `[Avatar + Name + Role]` | `[Status]` | `[Score (?)]` | `[Reports]` | `[AI Pulse]`

Filter tabs: `All` / `Online` / `Offline` / `At Risk`

Search: by name

Sort: Name / Score / AI Pulse

### ActivityScoreCell (hover tooltip via Radix Popover)

```
Score: 92%  ████████░░
           ↓ hover
┌─ Breakdown ─────────────────────┐
│ ✅ Check-in (iCheck)   95/100   │
│ 📣 Newsfeed            70/100   │
│ 📚 iWiki               60/100   │
│ 🎯 iGoal               80/100   │
└─────────────────────────────────┘
```

### MemberDetailModal

```
┌─────────────────────────────────────────────────────────────┐
│ [Avatar]  Nguyễn Văn An           [🟢 ONLINE · 08:03]       │
│           Frontend Dev · Lv.4     [📈 UPTREND]              │
├──────────────────────────┬──────────────────────────────────┤
│  Activity Score: 92%     │  Recent Reports (iGoal)          │
│  ████████░░              │  📄 Báo cáo tuần W14  · 2h ago   │
│                          │  📄 OKR Q1 update     · 1d ago   │
│  [Check-in: 95%]         │  📄 Goal check-in     · 3d ago   │
│  [Newsfeed: 70%]         │                                  │
│  [iWiki:    60%]         │  AI Insight: 📈 Uptrend          │
│  [iGoal:    80%]         │  "Hoạt động ổn định, commit..."  │
└──────────────────────────┴──────────────────────────────────┘
```

---

## AI Prediction Algorithm (Rule-based)

```typescript
function computeAiPrediction(member: TeamMember): AiPrediction {
  const { total } = member.activityScore;
  const reportsThisWeek = member.recentReports.filter(isThisWeek).length;
  const isAbsent = member.attendance.status === 'sick_leave' 
                || member.attendance.status === 'offline';

  let pulse: AiPulse;
  if (isAbsent && total < 50 && reportsThisWeek === 0) {
    pulse = 'at_risk';
  } else if (total >= 80 && reportsThisWeek >= 1) {
    pulse = 'uptrend';
  } else if (total >= 60) {
    pulse = 'stable';
  } else {
    pulse = 'downtrend';
  }

  return { pulse, summary: PULSE_SUMMARY_TEMPLATES[pulse](member), ... };
}
```

---

## Implementation Risks

| Risk | Mitigation |
|---|---|
| 200-line rule | Split component tree như architecture trên |
| No API → mock tốt | Mock data phải đủ realistic (5+ members, diverse statuses) |
| Radix Popover conflict | Đã dùng `@radix-ui/react-popover` trong project, không thêm thư viện mới |
| Large team (50+) | Phase 1 không cần pagination, thêm sau khi có API |

---

## Success Criteria

- [ ] Manager thấy toàn bộ team status trong < 3 giây
- [ ] Hover vào score → tooltip breakdown hiện đúng 4 metrics
- [ ] Click row → modal hiện reports + AI insight
- [ ] Filter tabs hoạt động: All / Online / Offline / At Risk
- [ ] AI pulse được compute tự động từ mock data
- [ ] Không file nào > 200 lines
- [ ] No `any` type, no relative imports

---

## Files to Delete (Old Components)

- `src/pages/Dashboard/components/Manager/TeamDashboard.tsx`
- `src/pages/Dashboard/components/Manager/MemberInsightModal.tsx`
- `src/pages/Dashboard/components/Manager/AlertMemberCard.tsx`
- `src/pages/Dashboard/components/Manager/ContributorCard.tsx`
- `src/pages/Dashboard/components/Manager/TeamHealthWidget.tsx`

---

## Next Steps

→ Invoke `/ck:plan` để tạo implementation plan chi tiết
