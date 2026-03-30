import { ScrollArea, Skeleton } from '@frontend-team/ui-kit';
import { UserStatsCard, LeaderboardCard, UpcomingEventsCard } from '@/components';
import { useSidebarData } from '@/hooks/useSidebarData';
import { useIReward } from './hooks/useIReward';
import {
  RewardCoinHeader,
  RewardCategoryFilter,
  RewardGrid,
  RedeemModal,
} from './components';

function IRewardSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-36 w-full rounded-2xl" />
      <Skeleton className="h-10 w-full rounded-xl" />
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-64 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export default function IReward() {
  const {
    coinBalance, coinTotalEarned, coinTotalSpent,
    activeCategory, setActiveCategory,
    allRewardItems, filteredRewards,
    redeemingItem, setRedeemingItem,
    redeemedIds, handleRedeem,
    isLoading,
  } = useIReward();

  const {
    userStats, 
    leaderboard, 
    events,
    isLoading: isSidebarLoading,
  } = useSidebarData();

  return (
    <div className="p-6">
      <div className="grid grid-cols-[6fr_4fr] gap-12">
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <IRewardSkeleton />
          ) : (
            <>
              <RewardCoinHeader
                coinBalance={coinBalance}
                coinTotalEarned={coinTotalEarned}
                coinTotalSpent={coinTotalSpent}
              />
              <RewardCategoryFilter
                activeCategory={activeCategory}
                allItems={allRewardItems}
                onCategoryChange={setActiveCategory}
              />
              <RewardGrid
                items={filteredRewards}
                redeemedIds={redeemedIds}
                onRedeem={setRedeemingItem}
              />
            </>
          )}
        </div>

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
                  
                  {events.length > 0 && <UpcomingEventsCard events={events} />}
                  
                  <LeaderboardCard users={leaderboard} />
                </>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      <RedeemModal
        item={redeemingItem}
        coinBalance={coinBalance}
        onConfirm={handleRedeem}
        onClose={() => setRedeemingItem(null)}
      />
    </div>
  );
}
