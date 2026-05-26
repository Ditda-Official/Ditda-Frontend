"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import type { RgbaColor } from "@/lib/utils/color";

interface CategorySelection {
  categoryIndex: number;
  item: string;
}

type ColorMode = "designer" | "custom";

interface WriteFormContextType {
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
}

const WriteFormContext = createContext<WriteFormContextType | null>(null);

export const WriteFormProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategorySelection | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [colorMode, setColorMode] = useState<ColorMode>("custom");
  const [colors, setColors] = useState<(RgbaColor | null)[]>([null, null, null]);

  return (
    <WriteFormContext.Provider
      value={{
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
