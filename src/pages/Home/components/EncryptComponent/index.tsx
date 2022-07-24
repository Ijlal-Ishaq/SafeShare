import { FC, useState } from "react";
import { styled } from "@mui/material/styles";
import { encryptData as encrypt } from "./service";
import { copyToClipboard } from "../copy";

const Container = styled("div")(({ theme }) => ({
  width: "100%",
  margin:"30px 0px",
  padding:"0px 50px",
  textAlign:"left",

  [theme.breakpoints.down("sm")]:{
    margin:"20px 0px",
    padding:"0px",
  }
}));

const Heading = styled("h1")(({ theme }) => ({
  fontSize : "25px",
  color: "#20C20E",
  margin:'0px',
  marginBottom:"10px"
}));

const InputField = styled("textarea")(({ theme }) => ({
  fontSize : "18px",
  color: "#20C20E",
  margin:'0px',
  width:"100%",
  maxWidth:"100%",
  minWidth:"100%",
  minHeight: "200px",
  backgroundColor: "#000",
  border: "solid 3px #20C20E",
  borderRadius: "10px",
  marginBottom:"10px",
  padding:"13px",
  boxShadow:"inset 0px 0px 100px -50px #20c20e",
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
    
    const [publicKey,setPublicKey] = useState('');
    const [data,setData] = useState('');
    const [encryptedData,setEncryptedData] = useState('');

    const encryptData = () => {
        if(publicKey!=='' && data!==''){
          let ct = encrypt(data,publicKey);
          console.log(ct)
          setEncryptedData(ct);
        }
    }

    return (
    <Container>
        <Heading>receiver-public-key:</Heading>
        <InputText onChange={(e)=>{setPublicKey(e.target.value)}}/>
        <Heading>plain-text:</Heading>
        <InputField onChange={(e)=>{setData(e.target.value)}}/>
        <div style={{width:"100%",display:"flex",justifyContent:"flex-end"}}>
        <Button onClick={()=>{encryptData()}}>encrypt</Button>
        </div>
        <Heading>cipher-text:</Heading>
        <InputField onChange={(e)=>{setEncryptedData(e.target.value)}} value={encryptedData}/>
        <div style={{width:"100%",display:"flex",justifyContent:"flex-end"}}>
        <Button onClick={()=>{copyToClipboard(encryptedData)}}>copy</Button>
        </div>
    </Container>
    );
};

export default Index;
