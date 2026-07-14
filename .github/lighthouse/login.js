/**
 * Lighthouse CI puppeteerScript: logs the shared browser into a test account
 * before each URL is audited, so /designer/* or /instructor/* pages aren't
 * bounced to /login by the auth middleware (src/proxy.ts).
 *
 * Requires LHCI_USERNAME / LHCI_PASSWORD env vars on the collect step.
 *
 * @param {import('puppeteer').Browser} browser
 * @param {{url: string}} context
 */
module.exports = async (browser, context) => {
  const origin = new URL(context.url).origin;
  const page = await browser.newPage();

  try {
    const bypassSecret = process.env.VERCEL_PROTECTION_BYPASS_SECRET;
    if (bypassSecret) {
      const bypassUrl = `${origin}/?x-vercel-protection-bypass=${bypassSecret}&x-vercel-set-bypass-cookie=true`;
      await page.goto(bypassUrl, { waitUntil: "networkidle0" });
    }

    const existingCookies = await page.cookies(origin);
    const alreadyLoggedIn = existingCookies.some(cookie => cookie.name === "accessToken");

    if (!alreadyLoggedIn) {
      const username = process.env.LHCI_USERNAME;
      const password = process.env.LHCI_PASSWORD;

      if (!username || !password) {
        throw new Error("LHCI_USERNAME / LHCI_PASSWORD env vars are required for this run.");
      }

      await page.goto(`${origin}/login`, { waitUntil: "networkidle0" });
      await page.waitForSelector('input[placeholder="아이디를 입력해주세요"]', { timeout: 15000 });
      await page.type('input[placeholder="아이디를 입력해주세요"]', username, { delay: 20 });
      await page.type('input[placeholder="비밀번호를 입력해주세요"]', password, { delay: 20 });

      const [loginResponse] = await Promise.all([
        page.waitForResponse(
          response =>
            response.url().includes("/api/v1/auth/login") && response.request().method() === "POST",
          { timeout: 15000 },
        ),
        page.click('button[type="submit"]'),
      ]);

      try {
        await page.waitForFunction(() => document.cookie.includes("accessToken="), {
          timeout: 10000,
        });
      } catch (error) {
        const status = loginResponse.status();
        const body = await loginResponse.text().catch(() => "(응답 본문 읽기 실패)");
        const pageText = await page
          .evaluate(() => document.body.innerText.slice(0, 300))
          .catch(() => "(본문 읽기 실패)");
        console.error("[login.js] 로그인 후 accessToken 쿠키가 생성되지 않음. 진단 정보:");
        console.error("  로그인 API 응답 status:", status);
        console.error("  로그인 API 응답 body:", body.slice(0, 800));
        console.error("  현재 페이지 텍스트:", pageText.replace(/\n+/g, " "));
        throw error;
      }
    }
  } finally {
    await page.close();
  }
};
