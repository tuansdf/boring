import { COMPRESS_IMAGE_WORKER_PARAMS } from "@/features/compress-image/compress-image.type.ts";
import CompressImageWorker from "@/features/compress-image/compress-image.worker.ts?worker";

let worker: Worker | null = null;

export const compressImages = async (request: COMPRESS_IMAGE_WORKER_PARAMS): Promise<File[]> => {
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
