import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from '@/lib/customFetchBase';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: customFetchBase,
  tagTypes: ['UserProfile', 'Quest', 'Post', 'Event', 'Leaderboard', 'Reward', 'Social', 'Comment'],
  endpoints: () => ({}),
});
