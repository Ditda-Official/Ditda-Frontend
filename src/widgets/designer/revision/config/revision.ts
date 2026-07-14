import type { RevisionCategoryCode } from "@/features/designer/revision";

export const REVISION_CATEGORY_LABEL: Record<RevisionCategoryCode, string> = {
  LAYOUT: "레이아웃 수정",
  TYPOGRAPHY: "타이포 수정",
  DESIGN: "디자인 수정",
  COLOR: "색상 수정",
  ETC: "기타",
};
