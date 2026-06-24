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
    commissionId: 4,
    title: "해커스톡 왕초보 영어 - 기초 문법편",
    drafts: [
      { draftId: 41, thumbnailUrl: "/images/thumbnail_mock.jpg" },
      { draftId: 42, thumbnailUrl: "/images/thumbnail_mock.jpg" },
      { draftId: 43, thumbnailUrl: "/images/thumbnail_mock.jpg" },
      { draftId: 44, thumbnailUrl: "/images/thumbnail_mock.jpg" },
    ],
  },
  {
    commissionId: 6,
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

// [강사] 제출된 1차 시안 상세 조회
export type DraftDetail = {
  commissionId: number;
  draftId: number;
  fileUrls: string[];
};

export const draftDetailsData: Record<number, DraftDetail> = {
  41: {
    commissionId: 11,
    draftId: 41,
    fileUrls: [
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
    ],
  },
  42: {
    commissionId: 11,
    draftId: 42,
    fileUrls: [
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
    ],
  },
  43: {
    commissionId: 11,
    draftId: 43,
    fileUrls: [
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
    ],
  },
  44: {
    commissionId: 11,
    draftId: 44,
    fileUrls: [
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
    ],
  },
  51: {
    commissionId: 15,
    draftId: 51,
    fileUrls: [
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
    ],
  },
  52: {
    commissionId: 15,
    draftId: 52,
    fileUrls: [
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
    ],
  },
  53: {
    commissionId: 15,
    draftId: 53,
    fileUrls: [
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
    ],
  },
  54: {
    commissionId: 15,
    draftId: 54,
    fileUrls: [
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
    ],
  },
  55: {
    commissionId: 15,
    draftId: 55,
    fileUrls: [
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
    ],
  },
};
