import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getDDay } from "@/features/instructor/home/lib/getDDay";

const pad = (n: number) => String(n).padStart(2, "0");

// new Date()가 UTC로 파싱하지 않도록 오프셋 없는 로컬 ISO 문자열로 변환
const toLocalIso = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const TODAY = new Date(2026, 6, 17, 9, 30, 0);

describe("getDDay", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(TODAY);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("마감일이 미래면 D-n 형식을 반환한다", () => {
    const deadline = addDays(TODAY, 5);
    expect(getDDay(toLocalIso(deadline))).toBe("D-5");
  });

  it("마감일이 과거면 D+n 형식을 반환한다", () => {
    const deadline = addDays(TODAY, -3);
    expect(getDDay(toLocalIso(deadline))).toBe("D+3");
  });

  it("마감일이 오늘이면 D-0을 반환한다", () => {
    expect(getDDay(toLocalIso(TODAY))).toBe("D-0");
  });

  it("deadline에 시:분:초가 포함돼도 날짜 단위로만 계산한다", () => {
    const deadlineWithTime = addDays(new Date(2026, 6, 17, 23, 59, 59), 2);
    expect(getDDay(toLocalIso(deadlineWithTime))).toBe("D-2");
  });
});
