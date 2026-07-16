import type { Page } from "@playwright/test";

import { expect, test } from "../fixtures/auth";
import { getLastRequestBody, mockApi } from "../utils/mockApi";
import { mockEmptyHomeDashboards } from "./home.helpers";
import {
  categoryCheckbox,
  categoryCommentTextarea,
  CONFIRM_MODAL_SELECTOR,
  DRAFT_ID,
  FINALIZE_DRAFT_PATH,
  mockCurrentRevision,
  REVISION_REQUEST_PATH,
} from "./revision.helpers";

const COMMISSION_ID = "701";

const finalizeButton = (page: Page) => page.getByRole("button", { name: "최종 시안으로 선택하기" });
const submitButton = (page: Page) => page.getByRole("button", { name: "수정사항 전달하기" });

test.beforeEach(async ({ page }) => {
  await mockCurrentRevision(COMMISSION_ID);
  await page.goto(`/instructor/revision/${COMMISSION_ID}`);
});

test.describe("수정 요청 — /instructor/revision/[commissionId]", () => {
  test("카테고리 미선택 상태에서는 최종 시안으로 선택하기만 활성화된다", async ({ page }) => {
    await expect(finalizeButton(page)).toBeEnabled();
    await expect(submitButton(page)).toBeDisabled();
  });

  test("카테고리 1개 선택 + 코멘트 미입력이면 두 버튼 모두 비활성이다", async ({ page }) => {
    await categoryCheckbox(page, "레이아웃 수정").click();

    await expect(finalizeButton(page)).toBeDisabled();
    await expect(submitButton(page)).toBeDisabled();
  });

  test("선택한 카테고리 전부에 코멘트를 입력하면 수정사항 전달하기만 활성화된다", async ({
    page,
  }) => {
    await categoryCheckbox(page, "레이아웃 수정").click();
    await categoryCheckbox(page, "색상 수정").click();

    await expect(submitButton(page)).toBeDisabled();

    await categoryCommentTextarea(page, "레이아웃 수정").fill("여백을 넓혀주세요");
    await expect(submitButton(page)).toBeDisabled();

    await categoryCommentTextarea(page, "색상 수정").fill("좀 더 차분한 톤으로 부탁드려요");

    await expect(submitButton(page)).toBeEnabled();
    await expect(finalizeButton(page)).toBeDisabled();
  });

  test("카테고리는 최대 2개까지만 선택되고 3번째 클릭은 무시된다", async ({ page }) => {
    await categoryCheckbox(page, "레이아웃 수정").click();
    await categoryCheckbox(page, "색상 수정").click();
    await categoryCheckbox(page, "기타").click();

    // 3번째(기타)는 무시되어 코멘트 섹션에 나타나지 않아야 한다 (체크박스 라벨 1개만 존재)
    await expect(page.getByText("기타", { exact: true })).toHaveCount(1);
    await expect(categoryCommentTextarea(page, "레이아웃 수정")).toBeVisible();
    await expect(categoryCommentTextarea(page, "색상 수정")).toBeVisible();
  });

  test("이미 선택된 카테고리를 재클릭하면 선택 해제되고 코멘트 입력창이 사라진다", async ({
    page,
  }) => {
    await categoryCheckbox(page, "레이아웃 수정").click();
    await expect(page.getByText("레이아웃 수정", { exact: true })).toHaveCount(2);

    await categoryCheckbox(page, "레이아웃 수정").click();
    await expect(page.getByText("레이아웃 수정", { exact: true })).toHaveCount(1);
  });

  test("최종 시안으로 선택하기 → 확인 모달 → 확인 시 postFinalizeDraft 호출 후 /instructor로 이동한다", async ({
    page,
  }) => {
    await mockEmptyHomeDashboards();
    await mockApi(FINALIZE_DRAFT_PATH(COMMISSION_ID, DRAFT_ID), { method: "POST", result: null });

    await finalizeButton(page).click();

    const modal = page.locator(CONFIRM_MODAL_SELECTOR);
    await expect(modal.getByText("최종 시안으로 선택하시겠습니까?")).toBeVisible();

    await modal.getByRole("button", { name: "확인" }).click();

    await expect(page).toHaveURL(/\/instructor$/);
  });

  test("수정사항 전달하기 클릭 시 body의 category가 코드로 매핑되어 전송된다", async ({ page }) => {
    await mockEmptyHomeDashboards();
    await mockApi(REVISION_REQUEST_PATH(COMMISSION_ID), { method: "POST", result: null });

    await categoryCheckbox(page, "타이포 수정").click();
    await categoryCheckbox(page, "디자인 수정").click();
    await categoryCommentTextarea(page, "타이포 수정").fill("폰트 크기를 키워주세요");
    await categoryCommentTextarea(page, "디자인 수정").fill("여백을 좀 더 넓게요");

    await submitButton(page).click();

    await expect(page).toHaveURL(/\/instructor$/);

    const body = await getLastRequestBody<{
      categories: { category: string; comment: string }[];
    }>(REVISION_REQUEST_PATH(COMMISSION_ID), "POST");

    expect(body?.categories).toEqual(
      expect.arrayContaining([
        { category: "TYPOGRAPHY", comment: "폰트 크기를 키워주세요" },
        { category: "DESIGN", comment: "여백을 좀 더 넓게요" },
      ]),
    );
    expect(body?.categories).toHaveLength(2);
  });
});
