export type SocialItemType = 'birthday' | 'anniversary';

export interface SocialTodayItem {
  id: string;
  userId: string;
  name: string;
  avatar?: string;
  type: SocialItemType;
  years?: number;
}

export interface SendWishRequest {
  targetUserId: string;
  type: SocialItemType;
  message: string;
}

export interface SendWishResponse {
  postId: string;
  expEarned: number;
}

export interface BadgeItem {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  category: 'milestone' | 'season' | 'quest' | 'culture' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt?: string;
  isFeatured?: boolean;
}

export interface UserBadgesResponse {
  badges: BadgeItem[];
  featuredBadgeId: string | null;
}
