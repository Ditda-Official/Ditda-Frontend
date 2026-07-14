"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { MAX_DRAFT_FILE_COUNT, postDraft, uploadDraftFile } from "@/features/designer/submit";
import { getApiErrorMessage } from "@/shared/api/client";
import { getCommissionDetail } from "@/shared/api/commission";
import type { CommissionDetail } from "@/shared/api/commissionTypes";
import { useUploadedFiles } from "@/shared/lib/hooks/useUploadedFiles";
import { isAllowedFileType, MAX_FILE_SIZE_BYTES } from "@/shared/lib/utils/file";
import Button from "@/shared/ui/Button";
import FileDragAndDrop from "@/shared/ui/FileDragAndDrop";
import FileUpload from "@/shared/ui/FileUpload";
import Modal from "@/shared/ui/modal/Modal";
import { CommissionDetailSection, CommissionHeader } from "@/widgets/designer/detail";

type SubmitView = "file" | "detail";
type FeedbackModal = {
  title: string;
  description: string;
};

const Page = () => {
  const { commissionId } = useParams<{ commissionId: string }>();
  const router = useRouter();
  const [selectedView, setSelectedView] = useState<SubmitView>("file");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState<FeedbackModal | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commission, setCommission] = useState<CommissionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { uploadedFiles, handleFilesAdded, handleRemove } = useUploadedFiles(
    undefined,
    undefined,
    uploadDraftFile,
    () => {
      setFeedbackModal({
        title: "파일 업로드에 실패했습니다",
        description: "파일 업로드 중 문제가 발생했습니다.\n잠시 후 다시 시도해 주세요.",
      });
    },
  );
  const isFileSubmitView = selectedView === "file";
  const isSubmitDisabled =
    uploadedFiles.length === 0 ||
    uploadedFiles.some(file => file.isUploading || !file.key) ||
    isSubmitting;

  useEffect(() => {
    let isMounted = true;

    getCommissionDetail(commissionId)
      .then(result => {
        if (isMounted) setCommission(result);
      })
      .catch(() => {
        if (isMounted) setCommission(null);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [commissionId]);

  if (isLoading) return null;
  if (!commission) return notFound();

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

    if (validFiles.length === 0) return;

    if (uploadedFiles.length + validFiles.length > MAX_DRAFT_FILE_COUNT) {
      setFeedbackModal({
        title: "업로드 가능 파일 개수를 초과했습니다",
        description:
          "시안 파일은 최대 9개까지 업로드할 수 있습니다.\n기존 파일을 삭제한 후 다시 시도해 주세요.",
      });
      return;
    }

    handleFilesAdded(validFiles);
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
      await postDraft(commissionId, { keys });
      router.push("/designer");
    } catch (error) {
      const message = (await getApiErrorMessage(error)) || "잠시 후 다시 시도해 주세요.";

      setFeedbackModal({
        title: "시안 제출에 실패했습니다",
        description: message,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="mx-auto flex w-235 flex-col items-end gap-9 pt-16 pb-19.5">
        <CommissionHeader
          title={commission.title}
          firstDraftDeadline={commission.dateInfo.firstDraftDeadline}
          finalDeadline={commission.dateInfo.finalDeadline}
        />

        <div className="flex w-full flex-col items-start gap-3">
          <div className="border-gray-20 rounded-8 flex items-center border bg-white p-1">
            <Button
              type="button"
              variant={isFileSubmitView ? "small_secondary" : "small_tertiary"}
              className={isFileSubmitView ? "w-fit" : "hover:bg-gray-10 w-fit border-0 bg-white"}
              onClick={() => setSelectedView("file")}
            >
              파일 제출하기
            </Button>
            <Button
              type="button"
              variant={isFileSubmitView ? "small_tertiary" : "small_secondary"}
              className={isFileSubmitView ? "hover:bg-gray-10 w-fit border-0 bg-white" : "w-fit"}
              onClick={() => setSelectedView("detail")}
            >
              외주 내용 확인
            </Button>
          </div>

          {isFileSubmitView ? (
            <section className="rounded-12 flex w-full flex-col items-start gap-8 bg-white p-6">
              <div className="flex flex-col items-start gap-2">
                <h2 className="text-heading1-sb text-gray-90">시안 제출하기</h2>
                <p className="text-body2-m text-gray-70">최대 9개, 각각 30MB</p>
              </div>

              <div className="flex w-full flex-col items-start gap-7">
                <FileDragAndDrop onFilesAdded={handleValidatedFilesAdded} />

                {uploadedFiles.length > 0 && (
                  <div className="flex w-full flex-col gap-2">
                    {uploadedFiles.map(file => (
                      <FileUpload
                        key={file.id}
                        fileName={file.fileName}
                        fileSize={file.fileSize}
                        isUploading={file.isUploading}
                        onRemove={() => handleRemove(file.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          ) : (
            <CommissionDetailSection commission={commission} initialSelectedIndex={1} />
          )}
        </div>

        {isFileSubmitView && (
          <Button
            type="button"
            variant={isSubmitDisabled ? "medium_disabled" : "medium_primary"}
            className="w-fit"
            disabled={isSubmitDisabled}
            onClick={() => setIsSubmitModalOpen(true)}
          >
            {isSubmitting ? "제출 중" : "제출하기"}
          </Button>
        )}
      </div>

      <Modal
        isOpen={isSubmitModalOpen}
        type="double"
        title="시안을 제출하시겠습니까?"
        description={
          "시안 제출 후에는 수정이 어려울 수 있습니다.\n제출 전 모든 내용을 반드시 확인해 주세요."
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
    </>
  );
};

export default Page;
