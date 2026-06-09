import Image from "next/image";

import { SearchIcon } from "@/shared/assets/icons";
import { cn } from "@/shared/lib/utils/cn";

interface ThumbnailProps {
  src?: string;
  alt?: string;
  className?: string;
  onDetailClick?: () => void;
}

const Thumbnail = ({
  src = "/images/thumbnail_mock.jpg",
  alt = "썸네일",
  className,
  onDetailClick,
}: ThumbnailProps) => {
  return (
    <div
      className={cn(
        "rounded-12 bg-gray-20 group relative h-full w-full overflow-hidden",
        className,
      )}
    >
      <Image src={src} alt={alt} fill sizes="250px" loading="eager" className="object-cover" />
      <div className="bg-overlay-hover backdrop-blur-hover absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
      <button
        type="button"
        onClick={onDetailClick}
        className="backdrop-blur-button text-body2-m rounded-12 absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-row items-center gap-2.5 bg-white/18 px-4 py-2 whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100"
      >
        자세히 보기
        <SearchIcon className="size-5" />
      </button>
    </div>
  );
};

export default Thumbnail;
