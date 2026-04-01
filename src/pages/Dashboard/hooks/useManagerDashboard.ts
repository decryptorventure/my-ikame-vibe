import { useState, useMemo } from 'react';
import { MOCK_TEAM_MEMBERS } from '@/pages/Dashboard/mock/managerDashboard.mock';
import type {
  TeamMember,
  TeamStats,
  AiPulse,
  FilterTab,
  SortField,
  SortOrder,
} from '@/pages/Dashboard/types/managerDashboard.types';

// ---------------------------------------------------------------------------
// AI Pulse rule engine — pure function, no side effects
// ---------------------------------------------------------------------------

const PULSE_SUMMARIES: Record<AiPulse, (name: string) => string> = {
  uptrend: (name) => `${name} đang duy trì phong độ cao, dự kiến hoàn thành OKR sớm hạn.`,
  stable: (name) => `${name} duy trì nhịp độ ổn định, bám sát kế hoạch đề ra.`,
  downtrend: (name) => `${name} có dấu hiệu giảm hoạt động, cần theo dõi thêm.`,
  at_risk: (name) => `${name} đang ở ngưỡng rủi ro — hoạt động thấp và vắng mặt kéo dài.`,
};

function computeAiPulse(member: TeamMember): AiPulse {
  const { total } = member.activityScore;
  const isAbsent =
    member.attendance.status === 'sick_leave' ||
    member.attendance.status === 'annual_leave' ||
    member.attendance.status === 'offline';
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const reportsThisWeek = member.recentReports.filter(
    (r) => new Date(r.submittedAt) >= weekAgo,
  ).length;

  if (isAbsent && total < 50 && reportsThisWeek === 0) return 'at_risk';
  if (total >= 80 && reportsThisWeek >= 1) return 'uptrend';
  if (total >= 60) return 'stable';
  return 'downtrend';
}

// Pulse sort order: worst-first (at_risk=0, downtrend=1, stable=2, uptrend=3)
const PULSE_ORDER: Record<AiPulse, number> = {
  at_risk: 0,
  downtrend: 1,
  stable: 2,
  uptrend: 3,
};

// ---------------------------------------------------------------------------
// Hook return type
// ---------------------------------------------------------------------------

export interface UseManagerDashboardReturn {
  filteredMembers: TeamMember[];
  stats: TeamStats;
  selectedMember: TeamMember | null;
  isModalOpen: boolean;
  activeFilter: FilterTab;
  searchQuery: string;
  sortField: SortField;
  sortOrder: SortOrder;
  handleMemberClick: (member: TeamMember) => void;
  handleModalClose: () => void;
  setActiveFilter: (tab: FilterTab) => void;
  setSearchQuery: (q: string) => void;
  setSortField: (f: SortField) => void;
  toggleSortOrder: () => void;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useManagerDashboard(): UseManagerDashboardReturn {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // Override mock aiPrediction with computed values for consistency
  const allMembers = useMemo<TeamMember[]>(() =>
    MOCK_TEAM_MEMBERS.map((m) => {
      const pulse = computeAiPulse(m);
      return {
        ...m,
        aiPrediction: {
          ...m.aiPrediction,
          pulse,
          summary: PULSE_SUMMARIES[pulse](m.name),
        },
      };
    }),
  []);

  // Stats derived from full (unfiltered) members array
  const stats = useMemo<TeamStats>(() => {
    const total = allMembers.length;
    const onlineCount = allMembers.filter((m) => m.attendance.status === 'online').length;
    const wfhCount = allMembers.filter((m) => m.attendance.status === 'wfh').length;
    const absentCount = allMembers.filter(
      (m) =>
        m.attendance.status === 'sick_leave' ||
        m.attendance.status === 'annual_leave' ||
        m.attendance.status === 'offline',
    ).length;
    const atRiskCount = allMembers.filter((m) => m.aiPrediction.pulse === 'at_risk').length;
    const averageActivityScore = Math.round(
      allMembers.reduce((sum, m) => sum + m.activityScore.total, 0) / total,
    );
    return { total, onlineCount, wfhCount, absentCount, atRiskCount, averageActivityScore };
  }, [allMembers]);

  // Filter → search → sort pipeline
  const filteredMembers = useMemo<TeamMember[]>(() => {
    let result = allMembers;

    // Filter
    if (activeFilter === 'online') {
      result = result.filter(
        (m) => m.attendance.status === 'online' || m.attendance.status === 'wfh',
      );
    } else if (activeFilter === 'offline') {
      result = result.filter(
        (m) =>
          m.attendance.status === 'sick_leave' ||
          m.attendance.status === 'annual_leave' ||
          m.attendance.status === 'offline',
      );
    } else if (activeFilter === 'at_risk') {
      result = result.filter((m) => m.aiPrediction.pulse === 'at_risk');
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.role.toLowerCase().includes(q),
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      let cmp = 0;
      if (sortField === 'name') {
        cmp = a.name.localeCompare(b.name, 'vi');
      } else if (sortField === 'score') {
        cmp = a.activityScore.total - b.activityScore.total;
      } else if (sortField === 'pulse') {
        cmp = PULSE_ORDER[a.aiPrediction.pulse] - PULSE_ORDER[b.aiPrediction.pulse];
      }
      return sortOrder === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [allMembers, activeFilter, searchQuery, sortField, sortOrder]);

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  const toggleSortOrder = () => setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'));

  return {
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
  };
}
