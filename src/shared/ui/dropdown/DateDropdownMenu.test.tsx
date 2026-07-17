import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import DateDropdownMenu from "@/shared/ui/dropdown/DateDropdownMenu";

describe("DateDropdownMenu", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 6, 17));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("minDate가 없으면 활성 상태이며 '선택하기' 클릭 시 오늘 날짜로 onConfirm이 호출된다", async () => {
    const user = userEvent.setup();
    const handleConfirm = vi.fn();
    render(<DateDropdownMenu onConfirm={handleConfirm} />);

    const confirmButton = screen.getByRole("button", { name: "선택하기" });
    expect(confirmButton).not.toBeDisabled();

    await user.click(confirmButton);

    expect(handleConfirm).toHaveBeenCalledTimes(1);
    expect(handleConfirm).toHaveBeenCalledWith(new Date(2026, 6, 17));
  });

  it("minDate 이전 날짜가 선택되어 있으면 비활성화되고 기본 안내 문구를 보여준다", () => {
    render(<DateDropdownMenu onConfirm={vi.fn()} minDate={new Date(2026, 7, 1)} />);

    const confirmButton = screen.getByRole("button", { name: /이후 날짜를 선택해주세요/ });
    expect(confirmButton).toBeDisabled();
  });

  it("invalidMessage를 전달하면 비활성 상태에서 해당 메시지를 보여준다", () => {
    render(
      <DateDropdownMenu
        onConfirm={vi.fn()}
        minDate={new Date(2026, 7, 1)}
        invalidMessage="다른 날짜를 선택해주세요"
      />,
    );

    expect(screen.getByRole("button", { name: "다른 날짜를 선택해주세요" })).toBeDisabled();
  });

  it("비활성 상태에서는 '선택하기' 클릭해도 onConfirm이 호출되지 않는다", async () => {
    const user = userEvent.setup();
    const handleConfirm = vi.fn();
    render(<DateDropdownMenu onConfirm={handleConfirm} minDate={new Date(2026, 7, 1)} />);

    await user.click(screen.getByRole("button", { name: /이후 날짜를 선택해주세요/ }));

    expect(handleConfirm).not.toHaveBeenCalled();
  });

  it("날짜 휠에서 다른 일자를 클릭하면 해당 날짜로 onConfirm이 호출된다", async () => {
    const user = userEvent.setup();
    const handleConfirm = vi.fn();
    render(<DateDropdownMenu onConfirm={handleConfirm} />);

    await user.click(screen.getByText("1일"));

    expect(handleConfirm).toHaveBeenCalledWith(new Date(2026, 6, 1));
  });
});
