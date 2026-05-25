"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface CategorySelection {
  categoryIndex: number;
  item: string;
}

interface WriteFormContextType {
  selectedCategory: CategorySelection | null;
  setSelectedCategory: (value: CategorySelection | null) => void;
}

const WriteFormContext = createContext<WriteFormContextType | null>(null);

export const WriteFormProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategorySelection | null>(null);

  return (
    <WriteFormContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </WriteFormContext.Provider>
  );
};

export const useWriteForm = () => {
  const context = useContext(WriteFormContext);
  if (!context) throw new Error("useWriteForm must be used within WriteFormProvider");
  return context;
};
