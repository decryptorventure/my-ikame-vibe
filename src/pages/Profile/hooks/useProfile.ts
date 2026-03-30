import { useGetLevelConfigsQuery, useGetMyQuestProgressQuery, useGetQuestsQuery } from '@/services/quest.service';
import { useEquipAchievementMutation, useGetMyProfileQuery } from '@/services/userProfile.service';
import { getInitials } from '@/utils/getInitials';
import { getLevelProgress } from '@/utils/getLevelProgress';
import type { Achievement, ProfileStatItem, ProfileUser } from '@/pages/Profile/types';
import { useState, useMemo } from 'react';

export function useProfile() {
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);
  const { data: profile, isLoading: isProfileLoading } = useGetMyProfileQuery();
  const { data: levelConfigs, isLoading: isLevelConfigsLoading } = useGetLevelConfigsQuery();
  const { data: questsData, isLoading: isQuestsLoading } = useGetQuestsQuery();
  const { data: progressData, isLoading: isProgressLoading } = useGetMyQuestProgressQuery();
  
  const [equipAchievement] = useEquipAchievementMutation();

  const toggleInfoExpanded = () => {
    setIsInfoExpanded((current) => !current);
  };

  const user: ProfileUser = {
    id: profile?.id ?? '',
    name: profile?.name ?? '',
    jobTitle: profile?.position_name ?? '',
    avatarInitials: getInitials(profile?.name ?? ''),
    avatarUrl: profile?.avatar,
    email: profile?.email ?? '',
    department: profile?.bu_name ?? '',
    team: profile?.team_name,
    employeeId: profile?.id_employee || undefined,
    equippedBadge: profile?.equipped_achievement_badge,
    joinDate: profile?.start_date ? new Date(profile.start_date).toLocaleDateString('vi-VN') : undefined,
    officialDate: profile?.official_date
      ? new Date(profile.official_date).toLocaleDateString('vi-VN')
      : undefined,
  };

  const startDate = profile?.start_date ? new Date(profile.start_date) : null;
  const loyaltyDays = startDate
    ? Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const levelProgress = levelConfigs && levelConfigs.length > 0
    ? getLevelProgress(profile?.exp ?? 0, levelConfigs)
    : { level: profile?.level ?? 1, currentXP: 0, maxXP: 1000 };

  const progressMap = useMemo(
    () => new Map((progressData ?? []).map((p) => [p.questId, p])),
    [progressData]
  );

  const achievements: Achievement[] = useMemo(() => {
    if (!questsData) return [];
    return questsData
      .filter((q) => q.type === 'achievement')
      .map((q) => {
        const prog = progressMap.get(q.id);
        const isClaimed = prog?.status === 'claimed';
        return {
          id: q.id,
          title: q.title,
          description: q.description,
          badgeUrl: q.badgeReward || undefined,
          current: prog?.progress ?? 0,
          total: q.criteria.count,
          status: (prog?.status as any) || 'in_progress',
          canEquip: isClaimed,
          isEquipped: profile?.equipped_achievement_badge === q.badgeReward,
        };
      });
  }, [questsData, progressMap, profile?.equipped_achievement_badge]);

  const stats: ProfileStatItem[] = [
    { id: 'credits', icon: 'flame', value: String(profile?.coinBalance ?? 0), label: 'Điểm credits' },
    {
      id: 'level',
      icon: 'lightning',
      value: `Lv.${levelProgress.level}`,
      label: profile?.title ?? '',
      progress: { current: levelProgress.currentXP, max: levelProgress.maxXP },
    },
    { id: 'loyalty', icon: 'heart', value: String(loyaltyDays), label: 'Ngày gắn bó' },
    { id: 'achievements', icon: 'star', value: String(achievements.filter(a => a.status === 'claimed').length), label: 'Thành tựu' },
  ];

  const handleEquip = async (achievementId: string) => {
    const ach = achievements.find(a => a.id === achievementId);
    if (ach && ach.badgeUrl) {
      await equipAchievement({ badge: ach.badgeUrl, title: ach.title });
    }
  };

  return {
    user,
    stats,
    achievements,
    isInfoExpanded,
    toggleInfoExpanded,
    onEquip: handleEquip,
    isLoading: isProfileLoading || isLevelConfigsLoading || isQuestsLoading || isProgressLoading,
  };
}
