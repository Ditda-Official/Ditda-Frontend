import Image from "next/image";

import {
  SERVICE_INTRODUCTION_CONTENT,
  type ServiceIntroductionCardType,
} from "@/features/landing/config/serviceIntroduction";
import { ArrowRightIcon, BookIcon, UserTypeDesignerIcon } from "@/shared/assets/icons";
import { cn } from "@/shared/lib/utils/cn";

interface ServiceIntroductionCardProps {
  type: ServiceIntroductionCardType;
  onClick?: () => void;
}

const ServiceIntroductionCard = ({ type, onClick }: ServiceIntroductionCardProps) => {
  const { label, description, graphic, backgroundClassName } = SERVICE_INTRODUCTION_CONTENT[type];

  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-20 relative h-106.25 w-113.5 cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-105",
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
