import { useNavigate } from 'react-router-dom';
import { Button } from '@frontend-team/ui-kit';
import { HouseIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';
import { ROUTES } from '@/constants';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-6 text-center">
      <div className="text-8xl font-black text_tertiary opacity-30 select-none">404</div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text_primary">Không tìm thấy trang</h1>
        <p className="text-base text_secondary max-w-md">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>
      </div>
      <div className="flex gap-3">
        <Button
          onClick={() => navigate(ROUTES.DASHBOARD)}
          size="l"
          className="bg_accent_primary text_contrast radius_8 px-6 gap-2"
        >
          <HouseIcon size={18} weight="bold" />
          Về trang chủ
        </Button>
        <Button
          variant="border"
          onClick={() => navigate(-1)}
          size="l"
          className="radius_8 px-6 gap-2"
        >
          <MagnifyingGlassIcon size={18} />
          Quay lại
        </Button>
      </div>
    </div>
  );
}
