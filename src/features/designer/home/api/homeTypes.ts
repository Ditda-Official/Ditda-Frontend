export type DraftSubmissionItem = {
  commissionId: number;
  title: string;
  category: string;
  isSubmitted: boolean;
  submitDeadline: string;
  maxAmount: number;
};

export const CATEGORY_DISPLAY_MAP: Record<string, string> = {
  FLYER_TEXTBOOK_COVER_INNER: "교재 외지/내지",
};

export type GetDraftSubmissionsResult = {
  commissions: DraftSubmissionItem[];
};
