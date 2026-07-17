import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { uploadCommissionFile } from "@/features/instructor/write/api/write";
import { useWriteFormStore } from "@/features/instructor/write/model/writeFormStore";
import AttachFileSection from "@/widgets/instructor/write/ui/AttachFileSection";

vi.mock("@/features/instructor/write/api/write", async importOriginal => {
  const actual = await importOriginal<typeof import("@/features/instructor/write/api/write")>();
  return { ...actual, uploadCommissionFile: vi.fn() };
});

const mockedUpload = vi.mocked(uploadCommissionFile);

const makeFile = (name: string, sizeBytes = 1024) => {
  const file = new File([new Uint8Array(sizeBytes)], name, { type: "image/png" });
  return file;
};

const getFileInput = (container: HTMLElement) =>
  container.querySelector('input[type="file"]') as HTMLInputElement;

describe("AttachFileSection", () => {
  beforeEach(() => {
    mockedUpload.mockReset();
    useWriteFormStore.setState({ materialFiles: [], materialDescription: "" });
  });

  it("유효한 png 파일을 업로드하면 완료 후 스토어에 key와 함께 반영된다", async () => {
    mockedUpload.mockResolvedValue("s3-key-1");
    const { container } = render(<AttachFileSection />);

    await userEvent.upload(getFileInput(container), makeFile("logo.png"));

    expect(screen.getByText(/logo/)).toBeInTheDocument();

    await waitFor(() =>
      expect(useWriteFormStore.getState().materialFiles[0].isUploading).toBe(false),
    );
    expect(useWriteFormStore.getState().materialFiles[0].key).toBe("s3-key-1");
  });

  it("허용되지 않은 확장자의 파일만 선택하면 아무것도 추가되지 않고 실패 안내 모달이 뜬다", async () => {
    const { container } = render(<AttachFileSection />);

    await userEvent.upload(getFileInput(container), makeFile("readme.pdf"));

    expect(screen.getByText("파일 업로드를 실패하였습니다")).toBeInTheDocument();
    expect(useWriteFormStore.getState().materialFiles).toHaveLength(0);
    expect(mockedUpload).not.toHaveBeenCalled();
  });

  it("유효/무효 파일이 섞이면 유효한 파일만 추가되면서 실패 안내 모달도 함께 뜬다", async () => {
    mockedUpload.mockResolvedValue("s3-key-2");
    const { container } = render(<AttachFileSection />);

    await userEvent.upload(getFileInput(container), [makeFile("ok.png"), makeFile("bad.pdf")]);

    expect(screen.getByText("파일 업로드를 실패하였습니다")).toBeInTheDocument();
    expect(mockedUpload).toHaveBeenCalledTimes(1);
  });

  it("업로드 예정 파일이 5개를 초과하면 개수 초과 모달이 뜨고 아무것도 추가되지 않는다", async () => {
    mockedUpload.mockResolvedValue("s3-key");
    const { container } = render(<AttachFileSection />);

    const sixFiles = Array.from({ length: 6 }, (_, i) => makeFile(`file-${i}.png`));
    await userEvent.upload(getFileInput(container), sixFiles);

    expect(screen.getByText(/업로드 가능 파일 개수를/)).toBeInTheDocument();
    expect(useWriteFormStore.getState().materialFiles).toHaveLength(0);
    expect(mockedUpload).not.toHaveBeenCalled();
  });

  it("자료별 추가 설명을 입력하면 스토어의 materialDescription이 갱신된다", async () => {
    const user = userEvent.setup();
    render(<AttachFileSection />);

    const textarea = screen.getByPlaceholderText(/첨부한 파일에 대한 설명을/);
    await user.type(textarea, "표지 사진입니다");

    expect(useWriteFormStore.getState().materialDescription).toBe("표지 사진입니다");
  });
});
