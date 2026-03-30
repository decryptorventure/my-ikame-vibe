interface SlideIndicatorProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export default function SlideIndicator({ total, current, onSelect }: SlideIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Slide ${i + 1}`}
          onClick={() => onSelect(i)}
          className={`transition-all duration-300 border-none cursor-pointer outline-none ${
            i === current
              ? 'w-8 h-2.5 radius_round bg_accent_primary shadow_xs'
              : 'size-2.5 radius_round bg_tertiary hover:bg_secondary'
          }`}
        />
      ))}
    </div>
  );
}
