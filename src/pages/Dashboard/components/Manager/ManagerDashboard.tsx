import { UsersThreeIcon } from '@phosphor-icons/react';
import { useManagerDashboard } from '@/pages/Dashboard/hooks/useManagerDashboard';
import TeamStatsBar from './TeamStatsBar';
import MemberTable from './MemberTable/MemberTable';
import MemberDetailModal from './MemberDetailModal/MemberDetailModal';

export default function ManagerDashboard() {
  const {
    filteredMembers,
    stats,
    selectedMember,
    isModalOpen,
    activeFilter,
    searchQuery,
    sortField,
    sortOrder,
    handleMemberClick,
    handleModalClose,
    setActiveFilter,
    setSearchQuery,
    setSortField,
    toggleSortOrder,
  } = useManagerDashboard();

  return (
    <div className="flex flex-col gap-6 pb-20 w-full px-4 md:px-10 max-w-[1700px] mx-auto">
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
