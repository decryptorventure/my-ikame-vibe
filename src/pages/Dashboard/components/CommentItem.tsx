import { useState } from 'react';
import { CaretDownIcon, CaretUpIcon, ThumbsUpIcon } from '@phosphor-icons/react';
import { Avatar } from '@frontend-team/ui-kit';
import ReplyInput from './ReplyInput';
import ReplyItem from './ReplyItem';
import type { Comment } from '../types';

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const [isRepliesExpanded, setIsRepliesExpanded] = useState(false);
  const [replyingToName, setReplyingToName] = useState<string | null>(null);
  const showReplyContainer = isRepliesExpanded && (comment.replies.length > 0 || replyingToName);

  const handleReplyToComment = () => {
    setReplyingToName(comment.author.name);
    setIsRepliesExpanded(true);
  };

  const handleHideReplies = () => {
    setIsRepliesExpanded(false);
    setReplyingToName(null);
  };

  return (
    <div className="flex gap-3">
      <Avatar
        size="xs"
        alt={comment.author.name}
        fallback={comment.author.initials}
        src={comment.author.avatar}
      />
      <div className="flex flex-1 flex-col gap-2">
        <div>
          <span className="text-sm font-semibold text_primary">{comment.author.name}</span>
          <span className="text-xs text_secondary"> · {comment.timeAgo}</span>
        </div>

        <p className="text-sm text_primary">{comment.content}</p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-1 text-xs text_secondary transition-colors hover:text_primary"
          >
            <ThumbsUpIcon size={14} weight="light" />
            <span>{comment.likeCount}</span>
          </button>
          <button
            type="button"
            onClick={handleReplyToComment}
            className="text-xs text_secondary transition-colors hover:text_primary"
          >
            Trả lời
          </button>
        </div>

        {comment.totalReplies > 0 && !isRepliesExpanded ? (
          <button
            type="button"
            onClick={() => setIsRepliesExpanded(true)}
            className="mt-1 flex items-center gap-1 text-xs text_secondary transition-colors hover:text_primary"
          >
            <CaretDownIcon size={14} />
            <span>Xem thêm {comment.totalReplies} phản hồi...</span>
          </button>
        ) : null}

        {comment.totalReplies > 0 && isRepliesExpanded ? (
          <button
            type="button"
            onClick={handleHideReplies}
            className="mt-1 flex items-center gap-1 text-xs text_secondary transition-colors hover:text_primary"
          >
            <CaretUpIcon size={14} />
            <span>Ẩn phản hồi</span>
          </button>
        ) : null}

        {showReplyContainer ? (
          <div className="mt-1 ml-2 flex flex-col gap-3">
            {comment.replies.map((reply) => (
              <ReplyItem
                key={reply.id}
                reply={reply}
                onReply={(authorName) => {
                  setReplyingToName(authorName);
                  setIsRepliesExpanded(true);
                }}
              />
            ))}
            {replyingToName ? (
              <ReplyInput
                replyToName={replyingToName}
                onClose={() => setReplyingToName(null)}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
