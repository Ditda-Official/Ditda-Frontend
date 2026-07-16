import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Modal from "@/shared/ui/modal/Modal";

describe("Modal", () => {
  it("isOpen이 false면 아무것도 렌더링하지 않는다", () => {
    const { container } = render(
      <Modal
        isOpen={false}
        type="single"
        title="제목"
        confirmLabel="확인"
        onConfirm={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("type=single이면 확인 버튼만 렌더링되고 클릭 시 onConfirm이 호출된다", async () => {
    const user = userEvent.setup();
    const handleConfirm = vi.fn();
    render(
      <Modal
        isOpen
        type="single"
        title="제목"
        description="설명"
        confirmLabel="확인"
        onConfirm={handleConfirm}
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByText("제목")).toBeInTheDocument();
    expect(screen.getByText("설명")).toBeInTheDocument();
    expect(screen.queryByText("취소")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "확인" }));
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it("type=double이면 취소·확인 버튼이 각각 onCancel·onConfirm을 호출한다", async () => {
    const user = userEvent.setup();
    const handleConfirm = vi.fn();
    const handleCancel = vi.fn();
    render(
      <Modal
        isOpen
        type="double"
        title="제목"
        confirmLabel="확인"
        cancelLabel="취소"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onClose={vi.fn()}
      />,
    );

    await user.click(screen.getByRole("button", { name: "취소" }));
    expect(handleCancel).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: "확인" }));
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it("배경을 클릭하면 onClose가 호출되지만, 모달 내부 클릭은 전파되지 않는다", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    render(
      <Modal
        isOpen
        type="single"
        title="제목"
        confirmLabel="확인"
        onConfirm={vi.fn()}
        onClose={handleClose}
      />,
    );

    await user.click(screen.getByText("제목"));
    expect(handleClose).not.toHaveBeenCalled();

    await user.click(screen.getByText("제목").closest(".fixed") as HTMLElement);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("Escape 키를 누르면 onClose가 호출된다", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    render(
      <Modal
        isOpen
        type="single"
        title="제목"
        confirmLabel="확인"
        onConfirm={vi.fn()}
        onClose={handleClose}
      />,
    );

    await user.keyboard("{Escape}");

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
