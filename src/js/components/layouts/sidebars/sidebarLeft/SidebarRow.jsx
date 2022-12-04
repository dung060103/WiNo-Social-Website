import React from "react";
import "./SidebarRow.css";
import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../../../store";
import { set_url } from "../../../../store/actions";

export default function SidebarRow({ src, Icon, title,href,isShowTittle=true }={}) {
  var navigate =  useNavigate()
  const [state,dispatch] = useStore();
  return (
    <Link onClick={()=>{
      navigate(`/${href}`,{replace:true});
      dispatch(set_url(`${window.location.href}/${href}`))
    }} to={href} style={{color:'inherit'}}>
  <div className="sidebarRow">
{src && <Avatar src={src} className="avatar"/>}
      {Icon && <Icon />}
      {isShowTittle&&<h4>{title}</h4>}
    </div>
</Link>
  );
}
