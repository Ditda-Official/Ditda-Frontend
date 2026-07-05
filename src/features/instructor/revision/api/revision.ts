import type {
  CurrentRevisionDetail,
  GetCurrentRevisionDetailResult,
} from "@/features/instructor/revision/api/revisionTypes";
import { api, createApiPath } from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/commonType";

// 수정 시안 상세 조회
export const getCurrentRevisionDetail = async (
  commissionId: string | number,
): Promise<CurrentRevisionDetail | null> => {
  const response = await api
    .get(createApiPath(`/api/v1/instructors/commissions/${commissionId}/revisions/current`))
    .json<ApiResponse<GetCurrentRevisionDetailResult>>();

  return response.result ?? null;
};
