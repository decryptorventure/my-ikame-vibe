import { ScrollArea } from '@frontend-team/ui-kit';
import { EmptyState } from '@/components';
import {
  AchievementList,
  OngoingQuestList,
  ProfileHeader,
  ProfileStats,
} from './components';
import {
  AchievementListSkeleton,
  OngoingQuestListSkeleton,
  ProfileHeaderSkeleton,
  ProfileStatsSkeleton,
} from './components/ProfileSkeleton';
import { useProfile, useProfileSidebar } from './hooks';

export default function Profile() {
  const { user, stats, achievements, isInfoExpanded, toggleInfoExpanded, isLoading } = useProfile();
  const { ongoingQuests, isLoading: isSidebarLoading } = useProfileSidebar();

  return (
    <div className="p-6">
      <div className="grid grid-cols-[6fr_4fr] gap-12">
        <div className="flex flex-col gap-6">
          {isLoading ? (
            <>
              <ProfileHeaderSkeleton />
              <ProfileStatsSkeleton />
              <AchievementListSkeleton />
            </>
          ) : (
            <>
              <ProfileHeader
                user={user}
                isExpanded={isInfoExpanded}
                onToggleExpand={toggleInfoExpanded}
              />
              <ProfileStats stats={stats} />
              {achievements.length > 0 ? (
                <AchievementList achievements={achievements} />
              ) : (
                <EmptyState
                  title="Chưa có thành tựu"
                  description="Hoàn thành nhiệm vụ để mở khoá thành tựu."
                />
              )}
            </>
          )}
        </div>

        <div className="sticky top-6 self-start">
          <ScrollArea viewportClassName="max-h-[calc(100vh-3rem)]">
            <div className="flex flex-col gap-4">
              {isSidebarLoading ? (
                <OngoingQuestListSkeleton />
              ) : ongoingQuests.length > 0 ? (
                <OngoingQuestList quests={ongoingQuests} />
              ) : (
                <EmptyState
                  title="Không có nhiệm vụ đang thực hiện"
                  description="Bạn đã hoàn thành tất cả nhiệm vụ hiện tại."
                />
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
