import { expect, test } from "../fixtures/auth";
import { mockCommissionsHistory, mockMyInfo } from "./my.helpers";

test.describe("마이페이지 — /instructor/my", () => {
  test("내 정보(MyInfoSection)가 정상적으로 표시된다", async ({ page }) => {
    await mockMyInfo({ name: "박유민", totalCommissionCount: 5, ongoingCommissionCount: 2 });
    await mockCommissionsHistory([]);

    await page.goto("/instructor/my");

    await expect(page.getByText("박유민", { exact: true })).toBeVisible();
    await expect(page.getByText("5회")).toBeVisible();
    await expect(page.getByText("2건")).toBeVisible();
  });

  test("외주 히스토리 목록이 렌더링된다", async ({ page }) => {
    await mockMyInfo();
    await mockCommissionsHistory([
      {
        commissionId: 1,
        title: "수학의 정석 외주",
        createdAt: "2026-07-01",
        plan: "PLUS",
        paidAmount: 450000,
      },
    ]);

    await page.goto("/instructor/my");

    await expect(page.getByText("수학의 정석 외주")).toBeVisible();
    await expect(page.getByText("2026.07.01")).toBeVisible();
    await expect(page.getByText("플러스", { exact: true })).toBeVisible();
    await expect(page.getByText("450,000원")).toBeVisible();
  });

  test("외주 내역이 없으면 빈 상태 문구가 표시된다", async ({ page }) => {
    await mockMyInfo();
    await mockCommissionsHistory([]);

    await page.goto("/instructor/my");

    await expect(page.getByText("진행된 외주가 없습니다")).toBeVisible();
  });
});
