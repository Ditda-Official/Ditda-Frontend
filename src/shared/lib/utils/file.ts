export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
};

export const MAX_FILE_SIZE_BYTES = 30 * 1024 * 1024;

export const isAllowedFileType = (file: File, extensions: string[]) =>
  extensions.some(extension => file.name.toLowerCase().endsWith(extension));
