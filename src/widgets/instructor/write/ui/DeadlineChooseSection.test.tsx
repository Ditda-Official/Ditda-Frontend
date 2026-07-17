import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useWriteFormStore } from "@/features/instructor/write/model/writeFormStore";
import DeadlineChooseSection from "@/widgets/instructor/write/ui/DeadlineChooseSection";

describe("DeadlineChooseSection", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 6, 17));
    useWriteFormStore.setState({ firstDate: null, finalDate: null });
  });

  afterEach(() => {
    vi.useRealTimers();
    useWriteFormStore.setState({ firstDate: null, finalDate: null });
  });

  it("초기 렌더 시 두 날짜 모두 placeholder이고 메뉴는 닫혀있다", () => {
    render(<DeadlineChooseSection />);

    expect(screen.getAllByText("0000년 00월 00일")).toHaveLength(2);
    expect(screen.queryByRole("button", { name: "선택하기" })).not.toBeInTheDocument();
  });

  it("1차 시안 박스를 클릭하면 메뉴가 열리고, 다시 클릭하면 닫힌다", async () => {
    const user = userEvent.setup();
    render(<DeadlineChooseSection />);

    await user.click(screen.getByText("1차 시안 수령일"));
    expect(screen.getByRole("button", { name: "선택하기" })).toBeInTheDocument();

    await user.click(screen.getByText("1차 시안 수령일"));
    expect(screen.queryByRole("button", { name: "선택하기" })).not.toBeInTheDocument();
  });

  it("메뉴가 열린 상태에서 바깥을 클릭하면 닫힌다", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <DeadlineChooseSection />
        <button>바깥 영역</button>
      </div>,
    );

    await user.click(screen.getByText("1차 시안 수령일"));
    expect(screen.getByRole("button", { name: "선택하기" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "바깥 영역" }));
    expect(screen.queryByRole("button", { name: "선택하기" })).not.toBeInTheDocument();
  });

  it("1차 시안일을 확정하면 스토어에 반영되고 박스에 표시되며 메뉴가 닫힌다", async () => {
    const user = userEvent.setup();
    render(<DeadlineChooseSection />);

    await user.click(screen.getByText("1차 시안 수령일"));
    await user.click(screen.getByRole("button", { name: "선택하기" }));

    expect(useWriteFormStore.getState().firstDate).toEqual(new Date(2026, 6, 29));
    expect(screen.getByText("2026년 7월 29일")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "선택하기" })).not.toBeInTheDocument();
  });

  it("이미 선택된 최종 시안일이 새 1차 시안일 기준 최소 마감보다 이르면 최종 시안일이 초기화된다", async () => {
    const user = userEvent.setup();
    useWriteFormStore.setState({
      firstDate: new Date(2026, 7, 1),
      finalDate: new Date(2026, 7, 20),
    });
    render(<DeadlineChooseSection />);

    await user.click(screen.getByText("1차 시안 수령일"));
    await user.click(screen.getByText("10일"));

    const state = useWriteFormStore.getState();
    expect(state.firstDate).toEqual(new Date(2026, 7, 10));
    expect(state.finalDate).toBeNull();
    expect(screen.getAllByText("0000년 00월 00일")).toHaveLength(1);
  });

  it("1차 시안일이 없으면 최종 시안 선택에 별도 제약이 없다", async () => {
    const user = userEvent.setup();
    render(<DeadlineChooseSection />);

    await user.click(screen.getByText("최종 시안 수령일"));

    expect(screen.getByRole("button", { name: "선택하기" })).toBeEnabled();
  });

  it("1차 시안일이 있으면 최종 시안 메뉴에 2주 제약이 적용되어 기본 선택값이 비활성화된다", async () => {
    const user = userEvent.setup();
    useWriteFormStore.setState({ firstDate: new Date(2026, 7, 10) });
    render(<DeadlineChooseSection />);

    await user.click(screen.getByText("최종 시안 수령일"));

    expect(screen.getByRole("button", { name: /최소 2주 이후 날짜를/ })).toBeDisabled();
  });
});
