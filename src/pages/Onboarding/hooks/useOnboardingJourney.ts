/**
 * Hook that maps onboarding quests into 4 ordered milestones.
 * Milestone status: done → all quests claimed, active → has in-progress quests, locked → previous not done.
 */

import { useMemo } from 'react';
import {
  useClaimQuestRewardMutation,
  useGetMyQuestProgressQuery,
  useGetQuestsQuery,
} from '@/services/quest.service';
import type { OnboardingMilestone, OnboardingQuestItem } from '../types';

// ── Milestone grouping by quest sortOrder ─────────────────────────────────────

interface MilestoneDef {
  id: string;
  label: string;
  description: string;
  sortOrders: number[];
}

const MILESTONE_DEFS: MilestoneDef[] = [
  { id: 'day-1',  label: 'Ngày đầu tiên', description: 'Làm quen với iKame và hoàn thiện hồ sơ cơ bản.', sortOrders: [1, 2, 3] },
  { id: 'week-1', label: 'Tuần đầu',       description: 'Thiết lập đầy đủ các công cụ làm việc.',         sortOrders: [4, 5, 6, 7, 8, 9, 10] },
  { id: 'month-1',label: 'Tháng đầu',      description: 'Khám phá toàn bộ hệ sinh thái iKame.',            sortOrders: [11, 12, 13] },
  { id: 'probation', label: 'Hết thử việc', description: 'Hoàn tất quá trình hội nhập chính thức.',        sortOrders: [] }, // catch-all for 14+
];

export function useOnboardingJourney() {
  const { data: questsData, isLoading: isQuestsLoading } = useGetQuestsQuery();
  const { data: progressData, isLoading: isProgressLoading } = useGetMyQuestProgressQuery();
  const [claimQuestReward, { isLoading: isClaiming }] = useClaimQuestRewardMutation();

  const progressMap = useMemo(
    () => new Map((progressData ?? []).map((p) => [p.questId, p])),
    [progressData],
  );

  const milestones: OnboardingMilestone[] = useMemo(() => {
    if (!questsData) return [];

    const onboardingQuests = questsData.filter((q) => q.type === 'onboarding');

    // Map quests into milestone buckets
    const buckets: Map<string, OnboardingQuestItem[]> = new Map(
      MILESTONE_DEFS.map((m) => [m.id, []]),
    );

    for (const quest of onboardingQuests) {
      const sortOrder = quest.criteria.sortOrder ?? 99;
      const prog = progressMap.get(quest.id);
      const rawStatus = prog?.status ?? 'in_progress';

      const item: OnboardingQuestItem = {
        id:        quest.id,
        title:     quest.title,
        expReward: quest.expReward,
        status:    rawStatus as OnboardingQuestItem['status'],
        current:   prog?.progress ?? 0,
        total:     quest.criteria.count,
        action:    quest.criteria.action,
      };

      const def = MILESTONE_DEFS.find((m) => m.sortOrders.includes(sortOrder));
      const targetId = def ? def.id : 'probation';
      buckets.get(targetId)?.push(item);
    }

    // Build milestones and compute cascade status
    let previousDone = true;

    return MILESTONE_DEFS.map((def) => {
      const quests = buckets.get(def.id) ?? [];
      const claimedCount = quests.filter((q) => q.status === 'claimed').length;
      const totalCount = quests.length;

      let status: OnboardingMilestone['status'];
      if (!previousDone) {
        status = 'locked';
      } else if (totalCount > 0 && claimedCount === totalCount) {
        status = 'done';
      } else {
        status = 'active';
      }

      previousDone = status === 'done';

      const totalExp = quests.reduce((sum, q) => sum + q.expReward, 0);

      return {
        id:             def.id,
        label:          def.label,
        description:    def.description,
        status,
        quests,
        totalExp,
        completedCount: claimedCount,
        totalCount,
      };
    }).filter((m) => m.totalCount > 0 || m.id === 'probation');
  }, [questsData, progressMap]);

  const totalCount = milestones.reduce((sum, m) => sum + m.totalCount, 0);
  const claimedCount = milestones.reduce((sum, m) => sum + m.completedCount, 0);

  const handleClaim = async (questId: string) => {
    try {
      await claimQuestReward({ questId }).unwrap();
    } catch (err) {
      console.error('Failed to claim quest reward:', err);
    }
  };

  return {
    milestones,
    totalCount,
    claimedCount,
    isClaiming,
    handleClaim,
    isLoading: isQuestsLoading || isProgressLoading,
  };
}
