import { INFORMATION_SECTION_CONTENT, type InformationType } from "../config/landing";

export type { InformationType };

interface InformationSectionProps {
  type: InformationType;
}

const InformationSection = ({ type }: InformationSectionProps) => {
  const content = INFORMATION_SECTION_CONTENT[type];

  return (
    <div className="py-32 text-center">
      <h1 className="text-[34px] leading-[140%] font-semibold tracking-[-0.68px] text-black">
        {content.title}
      </h1>
      <h2 className="text-main-main pb-6 text-[40px] leading-[140%] font-semibold tracking-[-0.8px]">
        {content.highlight}
      </h2>
      <p className="text-gray-70 text-heading3-sb pb-3">{content.description}</p>
      <p className="text-gray-90 text-heading3-sb">{content.rule}</p>
    </div>
  );
};

export default InformationSection;
