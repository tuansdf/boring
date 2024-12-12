import { generateMockDataList } from "@/features/mock-data/mock-data.util.ts";

self.onmessage = async function (e) {
  try {
    const result = await generateMockDataList(e.data);
    postMessage(JSON.stringify(result, null, 2));
  } catch {
    postMessage("[]");
  }
};
