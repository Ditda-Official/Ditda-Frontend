import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import WheelColumn from "@/shared/ui/dropdown/WheelColumn";

const items = ["1월", "2월", "3월"];

describe("WheelColumn", () => {
  it("모든 item을 렌더링한다", () => {
    render(<WheelColumn items={items} selectedIndex={1} onSelect={vi.fn()} />);

    items.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("selectedIndex에 해당하는 item만 강조 스타일을 갖는다", () => {
    render(<WheelColumn items={items} selectedIndex={1} onSelect={vi.fn()} />);

    expect(screen.getByText("2월")).toHaveClass("text-gray-90");
    expect(screen.getByText("1월")).toHaveClass("text-gray-50");
    expect(screen.getByText("3월")).toHaveClass("text-gray-50");
  });

  it("선택되지 않은 item을 클릭하면 onSelect와 onItemClick이 해당 index와 함께 호출된다", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    const handleItemClick = vi.fn();
    render(
      <WheelColumn
        items={items}
        selectedIndex={1}
        onSelect={handleSelect}
        onItemClick={handleItemClick}
      />,
    );

    await user.click(screen.getByText("3월"));

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(2);
    expect(handleItemClick).toHaveBeenCalledWith(2);
  });

  it("이미 선택된 item을 클릭하면 onSelect는 호출되지 않지만 onItemClick은 호출된다", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    const handleItemClick = vi.fn();
    render(
      <WheelColumn
        items={items}
        selectedIndex={1}
        onSelect={handleSelect}
        onItemClick={handleItemClick}
      />,
    );

    await user.click(screen.getByText("2월"));

    expect(handleSelect).not.toHaveBeenCalled();
    expect(handleItemClick).toHaveBeenCalledWith(1);
  });
});
