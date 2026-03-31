/**
 * Onboarding Journey Map page — shows the newcomer's full onboarding path as
 * a milestone timeline with claimable quest rewards.
 */

import { ScrollArea, Skeleton } from '@frontend-team/ui-kit';
import { LeaderboardCard, UserStatsCard } from '@/components';
import { useSidebarData } from '@/hooks/useSidebarData';
import { OnboardingProgressHeader, MilestoneTimeline } from './components';
import { useOnboardingJourney } from './hooks';

// ── Skeleton ─────────────────────────────────────────────────────────────────

function JourneySkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-24 w-full radius_l" />
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-40 w-full radius_l" />
      ))}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function OnboardingJourney() {
  const { userStats, leaderboard, isLoading: isSidebarLoading } = useSidebarData();

  const {
    milestones,
    totalCount,
    claimedCount,
    isClaiming,
    handleClaim,
    isLoading,
  } = useOnboardingJourney();

  const totalExp = milestones.reduce((sum, m) => sum + m.totalExp, 0);

  return (
    <div className="p-6">
      <div className="grid grid-cols-[6fr_4fr] gap-12">
        {/* Main content */}
        <div className="flex flex-col gap-6">
          {isLoading ? (
            <JourneySkeleton />
          ) : (
            <>
              <OnboardingProgressHeader
                claimedCount={claimedCount}
                totalCount={totalCount}
                totalExp={totalExp}
              />
              <MilestoneTimeline
                milestones={milestones}
                isClaiming={isClaiming}
                onClaim={handleClaim}
              />
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="sticky top-6 self-start">
          <ScrollArea viewportClassName="max-h-[calc(100vh-3rem)]">
            <div className="flex flex-col gap-4">
              {isSidebarLoading ? (
                <>
                  <Skeleton className="h-32 w-full radius_l" />
                  <Skeleton className="h-48 w-full radius_l" />
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
