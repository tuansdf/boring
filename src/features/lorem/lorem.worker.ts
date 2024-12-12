import { generateLoremWords } from "@/features/lorem/lorem.util.ts";

self.onmessage = async function (e) {
  try {
    postMessage(generateLoremWords(e.data));
  } catch {
    postMessage("");
  }
};
