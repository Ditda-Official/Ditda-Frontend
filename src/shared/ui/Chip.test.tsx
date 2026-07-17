import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Chip from "@/shared/ui/Chip";

describe("Chip", () => {
  describe("selectable (기본값)", () => {
    it("onClick이 없으면 role이 button이 아니다", () => {
      render(<Chip label="키워드" />);

      expect(screen.queryByRole("button")).not.toBeInTheDocument();
      expect(screen.getByText("키워드")).toBeInTheDocument();
    });

    it("onClick이 있으면 role=button이고 클릭 시 호출된다", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Chip label="키워드" onClick={handleClick} />);

      const chip = screen.getByRole("button", { name: "키워드" });
      await user.click(chip);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("isSelected가 true면 선택 스타일 클래스를 갖는다", () => {
      render(<Chip label="키워드" isSelected onClick={vi.fn()} />);

      expect(screen.getByRole("button")).toHaveClass("border-main-main");
    });
  });

  describe("removable", () => {
    it("기본 aria-label은 '{label} 삭제'다", () => {
      render(<Chip label="파일.png" variant="removable" onRemove={vi.fn()} />);

      expect(screen.getByRole("button", { name: "파일.png 삭제" })).toBeInTheDocument();
    });

    it("removeAriaLabel을 전달하면 해당 값을 사용한다", () => {
      render(
        <Chip
          label="파일.png"
          variant="removable"
          onRemove={vi.fn()}
          removeAriaLabel="첨부 제거"
        />,
      );

      expect(screen.getByRole("button", { name: "첨부 제거" })).toBeInTheDocument();
    });

    it("클릭하면 onRemove가 호출된다", async () => {
      const user = userEvent.setup();
      const handleRemove = vi.fn();
      render(<Chip label="파일.png" variant="removable" onRemove={handleRemove} />);

      await user.click(screen.getByRole("button"));

      expect(handleRemove).toHaveBeenCalledTimes(1);
    });
  });

  describe("long", () => {
    it("disabled가 true면 aria-disabled이고 클릭해도 onClick이 호출되지 않는다", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Chip label="옵션" variant="long" disabled onClick={handleClick} />);

      const chip = screen.getByText("옵션").closest("div") as HTMLElement;
      expect(chip).toHaveAttribute("aria-disabled", "true");

      await user.click(chip);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it("disabled가 아니면 클릭 시 onClick이 호출된다", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Chip label="옵션" variant="long" onClick={handleClick} />);

      await user.click(screen.getByRole("button", { name: "옵션" }));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
