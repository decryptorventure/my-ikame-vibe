import { useState } from 'react';
import { toast } from '@frontend-team/ui-kit';
import { useCreateProposalMutation } from '@/services/userProfile.service';
import type { ProfileUser } from '@/pages/Profile/types';

interface EditableFields {
  phone: string;
  address: string;
}

const INITIAL_FIELDS: EditableFields = {
  phone: '',
  address: '',
};

export function useEditProfile(user: ProfileUser) {
  const [createProposal, { isLoading }] = useCreateProposalMutation();
  const [fields, setFields] = useState<EditableFields>(INITIAL_FIELDS);

  const updateField = (key: keyof EditableFields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const resetFields = () => {
    setFields(INITIAL_FIELDS);
  };

  const handleSubmit = async () => {
    const changeFields: Partial<EditableFields> = {};

    if (fields.phone.trim()) {
      changeFields.phone = fields.phone.trim();
    }

    if (fields.address.trim()) {
      changeFields.address = fields.address.trim();
    }

    if (Object.keys(changeFields).length === 0) {
      toast.warning('Vui lòng nhập thông tin cần thay đổi.');
      return false;
    }

    try {
      await createProposal({
        user_id: user.id,
        created_by: user.id,
        change_fields: JSON.stringify(changeFields),
        created_at: new Date().toISOString(),
        status: 'pending',
        requested_by_app: 'HRIS',
      }).unwrap();
      toast.success('Đã gửi yêu cầu cập nhật thông tin.');
      resetFields();
      return true;
    } catch {
      toast.error('Gửi yêu cầu thất bại. Vui lòng thử lại.');
      return false;
    }
  };

  return {
    fields,
    updateField,
    handleSubmit,
    isSubmitting: isLoading,
    resetFields,
  };
}
