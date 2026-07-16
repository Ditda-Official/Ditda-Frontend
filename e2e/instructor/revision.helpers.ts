import type { Page } from "@playwright/test";

import { mockApi } from "../utils/mockApi";

export const CURRENT_REVISION_PATH = (commissionId: string | number) =>
  `/api/v1/instructors/commissions/${commissionId}/revisions/current`;

export const REVISION_REQUEST_PATH = (commissionId: string | number) =>
  `/api/v1/instructors/commissions/${commissionId}/revisions`;

export const FINALIZE_DRAFT_PATH = (commissionId: string | number, draftId: string | number) =>
  `/api/v1/instructors/commissions/${commissionId}/drafts/${draftId}/finalize`;

// Modal(확인 모달)은 "p-8"까지 포함해 DraftModal(시안 확대 보기)과 클래스로 구분된다.
export const CONFIRM_MODAL_SELECTOR = ".fixed.inset-0.z-50.p-8";

export const DRAFT_ID = 55;

export const mockCurrentRevision = (
  commissionId: string | number,
  overrides: { currentRevisionCount?: number; maxRevisionCount?: number } = {},
) =>
  mockApi(CURRENT_REVISION_PATH(commissionId), {
    result: {
      commissionId: Number(commissionId),
      title: "수학의 정석 외주",
      draft: {
        draftId: DRAFT_ID,
        thumbnailUrl: "/images/thumbnail_mock.jpg",
        designerComment: "전체적으로 깔끔하게 작업해봤어요",
      },
      currentRevisionCount: overrides.currentRevisionCount ?? 2,
      maxRevisionCount: overrides.maxRevisionCount ?? 3,
    },
  });

// 체크박스 라벨과 코멘트 섹션의 카테고리 제목이 같은 텍스트를 쓰므로, DOM 순서상
// 먼저 렌더링되는 체크박스는 첫 번째 매치, 코멘트 섹션은 마지막 매치로 구분한다.
export const categoryCheckbox = (page: Page, category: string) =>
  page.getByText(category, { exact: true }).first();

export const categoryCommentTextarea = (page: Page, category: string) =>
  page
    .getByText(category, { exact: true })
    .last()
    .locator("xpath=..")
    .getByPlaceholder("원하는 수정방향성을 적어주세요.");
