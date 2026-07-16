import { describe, expect, it } from "vitest";

import {
  REVISION_CATEGORIES,
  REVISION_CATEGORY_TO_CODE,
} from "@/widgets/instructor/revision/config/revision";

describe("REVISION_CATEGORY_TO_CODE", () => {
  it("REVISION_CATEGORIES 전체가 빠짐없이 매핑되어 있다", () => {
    REVISION_CATEGORIES.forEach(label => {
      expect(REVISION_CATEGORY_TO_CODE[label]).toBeDefined();
    });
  });

  it("REVISION_CATEGORIES 개수와 매핑 개수가 같다", () => {
    expect(Object.keys(REVISION_CATEGORY_TO_CODE)).toHaveLength(REVISION_CATEGORIES.length);
  });

  it("매핑된 코드 값에 중복이 없다", () => {
    const codes = Object.values(REVISION_CATEGORY_TO_CODE);
    expect(new Set(codes).size).toBe(codes.length);
  });
});
