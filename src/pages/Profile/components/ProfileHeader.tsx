import { useState } from 'react';
import { CaretDownIcon, PencilSimpleIcon } from '@phosphor-icons/react';
import { Button, Card, CardContent } from '@frontend-team/ui-kit';
import AvatarWithEdit from '@/pages/Profile/components/AvatarWithEdit';
import ChangeAvatarModal from '@/pages/Profile/components/ChangeAvatarModal';
import EditProfileModal from '@/pages/Profile/components/EditProfileModal';
import type { ProfileUser } from '@/pages/Profile/types';

interface ProfileHeaderProps {
  user: ProfileUser;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function ProfileHeader({
  user,
  isExpanded,
  onToggleExpand,
}: ProfileHeaderProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  return (
    <Card shadow="none" className="border_primary bg_canvas_primary">
      <CardContent className="flex flex-col gap-6 p-6">
        <div className="flex flex-row items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <AvatarWithEdit
              src={user.avatarUrl}
              alt={user.name}
              fallback={user.avatarInitials}
              onEditClick={() => setIsAvatarModalOpen(true)}
            />

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text_primary">{user.name}</h2>
                {user.equippedBadge && (
                  <span className="text-xl" title="Thành tựu đang đeo">
                    {user.equippedBadge}
                  </span>
                )}
              </div>
              <p className="text-sm text_secondary">{user.jobTitle}</p>
            </div>
          </div>

          <Button
            type="button"
            variant="subtle"
            size="icon-m"
            aria-label="Chinh sua thong tin"
            className="shrink-0"
            onClick={() => setIsEditOpen(true)}
          >
            <PencilSimpleIcon size={20} />
          </Button>
        </div>

        <EditProfileModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          user={user}
        />
        <ChangeAvatarModal
          isOpen={isAvatarModalOpen}
          onClose={() => setIsAvatarModalOpen(false)}
          currentAvatarUrl={user.avatarUrl}
          userName={user.name}
          userInitials={user.avatarInitials}
        />

        <div className="border-t border_primary pt-6">
          <div className="relative">
            <div
              className={`grid grid-cols-2 gap-x-6 gap-y-4 transition-all duration-200 ${
                !isExpanded ? 'max-h-20 overflow-hidden' : ''
              }`}
            >
              <InfoField label="Ma nhan vien" value={user.employeeId} />
              <InfoField label="Email" value={user.email} />
              <InfoField label="Team" value={user.team} />
              <InfoField label="Phong ban" value={user.department} />
              <InfoField label="Ngay bat dau" value={user.joinDate} />
              <InfoField label="Ngay chinh thuc" value={user.officialDate} />
            </div>
            {!isExpanded ? (
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
                style={{
                  background: 'linear-gradient(to top, var(--ds-bg-canvas-primary), transparent)',
                }}
              />
            ) : null}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={onToggleExpand}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Thu gon thong tin' : 'Mo rong thong tin'}
            className="flex size-8 items-center justify-center rounded-full text_tertiary transition-colors hover:text_primary"
          >
            <CaretDownIcon
              size={20}
              className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

interface InfoFieldProps {
  label: string;
  value?: string;
}

function InfoField({ label, value }: InfoFieldProps) {
  if (!value) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text_tertiary">{label}</span>
      <span className="text-sm text_primary">{value}</span>
    </div>
  );
}
