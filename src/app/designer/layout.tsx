import { ReactNode } from "react";

import Header from "@/shared/ui/Header";

const DesignerLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      {children}
    </div>
  );
};

export default DesignerLayout;
