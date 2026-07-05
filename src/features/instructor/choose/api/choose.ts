import type {
  CommissionDrafts,
  GetCommissionDraftsResult,
} from "@/features/instructor/choose/api/chooseTypes";
import { api, createApiPath } from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/commonType";

// 1차 시안 선택
export const getCommissionDrafts = async (
  commissionId: string | number,
): Promise<CommissionDrafts | null> => {
  const response = await api
    .get(createApiPath(`/api/v1/instructors/commissions/${commissionId}/drafts`))
    .json<ApiResponse<GetCommissionDraftsResult>>();

  return response.result ?? null;
};
