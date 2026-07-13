import type { PaymentHistory } from "@/features/designer/my";
import { api } from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/commonType";
import type { GetSettlementsResult } from "@/widgets/designer/my/api/myTypes";

const SETTLEMENTS_SIZE = 3;

// 디자이너 지급 내역 조회
export const getSettlements = async (page: number): Promise<GetSettlementsResult> => {
  const response = await api
    .get("/api/v1/designers/settlements", {
      searchParams: { page, size: SETTLEMENTS_SIZE },
    })
    .json<ApiResponse<GetSettlementsResult>>();

  return (
    response.result ?? {
      items: [] as PaymentHistory[],
      page,
      size: SETTLEMENTS_SIZE,
      totalElements: 0,
      totalPages: 0,
    }
  );
};
