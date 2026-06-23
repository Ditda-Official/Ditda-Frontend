import { z } from "zod";

import {
  designerSignupResultSchema,
  instructorSignupResultSchema,
  portfolioPresignedUrlResultSchema,
  type PostPortfolioPresignedUrlBody,
  type PostSignupDesignerBody,
  type PostSignupDesignerParams,
  type PostSignupInstructorBody,
  type PostSignupInstructorParams,
} from "@/features/signup/api/signupTypes";
import {
  ApiError,
  createApiPath,
  getApiResponseMessage,
  publicApi,
  toApiError,
} from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/commonType";

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

// 이메일 인증번호 요청
export const postSignupEmailVerification = async (email: string) => {
  await unwrapApiResponse(
    publicApi
      .post(createApiPath("/api/v1/auth/emails/verification-requests"), {
        json: { email },
      })
      .json<ApiResponse<unknown>>(),
    z.unknown(),
  );
};

// 이메일 인증번호 검증
export const postVerifySignupEmail = async ({ code, email }: { email: string; code: string }) => {
  await unwrapApiResponse(
    publicApi
      .post(createApiPath("/api/v1/auth/emails/verifications"), {
        json: { code, email },
      })
      .json<ApiResponse<unknown>>(),
    z.unknown(),
  );
};

// 아이디 중복 확인
export const postCheckSignupUsername = async (username: string) => {
  await unwrapApiResponse(
    publicApi
      .post(createApiPath("/api/v1/auth/check-username"), {
        json: { username },
      })
      .json<ApiResponse<unknown>>(),
    z.unknown(),
  );
};

// 강사 회원가입
export const postSignupInstructor = async ({ account, profile }: PostSignupInstructorParams) => {
  const body: PostSignupInstructorBody = { ...profile, ...account };

  return unwrapApiResponse(
    publicApi
      .post(createApiPath("/api/v1/instructors/auth/signup"), { json: body })
      .json<ApiResponse<unknown>>(),
    instructorSignupResultSchema,
  );
};

// 포트폴리오 presigned URL 발급
const getPortfolioContentType = (file: File) => {
  if (file.type.length > 0) return file.type;

  return file.name.toLowerCase().endsWith(".pdf") ? "application/pdf" : "image/png";
};

const issuePortfolioPresignedUrl = async ({ email, file }: { email: string; file: File }) => {
  const body: PostPortfolioPresignedUrlBody = {
    email,
    contentType: getPortfolioContentType(file),
  };

  return unwrapApiResponse(
    publicApi
      .post(createApiPath("/api/v1/designers/auth/signup/portfolio/presigned-url"), { json: body })
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

// 디자이너 회원가입
export const postSignupDesigner = async ({
  account,
  additional,
  profile,
}: PostSignupDesignerParams) => {
  try {
    const portfolioKeys = await uploadDesignerPortfolioFiles({
      email: account.email,
      files: additional.portfolioFiles,
    });

    const body: PostSignupDesignerBody = {
      ...profile,
      ...account,
      bankAccount: {
        bankName: additional.bankCode,
        accountNumber: additional.accountNumber,
        accountHolder: additional.accountHolder,
      },
      portfolioKeys,
    };

    return await unwrapApiResponse(
      publicApi
        .post(createApiPath("/api/v1/designers/auth/signup"), { json: body })
        .json<ApiResponse<unknown>>(),
      designerSignupResultSchema,
    );
  } catch (error) {
    throw await toApiError(error);
  }
};
