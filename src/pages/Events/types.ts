export type EventStatus = 'all' | 'upcoming' | 'ongoing' | 'past';

export interface EventItem {
  id: string;
  title: string;
  thumbnail: string;
  contentType: string;
  redirectUrl: string | null;
  dateRange: string;
  status: Exclude<EventStatus, 'all'>;
}
