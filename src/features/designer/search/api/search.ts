import type { GetDesignerCommissionsResult } from "@/features/designer/search/api/searchTypes";
import { api, createApiPath } from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/commonType";

const createEmptyDesignerCommissionsResult = (
  page: number,
  size: number,
): GetDesignerCommissionsResult => ({
  items: [],
  page,
  size,
  totalElements: 0,
  totalPages: 0,
});

// 디자이너 모집 중 외주 목록 조회
export const getDesignerCommissions = async (
  page: number,
  size: number,
): Promise<GetDesignerCommissionsResult> => {
  const response = await api
    .get(createApiPath("/api/v1/designers/commissions"), {
      searchParams: { page, size },
    })
    .json<ApiResponse<GetDesignerCommissionsResult>>();

  return response.result ?? createEmptyDesignerCommissionsResult(page, size);
};
