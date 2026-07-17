import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/shared/api/client", async () => {
  const actual = await vi.importActual<typeof import("@/shared/api/client")>("@/shared/api/client");
  return {
    ...actual,
    api: { get: vi.fn(), post: vi.fn() },
  };
});

import { postCommission, postNotifyDeposit } from "@/features/instructor/write/api/write";
import type { WriteOrderRequest } from "@/features/instructor/write/model/write";
import { api } from "@/shared/api/client";

const mockedApi = api as unknown as {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
};

const jsonResponse = <T>(value: T) => ({ json: () => Promise.resolve(value) });

beforeEach(() => {
  mockedApi.get.mockReset();
  mockedApi.post.mockReset();
});

describe("getPlans", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("최초 호출 시에만 실제 요청하고, 응답이 오기 전 중복 호출은 동일 Promise를 재사용한다", async () => {
    const { api: freshApi } = await import("@/shared/api/client");
    const get = vi.mocked(freshApi.get);

    let resolveJson!: (value: unknown) => void;
    get.mockReturnValue({
      json: () => new Promise(resolve => (resolveJson = resolve)),
    } as never);

    const { getPlans } = await import("@/features/instructor/write/api/write");

    const first = getPlans();
    const second = getPlans();
    expect(get).toHaveBeenCalledTimes(1);

    resolveJson({
      success: true,
      result: { plans: [{ code: "BASIC", designerCount: 3, price: 400000, description: "" }] },
    });

    const [firstResult, secondResult] = await Promise.all([first, second]);
    expect(firstResult).toBe(secondResult);
    expect(firstResult).toEqual([
      { code: "BASIC", designerCount: 3, price: 400000, description: "" },
    ]);
  });

  it("요청이 실패하면 캐시가 초기화되어 다음 호출에서 재요청한다", async () => {
    const { api: freshApi } = await import("@/shared/api/client");
    const get = vi.mocked(freshApi.get);

    get.mockReturnValueOnce({
      json: () => Promise.reject(new Error("network error")),
    } as never);

    const { getPlans } = await import("@/features/instructor/write/api/write");

    await expect(getPlans()).rejects.toThrow("network error");
    expect(get).toHaveBeenCalledTimes(1);

    get.mockReturnValueOnce(
      jsonResponse({
        success: true,
        result: { plans: [{ code: "PLUS", designerCount: 4, price: 450000, description: "" }] },
      }) as never,
    );

    const result = await getPlans();
    expect(result).toEqual([{ code: "PLUS", designerCount: 4, price: 450000, description: "" }]);
    expect(get).toHaveBeenCalledTimes(2);
  });
});

describe("postCommission", () => {
  it("response.success가 false면 ApiError를 throw한다", async () => {
    mockedApi.post.mockReturnValue(
      jsonResponse({ success: false, code: "INVALID_REQUEST", message: "잘못된 요청입니다" }),
    );

    await expect(postCommission({} as unknown as WriteOrderRequest)).rejects.toMatchObject({
      name: "ApiError",
      message: "잘못된 요청입니다",
      code: "INVALID_REQUEST",
    });
  });
});

describe("postNotifyDeposit", () => {
  it("response.success가 false면 ApiError를 throw한다", async () => {
    mockedApi.post.mockReturnValue(
      jsonResponse({ success: false, code: "NOT_FOUND", message: "외주를 찾을 수 없습니다" }),
    );

    await expect(postNotifyDeposit(1)).rejects.toMatchObject({
      name: "ApiError",
      message: "외주를 찾을 수 없습니다",
      code: "NOT_FOUND",
    });
  });
});
