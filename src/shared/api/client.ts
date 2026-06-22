import ky, { HTTPError } from "ky";

import type { ApiResponse } from "@/shared/api/types";
import {
  clearClientAuth,
  getClientAccessToken,
  setClientAccessToken,
} from "@/shared/lib/auth/client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");
const LOGIN_PATH = "/api/v1/auth/login";
const TOKEN_REISSUE_PATH = "/api/v1/auth/reissue";

type ApiErrorOptions = {
  status?: number;
  code?: string;
  response?: Partial<ApiResponse<unknown>>;
};

export class ApiError extends Error {
  status?: number;
  code?: string;
  response?: Partial<ApiResponse<unknown>>;

  constructor(message: string, options: ApiErrorOptions = {}) {
    super(message);
    this.name = "ApiError";
    this.status = options.status;
    this.code = options.code;
    this.response = options.response;
  }
}

export const createApiPath = (path: string) => {
  return path;
};

const tokenRefreshApi = ky.create({
  credentials: "include",
  prefix: API_BASE_URL,
  retry: 0,
});

export const publicApi = ky.create({
  credentials: "include",
  prefix: API_BASE_URL,
});

const shouldSkipTokenReissue = (request: Request) => {
  const pathname = new URL(request.url).pathname;

  return pathname === LOGIN_PATH || pathname === TOKEN_REISSUE_PATH;
};

const extractAccessToken = (response: ApiResponse<unknown>) => {
  if (!response.success) {
    throw new ApiError(getApiResponseMessage(response), {
      code: response.code,
      response,
    });
  }

  if (
    response.result == null ||
    typeof response.result !== "object" ||
    !("accessToken" in response.result) ||
    typeof response.result.accessToken !== "string"
  ) {
    throw new ApiError(getApiResponseMessage(response), { response });
  }

  return response.result.accessToken;
};

const reissueAccessToken = async () => {
  try {
    const response = await tokenRefreshApi
      .post(createApiPath(TOKEN_REISSUE_PATH))
      .json<ApiResponse<unknown>>();

    return extractAccessToken(response);
  } catch (error) {
    throw await toApiError(error);
  }
};

let refreshPromise: Promise<string> | null = null;

const getOrRefreshAccessToken = () => {
  if (refreshPromise == null) {
    refreshPromise = reissueAccessToken().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

export const api = ky.create({
  credentials: "include",
  prefix: API_BASE_URL,
  hooks: {
    beforeRequest: [
      ({ request }) => {
        const accessToken = getClientAccessToken();

        if (accessToken != null) {
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [
      async ({ request, response, retryCount }) => {
        if (
          response.status !== 401 ||
          retryCount > 0 ||
          shouldSkipTokenReissue(request) ||
          getClientAccessToken() == null
        ) {
          return;
        }

        try {
          const accessToken = await getOrRefreshAccessToken();
          setClientAccessToken(accessToken);

          const headers = new Headers(request.headers);
          headers.set("Authorization", `Bearer ${accessToken}`);

          return ky.retry({
            code: "ACCESS_TOKEN_REISSUED",
            request: new Request(request, { headers }),
          });
        } catch {
          clearClientAuth();
        }
      },
    ],
  },
});

const stringifyApiErrorDetail = (error: ApiResponse<unknown>["error"]) => {
  if (typeof error === "string") return error;
  if (Array.isArray(error)) return error.join("\n");
  if (error != null) return Object.values(error).map(String).join("\n");

  return undefined;
};

const hasErrorResponse = (error: unknown): error is { response: Response } => {
  return (
    typeof error === "object" &&
    error != null &&
    "response" in error &&
    error.response instanceof Response
  );
};

export const getApiResponseMessage = (response?: Partial<ApiResponse<unknown>>) => {
  return response?.message || stringifyApiErrorDetail(response?.error ?? null) || "";
};

export const toApiError = async (error: unknown) => {
  if (error instanceof ApiError) return error;

  if (error instanceof HTTPError || hasErrorResponse(error)) {
    const { response } = error;

    try {
      const body = (await response.clone().json()) as Partial<ApiResponse<unknown>>;

      return new ApiError(getApiResponseMessage(body), {
        code: body.code,
        response: body,
        status: response.status,
      });
    } catch {
      return new ApiError(response.statusText, { status: response.status });
    }
  }

  if (error instanceof Error) return new ApiError(error.message);

  return new ApiError("요청 처리 중 문제가 발생했습니다");
};

export const getApiErrorMessage = async (error: unknown) => {
  return (await toApiError(error)).message;
};
