import {
  api,
  ApiError,
  createApiPath,
  getApiResponseMessage,
  toApiError,
} from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/commonType";

const postCommissionParticipation = async (
  commissionId: string | number,
  action: "apply" | "cancel",
): Promise<void> => {
  try {
    const response = await api
      .post(createApiPath(`/api/v1/designers/commissions/${commissionId}/${action}`))
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

// 디자이너 외주 참여
export const postApplyCommission = async (commissionId: string | number): Promise<void> => {
  await postCommissionParticipation(commissionId, "apply");
};

// 디자이너 외주 참여 취소
export const postCancelCommission = async (commissionId: string | number): Promise<void> => {
  await postCommissionParticipation(commissionId, "cancel");
};
