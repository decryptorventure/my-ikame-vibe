import { useGetPostsQuery } from '@/services/post.service';
import { getInitials } from '@/utils/getInitials';
import { getTimeAgo } from '@/utils/getTimeAgo';
import type { Post } from '../types';

export function usePostFeed() {
  const { data: postsData, isLoading } = useGetPostsQuery();

  const posts: Post[] = (postsData?.items ?? []).map((post) => {
    const authorName = post.user_name || post.user_id;
    const isAi = authorName === 'iKame AI 🤖';

    return {
      id: post.id,
      authorId: isAi ? undefined : post.user_id,
      authorName,
      authorInitials: isAi ? 'AI' : getInitials(authorName),
      authorAvatar: post.user_avatar,
      timeAgo: getTimeAgo(post.public_date),
      content: post.content,
      imageUrl: post.links?.[0]?.url,
      likeCount: post.like_count ?? 0,
      commentCount: post.comment_count ?? 0,
    };
  });

  return {
    posts,
    isLoading,
  };
}
