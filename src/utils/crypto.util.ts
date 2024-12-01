import { compress, decompress } from "@/utils/compression.ts";
import { xchacha20poly1305 } from "@noble/ciphers/chacha";
import { bytesToHex, hexToBytes } from "@noble/ciphers/utils";
import { randomBytes } from "@noble/ciphers/webcrypto";
import { base64 } from "@scure/base";

const NONCE_BYTE_SIZE = 24;
const NONCE_STR_SIZE = NONCE_BYTE_SIZE * 2;

export const encryptText = async (contentStr: string, passwordHex: string): Promise<string> => {
  try {
    const nonce = randomBytes(NONCE_BYTE_SIZE);
    const password = hexToBytes(passwordHex);
    const cipher = xchacha20poly1305(password, nonce);
    let content = compress(contentStr);
    let encrypted = cipher.encrypt(content);
    return bytesToHex(nonce) + base64.encode(encrypted);
  } catch (e) {
    return "";
  }
};

export const decryptText = async (content64: string, passwordHex: string): Promise<string> => {
  try {
    const content = base64.decode(content64);
    const password = hexToBytes(passwordHex);
    const nonce = hexToBytes(content64.substring(0, NONCE_STR_SIZE));
    const cipher = xchacha20poly1305(password, nonce);
    return decompress(cipher.decrypt(content), { to: "string" });
  } catch (e) {
    return "";
  }
};

export const generatePassword = () => {
  return bytesToHex(randomBytes(32));
};
