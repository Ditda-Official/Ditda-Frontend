import { ReactNode } from "react";

import Header from "@/shared/ui/Header";

const SignupLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen flex-col bg-white">
      <Header />
      <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default SignupLayout;
