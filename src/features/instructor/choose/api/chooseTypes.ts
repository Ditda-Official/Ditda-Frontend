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
