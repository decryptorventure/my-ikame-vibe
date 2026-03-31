/** Types for the Onboarding Journey Map page */

export type MilestoneStatus = 'done' | 'active' | 'locked';

export interface OnboardingQuestItem {
  id: string;
  title: string;
  expReward: number;
  /** 'in_progress' | 'completed' (done but unclaimed) | 'claimed' */
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
