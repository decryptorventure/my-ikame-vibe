import { Link } from 'react-router-dom';
import { Card, CardContent } from '@frontend-team/ui-kit';
import { ROUTES } from '@/constants';
import type { UpcomingEvent } from '@/types/shared.types';

const MAX_VISIBLE_EVENTS = 4;

interface UpcomingEventsCardProps {
  events: UpcomingEvent[];
}

export default function UpcomingEventsCard({ events }: UpcomingEventsCardProps) {
  const visibleEvents = events.slice(0, MAX_VISIBLE_EVENTS);

  return (
    <Card shadow="none" className="border-0 bg_canvas_primary">
      <CardContent className="p-4">
        <h3 className="font-semibold text_primary mb-4 uppercase text-[10px] tracking-widest opacity-60">Sự kiện sắp tới</h3>

        <div className="flex flex-col gap-3">
          {visibleEvents.map((event) => (
            <Link 
              key={event.id} 
              to={ROUTES.EVENT_DETAIL.replace(':id', event.id)}
              className="p-3 bg_secondary radius_12 border_primary border hover:border_brand_primary transition-colors cursor-pointer block no-underline"
            >
              <p className="text-sm font-semibold text_primary mb-0.5">{event.title}</p>
              <p className="text-[10px] font-medium text_tertiary">
                {event.date} • {event.time}
              </p>
            </Link>
          ))}
        </div>

        {events.length > MAX_VISIBLE_EVENTS && (
          <div className="mt-4 flex justify-center">
            <Link to={ROUTES.EVENTS} className="text-xs font-bold text_brand_primary hover:underline">
              XEM TẤT CẢ
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
