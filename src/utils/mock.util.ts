import { faker } from "@faker-js/faker";

const MAX_OBJECTS = 10_000;

type Fn = (...args: any[]) => any;
type RequestObject = Record<string, string>;
type FnsObject = Record<string, Fn>;
type ResultObject = Record<string, any>;

function keyToFn(key: string) {
  return key?.split(".").reduce((acc, k) => acc[k], faker as Record<string, any>) as Fn;
}

function requestToFnsObject(data: RequestObject): FnsObject {
  const result: FnsObject = {};
  for (const key of Object.keys(data)) {
    if (!data[key]) continue;
    const fn = keyToFn(data[key]);
    if (fn) result[key] = fn;
  }
  return result;
}

async function generateJSON(fns: FnsObject) {
  const result: ResultObject = {};
  for (const key of Object.keys(fns)) {
    if (!fns[key]) continue;
    result[key] = await fns[key]?.();
  }
  return result;
}

export async function generateJSONs(data: RequestObject) {
  const { __count, ...input } = data;
  const fns = requestToFnsObject(input);
  let count = Number(__count);
  if (count !== 0 && !count) return generateJSON(fns);
  if (count < 0) count = 0;
  if (count > MAX_OBJECTS) count = MAX_OBJECTS;
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(generateJSON(fns));
  }
  return await Promise.all(result);
}