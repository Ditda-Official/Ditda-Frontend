import Button from "@/shared/ui/Button";

interface CommissionParticipationBarProps {
  basePrice: string;
  maxReward: string;
}

const RewardItem = ({ label, amount }: { label: string; amount: string }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-caption2-m text-gray-30">{label}</span>
      <strong className="text-heading2-sb text-white">{amount}</strong>
    </div>
  );
};

const CommissionParticipationBar = ({ basePrice, maxReward }: CommissionParticipationBarProps) => {
  return (
    <div className="border-gray-70 bg-gray-80 shadow-banner rounded-8 flex w-full items-center justify-between border py-2 pr-3 pl-6">
      <div className="flex items-center gap-6">
        <RewardItem label="기본금" amount={basePrice} />
        <RewardItem label="최대 수령액" amount={maxReward} />
      </div>
      <Button type="button" variant="medium_primary" className="w-60">
        참여하기
      </Button>
    </div>
  );
};

export default CommissionParticipationBar;
