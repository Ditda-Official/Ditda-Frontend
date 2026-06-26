"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { EnterIcon, ProfileCircleIcon } from "@/shared/assets/icons";
import { PurpleLogo } from "@/shared/assets/logos";
import {
  type ClientUserRole,
  getClientProfileImageUrl,
  getClientUserRoleFromAccessToken,
  normalizeClientUserRole,
} from "@/shared/lib/auth/client";

interface AuthState {
  isLoggedIn: boolean;
  role: ClientUserRole | null;
  profileImageUrl: string | null;
}

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";
const USER_ROLE_COOKIE_NAME = "userRole";

const ROLE_ACCOUNT_PATH: Record<ClientUserRole, string> = {
  designer: "/designer/my",
  instructor: "/instructor/my",
};

const getCookieValue = (name: string) => {
  if (typeof document === "undefined") return undefined;

  const cookie = document.cookie.split("; ").find(cookie => cookie.startsWith(`${name}=`));

  if (cookie == null) return undefined;

  return decodeURIComponent(cookie.slice(name.length + 1));
};

const Header = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    role: null,
    profileImageUrl: null,
  });

  useEffect(() => {
    const syncAuthState = () => {
      const accessToken = getCookieValue(ACCESS_TOKEN_COOKIE_NAME);
      const roleFromCookie = normalizeClientUserRole(getCookieValue(USER_ROLE_COOKIE_NAME));
      const role =
        roleFromCookie ??
        (accessToken != null ? getClientUserRoleFromAccessToken(accessToken) : null);

      setAuthState({
        isLoggedIn: accessToken != null && role != null,
        role,
        profileImageUrl: getClientProfileImageUrl() ?? null,
      });
    };

    syncAuthState();
    window.addEventListener("focus", syncAuthState);

    return () => window.removeEventListener("focus", syncAuthState);
  }, []);

  const pathname = usePathname();

  const logoHref = useMemo(() => {
    if (!authState.isLoggedIn) return "/";
    if (pathname.startsWith("/instructor")) return "/instructor";
    if (pathname.startsWith("/designer")) return "/designer";
    return "/";
  }, [authState.isLoggedIn, pathname]);

  const accountHref = useMemo(() => {
    if (authState.role == null) return "/login";

    return ROLE_ACCOUNT_PATH[authState.role];
  }, [authState.role]);

  return (
    <header className="bg-gray-5 flex h-16 w-full flex-row items-center justify-between px-10 py-4">
      <Link href={logoHref}>
        <PurpleLogo className="h-5.75 w-18.5" />
      </Link>
      <div className="text-gray-80 text-body2-m hover:text-gray-90 flex cursor-pointer flex-row gap-16">
        <Link href="/">이용방식 안내</Link>
        <a href="https://forms.gle/zkPkTpi5STsWdcc67" target="_blank" rel="noopener noreferrer">
          1:1 문의하기
        </a>
        <a
          href="https://friendly-case-06a.notion.site/ditda-FAQ-388fb8159b3381929564d7e4e908a64f"
          target="_blank"
          rel="noopener noreferrer"
        >
          FAQ
        </a>
      </div>
      {authState.isLoggedIn ? (
        <Link href={accountHref} className="flex cursor-pointer flex-row items-center gap-2">
          {authState.profileImageUrl != null ? (
            <Image
              src={authState.profileImageUrl}
              alt="프로필"
              width={32}
              height={32}
              className="size-8 rounded-full object-cover"
            />
          ) : (
            <ProfileCircleIcon className="text-gray-70 hover:text-gray-80 size-8" />
          )}
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
