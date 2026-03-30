import { useGetEventsQuery } from '@/services/event.service';
import { useGetLevelConfigsQuery } from '@/services/quest.service';
import { useGetMyProfileQuery } from '@/services/userProfile.service';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { getLevelProgress } from '@/utils/getLevelProgress';
import type { UserStats } from '@/types/shared.types';

export function useSidebarData() {
  const { data: profile, isLoading: isProfileLoading } = useGetMyProfileQuery();
  const { data: levelConfigs, isLoading: isLevelConfigsLoading } = useGetLevelConfigsQuery();
  const { data: eventsData, isLoading: isEventsLoading } = useGetEventsQuery();
  const {
    leaderboard,
    hasMore: leaderboardHasMore,
    loadMore: loadMoreLeaderboard,
    isLoading: isLeaderboardLoading,
    isLoadingMore: isLeaderboardLoadingMore,
  } = useLeaderboard();

  // Helper to format event date
  const formatEventDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return {
      date: `${day} Th${month}`,
      time: `${hours}:${minutes}`,
    };
  };

  const levelProgress = levelConfigs && levelConfigs.length > 0
    ? getLevelProgress(profile?.exp ?? 0, levelConfigs)
    : { level: profile?.level ?? 1, currentXP: 0, maxXP: 1000 };

  const userStats: UserStats = {
    credits: profile?.coinBalance ?? 0,
    level: levelProgress.level,
    currentXP: levelProgress.currentXP,
    maxXP: levelProgress.maxXP,
  };

  const events = (eventsData?.items ?? []).map((event) => {
    const start = formatEventDate(event.start_event);
    const end = formatEventDate(event.end_event);
    return {
      id: event.id,
      title: event.title,
      date: start.date,
      time: `${start.time} - ${end.time}`,
      thumbnail: event.thumbnail,
      content: event.content,
    };
  });

  return {
    profile,
    userStats,
    leaderboard,
    leaderboardHasMore,
    loadMoreLeaderboard,
    isLeaderboardLoadingMore,
    events,
    isLoading: isProfileLoading || isLevelConfigsLoading || isLeaderboardLoading || isEventsLoading,
  };
}
