"use client";

import { DragEvent, useRef, useState } from "react";

import { FolderAddIcon } from "@/shared/assets/icons";
import { cn } from "@/shared/lib/utils/cn";
import Button from "@/shared/ui/Button";

interface FileDragAndDropProps {
  onFilesAdded: (files: File[]) => void;
  isPortfolio?: boolean;
}

const FileDragAndDrop = ({ onFilesAdded, isPortfolio = false }: FileDragAndDropProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    onFilesAdded(Array.from(fileList));
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`group rounded-12 w-full border border-dashed px-12 py-8 transition-colors ${
        isDragging
          ? "border-main-main bg-purple-10"
          : "bg-gray-10 hover:border-main-main hover:bg-purple-10 border-gray-50"
      }`}
    >
      <div className="flex flex-col gap-5">
        <p className="text-gray-70 text-body2-r text-center">
          {isPortfolio
            ? "첨부할 파일을 여기에 끌어다 놓거나, 파일 선택 버튼을 눌러 파일을 직접 선택해 주세요. (.pdf, .png 파일만 제출 가능, 각 파일 크기 30MB 이하)"
            : "첨부할 파일을 여기에 끌어다 놓거나, 파일 선택 버튼을 눌러 파일을 직접 선택해 주세요. (.png 파일만 제출 가능, 각 파일 크기 30MB 이하)"}
        </p>
        <div className="flex justify-center">
          <input
            ref={inputRef}
            type="file"
            multiple
            className="hidden"
            onChange={e => handleFiles(e.target.files)}
          />
          <Button
            variant="xsmall_primary"
            className={cn(
              "group-hover:bg-purple-40 w-fit group-hover:text-white",
              isDragging && "bg-purple-40 text-white",
            )}
            onClick={() => inputRef.current?.click()}
          >
            <FolderAddIcon />
            파일 선택
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileDragAndDrop;
