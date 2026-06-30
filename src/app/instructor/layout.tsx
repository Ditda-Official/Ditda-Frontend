import { ReactNode } from "react";

import Header from "@/shared/ui/Header";

const InstructorLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      {children}
    </div>
  );
};

export default InstructorLayout;
