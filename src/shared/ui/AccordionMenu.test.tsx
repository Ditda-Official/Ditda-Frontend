import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import AccordionMenu from "@/shared/ui/AccordionMenu";

describe("AccordionMenu", () => {
  it("label을 렌더링한다", () => {
    render(<AccordionMenu label="카테고리" />);

    expect(screen.getByText("카테고리")).toBeInTheDocument();
  });

  it("selected가 true면 라벨이 강조 색상 클래스를 갖는다", () => {
    render(<AccordionMenu label="카테고리" selected />);

    expect(screen.getByText("카테고리")).toHaveClass("text-main-main");
  });

  it("selected가 false(기본값)면 강조 색상 클래스를 갖지 않는다", () => {
    render(<AccordionMenu label="카테고리" />);

    expect(screen.getByText("카테고리")).not.toHaveClass("text-main-main");
    expect(screen.getByText("카테고리")).toHaveClass("text-gray-90");
  });

  it("클릭하면 onClick이 호출된다", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<AccordionMenu label="카테고리" onClick={handleClick} />);

    await user.click(screen.getByText("카테고리"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
