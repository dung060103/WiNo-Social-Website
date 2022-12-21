import { useEffect, useState, useRef } from "react";
import { Icon_Angle_Right, Icon_Sign_Out } from "../../../../parts/icons/fontAwesome/FontAwesome";
import "../popupAccountHeader/PopupAccountHeader.css";
import PopUpHeader from "../PopUpHeader";
import ItemOpt from "../../../../parts/item/itemOpt/ItemOpt";
import LabelCircle from "../../../../parts/labels/labelCircle/LabelCircle";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context_Account } from "../../../../../store/Context";
import {useStore} from '../../../../../store/hooks'
import { set_url } from "../../../../../store/actions";
var listItemOptAccountHeader = [
  {
    el_Icon_Label: <i className="fa-solid fa-display"></i>,
    title_itemOpt: "Display & Accessibility",
    isSummary: true,
  },
  {
    el_Icon_Label: <i className="fa-solid fa-question"></i>,
    title_itemOpt: "Help & Support",
    isSummary: true,
  },
  {
    el_Icon_Label: <i className="fa-solid fa-gear"></i>,
    title_itemOpt: "Settings and Privacy",
    isSummary: true,
  },
  {
    el_Icon_Label: <Icon_Sign_Out />,
    title_itemOpt: "Sign Out",
    isSummary: false,
    handleClick: async (event,state) => {
      console.log("CLICK!!!!");
      const result = JSON.parse(
        await (
          await fetch("http://localhost:5000" + "/account/sign-out/", {
            credentials: "include",
          })
        ).text()
      ).status;
      if (result === 200) {
          state.socket.emit(`I'M_SIGN_OUT`,state.account)
          sessionStorage.setItem(
            "noReload",
            4
          );
        document.location.reload();
      }
    },
  },
  {
    el_Icon_Label: <i className="fa-solid fa-envelope-open-text"></i>,
    title_itemOpt: "Feedback",
    isSummary: false,
  },
];
function PopupAccountHeader({
}) {
  console.log("PopupAccountHeader() render");
  var [state,dispatch] = useStore()
  var account = state.account;
  // console.log(account);
  console.groupEnd("PopupAccountHeader");
  return (
    <PopUpHeader
      isActive={true}
      body={
        <>
          <Link onClick={()=>{
            dispatch(set_url(`/account/personal/${account.slug_personal}`))
          }} id="pagePersonal" to={"/account/personal/" + account.slug_personal}>
            <ItemOpt
              handleClick={(event) => {}}
              component_Left={<LabelCircle urlImg={account.avatar_account} />}
              children_centerItemOpt={account.user_fname+' '+account.user_lname}
            />
          </Link>

          {listItemOptAccountHeader.map((el, idx) => {
            return (
              <ItemOpt
                handleClick={el.handleClick}
                component_Left={<LabelCircle el_Icon={el.el_Icon_Label} />}
                children_centerItemOpt={el.title_itemOpt}
                component_Right={
                  el.isSummary ? (
                    <Icon_Angle_Right />
                  ) : (
                    ""
                  )
                }
                key={idx}
              />
            );
          })}
        </>
      }
    />
  );
}
export default PopupAccountHeader;
