import Lottie from 'lottie-react';
import { 
  Modal, 
  Button,
  Badge
} from '@frontend-team/ui-kit';
import { 
  Confetti, 
  Coins, 
  Lightning, 
  Medal, 
  ArrowUpRight,
} from '@phosphor-icons/react';
import confettiAnimation from '@/assets/confetti.json';

interface CelebrationModalProps {
  type: 'level_up' | 'onboarding_complete' | 'quest_reward';
  level?: number;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  exp?: number;
}

export default function CelebrationModal({ 
  type, 
  level, 
  isOpen, 
  onClose,
  title,
  subtitle,
  exp,
}: CelebrationModalProps) {
  const isLevelUp = type === 'level_up';

  return (
    <Modal 
      open={isOpen} 
      onOpenChange={(open) => !open && onClose()} 
      size="md"
      showCloseButton={false}
      className="p-0 border-none bg-transparent shadow-none"
    >
      <div className="relative flex flex-col items-center bg_canvas_primary radius_24 overflow-hidden border_primary border shadow_xl">
        {/* Header Background */}
        <div className="w-full h-48 bg_accent_primary relative flex items-center justify-center">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
            
            {/* Improved Icon Container - cleaner design to not block animation */}
            <div className="relative z-10 size-24 radius_round flex items-center justify-center border border-white/20 bg-white/10 backdrop-blur-sm shadow_m">
                <Confetti size={48} weight="fill" className="text_contrast drop-shadow-lg" />
            </div>

            {/* Confetti Animation Overlay */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <Lottie
                    animationData={confettiAnimation}
                    loop={!isLevelUp}
                    className="size-full scale-150 opacity-100" // Increased opacity
                />
            </div>
        </div>


        <div className="p-8 flex flex-col items-center text-center w-full">
            <div className="mb-4">
                <Badge variant="outline" className="bg_orange_subtle text_brand_primary border-none px-4 py-1.5 radius_round font-bold text-[10px] tracking-wider uppercase">
                    {type === 'level_up' ? 'THÀNH TỰU iQUEST' : type === 'onboarding_complete' ? 'THÀNH TỰU ONBOARDING' : 'THƯỞNG NHIỆM VỤ'}
                </Badge>
            </div>

            <h2 className="text-2xl font-black text_primary mb-2 flex items-center gap-2">
                {title || (type === 'level_up' ? `Bạn đã lên cấp ${level}!` : type === 'onboarding_complete' ? 'Chào mừng iKamer mới!' : 'Chúc mừng bạn!')}
                <span className="text-2xl">🎉</span>
            </h2>

            <p className="text-sm text_secondary mb-8 max-w-[320px]">
                {subtitle || (type === 'level_up' 
                    ? 'Bạn đã xuất sắc vượt qua các thử thách để nâng cấp bản thân. Hãy tiếp tục bứt phá nhé!'
                    : type === 'onboarding_complete'
                        ? 'Bạn đã xuất sắc hoàn thành tất cả nhiệm vụ tân thủ. Hãy nhận bộ quà tặng chào mừng từ gia đình iKame nhé!'
                        : 'Bạn đã hoàn thành nhiệm vụ và nhận được phần thưởng xứng đáng. Tiếp tục phát huy nhé!')}
            </p>

            {/* Reward Cards */}
            <div className="grid grid-cols-3 gap-3 w-full mb-8">
                <div className="bg_amber_subtle p-4 radius_16 border border_tertiary flex flex-col items-center justify-center">
                    <div className="size-8 bg_amber_medium radius_round flex items-center justify-center mb-2">
                        <Coins size={18} weight="fill" className="fg_amber_strong" />
                    </div>
                    <span className="text-base font-bold text_primary">+{exp || 200}</span>
                    <span className="text-[10px] font-bold text_tertiary uppercase tracking-widest">EXP</span>
                </div>

                <div className="bg_orange_subtle p-4 radius_16 border border_tertiary flex flex-col items-center justify-center">
                    <div className="size-8 bg_orange_medium radius_round flex items-center justify-center mb-2">
                        <Lightning size={18} weight="fill" className="fg_orange_strong" />
                    </div>
                    <span className="text-base font-bold text_primary">{type === 'level_up' ? `Lv. ${level}` : 'LEVEL'}</span>
                    <span className="text-[10px] font-bold text_tertiary uppercase tracking-widest">{type === 'level_up' ? 'MỞ KHÓA' : 'TIẾN ĐỘ'}</span>
                </div>

                <div className="bg_green_subtle p-4 radius_16 border border_tertiary flex flex-col items-center justify-center">
                    <div className="size-8 bg_green_medium radius_round flex items-center justify-center mb-2">
                        <Medal size={18} weight="fill" className="fg_success" />
                    </div>
                    <span className="text-base font-bold text_primary">{type === 'onboarding_complete' ? 'Tân binh' : 'Chiến binh'}</span>
                    <span className="text-[10px] font-bold text_tertiary uppercase tracking-widest">HUY HIỆU</span>
                </div>
            </div>

            {/* Gift Section (Only for onboarding complete) */}
            {type === 'onboarding_complete' && (
                <div className="w-full bg_secondary border border_primary radius_24 p-6 mb-8">
                    <p className="text-[10px] font-bold text_tertiary uppercase tracking-widest mb-4">BỘ QUÀ TẶNG HIỆN VẬT</p>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { label: 'Sổ iKame 📓', bg: 'bg_blue_subtle', text: 'fg_blue_strong' },
                            { label: 'Bút iKame 🖊️', bg: 'bg_amber_subtle', text: 'fg_amber_strong' },
                            { label: 'Áo thun iKame 👕', bg: 'bg_red_subtle', text: 'fg_red_strong' },
                            { label: 'Bóng bay Tân thủ 🎈', bg: 'bg_purple_subtle', text: 'fg_purple_strong' },
                        ].map((gift) => (
                            <div key={gift.label} className={`${gift.bg} ${gift.text} py-2.5 radius_round text-xs font-bold`}>
                                {gift.label}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <Button 
              className="w-full bg_accent_primary text_contrast font-bold h-14 radius_16 text-lg shadow_m transition-all flex items-center justify-center gap-2 group border-none hover:brightness-110 active:scale-95"
              onClick={onClose}
            >
              Tuyệt vời! Tiếp tục hành trình
              <ArrowUpRight size={20} weight="bold" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
        </div>
      </div>
    </Modal>
  );
}
