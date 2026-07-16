import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import FileDragAndDrop from "@/shared/ui/FileDragAndDrop";

describe("FileDragAndDrop", () => {
  it("isPortfolio가 false(기본값)면 png 전용 안내 문구를 보여준다", () => {
    render(<FileDragAndDrop onFilesAdded={vi.fn()} />);

    expect(screen.getByText(/\.png 파일만 제출 가능/)).toBeInTheDocument();
  });

  it("isPortfolio가 true면 pdf·png 안내 문구를 보여준다", () => {
    render(<FileDragAndDrop onFilesAdded={vi.fn()} isPortfolio />);

    expect(screen.getByText(/\.pdf, \.png 파일만 제출 가능/)).toBeInTheDocument();
  });

  it("파일 선택 버튼 클릭 시 숨겨진 input을 클릭한다", async () => {
    const user = userEvent.setup();
    const { container } = render(<FileDragAndDrop onFilesAdded={vi.fn()} />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, "click");

    await user.click(screen.getByRole("button", { name: /파일 선택/ }));

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it("input에서 파일을 선택하면 onFilesAdded가 선택된 파일 배열과 함께 호출된다", async () => {
    const handleFilesAdded = vi.fn();
    const { container } = render(<FileDragAndDrop onFilesAdded={handleFilesAdded} />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(["content"], "image.png", { type: "image/png" });

    await userEvent.upload(input, file);

    expect(handleFilesAdded).toHaveBeenCalledTimes(1);
    expect(handleFilesAdded).toHaveBeenCalledWith([file]);
  });

  it("드롭 영역에 파일을 drop하면 onFilesAdded가 호출된다", () => {
    const handleFilesAdded = vi.fn();
    const { container } = render(<FileDragAndDrop onFilesAdded={handleFilesAdded} />);
    const dropZone = container.firstElementChild as HTMLElement;
    const file = new File(["content"], "image.png", { type: "image/png" });

    fireEvent.drop(dropZone, { dataTransfer: { files: [file] } });

    expect(handleFilesAdded).toHaveBeenCalledTimes(1);
    expect(handleFilesAdded).toHaveBeenCalledWith([file]);
  });

  it("드래그 오버 시 강조 스타일이 적용되고, 드롭 후에는 해제된다", () => {
    const { container } = render(<FileDragAndDrop onFilesAdded={vi.fn()} />);
    const dropZone = container.firstElementChild as HTMLElement;

    fireEvent.dragOver(dropZone);
    expect(dropZone).toHaveClass("border-main-main");

    fireEvent.drop(dropZone, { dataTransfer: { files: [] } });
    expect(dropZone).not.toHaveClass("border-main-main");
  });
});
