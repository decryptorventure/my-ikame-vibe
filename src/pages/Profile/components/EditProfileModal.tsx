import type { ReactNode } from 'react';
import { Button, Input, Modal } from '@frontend-team/ui-kit';
import { useEditProfile } from '@/pages/Profile/hooks/useEditProfile';
import type { ProfileUser } from '@/pages/Profile/types';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: ProfileUser;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  user,
}: EditProfileModalProps) {
  const { fields, updateField, handleSubmit, isSubmitting, resetFields } = useEditProfile(user);

  const handleClose = () => {
    resetFields();
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
      title="Yêu cầu cập nhật thông tin"
      size="md"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="subtle" onClick={handleClose} disabled={isSubmitting}>
            Hủy
          </Button>
          <Button onClick={onSave} loading={isSubmitting}>
            Gửi yêu cầu
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <FormField label="Số điện thoại">
          <Input
            placeholder="Nhập số điện thoại mới"
            value={fields.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            disabled={isSubmitting}
          />
        </FormField>
        <FormField label="Địa chỉ">
          <Input
            placeholder="Nhập địa chỉ mới"
            value={fields.address}
            onChange={(event) => updateField('address', event.target.value)}
            disabled={isSubmitting}
          />
        </FormField>
      </div>
    </Modal>
  );
}

function FormField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text_primary">{label}</span>
      {children}
    </div>
  );
}
