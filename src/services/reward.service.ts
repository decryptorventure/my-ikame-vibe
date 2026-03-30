import { api } from '@/services/api';
import type { ApiResponse } from '@/types/api.types';
import type { RewardItem } from '@/types/reward.types';

export const rewardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRewards: builder.query<RewardItem[], void>({
      query: () => '/v3/rewards',
      transformResponse: (response: ApiResponse<RewardItem[]>) => response.data,
      providesTags: ['Reward'],
    }),
    redeemReward: builder.mutation<null, { itemId: string }>({
      query: (body) => ({
        url: '/v3/rewards/redeem',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<null>) => response.data,
      invalidatesTags: ['UserProfile'],
    }),
  }),
});

export const { useGetRewardsQuery, useRedeemRewardMutation } = rewardApi;
