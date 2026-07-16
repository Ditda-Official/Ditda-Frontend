const MOCK_SERVER_URL = "http://localhost:4010";

type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

type MockApiOptions = {
  method?: HttpMethod;
  status?: number;
  // ApiResponse<T> 봉투를 쓰지 않는 원시 응답이 필요할 때 사용
  raw?: unknown;
  result?: unknown;
  success?: boolean;
  message?: string;
  code?: string;
};

// shared/api/commonType.ts의 ApiResponse<T> 형태에 맞춰 응답 바디를 만든다.
const buildEnvelope = ({
  result = null,
  success = true,
  message = "",
  code = "OK",
}: MockApiOptions) => ({
  success,
  code,
  message,
  result,
  error: success ? null : message,
  timestamp: new Date().toISOString(),
});

// e2e/mock-server에 "이 경로로 이런 응답을 달라"는 스텁을 등록한다.
// SSR(서버 컴포넌트)과 브라우저 fetch 요청 모두 같은 목 서버로 가므로 page 인스턴스는 필요 없다.
export const mockApi = async (path: string, options: MockApiOptions = {}) => {
  const { method = "GET", status = 200, raw } = options;

  await fetch(`${MOCK_SERVER_URL}/__mock__/route`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ method, path, status, body: raw ?? buildEnvelope(options) }),
  });
};

export const mockApiError = (
  path: string,
  options: Omit<MockApiOptions, "success" | "result"> = {},
) =>
  mockApi(path, {
    ...options,
    status: options.status ?? 400,
    success: false,
    message: options.message ?? "요청 처리 중 문제가 발생했습니다",
  });

// 테스트 간 등록된 스텁이 새지 않도록 초기화 (auth fixture에서 매 테스트 전 자동 호출)
export const resetMocks = async () => {
  await fetch(`${MOCK_SERVER_URL}/__mock__/reset`, { method: "POST" });
};
