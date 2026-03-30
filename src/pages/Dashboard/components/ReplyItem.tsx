import { ThumbsUpIcon } from '@phosphor-icons/react';
import { Avatar } from '@frontend-team/ui-kit';
import type { Reply } from '../types';

interface ReplyItemProps {
  reply: Reply;
  onReply: (authorName: string) => void;
}

export default function ReplyItem({ reply, onReply }: ReplyItemProps) {
  return (
    <div className="flex gap-2">
      <Avatar
        size="xxs"
        alt={reply.author.name}
        fallback={reply.author.initials}
        src={reply.author.avatar}
      />
      <div className="flex-1">
        <div>
          <span className="text-xs font-semibold text_primary">{reply.author.name}</span>
          <span className="text-xs text_secondary"> · {reply.timeAgo}</span>
        </div>
        <p className="mt-1 text-xs text_primary">{reply.content}</p>
        <div className="mt-1 flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-1 text-xs text_secondary transition-colors hover:text_primary"
          >
            <ThumbsUpIcon size={12} weight="light" />
            <span>{reply.likeCount}</span>
          </button>
          <button
            type="button"
            onClick={() => onReply(reply.author.name)}
            className="text-xs text_secondary transition-colors hover:text_primary"
          >
            Trả lời
          </button>
        </div>
      </div>
    </div>
  );
}
