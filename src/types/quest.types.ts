export interface QuestCriteria {
  action: string;
  count: number;
  sortOrder?: number;
  rarity?: string;
  suggestedPhase?: string;
}

export interface QuestResponse {
  id: string;
  title: string;
  description: string;
  type: string;
  criteria: QuestCriteria;
  targetPersona: string[];
  expReward: number;
  badgeReward: string | null;
  startDate: string;
  endDate: string | null;
  maxCompletions: number;
  isActive: boolean;
  status: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CriteriaAction {
  value: string;
  label: string;
}

export interface LevelConfigResponse {
  id: string;
  level: number;
  totalExpRequired: number;
  expDelta: number;
  title: string;
  coinReward: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuestProgressEntry {
  questId: string;
  progress: number;
  status: string;
  target: number;
}
