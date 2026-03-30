import { 
  Modal, 
  Button, 
  Badge 
} from '@frontend-team/ui-kit';
import { 
  Info, 
  Lightning, 
  Coins, 
  CheckCircle, 
  PlayCircle 
} from '@phosphor-icons/react';
import type { IQuestItem } from '../types';

interface QuestDetailModalProps {
  quest: IQuestItem | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (action: string) => void;
  onClaim?: (id: string) => void;
}

export default function QuestDetailModal({ quest, isOpen, onClose, onComplete, onClaim }: QuestDetailModalProps) {
  if (!quest) return null;

  const isCompleted = quest.status === 'completed' || quest.status === 'claimed';

  return (
    <Modal 
      open={isOpen} 
      onOpenChange={(open) => !open && onClose()} 
      size="md"
      title="Chi tiết nhiệm vụ"
      bodyClassName="px-6 pt-2 pb-8"
    >
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex items-center gap-4">
          <div className="size-16 radius_16 bg_blue_subtle flex items-center justify-center border border_info opacity-90 shadow_xs relative overflow-hidden">
             <PlayCircle size={32} weight="fill" className="fg_info relative z-10" />
          </div>
          <div className="flex flex-col gap-1.5 flex-1 p-1">
             <h3 className="text-xl font-bold text_primary leading-tight">{quest.title}</h3>
             <div className="flex gap-1.5 flex-wrap">
                <Badge className="bg_secondary text_tertiary border-none px-2.5 h-6 text-[10px] font-bold uppercase tracking-wider">
                    COMMON
                </Badge>
                <Badge className="bg_indigo_subtle text_brand_primary border-none px-2.5 h-6 text-[10px] font-bold uppercase tracking-wider">
                    IT & TOOLS
                </Badge>
             </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg_secondary border border_primary radius_16 p-5">
            <span className="text-[10px] font-bold text_tertiary uppercase tracking-[0.15em] mb-2 block p-1">MÔ TẢ</span>
            <p className="text-sm text_secondary leading-relaxed font-medium">
                {quest.action}. Tìm hiểu thêm về vai trò của bạn trong dự án và làm quen với quy trình làm việc.
            </p>
        </div>

        {/* Action/Instruction Section */}
        <div className="bg_orange_subtle border border_tertiary radius_16 p-5 border-l-4 border-l_accent_primary">
            <div className="flex items-center gap-2 mb-2 p-1">
                <Info size={16} weight="bold" className="fg_accent_primary" />
                <span className="text-[10px] font-bold fg_accent_primary uppercase tracking-[0.15em]">CÁCH THỰC HIỆN</span>
            </div>
            <p className="text-sm text_secondary leading-relaxed font-semibold">
                Đăng nhập vào hệ thống {quest.title.split(' ').pop()}, tìm kiếm Project "Onboarding - [Tên của bạn]" và hoàn thành Checklist đã được gán sẵn.
            </p>
        </div>

        {/* Rewards Section */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg_green_subtle p-4 radius_16 border border_success flex flex-col gap-1">
                <span className="text-[9px] font-bold fg_success uppercase tracking-widest px-1">THƯỞNG EXP</span>
                <div className="flex items-center gap-1.5">
                    <Lightning size={18} weight="fill" className="fg_success" />
                    <span className="text-lg font-black fg_success">+{quest.expPoints} EXP</span>
                </div>
            </div>

            <div className="bg_amber_subtle p-4 radius_16 border border_amber flex flex-col gap-1">
                <span className="text-[9px] font-bold fg_amber_strong uppercase tracking-widest px-1">THƯỞNG CREDITS</span>
                <div className="flex items-center gap-1.5">
                    <Coins size={18} weight="fill" className="fg_amber_strong" />
                    <span className="text-lg font-black fg_amber_strong">+{Math.floor(quest.expPoints / 5)} Credits</span>
                </div>
            </div>
        </div>

        {/* Footer Action */}
        <div className="mt-2">
            {quest.status === 'claimed' ? (
                <Button className="w-full h-14 radius_16 font-bold text-lg bg_tertiary text_tertiary cursor-not-allowed opacity-50 border-none">
                    <div className="flex items-center gap-2">
                        <CheckCircle size={22} weight="fill" className="fg_success" />
                        Đã nhận thưởng
                    </div>
                </Button>
            ) : quest.status === 'completed' ? (
                <Button 
                    className="w-full h-14 radius_16 font-bold text-lg shadow_xs border-none bg_accent_primary text_contrast hover:shadow_m active:scale-95"
                    onClick={() => onClaim?.(quest.id)}
                >
                    Nhận thưởng ngay! 🎁
                </Button>
            ) : (
                <Button 
                    className="w-full h-14 radius_16 font-bold text-lg shadow_xs border-none bg_interactive_primary text_contrast hover:shadow_m active:scale-95"
                    onClick={() => onComplete?.(quest.action)}
                >
                    Hoàn thành ngay! 🚀
                </Button>
            )}
        </div>
      </div>
    </Modal>

  );
}
