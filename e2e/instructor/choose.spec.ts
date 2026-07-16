import { expect, test } from "../fixtures/auth";
import { getCallCount, mockApi, mockApiError } from "../utils/mockApi";
import {
  CONFIRM_MODAL_SELECTOR,
  DRAFTS_PATH,
  draftSelectButton,
  mockDrafts,
  SELECT_DRAFT_PATH,
} from "./choose.helpers";
import { mockEmptyHomeDashboards } from "./home.helpers";

const COMMISSION_ID = "501";

test.describe("매칭 후 1차 시안 선택 — /instructor/choose/[commissionId]", () => {
  test("시안 목록이 정상적으로 렌더링된다", async ({ page }) => {
    await mockDrafts(COMMISSION_ID, [{ draftId: 11 }, { draftId: 22 }], "수학의 정석 외주");
    await page.goto(`/instructor/choose/${COMMISSION_ID}`);

    await expect(page.getByText("수학의 정석 외주")).toBeVisible();
    await expect(page.getByText("시안 확인")).toBeVisible();
    await expect(page.getByText("시안 1", { exact: true })).toBeVisible();
    await expect(page.getByText("시안 2", { exact: true })).toBeVisible();
  });

  test("응답이 null이면 404 페이지로 처리된다", async ({ page }) => {
    await mockApi(DRAFTS_PATH(COMMISSION_ID), { result: null });
    await page.goto(`/instructor/choose/${COMMISSION_ID}`);

    await expect(page.getByText("페이지를 찾을 수 없습니다")).toBeVisible();
  });

  test("시안 미선택 상태에서는 제출하기 버튼이 비활성이다", async ({ page }) => {
    await mockDrafts(COMMISSION_ID, [{ draftId: 11 }]);
    await page.goto(`/instructor/choose/${COMMISSION_ID}`);

    await expect(page.getByRole("button", { name: "제출하기" })).toBeDisabled();
  });

  test.describe("시안 선택 후 제출", () => {
    test.beforeEach(async ({ page }) => {
      await mockDrafts(COMMISSION_ID, [{ draftId: 11 }, { draftId: 22 }]);
      await page.goto(`/instructor/choose/${COMMISSION_ID}`);
      // 두 번째(index 1) 시안 선택 → draftId 22
      await draftSelectButton(page, 1).click();
    });

    test("시안 선택 후 제출하기 클릭 시 확인 모달이 뜬다", async ({ page }) => {
      const submitButton = page.getByRole("button", { name: "제출하기" });
      await expect(submitButton).toBeEnabled();
      await expect(draftSelectButton(page, 1)).toHaveAttribute("aria-pressed", "true");

      await submitButton.click();

      const modal = page.locator(CONFIRM_MODAL_SELECTOR);
      await expect(modal.getByText("해당 시안으로 선택하시겠습니까?")).toBeVisible();
    });

    test("취소를 누르면 모달이 닫히고 선택 상태는 유지된다", async ({ page }) => {
      await page.getByRole("button", { name: "제출하기" }).click();
      const modal = page.locator(CONFIRM_MODAL_SELECTOR);

      await modal.getByRole("button", { name: "취소" }).click();

      await expect(modal).not.toBeVisible();
      await expect(page.getByRole("button", { name: "제출하기" })).toBeEnabled();
      await expect(draftSelectButton(page, 1)).toHaveAttribute("aria-pressed", "true");
    });

    test("확인을 누르면 postSelectDraft 호출 후 /instructor로 이동한다", async ({ page }) => {
      await mockEmptyHomeDashboards();
      await mockApi(SELECT_DRAFT_PATH(COMMISSION_ID, 22), { method: "POST", result: null });

      await page.getByRole("button", { name: "제출하기" }).click();
      const modal = page.locator(CONFIRM_MODAL_SELECTOR);
      await modal.getByRole("button", { name: "확인" }).click();

      await expect(page).toHaveURL(/\/instructor$/);
      expect(await getCallCount(SELECT_DRAFT_PATH(COMMISSION_ID, 22), "POST")).toBe(1);
    });

    test("postSelectDraft 실패 시 모달이 닫히지 않고 재시도할 수 있다", async ({ page }) => {
      await mockEmptyHomeDashboards();
      await mockApiError(SELECT_DRAFT_PATH(COMMISSION_ID, 22), { method: "POST" });

      await page.getByRole("button", { name: "제출하기" }).click();
      const modal = page.locator(CONFIRM_MODAL_SELECTOR);
      const confirmButton = modal.getByRole("button", { name: "확인" });

      await confirmButton.click();
      await expect(modal).toBeVisible();
      await expect(page).not.toHaveURL(/\/instructor$/);

      // isSubmitting이 false로 복귀해 재시도가 가능한지 확인
      await mockApi(SELECT_DRAFT_PATH(COMMISSION_ID, 22), { method: "POST", result: null });
      await confirmButton.click();
      await expect(page).toHaveURL(/\/instructor$/);
    });
  });
});
