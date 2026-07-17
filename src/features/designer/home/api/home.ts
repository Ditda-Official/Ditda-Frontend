import "server-only";

import type {
  DraftSubmissionItem,
  GetAnnouncementsResult,
  GetDraftSubmissionsResult,
  GetRevisionsResult,
  ModifyingItem,
  PresentationWaitingItem,
} from "@/features/designer/home/api/homeTypes";
import type { ApiResponse } from "@/shared/api/commonType";
import { serverApi } from "@/shared/api/server";

// 시안 제출 예정 외주 조회
export const getDraftSubmissions = async (): Promise<DraftSubmissionItem[]> => {
  const response = await serverApi
    .get("/api/v1/designers/dashboards/draft-submissions", { cache: "no-store" })
    .json<ApiResponse<GetDraftSubmissionsResult>>();

  return response.result?.commissions ?? [];
};

// 수정 중인 외주 조회
export const getRevisions = async (): Promise<ModifyingItem[]> => {
  const response = await serverApi
    .get("/api/v1/designers/dashboards/revisions", { cache: "no-store" })
    .json<ApiResponse<GetRevisionsResult>>();

  return response.result?.commissions ?? [];
};

// 발표 대기 외주 조회
export const getAnnouncements = async (): Promise<PresentationWaitingItem[]> => {
  const response = await serverApi
    .get("/api/v1/designers/dashboards/announcements", { cache: "no-store" })
    .json<ApiResponse<GetAnnouncementsResult>>();

  return response.result?.commissions ?? [];
};
