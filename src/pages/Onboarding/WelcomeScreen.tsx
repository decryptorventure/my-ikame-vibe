import { Button } from '@frontend-team/ui-kit';
import { ArrowRightIcon, RocketLaunchIcon } from '@phosphor-icons/react';

import { WelcomeSlide, SlideIndicator } from './components';
import { useWelcomeScreen } from './hooks';

import gamificationImg from '@/assets/onboarding-gamification.png';
import newsfeedImg from '@/assets/onboarding-newsfeed.png';
import questsImg from '@/assets/onboarding-quests.png';
import rewardsImg from '@/assets/onboarding-rewards.png';
import logo from '@/assets/logo.png';

const SLIDES = [
  {
    id: 'gamification',
    title: 'Làm mà chơi, chơi mà làm',
    description: 'Tích lũy EXP, lên cấp độ và cạnh tranh trên bảng xếp hạng qua mọi hoạt động hàng ngày.',
    image: gamificationImg,
  },
  {
    id: 'newsfeed',
    title: 'Kết nối & Chia sẻ',
    description: 'Đọc tin tức, chia sẻ cảm xúc, ghi nhận đồng nghiệp và chúc mừng những dấu mốc quan trọng.',
    image: newsfeedImg,
  },
  {
    id: 'quests',
    title: 'Nhiệm vụ mỗi ngày',
    description: 'Hoàn thành nhiệm vụ hàng ngày, hàng tuần và hàng tháng để nhận EXP và huy hiệu đặc biệt.',
    image: questsImg,
  },
  {
    id: 'rewards',
    title: 'Đổi thưởng xứng đáng',
    description: 'Dùng iKame Coin để đổi lấy quà tặng, ngày nghỉ và nhiều phần thưởng hấp dẫn khác.',
    image: rewardsImg,
  },
];

export default function WelcomeScreen() {
  const {
    currentIndex,
    isLastSlide,
    goNext,
    goToSlide,
    complete,
  } = useWelcomeScreen(SLIDES);

  return (
    <div className="h-screen w-screen bg_canvas_primary flex flex-col items-center justify-between overflow-hidden">
      {/* Logo */}
      <div className="pt-10 pb-4 flex items-center gap-2">
        <img src={logo} alt="iKame" className="size-10" />
        <span className="text-xl font-bold text_primary">My iKame</span>
      </div>

      {/* Slide area */}
      <div className="flex-1 w-full max-w-lg relative">
        {SLIDES.map((slide, index) => (
          <WelcomeSlide
            key={slide.id}
            title={slide.title}
            description={slide.description}
            image={slide.image}
            isActive={index === currentIndex}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="pb-12 pt-4 flex flex-col items-center gap-6">
        <SlideIndicator
          total={SLIDES.length}
          current={currentIndex}
          onSelect={goToSlide}
        />

        <div className="flex items-center gap-3">
          {!isLastSlide && (
            <button
              type="button"
              onClick={complete}
              className="text-sm text_tertiary hover:text_primary transition-colors cursor-pointer bg-transparent border-none outline-none px-4 py-2"
            >
              Bỏ qua
            </button>
          )}

          {isLastSlide ? (
            <Button
              onClick={complete}
              size="l"
              className="bg_accent_primary text_contrast radius_round px-8 hover:shadow_m transition-all active:scale-95 gap-2"
            >
              <RocketLaunchIcon size={20} weight="bold" />
              Bắt đầu hành trình
            </Button>
          ) : (
            <Button
              onClick={goNext}
              size="l"
              className="bg_accent_primary text_contrast radius_round px-8 hover:shadow_m transition-all active:scale-95 gap-2"
            >
              Tiếp theo
              <ArrowRightIcon size={16} weight="bold" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
