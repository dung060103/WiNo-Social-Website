import { useEffect, useState, useRef, useContext } from "react";
import { ContextPopUp } from "../../../../store/Context";
import {default as PopUp} from "../popup";
import "../popupHeader/PopUpHeader.css";
function PopUpHeader({
  isActive,
  header='',
  body='',
  footer='',
  codeLabelPopUP
  ,
  workMount = () => {},
  workUnMount = () => {},
}) {

  console.group("PopUpHeader");
  // const ref = useRef(null);
  console.log("PopUpHeader() render");
  // console.log(ContextPopUp);
  // console.log(useContext(ContextPopUp));
  console.groupEnd("PopUpHeader");
  return (
<PopUp>
<div className="container-PopUpHeader" 
    >
      <div className="main-PopUpHeader">
      <div className="header-PopUpHeader">{header}</div>
      <div className="body-PopUpHeader">{body}</div>
      <div className="footer-PopUpHeader">{footer}</div>
      </div>
    </div>
</PopUp>)
}
export default PopUpHeader;
