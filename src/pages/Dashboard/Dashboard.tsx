import { useState, useEffect } from 'react';
import { ScrollArea, Button } from '@frontend-team/ui-kit';
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
import ManagerDashboard from './components/Manager/ManagerDashboard';
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
  const { user, profile, quests, questProgress, questTitle, handleCompleteQuest, isLoading: isDashboardLoading } = useDashboard() as any;
  const { displayQuests, syncQuests, armAnimation, handleExitComplete, handleEnterComplete } = useAnimatedQuestList(quests);

  // Prototype state: Toggle between Employee and Manager view
  const [viewMode, setViewMode] = useState<'employee' | 'manager'>('employee');

  useEffect(() => {
    // If user's position name contains 'Manager', default to manager view in this prototype
    if (profile?.position_name?.toLowerCase().includes('manager')) {
      setViewMode('manager');
    }
  }, [profile]);

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

  const renderEmployeeView = () => (
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
  );

  const renderManagerView = () => (
    <ManagerDashboard />
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8 bg_canvas_secondary p-4 radius_l border border_primary">
        <div className="flex flex-col gap-0.5">
           <h1 className="text-xl font-semibold text_primary">Dashboard Central</h1>
           <p className="text-xs text_tertiary">iKame Internal Portal Environment</p>
        </div>
        <div className="flex gap-2">
           <Button 
             variant={viewMode === 'employee' ? 'primary' : 'border'} 
             size="sm"
             onClick={() => setViewMode('employee')}
             className="font-bold border-2"
           >
             Cá nhân
           </Button>
           <Button 
             variant={viewMode === 'manager' ? 'primary' : 'border'} 
             size="sm"
             onClick={() => setViewMode('manager')}
             className="font-bold border-2"
           >
             Team Management 🚀
           </Button>
        </div>
      </div>

      {viewMode === 'employee' ? renderEmployeeView() : renderManagerView()}
      
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

