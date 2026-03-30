import { api } from '@/services/api';
import type { ApiResponse, PaginatedResponse } from '@/types/api.types';
import type {
  CreateProposalPayload,
  LeaderboardEntry,
  UserProfileResponse,
} from '@/types/userProfile.types';

export const userProfileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query<UserProfileResponse, void>({
      query: () => '/v3/iquest/user-profiles/me',
      transformResponse: (response: ApiResponse<UserProfileResponse>) => response.data,
      providesTags: ['UserProfile'],
    }),
    getLeaderboard: builder.query<
      PaginatedResponse<LeaderboardEntry>,
      { page?: number; limit?: number } | void
    >({
      query: (params) => ({
        url: '/v3/iquest/user-profiles/leaderboard',
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 20,
        },
      }),
      transformResponse: (response: ApiResponse<PaginatedResponse<LeaderboardEntry>>) => response.data,
      providesTags: ['Leaderboard'],
    }),
    getUserProfile: builder.query<UserProfileResponse, string>({
      query: (userId) => `/v3/iquest/user-profiles/${userId}`,
      transformResponse: (response: ApiResponse<UserProfileResponse>) => response.data,
    }),
    createProposal: builder.mutation<void, CreateProposalPayload>({
      query: (body) => ({
        url: '/v3/proposals',
        method: 'POST',
        body,
      }),
    }),
    updateAvatar: builder.mutation<void, FormData>({
      query: (body) => ({
        url: '/v3/users/update-avatar',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['UserProfile'],
    }),
  }),
});

export const {
  useGetLeaderboardQuery,
  useGetMyProfileQuery,
  useGetUserProfileQuery,
  useCreateProposalMutation,
  useUpdateAvatarMutation,
} = userProfileApi;
