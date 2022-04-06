import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Favicon from "react-favicon";
import icon from "./public/favicon.ico";

ReactDOM.render(
  <React.StrictMode>
    <Favicon url={icon} />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
