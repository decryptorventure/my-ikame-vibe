import { useState } from 'react';
import { PaperPlaneRightIcon } from '@phosphor-icons/react';
import { Avatar } from '@frontend-team/ui-kit';
import { useGetMyProfileQuery } from '@/services/userProfile.service';
import { getInitials } from '@/utils/getInitials';

interface CommentInputProps {
  onSubmit?: (content: string) => void;
  placeholder?: string;
}

export default function CommentInput({ onSubmit, placeholder = 'Viết bình luận...' }: CommentInputProps) {
  const { data: profile } = useGetMyProfileQuery();
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit?.(value.trim());
    setValue('');
  };

  return (
    <div className="flex items-center gap-3 px-6">
      <Avatar
        size="xs"
        src={profile?.avatar}
        fallback={getInitials(profile?.name ?? '')}
        className="border border_primary shrink-0"
      />
      <div className="flex-1 flex items-center gap-2 bg_secondary radius_round px-3 py-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none text-sm text_primary placeholder:text_tertiary"
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!value.trim()}
          className="flex items-center justify-center size-7 radius_round bg_accent_primary text_contrast cursor-pointer border-none disabled:opacity-40 hover:shadow_xs transition-all active:scale-90"
        >
          <PaperPlaneRightIcon size={14} weight="bold" />
        </button>
      </div>
    </div>
  );
}
