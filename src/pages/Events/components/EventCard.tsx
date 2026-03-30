import { Badge, Card } from '@frontend-team/ui-kit';
import type { EventItem, EventStatus } from '@/pages/Events/types';

const STATUS_CONFIG: Record<
  Exclude<EventStatus, 'all'>,
  { label: string; color: 'green' | 'blue' | 'gray' }
> = {
  upcoming: { label: 'Sắp diễn ra', color: 'blue' },
  ongoing: { label: 'Đang diễn ra', color: 'green' },
  past: { label: 'Đã kết thúc', color: 'gray' },
};

interface EventCardProps {
  event: EventItem;
}

function EventCardContent({ event }: EventCardProps) {
  const statusInfo = STATUS_CONFIG[event.status];

  return (
    <Card shadow="none" className="overflow-hidden">
      <div className="flex gap-4 p-4">
        {event.thumbnail ? (
          <img
            src={event.thumbnail}
            alt={event.title}
            className="h-[140px] w-[140px] shrink-0 rounded-xl object-cover"
          />
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-center gap-2">
            <h4 className="text-base font-semibold text_primary">{event.title}</h4>
            <Badge color={statusInfo.color} size="s" className="shrink-0">
              {statusInfo.label}
            </Badge>
          </div>

          <span className="text-sm text_tertiary">{event.dateRange}</span>
        </div>
      </div>
    </Card>
  );
}

export default function EventCard({ event }: EventCardProps) {
  if (!event.redirectUrl) {
    return <EventCardContent event={event} />;
  }

  return (
    <a
      href={event.redirectUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block transition-opacity hover:opacity-90"
    >
      <EventCardContent event={event} />
    </a>
  );
}
