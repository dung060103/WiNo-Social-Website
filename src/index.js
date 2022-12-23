import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material";

import * as config from './js/config'
import "./css/index.css";
import "./css/main.css";
import App from "./js/App";
import {theme} from './theme'

import reportWebVitals from "./reportWebVitals";
import { ProviderPopUpContent } from "./js/store";
import { ProviderAccount } from "./js/store/Provider";
async function run() {
  var scriptCaptcha = document.createElement("script");
  scriptCaptcha.src = "https://www.google.com/recaptcha/api.js";
  scriptCaptcha.async = 1;
  scriptCaptcha.defer = 1;
  document.body.appendChild(scriptCaptcha);

  async function isLoginEd() {

    const get_isLoginEd = async () => {
      
      return await fetch( config.HOST_SERVER +"/account/check-is-active", {
        // headers:{
        //   "Access-Control-Allow-Origin": "*"
        // },
        method: "GET",
        // mode: "cors",
        credentials: 'include'
      });
    };
    const result = await (await get_isLoginEd()).text();
    // console.log(typeof result);

    return result;
  }
 
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    // <React.StrictMode>
      <ProviderPopUpContent>
      <ProviderAccount>
      <ThemeProvider theme={theme}>
      <App result={await isLoginEd()} />
      </ThemeProvider>
      </ProviderAccount>
      </ProviderPopUpContent>
      // {/* </React.StrictMode> */}
  );
}
run();
reportWebVitals();
