import { useEffect, useRef, useState } from 'react';
import { useSidebarData } from '@/hooks/useSidebarData';
import { 
  useGetMyQuestProgressQuery, 
  useGetQuestsQuery 
} from '@/services/quest.service';
import { useMemo } from 'react';

export function useCelebrations() {
  const { userStats } = useSidebarData();
  const { data: questsData } = useGetQuestsQuery();
  const { data: progressData } = useGetMyQuestProgressQuery();

  const [levelUpOpen, setLevelUpOpen] = useState(false);
  const [onboardingCompleteOpen, setOnboardingCompleteOpen] = useState(false);
  
  // Track previous values
  const prevLevelRef = useRef(userStats.level);
  
  const progressMap = useMemo(
    () => new Map((progressData ?? []).map((p) => [p.questId, p])),
    [progressData]
  );

  const onboardingFinished = useMemo(() => {
    if (!questsData || !progressData) return false;
    const items = questsData.filter(q => q.type === 'onboarding');
    if (items.length === 0) return false;
    return items.every(q => progressMap.get(q.id)?.status === 'claimed');
  }, [questsData, progressData, progressMap]);

  const prevOnboardingFinishedRef = useRef(onboardingFinished);

  // Detect Level Up
  useEffect(() => {
    if (userStats.level > prevLevelRef.current && prevLevelRef.current > 0) {
      setLevelUpOpen(true);
    }
    prevLevelRef.current = userStats.level;
  }, [userStats.level]);

  // Detect Onboarding Completion
  useEffect(() => {
    if (onboardingFinished && !prevOnboardingFinishedRef.current) {
      setOnboardingCompleteOpen(true);
    }
    prevOnboardingFinishedRef.current = onboardingFinished;
  }, [onboardingFinished]);

  return {
    levelUpOpen,
    setLevelUpOpen,
    onboardingCompleteOpen,
    setOnboardingCompleteOpen,
    currentLevel: userStats.level,
    onboardingFinished,
  };
}
