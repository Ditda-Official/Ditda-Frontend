import { ReactNode } from "react";

import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import SidebarMenu from "@/components/common/SidebarMenu";

const InstructorLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar bottom={<SidebarMenu label="로그아웃" />}>
          <SidebarMenu label="새 외주 작성" href="/instructor/write" />
          <SidebarMenu label="진행 중 외주" href="/instructor/ongoing" />
          <SidebarMenu label="마이페이지" href="/instructor/my" />
        </Sidebar>
        <main className="scrollbar-hide flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default InstructorLayout;
