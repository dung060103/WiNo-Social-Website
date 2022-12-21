import "../../buttons/buttonNormal/ButtonNormal.css";
import clsx from "clsx";
import { useEffect, useState } from "react";
import PopUp_ from "../../../layouts/popups/popup";
function ButtonNormal(
    {
        elIcon=''
        ,textBtn
        ,isNo=false,
        styles,
        handleClick=()=>{},
        isEnable=true,
        componentPopUP=[],
        isRadio=false,
    }
) {

  const [stateEnable,set_stateEnable ] = useState(isEnable)
  const [stateShowPopUp,set_stateShowPopUp ] = useState(false)
useEffect(()=>{console.log(stateShowPopUp);},[stateShowPopUp])
useEffect(()=>{set_stateEnable(isEnable)},[isEnable])

  return (
    <div className="container-buttonNormal" style={styles}>
      <div className="main-buttonNormal">
        <div 
        onClick={(event)=>{
          set_stateShowPopUp(true)
          if(stateEnable)
          {
            console.log(handleClick);
            // set_stateShowPopUp(false)

            handleClick(event);
          }
          else
          {
            

          }
          if(isRadio)
          {
            set_stateEnable(false)
          }
          

        }}
        className={clsx([
          'body-buttonNormal'
          ,{'isNo': isNo}
          ,{'disenable':!stateEnable}
        ])} >
            <div className="sectionIcon-buttonNormal">
                {elIcon}
            </div>
            <div className="sectionText-buttonNormal">
                {textBtn}
            </div>
        </div>
        {stateShowPopUp&&componentPopUP.length>0&&<PopUp_ work_case_unmount={()=>{
          set_stateShowPopUp(false)
        }}>
        <div className="containerPopup-buttonNormal" style={{
          position:'absolute',
          bottom:'0px',
          transform:'translateY(100%)',
          background:'var(--greenColorEnd_Background)',
          padding:'10px',
          borderRadius:'10px',
          minWidth:'200px',
        }}>
          {componentPopUP.map(el=>{
            return <span onClick={()=>{
              set_stateShowPopUp(false)
            }}>
              {el}
            </span>
          })}</div>
        </PopUp_>}
      </div>
    </div>
  );
}
export default ButtonNormal;
