import { faker } from "@faker-js/faker";

self.onmessage = async function (e) {
  try {
    postMessage(faker.lorem.words(Number(e.data) || 3));
  } catch {
    postMessage("");
  }
};
