import { z } from "zod";

import type {
  SignupAccountData,
  SignupDesignerAdditionalData,
  SignupProfileData,
} from "@/features/signup/model/signupSchemas";
import {
  ApiError,
  createApiPath,
  getApiResponseMessage,
  publicApi,
  toApiError,
} from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/types";

const instructorSignupResultSchema = z.object({
  userId: z.number(),
  userType: z.string(),
  name: z.string(),
  profileImageUrl: z.string(),
  accessToken: z.string(),
});

export type InstructorSignupResult = z.infer<typeof instructorSignupResultSchema>;

const designerSignupResultSchema = z.object({
  userId: z.number(),
  userType: z.string(),
  name: z.string(),
  profileImageUrl: z.string(),
  accessToken: z.string(),
});

const portfolioPresignedUrlResultSchema = z.object({
  key: z.string(),
  presignedUrl: z.string(),
});

export type DesignerSignupResult = z.infer<typeof designerSignupResultSchema>;

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
    publicApi
      .post(createApiPath("/api/v1/auth/emails/verification-requests"), {
        json: { email },
      })
      .json<ApiResponse<unknown>>(),
    z.unknown(),
  );
};

export const verifySignupEmailCode = async ({ code, email }: { email: string; code: string }) => {
  await unwrapApiResponse(
    publicApi
      .post(createApiPath("/api/v1/auth/emails/verifications"), {
        json: { code, email },
      })
      .json<ApiResponse<unknown>>(),
    z.unknown(),
  );
};

export const checkSignupUsername = async (username: string) => {
  await unwrapApiResponse(
    publicApi
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
    publicApi
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

const getPortfolioContentType = (file: File) => {
  if (file.type.length > 0) return file.type;

  return file.name.toLowerCase().endsWith(".pdf") ? "application/pdf" : "image/png";
};

const issuePortfolioPresignedUrl = async ({ email, file }: { email: string; file: File }) => {
  return unwrapApiResponse(
    publicApi
      .post(createApiPath("/api/v1/designers/auth/signup/portfolio/presigned-url"), {
        json: {
          email,
          contentType: getPortfolioContentType(file),
        },
      })
      .json<ApiResponse<unknown>>(),
    portfolioPresignedUrlResultSchema,
  );
};

const uploadPortfolioFile = async ({
  file,
  presignedUrl,
}: {
  file: File;
  presignedUrl: string;
}) => {
  const response = await fetch(presignedUrl, {
    body: file,
    headers: {
      "Content-Type": getPortfolioContentType(file),
    },
    method: "PUT",
  });

  if (!response.ok) {
    throw new ApiError("포트폴리오 파일 업로드에 실패했습니다", { status: response.status });
  }
};

const uploadDesignerPortfolioFiles = async ({ email, files }: { email: string; files: File[] }) => {
  return Promise.all(
    files.map(async file => {
      const { key, presignedUrl } = await issuePortfolioPresignedUrl({ email, file });
      await uploadPortfolioFile({ file, presignedUrl });

      return key;
    }),
  );
};

export const signupDesigner = async ({
  account,
  additional,
  profile,
}: {
  profile: SignupProfileData;
  account: SignupAccountData;
  additional: SignupDesignerAdditionalData;
}) => {
  try {
    const portfolioKeys = await uploadDesignerPortfolioFiles({
      email: account.email,
      files: additional.portfolioFiles,
    });

    return await unwrapApiResponse(
      publicApi
        .post(createApiPath("/api/v1/designers/auth/signup"), {
          json: {
            terms: profile.terms,
            name: profile.name,
            phone: profile.phone,
            username: account.username,
            password: account.password,
            email: account.email,
            bankAccount: {
              bankName: additional.bankCode,
              accountNumber: additional.accountNumber,
              accountHolder: additional.accountHolder,
            },
            portfolioKeys,
          },
        })
        .json<ApiResponse<unknown>>(),
      designerSignupResultSchema,
    );
  } catch (error) {
    throw await toApiError(error);
  }
};
