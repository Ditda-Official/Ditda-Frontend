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

      await Promise.all([
        page.waitForResponse(
          response =>
            response.url().includes("/api/v1/auth/login") && response.request().method() === "POST",
          { timeout: 15000 },
        ),
        page.click('button[type="submit"]'),
      ]);

      await page.waitForFunction(() => document.cookie.includes("accessToken="), {
        timeout: 10000,
      });
    }
  } finally {
    await page.close();
  }
};
