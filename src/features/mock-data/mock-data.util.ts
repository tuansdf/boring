import { MockDataRequest } from "@/features/mock-data/mock-data.type.ts";
import MockDataWorker from "@/features/mock-data/mock-data.worker.ts?worker";

let worker: Worker | null = null;

export const generateMockDataJsonString = async (request: MockDataRequest): Promise<string> => {
  return new Promise((res) => {
    if (!worker) {
      worker = new MockDataWorker();
    }
    worker.onmessage = (e) => {
      res(e.data);
    };
    worker.onerror = () => {
      res("[]");
    };
    worker.postMessage(request);
  });
};

export const initMockDataWorker = () => {
  worker = new MockDataWorker();
};

export const terminateMockDataWorker = () => {
  worker?.terminate();
  worker = null;
};
