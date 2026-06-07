import { CheckCircleFillIcon, CloseCircleFillIcon, LoadingIcon } from "@/shared/assets/icons";

interface FileUploadProps {
  fileName: string;
  fileSize: string;
  isUploading: boolean;
  onRemove: () => void;
}

const FileUpload = ({ fileName, fileSize, isUploading, onRemove }: FileUploadProps) => {
  const dotIndex = fileName.lastIndexOf(".");
  const nameWithoutExt = dotIndex !== -1 ? fileName.slice(0, dotIndex) : fileName;
  const ext = dotIndex !== -1 ? fileName.slice(dotIndex + 1).toLowerCase() : "";

  return (
    <div className="rounded-8 border-gray-40 hover:bg-gray-10 flex w-full justify-between border bg-white p-4 transition-colors duration-150">
      <div className="flex flex-row items-center gap-2">
        {isUploading ? (
          <LoadingIcon className="text-main-main size-6 animate-spin" />
        ) : (
          <CheckCircleFillIcon className="text-main-main size-6" />
        )}
        <p className="text-gray-80 text-caption1-m">
          {nameWithoutExt} [{ext}, {fileSize}]
        </p>
      </div>
      <CloseCircleFillIcon className="size-6 cursor-pointer" onClick={onRemove} />
    </div>
  );
};

export default FileUpload;
