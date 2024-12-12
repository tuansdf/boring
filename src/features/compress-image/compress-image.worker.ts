import { COMPRESS_IMAGE_WORKER_PARAMS } from "@/features/compress-image/compress-image.type.ts";
import { compressImages } from "@/features/compress-image/compress-image.util.ts";

self.onmessage = async function (e) {
  try {
    const options = e.data as COMPRESS_IMAGE_WORKER_PARAMS;
    postMessage(await compressImages(options.files, options.options));
  } catch {
    postMessage(e.data);
  }
};
