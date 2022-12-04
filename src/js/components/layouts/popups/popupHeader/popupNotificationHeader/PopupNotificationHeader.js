import { useEffect, useState, useRef, Fragment } from "react";
import "./PopupNotificationHeader.css";
import PopUpHeader from "../PopUpHeader";
import ItemOpt from "../../../../parts/item/itemOpt/ItemOpt";
import LabelCircle from "../../../../parts/labels/labelCircle/LabelCircle";
import HeaderSpaceBetween from "../../../../parts/subHeaders/headerSpaceBetween/HeaderSpaceBetween";
import ButtonNormal from "../../../../parts/buttons/buttonNormal/ButtonNormal";
import { Icon_Circle, Icon_No_Bell } from "../../../../parts/icons/fontAwesome/FontAwesome";
import { Link } from "react-router-dom";
import { HOST_SERVER } from "../../../../../config";
import { useStore } from "../../../../../store";
import { set_url } from "../../../../../store/actions";
import { dateTo_textAgo, req_acceptAddNewFriend, req_refuse_requestAddFriend, req_remove_requestAddFriend } from "../../../../../store/functions";
function PopupNotificationHeader({
  dataNotification
}) {
  console.log("PopupNotificationHeader() render");
  const [state,dispatch] = useStore();
  const [state_dataNotification, set_state_dataNotification]  = useState(dataNotification)
  useEffect(()=>{
    state.socket.on(`${state.account.slug_personal}_UPDATE_NOTIFICATION`,data_account=>{
      console.log(`${state.account.slug_personal}_UPDATE_NOTIFICATION`);
      set_state_dataNotification(data_account.notification)
      state.socket.off(`${state.account.slug_personal}_UPDATE_NOTIFICATION`)
    })
  },[state_dataNotification])
  console.groupEnd("PopupNotificationHeader");
  return (
    <PopUpHeader
      isActive={true}
      header={
        <>
          <HeaderSpaceBetween
            bodyLeft={<h1>Notification</h1>}
            bodyRight={[
              ,
              <i className="fa-solid fa-ellipsis"></i>,
            ].map((el) => {
              return <LabelCircle el_Icon={el} />;
            })}
          />
        </>
      }
      body={
       <Fragment>
         {state_dataNotification.friend.response_new_friend.length>0&&<NotificationResponseNewFriend dataNotification={state_dataNotification} state={state} dispatch={dispatch} set_state_dataNotification={set_state_dataNotification}/> }
          {state_dataNotification.friend.accept_friend.length>0&&<NotificationAcceptFriend dataNotification={state_dataNotification} state={state} dispatch={dispatch}/>}
       </Fragment>

      }
    />
  );
}
export function Notification({
  time_notification,
  value_notification,
  isSeen=false,
})
{
  this.time_notification=time_notification;
  this.value_notification=value_notification;
  this.isSeen=isSeen;

}
export function ResponseNewFriend({
  name_friend,
  slug_friend,
  count_mutual_friend,
  avatar_friend,
}={})
{
  this.name_friend=name_friend;
  this.slug_friend=slug_friend;
  this.count_mutual_friend=count_mutual_friend;
  this.avatar_friend=avatar_friend;
  this.typeNotification='ResponseNewFriend'
}
function NotificationResponseNewFriend({
  dataNotification,
  state,
  dispatch,
  set_state_dataNotification
})
{
  return <>
  {
  dataNotification.friend.response_new_friend
  .map((item, idx) => {
      return (
        
        <ItemOpt
          component_Left={
            <Link
        className="link-notification"
        onClick={(event)=>{
          dispatch(set_url(`/account/${item.data_requester.slug_personal}`))
        }}
        to={`/account/${item.data_requester.slug_personal}`}>
              <LabelCircle urlImg={item.data_requester.avatar_account} />
              {<div><b>{`${item.data_requester.user_fname} ${item.data_requester.user_lname}`}</b> Sent a friend request
              <div><b>{dateTo_textAgo(new Date(item.time_request))}</b></div>
              </div>}
              </Link>
          }
          // children_centerItemOpt={}
          component_Right={
            item.isSeen ? (
              ''
            ) : (
              <Icon_Circle />
            )
          }
          component_Sub={
            <>
              <div style={{
                display:'flex'
              }}>
              <ButtonNormal 
              handleClick={()=>{
                req_acceptAddNewFriend(item.data_requester);
                dataNotification.friend.response_new_friend.splice(idx,1);
                set_state_dataNotification(dataNotification)
              }}
              isNo={false} textBtn={'Accept'} />
              <ButtonNormal isNo={true} textBtn={'Refuse'} handleClick={()=>
              {

                req_refuse_requestAddFriend(item.data_requester);
                dataNotification.friend.response_new_friend.splice(idx,1);
                set_state_dataNotification(Object.assign({},dataNotification))
              }
              
              }/>
              </div>
            </>
          }
          key={idx}
        />
        
      );
    
  })}
</>
}
function NotificationAcceptFriend({
  dataNotification,
  state,
  dispatch
})
{
  return <>
  {
  dataNotification.friend.accept_friend
  .map((item, idx) => {
      return (
        
        <ItemOpt
          component_Left={
            <Link
        className="link-notification"
        onClick={(event)=>{
          dispatch(set_url(`/account/${item.data_accepter.slug_personal}`))
        }}
        to={`/account/${item.data_accepter.slug_personal}`}>
              <LabelCircle urlImg={item.data_accepter.avatar_account} />
              {<div><b>{`${item.data_accepter.user_fname} ${item.data_accepter.user_lname}`}</b> has accepted Your friend request
              <div><i><b>{dateTo_textAgo(new Date(item.time_accept))}</b></i></div>
              </div>}
              </Link>
          }
          // children_centerItemOpt={}
          component_Right={
            item.isSeen ? (
              ''
            ) : (
              <Icon_Circle />
            )
          }
          key={idx}
        />
        
      );
    
  })}
</>
}
export default PopupNotificationHeader;
