export const REVISION_CATEGORIES = [
  "레이아웃 수정",
  "타이포 수정",
  "디자인 수정",
  "색상 수정",
  "기타",
] as const;

export type RevisionCategoryLabel = (typeof REVISION_CATEGORIES)[number];

export const REVISION_CATEGORY_TO_CODE = {
  "레이아웃 수정": "LAYOUT",
  "타이포 수정": "TYPOGRAPHY",
  "디자인 수정": "DESIGN",
  "색상 수정": "COLOR",
  기타: "ETC",
} as const satisfies Record<RevisionCategoryLabel, string>;

export const MAX_SELECTABLE_COUNT = 2;
