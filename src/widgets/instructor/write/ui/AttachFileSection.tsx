"use client";

import { useWriteFormStore } from "@/features/instructor/write";
import { useUploadedFiles } from "@/shared/lib/hooks/useUploadedFiles";
import FileDragAndDrop from "@/shared/ui/FileDragAndDrop";
import FileUpload from "@/shared/ui/FileUpload";
import TextField from "@/shared/ui/input/TextField";

const AttachFileSection = () => {
  const { materialFiles, setMaterialFiles, materialDescription, setMaterialDescription } =
    useWriteFormStore();
  const { uploadedFiles, handleFilesAdded, handleRemove } = useUploadedFiles(
    materialFiles,
    setMaterialFiles,
  );

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
          <FileDragAndDrop onFilesAdded={handleFilesAdded} />
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
    </div>
  );
};

export default AttachFileSection;
