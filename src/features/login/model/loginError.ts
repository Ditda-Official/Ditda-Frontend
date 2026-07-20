import { ApiError } from "@/shared/api/client";

export const INVALID_LOGIN_CREDENTIALS_MESSAGE =
  "아이디 또는 비밀번호가 올바르지 않습니다. 입력하신 내용을 다시 확인해주세요";

export const getLoginErrorMessage = (error: unknown) => {
  if (error instanceof ApiError && (error.status === 401 || error.code === "AUTH_401_02")) {
    return INVALID_LOGIN_CREDENTIALS_MESSAGE;
  }

  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  return "요청 처리 중 문제가 발생했습니다";
};
