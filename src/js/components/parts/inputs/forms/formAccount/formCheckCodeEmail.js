import React,{useState} from "react";
import { HOST_SERVER } from "../../../../../config";
import LogoWebsite from "../../../../logo/logoWebsite/LogoWebsite";
import FormAccount from "../formAccount/FormAccount.module.scss";
function CheckCodeEmail()
{
    const [code, setCode] = useState("");
  const handleRestorePass = function (e) {
    e.preventDefault();
    fetch(HOST_SERVER + "/account/CheckCodeEmail", {
      method: "POST",
      mode: "cors",
      credentials:'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code}
      ),
      
    }).then(
      res=>{
        res.text()
        .then((text=>{if("ok"===JSON.parse(text).mess)
      {
        window.location.href="/"
      }}))
      }
      );
  }
    return(<div className={FormAccount.wrapper}>
    {/* <img src="https://toptechmakers.com/wp-content/uploads/2022/04/social-media-marketing-services.png" alt=""></img> */}
  <section className={FormAccount.register__form}>
    <LogoWebsite />
    <h1>Hello, welcome back</h1>
    <form className="" onSubmit={handleRestorePass}>   
      <div className={[FormAccount.field, FormAccount.input__text].join(' ')}>
        <input 
        type="text" 
        name="email" 
        placeholder="Enter Code"
        onChange={(e)=>{setCode(e.currentTarget.value)}}
        />
      </div>
      <div className={[FormAccount.field, FormAccount.button].join(' ')}>
        <input type="submit" name="submit" value="Send"/>
      </div>
    </form>
  </section>
</div>)
}

export default CheckCodeEmail;