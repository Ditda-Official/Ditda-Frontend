import { ReactNode } from "react";

import { LogoutSidebarMenu } from "@/features/auth";
import Header from "@/shared/ui/Header";
import Sidebar from "@/shared/ui/Sidebar";
import SidebarMenu from "@/shared/ui/SidebarMenu";

const DesignerLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar bottom={<LogoutSidebarMenu />}>
          <SidebarMenu label="현재 외주" />
          <SidebarMenu label="외주 찾기" />
          <SidebarMenu label="마이페이지" />
        </Sidebar>
        <main className="scrollbar-hide flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DesignerLayout;
