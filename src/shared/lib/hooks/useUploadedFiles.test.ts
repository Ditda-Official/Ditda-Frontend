import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useUploadedFiles } from "@/shared/lib/hooks/useUploadedFiles";

const makeFile = (name = "a.png") => new File(["content"], name, { type: "image/png" });

describe("useUploadedFiles", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("uploadFile 없이 추가하면 낙관적으로 isUploading:true 상태로 들어가고, 2초 뒤 업로드 완료 처리된다", async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useUploadedFiles());

    act(() => {
      result.current.handleFilesAdded([makeFile()]);
    });

    expect(result.current.uploadedFiles).toHaveLength(1);
    expect(result.current.uploadedFiles[0].isUploading).toBe(true);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.uploadedFiles[0].isUploading).toBe(false);
  });

  it("uploadFile이 성공하면 isUploading이 false가 되고 key가 채워진다", async () => {
    const uploadFile = vi.fn().mockResolvedValue("uploaded-key-123");
    const { result } = renderHook(() => useUploadedFiles(undefined, undefined, uploadFile));

    act(() => {
      result.current.handleFilesAdded([makeFile()]);
    });

    await waitFor(() => expect(result.current.uploadedFiles[0].isUploading).toBe(false));
    expect(result.current.uploadedFiles[0].key).toBe("uploaded-key-123");
  });

  it("uploadFile이 실패하면 목록에서 제거되고 onUploadError가 호출된다", async () => {
    const uploadFile = vi.fn().mockRejectedValue(new Error("upload failed"));
    const onUploadError = vi.fn();
    const file = makeFile("bad.png");
    const { result } = renderHook(() =>
      useUploadedFiles(undefined, undefined, uploadFile, onUploadError),
    );

    act(() => {
      result.current.handleFilesAdded([file]);
    });
    expect(result.current.uploadedFiles).toHaveLength(1);

    await waitFor(() => expect(result.current.uploadedFiles).toHaveLength(0));
    expect(onUploadError).toHaveBeenCalledWith(file);
  });

  it("handleRemove로 id에 해당하는 파일만 제거한다", () => {
    const { result } = renderHook(() => useUploadedFiles());

    act(() => {
      result.current.handleFilesAdded([makeFile("a.png"), makeFile("b.png")]);
    });
    expect(result.current.uploadedFiles).toHaveLength(2);

    const idToRemove = result.current.uploadedFiles[0].id;
    act(() => {
      result.current.handleRemove(idToRemove);
    });

    expect(result.current.uploadedFiles).toHaveLength(1);
    expect(result.current.uploadedFiles[0].id).not.toBe(idToRemove);
  });

  it("externalFiles·setExternalFiles가 주어지면 외부 상태를 갱신하는 controlled 모드로 동작한다", () => {
    const setExternalFiles = vi.fn();
    const { result } = renderHook(() => useUploadedFiles([], setExternalFiles));

    act(() => {
      result.current.handleFilesAdded([makeFile()]);
    });

    expect(setExternalFiles).toHaveBeenCalledTimes(1);
    const updated = setExternalFiles.mock.calls[0][0];
    expect(updated).toHaveLength(1);
    expect(updated[0].fileName).toBe("a.png");
  });
});
