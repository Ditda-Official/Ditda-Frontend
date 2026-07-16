import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { useWriteFormStore } from "@/features/instructor/write/model/writeFormStore";
import ColorChooseSection from "@/widgets/instructor/write/ui/ColorChooseSection";

const getCard = (colorLabel: string) =>
  screen.getByText(colorLabel).closest(".rounded-12") as HTMLElement;

describe("ColorChooseSection", () => {
  beforeEach(() => {
    useWriteFormStore.setState({
      colorMode: "designer",
      colors: [null, null, null],
      mainColorIndex: 0,
    });
  });

  afterEach(() => {
    useWriteFormStore.setState({
      colorMode: "designer",
      colors: [null, null, null],
      mainColorIndex: 0,
    });
  });

  it("기본값(designer)에서는 안내 문구만 보여주고 색상 카드는 렌더링하지 않는다", () => {
    render(<ColorChooseSection />);

    expect(
      screen.getByText("디자이너가 외주 시작 후, 자유롭게 색상을 선택하여 디자인하게 됩니다."),
    ).toBeInTheDocument();
    expect(screen.queryByText("Color 1")).not.toBeInTheDocument();
  });

  it("직접 색상 지정으로 전환하면 스토어의 colorMode가 바뀌고 색상 카드 3개가 렌더링된다", async () => {
    const user = userEvent.setup();
    render(<ColorChooseSection />);

    await user.click(screen.getByRole("button", { name: "직접 색상 지정" }));

    expect(useWriteFormStore.getState().colorMode).toBe("custom");
    expect(screen.getByText("Color 1")).toBeInTheDocument();
    expect(screen.getByText("Color 2")).toBeInTheDocument();
    expect(screen.getByText("Color 3")).toBeInTheDocument();
  });

  it("카드를 클릭하면 해당 카드만 선택 테두리를 갖는다", async () => {
    const user = userEvent.setup();
    useWriteFormStore.setState({ colorMode: "custom" });
    render(<ColorChooseSection />);

    expect(getCard("Color 1")).toHaveClass("border-main-main");
    expect(getCard("Color 2")).toHaveClass("border-gray-30");

    await user.click(getCard("Color 2"));

    expect(getCard("Color 1")).toHaveClass("border-gray-30");
    expect(getCard("Color 2")).toHaveClass("border-main-main");
  });

  it("색이 다 채워지지 않은 상태에서 바깥을 클릭하면 포커스만 풀리고 선택된 카드는 유지된다", async () => {
    const user = userEvent.setup();
    useWriteFormStore.setState({ colorMode: "custom" });
    render(
      <div>
        <ColorChooseSection />
        <button>바깥 영역</button>
      </div>,
    );

    await user.click(getCard("Color 2"));
    expect(getCard("Color 2")).toHaveClass("border-main-main");

    await user.click(screen.getByRole("button", { name: "바깥 영역" }));

    expect(getCard("Color 2")).toHaveClass("border-main-main");
  });

  it("3개 색이 모두 채워진 상태에서 바깥을 클릭하면 선택된 카드가 해제된다", async () => {
    const user = userEvent.setup();
    const filled = { r: 10, g: 20, b: 30, a: 100 };
    useWriteFormStore.setState({ colorMode: "custom", colors: [filled, filled, filled] });
    render(
      <div>
        <ColorChooseSection />
        <button>바깥 영역</button>
      </div>,
    );

    await user.click(getCard("Color 2"));
    expect(getCard("Color 2")).toHaveClass("border-main-main");

    await user.click(screen.getByRole("button", { name: "바깥 영역" }));

    expect(getCard("Color 1")).toHaveClass("border-gray-30");
    expect(getCard("Color 2")).toHaveClass("border-gray-30");
    expect(getCard("Color 3")).toHaveClass("border-gray-30");
  });

  it("카드의 R 채널 값을 변경하면 스토어의 해당 인덱스 색상이 갱신된다", () => {
    useWriteFormStore.setState({ colorMode: "custom" });
    render(<ColorChooseSection />);

    const card2 = getCard("Color 2");
    const rInput = card2.querySelector('input[type="number"]') as HTMLInputElement;
    fireEvent.change(rInput, { target: { value: "200" } });

    const colors = useWriteFormStore.getState().colors;
    expect(colors[0]).toBeNull();
    expect(colors[1]).toEqual({ r: 200, g: 0, b: 0, a: 100 });
    expect(colors[2]).toBeNull();
  });
});
