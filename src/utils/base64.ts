import { compress } from "@/utils/compression.ts";
import { base64, base64urlnopad } from "@scure/base";

const textEncoder = new TextEncoder();

export const encodeBase64 = (input: string | Uint8Array, options: { url?: boolean; compression?: boolean } = {}) => {
  const encodeFn = options.url ? base64urlnopad.encode : base64.encode;
  let bytes: Uint8Array = options.compression
    ? compress(input)
    : typeof input === "string"
      ? textEncoder.encode(input)
      : input;
  return encodeFn(bytes);
};
export const decodeBase64 = base64.decode;
