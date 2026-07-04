import ImageCard from "@/shared/ui/ImageCard";

const ReferenceTab = () => {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <p className="text-gray-80 text-heading2-sb">디자인에 사용될 자료</p>
          <div className="scrollbar-hide flex flex-row gap-8 overflow-x-auto">
            {Array.from({ length: 5 }, (_, i) => (
              <ImageCard key={i} label={`자료 ${String(i + 1).padStart(2, "0")}`} />
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-gray-70 text-body1-sb border-gray-30 inline-block w-fit border-b pb-1">
            자료 정보
          </h3>
          <div className="text-gray-80 text-body1-m pt-3 pb-3">이건 이게 좋고요 저</div>
        </div>
      </div>
      <hr className="border-gray-20" />
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <p className="text-gray-80 text-heading2-sb">레퍼런스</p>
          <div className="scrollbar-hide flex flex-row gap-8 overflow-x-auto">
            {Array.from({ length: 5 }, (_, i) => (
              <ImageCard key={i} label={`레퍼런스 ${String(i + 1).padStart(2, "0")}`} />
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-gray-70 text-body1-sb border-gray-30 inline-block w-fit border-b pb-1">
            레퍼런스 참고사항
          </h3>
          <div className="text-gray-80 text-body1-m pt-3 pb-13">이건 이게 좋고요 저</div>
        </div>
      </div>
    </div>
  );
};

export default ReferenceTab;
