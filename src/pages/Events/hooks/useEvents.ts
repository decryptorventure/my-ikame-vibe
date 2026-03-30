import { useMemo, useState } from 'react';
import { useGetEventsQuery } from '@/services/event.service';
import type { EventItem, EventStatus } from '@/pages/Events/types';

function getEventStatus(startEvent: string, endEvent: string): Exclude<EventStatus, 'all'> {
  const now = Date.now();
  const start = new Date(startEvent).getTime();
  const end = new Date(endEvent).getTime();

  if (now < start) {
    return 'upcoming';
  }

  if (now > end) {
    return 'past';
  }

  return 'ongoing';
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function useEvents() {
  const [activeStatus, setActiveStatus] = useState<EventStatus>('all');
  const { data: eventsData, isLoading } = useGetEventsQuery({ page: 1, limit: 50 });

  const allEvents = useMemo<EventItem[]>(() => (
    (eventsData?.items ?? []).map((event) => ({
        id: event.id,
        title: event.title,
        thumbnail: event.thumbnail,
        contentType: event.content_type,
        redirectUrl: event.redirect_url,
        dateRange: `${formatDate(event.start_event)} - ${formatDate(event.end_event)}`,
        status: getEventStatus(event.start_event, event.end_event),
    }))
  ), [eventsData]);

  const filteredEvents = useMemo(() => {
    if (activeStatus === 'all') {
      return allEvents;
    }

    return allEvents.filter((event) => event.status === activeStatus);
  }, [activeStatus, allEvents]);

  return {
    events: filteredEvents,
    activeStatus,
    setActiveStatus,
    isLoading,
  };
}
