import type {
  DraftSubmissionItem,
  GetDraftSubmissionsResult,
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
