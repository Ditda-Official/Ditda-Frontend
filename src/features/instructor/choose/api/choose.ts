import type {
  CommissionDrafts,
  DraftDetail,
  GetCommissionDraftsResult,
  GetDraftDetailResult,
} from "@/features/instructor/choose/api/chooseTypes";
import {
  api,
  ApiError,
  createApiPath,
  getApiResponseMessage,
  toApiError,
} from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/commonType";

// 1차 시안 선택
export const getCommissionDrafts = async (
  commissionId: string | number,
): Promise<CommissionDrafts | null> => {
  const response = await api
    .get(createApiPath(`/api/v1/instructors/commissions/${commissionId}/drafts`))
    .json<ApiResponse<GetCommissionDraftsResult>>();

  return response.result ?? null;
};

// 1차 시안 선택 확정
export const postSelectDraft = async (
  commissionId: string | number,
  draftId: string | number,
): Promise<void> => {
  try {
    const response = await api
      .post(
        createApiPath(`/api/v1/instructors/commissions/${commissionId}/drafts/${draftId}/select`),
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

// 시안 상세 조회
export const getDraftDetail = async (
  commissionId: string | number,
  draftId: string | number,
): Promise<DraftDetail | null> => {
  const response = await api
    .get(createApiPath(`/api/v1/instructors/commissions/${commissionId}/drafts/${draftId}`))
    .json<ApiResponse<GetDraftDetailResult>>();

  return response.result ?? null;
};
