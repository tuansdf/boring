import { MockDataRequest } from "@/features/mock-data/mock-data.type.ts";
import MockDataWorker from "@/features/mock-data/mock-data.worker.ts?worker";

export const generateMockDataJsonString = async (request: MockDataRequest): Promise<string> => {
  return new Promise((res) => {
    const worker = new MockDataWorker();
    worker.onmessage = (e) => {
      res(e.data);
      worker.terminate();
    };
    worker.onerror = () => {
      res("[]");
      worker.terminate();
    };
    worker.postMessage(request);
  });
};
