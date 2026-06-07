import { getDDay } from "@/features/instructor/home/lib/getDDay";
import { CATEGORY_DISPLAY_MAP, DraftSubmissionItem } from "@/features/instructor/home/model/home";
import { ArrowRightIcon, MatchingOffIcon, MatchingOnIcon } from "@/shared/assets/icons";
import Tag from "@/shared/ui/Tag";

const DraftSubmissionStatusRow = ({ item }: { item: DraftSubmissionItem }) => {
  const { title, category, draftSubmission, firstDraftDeadline } = item;
  const { submitted, total } = draftSubmission;
  const categoryLabel = CATEGORY_DISPLAY_MAP[category] ?? category;

  return (
    <div className="border-b-gray-10 hover:bg-gray-5 flex h-15 cursor-pointer items-center border-b py-3 transition-colors duration-150">
      <div className="flex w-full flex-row justify-between">
        <div className="flex flex-row items-center gap-6">
          <Tag variant="default" label={getDDay(firstDraftDeadline)} />
          <p className="text-gray-70 text-body2-m w-20">{categoryLabel}</p>
          <div className="flex flex-row items-center">
            <p className="text-gray-80 text-heading3-m max-w-75 truncate">{title}</p>
            <ArrowRightIcon className="text-gray-90 size-5" />
          </div>
        </div>
        <div className="flex w-53 flex-row items-center justify-between py-0.5">
          <div className="flex flex-row">
            {Array.from({ length: submitted }).map((_, i) => (
              <MatchingOnIcon key={i} className="size-8" />
            ))}
            {Array.from({ length: total - submitted }).map((_, i) => (
              <MatchingOffIcon key={i} className="size-8" />
            ))}
          </div>
          <p className="text-heading3-sb text-gray-60">
            (<span className="text-main-main">{submitted}</span>/{total})
          </p>
        </div>
      </div>
    </div>
  );
};

export default DraftSubmissionStatusRow;
