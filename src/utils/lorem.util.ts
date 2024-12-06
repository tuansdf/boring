import LoremWorker from "@/workers/lorem.worker.ts?worker";

export const generateLorem = async (wordCount: number): Promise<string> => {
  if (wordCount < 1) wordCount = 1;
  if (wordCount > 1_000_000) wordCount = 1_000_000;
  return new Promise((res) => {
    const worker = new LoremWorker();
    worker.onmessage = (e) => {
      res(e.data);
      worker.terminate();
    };
    worker.onerror = () => {
      res("");
      worker.terminate();
    };
    worker.postMessage(wordCount);
  });
};
