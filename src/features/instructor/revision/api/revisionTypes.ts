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
