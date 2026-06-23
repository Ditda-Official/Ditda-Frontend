import type { MatchingItem } from "@/features/instructor/home/model/home";
import { api, createApiPath } from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/types";

type GetMatchingCommissionsResult = {
  commissions: MatchingItem[];
};

export const getMatchingCommissions = async (): Promise<MatchingItem[]> => {
  const response = await api
    .get(createApiPath("/api/v1/instructors/dashboards/matchings"))
    .json<ApiResponse<GetMatchingCommissionsResult>>();

  return response.result?.commissions ?? [];
};
