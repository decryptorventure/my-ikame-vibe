import { useState, useEffect } from 'react';
import { ScrollArea } from '@frontend-team/ui-kit';
import { 
  EmptyState, 
  LeaderboardCard, 
  UserStatsCard, 
  UpcomingEventsCard 
} from '@/components';
import {
  PostDetailModal,
  PostFeed,
  QuestList,
  WelcomeCard,
  SocialTodayCard,
  EventDetailModal,
} from './components';
import {
  PostFeedSkeleton,
  QuestListSkeleton,
  SidebarSkeleton,
  WelcomeCardSkeleton,
} from './components/DashboardSkeleton';
import { useAnimatedQuestList, useDashboard, usePostDetail, usePostFeed } from './hooks';
import { useSidebarData } from '@/hooks/useSidebarData';
import type { UpcomingEvent } from './types';

export default function Dashboard() {
  const { user, quests, questProgress, questTitle, handleCompleteQuest, isLoading: isDashboardLoading } = useDashboard();
  const { displayQuests, syncQuests, armAnimation, handleExitComplete, handleEnterComplete } = useAnimatedQuestList(quests);

  useEffect(() => {
    syncQuests(quests);
  }, [quests, syncQuests]);

  const { posts, isLoading: isPostsLoading } = usePostFeed();
  const {
    userStats,
    leaderboard,
    events,
    isLoading: isSidebarLoading,
  } = useSidebarData();

  const { isModalOpen, isFetching: isPostDetailLoading, postDetail, openPostDetail, closePostDetail } =
    usePostDetail();

  const [selectedEvent, setSelectedEvent] = useState<UpcomingEvent | null>(null);

  return (
    <div className="p-6">
      <div className="grid grid-cols-[6fr_4fr] gap-12">
        <div className="flex flex-col gap-4">
          {isDashboardLoading ? (
            <>
              <WelcomeCardSkeleton />
              <QuestListSkeleton />
            </>
          ) : (
            <>
              <WelcomeCard userName={user.name} />
              {displayQuests.length > 0 ? (
                <QuestList
                  quests={displayQuests}
                  progress={questProgress}
                  title={questTitle}
                  onExitComplete={handleExitComplete}
                  onEnterComplete={handleEnterComplete}
                  onCompleteQuest={(action) => {
                    armAnimation();
                    return handleCompleteQuest(action);
                  }}
                />
              ) : (
                <EmptyState title="Chưa có nhiệm vụ" description="Nhiệm vụ sẽ xuất hiện khi được mở." />
              )}
            </>
          )}

          {isPostsLoading ? (
            <PostFeedSkeleton />
          ) : posts.length > 0 ? (
            <PostFeed posts={posts} onPostClick={openPostDetail} />
          ) : (
            <EmptyState title="Chưa có bài viết" description="Bài viết nội bộ sẽ hiển thị tại đây." />
          )}
        </div>

        <div className="sticky top-6 self-start">
          <ScrollArea viewportClassName="max-h-[calc(100vh-3rem)]">
            <div className="flex flex-col gap-4">
              {isSidebarLoading ? (
                <SidebarSkeleton />
              ) : (
                <>
                  <SocialTodayCard />
                  <UserStatsCard stats={userStats} />
                  
                  {events.length > 0 && (
                    <UpcomingEventsCard 
                      events={events} 
                      onEventClick={(e) => setSelectedEvent(e)} 
                    />
                  )}
                  
                  <LeaderboardCard users={leaderboard} />
                </>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
      
      <PostDetailModal
        isOpen={isModalOpen}
        isLoading={isPostDetailLoading}
        onClose={closePostDetail}
        post={postDetail}
      />
      
      <EventDetailModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
      />
    </div>
  );
}
