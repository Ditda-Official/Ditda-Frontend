import type { BadgeVariant } from "@/shared/ui/Badge";

export type MyInfoStats = {
  totalCommissionCount: number;
  ongoingCommissionCount: number;
};

export type MyInfo = {
  name: string;
  profileImageUrl: string;
  stats: MyInfoStats;
};

export type CommissionHistoryItem = {
  commissionId: number;
  category: string;
  title: string;
  createdAt: string;
  plan: "BASIC" | "PLUS" | "MAX";
  paidAmount: number | null;
  status: string;
};

export const PLAN_DISPLAY_MAP: Record<CommissionHistoryItem["plan"], string> = {
  BASIC: "기본",
  PLUS: "플러스",
  MAX: "맥스",
};

export const CATEGORY_BADGE_MAP: Record<string, BadgeVariant> = {
  FLYER_TEXTBOOK_COVER_INNER: "교재",
};

export const PLAN_PAID_AMOUNT_MAP: Record<CommissionHistoryItem["plan"], number> = {
  BASIC: 400000,
  PLUS: 450000,
  MAX: 480000,
};
