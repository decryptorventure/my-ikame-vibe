import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from '@frontend-team/ui-kit';
import { useUpdateAvatarMutation } from '@/services/userProfile.service';
import type { FileEntry } from '@frontend-team/ui-kit';

const MAX_AVATAR_SIZE = 5 * 1024 * 1024;

function createFileEntry(file: File, previewUrl: string): FileEntry {
  return {
    id: `${file.name}-${file.lastModified}`,
    name: file.name,
    size: file.size,
    status: 'done',
    preview: previewUrl,
  };
}

export function useChangeAvatar() {
  const [updateAvatar, { isLoading }] = useUpdateAvatarMutation();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const previewUrlRef = useRef<string | null>(null);

  const cleanup = useCallback(() => {
    setPreviewUrl((currentUrl) => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
      return null;
    });
    previewUrlRef.current = null;
    setSelectedFile(null);
  }, []);

  // Unmount-only cleanup - revoke preview URL when the component unmounts.
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const handleFileSelect = useCallback((files: File[]) => {
    const file = files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Vui lòng chọn file ảnh.');
      return;
    }

    if (file.size > MAX_AVATAR_SIZE) {
      toast.error('Ảnh không được vượt quá 5MB.');
      return;
    }

    setPreviewUrl((currentUrl) => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
      const newUrl = URL.createObjectURL(file);
      previewUrlRef.current = newUrl;
      return newUrl;
    });
    setSelectedFile(file);
  }, []);

  const handleFileRemove = useCallback((_fileId: string) => {
    cleanup();
  }, [cleanup]);

  const handleSubmit = async () => {
    if (!selectedFile) {
      return false;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await updateAvatar(formData).unwrap();
      toast.success('Cập nhật ảnh đại diện thành công.');
      return true;
    } catch {
      toast.error('Cập nhật ảnh thất bại. Vui lòng thử lại.');
      return false;
    }
  };

  return {
    files: selectedFile && previewUrl ? [createFileEntry(selectedFile, previewUrl)] : [],
    isUploading: isLoading,
    previewUrl,
    selectedFile,
    handleFileRemove,
    handleFileSelect,
    handleSubmit,
    cleanup,
  };
}
