"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { postApplyCommission, postCancelCommission } from "@/features/designer/detail";
import Button from "@/shared/ui/Button";
import Modal from "@/shared/ui/modal/Modal";

interface CommissionParticipationBarProps {
  commissionId: number;
  baseAmount: number;
  maxAmount: number;
  applied: boolean;
  applicationDeadline: string;
}

const formatAmount = (amount: number) => `${amount.toLocaleString("ko-KR")}원`;

const isCancellationLockPeriod = (applicationDeadline: string) => {
  const [year, month, day] = applicationDeadline.split("-").map(Number);

  if (!year || !month || !day) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cancellationLockDate = new Date(year, month - 1, day);

  if (
    cancellationLockDate.getFullYear() !== year ||
    cancellationLockDate.getMonth() !== month - 1 ||
    cancellationLockDate.getDate() !== day
  ) {
    return false;
  }

  cancellationLockDate.setDate(cancellationLockDate.getDate() - 4);

  return today >= cancellationLockDate;
};

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
  applicationDeadline,
}: CommissionParticipationBarProps) => {
  const router = useRouter();
  const [isApplied, setIsApplied] = useState(applied);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isParticipationModalOpen, setIsParticipationModalOpen] = useState(false);
  const isCancellationDisabled = isApplied && isCancellationLockPeriod(applicationDeadline);

  const handleParticipationClick = async () => {
    if (isSubmitting) return;

    if (!isApplied) {
      setIsParticipationModalOpen(true);
      return;
    }

    setIsSubmitting(true);

    try {
      await postCancelCommission(commissionId);
      setIsApplied(false);
    } catch {
      // 요청 실패 시 기존 참여 상태를 유지
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmParticipation = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await postApplyCommission(commissionId);
      setIsApplied(true);
      setIsParticipationModalOpen(false);
      router.push("/designer/search");
    } catch {
      // 요청 실패 시 모달을 유지해 다시 시도
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseParticipationModal = () => {
    if (!isSubmitting) setIsParticipationModalOpen(false);
  };

  return (
    <>
      <div className="border-gray-70 bg-gray-80 shadow-banner rounded-8 flex w-full items-center justify-between border py-2 pr-3 pl-6">
        <div className="flex items-center gap-6">
          <RewardItem label="기본금" amount={formatAmount(baseAmount)} />
          <RewardItem label="최대 수령액" amount={formatAmount(maxAmount)} />
        </div>
        <Button
          type="button"
          variant={isSubmitting || isCancellationDisabled ? "medium_disabled" : "medium_primary"}
          className="w-60"
          disabled={isSubmitting || isCancellationDisabled}
          onClick={handleParticipationClick}
        >
          {isSubmitting ? "처리 중" : isApplied ? "취소하기" : "참여하기"}
        </Button>
      </div>

      <Modal
        isOpen={isParticipationModalOpen}
        type="double"
        title="해당 외주에 참여하시겠습니까?"
        description={
          "참여 취소는 현재외주-외주정보에서 가능합니다.\n참여 취소는 참여 마감일 5일 전까지 가능합니다."
        }
        confirmLabel="확인"
        cancelLabel="취소"
        onConfirm={handleConfirmParticipation}
        onCancel={handleCloseParticipationModal}
        onClose={handleCloseParticipationModal}
      />
    </>
  );
};

export default CommissionParticipationBar;
