import { useMemo } from 'react';
import { useGetEventsQuery } from '@/services/event.service';

export function useEventDetail(eventId: string) {
  const { data: eventsData, isLoading } = useGetEventsQuery();

  const event = useMemo(() => {
    const found = eventsData?.items?.find((e) => e.id === eventId);
    if (!found) return null;

    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return {
        date: date.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
        time: date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
    };

    const start = formatDate(found.start_event);
    const end = formatDate(found.end_event);

    return {
      id: found.id,
      title: found.title,
      thumbnail: found.thumbnail,
      content: found.content || 'Sự kiện chưa có mô tả chi tiết.',
      date: start.date,
      time: `${start.time} - ${end.time}`,
    };
  }, [eventsData, eventId]);

  return { event, isLoading };
}
