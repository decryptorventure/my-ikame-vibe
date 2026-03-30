/**
 * Mock data barrel — aggregates all mock sub-modules into MOCK_RESPONSES.
 */

import type { ApiResponse, PaginatedResponse } from '@/types/api.types';
import { getMockProfile, MOCK_LEADERBOARD_ENTRIES, MOCK_LEVEL_CONFIGS } from '@/lib/mock-profile-level-data';
import { 
  MOCK_QUESTS, 
  getMockProgress, 
  completeMockOnboarding, 
  claimMockReward 
} from '@/lib/mock-quest-data';
import { MOCK_POSTS, MOCK_EVENTS, MOCK_COMMENTS } from '@/lib/mock-post-event-data';
import { MOCK_REWARDS } from '@/lib/mock-reward-data';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function apiOk<T>(data: T): ApiResponse<T> {
  return { statusCode: 200, message: 'Success', data };
}

function paginated<T>(items: T[], page = 1, limit = 20): PaginatedResponse<T> {
  const start = (page - 1) * limit;
  return { 
    items: items.slice(start, start + limit), 
    page, 
    limit, 
    total: items.length 
  };
}

// ─── Pre-built API responses keyed by URL path ────────────────────────────────

export const MOCK_RESPONSES = {
  '/v3/iquest/user-profiles/me':           () => apiOk(getMockProfile()),
  '/v3/iquest/user-profiles/leaderboard':  () => apiOk(paginated(MOCK_LEADERBOARD_ENTRIES)),
  '/v3/iquest/quests':                     () => apiOk(MOCK_QUESTS),
  '/v3/iquest/quests/me/progress':         () => apiOk(getMockProgress()),
  '/v3/iquest/level-configs':              () => apiOk(MOCK_LEVEL_CONFIGS),

  // Mutations
  '/v3/iquest/onboarding/complete':        (body: any) => {
    if (body?.action) completeMockOnboarding(body.action);
    return apiOk(null);
  },
  '/v3/iquest/quests/claim':               (body: any) => {
    if (body?.questId) claimMockReward(body.questId);
    return apiOk(null);
  },

  '/v3/posts/all':                         (body: any) => {
    const page = (body as any)?.page ?? 1;
    const limit = (body as any)?.limit ?? 20;
    return apiOk(paginated(MOCK_POSTS, page, limit));
  },
  '/v3/posts/view':                        () => apiOk(null),
  '/v3/posts/like':                        () => apiOk(null),
  '/v3/posts':                             (body: any) => {
    const newPost = {
      ...MOCK_POSTS[0],
      id: `post-${Date.now()}`,
      content: (body as any)?.content || '',
      public_date: new Date().toISOString(),
      user_id: 'Nguyen Van Dung', // In real app, this is current user
      like_count: 0,
      comment_count: 0,
      links: [],
    };
    MOCK_POSTS.unshift(newPost);
    return apiOk(newPost);
  },
  '/v3/posts/:id':                         (_body: any, path: string) => {
    const id = path.split('/').pop();
    const post = MOCK_POSTS.find(p => p.id === id);
    return apiOk(post || MOCK_POSTS[0]);
  },
  '/v3/posts/:id/comments':                (_body: any, path: string) => {
    const segments = path.split('/');
    const postId = segments[segments.length - 2];
    const comments = MOCK_COMMENTS.filter(c => c.post_id === postId);
    return apiOk(comments.length > 0 ? comments : MOCK_COMMENTS);
  },
  '/v3/comments':                           (body: any) => {
    const newCmt = {
      ...MOCK_COMMENTS[0],
      id: `cmt-${Date.now()}`,
      content: (body as any)?.content || '',
      post_id: (body as any)?.postId,
      author: { id: 'user-me', name: 'Nguyen Van Dung', avatar: undefined },
      created_at: new Date().toISOString(),
    };
    MOCK_COMMENTS.push(newCmt);
    return apiOk(newCmt);
  },
  '/v3/social/wishes':                      (body: any) => {
    const isBirthday = (body as any)?.type === 'birthday';
    const newPost = {
      id: `wish-${Date.now()}`,
      content: (body as any)?.message || (isBirthday ? 'Chúc mừng sinh nhật! 🎂' : 'Chúc mừng thâm niên! 🎖️'),
      public_date: new Date().toISOString(),
      user_id: 'Nguyen Van Dung', // Current user
      author: {
        id: 'user-me',
        name: 'Nguyen Van Dung',
        avatar: undefined,
        initials: 'ND'
      },
      like_count: 0,
      comment_count: 0,
      links: [],
    };
    MOCK_POSTS.unshift(newPost as any);
    return apiOk({
      postId: newPost.id,
      expEarned: 50
    });
  },
  '/v3/events':                            () => apiOk(paginated(MOCK_EVENTS)),
  '/v3/rewards':                           () => apiOk(MOCK_REWARDS),
};
