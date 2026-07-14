import type {
  SubmitDraftBody,
  SubmitDraftResult,
} from "@/features/designer/submit/api/submitTypes";
import { DRAFT_FILE_TARGET } from "@/features/designer/submit/config/submit";
import {
  api,
  ApiError,
  createApiPath,
  getApiResponseMessage,
  toApiError,
} from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/commonType";
import { postFilePresignedUrl, uploadFileToPresignedUrl } from "@/shared/api/file";

// 1차 시안 파일 업로드 (presigned URL 발급 후 S3 업로드)
export const uploadDraftFile = async (file: File): Promise<string> => {
  const contentType = file.type || "image/png";
  const { key, presignedUrl } = await postFilePresignedUrl({
    target: DRAFT_FILE_TARGET,
    contentType,
  });

  await uploadFileToPresignedUrl({ file, presignedUrl, contentType });

  return key;
};

// 디자이너 1차 시안 제출
export const postDraft = async (
  commissionId: string | number,
  body: SubmitDraftBody,
): Promise<SubmitDraftResult> => {
  try {
    const response = await api
      .post(createApiPath(`/api/v1/designers/commissions/${commissionId}/drafts`), { json: body })
      .json<ApiResponse<SubmitDraftResult>>();

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
