import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import DraftModal from "@/shared/ui/modal/DraftModal";

describe("DraftModal", () => {
  it("isOpen이 false면 아무것도 렌더링하지 않는다", () => {
    const { container } = render(
      <DraftModal isOpen={false} title="시안" fileUrls={[]} onClose={vi.fn()} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("isOpen이 true면 dialog role과 제목, 이미지 개수만큼 렌더링한다", () => {
    render(
      <DraftModal
        isOpen
        title="시안 확인"
        fileUrls={["/a.png", "/b.png", "/c.png"]}
        onClose={vi.fn()}
      />,
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByText("시안 확인")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(3);
  });

  it("닫기 버튼을 클릭하면 onClose가 호출된다", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    render(<DraftModal isOpen title="시안" fileUrls={[]} onClose={handleClose} />);

    await user.click(screen.getByRole("button", { name: "모달 닫기" }));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("배경 클릭 시 onClose가 호출되고, 모달 내부 클릭은 전파되지 않는다", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    render(<DraftModal isOpen title="시안" fileUrls={[]} onClose={handleClose} />);

    await user.click(screen.getByRole("dialog"));
    expect(handleClose).not.toHaveBeenCalled();

    await user.click(screen.getByRole("dialog").parentElement as HTMLElement);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("Escape 키를 누르면 onClose가 호출된다", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    render(<DraftModal isOpen title="시안" fileUrls={[]} onClose={handleClose} />);

    await user.keyboard("{Escape}");

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
