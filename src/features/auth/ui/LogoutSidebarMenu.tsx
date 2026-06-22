"use client";

import { useLogout } from "@/features/auth/model/useLogout";
import SidebarMenu from "@/shared/ui/SidebarMenu";

const LogoutSidebarMenu = () => {
  const { handleLogout, isLoggingOut } = useLogout();

  return (
    <SidebarMenu disabled={isLoggingOut} label="로그아웃" onClick={() => void handleLogout()} />
  );
};

export default LogoutSidebarMenu;
