"use client";

import FileDragAndDrop from "@/shared/ui/FileDragAndDrop";
import FileUpload from "@/shared/ui/FileUpload";

const formatFileSize = (size: number) => {
  const sizeInMB = size / (1024 * 1024);

  return `${sizeInMB.toFixed(1)}MB`;
};

interface RevisionFileSubmitSectionProps {
  uploadedFiles: File[];
  onFilesAdded: (files: File[]) => void;
  onRemoveFile: (fileIndex: number) => void;
}

const RevisionFileSubmitSection = ({
  uploadedFiles,
  onFilesAdded,
  onRemoveFile,
}: RevisionFileSubmitSectionProps) => {
  return (
    <section className="rounded-12 flex w-full flex-col items-start gap-8 bg-white p-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-heading1-sb text-gray-90">수정파일 제출하기</h2>
        <p className="text-body2-m text-gray-70">수정된 파일을 제출해주세요.</p>
      </div>
      <div className="flex w-full flex-col gap-7">
        <FileDragAndDrop onFilesAdded={onFilesAdded} />
        {uploadedFiles.length > 0 && (
          <div className="flex w-full flex-col gap-2">
            {uploadedFiles.map((file, index) => (
              <FileUpload
                key={`${file.name}-${file.lastModified}-${index}`}
                fileName={file.name}
                fileSize={formatFileSize(file.size)}
                isUploading={false}
                onRemove={() => onRemoveFile(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RevisionFileSubmitSection;
export type { RevisionFileSubmitSectionProps };
