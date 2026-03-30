import { Card, CardContent } from '@frontend-team/ui-kit';

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = 'Chưa có dữ liệu',
  description = 'Dữ liệu sẽ hiển thị khi có nội dung mới.',
}: EmptyStateProps) {
  return (
    <Card shadow="none" className="bg_canvas_primary">
      <CardContent className="flex flex-col items-center justify-center gap-2 py-12">
        <span className="text-3xl">📭</span>
        <p className="text-sm font-semibold text_primary">{title}</p>
        <p className="text-xs text_tertiary text-center max-w-60">{description}</p>
      </CardContent>
    </Card>
  );
}
