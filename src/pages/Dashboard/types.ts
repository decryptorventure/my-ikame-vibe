export interface Quest {
  id: string;
  title: string;
  expPoints: number;
  action: string;
  canComplete: boolean;
  current: number;
  total: number;
  completed: boolean;
}

export type QuestAnimationState = 'entering' | 'exiting' | 'stable';

export interface AnimatedQuest extends Quest {
  animationState: QuestAnimationState;
}

export interface DashboardUser {
  name: string;
}

export interface Post {
  id: string;
  authorId?: string;
  authorName: string;
  authorInitials: string;
  authorAvatar?: string;
  timeAgo: string;
  content: string;
  imageUrl?: string;
  likeCount: number;
  commentCount: number;
}

export interface Author {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
}

export interface Reply {
  id: string;
  author: Author;
  content: string;
  timeAgo: string;
  likeCount: number;
}

export interface Comment {
  id: string;
  author: Author;
  content: string;
  timeAgo: string;
  likeCount: number;
  replies: Reply[];
  totalReplies: number;
}

export interface PostDetail {
  id: string;
  author: Author;
  content: string;
  imageUrl?: string;
  timeAgo: string;
  likeCount: number;
  commentCount: number;
  comments: Comment[];
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  thumbnail?: string;
  content?: string;
}

export type { LeaderboardUser, UserStats } from '@/types/shared.types';
