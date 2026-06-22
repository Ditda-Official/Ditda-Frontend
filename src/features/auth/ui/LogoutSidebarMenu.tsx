"use client";

import SidebarMenu from "@/shared/ui/SidebarMenu";

import { useLogout } from "../model/useLogout";

const LogoutSidebarMenu = () => {
  const { handleLogout, isLoggingOut } = useLogout();

  return (
    <SidebarMenu disabled={isLoggingOut} label="로그아웃" onClick={() => void handleLogout()} />
  );
};

export default LogoutSidebarMenu;
