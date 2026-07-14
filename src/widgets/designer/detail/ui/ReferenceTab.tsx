import "swiper/css";
import "swiper/css/free-mode";

import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import type { CommissionFile } from "@/shared/api/commissionTypes";
import ImageCard from "@/shared/ui/ImageCard";

interface ReferenceTabProps {
  files: CommissionFile[];
}

interface ImageCardGalleryProps {
  urls: string[];
  labelPrefix: string;
  emptyText: string;
}

const getFilesByKind = (files: CommissionFile[], fileKind: CommissionFile["fileKind"]) =>
  files.filter(file => file.fileKind === fileKind);

const ImageCardGallery = ({ urls, labelPrefix, emptyText }: ImageCardGalleryProps) => {
  if (urls.length === 0) {
    return (
      <div className="flex h-70 w-full items-center justify-center">
        <span className="text-heading3-m text-gray-60">{emptyText}</span>
      </div>
    );
  }

  if (urls.length === 1) {
    return (
      <div className="flex w-full justify-center">
        <ImageCard url={urls[0]} label={`${labelPrefix} 01`} />
      </div>
    );
  }

  return (
    <Swiper modules={[FreeMode]} freeMode spaceBetween={32} slidesPerView="auto" className="w-full">
      {urls.map((url, i) => (
        <SwiperSlide key={url} className="w-fit!">
          <ImageCard url={url} label={`${labelPrefix} ${String(i + 1).padStart(2, "0")}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const ReferenceTab = ({ files }: ReferenceTabProps) => {
  const materials = getFilesByKind(files, "MATERIAL");
  const references = getFilesByKind(files, "REFERENCE");

  const materialUrls = materials.flatMap(file => file.fileUrls);
  const referenceUrls = references.flatMap(file => file.fileUrls);
  const materialDescription = materials.map(file => file.description).join("\n");
  const referenceDescription = references.map(file => file.description).join("\n");

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <p className="text-gray-80 text-heading2-sb">디자인에 사용될 자료</p>
          <ImageCardGallery
            urls={materialUrls}
            labelPrefix="자료"
            emptyText="등록된 자료가 없습니다"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-gray-70 text-body1-sb border-gray-30 inline-block w-fit border-b pb-1">
            자료 정보
          </h3>
          <div className="text-gray-80 text-body1-m pt-3 pb-3 whitespace-pre-line">
            {materialDescription || "작성된 자료 정보가 없습니다"}
          </div>
        </div>
      </div>
      <hr className="border-gray-20" />
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <p className="text-gray-80 text-heading2-sb">레퍼런스</p>
          <ImageCardGallery
            urls={referenceUrls}
            labelPrefix="레퍼런스"
            emptyText="등록된 레퍼런스가 없습니다"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-gray-70 text-body1-sb border-gray-30 inline-block w-fit border-b pb-1">
            레퍼런스 참고사항
          </h3>
          <div className="text-gray-80 text-body1-m pt-3 pb-13 whitespace-pre-line">
            {referenceDescription || "작성된 레퍼런스 참고사항이 없습니다"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferenceTab;
