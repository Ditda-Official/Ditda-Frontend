import {
  api,
  ApiError,
  createApiPath,
  getApiResponseMessage,
  toApiError,
} from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/commonType";
import {
  type FilePresignedUrlResult,
  filePresignedUrlResultSchema,
  type PostFilePresignedUrlBody,
} from "@/shared/api/fileTypes";

// 파일 업로드 presigned URL 발급
export const postFilePresignedUrl = async <Target extends string = string>(
  body: PostFilePresignedUrlBody<Target>,
): Promise<FilePresignedUrlResult> => {
  try {
    const response = await api
      .post(createApiPath("/api/v1/files/presigned-url"), { json: body })
      .json<ApiResponse<unknown>>();

    if (!response.success) {
      throw new ApiError(getApiResponseMessage(response), {
        code: response.code,
        response,
      });
    }

    return filePresignedUrlResultSchema.parse(response.result);
  } catch (error) {
    throw await toApiError(error);
  }
};

// presigned URL로 파일 업로드
export const uploadFileToPresignedUrl = async ({
  file,
  presignedUrl,
  contentType,
}: {
  file: File;
  presignedUrl: string;
  contentType: string;
}) => {
  const response = await fetch(presignedUrl, {
    body: file,
    headers: { "Content-Type": contentType },
    method: "PUT",
  });

  if (!response.ok) {
    throw new ApiError("파일 업로드에 실패했습니다", { status: response.status });
  }
};
