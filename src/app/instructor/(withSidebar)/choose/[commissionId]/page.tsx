"use client";

import { notFound, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

import type { CommissionDrafts } from "@/features/instructor/choose";
import { getCommissionDrafts, postSelectDraft } from "@/features/instructor/choose";
import Button from "@/shared/ui/Button";
import Modal from "@/shared/ui/modal/Modal";
import { DraftCheckSection } from "@/widgets/instructor/choose";

interface PageProps {
  params: Promise<{ commissionId: string }>;
}

const Page = ({ params }: PageProps) => {
  const router = useRouter();
  const { commissionId } = use(params);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [commission, setCommission] = useState<CommissionDrafts | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isChooseModalOpen, setIsChooseModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getCommissionDrafts(commissionId)
      .then(setCommission)
      .finally(() => setIsLoading(false));
  }, [commissionId]);

  const handleConfirmSelect = async () => {
    if (isSubmitting || selectedIndex === null || !commission) return;

    const draftId = commission.drafts[selectedIndex]?.draftId;
    if (draftId === undefined) return;

    setIsSubmitting(true);
    try {
      await postSelectDraft(commissionId, draftId);
      setIsChooseModalOpen(false);
      router.push("/instructor");
    } catch {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return null;
  if (!commission) return notFound();

  return (
    <div className="mx-auto flex w-235 flex-col items-center gap-10 pt-16">
      <div>
        <h1 className="text-title2-sb mb-6.5 w-full py-4 text-left text-black">
          {commission.title}
        </h1>
        <DraftCheckSection
          commissionId={commissionId}
          drafts={commission.drafts}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />
      </div>
      <Button
        variant={selectedIndex !== null ? "medium_primary" : "medium_disabled"}
        className="w-fit self-end"
        onClick={selectedIndex !== null ? () => setIsChooseModalOpen(true) : undefined}
      >
        제출하기
      </Button>
      <Modal
        isOpen={isChooseModalOpen}
        type="double"
        title="해당 시안으로 선택하시겠습니까?"
        description={"해당 시안을 선택하면 \n다른 시안으로 변경할 수 없습니다."}
        confirmLabel="확인"
        cancelLabel="취소"
        onConfirm={handleConfirmSelect}
        onCancel={() => setIsChooseModalOpen(false)}
        onClose={() => setIsChooseModalOpen(false)}
      />
    </div>
  );
};

export default Page;
