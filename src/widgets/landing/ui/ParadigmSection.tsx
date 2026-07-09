import { ParadigmCard } from "@/features/landing";
import { type InformationType, PARADIGM_SECTION_CONTENT } from "@/widgets/landing";

interface ParadigmSectionProps {
  type: InformationType;
}

const ParadigmSection = ({ type }: ParadigmSectionProps) => {
  const content = PARADIGM_SECTION_CONTENT[type];

  return (
    <div className="flex flex-col gap-10 px-31.5 py-20.5 text-center">
      <div>
        <h1 className="text-heading2-sb text-main-main pb-3">
          ditda가 제공하는 새로운 외주의 패러다임
        </h1>
        <h2 className="pb-8 text-[32px] leading-[140%] font-semibold tracking-[-0.64px] text-black">
          {content.headline}
        </h2>
        <h3 className="text-gray-70 text-heading3-m">{content.description}</h3>
      </div>
      <div className="mx-auto flex w-297 flex-row justify-between">
        {content.cards.map((card, index) => (
          <ParadigmCard
            key={card.title}
            number={String(index + 1).padStart(2, "0")}
            tag={card.tag}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ParadigmSection;
