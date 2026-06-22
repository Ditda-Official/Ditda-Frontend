import {
  api,
  ApiError,
  createApiPath,
  getApiResponseMessage,
  toApiError,
} from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/types";

export const logout = async () => {
  try {
    const response = await api
      .post(createApiPath("/api/v1/auth/logout"))
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
