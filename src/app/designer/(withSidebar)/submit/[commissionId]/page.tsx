"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { useUploadedFiles } from "@/shared/lib/hooks/useUploadedFiles";
import Button from "@/shared/ui/Button";
import FileDragAndDrop from "@/shared/ui/FileDragAndDrop";
import FileUpload from "@/shared/ui/FileUpload";
import Modal from "@/shared/ui/modal/Modal";
import { CommissionDetailSection, CommissionHeader } from "@/widgets/designer/detail";
import { designerDetailCommissions } from "@/widgets/designer/detail/config/commission";

const MAX_FILE_COUNT = 9;
type SubmitView = "file" | "detail";

const Page = () => {
  const { commissionId } = useParams<{ commissionId: string }>();
  const router = useRouter();
  const [selectedView, setSelectedView] = useState<SubmitView>("file");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const commission =
    designerDetailCommissions.find(item => String(item.id) === commissionId) ??
    designerDetailCommissions[0];
  const { uploadedFiles, handleFilesAdded, handleRemove } = useUploadedFiles();
  const isFileSubmitView = selectedView === "file";

  const handleLimitedFilesAdded = (files: File[]) => {
    const remainingCount = MAX_FILE_COUNT - uploadedFiles.length;

    if (remainingCount <= 0) return;

    handleFilesAdded(files.slice(0, remainingCount));
  };

  const handleCloseSubmitModal = () => {
    setIsSubmitModalOpen(false);
  };

  const handleConfirmSubmit = () => {
    setIsSubmitModalOpen(false);
    router.push("/designer");
  };

  return (
    <>
      <div className="mx-auto flex w-235 flex-col items-end gap-9 pt-16 pb-19.5">
        <CommissionHeader
          title={commission.title}
          firstDraftDeadline={commission.firstDraftDeadline}
          finalDeadline={commission.finalDeadline}
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
                <FileDragAndDrop onFilesAdded={handleLimitedFilesAdded} />

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
            variant="medium_primary"
            className="w-fit"
            onClick={() => setIsSubmitModalOpen(true)}
          >
            제출하기
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
    </>
  );
};

export default Page;
