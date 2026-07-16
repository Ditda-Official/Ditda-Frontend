import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import FileUpload from "@/shared/ui/FileUpload";

describe("FileUpload", () => {
  it("파일명을 확장자와 분리해 표시한다", () => {
    render(
      <FileUpload
        fileName="portfolio.PDF"
        fileSize="1.2MB"
        isUploading={false}
        onRemove={vi.fn()}
      />,
    );

    expect(screen.getByText("portfolio [pdf, 1.2MB]")).toBeInTheDocument();
  });

  it("확장자가 없는 파일명은 그대로 표시한다", () => {
    render(<FileUpload fileName="README" fileSize="10KB" isUploading={false} onRemove={vi.fn()} />);

    expect(screen.getByText("README [, 10KB]")).toBeInTheDocument();
  });

  it("isUploading이 true면 로딩 아이콘이 회전 애니메이션 클래스와 함께 렌더링된다", () => {
    const { container } = render(
      <FileUpload fileName="a.png" fileSize="1MB" isUploading={true} onRemove={vi.fn()} />,
    );

    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("isUploading이 false면 로딩 아이콘이 없다", () => {
    const { container } = render(
      <FileUpload fileName="a.png" fileSize="1MB" isUploading={false} onRemove={vi.fn()} />,
    );

    expect(container.querySelector(".animate-spin")).not.toBeInTheDocument();
  });

  it("닫기 아이콘을 클릭하면 onRemove가 호출된다", async () => {
    const user = userEvent.setup();
    const handleRemove = vi.fn();
    const { container } = render(
      <FileUpload fileName="a.png" fileSize="1MB" isUploading={false} onRemove={handleRemove} />,
    );
    const removeIcon = container.querySelector(".cursor-pointer") as HTMLElement;

    await user.click(removeIcon);

    expect(handleRemove).toHaveBeenCalledTimes(1);
  });
});
