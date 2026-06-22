"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { logout } from "@/features/auth/api/logout";
import { clearClientAuth } from "@/shared/lib/auth/client";

export const useLogout = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await logout();
    } catch {
      // 클라이언트 세션 정리는 로그아웃 API 실패 여부와 무관하게 진행합니다.
    } finally {
      clearClientAuth();
      router.push("/");
      router.refresh();
      setIsLoggingOut(false);
    }
  };

  return {
    handleLogout,
    isLoggingOut,
  };
};
