import starImg from '@/assets/star.png';

interface RewardCoinHeaderProps {
  coinBalance: number;
  coinTotalEarned: number;
  coinTotalSpent: number;
}

export default function RewardCoinHeader({
  coinBalance,
  coinTotalEarned,
  coinTotalSpent,
}: RewardCoinHeaderProps) {
  return (
    <div className="radius_16 bg_accent_primary p-6 shadow_m border border_primary/20 overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 size-32 bg-white/5 radius_round -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm text_contrast opacity-80">iKame Coin của bạn</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text_contrast">{coinBalance.toLocaleString()}</span>
            <span className="text-base text_contrast opacity-80">coin</span>
          </div>
          <p className="mt-1 text-xs text_contrast opacity-70">
            Coin chỉ nhận được khi lên cấp — không reset theo mùa
          </p>
        </div>
        <img src={starImg} alt="coin" className="size-14 opacity-90 drop-shadow-lg" />
      </div>

      <div className="relative z-10 mt-6 flex gap-8 border-t border-white/20 pt-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text_contrast opacity-70">Đã kiếm được</span>
          <span className="text-sm font-semibold text_contrast">
            {coinTotalEarned.toLocaleString()} coin
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text_contrast opacity-70">Đã sử dụng</span>
          <span className="text-sm font-semibold text_contrast">
            {coinTotalSpent.toLocaleString()} coin
          </span>
        </div>
      </div>
    </div>
  );
}
