"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import type { WriteStep } from "@/constants/write";
import type { RgbaColor } from "@/lib/utils/color";

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

interface WriteFormContextType {
  currentStep: WriteStep;
  setCurrentStep: (value: WriteStep) => void;
  selectedCategory: CategorySelection | null;
  setSelectedCategory: (value: CategorySelection | null) => void;
  selectedSize: string | null;
  setSelectedSize: (value: string | null) => void;
  selectedKeywords: string[];
  setSelectedKeywords: (value: string[]) => void;
  colorMode: ColorMode;
  setColorMode: (value: ColorMode) => void;
  colors: (RgbaColor | null)[];
  setColors: (value: (RgbaColor | null)[]) => void;
  basicInfo: BasicInfo;
  setBasicInfo: (value: BasicInfo) => void;
  selectedPages: string[];
  setSelectedPages: (value: string[]) => void;
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
  const [selectedPages, setSelectedPages] = useState<string[]>([]);

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
        colorMode,
        setColorMode,
        colors,
        setColors,
        basicInfo,
        setBasicInfo,
        selectedPages,
        setSelectedPages,
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
