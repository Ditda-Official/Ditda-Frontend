"use client";

import Link from "next/link";
import { useState } from "react";

import { EnterIcon, ProfileCircleIcon } from "@/assets/icons";
import { PurpleLogo } from "@/assets/logos";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <header className="bg-gray-5 flex h-16 w-full flex-row items-center justify-between px-10 py-4">
      <PurpleLogo className="h-5.75 w-18.5" />
      <div className="text-gray-80 text-body2-m hover:text-gray-90 flex cursor-pointer flex-row gap-16">
        <p>이용방식 안내</p>
        <p>1:1 문의하기</p>
        <p>FAQ</p>
      </div>
      {isLoggedIn ? (
        <button
          type="button"
          className="flex cursor-pointer flex-row items-center gap-2"
          onClick={() => setIsLoggedIn(false)}
        >
          <ProfileCircleIcon className="text-gray-70 hover:text-gray-80 size-8" />
          <span className="text-body2-m text-gray-80 hover:text-gray-90">내 계정</span>
        </button>
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
