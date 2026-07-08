"use client";

import { useState } from "react";

import { Footer } from "@/features/landing";
import Header from "@/shared/ui/Header";
import {
  DescriptionSection,
  InformationSection,
  type InformationType,
  ParadigmSection,
  RealitySection,
  RewardSection,
  SequenceSection,
  ServiceIntroductionSection,
  TitleSection,
} from "@/widgets/landing";

const Page = () => {
  const [informationType, setInformationType] = useState<InformationType | null>(null);

  return (
    <>
      <Header variant="landing" />
      <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto">
        <TitleSection />
        <DescriptionSection />
        <ServiceIntroductionSection onSelect={setInformationType} />
        {informationType && <InformationSection type={informationType} />}
        {informationType && (
          <RealitySection key={`reality-${informationType}`} type={informationType} />
        )}
        {informationType && (
          <ParadigmSection key={`paradigm-${informationType}`} type={informationType} />
        )}
        {informationType && (
          <SequenceSection key={`sequence-${informationType}`} type={informationType} />
        )}
        {informationType === "designer" && <RewardSection />}
        <Footer />
      </div>
    </>
  );
};

export default Page;
