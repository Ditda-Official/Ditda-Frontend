import { CheckCircleFillIcon, CloseCircleFillIcon, LoadingIcon } from "@/assets/icons";

interface FileUploadProps {
  isUploading?: boolean;
}

const FileUpload = ({ isUploading = false }: FileUploadProps) => {
  return (
    <div className="rounded-8 border-gray-40 hover:bg-gray-10 flex w-full justify-between border bg-white p-4">
      <div className="flex flex-row items-center gap-2">
        {isUploading ? (
          <LoadingIcon className="text-main-main size-6 animate-spin" />
        ) : (
          <CheckCircleFillIcon className="text-main-main size-6" />
        )}
        <p className="text-gray-80 text-caption1-m">수학의 정석 레퍼런스 파일 [pdf, 20.9MB]</p>
      </div>
      <CloseCircleFillIcon className="size-6 cursor-pointer" />
    </div>
  );
};

export default FileUpload;
