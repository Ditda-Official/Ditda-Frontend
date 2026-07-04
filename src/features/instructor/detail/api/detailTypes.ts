import type { PageType } from "@/features/instructor/write/config/write";

export type CommissionDesignInfo = {
  pageSize: string;
  concepts: string[];
  additionalConcept: string | null;
  colorSelectionMode: "DESIGNER_DELEGATED" | "INSTRUCTOR_SPECIFIED";
  colors: string[];
};

export type CommissionRequiredPage = {
  pageType: PageType;
  description: string;
};

export type CommissionCategoryDetail = {
  textbookName: string;
  instructorName: string;
  subject: string;
  requiredPages: CommissionRequiredPage[];
};

export type CommissionFileKind = "MATERIAL" | "REFERENCE";

export type CommissionFile = {
  fileKind: CommissionFileKind;
  fileUrls: string[];
  description: string;
};

export type CommissionDateInfo = {
  applicationDeadline: string;
  firstDraftDeadline: string;
  finalDeadline: string;
};

export type CommissionDetail = {
  commissionId: number;
  title: string;
  category: string;
  status: string;
  designInfo: CommissionDesignInfo;
  categoryDetail: CommissionCategoryDetail;
  files: CommissionFile[];
  dateInfo: CommissionDateInfo;
  priceInfo: unknown;
};

export type GetCommissionDetailResult = CommissionDetail;
