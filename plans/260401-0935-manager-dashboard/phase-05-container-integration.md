---
phase: 5
title: "Container & Integration"
status: completed
effort: 30m
---

# Phase 05 — Container & Integration

## Overview

Tạo `ManagerDashboard.tsx` container, cập nhật import trong `Dashboard.tsx`, xóa 5 old components.

## Context Links

- Hook: `src/pages/Dashboard/hooks/useManagerDashboard.ts` (Phase 02)
- Components: Phase 03 + Phase 04
- Dashboard entry: `src/pages/Dashboard/Dashboard.tsx`
- Plan: `plans/260401-0935-manager-dashboard/plan.md`

## Related Code Files

**Create:**
- `src/pages/Dashboard/components/Manager/ManagerDashboard.tsx`

**Modify:**
- `src/pages/Dashboard/Dashboard.tsx` — update import line 17

**Delete:**
- `src/pages/Dashboard/components/Manager/TeamDashboard.tsx`
- `src/pages/Dashboard/components/Manager/MemberInsightModal.tsx`
- `src/pages/Dashboard/components/Manager/AlertMemberCard.tsx`
- `src/pages/Dashboard/components/Manager/ContributorCard.tsx`
- `src/pages/Dashboard/components/Manager/TeamHealthWidget.tsx`

## Implementation Steps

### Step 1 — Create `ManagerDashboard.tsx`

Container duy nhất — chỉ compose hook + components, zero business logic:

```typescript
export default function ManagerDashboard() {
  const {
    filteredMembers, stats,
    selectedMember, isModalOpen,
    activeFilter, searchQuery, sortField, sortOrder,
    handleMemberClick, handleModalClose,
    setActiveFilter, setSearchQuery,
    setSortField, toggleSortOrder,
  } = useManagerDashboard();

  return (
    <div className="flex flex-col gap-6 pb-20 w-full px-4 md:px-10 max-w-[1700px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <UsersThreeIcon size={24} weight="fill" className="text-indigo-600" />
        <h2 className="text-xl font-semibold text_primary tracking-tight">Team Management</h2>
      </div>

      <TeamStatsBar
        stats={stats}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <MemberTable
        members={filteredMembers}
        searchQuery={searchQuery}
        sortField={sortField}
        sortOrder={sortOrder}
        onSearchChange={setSearchQuery}
        onSortFieldChange={setSortField}
        onToggleSortOrder={toggleSortOrder}
        onMemberClick={handleMemberClick}
      />

      <MemberDetailModal
        open={isModalOpen}
        member={selectedMember}
        onClose={handleModalClose}
      />
    </div>
  );
}
```

Target: < 60 lines.

---

### Step 2 — Update `Dashboard.tsx`

Change line 17 only:

```typescript
// Before:
import TeamDashboard from './components/Manager/TeamDashboard';

// After:
import ManagerDashboard from './components/Manager/ManagerDashboard';
```

Change line 124:

```typescript
// Before:
const renderManagerView = () => (
  <TeamDashboard />
);

// After:
const renderManagerView = () => (
  <ManagerDashboard />
);
```

No other changes to `Dashboard.tsx`.

---

### Step 3 — Delete Old Components

Run bash commands to delete:

```bash
rm src/pages/Dashboard/components/Manager/TeamDashboard.tsx
rm src/pages/Dashboard/components/Manager/MemberInsightModal.tsx
rm src/pages/Dashboard/components/Manager/AlertMemberCard.tsx
rm src/pages/Dashboard/components/Manager/ContributorCard.tsx
rm src/pages/Dashboard/components/Manager/TeamHealthWidget.tsx
```

---

### Step 4 — TypeScript Compile Check

```bash
npx tsc --noEmit
```

Fix all type errors before marking phase complete.

---

### Step 5 — Dev Server Smoke Test

```bash
npm run dev
```

Verify:
1. Dashboard loads without console errors
2. Toggle "Team Management" button → ManagerDashboard renders
3. 5 members visible in table
4. Filter tabs work
5. Hover score → tooltip visible
6. Click row → modal opens
7. Modal shows reports + AI insight

## Todo

- [x] Create `ManagerDashboard.tsx` (< 60 lines, pure composition)
- [x] Update `Dashboard.tsx` — change import + component name (2 lines only)
- [x] Delete 5 old component files
- [x] Run `npx tsc --noEmit` — fix all errors
- [x] Smoke test dev server (5 checks above)

## Success Criteria

- `npx tsc --noEmit` exits with 0 errors
- `Dashboard.tsx` still < 200 lines after change
- No dead imports remaining
- Manager view renders correctly in browser
- All 5 old files deleted (no orphan code)
