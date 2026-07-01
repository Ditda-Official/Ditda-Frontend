export interface UploadedFile {
  id: string;
  file: File;
  fileName: string;
  fileSize: string;
  isUploading: boolean;
  key?: string;
}
