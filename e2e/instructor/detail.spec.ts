import { expect, test } from "../fixtures/auth";
import { mockApi } from "../utils/mockApi";
import { DETAIL_PATH, mockCommissionDetail } from "./detail.helpers";

const COMMISSION_ID = "999";

test.describe("외주 상세 조회 — /instructor/detail/[commissionId]", () => {
  test("디자인 정보 탭에 카테고리/사이즈/컨셉/색상이 표시된다", async ({ page }) => {
    await mockCommissionDetail(COMMISSION_ID);
    await page.goto(`/instructor/detail/${COMMISSION_ID}`);

    await expect(page.getByText("수학의 정석 외주")).toBeVisible();
    await expect(page.getByText("교재 외지/내지")).toBeVisible();
    await expect(page.getByText("A4 (210×297mm)")).toBeVisible();
    // 선택된 컨셉(MUTED="차분한", ORDERLY="정돈된")은 강조 스타일로 표시된다
    await expect(page.getByText("차분한", { exact: true })).toBeVisible();
    await expect(page.getByText("정돈된", { exact: true })).toBeVisible();
    await expect(page.getByText("#FF0000")).toBeVisible();
    await expect(page.getByText("#00FF00")).toBeVisible();
  });

  test("작업 요청사항 탭으로 전환하면 기본정보와 요청 페이지가 표시된다", async ({ page }) => {
    await mockCommissionDetail(COMMISSION_ID);
    await page.goto(`/instructor/detail/${COMMISSION_ID}`);

    await page.getByRole("button", { name: "작업 요청사항" }).click();

    await expect(page.getByText("수학의 정석", { exact: true })).toBeVisible();
    await expect(page.getByText("홍길동", { exact: true })).toBeVisible();
    await expect(page.getByText("수학", { exact: true })).toBeVisible();
    await expect(page.getByText("심플한 표지로 부탁드려요")).toBeVisible();
  });

  test("자료 및 레퍼런스 탭으로 전환하면 자료/레퍼런스 정보가 표시된다", async ({ page }) => {
    await mockCommissionDetail(COMMISSION_ID);
    await page.goto(`/instructor/detail/${COMMISSION_ID}`);

    await page.getByRole("button", { name: "자료 및 레퍼런스" }).click();

    await expect(page.getByText("자료 설명입니다")).toBeVisible();
    // REFERENCE 파일은 비어있으므로 빈 상태 문구가 보여야 한다
    await expect(page.getByText("등록된 레퍼런스가 없습니다")).toBeVisible();
    await expect(page.getByText("작성된 레퍼런스 참고사항이 없습니다")).toBeVisible();
  });

  test("존재하지 않는 commissionId면 404 페이지로 처리된다", async ({ page }) => {
    await mockApi(DETAIL_PATH("000"), { result: null });
    await page.goto("/instructor/detail/000");

    await expect(page.getByText("페이지를 찾을 수 없습니다")).toBeVisible();
  });
});
