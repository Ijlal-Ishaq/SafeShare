import { FC , useState } from "react";
import { styled } from "@mui/material/styles";
import { useWeb3React } from "@web3-react/core";
import { decryptData as decrypt } from "./service";
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

  const [data, setData] = useState('');
  const [decryptedData, setDecryptedData] = useState('');
  const { account } = useWeb3React();

  const decryptData = async() => {
    //@ts-ignore
    let pt = await decrypt(data, account);
    setDecryptedData(pt);
  }

  return (
    <Container>
     <Heading>cipher-text:</Heading>
     <InputField onChange={(e)=>{setData(e.target.value)}} placeholder={"enter cipher-text..."}/>
     <div style={{width:"100%",display:"flex",justifyContent:"flex-end"}}>
       <Button onClick={()=>{decryptData()}}>decrypt</Button>
     </div>
     <Heading>plain-text:</Heading>
     <InputField value={decryptedData} placeholder={"plain-text..."}/>
     <div style={{width:"100%",display:"flex",justifyContent:"flex-end"}}>
       <Button onClick={()=>{copyToClipboard(decryptedData)}}>copy</Button>
     </div>
    </Container>
  );
};

export default Index;
