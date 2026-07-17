import { describe, expect, it } from "vitest";

import { clamp, hexToRgb, toHex } from "@/features/instructor/write/lib/color";

describe("toHex", () => {
  it("RGB 값을 HEX 문자열로 변환한다", () => {
    expect(toHex({ r: 255, g: 0, b: 170, a: 1 })).toBe("#FF00AA");
  });

  it("한 자리 16진수 값은 0으로 패딩한다", () => {
    expect(toHex({ r: 10, g: 11, b: 12, a: 1 })).toBe("#0A0B0C");
  });

  it("결과 문자열은 항상 대문자다", () => {
    expect(toHex({ r: 171, g: 205, b: 239, a: 1 })).toBe("#ABCDEF");
  });
});

describe("hexToRgb", () => {
  it("#이 있어도 없어도 정상 파싱한다", () => {
    expect(hexToRgb("#FF00AA")).toEqual({ r: 255, g: 0, b: 170 });
    expect(hexToRgb("FF00AA")).toEqual({ r: 255, g: 0, b: 170 });
  });

  it("대문자/소문자 hex 모두 파싱한다", () => {
    expect(hexToRgb("#ff00aa")).toEqual({ r: 255, g: 0, b: 170 });
    expect(hexToRgb("#FF00AA")).toEqual({ r: 255, g: 0, b: 170 });
  });

  it("길이가 잘못된 경우 null을 반환한다", () => {
    expect(hexToRgb("#FF00A")).toBeNull();
    expect(hexToRgb("#FF00AAAA")).toBeNull();
  });

  it("hex가 아닌 문자가 포함되면 null을 반환한다", () => {
    expect(hexToRgb("#GGHHII")).toBeNull();
  });
});

describe("clamp", () => {
  it("범위 안의 값은 그대로 반환한다", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it("최소값 미만이면 최소값으로 clamp한다", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it("최대값 초과면 최대값으로 clamp한다", () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it("경계값(min, max) 자체는 그대로 반환한다", () => {
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
  });
});
