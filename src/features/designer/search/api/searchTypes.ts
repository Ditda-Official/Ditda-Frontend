export type DesignerCommissionCategory = "FLYER_TEXTBOOK_COVER_INNER" | string;

export type DesignerCommission = {
  commissionId: number;
  applicationDeadline: string;
  category: DesignerCommissionCategory;
  title: string;
  baseAmount: number;
  maxAmount: number;
};

export type GetDesignerCommissionsResult = {
  items: DesignerCommission[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export const DESIGNER_COMMISSION_CATEGORY_DISPLAY_MAP: Record<string, string> = {
  FLYER_TEXTBOOK_COVER_INNER: "교재 외지/내지",
};
