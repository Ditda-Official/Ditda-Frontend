export type RevisionCategoryCode = "LAYOUT" | "TYPOGRAPHY" | "DESIGN" | "COLOR" | "ETC";

export type RevisionItem = {
  category: RevisionCategoryCode;
  comment: string;
};

export type TargetDraft = {
  draftId: number;
  thumbnailUrl: string;
};

export type CurrentRevisionDetail = {
  revisionRequestId: number;
  commissionId: number;
  title: string;
  revisionDeadline: string;
  remainingRevisionCount: number;
  targetDraft: TargetDraft;
  revisionItems: RevisionItem[];
};

export type GetCurrentRevisionDetailResult = CurrentRevisionDetail;

export type SubmitRevisionBody = {
  designerComment?: string;
  keys: string[];
};

export type SubmitRevisionResult = {
  draftId: number;
  currentRevisionCount: number;
  maxRevisionCount: number;
  createdAt: string;
};
