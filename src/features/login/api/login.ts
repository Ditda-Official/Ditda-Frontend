import { z } from "zod";

import type { LoginFormValues } from "@/features/login/model/loginSchemas";
import {
  ApiError,
  createApiPath,
  getApiResponseMessage,
  publicApi,
  toApiError,
} from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/types";

const loginResultSchema = z.object({
  userId: z.number(),
  userType: z.string(),
  name: z.string(),
  profileImageUrl: z.string(),
  accessToken: z.string(),
});

export type LoginResult = z.infer<typeof loginResultSchema>;

export const login = async ({ password, username }: LoginFormValues) => {
  try {
    const response = await publicApi
      .post(createApiPath("/api/v1/auth/login"), {
        json: { password, username },
      })
      .json<ApiResponse<unknown>>();

    if (!response.success) {
      throw new ApiError(getApiResponseMessage(response), {
        code: response.code,
        response,
      });
    }

    return loginResultSchema.parse(response.result);
  } catch (error) {
    throw await toApiError(error);
  }
};
