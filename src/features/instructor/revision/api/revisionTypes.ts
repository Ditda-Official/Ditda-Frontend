export type RevisionDraft = {
  draftId: number;
  thumbnailUrl: string;
  designerComment: string;
};

export type CurrentRevisionDetail = {
  commissionId: number;
  title: string;
  draft: RevisionDraft;
  currentRevisionCount: number;
  maxRevisionCount: number;
};

export type GetCurrentRevisionDetailResult = CurrentRevisionDetail;

export type RevisionCategoryCode = "LAYOUT" | "TYPOGRAPHY" | "DESIGN" | "COLOR" | "ETC";

export type RevisionCategoryRequest = {
  category: RevisionCategoryCode;
  comment: string;
};

export type CreateRevisionRequestBody = {
  categories: RevisionCategoryRequest[];
};
