import { FC } from "react";
import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";

const Index: FC = () => {
  return useRoutes([
    {
      path: "*",
      element: <Home/>
    },
  ]);
};

export default Index;
