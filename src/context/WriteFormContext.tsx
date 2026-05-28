"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import type { PlanType, WriteStep } from "@/constants/write";
import type { RgbaColor } from "@/lib/utils/color";
import type { UploadedFile } from "@/types/file";

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

export interface WriteFormContextType {
  currentStep: WriteStep;
  setCurrentStep: (value: WriteStep) => void;
  selectedCategory: CategorySelection | null;
  setSelectedCategory: (value: CategorySelection | null) => void;
  selectedSize: string | null;
  setSelectedSize: (value: string | null) => void;
  selectedKeywords: string[];
  setSelectedKeywords: (value: string[]) => void;
  additionalConcept: string;
  setAdditionalConcept: (value: string) => void;
  colorMode: ColorMode;
  setColorMode: (value: ColorMode) => void;
  colors: (RgbaColor | null)[];
  setColors: (value: (RgbaColor | null)[]) => void;
  basicInfo: BasicInfo;
  setBasicInfo: (value: BasicInfo) => void;
  selectedPages: string[];
  setSelectedPages: (value: string[]) => void;
  pageDescriptions: Record<string, string>;
  setPageDescription: (page: string, value: string) => void;
  materialFiles: UploadedFile[];
  setMaterialFiles: (files: UploadedFile[]) => void;
  referenceFiles: UploadedFile[];
  setReferenceFiles: (files: UploadedFile[]) => void;
  materialNote: string;
  setMaterialNote: (value: string) => void;
  referenceNote: string;
  setReferenceNote: (value: string) => void;
  selectedPlan: PlanType | null;
  setSelectedPlan: (value: PlanType | null) => void;
  firstDate: Date | null;
  setFirstDate: (value: Date | null) => void;
  finalDate: Date | null;
  setFinalDate: (value: Date | null) => void;
}

const WriteFormContext = createContext<WriteFormContextType | null>(null);

export const WriteFormProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<WriteStep>(1);
  const [selectedCategory, setSelectedCategory] = useState<CategorySelection | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [colorMode, setColorMode] = useState<ColorMode>("custom");
  const [colors, setColors] = useState<(RgbaColor | null)[]>([null, null, null]);
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({ 교재명: "", 강사명: "", 과목명: "" });
  const [additionalConcept, setAdditionalConcept] = useState("");
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [pageDescriptions, setPageDescriptions] = useState<Record<string, string>>({});
  const [materialFiles, setMaterialFiles] = useState<UploadedFile[]>([]);
  const [referenceFiles, setReferenceFiles] = useState<UploadedFile[]>([]);
  const [materialNote, setMaterialNote] = useState("");
  const [referenceNote, setReferenceNote] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [firstDate, setFirstDate] = useState<Date | null>(null);
  const [finalDate, setFinalDate] = useState<Date | null>(null);

  const setPageDescription = (page: string, value: string) => {
    setPageDescriptions(prev => ({ ...prev, [page]: value }));
  };

  return (
    <WriteFormContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        selectedCategory,
        setSelectedCategory,
        selectedSize,
        setSelectedSize,
        selectedKeywords,
        setSelectedKeywords,
        additionalConcept,
        setAdditionalConcept,
        colorMode,
        setColorMode,
        colors,
        setColors,
        basicInfo,
        setBasicInfo,
        selectedPages,
        setSelectedPages,
        pageDescriptions,
        setPageDescription,
        materialFiles,
        setMaterialFiles,
        referenceFiles,
        setReferenceFiles,
        materialNote,
        setMaterialNote,
        referenceNote,
        setReferenceNote,
        selectedPlan,
        setSelectedPlan,
        firstDate,
        setFirstDate,
        finalDate,
        setFinalDate,
      }}
    >
      {children}
    </WriteFormContext.Provider>
  );
};

export const useWriteForm = () => {
  const context = useContext(WriteFormContext);
  if (!context) throw new Error("useWriteForm must be used within WriteFormProvider");
  return context;
};
