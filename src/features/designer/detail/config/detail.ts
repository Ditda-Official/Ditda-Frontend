import type { PageType } from "@/shared/api/commissionTypes";

export const CATEGORIES = [
  { label: "유인물", items: ["교재 외지/내지", "대봉투"] },
  { label: "홍보물", items: ["포스터", "배너", "옥외 광고물", "SNS 카드뉴스"] },
  { label: "퍼스널 브랜딩", items: ["포토카드", "스티커", "키링", "명함", "로고"] },
];

export const SIZE_OPTIONS = [
  {
    id: "a4",
    size: "A4",
    dimensions: "(210×297mm)",
    description: "자체 교재, 얇은 제본 교재",
    recommended: true,
  },
  {
    id: "KUKBAE",
    size: "KUKBAE",
    dimensions: "(188×257mm)",
    description: "시중 참고서/문제집",
  },
  {
    id: "b5",
    size: "B5",
    dimensions: "(182×257mm)",
    description: "일반 수업 교재, 개념서, 문제집",
  },
  {
    id: "a5",
    size: "A5",
    dimensions: "(148×210mm)",
    description: "작은 암기장, 요약집",
  },
];

export const CONCEPT_CATEGORIES = [
  { title: "질감", keywords: ["입체감 있는", "평면적인", "거친", "매끈한"] },
  { title: "레이아웃", keywords: ["정돈된", "역동적인", "여백이 많은", "꽉 찬"] },
  { title: "형태", keywords: ["둥근", "각진", "자유로운", "기하학적인"] },
  { title: "색감", keywords: ["화려한", "차분한", "밝은", "어두운"] },
  { title: "무드", keywords: ["귀여운", "시크한", "감성적인", "전문적인"] },
];

export const PAGE_OPTIONS = [
  "강사 프로필",
  "저자의 말",
  "목차",
  "단원 시작 간지",
  "개념 설명",
  "대표 유형",
  "문제 풀이",
  "노트",
  "표지",
] as const;

export const CATEGORY_API_MAP: Record<string, string> = {
  "교재 외지/내지": "FLYER_TEXTBOOK_COVER_INNER",
};

export const SIZE_API_MAP: Record<string, string> = {
  a4: "A4",
  KUKBAE: "KUKBAE",
  b5: "B5",
  a5: "A5",
};

export const SIZE_DISPLAY_MAP: Record<string, string> = {
  a4: "A4",
  KUKBAE: "KUKBAE",
  b5: "B5",
  a5: "A5",
};

export const SIZE_DIMENSIONS_MAP: Record<string, string> = Object.fromEntries(
  SIZE_OPTIONS.map(({ size, dimensions }) => [size, dimensions]),
);

export const KEYWORD_API_MAP: Record<string, string> = {
  "입체감 있는": "DIMENSIONAL",
  평면적인: "LIGHT",
  거친: "ROUGH",
  매끈한: "SMOOTH",
  정돈된: "ORDERLY",
  역동적인: "DYNAMIC",
  "여백이 많은": "SPACIOUS",
  "꽉 찬": "DENSE",
  둥근: "ROUND",
  각진: "ANGULAR",
  자유로운: "FREEFORM",
  기하학적인: "GEOMETRIC",
  화려한: "VIVID",
  차분한: "MUTED",
  밝은: "BRIGHT",
  어두운: "DARK",
  귀여운: "CUTE",
  시크한: "CHIC",
  감성적인: "EMOTIONAL",
  전문적인: "PROFESSIONAL",
};

export const PAGE_API_MAP: Record<string, PageType> = {
  "강사 프로필": "INSTRUCTOR_PROFILE",
  "저자의 말": "AUTHORS_NOTE",
  목차: "TABLE_OF_CONTENTS",
  "단원 시작 간지": "UNIT_INTRO",
  "개념 설명": "CONCEPT",
  "대표 유형": "EXAMPLE",
  "문제 풀이": "PROBLEM",
  노트: "NOTE",
  표지: "COVER",
};

export const PAGE_TYPE_LABEL_MAP: Record<PageType, string> = {
  INSTRUCTOR_PROFILE: "강사 프로필",
  AUTHORS_NOTE: "저자의 말",
  TABLE_OF_CONTENTS: "목차",
  UNIT_INTRO: "단원 시작 간지",
  CONCEPT: "개념 설명",
  EXAMPLE: "대표 유형",
  PROBLEM: "문제 풀이",
  NOTE: "노트",
  COVER: "표지",
};
