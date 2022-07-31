//@ts-nocheck
const CryptoJS = require("crypto-js");

export const decryptDataWithSimpleKey = (data: string, key: string): string => {
  var decrypted = CryptoJS.AES.decrypt(data, key);
  try {
    if (decrypted.toString(CryptoJS.enc.Utf8) === "") {
      return data;
    }
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    return data;
  }
};

export const decryptDataWithPrivateKey = async (
  data: string,
  account: string
): string => {
  let pt = "";

  await window.ethereum
    .request({
      method: "eth_decrypt",
      params: [data, account],
    })
    .then((res) => {
      pt = res;
    })
    .catch((e) => {
      alert(e.message);
    });

  return pt;
};
