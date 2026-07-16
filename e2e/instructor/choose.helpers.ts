import type { Page } from "@playwright/test";

import { mockApi } from "../utils/mockApi";

export const DRAFTS_PATH = (commissionId: string | number) =>
  `/api/v1/instructors/commissions/${commissionId}/drafts`;

export const SELECT_DRAFT_PATH = (commissionId: string | number, draftId: string | number) =>
  `${DRAFTS_PATH(commissionId)}/${draftId}/select`;

// Modal(확인 모달)은 "p-8"까지 포함해 DraftModal(시안 확대 보기)과 클래스로 구분된다.
export const CONFIRM_MODAL_SELECTOR = ".fixed.inset-0.z-50.p-8";

type MockDraft = {
  draftId: number;
  thumbnailUrl?: string;
  watermarkStatus?: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
};

export const mockDrafts = (
  commissionId: string | number,
  drafts: MockDraft[],
  title = "교재 외지/내지 외주",
) =>
  mockApi(DRAFTS_PATH(commissionId), {
    result: {
      commissionId: Number(commissionId),
      title,
      drafts: drafts.map(d => ({
        thumbnailUrl: "/images/thumbnail_mock.jpg",
        watermarkStatus: "COMPLETED",
        ...d,
      })),
    },
  });

// 시안 카드의 "이 디자인으로 할게요" 버튼은 텍스트가 전부 동일해서, 같은 카드 안의
// "시안 N" 라벨을 기준으로 형제 버튼을 찾아 특정 카드로 스코프를 좁힌다.
export const draftSelectButton = (page: Page, index: number) => {
  const label = page.getByText(`시안 ${index + 1}`, { exact: true });
  return label.locator("xpath=..").getByRole("button", { name: "이 디자인으로 할게요" });
};
