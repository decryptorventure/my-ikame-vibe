import { useState } from 'react';
import { ChatTeardropIcon, FireSimpleIcon } from '@phosphor-icons/react';
import { Avatar } from '@frontend-team/ui-kit';
import UserNameLink from '@/components/common/UserNameLink';
import type { Post } from '../types';

interface PostCardProps {
  post: Post;
  onClick?: () => void;
}

export default function PostCard({ post, onClick }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const displayLikes = isLiked ? post.likeCount + 1 : post.likeCount;

  return (
    <div
      role="button"
      tabIndex={0}
      className="p-6 cursor-pointer hover:bg_secondary transition-colors group"
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="flex gap-4">
        <Avatar
          size="s"
          src={post.authorAvatar}
          alt={post.authorName}
          fallback={post.authorInitials}
          className="border border_primary shrink-0"
        />
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {post.authorId ? (
                <UserNameLink
                  userId={post.authorId}
                  name={post.authorName}
                  className="text-sm text_primary group-hover:fg_accent_primary transition-colors"
                />
              ) : (
                <span className="text-sm font-bold text_primary group-hover:fg_accent_primary transition-colors">
                  {post.authorName}
                </span>
              )}
              <span className="text-[12px] text_tertiary">· {post.timeAgo}</span>
            </div>
          </div>

          <div
            className="text-sm text_primary line-clamp-3 leading-relaxed [&_img]:hidden"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt=""
              className="w-full radius_8 aspect-[2/1] object-cover border border_primary shadow_sm"
            />
          )}

          <div className="flex items-center gap-6 mt-1">
            <button
              type="button"
              className={`flex items-center gap-1.5 text-sm font-medium transition-all border-none bg-transparent cursor-pointer p-0 outline-none ${
                isLiked ? 'fg_error scale-110' : 'text_secondary hover:text_primary'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
            >
              <FireSimpleIcon size={20} weight={isLiked ? "fill" : "light"} />
              <span>{displayLikes}</span>
            </button>

            <div className="flex items-center gap-1.5 text-sm font-medium text_secondary">
              <ChatTeardropIcon size={20} weight="light" />
              <span>{post.commentCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
