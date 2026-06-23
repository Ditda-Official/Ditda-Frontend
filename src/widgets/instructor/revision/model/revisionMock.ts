// [강사] 작업 중 시안 조회 (수정 요청 페이지)
export type DraftRevisionDetail = {
  commissionId: number;
  title: string;
  currentDraft: {
    draftId: number;
    thumbnailUrl: string;
    designerComment: string;
  };
  remainingRevisionCount: number;
  maxRevisionCount: number;
};

export const draftRevisionDetailData: DraftRevisionDetail[] = [
  {
    commissionId: 6,
    title: "중등 수학 — 방정식과 함수 개념서",
    currentDraft: {
      draftId: 88,
      thumbnailUrl: "",
      designerComment:
        "지난번 요청해 주신 수정사항을 반영해 보았는데, 막상 적용해 보니 전체적인 톤과 잘 어울리지 않는 것 같아 원래 방향을 살리는 쪽으로 다시 제안드립니다. 검토 후 의견 부탁드립니다.",
    },
    remainingRevisionCount: 1,
    maxRevisionCount: 3,
  },
  {
    commissionId: 44,
    title: "초등 국어 — 받아쓰기 및 독해 기초",
    currentDraft: {
      draftId: 90,
      thumbnailUrl: "",
      designerComment: "",
    },
    remainingRevisionCount: 2,
    maxRevisionCount: 3,
  },
  {
    commissionId: 45,
    title: "한국사 능력검정 — 중급 핵심 요약",
    currentDraft: {
      draftId: 95,
      thumbnailUrl: "",
      designerComment:
        "요청하신 색상 톤을 기준으로 전체적인 배색과 명도 균형을 다시 잡아보았습니다. 기존 시안에서는 색감이 다소 차갑게 느껴질 수 있다는 의견을 반영해, 주조색의 채도를 살짝 낮추고 보조색과의 대비를 조정하여 전체적으로 한층 따뜻하고 차분한 분위기가 느껴지도록 손봤습니다. 또한 텍스트와 배경 간의 명도 차이를 다시 점검하여 가독성도 함께 보완했습니다. 혹시 색감의 톤이나 특정 영역의 배색에서 더 조정이 필요하다고 느끼시는 부분이 있다면 편하게 말씀해 주시면 바로 반영하도록 하겠습니다. 확인 부탁드립니다.",
    },
    remainingRevisionCount: 3,
    maxRevisionCount: 3,
  },
  {
    commissionId: 46,
    title: "고등 화학 I — 원소와 화학 반응",
    currentDraft: {
      draftId: 92,
      thumbnailUrl: "",
      designerComment: "",
    },
    remainingRevisionCount: 0,
    maxRevisionCount: 3,
  },
];

// [강사] 수정된 시안 상세 조회
export type DraftFiles = {
  commissionId: number;
  draftId: number;
  fileUrls: string[];
};

export const draftFilesData: DraftFiles[] = [
  {
    commissionId: 6,
    draftId: 88,
    fileUrls: [
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
    ],
  },
  {
    commissionId: 44,
    draftId: 90,
    fileUrls: [
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
    ],
  },
  {
    commissionId: 45,
    draftId: 95,
    fileUrls: [
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
    ],
  },
  {
    commissionId: 46,
    draftId: 92,
    fileUrls: [
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
      "/images/thumbnail_mock.jpg",
    ],
  },
];
