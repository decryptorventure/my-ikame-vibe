export type QuestCategory =
  | 'all'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'onboarding'
  | 'team_challenge'
  | 'special';

export interface QuestSection {
  id: string;
  title: string;
  progress: string;
  quests: IQuestItem[];
}

export interface IQuestItem {
  id: string;
  title: string;
  expPoints: number;
  action: string;
  canComplete: boolean;
  current: number;
  total: number;
  description?: string;
  badgeReward?: string;
  /** in_progress = doing | completed = criteria met, awaiting claim | claimed = reward taken */
  status: 'in_progress' | 'completed' | 'claimed';
  /** Computed from status for backward compatibility */
  completed: boolean;
  sortOrder: number;
}

export interface QuestBannerData {
  title: string;
  subtitle: string;
}

// ── Onboarding Journey types ──────────────────────────────────────────────────

export type MilestoneStatus = 'done' | 'active' | 'locked';

export interface OnboardingQuestItem {
  id: string;
  title: string;
  expReward: number;
  status: 'in_progress' | 'completed' | 'claimed';
  current: number;
  total: number;
  action: string;
}

export interface OnboardingMilestone {
  id: string;
  label: string;
  description: string;
  status: MilestoneStatus;
  quests: OnboardingQuestItem[];
  totalExp: number;
  completedCount: number;
  totalCount: number;
}
