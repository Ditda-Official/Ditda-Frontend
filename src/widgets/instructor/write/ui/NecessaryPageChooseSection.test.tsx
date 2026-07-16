import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { useWriteFormStore } from "@/features/instructor/write/model/writeFormStore";
import NecessaryPageChooseSection from "@/widgets/instructor/write/ui/NecessaryPageChooseSection";

describe("NecessaryPageChooseSection", () => {
  beforeEach(() => {
    useWriteFormStore.setState({ selectedPages: [], pageDescriptions: {} });
  });

  afterEach(() => {
    useWriteFormStore.setState({ selectedPages: [], pageDescriptions: {} });
  });

  it("아무 페이지도 선택하지 않으면 안내 문구를 보여주고 요청사항 입력란이 없다", () => {
    render(<NecessaryPageChooseSection />);

    expect(screen.getByText("상단에서 외주 맡길 페이지를 우선 선택해주세요")).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("예) 2단으로 구성해주세요")).not.toBeInTheDocument();
  });

  it("페이지를 클릭하면 선택되고, 스토어의 selectedPages에 반영된다", async () => {
    const user = userEvent.setup();
    render(<NecessaryPageChooseSection />);

    await user.click(screen.getByRole("button", { name: "강사 프로필" }));

    expect(useWriteFormStore.getState().selectedPages).toEqual(["강사 프로필"]);
    expect(
      screen.queryByText("상단에서 외주 맡길 페이지를 우선 선택해주세요"),
    ).not.toBeInTheDocument();
  });

  it("여러 페이지를 선택하면 모두 selectedPages에 추가되고 각각 요청사항 입력란이 생긴다", async () => {
    const user = userEvent.setup();
    render(<NecessaryPageChooseSection />);

    await user.click(screen.getByRole("button", { name: "강사 프로필" }));
    await user.click(screen.getByRole("button", { name: "표지" }));

    expect(useWriteFormStore.getState().selectedPages).toEqual(["강사 프로필", "표지"]);
    expect(screen.getAllByPlaceholderText("예) 2단으로 구성해주세요")).toHaveLength(2);
  });

  it("선택된 페이지를 다시 클릭하면 선택 해제되고 selectedPages에서 제거된다", async () => {
    const user = userEvent.setup();
    useWriteFormStore.setState({ selectedPages: ["강사 프로필", "표지"] });
    render(<NecessaryPageChooseSection />);

    await user.click(screen.getByRole("button", { name: "강사 프로필" }));

    expect(useWriteFormStore.getState().selectedPages).toEqual(["표지"]);
  });

  it("특정 페이지의 요청사항을 입력하면 해당 페이지의 pageDescriptions만 갱신되고 다른 페이지 값은 유지된다", async () => {
    const user = userEvent.setup();
    useWriteFormStore.setState({
      selectedPages: ["강사 프로필", "표지"],
      pageDescriptions: { 표지: "기존 표지 요청" },
    });
    render(<NecessaryPageChooseSection />);

    const [firstInput] = screen.getAllByPlaceholderText("예) 2단으로 구성해주세요");
    await user.type(firstInput, "2단 구성 부탁드려요");

    const state = useWriteFormStore.getState();
    expect(state.pageDescriptions["강사 프로필"]).toBe("2단 구성 부탁드려요");
    expect(state.pageDescriptions["표지"]).toBe("기존 표지 요청");
  });
});
