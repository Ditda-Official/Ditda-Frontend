import Image from "next/image";

import { ArrowRightIcon, BookIcon, UserTypeDesignerIcon } from "@/shared/assets/icons";
import designerGraphic from "@/shared/assets/images/landing/designer_graphic.png";
import { cn } from "@/shared/lib/utils/cn";

type ServiceIntroductionCardType = "designer" | "instructor";

const CONTENT: Record<
  ServiceIntroductionCardType,
  {
    label: string;
    description: string;
    graphic: typeof designerGraphic | null;
    backgroundClassName: string;
  }
> = {
  designer: {
    label: "디자이너",
    description: "견적 조율 부담 없이 안정적으로 외주를 받고 싶어요",
    graphic: designerGraphic,
    backgroundClassName: "bg-white",
  },
  instructor: {
    label: "강사",
    description: "쉽고 빠르게 다양한 시안을 받아보고 싶어요",
    graphic: null,
    backgroundClassName: "instructor-card-gradient",
  },
};

interface ServiceIntroductionCardProps {
  type: ServiceIntroductionCardType;
}

const ServiceIntroductionCard = ({ type }: ServiceIntroductionCardProps) => {
  const { label, description, graphic, backgroundClassName } = CONTENT[type];

  return (
    <div
      className={cn(
        "rounded-20 relative h-106.25 w-113.5 cursor-pointer overflow-hidden",
        backgroundClassName,
      )}
    >
      <div className="flex flex-row items-center gap-1 pt-9 pb-3.5 pl-9.5">
        <p className="text-gray-80 text-title2-sb">{label}</p>
        <ArrowRightIcon className="text-gray-90 flex size-6 justify-center" />
      </div>
      <p className="text-gray-80 text-heading2-m pl-9.5">{description}</p>
      {graphic ? (
        <Image
          src={graphic}
          alt={`${label}Graphic`}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
        />
      ) : (
        <div className="absolute bottom-0 left-4 flex flex-row items-end text-white">
          <UserTypeDesignerIcon className="size-50" />
          <BookIcon className="relative bottom-13 size-20.5 opacity-80" />
          <BookIcon className="relative bottom-21.25 size-20.5 opacity-50" />
          <BookIcon className="relative bottom-13 size-20.5 opacity-20" />
        </div>
      )}
    </div>
  );
};

export default ServiceIntroductionCard;
