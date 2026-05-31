import { ArrowRightIcon, MatchingOffIcon, MatchingOnIcon } from "@/assets/icons";
import Tag from "@/components/common/Tag";

const DraftSubmissionStatusRow = () => {
  return (
    <div className="flex h-15 cursor-pointer items-center py-3">
      <div className="flex w-full flex-row justify-between">
        <div className="flex flex-row items-center gap-6">
          <Tag variant="default" label="D-33" />
          <p className="text-gray-70 text-body2-m w-20">교재 외지/내지</p>
          <div className="flex flex-row items-center">
            <p className="text-gray-80 text-heading3-m">해커스톡 왕초보 영어 - 누구누구</p>
            <ArrowRightIcon className="text-gray-90 size-5" />
          </div>
        </div>
        <div className="flex w-53 flex-row items-center justify-between py-0.5">
          <div className="flex flex-row">
            <MatchingOnIcon className="size-8" />
            <MatchingOnIcon className="size-8" />
            <MatchingOffIcon className="size-8" />
            <MatchingOffIcon className="size-8" />
            <MatchingOffIcon className="size-8" />
          </div>
          <p className="text-heading3-sb text-gray-60">
            (<span className="text-main-main">2</span>/3)
          </p>
        </div>
      </div>
    </div>
  );
};

export default DraftSubmissionStatusRow;
