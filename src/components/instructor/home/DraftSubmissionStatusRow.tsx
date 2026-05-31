import { ArrowRightIcon } from "@/assets/icons";
import Tag from "@/components/common/Tag";

const DraftSubmissionStatusRow = () => {
  return (
    <div className="flex h-15 items-center py-3">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-6">
          <Tag variant="default" label="D-33" />
          <p className="text-gray-70 text-body2-m w-20">교재 외지/내지</p>
          <div className="flex flex-row items-center">
            <p className="text-gray-80 text-heading3-m">해커스톡 왕초보 영어 - 누구누구</p>
            <ArrowRightIcon className="text-gray-90 size-5" />
          </div>
        </div>
        {/* 오른쪽 영역 */}
      </div>
    </div>
  );
};

export default DraftSubmissionStatusRow;
