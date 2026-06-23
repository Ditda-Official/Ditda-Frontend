import type { PlanType } from "@/features/instructor/write/config/write";
import { api, createApiPath } from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/types";

export type Plan = {
  code: PlanType;
  designerCount: number;
  price: number;
  description: string;
};

type GetPlansResult = {
  plans: Plan[];
};

export const getPlans = async (): Promise<Plan[]> => {
  const response = await api
    .get(createApiPath("/api/v1/instructors/commissions/plans"))
    .json<ApiResponse<GetPlansResult>>();

  return response.result?.plans ?? [];
};
