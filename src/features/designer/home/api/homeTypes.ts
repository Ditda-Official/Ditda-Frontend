export type DraftSubmissionItem = {
  commissionId: number;
  title: string;
  category: string;
  isSubmitted: boolean;
  submitDeadline: string;
  maxAmount: number;
};

export type ModifyingItem = {
  commissionId: number;
  title: string;
  isSubmitted: boolean;
  hasUpdated: boolean;
  finalDeadline: string;
};

export type DesignerAnnouncementType = "AWAITING" | "SELECTED" | "NOT_SELECTED";

export type PresentationWaitingItem = {
  commissionId: number;
  title: string;
  status: DesignerAnnouncementType;
  applicationDeadline: string;
};

export const CATEGORY_DISPLAY_MAP: Record<string, string> = {
  FLYER_TEXTBOOK_COVER_INNER: "교재 외지/내지",
};

export type GetDraftSubmissionsResult = {
  commissions: DraftSubmissionItem[];
};

export type GetRevisionsResult = {
  commissions: ModifyingItem[];
};

export type GetAnnouncementsResult = {
  commissions: PresentationWaitingItem[];
};
