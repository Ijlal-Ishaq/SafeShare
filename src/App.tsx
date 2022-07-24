import { FC } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/index";
import MuiTheme from "./theme";
import NavBar from "./components/NavBar";

const App: FC = () => {
  return (
    <div className="App">
       <MuiTheme>
          <BrowserRouter>
            <NavBar />
            <Router />
          </BrowserRouter>
        </MuiTheme>
    </div>
  );
};

export default App;
