import { CalendarIcon, ClockIcon } from '@phosphor-icons/react';
import { Modal, ScrollArea, Button } from '@frontend-team/ui-kit';
import type { UpcomingEvent } from '../types';

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: UpcomingEvent | null;
}

export default function EventDetailModal({ isOpen, onClose, event }: EventDetailModalProps) {
  if (!event) return null;

  return (
    <Modal
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      title="Chi tiết sự kiện"
      size="xl"
    >
      <ScrollArea viewportClassName="max-h-[80vh]">
        <div className="flex flex-col gap-6 p-6">
          {event.thumbnail && (
            <img 
              src={event.thumbnail} 
              alt={event.title} 
              className="w-full aspect-video object-cover radius_12 border border_primary shadow_sm"
            />
          )}

          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text_primary leading-tight">{event.title}</h2>
            <div className="flex flex-wrap items-center gap-4 mt-1">
              <div className="flex items-center gap-1.5 text-sm font-medium text_secondary bg_secondary px-3 py-1 radius_round">
                <CalendarIcon size={16} weight="fill" className="fg_accent_primary" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium text_secondary bg_secondary px-3 py-1 radius_round">
                <ClockIcon size={16} weight="fill" className="fg_accent_primary" />
                <span>{event.time}</span>
              </div>
            </div>
          </div>

          <div className="h-px bg_secondary" />

          <div 
            className="text_primary text-base leading-relaxed rich-text space-y-3"
            dangerouslySetInnerHTML={{ __html: event.content || 'Sự kiện chưa có mô tả chi tiết.' }}
          />

          <div className="flex justify-end gap-3 pt-4 border-t border_primary mt-2">
            <Button variant="border" onClick={onClose} className="radius_8">Đóng</Button>
            <Button className="bg_accent_primary text_contrast radius_8 px-8 hover:shadow_m transition-all active:scale-95">
              Tham gia ngay
            </Button>
          </div>
        </div>
      </ScrollArea>
    </Modal>
  );
}
