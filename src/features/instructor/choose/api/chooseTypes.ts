export type WatermarkStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

export type Draft = {
  draftId: number;
  thumbnailUrl: string;
  watermarkStatus: WatermarkStatus;
};

export type CommissionDrafts = {
  commissionId: number;
  title: string;
  drafts: Draft[];
};

export type GetCommissionDraftsResult = CommissionDrafts;

export type DraftFile = {
  fileOrder: number;
  url: string;
  watermarkStatus: WatermarkStatus;
};

export type DraftDetail = {
  commissionId: number;
  draftId: number;
  files: DraftFile[];
};

export type GetDraftDetailResult = DraftDetail;
