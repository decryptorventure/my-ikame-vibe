import { useMemo } from 'react';
import {
  useCompleteOnboardingMutation,
  useGetMyQuestProgressQuery,
  useGetQuestsQuery,
} from '@/services/quest.service';
import { useGetMyProfileQuery } from '@/services/userProfile.service';
import type { DashboardUser, Quest } from '../types';

export function useDashboard() {
  const { data: profile, isLoading: isProfileLoading } = useGetMyProfileQuery();
  const { data: questsData, isLoading: isQuestsLoading } = useGetQuestsQuery();
  const { data: progressData, isLoading: isProgressLoading } = useGetMyQuestProgressQuery();
  const [completeOnboarding] = useCompleteOnboardingMutation();

  const user: DashboardUser = {
    name: profile?.name ?? '',
  };

  const progressMap = useMemo(
    () => new Map((progressData ?? []).map((entry) => [entry.questId, entry])),
    [progressData],
  );

  const allQuests = questsData ?? [];

  const mapToQuest = (quest: (typeof allQuests)[number]): Quest => {
    const progressEntry = progressMap.get(quest.id);

    return {
      id: quest.id,
      title: quest.title,
      expPoints: quest.expReward,
      action: quest.criteria.action,
      canComplete: quest.type === 'onboarding' && progressEntry?.status !== 'claimed',
      current: progressEntry?.progress ?? 0,
      total: quest.criteria.count,
      completed: progressEntry?.status === 'claimed',
    };
  };

  const onboardingQuests = allQuests
    .filter((q) => q.type === 'onboarding')
    .sort((a, b) => (a.criteria.sortOrder ?? 0) - (b.criteria.sortOrder ?? 0))
    .map(mapToQuest);

  const onboardingTotal = onboardingQuests.length;
  const onboardingCompleted = onboardingQuests.filter((q) => q.completed).length;
  const allOnboardingDone = onboardingCompleted === onboardingTotal && onboardingTotal > 0;

  const dailyQuests = allQuests
    .filter((q) => q.type === 'daily')
    .map(mapToQuest);
  const weeklyQuests = allQuests
    .filter((q) => q.type === 'weekly')
    .map(mapToQuest);
    
  // Combine all "other" quests but prioritize daily
  const otherQuests = [...dailyQuests, ...weeklyQuests, ...allQuests.filter(q => !['onboarding', 'daily', 'weekly'].includes(q.type)).map(mapToQuest)];

  const quests: Quest[] = useMemo(() => {
    const source = allOnboardingDone ? otherQuests : onboardingQuests;
    // Show first 4 incomplete, if not enough show completed
    const incomplete = source.filter((q) => !q.completed);
    const completed = source.filter((q) => q.completed);

    return [...incomplete, ...completed].slice(0, 4);
  }, [allOnboardingDone, onboardingQuests, otherQuests]);

  const questProgress = allOnboardingDone
    ? `${otherQuests.filter(q => q.completed).length}/${otherQuests.length}`
    : `${onboardingCompleted}/${onboardingTotal}`;
    
  const questTitle = allOnboardingDone ? 'Nhiệm vụ hàng ngày' : 'Hành trình tân thủ';

  const handleCompleteQuest = async (action: string) => {
    await completeOnboarding({ action }).unwrap();
  };

  return {
    user,
    quests,
    questProgress,
    questTitle,
    handleCompleteQuest,
    isLoading: isProfileLoading || isQuestsLoading || isProgressLoading,
  };
}
