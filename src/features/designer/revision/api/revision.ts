import type {
  CurrentRevisionDetail,
  GetCurrentRevisionDetailResult,
  SubmitRevisionBody,
  SubmitRevisionResult,
} from "@/features/designer/revision/api/revisionTypes";
import { REVISION_FILE_TARGET } from "@/features/designer/revision/config/revision";
import {
  api,
  ApiError,
  createApiPath,
  getApiResponseMessage,
  toApiError,
} from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/commonType";
import { postFilePresignedUrl, uploadFileToPresignedUrl } from "@/shared/api/file";

// 수정 요청 사항 조회
export const getCurrentRevisionDetail = async (
  commissionId: string | number,
): Promise<CurrentRevisionDetail | null> => {
  const response = await api
    .get(createApiPath(`/api/v1/designers/commissions/${commissionId}/revisions/current`))
    .json<ApiResponse<GetCurrentRevisionDetailResult>>();

  return response.result ?? null;
};

// 수정 시안 파일 업로드 (presigned URL 발급 후 S3 업로드)
export const uploadRevisionFile = async (file: File): Promise<string> => {
  const contentType = file.type || "image/png";
  const { key, presignedUrl } = await postFilePresignedUrl({
    target: REVISION_FILE_TARGET,
    contentType,
  });

  await uploadFileToPresignedUrl({ file, presignedUrl, contentType });

  return key;
};

// 수정본 제출
export const postRevision = async (
  commissionId: string | number,
  body: SubmitRevisionBody,
): Promise<SubmitRevisionResult> => {
  try {
    const response = await api
      .post(createApiPath(`/api/v1/designers/commissions/${commissionId}/revisions/current`), {
        json: body,
      })
      .json<ApiResponse<SubmitRevisionResult>>();

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
