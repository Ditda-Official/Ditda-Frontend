import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import usePagination from "@/shared/lib/hooks/usePagination";

describe("usePagination", () => {
  it("초기 current는 0이고 totalPages·pageItems가 올바르게 계산된다", () => {
    const { result } = renderHook(() => usePagination([1, 2, 3, 4, 5], 2));

    expect(result.current.current).toBe(0);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.pageItems).toEqual([1, 2]);
  });

  it("items가 비어있으면 totalPages는 0이고 pageItems는 빈 배열이다", () => {
    const { result } = renderHook(() => usePagination([], 3));

    expect(result.current.totalPages).toBe(0);
    expect(result.current.pageItems).toEqual([]);
  });

  it("handleNext를 호출하면 다음 페이지로 이동한다", () => {
    const { result } = renderHook(() => usePagination([1, 2, 3, 4, 5], 2));

    act(() => result.current.handleNext());

    expect(result.current.current).toBe(1);
    expect(result.current.pageItems).toEqual([3, 4]);
  });

  it("마지막 페이지에서 handleNext를 호출해도 totalPages - 1을 넘지 않는다", () => {
    const { result } = renderHook(() => usePagination([1, 2, 3, 4, 5], 2));

    act(() => result.current.handleNext());
    act(() => result.current.handleNext());
    act(() => result.current.handleNext());

    expect(result.current.current).toBe(2);
    expect(result.current.pageItems).toEqual([5]);
  });

  it("첫 페이지에서 handlePrev를 호출해도 0 밑으로 내려가지 않는다", () => {
    const { result } = renderHook(() => usePagination([1, 2, 3, 4, 5], 2));

    act(() => result.current.handlePrev());

    expect(result.current.current).toBe(0);
  });

  it("handleNext 후 handlePrev를 호출하면 이전 페이지로 돌아간다", () => {
    const { result } = renderHook(() => usePagination([1, 2, 3, 4, 5], 2));

    act(() => result.current.handleNext());
    act(() => result.current.handlePrev());

    expect(result.current.current).toBe(0);
    expect(result.current.pageItems).toEqual([1, 2]);
  });
});
