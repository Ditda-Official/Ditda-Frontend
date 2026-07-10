"use client";

import { useEffect, useState } from "react";

import { DotIndicator, RealityCard } from "@/features/landing";
import { type InformationType, REALITY_SECTION_CONTENT } from "@/widgets/landing";

const QUOTE_ROTATE_INTERVAL_MS = 3000;

interface RealitySectionProps {
  type: InformationType;
}

const RealitySection = ({ type }: RealitySectionProps) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const { label, headline, description, cards, quotes } = REALITY_SECTION_CONTENT[type];

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % quotes.length);
    }, QUOTE_ROTATE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [quotes.length]);

  return (
    <div className="flex flex-row justify-between bg-[#FBFBFE] px-31.5 py-14">
      <div className="flex w-110 flex-col gap-20">
        <div>
          <p className="text-heading2-sb text-main-main pb-3">{label}</p>
          <h1 className="pb-4.5 text-[32px] leading-[140%] font-semibold tracking-[-0.64px] text-black">
            {headline}
          </h1>
          <p className="text-gray-70 text-heading3-sb">{description}</p>
        </div>
        <div className="flex flex-col gap-4 whitespace-nowrap">
          <div key={quoteIndex} className="animate-quote-in">
            <p className="text-gray-90 text-heading2-sb pb-2">
              &ldquo;{quotes[quoteIndex].quote}&rdquo;
            </p>
            <p className="text-gray-60 text-caption1-m">{quotes[quoteIndex].author}</p>
          </div>
          <DotIndicator total={quotes.length} current={quoteIndex} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-7">
        {cards.map((card, index) => (
          <RealityCard key={card.title} {...card} active={index === quoteIndex} />
        ))}
      </div>
    </div>
  );
};

export default RealitySection;
