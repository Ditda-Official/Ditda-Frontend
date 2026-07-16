import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { CommissionHistoryItem } from "@/features/instructor/my";
import { getCommissions } from "@/widgets/instructor/my/api/my";
import CommissionsHistorySection from "@/widgets/instructor/my/ui/CommissionsHistorySection";

vi.mock("@/widgets/instructor/my/api/my", () => ({
  getCommissions: vi.fn(),
}));

const mockedGetCommissions = vi.mocked(getCommissions);

const makeItem = (commissionId: number): CommissionHistoryItem => ({
  commissionId,
  category: "FLYER_TEXTBOOK_COVER_INNER",
  title: `외주 ${commissionId}`,
  createdAt: "2026-07-01",
  plan: "BASIC",
  paidAmount: null,
  status: "DONE",
});

const getPaginationButtons = (container: HTMLElement) => {
  const [prevButton, nextButton] = container.querySelectorAll(".justify-center.gap-8 > svg");
  return { prevButton, nextButton };
};

describe("CommissionsHistorySection", () => {
  beforeEach(() => {
    mockedGetCommissions.mockReset();
  });

  it("데이터가 없으면 빈 상태 문구를 보여주고 페이지네이션이 없다", async () => {
    mockedGetCommissions.mockResolvedValue({
      items: [],
      page: 0,
      size: 3,
      totalElements: 0,
      totalPages: 0,
    });

    render(<CommissionsHistorySection />);

    expect(await screen.findByText("진행된 외주가 없습니다")).toBeInTheDocument();
    expect(screen.queryByText("외주 1")).not.toBeInTheDocument();
  });

  it("다음 페이지 클릭 시 getCommissions가 다음 page 번호로 호출되고 결과가 반영된다", async () => {
    const user = userEvent.setup();
    mockedGetCommissions.mockImplementation(async page =>
      page === 0
        ? { items: [makeItem(1)], page: 0, size: 3, totalElements: 6, totalPages: 2 }
        : { items: [makeItem(2)], page: 1, size: 3, totalElements: 6, totalPages: 2 },
    );

    const { container } = render(<CommissionsHistorySection />);

    expect(await screen.findByText("외주 1")).toBeInTheDocument();

    const { nextButton } = getPaginationButtons(container);
    await user.click(nextButton);

    expect(await screen.findByText("외주 2")).toBeInTheDocument();
    expect(screen.queryByText("외주 1")).not.toBeInTheDocument();
    expect(mockedGetCommissions).toHaveBeenCalledWith(0);
    expect(mockedGetCommissions).toHaveBeenCalledWith(1);
    expect(mockedGetCommissions).toHaveBeenCalledTimes(2);
  });

  it("이미 조회한 페이지로 돌아가면 캐시를 사용해 getCommissions를 다시 호출하지 않는다", async () => {
    const user = userEvent.setup();
    mockedGetCommissions.mockImplementation(async page =>
      page === 0
        ? { items: [makeItem(1)], page: 0, size: 3, totalElements: 6, totalPages: 2 }
        : { items: [makeItem(2)], page: 1, size: 3, totalElements: 6, totalPages: 2 },
    );

    const { container } = render(<CommissionsHistorySection />);
    await screen.findByText("외주 1");

    const { prevButton, nextButton } = getPaginationButtons(container);
    await user.click(nextButton);
    await screen.findByText("외주 2");

    await user.click(prevButton);
    await screen.findByText("외주 1");

    await waitFor(() => expect(mockedGetCommissions).toHaveBeenCalledTimes(2));
  });

  it("첫 페이지에서는 이전 페이지로 이동해도 page가 0 밑으로 내려가지 않는다", async () => {
    const user = userEvent.setup();
    mockedGetCommissions.mockResolvedValue({
      items: [makeItem(1)],
      page: 0,
      size: 3,
      totalElements: 1,
      totalPages: 1,
    });

    const { container } = render(<CommissionsHistorySection />);
    await screen.findByText("외주 1");

    const { prevButton } = getPaginationButtons(container);
    await user.click(prevButton);

    await waitFor(() => expect(mockedGetCommissions).toHaveBeenCalledTimes(1));
    expect(mockedGetCommissions).toHaveBeenCalledWith(0);
  });
});
