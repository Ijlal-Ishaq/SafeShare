import { FC, useState } from "react";
import { styled } from "@mui/material/styles";
import { copyToClipboard } from "../copy";
import web3 from "web3";

const Container = styled("div")(({ theme }) => ({
  width: "100%",
  margin:"50px 0px",
  padding:"0px 50px",
  textAlign:"left",

  [theme.breakpoints.down("sm")]:{
    margin:"20px 0px",
    padding:"0px 20px",
  }
}));

const Heading = styled("h1")(({ theme }) => ({
    fontSize : "25px",
    color: "#20C20E",
    margin:'0px',
    marginBottom:"10px"
}));

  
const InputText = styled("input")(({ theme }) => ({
    fontSize : "18px",
    color: "#20C20E",
    margin:'0px',
    width:"100%",
    height:"70px",
    backgroundColor: "#000",
    border: "solid 3px #20C20E",
    borderRadius: "10px",
    marginBottom:"30px",
    padding:"13px",
    boxShadow:"inset 0px 0px 100px -50px #20c20e",
}));

const Button = styled("button")(({ theme }) => ({
  fontSize : "25px",
  fontWeight:"bolder",
  backgroundColor: "#20C20E",
  color: "#000",
  border: "solid 3px #20C20E",
  borderRadius: "10px",
  marginBottom:"30px",
  width:"300px",
  padding:"9px",
  cursor:"pointer",
//   boxShadow:"0px 0px 13px #20c20e",
}));

const Index: FC = () => {

  const [publicAddress ,setPublicAddress] = useState('');
  const [publicKey ,setPublicKey] = useState('');

  const getPublicKey = async() => {

    if(web3.utils.isAddress(publicAddress)){

        let encryptionPublicKey = '';
        //@ts-ignore
        await window.ethereum.request({
            method: 'eth_getEncryptionPublicKey',
            params: [publicAddress],
        }).then((key:any) => {
            console.log(publicAddress,key)
            encryptionPublicKey = key;
        })

        setPublicKey(encryptionPublicKey);

    }else{
        alert("Invalid public address.")
    }
    
  }

  return (
    <Container>
        <Heading>your-public-address:</Heading>
        <InputText onChange={(e)=>{setPublicAddress(e.target.value)}}/>
        <div style={{width:"100%",display:"flex",justifyContent:"flex-end"}}>
            <Button onClick={()=>{getPublicKey()}}>get-key</Button>
        </div>
        <Heading>your-public-key:</Heading>
        <InputText onChange={(e)=>{setPublicKey(e.target.value)}} value={publicKey}/>
        <div style={{width:"100%",display:"flex",justifyContent:"flex-end"}}>
            <Button onClick={()=>{copyToClipboard(publicKey)}}>copy</Button>
        </div>
    </Container>
  );
};

export default Index;
