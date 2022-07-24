import { FC, useState } from "react";
import { styled } from "@mui/material/styles";
import { useWeb3React } from "@web3-react/core";
import EncryptComponent from "./components/EncryptComponent";
import DecryptComponent from "./components/DecryptComponent";
import WalletConnect from "./components/WalletConnect";
import GetPublicKey from "./components/GetPublicKey";

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

const Switch = styled("div")(({ theme }) => ({
  width:"500px",
  display:"flex",
  backgroundColor:"#000",
  border: "solid 3px #20C20E",
  borderRadius: "10px",
  margin:"0px auto",
  marginBottom:"50px",

  [theme.breakpoints.down("sm")]:{
    width:"100%",
    marginBottom:"30px",
  }

}));

const Tab = styled("button")<{active:boolean}>(({ theme, active }) => ({
  flex:"1",
  fontSize : "25px",
  fontWeight:"bolder",
  backgroundColor: active ? "#20C20E" : "#000",
  color: active ? "#000" : "#20C20E",
  borderRadius: "5px",
  border:"none",
  padding:"9px",
  cursor:"pointer",

  [theme.breakpoints.down("sm")]:{
    fontSize : "15px",

  }
}));

const Index: FC = () => {
  const {active} = useWeb3React();
  const [currentPage ,setCurrentPage] = useState(0);
  return (
    <Container>

      <Switch>
        <Tab active={currentPage===0} onClick={()=>{setCurrentPage(0)}}>encrypt</Tab>
        <Tab active={currentPage===1} onClick={()=>{setCurrentPage(1)}}>decrypt</Tab>
        <Tab active={currentPage===2} onClick={()=>{setCurrentPage(2)}}>get-key</Tab>
      </Switch>

    {
      !active 
      ? 
      <WalletConnect/>
      :
      currentPage === 0 
      ? 
      <EncryptComponent/>
      : 
      currentPage === 1 
      ? 
      <DecryptComponent/>
      :
      <GetPublicKey/>
    }

    </Container>
  );
};

export default Index;
