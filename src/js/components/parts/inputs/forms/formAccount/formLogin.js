import React, { useRef, useState,
  //  useRef
   } from "react";

import { Link } from "react-router-dom";

// import ReCAPTCHA from "react-google-recaptcha";

import { HOST_SERVER, SITE_KEY_RECAPTCHA
  // , SITE_KEY_RECAPTCHA
 } from "../../../../../config";
import FormAccount from "../formAccount/FormAccount.module.scss";
import LogoWebsite from "../../../../logo/logoWebsite/LogoWebsite";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  // console.log(FormAccount);
  const captchaRef = useRef(null);
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignIn = function (e) {
    e.preventDefault();
    const token = captchaRef.current.getValue();
    if (token !== "") {
      fetch(HOST_SERVER + "/account/signin", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          password,
          gmail,
          token,
        }),
      }).then((res) => {
        res.text().then((text) => {
          if ("ok" === JSON.parse(text).status) {
            sessionStorage.setItem('noReload',2);
            window.location.reload();
          }
        });
      });
    } else {
      alert("Stupid");
    }
    captchaRef.current.reset();
  };
  return (
    <div className={FormAccount.wrapper}>
      <div className={FormAccount.register__form}>
        <LogoWebsite />
        <h1>Hello, welcome back</h1>
        <form className="" onSubmit={handleSignIn}>
          <div className={[FormAccount.field, FormAccount.input__text].join(' ')}>
            <input
              type="text"
              name="email"
              placeholder="Enter mobile number or email address"
              onChange={(e) => {
                setGmail(e.currentTarget.value);
              }}
            />
          </div>
          <div className={[FormAccount.field, FormAccount.input__text].join(' ')}>
            <input
              type="password"
              name="password"
              placeholder="Enter new password"
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
            />
            {/* <VisibilityIco/> */}
          </div>
            <div className={FormAccount.container_ReCAPTCHA}>
              <ReCAPTCHA
                sitekey={SITE_KEY_RECAPTCHA}
                ref={captchaRef}
              />
            </div>
          {/* <div className="g-recaptcha" data-sitekey="6LcCK0ciAAAAAED2CNknmxcjTqVQ4SwMwlYi9qAc"></div> */}
          <div className={[FormAccount.button, FormAccount.field].join(' ')}>
            <input type="submit" name="submit" value="Login" />
          </div>
        </form>

        <div className={FormAccount.link}>
          Create new account? <Link to="/signup/">Register</Link>
        </div>
        <div className={["forgetPassAcc",FormAccount.link].join(' ')}>
          Forget Password Account? <Link to="/restorePass">Restore Now!!</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
