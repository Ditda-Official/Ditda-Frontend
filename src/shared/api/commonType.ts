export type ApiErrorDetail = string | string[] | Record<string, unknown> | null;

export type ApiResponse<T> = {
  success: boolean;
  code: string;
  message: string;
  result: T | null;
  error: ApiErrorDetail;
  timestamp: string;
};
