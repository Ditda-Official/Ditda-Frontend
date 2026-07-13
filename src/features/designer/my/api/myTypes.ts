import type { BadgeVariant } from "@/shared/ui/Badge";

export type DesignerLevel = "LEVEL_1" | "LEVEL_2" | "LEVEL_3";

export type MyInfoLevel = {
  level: DesignerLevel;
  exp: number;
  requiredExp: number;
};

export type MyInfoStats = {
  income: number;
  submittedDraftCount: number;
  winRate: number;
};

export type MyInfo = {
  name: string;
  profileImageUrl: string;
  levelInfo: MyInfoLevel;
  stats: MyInfoStats;
};

export type PaymentHistory = {
  commissionId: number;
  category: string;
  title: string;
  amountType: string;
  amount: number;
};

export const LEVEL_DISPLAY_MAP: Record<DesignerLevel, string> = {
  LEVEL_1: "Lv.1",
  LEVEL_2: "Lv.2",
  LEVEL_3: "Lv.3",
};

export const CATEGORY_BADGE_MAP: Record<string, BadgeVariant> = {
  FLYER_TEXTBOOK_COVER_INNER: "교재",
};

export const AMOUNT_TYPE_DISPLAY_MAP: Record<string, string> = {
  BASE: "기본금",
  FINAL: "최종금액",
};
