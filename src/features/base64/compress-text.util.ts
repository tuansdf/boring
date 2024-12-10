import Pako from "pako";

export const compressText = Pako.deflate;
export const decompressText = (input: Uint8Array) => Pako.inflate(input, { to: "string" });