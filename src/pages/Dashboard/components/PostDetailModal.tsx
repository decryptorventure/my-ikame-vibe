import { Modal, ScrollArea, Skeleton, toast } from '@frontend-team/ui-kit';
import { useCreateCommentMutation } from '@/services/post.service';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import PostDetailContent from './PostDetailContent';
import type { PostDetail } from '../types';

interface PostDetailModalProps {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  post: PostDetail | null;
}

function PostDetailSkeleton() {
  return (
    <div className="flex flex-col gap-4 px-6">
      <div className="flex items-center gap-3">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="h-4 w-40" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-48 w-full rounded-lg" />
      <div className="flex gap-4">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  );
}

export default function PostDetailModal({
  isOpen,
  isLoading = false,
  onClose,
  post,
}: PostDetailModalProps) {
  const [createComment] = useCreateCommentMutation();

  const handleCommentSubmit = async (content: string) => {
    if (!post) return;
    try {
      await createComment({ postId: post.id, content }).unwrap();
      toast.success('Đã gửi bình luận!');
    } catch (error) {
      toast.error('Không thể gửi bình luận. Vui lòng thử lại.');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
      title={post ? `Bài đăng của ${post.author.name}` : 'Đang tải bài đăng'}
      size="xl"
      bodyClassName="-mx-6"
      footer={post ? <CommentInput onSubmit={handleCommentSubmit} /> : undefined}
    >
      {isLoading || !post ? (
        <PostDetailSkeleton />
      ) : (
        <ScrollArea viewportClassName="max-h-[75vh]">
          <div className="flex flex-col gap-4 px-6">
            <PostDetailContent post={post} />
            <hr className="border_primary" />
            <CommentList comments={post.comments} />
          </div>
        </ScrollArea>
      )}
    </Modal>
  );
}
