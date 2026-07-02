"use client";

import { useState } from "react";

import {
  COMMISSION_FILE_TARGET,
  uploadCommissionFile,
  useWriteFormStore,
} from "@/features/instructor/write";
import { useUploadedFiles } from "@/shared/lib/hooks/useUploadedFiles";
import { isAllowedFileType, MAX_FILE_SIZE_BYTES } from "@/shared/lib/utils/file";
import FileDragAndDrop from "@/shared/ui/FileDragAndDrop";
import FileUpload from "@/shared/ui/FileUpload";
import TextField from "@/shared/ui/input/TextField";
import Modal from "@/shared/ui/modal/Modal";

const MAX_FILE_COUNT = 5;

const AttachFileSection = () => {
  const { materialFiles, setMaterialFiles, materialDescription, setMaterialDescription } =
    useWriteFormStore();
  const [isInvalidFileModalOpen, setIsInvalidFileModalOpen] = useState(false);
  const [isFileCountExceededModalOpen, setIsFileCountExceededModalOpen] = useState(false);
  const { uploadedFiles, handleFilesAdded, handleRemove } = useUploadedFiles(
    materialFiles,
    setMaterialFiles,
    file => uploadCommissionFile(file, COMMISSION_FILE_TARGET.MATERIAL),
    () => setIsInvalidFileModalOpen(true),
  );

  const handleValidatedFilesAdded = (files: File[]) => {
    const validFiles = files.filter(
      file => isAllowedFileType(file, [".png"]) && file.size <= MAX_FILE_SIZE_BYTES,
    );

    if (validFiles.length < files.length) {
      setIsInvalidFileModalOpen(true);
    }

    if (validFiles.length === 0) return;

    if (uploadedFiles.length + validFiles.length > MAX_FILE_COUNT) {
      setIsFileCountExceededModalOpen(true);
      return;
    }

    handleFilesAdded(validFiles);
  };

  return (
    <div className="rounded-12 focus-within:border-gray-40 flex flex-col border border-transparent bg-white p-6">
      <div className={`flex flex-col ${uploadedFiles.length > 0 ? "gap-7" : "gap-6"}`}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-gray-90 text-heading1-sb">디자인에 사용할 자료(선택)</h1>
            <h2 className="text-gray-70 text-body2-m">
              선생님 사진, 학원 로고 등 직접적으로 사용될 자료들을 첨부해주세요.
            </h2>
          </div>
          <FileDragAndDrop onFilesAdded={handleValidatedFilesAdded} />
        </div>
        <div className="flex flex-col gap-6">
          {uploadedFiles.length > 0 && (
            <div className="flex flex-col gap-2">
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
          <div className="flex flex-col gap-2">
            <p className="text-gray-70 text-body1-sb">
              자료별 추가 설명
              {uploadedFiles.length > 0 && <span className="text-red-main">*</span>}
            </p>
            <TextField
              placeholder={
                "첨부한 파일에 대한 설명을 반드시 작성해주세요.\nex) 1번 사진은 선생님 개인 프로필 사진입니다. 저자의 말 페이지에 활용해주세요"
              }
              value={materialDescription}
              onChange={e => setMaterialDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={isInvalidFileModalOpen}
        type="single"
        title="파일 업로드를 실패하였습니다"
        description={"해당 파일의 업로드를 실패했습니다.\n용량과 확장자를 확인해주세요."}
        confirmLabel="확인"
        onConfirm={() => setIsInvalidFileModalOpen(false)}
        onClose={() => setIsInvalidFileModalOpen(false)}
      />
      <Modal
        isOpen={isFileCountExceededModalOpen}
        type="single"
        title={"업로드 가능 파일 개수를\n초과했습니다"}
        description={
          "파일은 30MB 씩 총 5개까지 업로드가 가능합니다.\n기존의 업로드한 파일을 삭제 후 업로드해주세요."
        }
        confirmLabel="닫기"
        onConfirm={() => setIsFileCountExceededModalOpen(false)}
        onClose={() => setIsFileCountExceededModalOpen(false)}
      />
    </div>
  );
};

export default AttachFileSection;
