import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { useWriteFormStore } from "@/features/instructor/write/model/writeFormStore";
import CategorySection from "@/widgets/instructor/write/ui/CategorySection";

describe("CategorySection", () => {
  beforeEach(() => {
    useWriteFormStore.setState({ selectedCategory: null });
  });

  afterEach(() => {
    useWriteFormStore.setState({ selectedCategory: null });
  });

  it("기본적으로 첫 번째 카테고리(유인물)가 열려있다", () => {
    render(<CategorySection />);

    expect(screen.getByRole("radio", { name: "교재 외지/내지" })).toBeInTheDocument();
    expect(screen.queryByRole("radio", { name: "포스터" })).not.toBeInTheDocument();
  });

  it("선택 가능한 항목을 클릭하면 스토어에 반영되고 상단에 라벨이 표시된다", async () => {
    const user = userEvent.setup();
    render(<CategorySection />);

    await user.click(screen.getByRole("radio", { name: "교재 외지/내지" }));

    expect(useWriteFormStore.getState().selectedCategory).toEqual({
      categoryIndex: 0,
      item: "교재 외지/내지",
    });
    expect(screen.getByText("유인물 > 교재 외지/내지")).toBeInTheDocument();
  });

  it("비활성 항목(대봉투)은 disabled 상태라 선택되지 않는다", () => {
    render(<CategorySection />);

    expect(screen.getByRole("radio", { name: "대봉투" })).toBeDisabled();
  });

  it("다른 카테고리를 열면 기존에 선택했던 항목이 초기화된다", async () => {
    const user = userEvent.setup();
    render(<CategorySection />);

    await user.click(screen.getByRole("radio", { name: "교재 외지/내지" }));
    expect(useWriteFormStore.getState().selectedCategory).not.toBeNull();

    await user.click(screen.getByText("홍보물"));

    expect(useWriteFormStore.getState().selectedCategory).toBeNull();
    expect(screen.getByRole("radio", { name: "포스터" })).toBeInTheDocument();
    expect(screen.queryByText(/유인물 >/)).not.toBeInTheDocument();
  });

  it("이미 열린 카테고리를 다시 클릭하면 선택은 유지된 채 아코디언만 닫힌다", async () => {
    const user = userEvent.setup();
    render(<CategorySection />);

    await user.click(screen.getByRole("radio", { name: "교재 외지/내지" }));
    await user.click(screen.getByText("유인물"));

    expect(useWriteFormStore.getState().selectedCategory).toEqual({
      categoryIndex: 0,
      item: "교재 외지/내지",
    });
    expect(screen.queryByRole("radio", { name: "교재 외지/내지" })).not.toBeInTheDocument();
  });

  it("선택된 항목이 속한 카테고리를 다시 열어도 선택이 유지된다", async () => {
    const user = userEvent.setup();
    render(<CategorySection />);

    await user.click(screen.getByRole("radio", { name: "교재 외지/내지" }));
    await user.click(screen.getByText("유인물"));
    await user.click(screen.getByText("유인물"));

    expect(useWriteFormStore.getState().selectedCategory).toEqual({
      categoryIndex: 0,
      item: "교재 외지/내지",
    });
    expect(screen.getByRole("radio", { name: "교재 외지/내지" })).toBeChecked();
  });
});
