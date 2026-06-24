import type {
  DraftSubmissionItem,
  GetDraftSubmissionsResult,
  GetMatchingCommissionsResult,
  GetRevisionsResult,
  MatchingItem,
  ModifyingItem,
} from "@/features/instructor/home/api/homeTypes";
import { api, createApiPath } from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/commonType";

// 시안 제출 현황 조회
export const getDraftSubmissions = async (): Promise<DraftSubmissionItem[]> => {
  const response = await api
    .get(createApiPath("/api/v1/instructors/dashboards/draft-submissions"))
    .json<ApiResponse<GetDraftSubmissionsResult>>();

  return response.result?.commissions ?? [];
};

// 매칭 중인 외주 조회
export const getMatchingCommissions = async (): Promise<MatchingItem[]> => {
  const response = await api
    .get(createApiPath("/api/v1/instructors/dashboards/matchings"))
    .json<ApiResponse<GetMatchingCommissionsResult>>();

  return response.result?.commissions ?? [];
};

// 수정 중인 외주 조회
export const getRevisions = async (): Promise<ModifyingItem[]> => {
  const response = await api
    .get(createApiPath("/api/v1/instructors/dashboards/revisions"))
    .json<ApiResponse<GetRevisionsResult>>();

  return response.result?.commissions ?? [];
};
