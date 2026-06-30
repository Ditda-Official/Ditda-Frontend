import { ReactNode } from "react";

import { LogoutSidebarMenu } from "@/features/auth";
import Sidebar from "@/shared/ui/Sidebar";
import SidebarMenu from "@/shared/ui/SidebarMenu";

const InstructorSidebarLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-gray-10 flex flex-1 overflow-hidden">
      <Sidebar bottom={<LogoutSidebarMenu />}>
        <SidebarMenu label="새 외주 작성" href="/instructor/write" />
        <SidebarMenu
          label="진행 중 외주"
          href="/instructor"
          matchPrefix={["/instructor/revision", "/instructor/choose"]}
        />
        <SidebarMenu label="마이페이지" href="/instructor/my" />
      </Sidebar>
      <main className="scrollbar-hide flex flex-1 flex-col overflow-y-auto">{children}</main>
    </div>
  );
};

export default InstructorSidebarLayout;
