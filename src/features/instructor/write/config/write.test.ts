import { describe, expect, it } from "vitest";

import {
  KEYWORD_API_MAP,
  KEYWORD_LABEL_MAP,
  SIZE_DIMENSIONS_MAP,
  SIZE_OPTIONS,
} from "@/features/instructor/write/config/write";

describe("KEYWORD_LABEL_MAP", () => {
  it("KEYWORD_API_MAP의 모든 항목이 정확히 역매핑된다", () => {
    Object.entries(KEYWORD_API_MAP).forEach(([label, code]) => {
      expect(KEYWORD_LABEL_MAP[code]).toBe(label);
    });
  });

  it("KEYWORD_API_MAP과 항목 개수가 같다 (코드 중복으로 인한 유실이 없다)", () => {
    expect(Object.keys(KEYWORD_LABEL_MAP)).toHaveLength(Object.keys(KEYWORD_API_MAP).length);
  });
});

describe("SIZE_DIMENSIONS_MAP", () => {
  it("SIZE_OPTIONS의 size/dimensions와 1:1로 일치한다", () => {
    SIZE_OPTIONS.forEach(({ size, dimensions }) => {
      expect(SIZE_DIMENSIONS_MAP[size]).toBe(dimensions);
    });
  });

  it("SIZE_OPTIONS 개수만큼의 항목을 가진다", () => {
    expect(Object.keys(SIZE_DIMENSIONS_MAP)).toHaveLength(SIZE_OPTIONS.length);
  });
});
