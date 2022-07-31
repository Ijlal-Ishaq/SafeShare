import { encrypt } from "@metamask/eth-sig-util";
const ethUtil = require("ethereumjs-util");
const CryptoJS = require("crypto-js");

export const encryptDataWithSimpleKey = (data: string, key: string): string => {
  var encrypted = CryptoJS.AES.encrypt(data, key);
  return encrypted.toString();
};

export const encryptDataWithPublicKey = (
  data: string,
  publicKey: string
): string => {
  try {
    const enc = encrypt({
      publicKey: publicKey,
      data: data.toString(),
      version: "x25519-xsalsa20-poly1305",
    });
    const encryptedMessage = ethUtil.bufferToHex(
      Buffer.from(JSON.stringify(enc), "utf8")
    );
    return encryptedMessage;
  } catch (e) {
    alert(e);
    return "";
  }
};
