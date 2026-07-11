"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { getDDay } from "@/features/designer/home";
import { ClockIcon } from "@/shared/assets/icons";
import { useUploadedFiles } from "@/shared/lib/hooks/useUploadedFiles";
import Button from "@/shared/ui/Button";
import FileDragAndDrop from "@/shared/ui/FileDragAndDrop";
import FileUpload from "@/shared/ui/FileUpload";
import Modal from "@/shared/ui/modal/Modal";
import Tag from "@/shared/ui/Tag";

type SubmitCommission = {
  id: number;
  title: string;
  firstDraftDeadline: string;
  finalDeadline: string;
};

const MAX_FILE_COUNT = 9;

const submitCommissions: SubmitCommission[] = [
  {
    id: 1,
    title: "해커스톡 왕초보 영어 - 누구누",
    firstDraftDeadline: "2026.07.16 11:59pm",
    finalDeadline: "2026.07.30 11:59pm",
  },
  {
    id: 2,
    title: "해커스톡 왕초보 영어 - 누구누누구누누구누",
    firstDraftDeadline: "2026.07.15 11:59pm",
    finalDeadline: "2026.07.29 11:59pm",
  },
  {
    id: 3,
    title: "해커스톡 왕초보 영어 - 누구누누구누누구누누구누누구누누구누누구누누구누",
    firstDraftDeadline: "2026.05.16 11:59pm",
    finalDeadline: "2026.05.30 11:59pm",
  },
  {
    id: 4,
    title: "해커스톡 왕초보 영어 - 누구누",
    firstDraftDeadline: "2026.07.23 11:59pm",
    finalDeadline: "2026.08.06 11:59pm",
  },
  {
    id: 5,
    title: "해커스톡 왕초보 영어 - 누구누",
    firstDraftDeadline: "2026.07.30 11:59pm",
    finalDeadline: "2026.08.13 11:59pm",
  },
];

const formatDeadlineDate = (deadline: string) => {
  const dateMatch = deadline.match(/^(\d{4})[.-](\d{1,2})[.-](\d{1,2})/);

  if (!dateMatch) return deadline;

  const [, year, month, day] = dateMatch;

  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
};

const DeadlineItem = ({ label, deadline }: { label: string; deadline: string }) => {
  return (
    <div className="flex items-center gap-1.5">
      <p className="text-heading2-sb text-gray-80">
        {label}: {formatDeadlineDate(deadline)}
      </p>
      <Tag variant="default" label={getDDay(deadline)} />
    </div>
  );
};

const Page = () => {
  const { commissionId } = useParams<{ commissionId: string }>();
  const router = useRouter();
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const selectedCommission =
    submitCommissions.find(item => String(item.id) === commissionId) ?? submitCommissions[0];
  const { uploadedFiles, handleFilesAdded, handleRemove } = useUploadedFiles();

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
        <div className="flex w-full flex-col items-start gap-3">
          <h1 className="text-title2-sb text-gray-80 w-full">{selectedCommission.title}</h1>

          <div className="flex items-center gap-2">
            <ClockIcon className="text-gray-80 size-6 shrink-0" />
            <div className="flex items-center gap-4">
              <DeadlineItem label="1차 마감" deadline={selectedCommission.firstDraftDeadline} />
              <DeadlineItem label="최종 마감" deadline={selectedCommission.finalDeadline} />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-3">
          <div className="border-gray-20 rounded-8 flex items-center border bg-white p-1">
            <Button type="button" variant="small_secondary" className="w-fit">
              파일 제출하기
            </Button>
            <Button
              type="button"
              variant="small_tertiary"
              className="hover:bg-gray-10 w-fit border-0 bg-white"
            >
              외주 내용 확인
            </Button>
          </div>

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
        </div>

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
