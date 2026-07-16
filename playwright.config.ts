import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3100",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: [
    {
      command: "node e2e/mock-server/server.mjs",
      url: "http://localhost:4010/__mock__/health",
      reuseExistingServer: !process.env.CI,
      timeout: 30_000,
    },
    {
      // 로컬 dev 서버(3000)가 이미 다른 용도로 떠 있을 수 있어 e2e 전용 포트를 분리한다.
      command: "pnpm exec next dev -p 3100",
      url: "http://localhost:3100",
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      // 서버 컴포넌트(SSR)와 브라우저 양쪽의 API 요청을 모두 로컬 목 서버로 보낸다.
      env: { NEXT_PUBLIC_API_BASE_URL: "http://localhost:4010" },
    },
  ],
});
