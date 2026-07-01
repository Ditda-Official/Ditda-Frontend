import { useEffect, useRef, useState } from "react";

import { formatFileSize } from "@/shared/lib/utils/file";
import { UploadedFile } from "@/shared/types/file";

type UploadFile = (file: File) => Promise<string>;

export const useUploadedFiles = (
  externalFiles?: UploadedFile[],
  setExternalFiles?: (files: UploadedFile[]) => void,
  uploadFile?: UploadFile,
  onUploadError?: (file: File) => void,
) => {
  const [localFiles, setLocalFiles] = useState<UploadedFile[]>([]);
  const externalFilesRef = useRef(externalFiles);
  useEffect(() => {
    externalFilesRef.current = externalFiles;
  });

  const uploadedFiles = externalFiles ?? localFiles;

  const setFiles = (updater: (prev: UploadedFile[]) => UploadedFile[]) => {
    if (setExternalFiles) {
      setExternalFiles(updater(externalFilesRef.current ?? []));
    } else {
      setLocalFiles(updater);
    }
  };

  const handleFilesAdded = (files: File[]) => {
    const newEntries: UploadedFile[] = files.map(file => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
      fileName: file.name,
      fileSize: formatFileSize(file.size),
      isUploading: true,
    }));

    setFiles(prev => [...prev, ...newEntries]);

    newEntries.forEach(entry => {
      if (uploadFile) {
        uploadFile(entry.file)
          .then(key => {
            setFiles(prev =>
              prev.map(f => (f.id === entry.id ? { ...f, isUploading: false, key } : f)),
            );
          })
          .catch(() => {
            setFiles(prev => prev.filter(f => f.id !== entry.id));
            onUploadError?.(entry.file);
          });

        return;
      }

      // 임시 업로드 시뮬레이션 (실제 API 연동 시 교체)
      setTimeout(() => {
        setFiles(prev => prev.map(f => (f.id === entry.id ? { ...f, isUploading: false } : f)));
      }, 2000);
    });
  };

  const handleRemove = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  return { uploadedFiles, handleFilesAdded, handleRemove };
};
