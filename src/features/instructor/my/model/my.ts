import { BadgeVariant } from "@/shared/ui/Badge";

// [강사] 마이페이지 외주 내역 조회
export type CommissionHistoryItem = {
  commissionId: number;
  category: string;
  title: string;
  createdAt: string;
  plan: "BASIC" | "PLUS" | "MAX";
  totalAmount: number;
  status: "COMPLETED" | "ONGOING";
};

export const PLAN_DISPLAY_MAP: Record<CommissionHistoryItem["plan"], string> = {
  BASIC: "기본",
  PLUS: "플러스",
  MAX: "맥스",
};

export const CATEGORY_BADGE_MAP: Record<string, BadgeVariant> = {
  FLYER_TEXTBOOK_COVER_INNER: "교재",
};

export const commissionHistoryData: CommissionHistoryItem[] = [
  {
    commissionId: 1,
    category: "FLYER_TEXTBOOK_COVER_INNER",
    title: "YMB 영어교재 표지디자인 외주",
    createdAt: "2025-05-05",
    plan: "BASIC",
    totalAmount: 400000,
    status: "COMPLETED",
  },
  {
    commissionId: 2,
    category: "FLYER_TEXTBOOK_COVER_INNER",
    title: "해커스톡 왕초보 영어 기초 문법편 표지디자인 외주",
    createdAt: "2025-04-18",
    plan: "PLUS",
    totalAmount: 480000,
    status: "COMPLETED",
  },
  {
    commissionId: 3,
    category: "FLYER_TEXTBOOK_COVER_INNER",
    title: "토익 실전 모의고사 Part 5·6 표지디자인 외주",
    createdAt: "2025-03-24",
    plan: "MAX",
    totalAmount: 560000,
    status: "COMPLETED",
  },
  {
    commissionId: 4,
    category: "FLYER_TEXTBOOK_COVER_INNER",
    title: "수능 영어 독해 빈칸추론 완성 표지디자인 외주",
    createdAt: "2025-03-02",
    plan: "BASIC",
    totalAmount: 400000,
    status: "COMPLETED",
  },
  {
    commissionId: 5,
    category: "FLYER_TEXTBOOK_COVER_INNER",
    title: "중학 수학 개념서 1학기 과정 표지디자인 외주",
    createdAt: "2025-02-14",
    plan: "PLUS",
    totalAmount: 480000,
    status: "ONGOING",
  },
  {
    commissionId: 6,
    category: "FLYER_TEXTBOOK_COVER_INNER",
    title: "고등 국어 문학 현대시 집중 표지디자인 외주",
    createdAt: "2025-01-28",
    plan: "MAX",
    totalAmount: 560000,
    status: "ONGOING",
  },
  {
    commissionId: 7,
    category: "FLYER_TEXTBOOK_COVER_INNER",
    title: "중등 과학 탐구 물질과 에너지 표지디자인 외주",
    createdAt: "2024-12-19",
    plan: "BASIC",
    totalAmount: 400000,
    status: "COMPLETED",
  },
  {
    commissionId: 8,
    category: "FLYER_TEXTBOOK_COVER_INNER",
    title: "고등 수학 II 미적분 집중 완성 표지디자인 외주",
    createdAt: "2024-11-30",
    plan: "PLUS",
    totalAmount: 480000,
    status: "COMPLETED",
  },
  {
    commissionId: 9,
    category: "FLYER_TEXTBOOK_COVER_INNER",
    title: "초등 사회 한국사 인물편 표지디자인 외주",
    createdAt: "2024-11-12",
    plan: "BASIC",
    totalAmount: 400000,
    status: "ONGOING",
  },
  {
    commissionId: 10,
    category: "FLYER_TEXTBOOK_COVER_INNER",
    title: "고등 영어 듣기평가 모의고사 표지디자인 외주",
    createdAt: "2024-10-27",
    plan: "MAX",
    totalAmount: 560000,
    status: "COMPLETED",
  },
];
