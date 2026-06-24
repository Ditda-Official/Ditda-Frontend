import type { GetPlansResult, Plan } from "@/features/instructor/write/api/writeTypes";
import { api, createApiPath } from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/commonType";

// 플랜 조회
export const getPlans = async (): Promise<Plan[]> => {
  const response = await api
    .get(createApiPath("/api/v1/instructors/commissions/plans"))
    .json<ApiResponse<GetPlansResult>>();

  return response.result?.plans ?? [];
};
