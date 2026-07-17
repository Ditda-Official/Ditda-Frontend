import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { uploadCommissionFile } from "@/features/instructor/write/api/write";
import { useWriteFormStore } from "@/features/instructor/write/model/writeFormStore";
import ReferenceSection from "@/widgets/instructor/write/ui/ReferenceSection";

vi.mock("@/features/instructor/write/api/write", async importOriginal => {
  const actual = await importOriginal<typeof import("@/features/instructor/write/api/write")>();
  return { ...actual, uploadCommissionFile: vi.fn() };
});

const mockedUpload = vi.mocked(uploadCommissionFile);

const makeFile = (name: string) => new File([new Uint8Array(1024)], name, { type: "image/png" });

const getFileInput = (container: HTMLElement) =>
  container.querySelector('input[type="file"]') as HTMLInputElement;

describe("ReferenceSection", () => {
  beforeEach(() => {
    mockedUpload.mockReset();
    mockedUpload.mockResolvedValue("s3-key");
    useWriteFormStore.setState({ referenceFiles: [], referenceDescription: "" });
  });

  it("자료 섹션과 달리 3개를 초과하면(4개) 개수 초과 모달이 뜬다", async () => {
    const { container } = render(<ReferenceSection />);

    const fourFiles = Array.from({ length: 4 }, (_, i) => makeFile(`ref-${i}.png`));
    await userEvent.upload(getFileInput(container), fourFiles);

    expect(screen.getByText(/업로드 가능 파일 개수를/)).toBeInTheDocument();
    expect(screen.getByText(/총 3개까지/)).toBeInTheDocument();
    expect(useWriteFormStore.getState().referenceFiles).toHaveLength(0);
  });

  it("3개까지는 정상적으로 추가된다", async () => {
    const { container } = render(<ReferenceSection />);

    const threeFiles = Array.from({ length: 3 }, (_, i) => makeFile(`ref-${i}.png`));
    await userEvent.upload(getFileInput(container), threeFiles);

    expect(screen.queryByText(/업로드 가능 파일 개수를/)).not.toBeInTheDocument();
    expect(useWriteFormStore.getState().referenceFiles).toHaveLength(3);
  });

  it("레퍼런스 설명을 입력하면 스토어의 referenceDescription이 갱신된다", async () => {
    const user = userEvent.setup();
    render(<ReferenceSection />);

    const textarea = screen.getByPlaceholderText(/첨부한 파일에 대한 설명을/);
    await user.type(textarea, "차분한 톤으로요");

    expect(useWriteFormStore.getState().referenceDescription).toBe("차분한 톤으로요");
  });
});
