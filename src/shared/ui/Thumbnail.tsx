import Image from "next/image";
import type { CSSProperties } from "react";

import { SearchIcon } from "@/shared/assets/icons";

interface ThumbnailProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}

const Thumbnail = ({
  src = "/images/thumbnail_mock.jpg",
  alt = "썸네일",
  width = 250,
  height = 255,
}: ThumbnailProps) => {
  return (
    <div
      className="rounded-12 bg-gray-20 group relative h-(--thumbnail-h) w-(--thumbnail-w) overflow-hidden"
      style={{ "--thumbnail-w": `${width}px`, "--thumbnail-h": `${height}px` } as CSSProperties}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${width}px`}
        loading="eager"
        className="object-cover"
      />
      <div className="bg-overlay-hover backdrop-blur-hover absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
      <button
        type="button"
        className="bg-overlay-button backdrop-blur-button text-body2-m rounded-12 absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-row items-center gap-2.5 px-4 py-2 text-white opacity-0 transition-opacity group-hover:opacity-100"
      >
        자세히 보기
        <SearchIcon className="size-5" />
      </button>
    </div>
  );
};

export default Thumbnail;
