"use client";

import { ReactNode } from "react";

import StepHeader from "@/components/instructor/write/StepHeader";

const WriteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-gray-10 min-h-screen pt-16">
      <div className="mx-auto w-235">
        <div className="sticky top-0 z-10">
          <StepHeader />
        </div>
        {children}
      </div>
    </div>
  );
};

export default WriteLayout;
