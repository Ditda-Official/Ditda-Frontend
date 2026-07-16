import { describe, expect, it } from "vitest";

import { formatFileSize, isAllowedFileType } from "@/shared/lib/utils/file";

describe("formatFileSize", () => {
  it("1024바이트 미만이면 B 단위로 표시한다", () => {
    expect(formatFileSize(500)).toBe("500B");
  });

  it("1024바이트 이상 1MB 미만이면 소수점 1자리 KB로 표시한다", () => {
    expect(formatFileSize(1024)).toBe("1.0KB");
    expect(formatFileSize(1536)).toBe("1.5KB");
  });

  it("1MB 이상이면 소수점 1자리 MB로 표시한다", () => {
    expect(formatFileSize(1024 * 1024)).toBe("1.0MB");
    expect(formatFileSize(1024 * 1024 * 2.5)).toBe("2.5MB");
  });
});

describe("isAllowedFileType", () => {
  const makeFile = (name: string) => new File(["content"], name);

  it("허용된 확장자면 true를 반환한다", () => {
    expect(isAllowedFileType(makeFile("image.png"), [".png"])).toBe(true);
  });

  it("허용되지 않은 확장자면 false를 반환한다", () => {
    expect(isAllowedFileType(makeFile("document.pdf"), [".png"])).toBe(false);
  });

  it("대소문자와 무관하게 판별한다", () => {
    expect(isAllowedFileType(makeFile("IMAGE.PNG"), [".png"])).toBe(true);
  });

  it("여러 확장자 중 하나라도 일치하면 true를 반환한다", () => {
    expect(isAllowedFileType(makeFile("file.pdf"), [".png", ".pdf"])).toBe(true);
  });
});
