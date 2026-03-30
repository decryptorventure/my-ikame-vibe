import { useGetEventsQuery } from '@/services/event.service';
import { useSidebarData } from '@/hooks/useSidebarData';
import type { UpcomingEvent } from '@/pages/Dashboard/types';

function formatEventDate(dateStr: string): { date: string; time: string } {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return {
    date: `${day} Th${month}`,
    time: `${hours}:${minutes}`,
  };
}

export function useDashboardSidebar() {
  const {
    userStats,
    leaderboard,
    leaderboardHasMore,
    loadMoreLeaderboard,
    isLeaderboardLoadingMore,
    isLoading: isSidebarLoading,
  } = useSidebarData();
  const { data: eventsData, isLoading: isEventsLoading } = useGetEventsQuery();

  const events: UpcomingEvent[] = (eventsData?.items ?? []).map((event) => {
    const start = formatEventDate(event.start_event);
    const end = formatEventDate(event.end_event);

    return {
      id: event.id,
      title: event.title,
      date: start.date,
      time: `${start.time} - ${end.time}`,
    };
  });

  return {
    userStats,
    leaderboard,
    leaderboardHasMore,
    loadMoreLeaderboard,
    isLeaderboardLoadingMore,
    events,
    isLoading: isSidebarLoading || isEventsLoading,
  };
}
