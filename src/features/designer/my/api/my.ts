import type { MyInfo } from "@/features/designer/my/api/myTypes";
import type { ApiResponse } from "@/shared/api/commonType";
import { serverApi } from "@/shared/api/server";

// 디자이너 마이페이지 통계 조회
export const getMyInfo = async (): Promise<MyInfo | null> => {
  const response = await serverApi.get("/api/v1/designers/me").json<ApiResponse<MyInfo>>();

  return response.result;
};
