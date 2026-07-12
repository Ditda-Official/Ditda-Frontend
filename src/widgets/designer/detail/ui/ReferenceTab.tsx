import ImageCard from "@/shared/ui/ImageCard";

type ReferenceInfo = {
  materialImages: string[];
  materialInfo: string;
  referenceImages: string[];
  referenceInfo: string;
};

interface ReferenceTabProps {
  referenceInfo: ReferenceInfo;
}

const UnderlineTitle = ({ children }: { children: string }) => {
  return (
    <h3 className="border-gray-30 text-body1-sb text-gray-70 inline-block w-fit border-b pb-1">
      {children}
    </h3>
  );
};

const ImageGallery = ({ images, labelPrefix }: { images: string[]; labelPrefix: string }) => {
  return (
    <div className="flex w-full justify-center gap-8">
      {images.map((url, index) => (
        <ImageCard
          key={`${labelPrefix}-${index}`}
          url={url}
          label={`${labelPrefix} ${String(index + 1).padStart(2, "0")}`}
        />
      ))}
    </div>
  );
};

const ReferenceTab = ({ referenceInfo }: ReferenceTabProps) => {
  return (
    <div className="flex flex-col items-start gap-7">
      <section className="flex w-full flex-col items-start gap-5">
        <div className="flex w-full flex-col items-start gap-4">
          <h3 className="text-heading2-sb text-gray-80">디자인에 사용될 자료</h3>
          <ImageGallery images={referenceInfo.materialImages} labelPrefix="자료" />
        </div>
        <div className="flex w-full flex-col items-start gap-3">
          <UnderlineTitle>자료 정보</UnderlineTitle>
          <p className="text-body1-m text-gray-80">{referenceInfo.materialInfo}</p>
        </div>
      </section>

      <hr className="border-gray-20 w-full" />

      <section className="flex w-full flex-col items-start gap-5 pb-10">
        <div className="flex w-full flex-col items-start gap-4">
          <h3 className="text-heading2-sb text-gray-80">레퍼런스</h3>
          <ImageGallery images={referenceInfo.referenceImages} labelPrefix="레퍼런스" />
        </div>
        <div className="flex w-full flex-col items-start gap-3">
          <UnderlineTitle>레퍼런스 참고사항</UnderlineTitle>
          <p className="text-body1-m text-gray-80">{referenceInfo.referenceInfo}</p>
        </div>
      </section>
    </div>
  );
};

export default ReferenceTab;
