//@ts-nocheck
export const decryptData = async( data:string, account:string ) : string => {
    let pt = '';

    await window.ethereum.request({
        method: 'eth_decrypt',
        params: [data, account],
    }).then((res)=>{
        pt = res;
    }).catch((e)=>{
        alert(e.message);
    });

    return pt;
}