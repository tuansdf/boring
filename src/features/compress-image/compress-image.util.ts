import {
  DEFAULT_FILE_TYPE,
  DEFAULT_MAX_SIZE,
  DEFAULT_MAX_WIDTH_OR_HEIGHT,
  DEFAULT_QUALITY,
  MAX_MAX_SIZE,
  MAX_MAX_WIDTH_OR_HEIGHT,
  MAX_QUALITY,
  MIN_MAX_SIZE,
  MIN_MAX_WIDTH_OR_HEIGHT,
  MIN_QUALITY,
} from "@/features/compress-image/compress-image.constant.ts";
import { COMPRESS_IMAGE_OPTIONS, COMPRESS_IMAGE_WORKER_PARAMS } from "@/features/compress-image/compress-image.type.ts";
import CompressImageWorker from "@/features/compress-image/compress-image.worker.ts?worker";
import { clamp } from "@/utils/common.util.ts";
import imageCompression from "browser-image-compression";

let worker: Worker | null = null;

export const compressImagesWorker = async (request: COMPRESS_IMAGE_WORKER_PARAMS): Promise<File[]> => {
  return new Promise((res) => {
    if (!worker) {
      worker = new CompressImageWorker();
    }
    worker.onmessage = (e) => {
      res(e.data);
    };
    worker.onerror = () => {
      res(request.files);
    };
    worker.postMessage(request);
  });
};

export const initCompressImageWorker = () => {
  worker = new CompressImageWorker();
};

export const terminateCompressImageWorker = () => {
  worker?.terminate();
  worker = null;
};

const FILE_TYPE_TO_EXTENSION: Record<string, string> = {
  "image/webp": ".webp",
  "image/jpeg": ".jpg",
};

export const compressImages = async (files: File[], options: COMPRESS_IMAGE_OPTIONS = {}) => {
  const promises: Promise<any>[] = [];
  for (let i = 0; i < files.length; i++) {
    promises.push(compressImage(files[i], options));
  }
  return Promise.all(promises);
};

export const compressImage = async (file: File, options: COMPRESS_IMAGE_OPTIONS = {}): Promise<File> => {
  if (!file.type.startsWith("image/")) return file;
  if (!options.fileType || !FILE_TYPE_TO_EXTENSION[options.fileType]) options.fileType = DEFAULT_FILE_TYPE;
  if (!options.quality) options.quality = DEFAULT_QUALITY;
  else options.quality = clamp(options.quality, MIN_QUALITY, MAX_QUALITY);
  if (!options.maxSize) options.maxSize = DEFAULT_MAX_SIZE;
  else options.maxSize = clamp(options.maxSize, MIN_MAX_SIZE, MAX_MAX_SIZE);
  if (!options.maxWidthOrHeight) options.maxWidthOrHeight = DEFAULT_MAX_WIDTH_OR_HEIGHT;
  else options.maxWidthOrHeight = clamp(options.maxWidthOrHeight, MIN_MAX_WIDTH_OR_HEIGHT, MAX_MAX_WIDTH_OR_HEIGHT);

  let compressed = await imageCompression(file, {
    maxWidthOrHeight: options.maxWidthOrHeight,
    initialQuality: options.quality,
    fileType: options.fileType,
    maxSizeMB: options.maxSize,
  });
  const fileExtension = FILE_TYPE_TO_EXTENSION[options.fileType];
  const fileName = file.name.substring(0, file.name.lastIndexOf(".")) + fileExtension;
  compressed = new File([compressed], fileName, {
    type: options.fileType,
    lastModified: file.lastModified,
  });
  return compressed;
};
