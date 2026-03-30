import { skipToken } from '@reduxjs/toolkit/query';
import { useCallback, useState } from 'react';
import { useGetPostDetailQuery, useIncreasePostViewMutation, useGetPostCommentsQuery } from '@/services/post.service';
import type { CommentResponse } from '@/types/post.types';
import { getInitials } from '@/utils/getInitials';
import { getTimeAgo } from '@/utils/getTimeAgo';
import type { PostDetail } from '../types';

export function usePostDetail() {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [increaseView] = useIncreasePostViewMutation();
  const postQueryArg = selectedPostId ?? skipToken;
  const { data: postData, isFetching: isPostFetching } = useGetPostDetailQuery(postQueryArg);
  const { data: commentsData, isFetching: isCommentsFetching } = useGetPostCommentsQuery(postQueryArg);

  const openPostDetail = useCallback(
    (postId: string) => {
      setSelectedPostId(postId);
      setIsModalOpen(true);
      void increaseView({ id: postId });
    },
    [increaseView],
  );

  const closePostDetail = useCallback(() => {
    setIsModalOpen(false);
    setSelectedPostId(null);
  }, []);

  const authorName = postData?.user_name || postData?.user_id || '';
  const postDetail: PostDetail | null = postData && !isPostFetching
    ? {
        id: postData.id,
        author: {
          id: postData.user_id,
          name: authorName,
          avatar: postData.user_avatar,
          initials: getInitials(authorName || 'U'),
        },
        content: postData.content,
        imageUrl: postData.links[0]?.url,
        timeAgo: getTimeAgo(postData.public_date, { withSuffix: true }),
        likeCount: postData.like_count ?? 0,
        commentCount: postData.comment_count ?? 0,
        comments: (commentsData ?? []).map((c: CommentResponse) => ({
          id: c.id,
          author: {
            id: c.user_id,
            name: c.author.name,
            avatar: c.author.avatar,
            initials: getInitials(c.author.name),
          },
          content: c.content,
          timeAgo: getTimeAgo(c.created_at, { withSuffix: true }),
          likeCount: c.like_count,
          replies: [],
          totalReplies: c.total_replies || 0,
        })),
      }
    : null;

  return {
    isModalOpen,
    postDetail,
    isFetching: isPostFetching || isCommentsFetching,
    openPostDetail,
    closePostDetail,
  };
}
