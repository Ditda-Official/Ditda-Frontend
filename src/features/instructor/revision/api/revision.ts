import type {
  CreateRevisionRequestBody,
  CurrentRevisionDetail,
  GetCurrentRevisionDetailResult,
} from "@/features/instructor/revision/api/revisionTypes";
import {
  api,
  ApiError,
  createApiPath,
  getApiResponseMessage,
  toApiError,
} from "@/shared/api/client";
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

// 시안 수정 요청 생성
export const postRevisionRequest = async (
  commissionId: string | number,
  body: CreateRevisionRequestBody,
): Promise<void> => {
  try {
    const response = await api
      .post(createApiPath(`/api/v1/instructors/commissions/${commissionId}/revisions`), {
        json: body,
      })
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

// 외주 최종 확정
export const postFinalizeDraft = async (
  commissionId: string | number,
  draftId: string | number,
): Promise<void> => {
  try {
    const response = await api
      .post(
        createApiPath(`/api/v1/instructors/commissions/${commissionId}/drafts/${draftId}/finalize`),
      )
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
