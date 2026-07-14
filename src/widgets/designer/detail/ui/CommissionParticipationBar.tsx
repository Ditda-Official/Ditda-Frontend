"use client";

import { useState } from "react";

import { postApplyCommission, postCancelCommission } from "@/features/designer/detail";
import Button from "@/shared/ui/Button";

interface CommissionParticipationBarProps {
  commissionId: number;
  baseAmount: number;
  maxAmount: number;
  applied: boolean;
}

const formatAmount = (amount: number) => `${amount.toLocaleString("ko-KR")}원`;

const RewardItem = ({ label, amount }: { label: string; amount: string }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-caption2-m text-gray-30">{label}</span>
      <strong className="text-heading2-sb text-white">{amount}</strong>
    </div>
  );
};

const CommissionParticipationBar = ({
  commissionId,
  baseAmount,
  maxAmount,
  applied,
}: CommissionParticipationBarProps) => {
  const [isApplied, setIsApplied] = useState(applied);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleParticipation = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      if (isApplied) {
        await postCancelCommission(commissionId);
      } else {
        await postApplyCommission(commissionId);
      }

      setIsApplied(current => !current);
    } catch {
      // 요청 실패 시 기존 참여 상태를 유지합니다.
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border-gray-70 bg-gray-80 shadow-banner rounded-8 flex w-full items-center justify-between border py-2 pr-3 pl-6">
      <div className="flex items-center gap-6">
        <RewardItem label="기본금" amount={formatAmount(baseAmount)} />
        <RewardItem label="최대 수령액" amount={formatAmount(maxAmount)} />
      </div>
      <Button
        type="button"
        variant={isSubmitting ? "medium_disabled" : "medium_primary"}
        className="w-60"
        disabled={isSubmitting}
        onClick={handleParticipation}
      >
        {isSubmitting ? "처리 중" : isApplied ? "취소하기" : "참여하기"}
      </Button>
    </div>
  );
};

export default CommissionParticipationBar;
