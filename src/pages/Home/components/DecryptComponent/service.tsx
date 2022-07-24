//@ts-nocheck
export const decryptData = async( data:string, account:string ) : string => {
    const pt = await window.ethereum.request({
    method: 'eth_decrypt',
    params: [data, account],
    });

    return pt;
}