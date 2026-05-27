import { useState } from "react";

import { formatFileSize } from "@/lib/utils/file";
import { UploadedFile } from "@/types/file";

export const useUploadedFiles = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleFilesAdded = (files: File[]) => {
    const newEntries: UploadedFile[] = files.map(file => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      fileName: file.name,
      fileSize: formatFileSize(file.size),
      isUploading: true,
    }));

    setUploadedFiles(prev => [...prev, ...newEntries]);

    // 임시 업로드 시뮬레이션 (실제 API 연동 시 교체)
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

  return { uploadedFiles, handleFilesAdded, handleRemove };
};
