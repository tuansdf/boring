import Pako from "pako";

export const compress = Pako.deflate;
export const decompress = (input: Uint8Array) => Pako.inflate(input, { to: "string" });
