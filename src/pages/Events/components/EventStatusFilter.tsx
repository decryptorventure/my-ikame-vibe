import { Badge } from '@frontend-team/ui-kit';
import type { EventStatus } from '@/pages/Events/types';

const STATUSES = [
  { value: 'all', label: 'Tất cả' },
  { value: 'upcoming', label: 'Sắp diễn ra' },
  { value: 'ongoing', label: 'Đang diễn ra' },
  { value: 'past', label: 'Đã kết thúc' },
] as const satisfies ReadonlyArray<{
  value: EventStatus;
  label: string;
}>;

interface EventStatusFilterProps {
  activeStatus: EventStatus;
  onStatusChange: (status: EventStatus) => void;
}

export default function EventStatusFilter({
  activeStatus,
  onStatusChange,
}: EventStatusFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {STATUSES.map((status) => {
        const isActive = activeStatus === status.value;

        return (
          <Badge
            key={status.value}
            role="button"
            tabIndex={0}
            aria-pressed={isActive}
            color={isActive ? 'blue' : undefined}
            onClick={() => onStatusChange(status.value)}
            onKeyDown={(event) => {
              if (event.key !== 'Enter' && event.key !== ' ') {
                return;
              }

              event.preventDefault();
              onStatusChange(status.value);
            }}
            size="l"
            className="cursor-pointer"
          >
            {status.label}
          </Badge>
        );
      })}
    </div>
  );
}
