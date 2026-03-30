import { useState } from 'react';
import { ImageSquareIcon } from '@phosphor-icons/react';
import { Modal, Button, Avatar, Textarea, toast } from '@frontend-team/ui-kit';
import { useGetMyProfileQuery } from '@/services/userProfile.service';
import { useCreatePostMutation } from '@/services/post.service';
import { getInitials } from '@/utils/getInitials';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const { data: profile } = useGetMyProfileQuery();
  const [createPost] = useCreatePostMutation();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const name = profile?.name ?? '';
  const initials = getInitials(name);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setIsSubmitting(true);
    try {
      await createPost({ content: content.trim() }).unwrap();
      toast.success('Đã đăng bài viết mới thành công!');
      setContent('');
      onClose();
    } catch (error) {
      toast.error('Có lỗi xảy ra khi đăng bài. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setContent('');
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onOpenChange={(open) => !open && handleClose()}
      title="Tạo bài viết"
      size="lg"
      footer={
        <div className="flex items-center justify-between w-full">
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 radius_8 hover:bg_secondary transition-colors text-sm font-medium text_secondary cursor-pointer border-none bg-transparent"
          >
            <ImageSquareIcon size={20} className="fg_success" weight="fill" />
            Ảnh/Video
          </button>
          <Button
            onClick={handleSubmit}
            disabled={!content.trim() || isSubmitting}
            className="bg_accent_primary text_contrast radius_8 px-6"
          >
            {isSubmitting ? 'Đang đăng...' : 'Đăng bài'}
          </Button>
        </div>
      }
    >
      <div className="flex gap-3">
        <Avatar
          size="s"
          src={profile?.avatar}
          alt={name}
          fallback={initials}
          className="border border_primary shrink-0"
        />
        <div className="flex-1">
          <p className="text-sm font-semibold text_primary mb-2">{name}</p>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`${name} ơi, bạn đang nghĩ gì thế?`}
            className="min-h-[120px] resize-none"
          />
        </div>
      </div>
    </Modal>
  );
}
