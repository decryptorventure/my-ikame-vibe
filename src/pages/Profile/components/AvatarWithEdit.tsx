import { CameraIcon } from '@phosphor-icons/react';
import { Avatar } from '@frontend-team/ui-kit';

interface AvatarWithEditProps {
  src?: string;
  alt: string;
  fallback: string;
  onEditClick: () => void;
}

export default function AvatarWithEdit({
  src,
  alt,
  fallback,
  onEditClick,
}: AvatarWithEditProps) {
  return (
    <button
      type="button"
      onClick={onEditClick}
      className="group relative shrink-0"
      aria-label="Thay đổi ảnh đại diện"
    >
      <Avatar size="xl" src={src} alt={alt} fallback={fallback} />
      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
        <CameraIcon size={20} className="text-white" />
      </div>
    </button>
  );
}
