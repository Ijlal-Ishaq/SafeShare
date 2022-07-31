/* eslint-disable jsx-a11y/alt-text */
import { FC, useState } from "react";
import { styled } from "@mui/material/styles";
import { useWeb3React } from "@web3-react/core";
import {
  decryptDataWithPrivateKey as decrypt,
  decryptDataWithSimpleKey as afterDecrypt,
} from "./service";
import { copyToClipboard } from "../copy";
import ShowIcon from "../../../../show.png";
import HideIcon from "../../../../hide.png";

const Container = styled("div")(({ theme }) => ({
  width: "100%",
  margin: "30px 0px",
  padding: "0px 50px",
  textAlign: "left",

  [theme.breakpoints.down("sm")]: {
    margin: "20px 0px",
    padding: "0px",
  },
}));

const Heading = styled("div")(({ theme }) => ({
  fontSize: "25px",
  color: "#20C20E",
  margin: "0px",
  marginBottom: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

// const InputField = styled("textarea")(({ theme }) => ({
//   fontSize: "18px",
//   color: "#20C20E",
//   margin: "0px",
//   width: "100%",
//   maxWidth: "100%",
//   minWidth: "100%",
//   minHeight: "200px",
//   backgroundColor: "#000",
//   border: "solid 3px #20C20E",
//   borderRadius: "10px",
//   marginBottom: "10px",
//   padding: "13px",
//   boxShadow: "inset 0px 0px 100px -50px #20c20e",
// }));

const Button = styled("button")(({ theme }) => ({
  fontSize: "25px",
  fontWeight: "bolder",
  backgroundColor: "#20C20E",
  color: "#000",
  border: "solid 3px #20C20E",
  borderRadius: "10px",
  marginBottom: "30px",
  width: "300px",
  padding: "9px",
  cursor: "pointer",
  //   boxShadow:"0px 0px 13px #20c20e",
}));

const InputText = styled("input")(({ theme }) => ({
  fontSize: "18px",
  color: "#20C20E",
  margin: "0px",
  width: "100%",
  height: "70px",
  backgroundColor: "#000",
  border: "solid 3px #20C20E",
  borderRadius: "10px",
  marginBottom: "30px",
  padding: "13px",
  boxShadow: "inset 0px 0px 100px -50px #20c20e",
}));

const getEyeIcon = (status: boolean) => {
  return (
    <img
      src={status ? HideIcon : ShowIcon}
      style={{ height: "25px", width: "25px", cursor: "pointer" }}
    />
  );
};

const Index: FC = () => {
  const [data, setData] = useState("");
  const [dataVisibility, setDataVisibility] = useState(false);
  const [decryptedData, setDecryptedData] = useState("");
  const [saltingKey, setSaltingKey] = useState("");
  const [saltingKeyVisibility, setSaltingKeyVisibility] = useState(false);
  const { account } = useWeb3React();

  const decryptData = async () => {
    //@ts-ignore
    let saltedPlainText = await decrypt(data, account);
    let pt = afterDecrypt(saltedPlainText, saltingKey);
    setDecryptedData(pt);
  };

  return (
    <Container>
      <Heading>
        salting-key:
        <span
          onClick={() => {
            setSaltingKeyVisibility(!saltingKeyVisibility);
          }}
        >
          {getEyeIcon(saltingKeyVisibility)}
        </span>
      </Heading>{" "}
      <InputText
        onChange={(e) => {
          setSaltingKey(e.target.value);
        }}
        type={saltingKeyVisibility ? "text" : "password"}
        placeholder={"enter salting-key..."}
      />
      <Heading>cipher-text:</Heading>
      <InputText
        onChange={(e) => {
          setData(e.target.value);
        }}
        placeholder={"enter cipher-text..."}
      />
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          onClick={() => {
            decryptData();
          }}
        >
          decrypt
        </Button>
      </div>
      <Heading>
        plain-text:
        <span
          onClick={() => {
            setDataVisibility(!dataVisibility);
          }}
        >
          {getEyeIcon(dataVisibility)}
        </span>
      </Heading>
      <InputText
        value={decryptedData}
        type={dataVisibility ? "text" : "password"}
        placeholder={"plain-text..."}
      />
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          onClick={() => {
            copyToClipboard(decryptedData);
          }}
        >
          copy
        </Button>
      </div>
    </Container>
  );
};

export default Index;
