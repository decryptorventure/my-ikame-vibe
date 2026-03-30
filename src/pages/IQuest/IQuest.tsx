import { useState, useMemo } from 'react';
import { ScrollArea } from '@frontend-team/ui-kit';
import { WarningIcon } from '@phosphor-icons/react';
import { 
  EmptyState, 
  LeaderboardCard, 
  UserStatsCard, 
  UpcomingEventsCard, 
  CelebrationModal 
} from '@/components';

import { useSidebarData } from '@/hooks/useSidebarData';
import {
  IQuestList,
  IQuestSidebarSkeleton,
  QuestBanner,
  QuestBannerSkeleton,
  QuestCategoryFilter,
  QuestFilterSkeleton,
  QuestSectionsSkeleton,
  QuestDetailModal,
  AchievementQuestList,
} from './components';
import { useIQuest } from './hooks';
import type { IQuestItem, QuestBannerData, QuestCategory, QuestSection } from './types';

// ── Quest Tab Content Component ───────────────────
interface QuestTabContentProps {
  onQuestClick: (quest: IQuestItem) => void;
  banner: QuestBannerData;
  activeCategory: QuestCategory;
  setActiveCategory: (cat: QuestCategory) => void;
  sections: QuestSection[];
  onCompleteQuest: (action: string) => Promise<void>;
  onClaimReward: (id: string) => Promise<void>;
  onboardingFinished: boolean;
  isLoading: boolean;
}

function QuestTabContent({ 
  onQuestClick, 
  banner, 
  activeCategory, 
  setActiveCategory, 
  sections, 
  onCompleteQuest, 
  onClaimReward, 
  onboardingFinished,
  isLoading 
}: QuestTabContentProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <QuestBannerSkeleton />
        <QuestFilterSkeleton />
        <QuestSectionsSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <QuestBanner
        title={banner.title}
        subtitle={banner.subtitle}
        onboardingFinished={onboardingFinished}
      />

      <QuestCategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onboardingFinished={onboardingFinished}
      />

      {sections.length > 0 ? (
        <IQuestList
          sections={sections}
          onQuestClick={onQuestClick}
          onCompleteQuest={onCompleteQuest}
          onClaimReward={onClaimReward}
        />
      ) : (
        <EmptyState 
          title="Chưa có nhiệm vụ" 
          description="Không tìm thấy nhiệm vụ nào cho danh mục này." 
        />
      )}
    </div>
  );
}

// ── Main Page Component ─────────────────────────────────────────────────────────────────
export default function IQuest() {
  const {
    profile,
    userStats,
    leaderboard,
    events,
    isLoading: isSidebarLoading,
  } = useSidebarData();

  const { 
    banner,
    activeCategory,
    setActiveCategory,
    sections, 
    handleCompleteQuest, 
    handleClaimReward,
    onboardingFinished,
    isLoading: isQuestsLoading,
    isCelebrationOpen,
    setIsCelebrationOpen,
    celebrationData,
    achievementQuests, // Thêm dòng này
  } = useIQuest();
  
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  
  const selectedQuest = useMemo(() => {
    if (!selectedQuestId) return null;
    return sections.flatMap(s => s.quests).find(q => q.id === selectedQuestId) || null;
  }, [selectedQuestId, sections]);



  return (
    <div className="p-6">
      <div className="grid grid-cols-[6fr_4fr] gap-12">
        {/* Main content */}
        <div>
          <QuestTabContent 
            onQuestClick={(q) => setSelectedQuestId(q.id)} 
            banner={banner}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            sections={sections}
            onCompleteQuest={handleCompleteQuest}
            onClaimReward={handleClaimReward}
            onboardingFinished={onboardingFinished}
            isLoading={isQuestsLoading}
          />

          {/* Newcomer status banner */}
          {profile?.employee_status === 'newcomer' && !onboardingFinished && !isQuestsLoading && (
             <div className="mt-8 flex items-center gap-2 px-4 py-3 radius_12 bg_orange_subtle border border_tertiary fg_accent_primary text-sm shadow_xs">
                <WarningIcon weight="bold" size={18} />
                <span className="font-semibold">
                  Bạn đang trong giai đoạn hội nhập. Hãy hoàn thành Hành trình Tân thủ!
                </span>
             </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="sticky top-6 self-start">
          <ScrollArea viewportClassName="max-h-[calc(100vh-3rem)]">
            <div className="flex flex-col gap-4">
              {isSidebarLoading ? (
                <IQuestSidebarSkeleton />
              ) : (
                <>
                  <UserStatsCard stats={userStats} />
                  {/* Achievement List instead of Upcoming Events in IQuest tab */}
                  <AchievementQuestList 
                    quests={achievementQuests} 
                    isLoading={isQuestsLoading} 
                  />
                  {/* Still show events if needed, or remove as per user request */}
                  {events.length > 0 && <UpcomingEventsCard events={events} />}
                  <LeaderboardCard users={leaderboard} />
                </>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>



      {/* Celebration Modal (Success Claiming Reward) */}
      <CelebrationModal 
        type="quest_reward" 
        isOpen={isCelebrationOpen} 
        onClose={() => setIsCelebrationOpen(false)}
        title={celebrationData?.title}
        subtitle={celebrationData?.subtitle}
        exp={celebrationData?.exp}
      />

      {/* Quest Detail Modal */}
      <QuestDetailModal 
        quest={selectedQuest} 
        isOpen={!!selectedQuestId} 
        onClose={() => setSelectedQuestId(null)}
        onComplete={async (action) => {
          await handleCompleteQuest(action);
          setSelectedQuestId(null);
        }}
        onClaim={async (id) => {
          await handleClaimReward(id);
          setSelectedQuestId(null);
        }}
      />
    </div>
  );
}
