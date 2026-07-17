import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { RgbaColor } from "@/features/instructor/write/lib/color";
import { useWriteFormStore } from "@/features/instructor/write/model/writeFormStore";
import type { UploadedFile } from "@/shared/types/file";

const STORAGE_KEY = "write-form";

// 스토어 최초 상태(액션 포함)를 한 번 캡쳐해두고 매 테스트마다 완전 초기화에 사용
const initialSnapshot = useWriteFormStore.getState();

const makeUploadedFile = (overrides: Partial<UploadedFile> = {}): UploadedFile => ({
  id: "id",
  file: new File(["content"], "file.png"),
  fileName: "file.png",
  fileSize: "1KB",
  isUploading: false,
  ...overrides,
});

const RED: RgbaColor = { r: 255, g: 0, b: 0, a: 1 };
const GREEN: RgbaColor = { r: 0, g: 255, b: 0, a: 1 };
const BLUE: RgbaColor = { r: 0, g: 0, b: 255, a: 1 };

beforeEach(() => {
  vi.useFakeTimers();
  sessionStorage.clear();
  useWriteFormStore.setState(initialSnapshot, true);
});

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
});

describe("getOrderRequest", () => {
  it("colorMode가 designer면 colors 필드가 없다", () => {
    useWriteFormStore.setState({ colorMode: "designer" });
    const result = useWriteFormStore.getState().getOrderRequest();
    expect(result.designInfo.colorSelectionMode).toBe("DESIGNER_DELEGATED");
    expect(result.designInfo.colors).toBeUndefined();
  });

  it("colorMode가 custom이면 mainColorIndex 색이 MAIN, 나머지가 순서대로 SUB1/SUB2로 매핑된다", () => {
    useWriteFormStore.setState({
      colorMode: "custom",
      colors: [RED, GREEN, BLUE],
      mainColorIndex: 1,
    });
    const result = useWriteFormStore.getState().getOrderRequest();
    expect(result.designInfo.colorSelectionMode).toBe("USER_SELECTED");
    expect(result.designInfo.colors).toEqual([
      { role: "MAIN", colorCode: "#00FF00" },
      { role: "SUB1", colorCode: "#FF0000" },
      { role: "SUB2", colorCode: "#0000FF" },
    ]);
  });

  it("colorMode가 custom이어도 선택된 색이 없으면 colors 필드가 없다", () => {
    useWriteFormStore.setState({
      colorMode: "custom",
      colors: [null, null, null],
      mainColorIndex: 0,
    });
    const result = useWriteFormStore.getState().getOrderRequest();
    expect(result.designInfo.colors).toBeUndefined();
  });

  it("materialFiles/referenceFiles가 비어있으면 files 필드가 없다", () => {
    useWriteFormStore.setState({ materialFiles: [], referenceFiles: [] });
    const result = useWriteFormStore.getState().getOrderRequest();
    expect(result.files).toBeUndefined();
  });

  it("key가 없는 파일은 필터링되고, description이 빈 문자열이면 필드가 생략된다", () => {
    useWriteFormStore.setState({
      materialFiles: [
        makeUploadedFile({ id: "1", key: "material-key-1" }),
        makeUploadedFile({ id: "2", key: undefined }),
      ],
      referenceFiles: [makeUploadedFile({ id: "3", key: "reference-key-1" })],
      materialDescription: "",
      referenceDescription: "참고 설명",
    });
    const result = useWriteFormStore.getState().getOrderRequest();
    expect(result.files).toEqual([
      { fileKind: "MATERIAL", keys: ["material-key-1"] },
      { fileKind: "REFERENCE", keys: ["reference-key-1"], description: "참고 설명" },
    ]);
  });

  it("selectedCategory/selectedSize/selectedPlan이 null이면 빈 문자열로 폴백한다", () => {
    useWriteFormStore.setState({ selectedCategory: null, selectedSize: null, selectedPlan: null });
    const result = useWriteFormStore.getState().getOrderRequest();
    expect(result.category).toBe("");
    expect(result.designInfo.pageSize).toBe("");
    expect(result.plan).toBe("");
  });

  it("selectedPages는 PAGE_API_MAP 코드로 변환되고, 설명이 없으면 description이 null이 된다", () => {
    useWriteFormStore.setState({
      selectedPages: ["표지", "목차"],
      pageDescriptions: { 표지: "표지 설명" },
    });
    const result = useWriteFormStore.getState().getOrderRequest();
    expect(result.textbook.requiredPages).toEqual([
      { pageType: "COVER", description: "표지 설명" },
      { pageType: "TABLE_OF_CONTENTS", description: null },
    ]);
  });

  it("firstDate/finalDate가 null이면 빈 문자열, 있으면 toApiDate 포맷으로 변환된다", () => {
    useWriteFormStore.setState({ firstDate: null, finalDate: null });
    expect(useWriteFormStore.getState().getOrderRequest().date).toEqual({
      firstDraftDeadline: "",
      finalDeadline: "",
    });

    useWriteFormStore.setState({
      firstDate: new Date(2026, 6, 20),
      finalDate: new Date(2026, 7, 3),
    });
    expect(useWriteFormStore.getState().getOrderRequest().date).toEqual({
      firstDraftDeadline: "2026-07-20",
      finalDeadline: "2026-08-03",
    });
  });

  it("term은 항상 고정된 형태로 출력된다", () => {
    useWriteFormStore.setState({ isTermsAgreed: true });
    expect(useWriteFormStore.getState().getOrderRequest().term).toEqual({
      type: "SETTLEMENT",
      version: "V1.0",
      isAgreed: true,
    });
  });
});

