import { MAX_WORD_COUNT, MIN_WORD_COUNT } from "@/features/lorem/lorem.constant.ts";
import LoremWorker from "@/features/lorem/lorem.worker.ts?worker";
import { clamp } from "@/utils/common.util.ts";

let worker: Worker | null = null;

export const generateLorem = async (wordCount: number): Promise<string> => {
  return new Promise((res) => {
    if (!worker) {
      worker = new LoremWorker();
    }
    worker.onmessage = (e) => {
      res(e.data);
    };
    worker.onerror = () => {
      res("");
    };
    worker.postMessage(clamp(wordCount, MIN_WORD_COUNT, MAX_WORD_COUNT));
  });
};

export const initLoremWorker = () => {
  worker = new LoremWorker();
};

export const terminateLoremWorker = () => {
  worker?.terminate();
  worker = null;
};
