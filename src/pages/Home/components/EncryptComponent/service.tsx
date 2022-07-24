import { encrypt } from '@metamask/eth-sig-util';
const ethUtil = require('ethereumjs-util');

export const encryptData = ( data:string, publicKey:string ) : string => {

  try{
    const enc = encrypt({
      publicKey: publicKey,
      data: data.toString(),
      version: 'x25519-xsalsa20-poly1305',
    });
    const encryptedMessage = ethUtil.bufferToHex(
      Buffer.from(
        JSON.stringify(
          enc                 
        ),
        'utf8'
      )
    );
    return encryptedMessage;
  }catch(e){
    alert(e);
    return '';
  }
  
}