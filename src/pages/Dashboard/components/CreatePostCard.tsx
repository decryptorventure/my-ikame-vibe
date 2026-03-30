import { useState } from 'react';
import { ImageSquareIcon, SmileyIcon } from '@phosphor-icons/react';
import { Avatar, Card, CardContent } from '@frontend-team/ui-kit';
import { useGetMyProfileQuery } from '@/services/userProfile.service';
import { getInitials } from '@/utils/getInitials';
import CreatePostModal from './CreatePostModal';

export default function CreatePostCard() {
  const { data: profile } = useGetMyProfileQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const name = profile?.name ?? '';
  const initials = getInitials(name);

  return (
    <>
      <Card shadow="none" className="border_primary overflow-hidden hover:shadow_xs transition-shadow">
        <CardContent className="p-4 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Avatar
              size="s"
              src={profile?.avatar}
              alt={name}
              fallback={initials}
              className="border border_primary"
            />
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex-1 bg_secondary radius_round px-4 py-2.5 text-sm text_tertiary text-left hover:bg_tertiary transition-colors cursor-pointer outline-none border-none"
            >
              {name} ơi, bạn đang nghĩ gì thế?
            </button>
          </div>

          <div className="h-px bg_secondary -mx-4" />

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 radius_8 hover:bg_secondary transition-colors text-sm font-medium text_secondary cursor-pointer border-none bg-transparent"
            >
              <ImageSquareIcon size={20} className="fg_success" weight="fill" />
              Ảnh/Video
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 radius_8 hover:bg_secondary transition-colors text-sm font-medium text_secondary cursor-pointer border-none bg-transparent"
            >
              <SmileyIcon size={20} className="fg_amber_strong" weight="fill" />
              Cảm xúc
            </button>
          </div>
        </CardContent>
      </Card>

      <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
