export interface UserProfileResponse {
  id: string;
  name: string;
  email: string;
  team_id: string;
  position_id: string;
  avatar: string;
  role_project_id: string;
  is_active: boolean;
  is_partner: boolean;
  start_date: string;
  end_date: string;
  official_date: string;
  employee_status: string;
  id_employee: string;
  created_at: string;
  updated_at: string;
  official_manager_id: string;
  work_status: string;
  team_name: string;
  position_name: string;
  bu_name: string;
  department_name: string;
  exp: number;
  level: number;
  title: string;
  seasonId: string;
  coinBalance: number;
  coinTotalEarned: number;
  coinTotalSpent: number;
  coinSeasonEarned: number;
  totalExpEarned: number;
  equipped_achievement_badge?: string;
  equipped_achievement_title?: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  level: number;
  title: string;
  totalExpEarned: number;
  name: string;
  avatar: string;
  equipped_achievement_badge?: string;
}

export interface CreateProposalPayload {
  user_id: string;
  created_by: string;
  change_fields: string;
  created_at: string;
  status: 'pending';
  requested_by_app: 'HRIS';
}
