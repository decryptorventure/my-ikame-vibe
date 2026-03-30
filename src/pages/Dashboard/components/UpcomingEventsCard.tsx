import { Link } from 'react-router-dom';
import { Card, CardContent } from '@frontend-team/ui-kit';
import { ROUTES } from '@/constants';
import type { UpcomingEvent } from '../types';

const MAX_VISIBLE_EVENTS = 4;

interface UpcomingEventsCardProps {
  events: UpcomingEvent[];
  onEventClick?: (event: UpcomingEvent) => void;
}

export default function UpcomingEventsCard({ events, onEventClick }: UpcomingEventsCardProps) {
  const visibleEvents = events.slice(0, MAX_VISIBLE_EVENTS);

  return (
    <Card shadow="none" className="border-0 bg_canvas_primary">
      <CardContent className="p-6">
        <h3 className="font-semibold text_primary mb-4">Sự kiện sắp tới</h3>

        <div className="flex flex-col gap-3">
          {visibleEvents.map((event) => (
            <Card 
              key={event.id} 
              className="shadow-none bg_secondary border_primary cursor-pointer hover:bg_tertiary transition-colors"
              onClick={() => onEventClick?.(event)}
            >
              <div className="p-4">
                <p className="text-sm font-semibold text_primary mb-1">{event.title}</p>
                <p className="text-sm text_tertiary">
                  {event.date} • {event.time}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <Link to={ROUTES.EVENTS} className="text-sm font-medium fg_info hover:underline">
            Xem tất cả
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
