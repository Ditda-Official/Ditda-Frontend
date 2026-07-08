"use client";

import { useEffect, useState } from "react";

import { InterviewIndicator, RealityCard } from "@/features/landing";
import { INTERVIEW_QUOTES, REALITY_CARDS } from "@/widgets/landing";

const QUOTE_ROTATE_INTERVAL_MS = 3000;

const RealitySection = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % INTERVIEW_QUOTES.length);
    }, QUOTE_ROTATE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-row justify-between bg-[#FBFBFE] px-31.5 py-14">
      <div className="flex w-110 flex-col gap-20">
        <div>
          <p className="text-heading2-sb text-main-main pb-3">디자이너 시장의 현실</p>
          <h1 className="pb-4.5 text-[32px] leading-[140%] font-semibold tracking-[-0.64px] text-black">
            실력은 충분한데,
            <br />
            시작할 외주가 없는 시대
          </h1>
          <p className="text-gray-70 text-heading3-sb">
            현재 학생 디자이너•초기 프리랜서가 마주하는 숫자입니다.
          </p>
        </div>
        <div className="flex flex-col gap-4 whitespace-nowrap">
          <div key={quoteIndex} className="animate-quote-in">
            <p className="text-gray-90 text-heading2-sb pb-2">
              &ldquo;{INTERVIEW_QUOTES[quoteIndex].quote}&rdquo;
            </p>
            <p className="text-gray-60 text-caption1-m">{INTERVIEW_QUOTES[quoteIndex].author}</p>
          </div>
          <InterviewIndicator total={INTERVIEW_QUOTES.length} current={quoteIndex} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-7">
        {REALITY_CARDS.map((card, index) => (
          <RealityCard key={card.title} {...card} active={index === quoteIndex} />
        ))}
      </div>
    </div>
  );
};

export default RealitySection;
