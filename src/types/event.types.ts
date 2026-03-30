export interface EventResponse {
  id: string;
  title: string;
  thumbnail: string;
  content_type: string;
  content: string;
  redirect_url: string | null;
  start_event: string;
  start_show: string;
  end_event: string;
  created_at: string;
  updated_at: string;
}
