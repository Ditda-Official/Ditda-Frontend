import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import ColorPicker from "@/features/instructor/write/ui/ColorPicker";

describe("ColorPicker", () => {
  it("value가 없으면 기본값(#000000, a=100)으로 렌더링된다", () => {
    render(<ColorPicker />);

    expect(screen.getByRole("textbox")).toHaveValue("000000");
    const [r, g, b, a] = screen.getAllByRole("spinbutton");
    expect(r).toHaveValue(0);
    expect(g).toHaveValue(0);
    expect(b).toHaveValue(0);
    expect(a).toHaveValue(100);
  });

  it("value prop을 전달하면 해당 색상으로 렌더링된다", () => {
    render(<ColorPicker value={{ r: 255, g: 128, b: 0, a: 50 }} />);

    expect(screen.getByRole("textbox")).toHaveValue("FF8000");
    const [r, g, b, a] = screen.getAllByRole("spinbutton");
    expect(r).toHaveValue(255);
    expect(g).toHaveValue(128);
    expect(b).toHaveValue(0);
    expect(a).toHaveValue(50);
  });

  it("유효한 6자리 hex를 입력하고 포커스를 벗어나면 onChange가 파싱된 RGB와 함께 호출된다", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<ColorPicker value={{ r: 0, g: 0, b: 0, a: 70 }} onChange={handleChange} />);

    const hexInput = screen.getByRole("textbox");
    await user.clear(hexInput);
    await user.type(hexInput, "FF0000");
    await user.tab();

    expect(handleChange).toHaveBeenCalledWith({ r: 255, g: 0, b: 0, a: 70 });
  });

  it("6자리가 아닌 hex는 onChange를 호출하지 않는다", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<ColorPicker onChange={handleChange} />);

    const hexInput = screen.getByRole("textbox");
    await user.clear(hexInput);
    await user.type(hexInput, "12");
    await user.tab();

    expect(handleChange).not.toHaveBeenCalled();
  });

  it("R/G/B/A 입력값이 범위를 벗어나면 clamp되어 onChange가 호출된다", () => {
    const handleChange = vi.fn();
    render(<ColorPicker value={{ r: 0, g: 0, b: 0, a: 0 }} onChange={handleChange} />);

    const [rInput, , , aInput] = screen.getAllByRole("spinbutton");

    fireEvent.change(rInput, { target: { value: "300" } });
    expect(handleChange).toHaveBeenLastCalledWith({ r: 255, g: 0, b: 0, a: 0 });

    fireEvent.change(aInput, { target: { value: "150" } });
    expect(handleChange).toHaveBeenLastCalledWith({ r: 0, g: 0, b: 0, a: 100 });
  });

  it("숫자가 아닌 값을 입력하면 onChange가 호출되지 않는다", () => {
    const handleChange = vi.fn();
    render(<ColorPicker value={{ r: 10, g: 10, b: 10, a: 10 }} onChange={handleChange} />);

    const [rInput] = screen.getAllByRole("spinbutton");
    fireEvent.change(rInput, { target: { value: "" } });

    expect(handleChange).not.toHaveBeenCalled();
  });
});
