import type { DraftSubmissionItem } from "@/features/instructor/home/model/home";
import { api, createApiPath } from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/types";

type GetDraftSubmissionsResult = {
  commissions: DraftSubmissionItem[];
};

export const getDraftSubmissions = async (): Promise<DraftSubmissionItem[]> => {
  const response = await api
    .get(createApiPath("/api/v1/instructors/dashboards/draft-submissions"))
    .json<ApiResponse<GetDraftSubmissionsResult>>();

  return response.result?.commissions ?? [];
};
