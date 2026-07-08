"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import landingTitle from "@/shared/assets/images/landing/landing_title.png";
import { PurpleLogo } from "@/shared/assets/logos";
import Button from "@/shared/ui/Button";
import Header from "@/shared/ui/Header";

const Page = () => {
  const router = useRouter();

  return (
    <>
      <Header variant="landing" />
      <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto">
        <div className="relative h-159.75 w-full">
          <Image src={landingTitle} alt="ditda" fill className="object-cover" priority />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <PurpleLogo className="h-6 w-19" />
            <div className="mt-2 text-center text-[52px] leading-[140%] font-semibold tracking-[-1.04px]">
              <p>
                <span className="font-bold text-white [text-shadow:0_0_10.2px_rgba(0,0,0,0.08)]">
                  디자인과 강의를
                </span>
                <span className="text-purple-60"> 잇다</span>
              </p>
              <p className="text-gray-90 -mt-2">
                새로운 무대로 <span className="text-purple-60">딛다</span>
              </p>
            </div>
            <Button
              variant="medium_primary"
              className="mt-15.5 w-auto px-8"
              onClick={() => router.push("/login")}
            >
              ditda 시작하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
