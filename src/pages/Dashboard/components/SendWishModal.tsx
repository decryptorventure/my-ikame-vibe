import { useState } from 'react';
import { Modal, Button, Avatar, Textarea, toast } from '@frontend-team/ui-kit';
import { CakeIcon, MedalIcon, PaperPlaneRightIcon } from '@phosphor-icons/react';
import type { SocialTodayItem } from '@/types/social.types';
import { useDashboard } from '../hooks';

interface SendWishModalProps {
  isOpen: boolean;
  onClose: () => void;
  target: SocialTodayItem | null;
}

const TEMPLATES = {
  birthday: [
    'Chúc mừng sinh nhật! Chúc bạn luôn vui vẻ và thành công! 🎂🎉',
    'Happy Birthday! Wish you all the best! 🎈✨',
    'Sinh nhật vui vẻ nhé! Chúc bạn mọi điều tốt đẹp! 🌟',
  ],
  anniversary: [
    'Chúc mừng kỷ niệm! Cảm ơn bạn đã đóng góp xuất sắc cho iKame! 🎖️',
    'Congratulations on your work anniversary! You are amazing! 🏆',
    'Chúc mừng cột mốc thâm niên! Cảm ơn vì sự gắn bó! 🌟',
  ],
};

export default function SendWishModal({ isOpen, onClose, target }: SendWishModalProps) {
  const { handleCompleteQuest } = useDashboard();
  const templates = target ? TEMPLATES[target.type] : [];
  const [message, setMessage] = useState(templates[0] ?? '');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim() || !target) return;
    setIsSending(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 600));
      // Trigger quest completion based on type
      await handleCompleteQuest(target.type === 'birthday' ? 'birthday_wish' : 'anniversary_wish');
      toast.success(`Đã gửi lời chúc đến ${target.name}!`);
      setMessage('');
      onClose();
    } catch (error) {
      toast.error('Có lỗi xảy ra khi gửi lời chúc.');
    } finally {
      setIsSending(false);
    }
  };

  const handleClose = () => {
    setMessage('');
    onClose();
  };

  if (!target) return null;

  const isBirthday = target.type === 'birthday';
  const Icon = isBirthday ? CakeIcon : MedalIcon;

  return (
    <Modal
      open={isOpen}
      onOpenChange={(open) => !open && handleClose()}
      title={isBirthday ? 'Gửi lời chúc sinh nhật' : 'Gửi lời chúc thâm niên'}
      size="lg"
      footer={
        <div className="flex items-center justify-between w-full">
          <span className="text-xs text_tertiary">+50 EXP khi gửi lời chúc</span>
          <Button
            onClick={handleSend}
            disabled={!message.trim() || isSending}
            className="bg_accent_primary text_contrast radius_8 px-6 gap-2"
          >
            <PaperPlaneRightIcon size={16} weight="bold" />
            {isSending ? 'Đang gửi...' : 'Gửi lời chúc'}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        {/* Target user */}
        <div className="flex items-center gap-3 p-3 bg_secondary radius_12">
          <Avatar size="s" src={target.avatar} fallback={target.name[0]} className="border border_primary" />
          <div className="flex-1">
            <span className="text-sm font-semibold text_primary">{target.name}</span>
            <div className="flex items-center gap-1 text-xs text_secondary">
              <Icon size={14} weight="fill" className="fg_accent_primary" />
              <span>{isBirthday ? 'Sinh nhật hôm nay' : `Kỷ niệm ${target.years} năm`}</span>
            </div>
          </div>
        </div>

        {/* Quick templates */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text_tertiary uppercase tracking-wider">Gợi ý nhanh</span>
          <div className="flex flex-wrap gap-2">
            {templates.map((t, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setMessage(t)}
                className={`text-xs px-3 py-1.5 radius_round border cursor-pointer transition-all ${
                  message === t
                    ? 'border-[var(--color-accent-primary)] bg_accent_primary/10 fg_accent_primary font-semibold'
                    : 'border_tertiary bg_secondary text_secondary hover:bg_tertiary'
                }`}
              >
                {t.slice(0, 40)}…
              </button>
            ))}
          </div>
        </div>

        {/* Custom message */}
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Viết lời chúc của bạn..."
          className="min-h-[80px] resize-none"
        />
      </div>
    </Modal>
  );
}
