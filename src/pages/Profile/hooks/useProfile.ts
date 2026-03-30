import { useState } from 'react';
import { useGetLevelConfigsQuery } from '@/services/quest.service';
import { useGetMyProfileQuery } from '@/services/userProfile.service';
import { getInitials } from '@/utils/getInitials';
import { getLevelProgress } from '@/utils/getLevelProgress';
import type { Achievement, ProfileStatItem, ProfileUser } from '@/pages/Profile/types';

export function useProfile() {
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);
  const { data: profile, isLoading: isProfileLoading } = useGetMyProfileQuery();
  const { data: levelConfigs, isLoading: isLevelConfigsLoading } = useGetLevelConfigsQuery();

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
    // TODO: Replace placeholder achievements count when achievements API is available.
    { id: 'achievements', icon: 'star', value: '0', label: 'Thành tựu' },
  ];

  // TODO: Replace placeholder achievements when BE exposes a dedicated achievements API.
  const achievements: Achievement[] = [];

  return {
    user,
    stats,
    achievements,
    isInfoExpanded,
    toggleInfoExpanded,
    isLoading: isProfileLoading || isLevelConfigsLoading,
  };
}
