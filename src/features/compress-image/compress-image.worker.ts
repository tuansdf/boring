import { COMPRESS_IMAGE_OPTIONS, COMPRESS_IMAGE_WORKER_PARAMS } from "@/features/compress-image/compress-image.type.ts";
import imageCompression from "browser-image-compression";

self.onmessage = async function (e) {
  try {
    const options = e.data as COMPRESS_IMAGE_WORKER_PARAMS;
    postMessage(await compressImages(options.files, options.options));
  } catch {
    postMessage(e.data);
  }
};

const FILE_TYPE_TO_EXTENSION: Record<string, string> = {
  "image/webp": ".webp",
  "image/jpeg": ".jpg",
};

const DEFAULT_FILE_TYPE = "image/webp";
const DEFAULT_QUALITY = 0.9;
const DEFAULT_MAX_WIDTH_OR_HEIGHT = 4000;

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
  if (!options.quality || options.quality <= 0 || options.quality > 1) options.quality = DEFAULT_QUALITY;
  if (!options.maxWidthOrHeight || options.maxWidthOrHeight <= 0)
    options.maxWidthOrHeight = DEFAULT_MAX_WIDTH_OR_HEIGHT;

  let compressed = await imageCompression(file, {
    maxWidthOrHeight: options.maxWidthOrHeight,
    initialQuality: options.quality,
    maxIteration: 10,
    fileType: options.fileType,
  });
  const fileExtension = FILE_TYPE_TO_EXTENSION[options.fileType];
  const fileName = file.name.substring(0, file.name.lastIndexOf(".")) + fileExtension;
  compressed = new File([compressed], fileName, {
    type: options.fileType,
    lastModified: file.lastModified,
  });
  return compressed;
};
