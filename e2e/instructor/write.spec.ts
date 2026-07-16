import { expect, test } from "../fixtures/auth";
import { getCallCount, mockApi, mockApiError } from "../utils/mockApi";
import { mockEmptyHomeDashboards } from "./home.helpers";
import {
  agreeToTerms,
  clickNext,
  COMMISSIONS_PATH,
  fillStep1,
  fillStep2,
  fillStep3,
  mockPlans,
  NOTIFY_DEPOSIT_PATH,
  openPaymentModal,
  PAYMENT_MODAL_SELECTOR,
} from "./write.helpers";

test.beforeEach(async ({ page }) => {
  await page.goto("/instructor/write");
});

test.describe("Step1 필수 항목 검증 (isAllSelected)", () => {
  test("아무것도 선택하지 않으면 다음 버튼이 비활성 상태이고 Step2로 진행되지 않는다", async ({
    page,
  }) => {
    const nextButton = page.getByRole("button", { name: "다음" });
    await expect(nextButton).toBeDisabled();

    await expect(page.getByText("기본정보 작성하기")).not.toBeVisible();
  });

  test("colorMode가 designer면 색상을 선택하지 않아도 다음으로 진행할 수 있다", async ({
    page,
  }) => {
    await fillStep1(page, { colorMode: "designer" });

    await expect(page.getByRole("button", { name: "다음" })).toBeEnabled();
  });

  test("colorMode가 custom이면 3개 색상을 모두 선택해야 다음으로 진행할 수 있다", async ({
    page,
  }) => {
    await page.getByText("교재 외지/내지", { exact: true }).click();
    await page.getByText("A4", { exact: true }).nth(1).click();
    await page.getByText("차분한", { exact: true }).click();
    await page.getByRole("button", { name: "직접 색상 지정" }).click();

    const nextButton = page.getByRole("button", { name: "다음" });
    const hexInputs = page.locator('input[type="text"]');
    const neutralArea = page.getByText("색상 선택", { exact: true });

    await hexInputs.nth(0).fill("FF0000");
    await neutralArea.click();
    await expect(nextButton).toBeDisabled();

    await hexInputs.nth(1).fill("00FF00");
    await neutralArea.click();
    await expect(nextButton).toBeDisabled();

    await hexInputs.nth(2).fill("0000FF");
    await neutralArea.click();
    await expect(nextButton).toBeEnabled();
  });

  // 회귀 방지: ColorChooseCard의 R/G/B/A 입력에 Tab으로 포커스만 이동해도
  // (직접 색을 고르지 않아도) 공용 ColorPicker가 재바인딩되면서 react-colorful의
  // onChange 부작용으로 검정(#000000)이 자동 커밋되던 버그가 있었다.
  // (ColorChooseSection.tsx / ColorPicker.tsx에서 수정됨)
  test("색상 카드 사이를 Tab으로만 이동해도 만지지 않은 카드에 색이 자동으로 채워지지 않는다", async ({
    page,
  }) => {
    await page.getByText("교재 외지/내지", { exact: true }).click();
    await page.getByText("A4", { exact: true }).nth(1).click();
    await page.getByText("차분한", { exact: true }).click();
    await page.getByRole("button", { name: "직접 색상 지정" }).click();

    const hexInputs = page.locator('input[type="text"]');

    await hexInputs.nth(0).fill("FF0000");
    await hexInputs.nth(0).press("Tab");
    await expect(hexInputs.nth(1)).toHaveValue("");

    await hexInputs.nth(1).fill("00FF00");
    await hexInputs.nth(1).press("Tab");
    await expect(hexInputs.nth(2)).toHaveValue("");
  });
});

test.describe("Step1 → Step2 → Step3 플로우", () => {
  test("Step2 필수 항목(기본정보/페이지)을 모두 채우면 Step3로 이동한다", async ({ page }) => {
    await fillStep1(page);
    await clickNext(page);

    await expect(page.getByText("기본정보 작성하기")).toBeVisible();
    const nextButton = page.getByRole("button", { name: "다음" });
    await expect(nextButton).toBeDisabled();

    await fillStep2(page);
    await expect(nextButton).toBeEnabled();
    await nextButton.click();

    await expect(page.getByText("플랜 선택")).toBeVisible();
  });
});

test.describe("Step3 → 결제 모달 오픈", () => {
  test("플랜과 마감일을 선택해야 결제하기 버튼이 활성화되고 모달이 열린다", async ({ page }) => {
    await mockPlans();
    await fillStep1(page);
    await clickNext(page);
    await fillStep2(page);
    await clickNext(page);

    const payButton = page.getByRole("button", { name: "결제하기" });
    await expect(payButton).toBeDisabled();

    await fillStep3(page);
    await expect(payButton).toBeEnabled();
    await payButton.click();

    const modal = page.locator(PAYMENT_MODAL_SELECTOR);
    await expect(modal).toBeVisible();
    await expect(modal.getByText("약관동의")).toBeVisible();
  });
});

