import type { GetPlansResult, Plan } from "@/features/instructor/write/api/writeTypes";
import type { CommissionFileTarget } from "@/features/instructor/write/config/write";
import { api, createApiPath } from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/commonType";
import { postFilePresignedUrl, uploadFileToPresignedUrl } from "@/shared/api/file";

// 플랜 조회
export const getPlans = async (): Promise<Plan[]> => {
  const response = await api
    .get(createApiPath("/api/v1/instructors/commissions/plans"))
    .json<ApiResponse<GetPlansResult>>();

  return response.result?.plans ?? [];
};

// 외주 첨부 파일 업로드 (presigned URL 발급 후 업로드, 반환된 key를 외주 작성 요청에 사용)
export const uploadCommissionFile = async (file: File, target: CommissionFileTarget) => {
  const contentType = file.type || "image/png";
  const { key, presignedUrl } = await postFilePresignedUrl({ target, contentType });

  await uploadFileToPresignedUrl({ file, presignedUrl, contentType });

  return key;
};
