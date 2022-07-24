import { FC } from "react";
import { styled } from "@mui/material/styles";

const Container = styled("div")(({ theme }) => ({
  width: "100%",
  height: "70px",
  backgroundColor: "#000",
  textAlign:"center",
  boxShadow:"0px 0px 1000px #20c20e",
  display:"flex",
  alignItems:"center",
  justifyContent:"center"
}));

const Heading = styled("h1")(({ theme }) => ({
  fontSize : "30px",
  color: "#20C20E",
  margin:'0px'
}));


const Index: FC = () => {
  return (
    <Container>
      <Heading>safe-share</Heading>
    </Container>
  );
};

export default Index;
