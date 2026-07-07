"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import type { CurrentRevisionDetail } from "@/features/instructor/revision";
import {
  getCurrentRevisionDetail,
  postFinalizeDraft,
  postRevisionRequest,
} from "@/features/instructor/revision";
import Button from "@/shared/ui/Button";
import Modal from "@/shared/ui/modal/Modal";
import { RevisionCategorySection, RevisionCommentSection } from "@/widgets/instructor/revision";
import {
  MAX_SELECTABLE_COUNT,
  REVISION_CATEGORY_TO_CODE,
  type RevisionCategoryLabel,
} from "@/widgets/instructor/revision/config/revision";

const Page = () => {
  const router = useRouter();
  const { commissionId } = useParams<{ commissionId: string }>();
  const [revisionDetail, setRevisionDetail] = useState<CurrentRevisionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [comments, setComments] = useState<Record<string, string>>({});
  const [isFinalizeModalOpen, setIsFinalizeModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);

  useEffect(() => {
    getCurrentRevisionDetail(commissionId)
      .then(setRevisionDetail)
      .finally(() => setIsLoading(false));
  }, [commissionId]);

  const isFinalizeActive = selectedCategories.length === 0;
  const isSubmitActive =
    !isSubmitting &&
    selectedCategories.length > 0 &&
    selectedCategories.every(category => (comments[category] ?? "").trim().length > 0);

  const handleToggleCategory = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(selected => selected !== category);
      }
      if (prev.length >= MAX_SELECTABLE_COUNT) {
        return prev;
      }
      return [...prev, category];
    });
  };

  const handleChangeComment = (category: string, value: string) => {
    setComments(prev => ({ ...prev, [category]: value }));
  };

  const handleCloseFinalizeModal = () => {
    setIsFinalizeModalOpen(false);
  };

  const handleConfirmFinalize = async () => {
    if (isFinalizing || !revisionDetail) return;

    setIsFinalizing(true);
    try {
      await postFinalizeDraft(commissionId, revisionDetail.draft.draftId);
      setIsFinalizeModalOpen(false);
      router.push("/instructor");
    } catch {
      setIsFinalizing(false);
    }
  };

  const handleSubmitRevision = async () => {
    if (!isSubmitActive) return;

    setIsSubmitting(true);
    try {
      await postRevisionRequest(commissionId, {
        categories: selectedCategories.map(category => ({
          category: REVISION_CATEGORY_TO_CODE[category as RevisionCategoryLabel],
          comment: comments[category] ?? "",
        })),
      });
      router.push("/instructor");
    } catch {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return null;
  if (!revisionDetail) return notFound();

  return (
    <div className="mx-auto flex w-235 flex-col items-center pt-16 pb-19.5">
      <h1 className="text-title2-sb w-full py-4 pb-8 text-left text-black">
        {revisionDetail.title}
      </h1>
      <div className="flex flex-col gap-10">
        <RevisionCategorySection
          commissionId={commissionId}
          draftId={revisionDetail.draft.draftId}
          draftTitle={revisionDetail.title}
          thumbnailUrl={revisionDetail.draft.thumbnailUrl}
          designerComment={revisionDetail.draft.designerComment}
          remainingRevisionCount={revisionDetail.currentRevisionCount}
          maxRevisionCount={revisionDetail.maxRevisionCount}
          selectedCategories={selectedCategories}
          onToggleCategory={handleToggleCategory}
        />
        <RevisionCommentSection
          comments={comments}
          selectedCategories={selectedCategories}
          onChangeComment={handleChangeComment}
        />
        <div className="flex w-full flex-row justify-end gap-4">
          <Button
            className="w-fit"
            variant={isFinalizeActive ? "medium_primary" : "medium_disabled"}
            onClick={isFinalizeActive ? () => setIsFinalizeModalOpen(true) : undefined}
          >
            최종 시안으로 선택하기
          </Button>
          <Button
            className="w-fit"
            variant={isSubmitActive ? "medium_primary" : "medium_disabled"}
            onClick={isSubmitActive ? handleSubmitRevision : undefined}
          >
            수정사항 전달하기
          </Button>
        </div>
      </div>
      <Modal
        isOpen={isFinalizeModalOpen}
        type="double"
        title={"최종 시안으로 선택하시겠습니까?"}
        description={"현재 디자인을 최종시안으로 선택하시면 \n더 이상 수정을 요청할 수 없습니다."}
        confirmLabel="확인"
        cancelLabel="취소"
        onConfirm={handleConfirmFinalize}
        onCancel={handleCloseFinalizeModal}
        onClose={handleCloseFinalizeModal}
      />
    </div>
  );
};

export default Page;
