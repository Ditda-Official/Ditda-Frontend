import type {
  CreateCommissionResult,
  GetPlansResult,
  Plan,
} from "@/features/instructor/write/api/writeTypes";
import type { CommissionFileTarget } from "@/features/instructor/write/config/write";
import type { WriteOrderRequest } from "@/features/instructor/write/model/write";
import {
  api,
  ApiError,
  createApiPath,
  getApiResponseMessage,
  toApiError,
} from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/commonType";
import { postFilePresignedUrl, uploadFileToPresignedUrl } from "@/shared/api/file";

// 플랜 조회 (가격표는 세션 중 바뀌지 않으므로 최초 1회만 요청하고 재사용)
let plansRequest: Promise<Plan[]> | null = null;

export const getPlans = (): Promise<Plan[]> => {
  if (!plansRequest) {
    plansRequest = api
      .get(createApiPath("/api/v1/instructors/commissions/plans"))
      .json<ApiResponse<GetPlansResult>>()
      .then(response => response.result?.plans ?? [])
      .catch(error => {
        plansRequest = null;
        throw error;
      });
  }

  return plansRequest;
};

// 외주 생성(결제) 요청
export const postCommission = async (body: WriteOrderRequest): Promise<CreateCommissionResult> => {
  try {
    const response = await api
      .post(createApiPath("/api/v1/instructors/commissions"), { json: body })
      .json<ApiResponse<CreateCommissionResult>>();

    if (!response.success || !response.result) {
      throw new ApiError(getApiResponseMessage(response), {
        code: response.code,
        response,
      });
    }

    return response.result;
  } catch (error) {
    throw await toApiError(error);
  }
};

// 입금 통보
export const postNotifyDeposit = async (commissionId: number): Promise<void> => {
  try {
    const response = await api
      .post(createApiPath(`/api/v1/instructors/commissions/${commissionId}/notify-deposit`))
      .json<ApiResponse<unknown>>();

    if (!response.success) {
      throw new ApiError(getApiResponseMessage(response), {
        code: response.code,
        response,
      });
    }
  } catch (error) {
    throw await toApiError(error);
  }
};

// 외주 첨부 파일 업로드 (presigned URL 발급 후 업로드, 반환된 key를 외주 작성 요청에 사용)
export const uploadCommissionFile = async (file: File, target: CommissionFileTarget) => {
  const contentType = file.type || "image/png";
  const { key, presignedUrl } = await postFilePresignedUrl({ target, contentType });

  await uploadFileToPresignedUrl({ file, presignedUrl, contentType });

  return key;
};
