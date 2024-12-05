import { COMPRESS_IMAGE_WORKER_PARAMS } from "@/types/compress-image.type.ts";
import CompressImageWorker from "@/workers/compress-image.worker.ts?worker";

export const compressImages = async (request: COMPRESS_IMAGE_WORKER_PARAMS): Promise<File[]> => {
  return new Promise((res) => {
    const worker = new CompressImageWorker();
    worker.onmessage = (e) => {
      res(e.data);
      worker.terminate();
    };
    worker.onerror = () => {
      res(request.files);
      worker.terminate();
    };
    worker.postMessage(request);
  });
};
