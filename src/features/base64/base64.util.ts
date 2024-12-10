import { compressText, decompressText } from "@/features/base64/compress-text.util.ts";
import { bytesToUtf8 } from "@noble/ciphers/utils";
import { base64, base64urlnopad } from "@scure/base";

const textEncoder = new TextEncoder();

export const encodeBase64 = (
  input: string | Uint8Array,
  options: { url?: boolean; compression?: boolean } = {},
): string => {
  const encodeFn = options.url ? base64urlnopad.encode : base64.encode;
  let bytes: Uint8Array = options.compression
    ? compressText(input)
    : typeof input === "string"
      ? textEncoder.encode(input)
      : input;
  return encodeFn(bytes);
};
export const decodeBase64 = (input: string, options: { url?: boolean; compression?: boolean } = {}): string => {
  const decodeFn = options.url ? base64urlnopad.decode : base64.decode;
  const decoded = decodeFn(input);
  return options.compression ? decompressText(decoded) : bytesToUtf8(decoded);
};
