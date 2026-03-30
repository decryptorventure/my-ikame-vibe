export interface UserStats {
  credits: number;
  level: number;
  currentXP: number;
  maxXP: number;
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  level: number;
  avatarInitials: string;
  avatarUrl?: string;
}
export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
}
