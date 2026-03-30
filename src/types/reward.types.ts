/** Reward types for iReward Store — matches /v3/rewards API response shape */

export type RewardCategory = 'time_off' | 'merch' | 'privilege' | 'digital' | 'experience';

export type FulfillmentType = 'auto' | 'manual';

export type RedemptionStatus =
  | 'pending'
  | 'confirmed'
  | 'fulfilled'
  | 'awaiting_fulfillment'
  | 'cancelled';

export interface RewardItem {
  item_id: string;
  name: string;
  description: string;
  category: RewardCategory;
  coin_price: number;
  /** null = unlimited */
  stock: number | null;
  /** null = unlimited per user */
  max_per_user: number | null;
  available_from: string;
  /** null = no expiry */
  available_to: string | null;
  is_active: boolean;
  image_url: string;
  fulfillment_type: FulfillmentType;
}
