// [강사] 제출된 1차 시안 목록 조회
export type Draft = {
  draftId: number;
  thumbnailUrl: string;
};

export type CommissionWithDrafts = {
  commissionId: number;
  title: string;
  drafts: Draft[];
};

export const commissionDraftsData: CommissionWithDrafts[] = [
  {
    commissionId: 11,
    title: "해커스톡 왕초보 영어 - 기초 문법편",
    drafts: [
      { draftId: 41, thumbnailUrl: "/images/thumbnail_mock.jpg" },
      { draftId: 42, thumbnailUrl: "/images/thumbnail_mock.jpg" },
      { draftId: 43, thumbnailUrl: "/images/thumbnail_mock.jpg" },
      { draftId: 44, thumbnailUrl: "/images/thumbnail_mock.jpg" },
    ],
  },
  {
    commissionId: 15,
    title: "고등 국어 문학 - 현대시 집중",
    drafts: [
      { draftId: 51, thumbnailUrl: "/images/thumbnail_mock.jpg" },
      { draftId: 52, thumbnailUrl: "/images/thumbnail_mock.jpg" },
      { draftId: 53, thumbnailUrl: "/images/thumbnail_mock.jpg" },
      { draftId: 54, thumbnailUrl: "/images/thumbnail_mock.jpg" },
      { draftId: 55, thumbnailUrl: "/images/thumbnail_mock.jpg" },
    ],
  },
];
