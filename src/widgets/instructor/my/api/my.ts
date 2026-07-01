import type { CommissionHistoryItem } from "@/features/instructor/my";
import { api } from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/commonType";
import type { GetCommissionsResult } from "@/widgets/instructor/my/api/myTypes";

const COMMISSIONS_SIZE = 3;

// 외주 내역 조회
export const getCommissions = async (page: number): Promise<GetCommissionsResult> => {
  const response = await api
    .get("/api/v1/instructors/commissions", {
      searchParams: { page, size: COMMISSIONS_SIZE },
    })
    .json<ApiResponse<GetCommissionsResult>>();

  return (
    response.result ?? {
      items: [] as CommissionHistoryItem[],
      page,
      size: COMMISSIONS_SIZE,
      totalElements: 0,
      totalPages: 0,
    }
  );
};
