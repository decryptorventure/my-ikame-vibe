import { api } from '@/services/api';
import type { ApiResponse } from '@/types/api.types';
import type {
  CriteriaAction,
  LevelConfigResponse,
  QuestProgressEntry,
  QuestResponse,
} from '@/types/quest.types';

interface CompleteOnboardingRequest {
  action: string;
}

export const questApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getQuests: builder.query<QuestResponse[], void>({
      query: () => '/v3/iquest/quests',
      transformResponse: (response: ApiResponse<QuestResponse[]>) => response.data,
      providesTags: ['Quest'],
    }),
    getMyQuestProgress: builder.query<QuestProgressEntry[], void>({
      query: () => '/v3/iquest/quests/me/progress',
      transformResponse: (response: ApiResponse<QuestProgressEntry[]>) => response.data,
      providesTags: ['Quest'],
    }),
    getCriteriaActions: builder.query<CriteriaAction[], void>({
      query: () => '/v3/iquest/quests/criteria-actions',
      transformResponse: (response: ApiResponse<CriteriaAction[]>) => response.data,
    }),
    getLevelConfigs: builder.query<LevelConfigResponse[], void>({
      query: () => '/v3/iquest/level-configs',
      transformResponse: (response: ApiResponse<LevelConfigResponse[]>) => response.data,
      keepUnusedDataFor: 3600,
    }),
    completeOnboarding: builder.mutation<null, CompleteOnboardingRequest>({
      query: (body) => ({
        url: '/v3/iquest/onboarding/complete',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<null>) => response.data,
      invalidatesTags: ['Quest', 'UserProfile', 'Leaderboard'],
    }),
    claimQuestReward: builder.mutation<null, { questId: string }>({
      query: (body) => ({
        url: '/v3/iquest/quests/claim',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<null>) => response.data,
      invalidatesTags: ['Quest', 'UserProfile'],
    }),
  }),
});

export const {
  useClaimQuestRewardMutation,
  useCompleteOnboardingMutation,
  useGetCriteriaActionsQuery,
  useGetLevelConfigsQuery,
  useGetMyQuestProgressQuery,
  useGetQuestsQuery,
} = questApi;