describe("actions", () => {
  it("각 setX 액션은 해당 상태만 갱신하고 나머지 상태는 유지한다", () => {
    useWriteFormStore
      .getState()
      .setBasicInfo({ 교재명: "수학의 정석", 강사명: "홍길동", 과목명: "수학" });
    expect(useWriteFormStore.getState().basicInfo).toEqual({
      교재명: "수학의 정석",
      강사명: "홍길동",
      과목명: "수학",
    });
    expect(useWriteFormStore.getState().currentStep).toBe(1);

    useWriteFormStore.getState().setCurrentStep(2);
    expect(useWriteFormStore.getState().currentStep).toBe(2);
    expect(useWriteFormStore.getState().basicInfo).toEqual({
      교재명: "수학의 정석",
      강사명: "홍길동",
      과목명: "수학",
    });
  });

  it("setPageDescription은 기존 pageDescriptions를 유지하며 특정 page 값만 덮어쓴다", () => {
    useWriteFormStore.getState().setPageDescription("표지", "표지 설명");
    useWriteFormStore.getState().setPageDescription("목차", "목차 설명");
    expect(useWriteFormStore.getState().pageDescriptions).toEqual({
      표지: "표지 설명",
      목차: "목차 설명",
    });

    useWriteFormStore.getState().setPageDescription("표지", "수정된 표지 설명");
    expect(useWriteFormStore.getState().pageDescriptions).toEqual({
      표지: "수정된 표지 설명",
      목차: "목차 설명",
    });
  });

  it("clearAfterSubmit은 스토어를 initialState로 리셋하고 sessionStorage 키를 삭제한다", () => {
    useWriteFormStore.getState().setCurrentStep(3);
    useWriteFormStore.getState().setIsTermsAgreed(true);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ dummy: true }));

    useWriteFormStore.getState().clearAfterSubmit();

    expect(useWriteFormStore.getState().currentStep).toBe(1);
    expect(useWriteFormStore.getState().isTermsAgreed).toBe(false);
    expect(sessionStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});

describe("sessionStorage 동기화", () => {
  it("state 변경 시 디바운스(300ms) 후에만 sessionStorage에 저장된다", () => {
    useWriteFormStore.getState().setIsTermsAgreed(true);
    expect(sessionStorage.getItem(STORAGE_KEY)).toBeNull();

    vi.advanceTimersByTime(299);
    expect(sessionStorage.getItem(STORAGE_KEY)).toBeNull();

    vi.advanceTimersByTime(1);
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null");
    expect(saved.term.isAgreed).toBe(true);
  });

  it("clearAfterSubmit 직후 발생하는 첫 상태 변경 알림은 sessionStorage에 쓰지 않는다", () => {
    useWriteFormStore.getState().setIsTermsAgreed(true);
    vi.advanceTimersByTime(300);
    expect(sessionStorage.getItem(STORAGE_KEY)).not.toBeNull();

    useWriteFormStore.getState().clearAfterSubmit();
    expect(sessionStorage.getItem(STORAGE_KEY)).toBeNull();

    // clearAfterSubmit이 호출한 set(initialState)로 인한 subscribe 알림은 suppressNextPersist로 무시되어야 함
    vi.advanceTimersByTime(300);
    expect(sessionStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
