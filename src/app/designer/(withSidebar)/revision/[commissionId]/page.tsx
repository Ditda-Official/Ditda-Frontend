"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import type { CurrentRevisionDetail } from "@/features/designer/revision";
import {
  getCurrentRevisionDetail,
  postRevision,
  uploadRevisionFile,
} from "@/features/designer/revision";
import { getApiErrorMessage } from "@/shared/api/client";
import { useUploadedFiles } from "@/shared/lib/hooks/useUploadedFiles";
import { isAllowedFileType, MAX_FILE_SIZE_BYTES } from "@/shared/lib/utils/file";
import Button from "@/shared/ui/Button";
import Modal from "@/shared/ui/modal/Modal";
import { RevisionFileSubmitSection, RevisionRequestSection } from "@/widgets/designer/revision";

type FeedbackModal = {
  title: string;
  description: string;
};

const Page = () => {
  const router = useRouter();
  const { commissionId } = useParams<{ commissionId: string }>();
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState<FeedbackModal | null>(null);
  const [revisionDetail, setRevisionDetail] = useState<CurrentRevisionDetail | null>(null);
  const [additionalComment, setAdditionalComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { uploadedFiles, handleFilesAdded, handleRemove } = useUploadedFiles(
    undefined,
    undefined,
    uploadRevisionFile,
    () => {
      setFeedbackModal({
        title: "파일 업로드에 실패했습니다",
        description: "파일 업로드 중 문제가 발생했습니다.\n잠시 후 다시 시도해 주세요.",
      });
    },
  );
  const isSubmitDisabled =
    uploadedFiles.length === 0 ||
    uploadedFiles.some(file => file.isUploading || !file.key) ||
    isSubmitting;

  useEffect(() => {
    let isMounted = true;

    getCurrentRevisionDetail(commissionId)
      .then(result => {
        if (isMounted) setRevisionDetail(result);
      })
      .catch(() => {
        if (isMounted) setRevisionDetail(null);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [commissionId]);

  const handleValidatedFilesAdded = (files: File[]) => {
    const validFiles = files.filter(
      file => isAllowedFileType(file, [".png"]) && file.size <= MAX_FILE_SIZE_BYTES,
    );

    if (validFiles.length < files.length) {
      setFeedbackModal({
        title: "업로드할 수 없는 파일이 있습니다",
        description: "PNG 파일만 업로드할 수 있으며,\n각 파일은 30MB 이하여야 합니다.",
      });
    }

    if (validFiles.length > 0) {
      handleFilesAdded(validFiles);
    }
  };

  const handleCloseSubmitModal = () => {
    setIsSubmitModalOpen(false);
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitModalOpen(false);

    const keys = uploadedFiles
      .map(file => file.key)
      .filter((key): key is string => typeof key === "string");

    if (keys.length !== uploadedFiles.length || keys.length === 0) return;

    setIsSubmitting(true);

    try {
      const designerComment = additionalComment.trim();

      await postRevision(commissionId, {
        keys,
        ...(designerComment && { designerComment }),
      });
      router.push("/designer");
    } catch (error) {
      const message = (await getApiErrorMessage(error)) || "잠시 후 다시 시도해 주세요.";

      setFeedbackModal({
        title: "수정 파일 제출에 실패했습니다",
        description: message,
      });
      setIsSubmitting(false);
    }
  };

  if (isLoading) return null;
  if (!revisionDetail) return notFound();

  const draftFileUrls = revisionDetail.targetDraft.thumbnailUrl
    ? [revisionDetail.targetDraft.thumbnailUrl]
    : [];

  return (
    <div className="mx-auto flex w-235 flex-col items-center pt-16 pb-19.5">
      <h1 className="text-title2-sb w-full py-4 pb-8 text-left text-black">수정 요청 사항 확인</h1>
      <div className="flex w-235 flex-col items-end gap-10">
        <RevisionRequestSection
          title={revisionDetail.title}
          finalDeadline={revisionDetail.revisionDeadline}
          remainingRevisionCount={revisionDetail.remainingRevisionCount}
          revisionItems={revisionDetail.revisionItems}
          thumbnailUrl={revisionDetail.targetDraft.thumbnailUrl}
          draftFileUrls={draftFileUrls}
          additionalComment={additionalComment}
          onChangeAdditionalComment={setAdditionalComment}
        />
        <RevisionFileSubmitSection
          uploadedFiles={uploadedFiles}
          onFilesAdded={handleValidatedFilesAdded}
          onRemoveFile={handleRemove}
        />

        <Button
          type="button"
          variant={isSubmitDisabled ? "medium_disabled" : "medium_primary"}
          className="w-fit"
          disabled={isSubmitDisabled}
          onClick={() => setIsSubmitModalOpen(true)}
        >
          {isSubmitting ? "제출 중" : "제출하기"}
        </Button>
      </div>
      <Modal
        isOpen={isSubmitModalOpen}
        type="double"
        title="수정 파일을 제출하시겠습니까?"
        description={
          "제출이 완료되면 파일을 수정하거나 교체할 수 없습니다.\n현재 파일로 제출하시겠습니까?"
        }
        confirmLabel="확인"
        cancelLabel="취소"
        onConfirm={handleConfirmSubmit}
        onCancel={handleCloseSubmitModal}
        onClose={handleCloseSubmitModal}
      />
      <Modal
        isOpen={feedbackModal !== null}
        type="single"
        title={feedbackModal?.title ?? ""}
        description={feedbackModal?.description}
        confirmLabel="확인"
        onConfirm={() => setFeedbackModal(null)}
        onClose={() => setFeedbackModal(null)}
      />
    </div>
  );
};

export default Page;
