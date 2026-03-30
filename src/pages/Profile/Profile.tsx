import { ScrollArea } from '@frontend-team/ui-kit';
import { EmptyState } from '@/components';
import {
  AchievementList,
  ProfileHeader,
  ProfileStats,
} from './components';
import {
  AchievementListSkeleton,
  ProfileHeaderSkeleton,
  ProfileStatsSkeleton,
} from './components/ProfileSkeleton';
import { useProfile } from './hooks';

export default function Profile() {
  const { user, stats, achievements, isInfoExpanded, toggleInfoExpanded, onEquip, isLoading } = useProfile();
  const isSidebarLoading = isLoading;

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
                <AchievementListSkeleton />
              ) : achievements.length > 0 ? (
                <AchievementList 
                    achievements={achievements} 
                    title="Hệ thống danh hiệu" 
                    onEquip={onEquip}
                />
              ) : (
                <EmptyState
                  title="Không có thành tựu"
                  description="Hãy hoàn thành nhiệm vụ để mở khóa danh hiệu."
                />
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
