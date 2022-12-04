import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HOST_SERVER } from "../../../../../config";
import { useStore } from "../../../../../store";
import {
  add_popup_review,
  delete_popup_messenger,
  delete_popup_review,
  set_url,
} from "../../../../../store/actions";
import ButtonNormal from "../../../../parts/buttons/buttonNormal/ButtonNormal";
import {
  Icon_Pen_Square,
  Icon_Personal,
  Icon_Square_Check,
  Icon_Trash,
} from "../../../../parts/icons/fontAwesome/FontAwesome";
import ItemOpt from "../../../../parts/item/itemOpt/ItemOpt";
import LabelCircle from "../../../../parts/labels/labelCircle/LabelCircle";
import PopUp_ from "../../popup";
import { Context_Message } from "../../popupMessenger/PopUpMessenger";
import PopUpReviews from "../../popupReview/PopUpReviews";

import "./PopupSettingMessenger.css";
function PopupSettingMessenger({}) {
  var value_Context_Message = useContext(Context_Message);
  var [state, dispatch] = useStore();
  return (
    <PopUp_
      work_case_unmount={() => {
        value_Context_Message.setIsShowSettingMess(false);
      }}
    >
      <div className="container-popupSettingMessenger">
        <div className="main-popupSettingMessenger">
          <div className="body-popupSettingMessenger">
            <div className="header-popupSettingMessenger"></div>
            <div className="content-popupSettingMessenger">
              <div className="contentLeft-popupSettingMessenger"></div>
              <div className="contentCenter-popupSettingMessenger">
                {value_Context_Message.membersChat.length == 2 ? (
                  <Fragment>
                    <Link
                      onClick={() => {
                        dispatch(set_url(new Date().toLocaleString()));
                      }}
                      to={`account/${
                        value_Context_Message.membersChat.filter(
                          (member) =>
                            member.slug_member != state.account.slug_personal
                        )[0].slug_member
                      }`}
                    >
                      <ItemOpt
                        component_Left={<Icon_Personal />}
                        children_centerItemOpt={"Show Personal Page "}
                      />
                    </Link>
                  </Fragment>
                ) : (
                  <Fragment>
                    <ItemOpt
                    component_Left={<Icon_Personal />}
                    children_centerItemOpt={"Members"}
                  />
                  <ItemOpt
                  handleClick={() => {
                    
                    dispatch(
                      add_popup_review(
                        <PopUpEditNameChat nameChat={value_Context_Message.nameChat} idChat = {value_Context_Message.idChat} />
                      )
                    );
                  }}
                  component_Left={<Icon_Pen_Square />}
                  children_centerItemOpt={"Modify name chat"}
                />
                  </Fragment>
                )}
<ItemOpt
                  handleClick={() => {
                    fetch(`${HOST_SERVER}/chat/getMembers`, {
                      method: "POST",
                      credentials: "include",
                      body: JSON.stringify({
                        idChat: value_Context_Message.idChat,
                      }),
                      headers: {
                        "Content-Type": "application/json",
                      },
                    })
                      .then((res) => res.text())
                      .then((dataJson) => {
                        var data = JSON.parse(dataJson);
  
                        dispatch(
                          add_popup_review(
                            
                            <PopUpEditNickNameMember dataMembers={data.result} value_Context_Message={value_Context_Message} />
                          )
                        );
                      });
                  }}
                  component_Left={<Icon_Pen_Square />}
                  children_centerItemOpt={"Modify Nickname"}
                />
                
                <ItemOpt
                  handleClick={() => {
                    fetch(`${HOST_SERVER}/chat/removeChat`, {
                      method: "POST",
                      credentials: "include",
                      body: JSON.stringify({
                        idChat: value_Context_Message.idChat,
                      }),
                      headers: {
                        "Content-Type": "application/json",
                      },
                    });
                    dispatch(
                      delete_popup_messenger({
                        idChat: value_Context_Message.idChat,
                      })
                    );
                  }}
                  component_Left={<Icon_Trash />}
                  children_centerItemOpt={"Delete Chat"}
                />
              </div>
              <div className="contentRight-popupSettingMessenger"></div>
            </div>
            <div className="footer-popupSettingMessenger"></div>
          </div>
        </div>
      </div>
    </PopUp_>
  );
}
function PopUpEditNickNameMember({dataMembers,value_Context_Message})
{


return (<PopUpReviews
  titlePopUp={"Modify Nickname"}
  contentPopUp={
    <div>
      {dataMembers.map((member,idx) => {
        return (
          <ItemEditNickNameMember key={idx} dataMember={member} value_Context_Message={value_Context_Message}/>
        );
      })}
    </div>
  }
/>)
}
function PopUpEditNameChat({
  nameChat,
  idChat,
})
{
  const [state_textarea,set_state_textarea] = useState(nameChat)
  const [state_acceptSubmit,set_state_acceptSubmit] = useState(true)
  const [state,dispatch] = useStore();
  useEffect(()=>{
    set_state_acceptSubmit(state_textarea.trim().length>0&&state_textarea.trim()!=nameChat)
  },[state_textarea])
  useEffect(()=>{
// console.log('state_acceptSubmit',state_acceptSubmit);
  },[state_acceptSubmit])
return (<PopUpReviews
  titlePopUp={"Modify name Chat"}
  contentPopUp={
<Fragment>
<div className={'section-textareaEditNameChat'}>
          <textarea onChange={(event)=>{
            set_state_textarea(event.currentTarget.value)
            // console.log(state_acceptSubmit);
    }}>
{state_textarea}
    </textarea>
    </div>
    <div className={'section-btnEditNameChat'}>
    <ButtonNormal key={1} isNo={true} handleClick={()=>{
      dispatch(delete_popup_review(null))
    }} textBtn={'Cancel'} isEnable={true}/>
    <ButtonNormal 
    handleClick={()=>{
      fetch(`${HOST_SERVER}/chat/modifyNameChat`,{
        method:'POST',
        body:JSON.stringify({
          idChat,nameChat:state_textarea
        }),
        credentials:'include',
        headers:{
          'Content-Type':'application/json'
        }
      });
      dispatch(delete_popup_review(null));
    }}
    key={2}textBtn={'Save'} isEnable={state_acceptSubmit}/>
    </div>

</Fragment>
  }
/>)
}
function ItemEditNickNameMember({dataMember,value_Context_Message})
{
  const [state_EditNickName,set_state_EditNickName] =  useState(false)
  const ref_item_textNickName =  useRef(null)
  const [state_textNickName,set_state_textNickName] =  useState(dataMember.nick_name?dataMember.nick_name:`${dataMember.detail.user_fname} ${dataMember.detail.user_lname}`)

  useEffect(()=>{
if(state_EditNickName)
{
  ref_item_textNickName.current.querySelector('input').focus()
}
  },[state_EditNickName])
return  (<div ref={ref_item_textNickName} > 
            <ItemOpt 
              component_Left={
                <LabelCircle
                  urlImg={
                    dataMember.detail.avatar_account
                  }
                />
              }
              children_centerItemOpt={<div >
                {
                state_EditNickName?<input value={state_textNickName} onChange={(event)=>{
                  set_state_textNickName(event.currentTarget.value)

                }}
                onBlur={
                  (event)=>{
                    set_state_EditNickName(ref_item_textNickName.current.contains(event.currentTarget))
                  }
                }
                style={{
                  "fontSize":"inherit","outline":"none","color":"var(--greenColorHot)","padding":"0px 10px","border":"1px solid var(--greenColorHot)"
                }}
                ></input>:<b>{state_textNickName}</b>}
              </div>

              }
              component_Right={state_EditNickName?<span onClick={()=>{
                console.log('loadasd');
                set_state_EditNickName(false);
                fetch(`${HOST_SERVER}/chat/updateNickname`, {
                  method: "POST",
                  credentials: "include",
                  body: JSON.stringify({
                    idChat: value_Context_Message.idChat,
                    new_nickname:state_textNickName,
                    slug_member:dataMember.slug_member
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                
              }}><Icon_Square_Check /></span>:<span onClick={()=>{
                set_state_EditNickName(true)
              }}><Icon_Pen_Square /></span>}
            />
          </div>)
}
export default PopupSettingMessenger;
