import { useEffect, useRef, useState } from 'react';
import { useGetLeaderboardQuery } from '@/services/userProfile.service';
import { getInitials } from '@/utils/getInitials';
import type { LeaderboardUser } from '@/types/shared.types';

const LEADERBOARD_PAGE_SIZE = 10;

export function useLeaderboard() {
  const loadedPagesRef = useRef<Set<number>>(new Set());
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [accumulatedUsers, setAccumulatedUsers] = useState<LeaderboardUser[]>([]);
  const { currentData, isFetching, isLoading, refetch } = useGetLeaderboardQuery({
    page,
    limit: LEADERBOARD_PAGE_SIZE,
  });

  useEffect(() => {
    if (!currentData?.items) {
      return;
    }

    const mappedUsers: LeaderboardUser[] = currentData.items.map((entry) => ({
      id: entry.userId,
      rank: entry.rank,
      name: entry.name,
      level: entry.level,
      avatarInitials: getInitials(entry.name),
      avatarUrl: entry.avatar,
    }));

    setTotal(currentData.total);
    setAccumulatedUsers((previousUsers) => {
      if (currentData.page === 1) {
        loadedPagesRef.current = new Set([1]);
        return mappedUsers;
      }

      if (loadedPagesRef.current.has(currentData.page)) {
        return previousUsers;
      }

      loadedPagesRef.current.add(currentData.page);
      return [...previousUsers, ...mappedUsers];
    });
  }, [currentData]);

  const hasMore = accumulatedUsers.length < total;
  const isLoadingMore = isFetching && page > 1;

  const loadMore = () => {
    if (isFetching || !hasMore) {
      return;
    }

    if (!loadedPagesRef.current.has(page)) {
      refetch();
      return;
    }

    setPage((previousPage) => previousPage + 1);
  };

  return {
    leaderboard: accumulatedUsers,
    hasMore,
    loadMore,
    isLoading,
    isLoadingMore,
  };
}
