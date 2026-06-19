"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { EnterIcon, ProfileCircleIcon } from "@/shared/assets/icons";
import { PurpleLogo } from "@/shared/assets/logos";

type UserRole = "designer" | "instructor";

interface AuthState {
  isLoggedIn: boolean;
  role: UserRole | null;
}

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";
const USER_ROLE_COOKIE_NAME = "userRole";

const ROLE_ACCOUNT_PATH: Record<UserRole, string> = {
  designer: "/designer",
  instructor: "/instructor/my",
};

const getCookieValue = (name: string) => {
  if (typeof document === "undefined") return undefined;

  const cookie = document.cookie.split("; ").find(cookie => cookie.startsWith(`${name}=`));

  if (cookie == null) return undefined;

  return decodeURIComponent(cookie.slice(name.length + 1));
};

const normalizeRole = (role?: string): UserRole | null => {
  const normalizedRole = role?.toLowerCase();

  if (normalizedRole === "designer" || normalizedRole === "instructor") {
    return normalizedRole;
  }

  return null;
};

const Header = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    role: null,
  });

  useEffect(() => {
    const syncAuthState = () => {
      const accessToken = getCookieValue(ACCESS_TOKEN_COOKIE_NAME);
      const role = normalizeRole(getCookieValue(USER_ROLE_COOKIE_NAME));

      setAuthState({
        isLoggedIn: accessToken != null && role != null,
        role,
      });
    };

    syncAuthState();
    window.addEventListener("focus", syncAuthState);

    return () => window.removeEventListener("focus", syncAuthState);
  }, []);

  const accountHref = useMemo(() => {
    if (authState.role == null) return "/login";

    return ROLE_ACCOUNT_PATH[authState.role];
  }, [authState.role]);

  return (
    <header className="bg-gray-5 flex h-16 w-full flex-row items-center justify-between px-10 py-4">
      <PurpleLogo className="h-5.75 w-18.5" />
      <div className="text-gray-80 text-body2-m hover:text-gray-90 flex cursor-pointer flex-row gap-16">
        <p>이용방식 안내</p>
        <p>1:1 문의하기</p>
        <p>FAQ</p>
      </div>
      {authState.isLoggedIn ? (
        <Link href={accountHref} className="flex cursor-pointer flex-row items-center gap-2">
          <ProfileCircleIcon className="text-gray-70 hover:text-gray-80 size-8" />
          <span className="text-body2-m text-gray-80 hover:text-gray-90">내 계정</span>
        </Link>
      ) : (
        <div className="flex flex-row gap-8">
          <Link href="/login" className="flex cursor-pointer flex-row items-center gap-1">
            <ProfileCircleIcon className="text-gray-70 hover:text-gray-80 size-6" />
            <span className="text-body2-m text-gray-80 hover:text-gray-90">로그인</span>
          </Link>
          <Link href="/signup" className="flex cursor-pointer flex-row items-center gap-1">
            <EnterIcon className="text-gray-70 hover:text-gray-80 size-6" />
            <span className="text-body2-m text-gray-80 hover:text-gray-90">회원가입</span>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
