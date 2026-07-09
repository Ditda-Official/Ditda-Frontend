"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { getDDay } from "@/features/designer/home";
import Button from "@/shared/ui/Button";
import FileDragAndDrop from "@/shared/ui/FileDragAndDrop";
import FileUpload from "@/shared/ui/FileUpload";
import TextField from "@/shared/ui/input/TextField";
import DraftModal from "@/shared/ui/modal/DraftModal";
import Modal from "@/shared/ui/modal/Modal";
import Tag from "@/shared/ui/Tag";
import Thumbnail from "@/shared/ui/Thumbnail";
import { modifyingCommissionItems } from "@/widgets/designer/home/ui/ModifyingCommissionsSection";

const formatDate = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);

  return `${year}년 ${month}월 ${day}일`;
};

const formatFileSize = (size: number) => {
  const sizeInMB = size / (1024 * 1024);

  return `${sizeInMB.toFixed(1)}MB`;
};

const Page = () => {
  const router = useRouter();
  const { commissionId } = useParams<{ commissionId: string }>();
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
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
        <section className="rounded-12 flex w-full flex-col gap-6 bg-white p-6">
          <div className="border-gray-20 flex flex-col gap-3 border-b pb-4">
            <div className="flex items-center gap-6">
              <p className="text-body1-sb text-gray-70 w-25">외주 정보</p>
              <p className="text-body1-m min-w-0 truncate text-black">{selectedCommission.title}</p>
            </div>

            <div className="flex items-center gap-6">
              <p className="text-body1-sb text-gray-70 w-25">수정 마감일</p>
              <div className="flex items-center gap-2">
                <p className="text-body1-m text-black">
                  {formatDate(selectedCommission.finalDeadline)}
                </p>
                <Tag variant="default" label={getDDay(selectedCommission.finalDeadline)} />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <p className="text-body1-sb text-gray-70 w-25">남은 수정 횟수</p>
              <p className="text-body1-m text-main-main">
                {selectedCommission.remainingRevisionCount}회
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-7">
            <div className="flex w-223 items-start gap-10">
              <Thumbnail
                className="h-63.75 w-62.5 shrink-0"
                onDetailClick={() => setIsDraftModalOpen(true)}
              />
              {/* 아래 수정 텍스트는 임시로 넣음 이후 데이터 가져올것 */}
              <div className="bg-purple-5 border-purple-10 rounded-12 flex min-h-37 flex-1 flex-col gap-4 border px-6 py-5">
                <h2 className="text-body1-sb text-main-main">레이아웃 수정</h2>
                <p className="text-body2-m text-gray-80">
                  지난번 수정사항 중 이러이러한 거 이렇게 바꾸랬는데 진심 너무 구려서 안하고 이렇게
                  하는것을 제안합니다. 어케 생각하세요 글고 이거이거는 수정 안하는게 나을떼. 지난번
                  수정사항 중 이러이러한 거 이렇게 바꾸랬는데 진심 너무 구려서 안하고 이렇게
                  하는것을 제안합니다....
                </p>
              </div>
            </div>

            <div className="flex h-45 w-223 flex-col gap-2">
              <p className="text-body1-sb text-gray-70">추가 코멘트 작성</p>
              <TextField placeholder="강사님이 요청하신 수정사항에 대한 코멘트가 있다면 작성해주세요." />
            </div>
          </div>
        </section>

        <section className="rounded-12 flex w-full flex-col items-start gap-8 bg-white p-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-heading1-sb text-gray-90">수정파일 제출하기</h2>
            <p className="text-body2-m text-gray-70">수정된 파일을 제출해주세요.</p>
          </div>
          <div className="flex w-full flex-col gap-7">
            <FileDragAndDrop onFilesAdded={handleFilesAdded} />
            {uploadedFiles.length > 0 && (
              <div className="flex w-full flex-col gap-2">
                {uploadedFiles.map((file, index) => (
                  <FileUpload
                    key={`${file.name}-${file.lastModified}-${index}`}
                    fileName={file.name}
                    fileSize={formatFileSize(file.size)}
                    isUploading={false}
                    onRemove={() => handleRemoveFile(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <Button
          type="button"
          variant="medium_primary"
          className="w-fit"
          onClick={() => setIsSubmitModalOpen(true)}
        >
          제출하기
        </Button>
      </div>
      <DraftModal
        isOpen={isDraftModalOpen}
        onClose={() => setIsDraftModalOpen(false)}
        title={selectedCommission.title}
        fileUrls={draftFileUrls}
      />
      <Modal
        isOpen={isSubmitModalOpen}
        type="double"
        title="수정 파일을 제출하시겠습니까?"
        description={"@@@ 경고경고\n경고성 멘트~~"}
        confirmLabel="확인"
        cancelLabel="취소?"
        onConfirm={handleConfirmSubmit}
        onCancel={handleCloseSubmitModal}
        onClose={handleCloseSubmitModal}
      />
    </div>
  );
};

export default Page;
