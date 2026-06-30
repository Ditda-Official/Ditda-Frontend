"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronRightIcon } from "@/shared/assets/icons";
import notFoundImage from "@/shared/assets/images/not_found.png";

const NotFound = () => {
  const pathname = usePathname();

  const homeHref = pathname.startsWith("/instructor")
    ? "/instructor"
    : pathname.startsWith("/designer")
      ? "/designer"
      : "/";

  return (
    <div className="notfound-gradient flex w-full flex-1 flex-col items-center justify-center">
      <Image
        src={notFoundImage}
        alt="404"
        width={465}
        height={234}
        className="h-58.5 w-116.25"
        priority
      />
      <p className="text-heading2-m text-gray-80 pt-11 pb-26 text-center">
        죄송합니다. 페이지를 찾을 수 없습니다
        <br />
        존재하지 않는 주소를 입력하셨거나,
        <br />
        요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다
      </p>
      <Link
        href={homeHref}
        className="border-b-gray-80 flex cursor-pointer flex-row items-center gap-2 border-b py-1"
      >
        <p className="text-gray-80 text-heading1-sb">홈으로 이동</p>
        <ChevronRightIcon className="flex size-6 shrink-0 items-center text-black" />
      </Link>
    </div>
  );
};

export default NotFound;
