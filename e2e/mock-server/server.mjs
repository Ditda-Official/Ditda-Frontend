import { createServer } from "node:http";

// SSR(서버 컴포넌트)와 브라우저 양쪽에서 오는 API 요청을 한 곳에서 스텁하기 위한 로컬 목 서버.
// playwright.config.ts가 NEXT_PUBLIC_API_BASE_URL을 이 서버 주소로 덮어써 실행하므로,
// `serverApi`(Node 프로세스에서 fetch)와 `api`(브라우저에서 fetch) 요청이 모두 여기로 온다.
const PORT = 4010;
const routes = new Map();

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
    const { method, path, status, body } = await readJsonBody(req);
    routes.set(routeKey(method, path), { status, body });
    send(res, origin, 200, { ok: true });
    return;
  }

  if (url.pathname === "/__mock__/reset" && req.method === "POST") {
    routes.clear();
    send(res, origin, 200, { ok: true });
    return;
  }

  const fixture = routes.get(routeKey(req.method, url.pathname));

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

  send(res, origin, fixture.status, fixture.body);
});

server.listen(PORT, () => {
  console.log(`[e2e mock server] listening on http://localhost:${PORT}`);
});
