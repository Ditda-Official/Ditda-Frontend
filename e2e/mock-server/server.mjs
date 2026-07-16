import { createServer } from "node:http";

// SSR(서버 컴포넌트)와 브라우저 양쪽에서 오는 API 요청을 한 곳에서 스텁하기 위한 로컬 목 서버.
const PORT = 4010;
const routes = new Map();
const callCounts = new Map();
const lastRequestBodies = new Map();

const routeKey = (method, path) => `${method.toUpperCase()} ${path}`;

const readJsonBody = req =>
  new Promise((resolve, reject) => {
    let data = "";
    req.on("data", chunk => (data += chunk));
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });

const send = (res, origin, status, body) => {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Credentials": "true",
  });
  res.end(JSON.stringify(body));
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const server = createServer(async (req, res) => {
  const origin = req.headers.origin ?? "*";

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET,POST,PATCH,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers":
        req.headers["access-control-request-headers"] ?? "Content-Type, Authorization",
    });
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (url.pathname === "/__mock__/health") {
    send(res, origin, 200, { ok: true });
    return;
  }

  if (url.pathname === "/__mock__/route" && req.method === "POST") {
    const { method, path, status, body, delayMs } = await readJsonBody(req);
    routes.set(routeKey(method, path), { status, body, delayMs });
    callCounts.set(routeKey(method, path), 0);
    send(res, origin, 200, { ok: true });
    return;
  }

  if (url.pathname === "/__mock__/calls" && req.method === "GET") {
    const method = url.searchParams.get("method") ?? "GET";
    const path = url.searchParams.get("path") ?? "";
    send(res, origin, 200, { count: callCounts.get(routeKey(method, path)) ?? 0 });
    return;
  }

  if (url.pathname === "/__mock__/reset" && req.method === "POST") {
    routes.clear();
    callCounts.clear();
    lastRequestBodies.clear();
    send(res, origin, 200, { ok: true });
    return;
  }

  if (url.pathname === "/__mock__/last-body" && req.method === "GET") {
    const method = url.searchParams.get("method") ?? "GET";
    const path = url.searchParams.get("path") ?? "";
    send(res, origin, 200, { body: lastRequestBodies.get(routeKey(method, path)) ?? null });
    return;
  }

  const key = routeKey(req.method, url.pathname);
  const fixture = routes.get(key);

  // 등록된 fixture가 있든 없든, 테스트가 나중에 검증할 수 있도록 실제로 보낸
  // 요청 바디를 저장해둔다(예: 수정 요청 시 category 코드 매핑 검증).
  try {
    lastRequestBodies.set(key, await readJsonBody(req));
  } catch {
    lastRequestBodies.set(key, null);
  }

  if (!fixture) {
    send(res, origin, 404, {
      success: false,
      code: "NOT_MOCKED",
      message: `no e2e fixture registered for ${req.method} ${url.pathname}`,
      result: null,
      error: "NOT_MOCKED",
      timestamp: new Date().toISOString(),
    });
    return;
  }

  callCounts.set(key, (callCounts.get(key) ?? 0) + 1);

  if (fixture.delayMs) await sleep(fixture.delayMs);

  send(res, origin, fixture.status, fixture.body);
});

server.listen(PORT, () => {
  console.log(`[e2e mock server] listening on http://localhost:${PORT}`);
});
