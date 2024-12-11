import LoremWorker from "@/features/lorem/lorem.worker.ts?worker";

let worker: Worker | null = null;

export const generateLorem = async (wordCount: number): Promise<string> => {
  if (wordCount < 1) wordCount = 1;
  if (wordCount > 1_000_000) wordCount = 1_000_000;
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
    worker.postMessage(wordCount);
  });
};

export const initLoremWorker = () => {
  worker = new LoremWorker();
};

export const terminateLoremWorker = () => {
  worker?.terminate();
  worker = null;
};
