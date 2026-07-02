import { PageType } from "@/features/instructor/write/config/write";

export interface WriteOrderColorRequest {
  role: "MAIN" | "SUB1" | "SUB2";
  colorCode: string;
}

export interface WriteOrderDesignInfoRequest {
  pageSize: string;
  concepts: string[];
  additionalConcept?: string;
  colorSelectionMode: "DESIGNER_DELEGATED" | "USER_SELECTED";
  colors?: WriteOrderColorRequest[];
}

export interface WriteOrderPageRequest {
  pageType: PageType;
  description: string | null;
}

export interface WriteOrderTextbookRequest {
  textbookName: string;
  instructorName: string;
  subject: string;
  requiredPages: WriteOrderPageRequest[];
}

export type CommissionFileKind = "MATERIAL" | "REFERENCE";

export interface WriteOrderFileRequest {
  fileKind: CommissionFileKind;
  keys: string[];
  description?: string;
}

export interface WriteOrderDateRequest {
  firstDraftDeadline: string;
  finalDeadline: string;
}

export interface WriteOrderTermRequest {
  type: "SETTLEMENT";
  version: string;
  isAgreed: boolean;
}

export interface WriteOrderRequest {
  category: string;
  designInfo: WriteOrderDesignInfoRequest;
  textbook: WriteOrderTextbookRequest;
  files?: WriteOrderFileRequest[];
  plan: string;
  date: WriteOrderDateRequest;
  term: WriteOrderTermRequest;
}