test.describe("PaymentModal", () => {
  test.beforeEach(async ({ page }) => {
    await mockPlans();
    await fillStep1(page);
    await clickNext(page);
    await fillStep2(page, { title: "수학의 정석" });
    await clickNext(page);
    await fillStep3(page);
    await openPaymentModal(page);
    await expect(page.locator(PAYMENT_MODAL_SELECTOR)).toBeVisible();
  });

  test("결제 성공 시 Step2(계좌 이체 안내)로 전환되고 헤더에 교재명이 표시된다", async ({
    page,
  }) => {
    await mockApi(COMMISSIONS_PATH, {
      method: "POST",
      result: {
        commissionId: 123,
        title: "수학의 정석 외주",
        category: "FLYER_TEXTBOOK_COVER_INNER",
        status: "PAYMENT_PENDING",
        applicationDeadline: "2026-08-01",
        firstDraftDeadline: "2026-08-10",
        finalDeadline: "2026-08-24",
        maxRevision: 3,
        createdAt: new Date().toISOString(),
      },
    });

    const modal = page.locator(PAYMENT_MODAL_SELECTOR);
    await expect(modal.getByText("수학의 정석")).toBeVisible();

    await agreeToTerms(page);
    await modal.getByRole("button", { name: "결제하기" }).click();

    await expect(modal.getByText("아래 계좌로")).toBeVisible();
    await expect(modal.getByRole("button", { name: "결제 완료" })).toBeVisible();
    await expect(modal.getByText("수학의 정석")).toBeVisible();
  });
  test("결제 API 에러 시 에러 메시지가 노출되고 Step1에 머무른다", async ({ page }) => {
    await mockApiError(COMMISSIONS_PATH, {
      method: "POST",
      message: "결제 처리 중 오류가 발생했습니다",
    });

    const modal = page.locator(PAYMENT_MODAL_SELECTOR);
    await agreeToTerms(page);
    await modal.getByRole("button", { name: "결제하기" }).click();

    await expect(modal.getByText("Bad Request")).toBeVisible();
    await expect(modal.getByRole("button", { name: "결제하기" })).toBeVisible();
    await expect(modal.getByText("아래 계좌로")).not.toBeVisible();
  });

  test("결제하기를 연속 클릭해도 postCommission은 1회만 호출된다", async ({ page }) => {
    await mockApi(COMMISSIONS_PATH, {
      method: "POST",
      delayMs: 500,
      result: {
        commissionId: 123,
        title: "수학의 정석 외주",
        category: "FLYER_TEXTBOOK_COVER_INNER",
        status: "PAYMENT_PENDING",
        applicationDeadline: "2026-08-01",
        firstDraftDeadline: "2026-08-10",
        finalDeadline: "2026-08-24",
        maxRevision: 3,
        createdAt: new Date().toISOString(),
      },
    });

    const modal = page.locator(PAYMENT_MODAL_SELECTOR);
    await agreeToTerms(page);
    const payButton = modal.getByRole("button", { name: "결제하기" });

    await Promise.all([payButton.click(), payButton.click()]);
    await expect(modal.getByText("아래 계좌로")).toBeVisible();

    expect(await getCallCount(COMMISSIONS_PATH, "POST")).toBe(1);
  });

  test("Esc 키를 누르면 모달이 닫힌다", async ({ page }) => {
    await page.keyboard.press("Escape");
    await expect(page.locator(PAYMENT_MODAL_SELECTOR)).not.toBeVisible();
  });

  test("모달 바깥을 클릭하면 닫히고, 안쪽을 클릭하면 닫히지 않는다", async ({ page }) => {
    const modal = page.locator(PAYMENT_MODAL_SELECTOR);
    await modal.getByText("약관동의").click();
    await expect(modal).toBeVisible();

    await modal.click({ position: { x: 5, y: 5 } });
    await expect(modal).not.toBeVisible();
  });
});

test.describe("결제 완료 후 입금 통보", () => {
  test("Step2에서 결제 완료를 누르면 postNotifyDeposit 호출 후 홈으로 이동한다", async ({
    page,
  }) => {
    await mockPlans();
    await fillStep1(page);
    await clickNext(page);
    await fillStep2(page);
    await clickNext(page);
    await fillStep3(page);
    await openPaymentModal(page);

    await mockApi(COMMISSIONS_PATH, {
      method: "POST",
      result: {
        commissionId: 123,
        title: "수학의 정석 외주",
        category: "FLYER_TEXTBOOK_COVER_INNER",
        status: "PAYMENT_PENDING",
        applicationDeadline: "2026-08-01",
        firstDraftDeadline: "2026-08-10",
        finalDeadline: "2026-08-24",
        maxRevision: 3,
        createdAt: new Date().toISOString(),
      },
    });
    await mockApi(NOTIFY_DEPOSIT_PATH(123), { method: "POST", result: null });
    await mockEmptyHomeDashboards();

    const modal = page.locator(PAYMENT_MODAL_SELECTOR);
    await agreeToTerms(page);
    await modal.getByRole("button", { name: "결제하기" }).click();
    await expect(modal.getByRole("button", { name: "결제 완료" })).toBeVisible();

    await modal.getByRole("button", { name: "결제 완료" }).click();
    await expect(page).toHaveURL(/\/instructor$/);
  });
});

test.describe("브라우저 뒤로가기", () => {
  test("뒤로가기 시 이전 스텝으로 돌아가고 입력했던 값이 유지된다", async ({ page }) => {
    await fillStep1(page);
    await clickNext(page);
    await expect(page.getByText("기본정보 작성하기")).toBeVisible();

    await page.goBack();

    await expect(page.getByText("기본정보 작성하기")).not.toBeVisible();
    await expect(page.getByRole("radio", { name: "교재 외지/내지" })).toBeChecked();
    await expect(page.getByText("차분한", { exact: true }).first()).toBeVisible();
    await expect(page.getByRole("button", { name: "다음" })).toBeEnabled();
  });
});
