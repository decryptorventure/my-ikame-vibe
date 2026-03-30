import { ScrollArea } from '@frontend-team/ui-kit';
import { EmptyState, LeaderboardCard, UserStatsCard, UpcomingEventsCard } from '@/components';

import { useSidebarData } from '@/hooks/useSidebarData';
import { EventList, EventStatusFilter } from '@/pages/Events/components';
import {
  EventFilterSkeleton,
  EventListSkeleton,
  EventSidebarSkeleton,
} from '@/pages/Events/components/EventsSkeleton';
import { useEvents } from '@/pages/Events/hooks';

export default function Events() {
  const { events, activeStatus, setActiveStatus, isLoading } = useEvents();
  const {
    userStats,
    leaderboard,
    events: sidebarEvents,
    isLoading: isSidebarLoading,
  } = useSidebarData();

  return (
    <div className="p-6">
      <div className="grid grid-cols-[6fr_4fr] gap-12">
        <div className="flex flex-col gap-4 pt-6">
          {isLoading ? (
            <>
              <EventFilterSkeleton />
              <EventListSkeleton />
            </>
          ) : (
            <>
              <EventStatusFilter
                activeStatus={activeStatus}
                onStatusChange={setActiveStatus}
              />
              {events.length > 0 ? (
                <EventList events={events} />
              ) : (
                <EmptyState
                  title="Chưa có sự kiện"
                  description="Không tìm thấy sự kiện nào cho danh mục này."
                />
              )}
            </>
          )}
        </div>
        <div className="sticky top-6 self-start">
          <ScrollArea viewportClassName="max-h-[calc(100vh-3rem)]">
            <div className="flex flex-col gap-4">
              {isSidebarLoading ? (
                <EventSidebarSkeleton />
              ) : (
                <>
                  <UserStatsCard stats={userStats} />
                  
                  {sidebarEvents.length > 0 && <UpcomingEventsCard events={sidebarEvents} />}
                  
                  <LeaderboardCard users={leaderboard} />
                </>
              )}
            </div>
          </ScrollArea>
        </div>

      </div>
    </div>
  );
}
