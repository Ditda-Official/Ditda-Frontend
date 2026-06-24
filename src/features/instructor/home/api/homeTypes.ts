export type DraftSubmissionItem = {
  commissionId: number;
  title: string;
  category: string;
  draftSubmission: {
    submitted: number;
    total: number;
  };
  isViewable: boolean;
  firstDraftDeadline: string;
};

export type MatchingItem = {
  commissionId: number;
  title: string;
  applicationDeadline: string;
  matching: {
    matched: number;
    total: number;
  };
};

export type ModifyingItem = {
  commissionId: number;
  title: string;
  isSubmitted: boolean;
  hasUpdated: boolean;
  finalDeadline: string;
};

export const CATEGORY_DISPLAY_MAP: Record<string, string> = {
  FLYER_TEXTBOOK_COVER_INNER: "교재 외지/내지",
};

export type GetDraftSubmissionsResult = {
  commissions: DraftSubmissionItem[];
};

export type GetMatchingCommissionsResult = {
  commissions: MatchingItem[];
};

export type GetRevisionsResult = {
  commissions: ModifyingItem[];
};
