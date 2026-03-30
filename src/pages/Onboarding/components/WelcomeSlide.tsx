interface WelcomeSlideProps {
  title: string;
  description: string;
  image: string;
  isActive: boolean;
}

export default function WelcomeSlide({ title, description, image, isActive }: WelcomeSlideProps) {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center gap-8 px-8 transition-all duration-500 ${
        isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
      }`}
    >
      <div className="w-full max-w-[340px] aspect-square flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain drop-shadow-lg"
        />
      </div>

      <div className="text-center max-w-md flex flex-col gap-3">
        <h2 className="text-2xl font-bold text_primary leading-tight">
          {title}
        </h2>
        <p className="text-base text_secondary leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
