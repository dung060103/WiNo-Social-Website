import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormAccount from  "../formAccount/FormAccount.module.scss";

import { HOST_SERVER } from "../../../../../config";
import LogoWebsite from "../../../../logo/logoWebsite/LogoWebsite";


function Register() {
  const [user_fname, setUser_fname] = useState("");
  const [user_lname, setUser_lname] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("1");
  const handleSignUp = function (e) {
    e.preventDefault();
    fetch(HOST_SERVER + "/account/signup", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        gmail,
        user_fname,
        user_lname,
        birthday,
        gender,
      })
    }).then(
      res=>{
        res.text()
        .then((text=>{
          console.log();
          if("ok"===JSON.parse(text).status)
      { 
        window.location.href="/"
      }}))
      }
      );
  };
  console.log(FormAccount);
  return (
    <div className={FormAccount.wrapper} >
      <section className={FormAccount.register__form} >
        <LogoWebsite />
        <h1>Hello, welcome Sign up</h1>
        <form className="form_sign_up" onSubmit={handleSignUp}>
          <div className="name-details" >
            <div className={[FormAccount.field, FormAccount.input__text].join(' ')} >
              <input 
                type="text" 
                name="fname" 
                placeholder="First name" 
                onChange={(e)=>{setUser_fname(e.currentTarget.value)}}/>
            </div>
            <div className={[FormAccount.field, FormAccount.input__text].join(' ')} >
              <input 
                type="text" 
                name="lname" 
                placeholder="Last name"
                onChange={(e)=>{setUser_lname(e.currentTarget.value)}} />
            </div>
          </div>
          <div className={[FormAccount.field, FormAccount.input__text].join(' ')} >
            <input
              type="text"
              name="email"
              placeholder="Enter mobile number or email address"
              onChange={(e)=>{setGmail(e.currentTarget.value)}}
            />
          </div>
          <div className={[FormAccount.field, FormAccount.input__text].join(' ')} >
            <input
              type="password"
              name="password"
              placeholder="Enter new password"
              onChange={(e)=>{setPassword(e.currentTarget.value)}}

            />
            {/* <VisibilityIcon/> */}
          </div>
          <div className={FormAccount.checkbox} >
            <input type="radio"       
              name="gender" 
              id="" 
              value={0}
              checked={false}
              onChange={(e)=>{setGender(e.currentTarget.value)}}
            /> <p>Female</p>
            <input 
              type="radio" 
              name="gender" 
              id="" 
              class="radio2" 
              checked={true}
              
              value={1}
              onChange={(e)=>{setGender(e.currentTarget.value)}}
              />
            <p class="male">Male</p>
          </div>
          <div className={[FormAccount.date, FormAccount.input__text].join(' ')} >
            <input className="ipt-birthday_formSignUp" type="date" 
              onChange={(e)=>{setBirthday(e.currentTarget.value)}}
              />
          </div>

          <div className={[FormAccount.button, FormAccount.field].join(' ')} >
            <input type="submit" name="submit" value="Create account" />
          </div>
        </form>
        <div className="link" >
          Already signed up? <Link to="/signin">Login now</Link>
        </div>
      </section>
    </div>
  );
}

export default Register;
