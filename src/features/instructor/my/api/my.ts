import type { MyInfo } from "@/features/instructor/my/api/myTypes";
import type { ApiResponse } from "@/shared/api/commonType";
import { serverApi } from "@/shared/api/server";

// 강사 마이페이지 통계 조회
export const getMyInfo = async (): Promise<MyInfo | null> => {
  const response = await serverApi.get("/api/v1/instructors/me").json<ApiResponse<MyInfo>>();

  return response.result;
};
