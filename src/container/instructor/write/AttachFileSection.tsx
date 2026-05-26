"use client";

import { useState } from "react";

import FileDragAndDrop from "@/components/common/FileDragAndDrop";
import FileUpload from "@/components/common/FileUpload";
import TextField from "@/components/input/TextField";

interface UploadedFile {
  id: string;
  fileName: string;
  fileSize: string;
  isUploading: boolean;
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
};

const AttachFileSection = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleFilesAdded = (files: File[]) => {
    const newEntries: UploadedFile[] = files.map(file => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      fileName: file.name,
      fileSize: formatFileSize(file.size),
      isUploading: true,
    }));

    setUploadedFiles(prev => [...prev, ...newEntries]);

    // 임시 업로드 시뮬레이션
    newEntries.forEach(entry => {
      setTimeout(() => {
        setUploadedFiles(prev =>
          prev.map(f => (f.id === entry.id ? { ...f, isUploading: false } : f)),
        );
      }, 2000);
    });
  };

  const handleRemove = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="rounded-12 focus-within:border-purple-40 flex flex-col border border-transparent bg-white p-6">
      <div className={`flex flex-col ${uploadedFiles.length > 0 ? "gap-7" : "gap-6"}`}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-gray-90 text-heading1-sb">자료 첨부</h1>
            <h2 className="text-gray-70 text-body2-m">
              교재 속에 들어갈 이미지 및 자료를 첨부해주세요
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
            <p className="text-gray-70 text-body1-sb">첨부 자료 참고사항</p>
            <TextField placeholder="ex) img.04는 강사 프로필에 들어가는 이미지입니다." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttachFileSection;
