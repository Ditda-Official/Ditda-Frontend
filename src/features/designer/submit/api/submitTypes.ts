export type SubmitDraftBody = {
  keys: string[];
};

export type SubmitDraftResult = {
  commissionId: number;
  draftId: number;
  submittedAt: string;
};
