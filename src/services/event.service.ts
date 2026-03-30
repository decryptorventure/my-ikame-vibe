import { api } from '@/services/api';
import type { ApiResponse, PaginatedResponse } from '@/types/api.types';
import type { EventResponse } from '@/types/event.types';

export const eventApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<PaginatedResponse<EventResponse>, { page?: number; limit?: number } | void>({
      query: (params) => ({
        url: '/v3/events',
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 20,
        },
      }),
      transformResponse: (response: ApiResponse<PaginatedResponse<EventResponse>>) => response.data,
      providesTags: ['Event'],
    }),
  }),
});

export const { useGetEventsQuery } = eventApi;
