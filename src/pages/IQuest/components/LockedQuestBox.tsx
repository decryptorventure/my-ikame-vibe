import { LockKeyIcon } from '@phosphor-icons/react';
import { Card, CardContent } from '@frontend-team/ui-kit';

export default function LockedQuestBox() {
  return (
    <Card shadow="none" className="border border_primary bg_tertiary">
      <CardContent className="flex items-center gap-4 p-6">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg_tertiary">
          <LockKeyIcon className="size-5 text_tertiary" />
        </div>
        <p className="text-sm text_tertiary">
          Hoàn thành nhiệm vụ tân thủ để mở khóa các nhiệm vụ khác
        </p>
      </CardContent>
    </Card>
  );
}
