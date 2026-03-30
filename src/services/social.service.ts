import { api } from '@/services/api';
import type {
  SendWishRequest,
  SendWishResponse,
  SocialTodayItem,
} from '@/types/social.types';

/** Mock data — will be replaced by real API when BE is ready */
const MOCK_TODAY_SOCIALS: SocialTodayItem[] = [
  { id: 'social-1', userId: 'user-101', name: 'Nguyễn Văn A', type: 'birthday' },
  { id: 'social-2', userId: 'user-102', name: 'Trần Thị B', avatar: 'https://i.pravatar.cc/80?img=5', type: 'anniversary', years: 2 },
  { id: 'social-3', userId: 'user-103', name: 'Lê Minh C', avatar: 'https://i.pravatar.cc/80?img=12', type: 'birthday' },
  { id: 'social-4', userId: 'user-104', name: 'Phạm Hồng D', type: 'anniversary', years: 5 },
];

export const socialApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTodaySocials: builder.query<SocialTodayItem[], void>({
      queryFn: () => ({
        data: MOCK_TODAY_SOCIALS,
      }),
      providesTags: ['Social'],
    }),
    sendWish: builder.mutation<SendWishResponse, SendWishRequest>({
      queryFn: (args) => ({
        data: {
          postId: `wish-${Date.now()}`,
          expEarned: 50,
        } as SendWishResponse,
      }),
      invalidatesTags: ['Social', 'Post', 'Quest'],
    }),
  }),
});

export const {
  useGetTodaySocialsQuery,
  useSendWishMutation,
} = socialApi;
