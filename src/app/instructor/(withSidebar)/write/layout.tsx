"use client";

import { ReactNode, useEffect } from "react";

import { StepHeader, useWriteFormStore } from "@/features/instructor/write";

const WriteLayout = ({ children }: { children: ReactNode }) => {
  const clearAfterSubmit = useWriteFormStore(s => s.clearAfterSubmit);

  useEffect(() => {
    return () => {
      clearAfterSubmit();
    };
  }, [clearAfterSubmit]);
  return (
    <div className="bg-gray-10 min-h-screen pt-16">
      <div className="mx-auto w-235">
        <div className="z-header sticky top-0">
          <StepHeader />
        </div>
        {children}
      </div>
    </div>
  );
};

export default WriteLayout;
