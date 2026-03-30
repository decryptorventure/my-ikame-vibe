import { useCallback, useRef, useState } from 'react';
import type { AnimatedQuest, Quest } from '../types';

export function useAnimatedQuestList(quests: Quest[]) {
  const [displayQuests, setDisplayQuests] = useState<AnimatedQuest[]>(() =>
    quests.map((q) => ({ ...q, animationState: 'stable' as const })),
  );
  const pendingQuestsRef = useRef<Quest[] | null>(null);
  const exitingIdsRef = useRef<Set<string>>(new Set());
  const prevIdsRef = useRef<Set<string>>(new Set(quests.map((q) => q.id)));
  const isAnimatingRef = useRef(false);
  const shouldAnimateRef = useRef(false);

  const syncQuests = useCallback((nextQuests: Quest[]) => {
    const currentIds = new Set(nextQuests.map((q) => q.id));
    const prevIds = prevIdsRef.current;

    // Animation not armed → render stable immediately
    if (!shouldAnimateRef.current) {
      prevIdsRef.current = currentIds;
      setDisplayQuests(nextQuests.map((q) => ({ ...q, animationState: 'stable' })));
      return;
    }

    const exitingIds = [...prevIds].filter((id) => !currentIds.has(id));
    const enteringIds = [...currentIds].filter((id) => !prevIds.has(id));

    if (exitingIds.length === 0 && enteringIds.length === 0) {
      shouldAnimateRef.current = false;
      prevIdsRef.current = currentIds;
      setDisplayQuests(nextQuests.map((q) => ({ ...q, animationState: 'stable' })));
      return;
    }

    if (isAnimatingRef.current) {
      pendingQuestsRef.current = nextQuests;
      return;
    }

    if (exitingIds.length > 0) {
      isAnimatingRef.current = true;
      exitingIdsRef.current = new Set(exitingIds);
      pendingQuestsRef.current = nextQuests;

      setDisplayQuests((prev) =>
        prev.map((q) =>
          exitingIds.includes(q.id) ? { ...q, animationState: 'exiting' } : q,
        ),
      );
    } else {
      prevIdsRef.current = currentIds;
      setDisplayQuests(
        nextQuests.map((q) => ({
          ...q,
          animationState: enteringIds.includes(q.id) ? 'entering' : 'stable',
        })),
      );
    }
  }, []);

  // Call this before completing a quest to arm animation for the next data change
  const armAnimation = useCallback(() => {
    shouldAnimateRef.current = true;
  }, []);

  const handleExitComplete = useCallback((questId: string) => {
    exitingIdsRef.current.delete(questId);

    if (exitingIdsRef.current.size > 0) return;

    const pending = pendingQuestsRef.current;
    if (!pending) {
      isAnimatingRef.current = false;
      shouldAnimateRef.current = false;
      return;
    }

    const prevIds = prevIdsRef.current;
    const newIds = new Set(pending.map((q) => q.id));
    const enteringIds = [...newIds].filter((id) => !prevIds.has(id));

    pendingQuestsRef.current = null;
    prevIdsRef.current = newIds;

    setDisplayQuests(
      pending.map((q) => ({
        ...q,
        animationState: enteringIds.includes(q.id) ? 'entering' : 'stable',
      })),
    );

    if (enteringIds.length === 0) {
      isAnimatingRef.current = false;
      shouldAnimateRef.current = false;
    }
  }, []);

  const handleEnterComplete = useCallback(() => {
    isAnimatingRef.current = false;
    shouldAnimateRef.current = false;

    const pending = pendingQuestsRef.current;
    if (pending) {
      pendingQuestsRef.current = null;
      const currentIds = new Set(pending.map((q) => q.id));
      const prevIds = prevIdsRef.current;
      const exitingIds = [...prevIds].filter((id) => !currentIds.has(id));

      if (exitingIds.length > 0) {
        isAnimatingRef.current = true;
        shouldAnimateRef.current = true;
        exitingIdsRef.current = new Set(exitingIds);
        pendingQuestsRef.current = pending;

        setDisplayQuests((prev) =>
          prev.map((q) =>
            exitingIds.includes(q.id) ? { ...q, animationState: 'exiting' } : q,
          ),
        );
      } else {
        prevIdsRef.current = currentIds;
        setDisplayQuests(pending.map((q) => ({ ...q, animationState: 'stable' })));
      }
    } else {
      setDisplayQuests((prev) =>
        prev.map((q) =>
          q.animationState === 'entering' ? { ...q, animationState: 'stable' } : q,
        ),
      );
    }
  }, []);

  return { displayQuests, syncQuests, armAnimation, handleExitComplete, handleEnterComplete };
}
