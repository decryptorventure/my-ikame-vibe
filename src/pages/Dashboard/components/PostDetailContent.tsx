import { useState } from 'react';
import { ChatTeardropIcon, FireSimpleIcon } from '@phosphor-icons/react';
import { Avatar } from '@frontend-team/ui-kit';
import type { PostDetail } from '../types';

interface PostDetailContentProps {
  post: PostDetail;
}

export default function PostDetailContent({ post }: PostDetailContentProps) {
  const [isLiked, setIsLiked] = useState(false);
  const displayLikes = isLiked ? post.likeCount + 1 : post.likeCount;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Avatar
          size="s"
          src={post.author.avatar}
          alt={post.author.name}
          fallback={post.author.initials}
          className="border border_primary"
        />
        <div className="flex flex-col">
          <span className="text-sm font-bold text_primary leading-tight">{post.author.name}</span>
          <span className="text-xs text_tertiary mt-0.5">{post.timeAgo}</span>
        </div>
      </div>

      <div
        className="text-[15px] text_primary leading-relaxed [&_a]:fg_info [&_a]:underline [&_img]:my-3 [&_img]:max-w-full [&_img]:radius_12 [&_img]:object-cover [&_img]:border [&_img]:border_primary"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {post.imageUrl ? (
        <img
          src={post.imageUrl}
          alt="Post image"
          className="aspect-[2/1] w-full radius_12 object-cover border border_primary shadow_sm"
        />
      ) : (
        <div className="aspect-[2/1] w-full radius_12 bg_secondary border border_primary border-dashed" />
      )}

      <div className="flex items-center gap-6 mt-2 pt-4 border-t border_primary">
        <button 
          type="button"
          className={`flex items-center gap-2 text-sm font-semibold transition-all border-none bg-transparent cursor-pointer p-0 outline-none ${
            isLiked ? 'fg_error scale-110' : 'text_secondary hover:text_primary'
          }`}
          onClick={() => setIsLiked(!isLiked)}
        >
          <FireSimpleIcon size={22} weight={isLiked ? "fill" : "light"} />
          <span>{displayLikes} Lượt thích</span>
        </button>
        
        <div className="flex items-center gap-2 text-sm font-semibold text_secondary">
          <ChatTeardropIcon size={22} weight="light" />
          <span>{post.commentCount} Bình luận</span>
        </div>
      </div>
    </div>
  );
}
