import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "./context/AppProvider";

ReactDOM.render(
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
