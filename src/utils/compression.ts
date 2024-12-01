import Pako from "pako";

export const compress = Pako.deflate;
export const decompress = Pako.inflate;
