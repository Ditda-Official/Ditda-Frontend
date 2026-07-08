import { type InformationType, SEQUENCE_SECTION_CONTENT } from "../config/landing";

interface SequenceSectionProps {
  type: InformationType;
}

const SequenceSection = ({ type }: SequenceSectionProps) => {
  const content = SEQUENCE_SECTION_CONTENT[type];
  const steps = content.steps;

  return (
    <div className="flex flex-col gap-24 bg-[rgba(246,245,252,0.40)] px-31.5 py-20.5 text-center">
      <div>
        <h1 className="text-main-main text-heading2-sb pb-3">이용순서</h1>
        <h2 className="pb-8 text-[32px] leading-[140%] font-semibold tracking-[-0.64px] text-black">
          {content.headline}
        </h2>
        <h3 className="text-gray-70 text-heading3-m">{content.description}</h3>
      </div>
      <div className="grid grid-cols-[repeat(5,198px)] justify-center gap-x-8.75">
        {steps.map((step, index) => (
          <div key={step.title} className="flex flex-col items-center">
            <p className="text-purple-40 text-heading3-m pb-2.5">
              STEP {String(index + 1).padStart(2, "0")}
            </p>
            <p className="text-gray-90 text-heading1-sb">{step.title}</p>
          </div>
        ))}
        <div className="relative col-span-5 my-10 grid grid-cols-[repeat(5,198px)] items-center gap-x-8.75">
          <hr className="border-gray-60 absolute inset-x-0 top-1/2 -translate-y-1/2" />
          {steps.map(step => (
            <div
              key={step.title}
              className="bg-main-dark z-header relative mx-auto size-4.5 shrink-0 rounded-full"
            />
          ))}
        </div>
        {steps.map(step => (
          <p key={step.title} className="text-gray-80 text-body2-m text-center">
            {step.description}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SequenceSection;
