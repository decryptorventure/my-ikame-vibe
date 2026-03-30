import { Avatar, Button, FileUpload, Modal } from '@frontend-team/ui-kit';
import { useChangeAvatar } from '@/pages/Profile/hooks/useChangeAvatar';

interface ChangeAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatarUrl?: string;
  userName: string;
  userInitials: string;
}

const MAX_AVATAR_SIZE = 5 * 1024 * 1024;

export default function ChangeAvatarModal({
  isOpen,
  onClose,
  currentAvatarUrl,
  userName,
  userInitials,
}: ChangeAvatarModalProps) {
  const {
    files,
    previewUrl,
    selectedFile,
    isUploading,
    handleFileRemove,
    handleFileSelect,
    handleSubmit,
    cleanup,
  } = useChangeAvatar();

  const handleClose = () => {
    cleanup();
    onClose();
  };

  const onSave = async () => {
    const isSuccess = await handleSubmit();

    if (isSuccess) {
      handleClose();
    }
  };

  return (
    <Modal
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleClose();
        }
      }}
      title="Thay đổi ảnh đại diện"
      size="sm"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="subtle" onClick={handleClose} disabled={isUploading}>
            Hủy
          </Button>
          <Button onClick={onSave} loading={isUploading} disabled={!selectedFile}>
            Lưu
          </Button>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-6">
        <Avatar
          size="xl"
          src={previewUrl ?? currentAvatarUrl}
          alt={userName}
          fallback={userInitials}
        />
        <FileUpload
          accept="image/*"
          maxSize={MAX_AVATAR_SIZE}
          files={files}
          onFileAdd={handleFileSelect}
          onFileRemove={handleFileRemove}
          placeholder="Tải ảnh lên"
          description="PNG, JPG, WEBP (tối đa 5MB)"
          disabled={isUploading}
        />
      </div>
    </Modal>
  );
}
