import { Modal } from '@frontend-team/ui-kit';
import type { RewardCardItem } from '../types';

interface RedeemModalProps {
  item: RewardCardItem | null;
  coinBalance: number;
  onConfirm: (item: RewardCardItem) => Promise<void>;
  onClose: () => void;
}

export default function RedeemModal({ item, coinBalance, onConfirm, onClose }: RedeemModalProps) {
  if (!item) return null;

  const remaining = coinBalance - item.coin_price;

  return (
    <Modal open={!!item} onOpenChange={(open) => !open && onClose()} title="Xác nhận đổi thưởng">
      <div className="flex flex-col gap-4 p-6 bg_canvas_primary">
        {/* Item preview */}
        <div className="flex items-center gap-3">
          <div className="size-16 shrink-0 overflow-hidden radius_8 bg_secondary border border_primary">
            <img
              src={item.image_url}
              alt={item.name}
              className="size-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
          <div>
            <p className="font-semibold text_primary">{item.name}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span>🪙</span>
              <span className="text-sm font-bold fg_amber_strong">{item.coin_price.toLocaleString()} coin</span>
            </div>
          </div>
        </div>

        {/* Coin balance preview */}
        <div className="radius_12 bg_secondary p-4 flex flex-col gap-2 border border_primary">
          <div className="flex justify-between text-sm">
            <span className="text_secondary">Coin hiện có</span>
            <span className="font-semibold text_primary">{coinBalance.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text_secondary">Chi phí</span>
            <span className="font-semibold fg_amber_strong">−{item.coin_price.toLocaleString()}</span>
          </div>
          <div className="h-px bg_tertiary my-1" />
          <div className="flex justify-between text-sm">
            <span className="text_secondary">Sau khi đổi</span>
            <span className={`font-bold ${remaining < 0 ? 'text_danger' : 'text_primary'}`}>
              {remaining.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Note */}
        <p className="text-xs text_tertiary italic">
          P&OD sẽ liên hệ xác nhận trong 1–2 ngày làm việc sau khi bạn đổi.
        </p>

        {/* Actions */}
        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 radius_8 border border_primary py-2.5 text-sm font-semibold text_primary cursor-pointer hover:bg_secondary transition-colors"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={() => onConfirm(item)}
            disabled={remaining < 0}
            className="flex-1 radius_8 py-2.5 text-sm font-semibold text_contrast bg_interactive_primary cursor-pointer hover:shadow_m active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Xác nhận đổi
          </button>
        </div>
      </div>
    </Modal>
  );
}
