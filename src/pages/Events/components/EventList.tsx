import type { EventItem } from '@/pages/Events/types';
import EventCard from '@/pages/Events/components/EventCard';

interface EventListProps {
  events: EventItem[];
}

export default function EventList({ events }: EventListProps) {
  return (
    <div className="flex flex-col gap-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
