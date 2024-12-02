import imageCompression from "browser-image-compression";

const FILE_TYPE_TO_EXTENSION: Record<string, string> = {
  "image/webp": ".webp",
  "image/jpeg": ".jpg",
};

const DEFAULT_FILE_TYPE = "image/webp";
const DEFAULT_QUALITY = 0.8;
const DEFAULT_MAX_WIDTH_OR_HEIGHT = 4000;

export type COMPRESS_IMAGE_OPTIONS = { fileType?: string; quality?: number; maxWidthOrHeight?: number };

export const compressImage = async (file: File, options: COMPRESS_IMAGE_OPTIONS = {}): Promise<File> => {
  if (!options.fileType || !FILE_TYPE_TO_EXTENSION[options.fileType]) options.fileType = DEFAULT_FILE_TYPE;
  if (!options.quality || options.quality <= 0 || options.quality > 1) options.quality = DEFAULT_QUALITY;
  if (!options.maxWidthOrHeight || options.maxWidthOrHeight <= 0)
    options.maxWidthOrHeight = DEFAULT_MAX_WIDTH_OR_HEIGHT;

  let compressed = await imageCompression(file, {
    maxWidthOrHeight: options.maxWidthOrHeight,
    initialQuality: options.quality,
    maxIteration: 10,
    alwaysKeepResolution: true,
    preserveExif: true,
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