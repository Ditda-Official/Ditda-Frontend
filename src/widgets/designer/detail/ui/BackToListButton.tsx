"use client";

import { useRouter } from "next/navigation";

import { ArrowLeftIcon } from "@/shared/assets/icons";

const BackToListButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="flex cursor-pointer items-center gap-1"
      onClick={() => router.push("/designer/search")}
    >
      <ArrowLeftIcon className="text-gray-70 size-4.5" />
      <span className="text-caption1-m text-gray-70">목록으로 돌아가기</span>
    </button>
  );
};

export default BackToListButton;
