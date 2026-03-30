export interface ProfileUser {
  id: string;
  name: string;
  jobTitle: string;
  avatarUrl?: string;
  avatarInitials: string;
  email: string;
  department: string;
  team?: string;
  joinDate?: string;
  employeeId?: string;
  officialDate?: string;
}

export interface ProfileStatItem {
  id: string;
  icon: 'flame' | 'lightning' | 'heart' | 'star';
  value: string;
  label: string;
  progress?: {
    current: number;
    max: number;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  badgeUrl?: string;
  current: number;
  total: number;
}

export interface OngoingQuest {
  id: string;
  title: string;
  description: string;
  badgeUrl?: string;
  current: number;
  total: number;
}
