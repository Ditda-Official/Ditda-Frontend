import { z } from "zod";

import {
  api,
  ApiError,
  createApiPath,
  getApiResponseMessage,
  toApiError,
} from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/types";

import type { SignupAccountData, SignupProfileData } from "../model/signupSchemas";

const instructorSignupResultSchema = z.object({
  userId: z.number(),
  userType: z.string(),
  name: z.string(),
  profileImageUrl: z.string(),
  accessToken: z.string(),
});

export type InstructorSignupResult = z.infer<typeof instructorSignupResultSchema>;

const unwrapApiResponse = async <T>(
  request: Promise<ApiResponse<unknown>>,
  resultSchema: z.ZodType<T>,
) => {
  try {
    const response = await request;

    if (!response.success) {
      throw new ApiError(getApiResponseMessage(response), {
        code: response.code,
        response,
      });
    }

    return resultSchema.parse(response.result);
  } catch (error) {
    throw await toApiError(error);
  }
};

export const requestSignupEmailVerificationCode = async (email: string) => {
  await unwrapApiResponse(
    api
      .post(createApiPath("/api/v1/auth/emails/verification-requests"), {
        json: { email },
      })
      .json<ApiResponse<unknown>>(),
    z.unknown(),
  );
};

export const verifySignupEmailCode = async ({ code, email }: { email: string; code: string }) => {
  await unwrapApiResponse(
    api
      .post(createApiPath("/api/v1/auth/emails/verifications"), {
        json: { code, email },
      })
      .json<ApiResponse<unknown>>(),
    z.unknown(),
  );
};

export const checkSignupUsername = async (username: string) => {
  await unwrapApiResponse(
    api
      .post(createApiPath("/api/v1/auth/check-username"), {
        json: { username },
      })
      .json<ApiResponse<unknown>>(),
    z.unknown(),
  );
};

export const signupInstructor = async ({
  account,
  profile,
}: {
  profile: SignupProfileData;
  account: SignupAccountData;
}) => {
  return unwrapApiResponse(
    api
      .post(createApiPath("/api/v1/instructors/auth/signup"), {
        json: {
          terms: profile.terms,
          name: profile.name,
          phone: profile.phone,
          username: account.username,
          password: account.password,
          email: account.email,
        },
      })
      .json<ApiResponse<unknown>>(),
    instructorSignupResultSchema,
  );
};
