import { MagnifyingGlassIcon, ArrowsDownUpIcon } from '@phosphor-icons/react';
import { EmptyState } from '@/components';
import type { TeamMember, SortField, SortOrder } from '@/pages/Dashboard/types/managerDashboard.types';
import MemberTableRow from './MemberTableRow';

interface MemberTableProps {
  members: TeamMember[];
  searchQuery: string;
  sortField: SortField;
  sortOrder: SortOrder;
  onSearchChange: (q: string) => void;
  onSortFieldChange: (f: SortField) => void;
  onToggleSortOrder: () => void;
  onMemberClick: (member: TeamMember) => void;
}

const SORT_BUTTONS: { field: SortField; label: string }[] = [
  { field: 'name', label: 'Tên' },
  { field: 'score', label: 'Điểm' },
  { field: 'pulse', label: 'AI Pulse' },
];

export default function MemberTable({
  members,
  searchQuery,
  sortField,
  sortOrder,
  onSearchChange,
  onSortFieldChange,
  onToggleSortOrder,
  onMemberClick,
}: MemberTableProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Search + sort controls */}
      <div className="flex items-center justify-between bg_canvas_secondary border border_primary radius_l p-3 gap-4">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text_tertiary"
          />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc vị trí..."
            className="w-full h-9 pl-9 pr-4 bg-transparent outline-none text-sm font-medium text_primary placeholder:text_tertiary"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-1">
          {SORT_BUTTONS.map(({ field, label }) => (
            <button
              key={field}
              className={`flex items-center gap-1.5 px-3 h-9 text-[11px] font-bold radius_m transition-all ${
                sortField === field
                  ? 'bg_canvas_tertiary text_primary'
                  : 'text_tertiary hover:bg_canvas_tertiary/50'
              }`}
              onClick={() => {
                if (sortField === field) {
                  onToggleSortOrder();
                } else {
                  onSortFieldChange(field);
                }
              }}
            >
              <ArrowsDownUpIcon size={12} />
              {label}
              {sortField === field && (
                <span className="opacity-60">{sortOrder === 'asc' ? '↑' : '↓'}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg_canvas_secondary radius_xl border border_primary shadow_sm overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[minmax(280px,1fr)_120px_160px_200px_180px_48px] gap-4 px-8 py-3 bg_canvas_tertiary/50 border-b border_primary text-[10px] font-bold text_tertiary uppercase tracking-widest">
          <div>Nhân sự & Đi làm</div>
          <div className="text-center">Level</div>
          <div className="text-center">Hoạt động</div>
          <div>Báo cáo iGoal</div>
          <div>Dự báo AI</div>
          <div />
        </div>

        {/* Rows */}
        {members.length > 0 ? (
          <div className="divide-y divide_primary">
            {members.map((member) => (
              <MemberTableRow key={member.id} member={member} onClick={onMemberClick} />
            ))}
          </div>
        ) : (
          <div className="py-12 px-8">
            <EmptyState
              title="Không tìm thấy nhân sự"
              description="Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm."
            />
          </div>
        )}
      </div>
    </div>
  );
}
