import { ReactNode } from "react";

import Header from "@/shared/ui/Header";
import Sidebar from "@/shared/ui/Sidebar";
import SidebarMenu from "@/shared/ui/SidebarMenu";

const InstructorLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="bg-gray-10 flex flex-1 overflow-hidden">
        <Sidebar bottom={<SidebarMenu label="로그아웃" />}>
          <SidebarMenu label="새 외주 작성" href="/instructor/write" />
          <SidebarMenu label="진행 중 외주" href="/instructor" matchPrefix="/instructor/revision" />
          <SidebarMenu label="마이페이지" href="/instructor/my" />
        </Sidebar>
        <main className="scrollbar-hide flex flex-1 flex-col overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default InstructorLayout;
