const MOCK_SERVER_URL = "http://localhost:4010";

type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

type MockApiOptions = {
  method?: HttpMethod;
  status?: number;
  raw?: unknown;
  result?: unknown;
  success?: boolean;
  message?: string;
  code?: string;
  delayMs?: number;
};

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

export const mockApi = async (path: string, options: MockApiOptions = {}) => {
  const { method = "GET", status = 200, raw, delayMs } = options;

  await fetch(`${MOCK_SERVER_URL}/__mock__/route`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      method,
      path,
      status,
      delayMs,
      body: raw ?? buildEnvelope(options),
    }),
  });
};

export const getCallCount = async (path: string, method: HttpMethod = "POST") => {
  const response = await fetch(
    `${MOCK_SERVER_URL}/__mock__/calls?method=${method}&path=${encodeURIComponent(path)}`,
  );
  const { count } = (await response.json()) as { count: number };
  return count;
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

export const resetMocks = async () => {
  await fetch(`${MOCK_SERVER_URL}/__mock__/reset`, { method: "POST" });
};
