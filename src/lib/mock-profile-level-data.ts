/**
 * Mock profile, leaderboard, and level config data.
 */

import type { UserProfileResponse, LeaderboardEntry } from '@/types/userProfile.types';
import type { LevelConfigResponse } from '@/types/quest.types';

// ─── Leveling Logic ───────────────────────────────────────────────────────────

export const MOCK_LEVEL_CONFIGS: LevelConfigResponse[] = [
  { id: 'lv-1',  level: 1,  totalExpRequired: 0,     expDelta: 0,    title: 'Tân binh',  coinReward: 0,   createdAt: '', updatedAt: '' },
  { id: 'lv-2',  level: 2,  totalExpRequired: 1000,  expDelta: 1000, title: 'Tân binh',  coinReward: 30,  createdAt: '', updatedAt: '' },
  { id: 'lv-3',  level: 3,  totalExpRequired: 2828,  expDelta: 1828, title: 'Tân binh',  coinReward: 30,  createdAt: '', updatedAt: '' },
  { id: 'lv-4',  level: 4,  totalExpRequired: 5196,  expDelta: 2368, title: 'Tân binh',  coinReward: 30,  createdAt: '', updatedAt: '' },
  { id: 'lv-5',  level: 5,  totalExpRequired: 8000,  expDelta: 2804, title: 'Tân binh',  coinReward: 100, createdAt: '', updatedAt: '' },
  { id: 'lv-10', level: 10, totalExpRequired: 27000, expDelta: 4373, title: 'Khám phá',  coinReward: 250, createdAt: '', updatedAt: '' },
  { id: 'lv-15', level: 15, totalExpRequired: 52383, expDelta: 5511, title: 'Khám phá',  coinReward: 400, createdAt: '', updatedAt: '' },
];

function calculateLevel(exp: number) {
  const configs = [...MOCK_LEVEL_CONFIGS].sort((a, b) => b.level - a.level);
  const matched = configs.find(c => exp >= c.totalExpRequired);
  return matched ? matched.level : 1;
}

// ─── User Profile Personas ────────────────────────────────────────────────────

const PERSONA_DEFAULTS: Record<string, any> = {
  newcomer: {
    id: 'user-new-01',
    name: 'Tân binh iKame',
    email: 'newbie@ikameglobal.com',
    role_project_id: 'member',
    employee_status: 'newcomer',
    team_name: 'Frontend Team',
    position_name: 'Junior Developer',
    exp: 0,
  },
  member: {
    id: 'user-001',
    name: 'Nguyen Van Dung',
    email: 'dungnv@ikameglobal.com',
    team_id: 'team-fe-001',
    position_id: 'pos-001',
    role_project_id: 'member',
    employee_status: 'official',
    id_employee: 'IKM-0042',
    team_name: 'Frontend Team',
    position_name: 'Software Engineer',
    exp: 0, // Default to 0 for demo fresh start
  },
  manager: {
    id: 'user-mgr-01',
    name: 'Tran Thi Lan',
    email: 'lantt@ikameglobal.com',
    role_project_id: 'manager',
    team_name: 'Frontend Team',
    position_name: 'Team Lead',
    exp: 38000,
  },
  admin: {
    id: 'user-admin-01',
    name: 'HR Admin',
    email: 'hr@ikameglobal.com',
    role_project_id: 'admin',
    team_name: 'P&OD',
    position_name: 'HR Director',
    exp: 250000,
  },
};

export function getMockProfile(): UserProfileResponse {
  if (typeof window === 'undefined') return { ...PERSONA_DEFAULTS.member, level: 1 };
  
  const personaKey = localStorage.getItem('demoPersona') || 'member';
  const data = PERSONA_DEFAULTS[personaKey] || PERSONA_DEFAULTS.member;
  
  // Dynamic EXP from storage
  const savedExp = localStorage.getItem(`demoExp_${personaKey}`);
  const exp = savedExp !== null ? parseInt(savedExp, 10) : data.exp;
  const level = calculateLevel(exp);

  return {
    ...data,
    avatar: '',
    is_active: true,
    is_partner: false,
    start_date: '2023-01-15T00:00:00.000Z',
    official_date: '2023-04-15T00:00:00.000Z',
    work_status: 'active',
    bu_name: 'Product & Technology',
    department_name: 'Technology',
    seasonId: 'season-2026',
    coinBalance: 240,
    coinTotalEarned: 580,
    coinSeasonEarned: 190,
    exp,
    level,
    title: exp > 50000 ? 'Huyền thoại' : exp > 20000 ? 'Khám phá' : 'Tân binh',
    totalExpEarned: exp,
  } as UserProfileResponse;
}

export function updateMockExp(amount: number) {
  const personaKey = localStorage.getItem('demoPersona') || 'member';
  const profile = getMockProfile();
  const newExp = (profile.exp ?? 0) + amount;
  localStorage.setItem(`demoExp_${personaKey}`, newExp.toString());
}

// ─── Leaderboard ──────────────────────────────────────────────────────────────

export const MOCK_LEADERBOARD_ENTRIES: LeaderboardEntry[] = [
  { rank: 1,  userId: 'user-lb-01', name: 'Tran Thi Lan',      level: 12, title: 'Khám phá', totalExpEarned: 38000, avatar: '' },
  { rank: 2,  userId: 'user-lb-02', name: 'Pham Minh Đức',     level: 10, title: 'Khám phá', totalExpEarned: 27500, avatar: '' },
  { rank: 3,  userId: 'user-lb-03', name: 'Le Thi Hoa',        level: 9,  title: 'Tân binh', totalExpEarned: 23000, avatar: '' },
  { rank: 4,  userId: 'user-lb-04', name: 'Nguyen Quoc Bao',   level: 8,  title: 'Tân binh', totalExpEarned: 19000, avatar: '' },
  { rank: 5,  userId: 'user-lb-05', name: 'Vo Thi Mai',        level: 8,  title: 'Tân binh', totalExpEarned: 18700, avatar: '' },
  { rank: 6,  userId: 'user-001',   name: 'Nguyen Van Dung',   level: 1,  title: 'Tân binh', totalExpEarned: 0,     avatar: '' },
  { rank: 10, userId: 'user-lb-10', name: 'Ngo Thi Phuong',    level: 1,  title: 'Tân binh', totalExpEarned: 50,    avatar: '' },
];
