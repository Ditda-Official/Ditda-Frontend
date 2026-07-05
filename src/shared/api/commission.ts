import { api, createApiPath } from "@/shared/api/client";
import type { CommissionDetail, GetCommissionDetailResult } from "@/shared/api/commissionTypes";
import type { ApiResponse } from "@/shared/api/commonType";

// 외주 상세 조회
export const getCommissionDetail = async (
  commissionId: string | number,
): Promise<CommissionDetail | null> => {
  const response = await api
    .get(createApiPath(`/api/v1/commissions/${commissionId}`))
    .json<ApiResponse<GetCommissionDetailResult>>();

  return response.result ?? null;
};
