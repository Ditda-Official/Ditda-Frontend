import { PAGE_API_MAP, PAGE_OPTIONS, PAGE_TYPE_LABEL_MAP } from "@/features/designer/detail";
import type { CommissionCategoryDetail } from "@/shared/api/commissionTypes";
import Chip from "@/shared/ui/Chip";
import TextField from "@/shared/ui/input/TextField";

interface WorkRequestTabProps {
  categoryDetail: CommissionCategoryDetail;
}

const WorkRequestTab = ({ categoryDetail }: WorkRequestTabProps) => {
  const { textbookName, instructorName, subject, requiredPages } = categoryDetail;
  const requiredPageTypes = new Set(requiredPages.map(page => page.pageType));

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-5">
        <h3 className="text-gray-90 text-heading2-sb">기본정보</h3>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-10">
            <p className="text-gray-70 text-body1-sb">교재명</p>
            <p className="text-gray-80 text-body1-sb">{textbookName}</p>
          </div>
          <div className="flex flex-row gap-10">
            <p className="text-gray-70 text-body1-sb">강사명</p>
            <p className="text-gray-80 text-body1-sb">{instructorName}</p>
          </div>
          <div className="flex flex-row gap-10">
            <p className="text-gray-70 text-body1-sb">과목명</p>
            <p className="text-gray-80 text-body1-sb">{subject}</p>
          </div>
        </div>
      </div>
      <hr className="border-gray-20" />
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <p className="text-gray-80 text-heading2-sb">요청된 페이지</p>
          <p className="text-gray-70 text-body2-m">의뢰자가 제작을 요청한 페이지입니다</p>
        </div>
        <div className="flex flex-row flex-wrap gap-2">
          {PAGE_OPTIONS.map(label => {
            const isSelected = requiredPageTypes.has(PAGE_API_MAP[label]);

            return (
              <Chip
                key={label}
                label={label}
                className="w-fit"
                isSelected={isSelected}
                disableHover
              />
            );
          })}
        </div>
        {requiredPages.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 pb-10">
            {requiredPages.map(({ pageType, description }) => (
              <div key={pageType} className="flex flex-col gap-2">
                <p className="text-body1-sb text-gray-80">
                  {PAGE_TYPE_LABEL_MAP[pageType]} <span className="text-gray-70">레이아웃</span>
                </p>
                <TextField
                  readOnly
                  maxLength={150}
                  value={description}
                  placeholder="요청사항이 없습니다"
                  variant="white"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-60 text-body1-sb pb-10">요청된 페이지가 없습니다</p>
        )}
      </div>
    </div>
  );
};

export default WorkRequestTab;
