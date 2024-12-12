export type COMPRESS_IMAGE_OPTIONS = {
  fileType?: string;
  quality?: number;
  maxWidthOrHeight?: number;
  maxSize?: number;
};
export type COMPRESS_IMAGE_WORKER_PARAMS = {
  files: File[];
  options: COMPRESS_IMAGE_OPTIONS;
};
