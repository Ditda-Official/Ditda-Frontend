import { ReactNode } from "react";

import { LogoutSidebarMenu } from "@/features/auth";
import Sidebar from "@/shared/ui/Sidebar";
import SidebarMenu from "@/shared/ui/SidebarMenu";

const DesignerSidebarLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-gray-10 flex flex-1 overflow-hidden">
      <Sidebar bottom={<LogoutSidebarMenu />}>
        <SidebarMenu label="현재 외주" href="/designer" matchPrefix="/designer/revision" />
        <SidebarMenu label="외주 찾기" href="/designer/search" />
        <SidebarMenu label="마이페이지" href="/designer/my" />
      </Sidebar>
      <main className="scrollbar-hide flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default DesignerSidebarLayout;
