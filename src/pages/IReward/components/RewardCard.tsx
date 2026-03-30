import { Card } from '@frontend-team/ui-kit';
import type { RewardCardItem } from '../types';

interface RewardCardProps {
  item: RewardCardItem;
  isRedeemed: boolean;
  onRedeem: (item: RewardCardItem) => void;
}

function StockBadge({ item }: { item: RewardCardItem }) {
  if (item.isOutOfStock) {
    return (
      <span className="radius_round px-2 py-0.5 text-xs font-medium bg_secondary text_tertiary">
        Hết hàng
      </span>
    );
  }
  if (item.isLowStock && item.stock !== null) {
    return (
      <span className="radius_round px-2 py-0.5 text-xs font-medium fg_amber_strong bg_warning_subtle">
        Sắp hết ({item.stock} còn lại)
      </span>
    );
  }
  if (item.stock !== null) {
    return <span className="text-xs text_tertiary">Còn: {item.stock}</span>;
  }
  return null;
}

export default function RewardCard({ item, isRedeemed, onRedeem }: RewardCardProps) {
  const isDisabled = !item.canAfford || item.isOutOfStock || isRedeemed;
  const deficit = item.coin_price - (item.canAfford ? 0 : item.coin_price);

  return (
    <Card 
      shadow="none" 
      className={`border_primary flex flex-col overflow-hidden transition-all duration-300 ${
        isRedeemed ? 'opacity-60' : 'hover:-translate-y-1 hover:shadow_m'
      }`}
    >
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden bg_secondary group">
        <img
          src={item.image_url}
          alt={item.name}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-col gap-0.5">
          <h4 className="text-sm font-semibold text_primary leading-tight">{item.name}</h4>
          <p className="text-xs text_secondary line-clamp-2">{item.description}</p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <span className="text-base">🪙</span>
            <span className="text-sm font-bold fg_amber_strong">{item.coin_price.toLocaleString()}</span>
          </div>
          <StockBadge item={item} />
        </div>

        <button
          type="button"
          disabled={isDisabled}
          onClick={() => !isDisabled && onRedeem(item)}
          title={!item.canAfford && !item.isOutOfStock ? `Cần thêm ${item.coin_price - deficit} coin` : undefined}
          className={`mt-auto w-full radius_8 py-2 text-sm font-semibold transition-opacity
            ${isRedeemed
              ? 'bg_tertiary text_tertiary cursor-default'
              : isDisabled
                ? 'bg_secondary text_tertiary cursor-not-allowed opacity-60'
                : 'bg_accent_primary text_contrast cursor-pointer hover:shadow_m active:scale-95'
            }`}
        >
          {isRedeemed ? '✓ Đã đổi' : item.isOutOfStock ? 'Hết hàng' : !item.canAfford ? 'Không đủ coin' : 'Đổi ngay'}
        </button>
      </div>
    </Card>
  );
}
