"use client";

import { useWriteFormStore } from "@/features/instructor/write";
import { useUploadedFiles } from "@/shared/lib/hooks/useUploadedFiles";
import FileDragAndDrop from "@/shared/ui/FileDragAndDrop";
import FileUpload from "@/shared/ui/FileUpload";
import TextField from "@/shared/ui/input/TextField";

const ReferenceSection = () => {
  const { referenceFiles, setReferenceFiles, referenceDescription, setReferenceDescription } =
    useWriteFormStore();
  const { uploadedFiles, handleFilesAdded, handleRemove } = useUploadedFiles(
    referenceFiles,
    setReferenceFiles,
  );

  return (
    <div className="rounded-12 focus-within:border-gray-40 flex flex-col border border-transparent bg-white p-6">
      <div className={`flex flex-col ${uploadedFiles.length > 0 ? "gap-7" : "gap-6"}`}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-gray-90 text-heading1-sb">레퍼런스(선택)</h1>
            <h2 className="text-gray-70 text-body2-m">
              디자이너가 참고하길 원하는 스타일이 있다면 레퍼런스 파일을 첨부해주세요.
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
              레퍼런스별 추가 설명
              {uploadedFiles.length > 0 && <span className="text-red-main">*</span>}
            </p>
            <TextField
              placeholder={
                "첨부한 파일에 대한 설명을 반드시 작성해주세요.\nex) 1번 사진의 색감처럼 깔끔했으면 좋겠어요."
              }
              value={referenceDescription}
              onChange={e => setReferenceDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferenceSection;
