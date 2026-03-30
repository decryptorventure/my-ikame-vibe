import { useMemo } from 'react';
import { useGetMyQuestProgressQuery, useGetQuestsQuery } from '@/services/quest.service';
import type { OngoingQuest } from '../types';

export function useProfileSidebar() {
  const { data: questsData, isLoading: isQuestsLoading } = useGetQuestsQuery();
  const { data: progressData, isLoading: isProgressLoading } = useGetMyQuestProgressQuery();
  const progressMap = useMemo(
    () => new Map((progressData ?? []).map((entry) => [entry.questId, entry])),
    [progressData],
  );

  const ongoingQuests: OngoingQuest[] = (questsData ?? [])
    .filter((quest) => quest.isActive && progressMap.get(quest.id)?.status !== 'claimed')
    .sort((left, right) => (left.criteria.sortOrder ?? 0) - (right.criteria.sortOrder ?? 0))
    .slice(0, 5)
    .map((quest) => {
      const progressEntry = progressMap.get(quest.id);

      return {
        id: quest.id,
        title: quest.title,
        description: quest.description,
        current: progressEntry?.progress ?? 0,
        total: quest.criteria.count,
      };
    });

  return {
    ongoingQuests,
    isLoading: isQuestsLoading || isProgressLoading,
  };
}
