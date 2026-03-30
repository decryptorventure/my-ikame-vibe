import { Spinner } from '@frontend-team/ui-kit';

interface LoadingProps {
  tip?: string;
}

export default function Loading({ tip = 'Đang tải...' }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 min-h-screen">
      <Spinner size="lg" />
      <span className="text-sm text_secondary">{tip}</span>
    </div>
  );
}
