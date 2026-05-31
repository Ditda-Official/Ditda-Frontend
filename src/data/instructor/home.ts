export type DraftSubmissionItem = {
  commissionId: number;
  title: string;
  category: string;
  draftSubmission: {
    submitted: number;
    total: number;
  };
  firstDraftDeadline: string;
};

export const CATEGORY_DISPLAY_MAP: Record<string, string> = {
  FLYER_TEXTBOOK_COVER_INNER: "교재 외지/내지",
};

// [강사] [대시보드 조회] 시안 제출 예정 외주 조회
export const draftSubmissionStatusData: DraftSubmissionItem[] = [
  {
    commissionId: 11,
    title: "해커스톡 왕초보 영어 - 기초 문법편",
    category: "FLYER_TEXTBOOK_COVER_INNER",
    draftSubmission: { submitted: 1, total: 4 },
    firstDraftDeadline: "2026-06-10",
  },
  {
    commissionId: 12,
    title: "토익 실전 모의고사 - Part 5/6",
    category: "FLYER_TEXTBOOK_COVER_INNER",
    draftSubmission: { submitted: 3, total: 5 },
    firstDraftDeadline: "2026-06-18",
  },
  {
    commissionId: 13,
    title: "수능 영어 독해 - 빈칸추론 완성",
    category: "FLYER_TEXTBOOK_COVER_INNER",
    draftSubmission: { submitted: 0, total: 3 },
    firstDraftDeadline: "2026-06-22",
  },
  {
    commissionId: 14,
    title: "중학 수학 개념서 - 1학기 과정",
    category: "FLYER_TEXTBOOK_COVER_INNER",
    draftSubmission: { submitted: 2, total: 4 },
    firstDraftDeadline: "2026-07-01",
  },
  {
    commissionId: 15,
    title: "고등 국어 문학 - 현대시 집중",
    category: "FLYER_TEXTBOOK_COVER_INNER",
    draftSubmission: { submitted: 4, total: 5 },
    firstDraftDeadline: "2026-06-28",
  },
  {
    commissionId: 16,
    title: "한국사 능력검정 - 심화 대비",
    category: "FLYER_TEXTBOOK_COVER_INNER",
    draftSubmission: { submitted: 1, total: 3 },
    firstDraftDeadline: "2026-07-05",
  },
];
