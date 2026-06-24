import { create } from "zustand";

import type { Plan } from "@/features/instructor/write/api/writeTypes";
import {
  CATEGORY_API_MAP,
  KEYWORD_API_MAP,
  PAGE_API_MAP,
  SIZE_API_MAP,
  type WriteStep,
} from "@/features/instructor/write/config/write";
import { type RgbaColor, toHex } from "@/features/instructor/write/lib/color";
import { toApiDate } from "@/features/instructor/write/lib/date";
import type { WriteOrderRequest } from "@/features/instructor/write/model/write";
import type { UploadedFile } from "@/shared/types/file";

const STORAGE_KEY = "write-form";

interface CategorySelection {
  categoryIndex: number;
  item: string;
}

type ColorMode = "designer" | "custom";

export interface BasicInfo {
  교재명: string;
  강사명: string;
  과목명: string;
}

interface WriteFormState {
  currentStep: WriteStep;
  selectedCategory: CategorySelection | null;
  selectedSize: string | null;
  selectedKeywords: string[];
  additionalConcept: string;
  colorMode: ColorMode;
  colors: (RgbaColor | null)[];
  mainColorIndex: number;
  basicInfo: BasicInfo;
  selectedPages: string[];
  pageDescriptions: Record<string, string>;
  materialFiles: UploadedFile[];
  referenceFiles: UploadedFile[];
  materialDescription: string;
  referenceDescription: string;
  selectedPlan: Plan | null;
  firstDate: Date | null;
  finalDate: Date | null;
  isTermsAgreed: boolean;

  setCurrentStep: (value: WriteStep) => void;
  setSelectedCategory: (value: CategorySelection | null) => void;
  setSelectedSize: (value: string | null) => void;
  setSelectedKeywords: (value: string[]) => void;
  setAdditionalConcept: (value: string) => void;
  setColorMode: (value: ColorMode) => void;
  setColors: (value: (RgbaColor | null)[]) => void;
  setMainColorIndex: (value: number) => void;
  setBasicInfo: (value: BasicInfo) => void;
  setSelectedPages: (value: string[]) => void;
  setPageDescription: (page: string, value: string) => void;
  setMaterialFiles: (files: UploadedFile[]) => void;
  setReferenceFiles: (files: UploadedFile[]) => void;
  setMaterialDescription: (value: string) => void;
  setReferenceDescription: (value: string) => void;
  setSelectedPlan: (value: Plan | null) => void;
  setFirstDate: (value: Date | null) => void;
  setFinalDate: (value: Date | null) => void;
  setIsTermsAgreed: (value: boolean) => void;

  // API 제출 후 호출 → 스토어 초기화 + sessionStorage 키 삭제
  clearAfterSubmit: () => void;
}

const initialState = {
  currentStep: 1 as WriteStep,
  selectedCategory: null,
  selectedSize: null,
  selectedKeywords: [],
  additionalConcept: "",
  colorMode: "custom" as ColorMode,
  colors: [null, null, null] as (RgbaColor | null)[],
  mainColorIndex: 0,
  basicInfo: { 교재명: "", 강사명: "", 과목명: "" },
  selectedPages: [],
  pageDescriptions: {},
  materialFiles: [],
  referenceFiles: [],
  materialDescription: "",
  referenceDescription: "",
  selectedPlan: null,
  firstDate: null,
  finalDate: null,
  isTermsAgreed: false,
};

const buildOrderRequest = (state: WriteFormState): WriteOrderRequest => {
  let mappedColors: { role: "MAIN" | "SUB1" | "SUB2"; colorCode: string }[] | undefined;
  if (state.colorMode === "custom") {
    const result: { role: "MAIN" | "SUB1" | "SUB2"; colorCode: string }[] = [];
    let subCount = 1;
    const mainColor = state.colors[state.mainColorIndex];
    if (mainColor) result.push({ role: "MAIN", colorCode: toHex(mainColor) });
    state.colors.forEach((color, i) => {
      if (i !== state.mainColorIndex && color) {
        result.push({ role: `SUB${subCount}` as "SUB1" | "SUB2", colorCode: toHex(color) });
        subCount++;
      }
    });
    if (result.length > 0) mappedColors = result;
  }

  return {
    category: state.selectedCategory ? CATEGORY_API_MAP[state.selectedCategory.item] : "",
    designInfo: {
      size: state.selectedSize ? SIZE_API_MAP[state.selectedSize] : "",
      concepts: state.selectedKeywords.map(k => KEYWORD_API_MAP[k]),
      ...(state.additionalConcept ? { additionalConcept: state.additionalConcept } : {}),
      colorSelectionMode: state.colorMode === "designer" ? "DESIGNER_DELEGATED" : "USER_SELECTED",
      ...(mappedColors ? { colors: mappedColors } : {}),
    },
    textbookName: state.basicInfo.교재명,
    instructorName: state.basicInfo.강사명,
    subject: state.basicInfo.과목명,
    requiredPages: state.selectedPages.map(page => ({
      pageType: PAGE_API_MAP[page],
      description: state.pageDescriptions[page] || null,
    })),
    ...(state.materialDescription ? { materialDescription: state.materialDescription } : {}),
    ...(state.referenceDescription ? { referenceDescription: state.referenceDescription } : {}),
    plan: state.selectedPlan?.code ?? "",
    dates: [
      {
        firstDraftDeadline: state.firstDate ? toApiDate(state.firstDate) : "",
        finalDeadline: state.finalDate ? toApiDate(state.finalDate) : "",
      },
    ],
    term: [{ type: "SETTLEMENT", version: "V1.0", isAgreed: state.isTermsAgreed }],
  };
};

export const useWriteFormStore = create<WriteFormState>()(set => ({
  ...initialState,

  setCurrentStep: value => set({ currentStep: value }),
  setSelectedCategory: value => set({ selectedCategory: value }),
  setSelectedSize: value => set({ selectedSize: value }),
  setSelectedKeywords: value => set({ selectedKeywords: value }),
  setAdditionalConcept: value => set({ additionalConcept: value }),
  setColorMode: value => set({ colorMode: value }),
  setColors: value => set({ colors: value }),
  setMainColorIndex: value => set({ mainColorIndex: value }),
  setBasicInfo: value => set({ basicInfo: value }),
  setSelectedPages: value => set({ selectedPages: value }),
  setPageDescription: (page, value) =>
    set(state => ({ pageDescriptions: { ...state.pageDescriptions, [page]: value } })),
  setMaterialFiles: files => set({ materialFiles: files }),
  setReferenceFiles: files => set({ referenceFiles: files }),
  setMaterialDescription: (value: string) => set({ materialDescription: value }),
  setReferenceDescription: (value: string) => set({ referenceDescription: value }),
  setSelectedPlan: value => set({ selectedPlan: value }),
  setFirstDate: value => set({ firstDate: value }),
  setFinalDate: value => set({ finalDate: value }),
  setIsTermsAgreed: value => set({ isTermsAgreed: value }),

  clearAfterSubmit: () => {
    set(initialState);
    sessionStorage.removeItem(STORAGE_KEY);
  },
}));

// 상태가 바뀔 때마다 API 포맷으로 sessionStorage에 동기화
useWriteFormStore.subscribe(state => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(buildOrderRequest(state)));
  }
});
