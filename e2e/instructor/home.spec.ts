import { expect, test } from "../fixtures/auth";
import { mockDrafts } from "./choose.helpers";
import { mockCommissionDetail } from "./detail.helpers";
import { mockHomeDashboards } from "./home.helpers";
import { mockCurrentRevision } from "./revision.helpers";

test.describe("홈 대시보드 — /instructor", () => {
  test("시안 제출 현황 / 매칭 중인 외주 / 수정 중인 외주 3개 섹션이 API 응답 기준으로 렌더링된다", async ({
    page,
  }) => {
    await mockHomeDashboards({
      draftSubmissions: [
        {
          commissionId: 1,
          title: "국어 개념서 외주",
          category: "FLYER_TEXTBOOK_COVER_INNER",
          draftSubmission: { submitted: 2, total: 3 },
          isViewable: true,
          firstDraftDeadline: "2026-12-31",
        },
      ],
      matchings: [
        {
          commissionId: 2,
          title: "영어 문제집 외주",
          applicationDeadline: "2026-12-31",
          matching: { matched: 1, total: 3 },
        },
      ],
      revisions: [
        {
          commissionId: 3,
          title: "과학 요약집 외주",
          isSubmitted: false,
          hasUpdated: true,
          finalDeadline: "2026-12-31",
        },
      ],
    });

    await page.goto("/instructor");

    await expect(page.getByText("시안 제출").first()).toBeVisible();
    await expect(page.getByText("국어 개념서 외주")).toBeVisible();
    await expect(page.getByText("(2/3)")).toBeVisible();

    await expect(page.getByText("매칭 중").first()).toBeVisible();
    await expect(page.getByText("영어 문제집 외주")).toBeVisible();
    await expect(page.getByText("(1/3)")).toBeVisible();

    await expect(page.getByText("수정 중").first()).toBeVisible();
    await expect(page.getByText("과학 요약집 외주")).toBeVisible();
  });

  test("시안 제출 현황에서 확인하기 클릭 시 choose 라우트로 이동한다", async ({ page }) => {
    await mockHomeDashboards({
      draftSubmissions: [
        {
          commissionId: 101,
          title: "국어 개념서 외주",
          category: "FLYER_TEXTBOOK_COVER_INNER",
          draftSubmission: { submitted: 2, total: 3 },
          isViewable: true,
          firstDraftDeadline: "2026-12-31",
        },
      ],
    });
    await mockDrafts(101, [{ draftId: 1 }]);

    await page.goto("/instructor");
    await page.getByRole("button", { name: "확인하기" }).click();

    await expect(page).toHaveURL(/\/instructor\/choose\/101$/);
  });

  test("매칭 중인 외주 항목 클릭 시 detail 라우트로 이동한다", async ({ page }) => {
    await mockHomeDashboards({
      matchings: [
        {
          commissionId: 202,
          title: "영어 문제집 외주",
          applicationDeadline: "2026-12-31",
          matching: { matched: 1, total: 3 },
        },
      ],
    });
    await mockCommissionDetail(202);

    await page.goto("/instructor");
    await page.getByText("영어 문제집 외주").click();

    await expect(page).toHaveURL(/\/instructor\/detail\/202$/);
  });

  test("수정 중인 외주에서 확인하기 클릭 시 revision 라우트로 이동한다", async ({ page }) => {
    await mockHomeDashboards({
      revisions: [
        {
          commissionId: 303,
          title: "과학 요약집 외주",
          isSubmitted: false,
          hasUpdated: false,
          finalDeadline: "2026-12-31",
        },
      ],
    });
    await mockCurrentRevision(303);

    await page.goto("/instructor");
    await page.getByRole("button", { name: "확인하기" }).click();

    await expect(page).toHaveURL(/\/instructor\/revision\/303$/);
  });

  test("진행 중 외주 관련 페이지에서는 사이드바의 '진행 중 외주' 메뉴가 활성화된다", async ({
    page,
  }) => {
    await mockCommissionDetail(999);
    await page.goto("/instructor/detail/999");

    // hover:bg-gray-20(호버 스타일)은 항상 클래스에 존재하므로, 선택 시에만 별도
    // 토큰으로 붙는 "bg-gray-20"만 정확히 매치하도록 단어 경계로 구분한다.
    const selectedClass = /(?:^|\s)bg-gray-20(?:\s|$)/;
    await expect(page.getByRole("link", { name: "진행 중 외주" })).toHaveClass(selectedClass);
    await expect(page.getByRole("link", { name: "새 외주 작성" })).not.toHaveClass(selectedClass);
    await expect(page.getByRole("link", { name: "마이페이지" })).not.toHaveClass(selectedClass);
  });
});
