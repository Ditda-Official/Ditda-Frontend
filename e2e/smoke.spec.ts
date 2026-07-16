import { expect, test } from "./fixtures/auth";
import { mockApi } from "./utils/mockApi";

test("마이페이지가 목 서버 응답으로 서버/클라이언트 데이터를 모두 렌더링한다", async ({ page }) => {
  await mockApi("/api/v1/instructors/me", {
    result: {
      name: "박유민",
      profileImageUrl: null,
      stats: { totalCommissionCount: 3, ongoingCommissionCount: 1 },
    },
  });
  await mockApi("/api/v1/instructors/commissions", {
    result: { items: [], page: 0, size: 3, totalElements: 0, totalPages: 0 },
  });

  await page.goto("/instructor/my");

  await expect(page.getByText("박유민")).toBeVisible();
  await expect(page.getByText("3회")).toBeVisible();
  await expect(page.getByText("진행된 외주가 없습니다")).toBeVisible();
});
