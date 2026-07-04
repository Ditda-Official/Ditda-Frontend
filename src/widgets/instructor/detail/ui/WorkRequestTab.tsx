import { PAGE_OPTIONS } from "@/features/instructor/write";
import Chip from "@/shared/ui/Chip";
import TextField from "@/shared/ui/input/TextField";

const WorkRequestTab = () => {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-5">
        <h3 className="text-gray-70 text-caption1-sb">기본정보</h3>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-10">
            <p className="text-gray-70 text-heading3-sb">교재명</p>
            <p className="text-gray-80 text-heading3-sb">수학의 정석</p>
          </div>
          <div className="flex flex-row gap-10">
            <p className="text-gray-70 text-heading3-sb">강사명</p>
            <p className="text-gray-80 text-heading3-sb">한석원</p>
          </div>
          <div className="flex flex-row gap-10">
            <p className="text-gray-70 text-heading3-sb">과목명</p>
            <p className="text-gray-80 text-heading3-sb">수학</p>
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
          {PAGE_OPTIONS.map(label => (
            <Chip key={label} label={label} className="w-fit" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-6 pb-10">
          {PAGE_OPTIONS.map(label => (
            <div key={label} className="flex flex-col gap-2">
              <p className="text-body1-sb text-gray-80">
                {label} <span className="text-gray-70">레이아웃</span>
              </p>
              <TextField readOnly maxLength={150} value="" variant="white" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkRequestTab;
