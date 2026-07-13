import { getDDay } from "@/features/designer/home";
import { ClockIcon } from "@/shared/assets/icons";
import Tag from "@/shared/ui/Tag";

interface CommissionHeaderProps {
  title: string;
  firstDraftDeadline: string;
  finalDeadline: string;
}

const formatDeadlineDate = (deadline: string) => {
  const dateMatch = deadline.match(/^(\d{4})[.-](\d{1,2})[.-](\d{1,2})/);

  if (!dateMatch) return deadline;

  const [, year, month, day] = dateMatch;

  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
};

const DeadlineItem = ({ label, deadline }: { label: string; deadline: string }) => {
  return (
    <div className="flex items-center gap-1.5">
      <p className="text-body1-sb text-gray-80">
        {label}: {formatDeadlineDate(deadline)}
      </p>
      <Tag variant="default" label={getDDay(deadline)} />
    </div>
  );
};

const CommissionHeader = ({ title, firstDraftDeadline, finalDeadline }: CommissionHeaderProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-3">
      <h1 className="text-title2-sb w-full text-black">{title}</h1>

      <div className="flex items-center gap-2">
        <ClockIcon className="text-gray-80 size-6 shrink-0" />
        <div className="flex items-center gap-4">
          <DeadlineItem label="1차 마감" deadline={firstDraftDeadline} />
          <DeadlineItem label="최종 마감" deadline={finalDeadline} />
        </div>
      </div>
    </div>
  );
};

export default CommissionHeader;
