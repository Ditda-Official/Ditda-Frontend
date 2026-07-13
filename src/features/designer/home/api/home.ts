import type {
  DraftSubmissionItem,
  GetAnnouncementsResult,
  GetDraftSubmissionsResult,
  GetRevisionsResult,
  ModifyingItem,
  PresentationWaitingItem,
} from "@/features/designer/home/api/homeTypes";
import { api, createApiPath } from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/commonType";

// 시안 제출 예정 외주 조회
export const getDraftSubmissions = async (): Promise<DraftSubmissionItem[]> => {
  const response = await api
    .get(createApiPath("/api/v1/designers/dashboards/draft-submissions"))
    .json<ApiResponse<GetDraftSubmissionsResult>>();

  return response.result?.commissions ?? [];
};

// 수정 중인 외주 조회
export const getRevisions = async (): Promise<ModifyingItem[]> => {
  const response = await api
    .get(createApiPath("/api/v1/designers/dashboards/revisions"))
    .json<ApiResponse<GetRevisionsResult>>();

  return response.result?.commissions ?? [];
};

// 발표 대기 외주 조회
export const getAnnouncements = async (): Promise<PresentationWaitingItem[]> => {
  const response = await api
    .get(createApiPath("/api/v1/designers/dashboards/announcements"))
    .json<ApiResponse<GetAnnouncementsResult>>();

  return response.result?.commissions ?? [];
};
