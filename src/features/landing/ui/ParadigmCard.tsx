import { ReactNode } from "react";

interface ParadigmCardProps {
  number: string;
  tag: string;
  title: string;
  description: ReactNode;
}

const ParadigmCard = ({ number, tag, title, description }: ParadigmCardProps) => {
  return (
    <div className="border-main-bright rounded-20 w-94.25 border bg-[rgba(246,245,252,0.60)] px-6 py-11.5 text-start">
      <div className="text-body1-sb rounded-2 bg-purple-10 mb-8.75 flex w-fit flex-row gap-2 pr-1 pl-1">
        <span className="text-main-main">{number}</span>
        <span className="text-main-dark">{tag}</span>
      </div>
      <p className="text-heading1-sb pb-4 text-black">{title}</p>
      <p className="text-body2-m text-gray-70">{description}</p>
    </div>
  );
};

export default ParadigmCard;
