// [강사] [대시보드 조회] 시안 제출 예정 외주 조회
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

export const CATEGORY_DISPLAY_MAP: Record<string, string> = {
  FLYER_TEXTBOOK_COVER_INNER: "교재 외지/내지",
};

// [강사] [대시보드 조회] 매칭 중인 외주 조회
export type MatchingItem = {
  commissionId: number;
  title: string;
  applicationDeadline: string;
  matching: {
    matched: number;
    total: number;
  };
};

// [강사] [대시보드 조회] 수정 중인 외주 조회
export type ModifyingItem = {
  commissionId: number;
  title: string;
  isSubmitted: boolean;
  hasUpdated: boolean;
  finalDeadline: string;
};
