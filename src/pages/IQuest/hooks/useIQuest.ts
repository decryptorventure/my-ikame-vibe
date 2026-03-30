import { useMemo, useState } from 'react';
import {
  useClaimQuestRewardMutation,
  useCompleteOnboardingMutation,
  useGetMyQuestProgressQuery,
  useGetQuestsQuery,
  useGetLevelConfigsQuery,
} from '@/services/quest.service';
import type { IQuestItem, QuestBannerData, QuestCategory, QuestSection } from '../types';

const TYPE_LABELS: Record<string, string> = {
  onboarding: 'Hành trình tân thủ',
  daily: 'Nhiệm vụ hàng ngày',
  weekly: 'Nhiệm vụ hàng tuần',
  monthly: 'Nhiệm vụ hàng tháng',
};

export function useIQuest() {
  const [activeCategory, setActiveCategory] = useState<QuestCategory>('all');
  const [selectedQuest, setSelectedQuest] = useState<IQuestItem | null>(null);
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);
  const [celebrationData, setCelebrationData] = useState<{ title: string; subtitle: string; exp: number } | null>(null);

  const { data: questsData, isLoading: isQuestsLoading } = useGetQuestsQuery();
  const { data: progressData, isLoading: isProgressLoading } = useGetMyQuestProgressQuery();
  const { data: _levelConfigs, isLoading: isLevelLoading } = useGetLevelConfigsQuery();

  const [completeOnboarding] = useCompleteOnboardingMutation();
  const [claimQuestReward] = useClaimQuestRewardMutation();

  const progressMap = useMemo(
    () => new Map((progressData ?? []).map((p) => [p.questId, p])),
    [progressData]
  );

  const onboardingFinished = useMemo(() => {
    if (!questsData || !progressData) return false;
    const items = questsData.filter(q => q.type === 'onboarding');
    if (items.length === 0) return false;
    return items.every(q => progressMap.get(q.id)?.status === 'claimed');
  }, [questsData, progressData, progressMap]);

  const achievementQuests = useMemo(() => {
    if (!questsData) return [];
    return questsData
      .filter((q) => q.type === 'achievement')
      .map((q) => {
        const prog = progressMap.get(q.id);
        const status = (prog?.status as IQuestItem['status']) || 'in_progress';
        return {
          id: q.id,
          title: q.title,
          description: q.description,
          expPoints: q.expReward,
          action: q.criteria.action,
          current: prog?.progress ?? 0,
          total: q.criteria.count,
          status,
          completed: status === 'claimed',
          canComplete: status === 'in_progress' && (prog?.progress ?? 0) >= q.criteria.count,
          sortOrder: q.criteria.sortOrder ?? 0,
          badgeReward: q.badgeReward || undefined,
        };
      });
  }, [questsData, progressMap]);

  const sections = useMemo(() => {
    if (!questsData) return [];

    let filtered = questsData.filter(q => q.type !== 'achievement');
    if (activeCategory !== 'all') {
      filtered = filtered.filter((q) => q.type === activeCategory);
    } else if (onboardingFinished) {
      filtered = filtered.filter((q) => q.type !== 'onboarding');
    }

    const groups: Record<string, IQuestItem[]> = {};

    filtered.forEach((q) => {
      const prog = progressMap.get(q.id);
      const status = (prog?.status as IQuestItem['status']) || 'in_progress';

      const item: IQuestItem = {
        id: q.id,
        title: q.title,
        description: q.description,
        expPoints: q.expReward,
        action: q.criteria.action,
        current: prog?.progress ?? 0,
        total: q.criteria.count,
        status,
        completed: status === 'claimed',
        canComplete: status === 'in_progress' && (prog?.progress ?? 0) >= q.criteria.count,
        sortOrder: q.criteria.sortOrder ?? 0,
        badgeReward: q.badgeReward || undefined,
      };

      if (!groups[q.type]) groups[q.type] = [];
      groups[q.type].push(item);
    });

    const result: QuestSection[] = Object.entries(groups).map(([type, quests]) => {
      const done = quests.filter(q => q.completed).length;
      return {
        id: type,
        title: TYPE_LABELS[type] ?? type,
        progress: `${done}/${quests.length}`,
        quests: quests.sort((a, b) => {
          const statusOrder = { completed: 0, in_progress: 1, claimed: 2 };
          const diff = statusOrder[a.status] - statusOrder[b.status];
          return diff !== 0 ? diff : a.sortOrder - b.sortOrder;
        }),
      };
    });

    return result.sort((a, b) => {
      const order = ['onboarding', 'daily', 'weekly', 'monthly'];
      return order.indexOf(a.id) - order.indexOf(b.id);
    });
  }, [questsData, activeCategory, onboardingFinished, progressMap]);

  const banner: QuestBannerData = useMemo(() => {
    if (onboardingFinished) {
      return {
        title: 'Chúc mừng! Bạn đã hoàn thành hành trình tân thủ 🎉',
        subtitle: 'Hãy tiếp tục hoàn thành các nhiệm vụ hàng ngày để tích lũy EXP nhé!',
      };
    }
    const ob = questsData?.filter(q => q.type === 'onboarding') || [];
    const done = ob.filter(q => progressMap.get(q.id)?.status === 'claimed').length;
    return {
      title: 'Hoàn thành quest để nhận thưởng bạn nhé',
      subtitle: onboardingFinished ? '100%' : `${done}/${ob.length} nhiệm vụ tân thủ`,
    };
  }, [onboardingFinished, questsData, progressMap]);

  const handleCompleteQuest = async (action: string) => {
    try {
      await completeOnboarding({ action }).unwrap();
    } catch (err) {
      console.error('Failed to complete quest:', err);
    }
  };

  const handleClaimReward = async (questId: string) => {
    try {
      const quest = questsData?.find(q => q.id === questId);
      await claimQuestReward({ questId }).unwrap();
      if (quest) {
        setCelebrationData({
          title: 'Nhận thưởng thành công!',
          subtitle: `Bạn vừa nhận được ${quest.expReward} EXP cho nhiệm vụ: ${quest.title}`,
          exp: quest.expReward,
        });
        setIsCelebrationOpen(true);
      }
    } catch (err) {
      console.error('Failed to claim reward:', err);
    }
  };

  const handleQuestClick = (quest: IQuestItem) => {
    setSelectedQuest(quest);
  };

  return {
    activeCategory,
    setActiveCategory,
    sections,
    banner,
    onboardingFinished,
    selectedQuest,
    setSelectedQuest,
    achievementQuests,
    handleQuestClick,
    handleCompleteQuest,
    handleClaimReward,
    isCelebrationOpen,
    setIsCelebrationOpen,
    celebrationData,
    isLoading: isQuestsLoading || isProgressLoading || isLevelLoading,
  };
}
