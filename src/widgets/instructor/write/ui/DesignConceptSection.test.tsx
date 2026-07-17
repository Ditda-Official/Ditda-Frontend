import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useWriteFormStore } from "@/features/instructor/write/model/writeFormStore";
import DesignConceptSection from "@/widgets/instructor/write/ui/DesignConceptSection";

const LIMIT_TOAST_MESSAGE =
  "컨셉은 5개까지 선택할 수 있습니다. 추가적인 내용은 하단 토글을 열어 작성해주세요.";

describe("DesignConceptSection", () => {
  beforeEach(() => {
    useWriteFormStore.setState({ selectedKeywords: [], additionalConcept: "" });
  });

  afterEach(() => {
    useWriteFormStore.setState({ selectedKeywords: [], additionalConcept: "" });
    vi.useRealTimers();
  });

  it("키워드를 클릭하면 선택되어 스토어와 선택한 컨셉 영역에 반영된다", async () => {
    const user = userEvent.setup();
    render(<DesignConceptSection />);

    await user.click(screen.getByRole("button", { name: "차분한" }));

    expect(useWriteFormStore.getState().selectedKeywords).toEqual(["차분한"]);
    expect(screen.getByRole("button", { name: "차분한 삭제" })).toBeInTheDocument();
  });

  it("선택된 키워드를 다시 클릭하면 선택이 해제된다", async () => {
    const user = userEvent.setup();
    useWriteFormStore.setState({ selectedKeywords: ["차분한"] });
    render(<DesignConceptSection />);

    await user.click(screen.getByRole("button", { name: "차분한" }));

    expect(useWriteFormStore.getState().selectedKeywords).toEqual([]);
  });

  it("선택한 컨셉 영역의 삭제 아이콘을 클릭해도 선택이 해제된다", async () => {
    const user = userEvent.setup();
    useWriteFormStore.setState({ selectedKeywords: ["차분한", "귀여운"] });
    render(<DesignConceptSection />);

    await user.click(screen.getByRole("button", { name: "차분한 삭제" }));

    expect(useWriteFormStore.getState().selectedKeywords).toEqual(["귀여운"]);
  });

  it("5개를 초과해서 선택하면 추가되지 않고 안내 토스트가 노출된 뒤 일정 시간 후 사라진다", async () => {
    vi.useFakeTimers();
    useWriteFormStore.setState({
      selectedKeywords: ["입체감 있는", "평면적인", "거친", "매끈한", "정돈된"],
    });
    render(<DesignConceptSection />);

    const toast = screen.getByText(LIMIT_TOAST_MESSAGE).parentElement as HTMLElement;
    expect(toast).toHaveClass("opacity-0");

    fireEvent.click(screen.getByRole("button", { name: "역동적인" }));

    expect(useWriteFormStore.getState().selectedKeywords).toHaveLength(5);
    expect(useWriteFormStore.getState().selectedKeywords).not.toContain("역동적인");
    expect(toast).toHaveClass("opacity-100");

    act(() => {
      vi.advanceTimersByTime(2500);
    });

    expect(toast).toHaveClass("opacity-0");
  });

  it("직접 입력 토글을 열고 텍스트를 입력하면 스토어의 additionalConcept가 갱신된다", async () => {
    const user = userEvent.setup();
    render(<DesignConceptSection />);

    const textarea = screen.getByPlaceholderText(/매듭'을 시각화하여/);
    await user.type(textarea, "안녕하세요");

    expect(useWriteFormStore.getState().additionalConcept).toBe("안녕하세요");
  });
});
