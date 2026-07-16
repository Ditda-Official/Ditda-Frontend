import type { Page } from "@playwright/test";

import { mockApi } from "../utils/mockApi";

export const PLANS_PATH = "/api/v1/instructors/commissions/plans";
export const COMMISSIONS_PATH = "/api/v1/instructors/commissions";
export const NOTIFY_DEPOSIT_PATH = (commissionId: number) =>
  `${COMMISSIONS_PATH}/${commissionId}/notify-deposit`;

export const PAYMENT_MODAL_SELECTOR = ".fixed.inset-0.z-50";

export const mockPlans = () =>
  mockApi(PLANS_PATH, {
    result: {
      plans: [
        { code: "BASIC", designerCount: 3, price: 400000, description: "기본 플랜 설명" },
        { code: "PLUS", designerCount: 4, price: 450000, description: "플러스 플랜 설명" },
        { code: "MAX", designerCount: 5, price: 480000, description: "맥스 플랜 설명" },
      ],
    },
  });

type ColorMode = "designer" | "custom";

export const fillStep1 = async (
  page: Page,
  { colorMode = "designer" as ColorMode }: { colorMode?: ColorMode } = {},
) => {
  await page.getByText("교재 외지/내지", { exact: true }).click();
  await page.getByText("A4", { exact: true }).nth(1).click();
  await page.getByText("차분한", { exact: true }).click();

  if (colorMode === "custom") {
    await page.getByRole("button", { name: "직접 색상 지정" }).click();
    const hexes = ["FF0000", "00FF00", "0000FF"];
    const hexInputs = page.locator('input[type="text"]');
    const neutralArea = page.getByText("색상 선택", { exact: true });
    for (let i = 0; i < hexes.length; i++) {
      await hexInputs.nth(i).fill(hexes[i]);
      await neutralArea.click();
    }
  }
};

export const clickNext = (page: Page) => page.getByRole("button", { name: "다음" }).click();

export const fillStep2 = async (
  page: Page,
  { title = "수학의 정석", instructor = "홍길동", subject = "수학" } = {},
) => {
  await page.getByPlaceholder("교재명을 작성해주세요").fill(title);
  await page.getByPlaceholder("강사명을 작성해주세요").fill(instructor);
  await page.getByPlaceholder("과목명을 작성해주세요").fill(subject);
  await page.getByText("표지", { exact: true }).click();
};

export const fillStep3 = async (page: Page, { planLabel = "기본 플랜" } = {}) => {
  await page.getByText(planLabel, { exact: true }).click();

  await page.getByText("1차 시안 수령일", { exact: true }).click();
  await page.getByRole("button", { name: "선택하기" }).click();

  await page.getByText("최종 시안 수령일", { exact: true }).click();
  const menu = page.locator(".shadow-dropdown");
  await menu
    .locator(".z-10")
    .getByText(/^\d{4}년$/)
    .nth(1)
    .click();
};

export const openPaymentModal = (page: Page) =>
  page.getByRole("button", { name: "결제하기" }).click();

export const agreeToTerms = async (page: Page) => {
  const modal = page.locator(PAYMENT_MODAL_SELECTOR);
  const label = modal.getByText("[필수] 모두 동의", { exact: true });
  const row = label.locator("xpath=../..");
  await row.locator("svg").first().click();
};
