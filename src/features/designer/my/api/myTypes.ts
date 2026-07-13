import type { BadgeVariant } from "@/shared/ui/Badge";

export type PaymentHistory = {
  commissionId: number;
  category: string;
  title: string;
  amountType: string;
  amount: number;
};

export const CATEGORY_BADGE_MAP: Record<string, BadgeVariant> = {
  FLYER_TEXTBOOK_COVER_INNER: "교재",
};

export const AMOUNT_TYPE_DISPLAY_MAP: Record<string, string> = {
  BASE: "기본금",
  FINAL: "최종금액",
};
