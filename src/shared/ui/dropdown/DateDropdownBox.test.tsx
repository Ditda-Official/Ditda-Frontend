import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import DateDropdownBox from "@/shared/ui/dropdown/DateDropdownBox";

describe("DateDropdownBox", () => {
  it("selectedValue가 없으면 기본 placeholder를 보여준다", () => {
    render(<DateDropdownBox label="1차 시안" />);

    expect(screen.getByText("0000년 00월 00일")).toBeInTheDocument();
  });

  it("placeholder를 전달하면 해당 값을 보여준다", () => {
    render(<DateDropdownBox label="1차 시안" placeholder="날짜를 선택해주세요" />);

    expect(screen.getByText("날짜를 선택해주세요")).toBeInTheDocument();
  });

  it("selectedValue가 있으면 강조 클래스와 함께 값을 보여준다", () => {
    render(<DateDropdownBox label="1차 시안" selectedValue="2026년 7월 17일" />);

    const value = screen.getByText("2026년 7월 17일");
    expect(value).toBeInTheDocument();
    expect(value).toHaveClass("text-main-main");
  });

  it("isOpen 여부에 따라 화살표 아이콘 회전 클래스가 바뀐다", () => {
    const { container, rerender } = render(<DateDropdownBox label="1차 시안" isOpen={false} />);
    expect(container.querySelector("svg")).toHaveClass("rotate-0");

    rerender(<DateDropdownBox label="1차 시안" isOpen />);
    expect(container.querySelector("svg")).toHaveClass("rotate-180");
  });

  it("클릭하면 onClick이 호출된다", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<DateDropdownBox label="1차 시안" onClick={handleClick} />);

    await user.click(screen.getByText("1차 시안"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
