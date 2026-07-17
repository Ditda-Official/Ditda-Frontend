import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  formatDate,
  getFirstAvailableDate,
  getMinFinalDate,
  getMinFirstDate,
  toApiDate,
} from "@/features/instructor/write/lib/date";

const TODAY = new Date(2026, 6, 17, 15, 45, 30);

describe("formatDate", () => {
  it("YYYY년 M월 D일 형식으로 변환한다", () => {
    expect(formatDate(new Date(2026, 6, 17))).toBe("2026년 7월 17일");
  });

  it("월/일이 한 자리여도 0으로 패딩하지 않는다", () => {
    expect(formatDate(new Date(2026, 0, 1))).toBe("2026년 1월 1일");
  });
});

describe("getFirstAvailableDate / getMinFirstDate", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(TODAY);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("getFirstAvailableDate는 오늘 기준 +12일을 반환한다", () => {
    const result = getFirstAvailableDate();
    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(6);
    expect(result.getDate()).toBe(29);
  });

  it("getFirstAvailableDate는 시각을 00:00:00.000으로 초기화한다", () => {
    const result = getFirstAvailableDate();
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });

  it("getMinFirstDate는 오늘 기준 +11일을 반환한다", () => {
    const result = getMinFirstDate();
    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(6);
    expect(result.getDate()).toBe(28);
  });

  it("getMinFirstDate도 시각을 00:00:00.000으로 초기화한다", () => {
    const result = getMinFirstDate();
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
  });
});

describe("getMinFinalDate", () => {
  it("주어진 날짜 기준 +14일을 반환한다", () => {
    const base = new Date(2026, 6, 17);
    const result = getMinFinalDate(base);
    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(6);
    expect(result.getDate()).toBe(31);
  });

  it("월을 넘어가는 날짜도 올바르게 계산한다", () => {
    const base = new Date(2026, 6, 25);
    const result = getMinFinalDate(base);
    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(7);
    expect(result.getDate()).toBe(8);
  });

  it("원본 날짜의 시:분:초는 변경하지 않는다 (getFirstAvailableDate와 달리 초기화하지 않음)", () => {
    const base = new Date(2026, 6, 17, 10, 20, 30);
    const result = getMinFinalDate(base);
    expect(result.getHours()).toBe(10);
    expect(result.getMinutes()).toBe(20);
    expect(result.getSeconds()).toBe(30);
  });

  it("인자로 받은 원본 Date 객체는 변경하지 않는다", () => {
    const base = new Date(2026, 6, 17);
    getMinFinalDate(base);
    expect(base.getDate()).toBe(17);
  });
});

describe("toApiDate", () => {
  it("YYYY-MM-DD 형식으로 변환한다", () => {
    expect(toApiDate(new Date(2026, 6, 17))).toBe("2026-07-17");
  });

  it("월/일이 한 자리면 0으로 패딩한다", () => {
    expect(toApiDate(new Date(2026, 0, 1))).toBe("2026-01-01");
  });

  it("월이 두 자리(10월 이상)여도 올바르게 표기한다", () => {
    expect(toApiDate(new Date(2026, 10, 5))).toBe("2026-11-05");
  });
});
