import { useMemo } from 'react';
import { useGetUserProfileQuery } from '@/services/userProfile.service';
import { useGetLevelConfigsQuery } from '@/services/quest.service';
import { getInitials } from '@/utils/getInitials';
import { getLevelProgress } from '@/utils/getLevelProgress';
import type { BadgeItem } from '@/types/social.types';

/** Mock badges — will be replaced by real API */
const MOCK_BADGES: BadgeItem[] = [
  { id: 'b1', name: 'Tân thủ xuất sắc', description: 'Hoàn thành 100% Onboarding', iconUrl: '🎓', category: 'quest', rarity: 'rare' },
  { id: 'b2', name: 'Chấm công bền bỉ', description: '100 ngày chấm công đúng giờ', iconUrl: '⏰', category: 'milestone', rarity: 'common' },
  { id: 'b3', name: 'Cây bút iWiki', description: 'Viết 10 bài iWiki', iconUrl: '✍️', category: 'culture', rarity: 'rare' },
  { id: 'b4', name: 'Top 3 Season', description: 'Đạt Top 3 bảng xếp hạng mùa', iconUrl: '🏆', category: 'season', rarity: 'epic' },
  { id: 'b5', name: 'Người tiên phong', description: 'Early adopter My iKame 2.0', iconUrl: '🚀', category: 'special', rarity: 'legendary' },
  { id: 'b6', name: 'Kết nối viên', description: 'Chúc mừng 50 đồng nghiệp', iconUrl: '🤝', category: 'culture', rarity: 'common' },
];

export function useUserDetail(userId: string) {
  const { data: profile, isLoading: isProfileLoading } = useGetUserProfileQuery(userId, { skip: !userId });
  const { data: levelConfigs, isLoading: isLevelLoading } = useGetLevelConfigsQuery();

  const levelProgress = useMemo(() => {
    if (!levelConfigs || levelConfigs.length === 0) {
      return { level: profile?.level ?? 1, currentXP: 0, maxXP: 1000 };
    }
    return getLevelProgress(profile?.exp ?? 0, levelConfigs);
  }, [profile, levelConfigs]);

  const user = useMemo(() => ({
    id: profile?.id ?? '',
    name: profile?.name ?? '',
    avatar: profile?.avatar,
    initials: getInitials(profile?.name ?? ''),
    position: profile?.position_name ?? '',
    department: profile?.department_name ?? '',
    team: profile?.team_name ?? '',
    buName: profile?.bu_name ?? '',
    email: profile?.email ?? '',
    status: profile?.employee_status ?? '',
    level: levelProgress.level,
    title: profile?.title ?? '',
    currentXP: levelProgress.currentXP,
    maxXP: levelProgress.maxXP,
    coinBalance: profile?.coinBalance ?? 0,
    joinDate: profile?.start_date
      ? new Date(profile.start_date).toLocaleDateString('vi-VN')
      : undefined,
  }), [profile, levelProgress]);

  const badges = MOCK_BADGES;

  return {
    user,
    badges,
    isLoading: isProfileLoading || isLevelLoading,
  };
}
