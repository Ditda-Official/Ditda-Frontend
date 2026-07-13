import { PAGE_API_MAP, PAGE_OPTIONS, PAGE_TYPE_LABEL_MAP } from "@/features/instructor/write";
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
    <div className="flex flex-col items-start gap-7">
      <section className="flex w-full flex-col items-start gap-5">
        <h3 className="text-caption1-sb text-gray-70">기본정보</h3>
        <div className="flex flex-col gap-3">
          {[
            ["교재명", textbookName],
            ["강사명", instructorName],
            ["과목명", subject],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-10">
              <p className="text-heading3-sb text-gray-70 w-14">{label}</p>
              <p className="text-heading3-sb text-gray-80">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-gray-20 w-full" />

      <section className="flex w-full flex-col items-start gap-8">
        <div className="flex flex-col items-start gap-2">
          <h3 className="text-heading2-sb text-gray-90">필수 페이지</h3>
          <p className="text-body2-m text-gray-70">
            작업물에 필수적으로 들어가야 할 페이지 및 레이아웃입니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          {PAGE_OPTIONS.map(page => (
            <Chip
              key={page}
              label={page}
              className="w-fit"
              isSelected={requiredPageTypes.has(PAGE_API_MAP[page])}
              disableHover
            />
          ))}
        </div>
      </section>

      <hr className="border-gray-20 w-full" />

      <section className="flex w-full flex-col items-start gap-8">
        <h3 className="text-heading2-sb text-gray-90">레이아웃 및 디자인 요청사항</h3>
        <div className="grid w-full grid-cols-2 gap-6">
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
      </section>
    </div>
  );
};

export default WorkRequestTab;
