import type { ModifyingItem } from "@/features/instructor/home/model/home";
import { api, createApiPath } from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/types";

type GetRevisionsResult = {
  commissions: ModifyingItem[];
};

export const getRevisions = async (): Promise<ModifyingItem[]> => {
  const response = await api
    .get(createApiPath("/api/v1/instructors/dashboards/revisions"))
    .json<ApiResponse<GetRevisionsResult>>();

  return response.result?.commissions ?? [];
};
