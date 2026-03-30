import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@phosphor-icons/react';
import { ScrollArea, Skeleton } from '@frontend-team/ui-kit';
import { LeaderboardCard, UserStatsCard } from '@/components';
import { useSidebarData } from '@/hooks/useSidebarData';
import { UserDetailHeader, UserDetailBadges } from './components';
import { useUserDetail } from './hooks';

function UserDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-24 w-full rounded-2xl" />
      <Skeleton className="h-48 w-full rounded-xl" />
      <Skeleton className="h-32 w-full rounded-xl" />
    </div>
  );
}

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, badges, isLoading } = useUserDetail(id ?? '');
  const { userStats, leaderboard, isLoading: isSidebarLoading } = useSidebarData();

  return (
    <div className="p-6">
      <div className="grid grid-cols-[6fr_4fr] gap-12">
        <div className="flex flex-col gap-6">
          {/* Back button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium text_secondary hover:text_primary transition-colors cursor-pointer bg-transparent border-none outline-none w-fit"
          >
            <ArrowLeftIcon size={16} weight="bold" />
            Quay lại
          </button>

          {isLoading ? (
            <UserDetailSkeleton />
          ) : (
            <>
              <UserDetailHeader user={user} />
              <UserDetailBadges badges={badges} />
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="sticky top-6 self-start">
          <ScrollArea viewportClassName="max-h-[calc(100vh-3rem)]">
            <div className="flex flex-col gap-4">
              {isSidebarLoading ? (
                <>
                  <Skeleton className="h-28 w-full rounded-2xl" />
                  <Skeleton className="h-64 w-full rounded-2xl" />
                </>
              ) : (
                <>
                  <UserStatsCard stats={userStats} />
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
