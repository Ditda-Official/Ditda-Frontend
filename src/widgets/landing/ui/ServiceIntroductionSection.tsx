import { ServiceIntroductionCard } from "@/features/landing";

import type { InformationType } from "./InformationSection";

interface ServiceIntroductionSectionProps {
  onSelect: (type: InformationType) => void;
}

const ServiceIntroductionSection = ({ onSelect }: ServiceIntroductionSectionProps) => {
  return (
    <div className="bg-gray-5 h-fit w-full">
      <h1 className="text-title1-b text-gray-90 pt-20 pb-1 text-center">서비스 소개</h1>
      <h2 className="text-gray-80 text-heading1-sb pb-12 text-center">
        나에게 맞는 ditda 서비스 소개를 확인해보세요
      </h2>
      <div className="flex flex-row justify-center gap-5 pb-22">
        <ServiceIntroductionCard type="designer" onClick={() => onSelect("designer")} />
        <ServiceIntroductionCard type="instructor" onClick={() => onSelect("instructor")} />
      </div>
    </div>
  );
};

export default ServiceIntroductionSection;
