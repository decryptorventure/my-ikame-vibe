import { api } from '@/services/api';
import type { ApiResponse, PaginatedResponse } from '@/types/api.types';
import type {
  CommentResponse,
  CreateCommentRequest,
  CreatePostRequest,
  PostResponse,
} from '@/types/post.types';

interface IncreasePostViewRequest {
  id: string;
}

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<PaginatedResponse<PostResponse>, { page?: number; limit?: number } | void>({
      query: (params) => ({
        url: '/v3/posts/all',
        method: 'POST',
        body: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 20,
        },
      }),
      transformResponse: (response: ApiResponse<PaginatedResponse<PostResponse>>) => response.data,
      providesTags: ['Post'],
    }),
    getPostDetail: builder.query<PostResponse, string>({
      query: (id) => `/v3/posts/${id}`,
      transformResponse: (response: ApiResponse<PostResponse>) => response.data,
    }),
    createPost: builder.mutation<PostResponse, CreatePostRequest>({
      query: (body) => ({
        url: '/v3/posts',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<PostResponse>) => response.data,
      invalidatesTags: ['Post'],
    }),
    likePost: builder.mutation<null, string>({
      query: (id) => ({
        url: `/v3/posts/${id}/like`,
        method: 'POST',
      }),
      transformResponse: (response: ApiResponse<null>) => response.data,
      invalidatesTags: ['Post'],
    }),
    unlikePost: builder.mutation<null, string>({
      query: (id) => ({
        url: `/v3/posts/${id}/like`,
        method: 'DELETE',
      }),
      transformResponse: (response: ApiResponse<null>) => response.data,
      invalidatesTags: ['Post'],
    }),
    getPostComments: builder.query<CommentResponse[], string>({
      query: (postId) => `/v3/posts/${postId}/comments`,
      transformResponse: (response: ApiResponse<CommentResponse[]>) => response.data,
      providesTags: ['Comment'],
    }),
    createComment: builder.mutation<CommentResponse, CreateCommentRequest>({
      query: ({ postId, ...body }) => ({
        url: `/v3/posts/${postId}/comments`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<CommentResponse>) => response.data,
      invalidatesTags: ['Comment', 'Post'],
    }),
    increasePostView: builder.mutation<null, IncreasePostViewRequest>({
      query: (body) => ({
        url: '/v3/posts/view',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<null>) => response.data,
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostDetailQuery,
  useCreatePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useGetPostCommentsQuery,
  useCreateCommentMutation,
  useIncreasePostViewMutation,
} = postApi;
