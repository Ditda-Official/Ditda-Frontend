import { test as base } from "@playwright/test";

import { resetMocks } from "../utils/mockApi";

type UserRole = "instructor" | "designer";

const encodeBase64Url = (input: object) => Buffer.from(JSON.stringify(input)).toString("base64url");

// 실제 로그인 API를 거치지 않고, 앱이 읽는 쿠키(accessToken/userRole)를 직접 주입해 인증 상태를 만든다.
// accessToken은 payload.role만 디코딩되면 되므로 서명은 임의 값으로 둔다.
export const createFakeAccessToken = (role: UserRole) => {
  const header = encodeBase64Url({ alg: "none", typ: "JWT" });
  const payload = encodeBase64Url({ role, sub: "e2e-test-instructor" });
  return `${header}.${payload}.e2e-signature`;
};

export const test = base.extend<{ instructorAuth: void }>({
  instructorAuth: [
    async ({ context }, use) => {
      await resetMocks();
      await context.addCookies([
        {
          name: "accessToken",
          value: createFakeAccessToken("instructor"),
          domain: "localhost",
          path: "/",
        },
        { name: "userRole", value: "instructor", domain: "localhost", path: "/" },
        { name: "userName", value: "e2e-test-instructor", domain: "localhost", path: "/" },
      ]);
      await use();
    },
    { auto: true },
  ],
});

export { expect } from "@playwright/test";
