import { FC } from "react";
import { styled } from "@mui/material/styles";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React , UnsupportedChainIdError} from "@web3-react/core";
import { NoEthereumProviderError , UserRejectedRequestError } from "@web3-react/injected-connector";


const Container = styled("div")(({ theme }) => ({
  width: "100%",
  margin:"100px 0px",
  padding:"0px 50px",
  textAlign:"center",
  justifyContent:"center",

  [theme.breakpoints.down("sm")]:{
    margin:"20px 0px",
    padding:"0px 20px",
  }
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
    [theme.breakpoints.down("sm")]:{
      fontSize : "20px",
      width:"100%"
    }
  }));

export const metamaskConnector = new InjectedConnector({
    supportedChainIds: [1],
});

const Index: FC = () => {
  const {activate} = useWeb3React();

  const getErrorMessage = (error:any) => {
    if (error instanceof NoEthereumProviderError) {
      return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
    } else if (error instanceof UnsupportedChainIdError) {
      return `You're connected to an unsupported network. Please switch to Ethereum Mainnet`;
    } else if (error instanceof UserRejectedRequestError) {
      return 'Please authorize this website to access your Ethereum account.'
    } else {
      console.error(error)
      return 'An unknown error occurred. Check the console for more details.'
    }
  }

  const connectWallet = async() => {
    await activate(metamaskConnector,(err)=>{
      alert(getErrorMessage(err));
    });
  }

  return (
    <Container>
        <Button onClick={()=>{connectWallet()}}>Connect Metamask</Button>
    </Container>
  );
};

export default Index;
