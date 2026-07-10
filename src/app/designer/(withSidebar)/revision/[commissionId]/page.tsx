"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/shared/ui/Button";
import Modal from "@/shared/ui/modal/Modal";
import { modifyingCommissionItems } from "@/widgets/designer/home/ui/ModifyingCommissionsSection";
import { RevisionFileSubmitSection, RevisionRequestSection } from "@/widgets/designer/revision";

const Page = () => {
  const router = useRouter();
  const { commissionId } = useParams<{ commissionId: string }>();
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const selectedCommission =
    modifyingCommissionItems.find(item => String(item.commissionId) === commissionId) ??
    modifyingCommissionItems[0];
  const draftFileUrls = ["/images/thumbnail_mock.jpg"];

  const handleFilesAdded = (files: File[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleRemoveFile = (fileIndex: number) => {
    setUploadedFiles(prev => prev.filter((_, index) => index !== fileIndex));
  };

  const handleCloseSubmitModal = () => {
    setIsSubmitModalOpen(false);
  };

  const handleConfirmSubmit = () => {
    setIsSubmitModalOpen(false);
    router.push("/designer");
  };

  return (
    <div className="mx-auto flex w-235 flex-col items-center pt-16 pb-19.5">
      <h1 className="text-title2-sb w-full py-4 pb-8 text-left text-black">수정 요청 사항 확인</h1>
      <div className="flex w-235 flex-col items-end gap-10">
        <RevisionRequestSection
          title={selectedCommission.title}
          finalDeadline={selectedCommission.finalDeadline}
          remainingRevisionCount={selectedCommission.remainingRevisionCount}
          draftFileUrls={draftFileUrls}
        />
        <RevisionFileSubmitSection
          uploadedFiles={uploadedFiles}
          onFilesAdded={handleFilesAdded}
          onRemoveFile={handleRemoveFile}
        />

        <Button
          type="button"
          variant="medium_primary"
          className="w-fit"
          onClick={() => setIsSubmitModalOpen(true)}
        >
          제출하기
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
    </div>
  );
};

export default Page;
