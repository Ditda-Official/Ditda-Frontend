import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Toggle from "@/shared/ui/Toggle";

const options = [
  { value: "left", label: "왼쪽" },
  { value: "right", label: "오른쪽" },
] as const;

describe("Toggle", () => {
  it("value에 해당하는 옵션이 활성 상태로 렌더링된다", () => {
    render(<Toggle options={[...options]} value="left" onChange={vi.fn()} />);

    expect(screen.getByRole("button", { name: "왼쪽" })).toHaveClass("ring-main-main");
    expect(screen.getByRole("button", { name: "오른쪽" })).not.toHaveClass("ring-main-main");
  });

  it("비활성 옵션을 클릭하면 onChange가 해당 value와 함께 호출된다", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Toggle options={[...options]} value="left" onChange={handleChange} />);

    await user.click(screen.getByRole("button", { name: "오른쪽" }));

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("right");
  });
});
