import PopUpHeader from "../PopUpHeader";
import HeaderSpaceBetween from "../../../../parts/subHeaders/headerSpaceBetween/HeaderSpaceBetween";
import Link_ from "../../../../parts/links/link/Link";
import FormSearch from "../../../../parts/inputs/forms/formSearch/FormSearch";
import { Icon_Circle, Icon_Ellipsis,Icon_Pen_Square } from "../../../../parts/icons/fontAwesome/FontAwesome";
import ItemOpt from "../../../../parts/item/itemOpt/ItemOpt";
import LabelCircle from "../../../../parts/labels/labelCircle/LabelCircle";
import { useStore } from "../../../../../store";
import { actions } from "../../../../../store";
import PopUpMessenger from "../../popupMessenger/PopUpMessenger";
import { content_sessionMessage, contentPopUpMessenger } from "../../popupMessenger/PopUpMessenger";
import { useEffect,useContext, useRef, Fragment, useState } from "react";
import { dateTo_textAgo } from "../../../../../store/functions";
import { Context_Account,ContextPopUp,Context_PopUpMessengers } from "../../../../../store/Context";
import { HOST_SERVER } from "../../../../../config";
import { delete_pop_content } from "../../../../../store/actions";


function PopupMessageHeader({
  listChat=[]
})
{
  const [state_listChat,set_state_listChat] = useState(listChat)
  // console.log(listChat);
  const [state, dispatch] = useStore();
  // const value_ContextPopUp = useContext(ContextPopUp);
  // console.log(value_ContextPopUp);
  
  useEffect(()=>{
    // console.log(listChat[0].lastSessionMessage.time_send,new Date(listChat[0].lastSessionMessage.time_send).toJSON());
      },[])

    return (
        <PopUpHeader
                      isActive={true}
                      header={
                        <>
                          <HeaderSpaceBetween
                            bodyLeft={<h1>Chat</h1>}
                            bodyRight={[
                                <Icon_Ellipsis />
                              ,<Icon_Pen_Square />
                              
                            ].map((el,idx) => {

                              return <LabelCircle key={idx} el_Icon={el} />;
                            })}
                          />
                          <FormSearch
                          handler_Search={(value)=>{
                            if(value.trim().length>0)
                            {
                              fetch(`${HOST_SERVER}/chat/search?keyword=${value}`,{
                                credentials:'include'
                              }).then(res=>res.text()).then(dataJson=>{
                                var data = JSON.parse(dataJson);
                                set_state_listChat(data.result);
                              })
                            }
                            else
                            {
                              set_state_listChat(listChat);
                            }
                          }}
                          placeholder_text={"Search on Message"} />
                        </>
                      }
                      footer={
                        <Link_ text={"See all in mess"} isUnderline={true} />
                      }
                      body={
                        <>
                          {state_listChat.map((el, idx) => {
                            var slug_last = el.slug_sender                            
                            return (
                              <ItemOpt
                                handleClick={()=>{
                                  req_getDetailChat({data_Chat_id:el._id,dispatch,state,data_Chat_isSeen:el.isSeen})
                                }}
                                children_centerItemOpt={
                                  <div>
                                    <b>{el.nameChat}</b>
                                  {
                                    el.lastSessionMessage?
                                      !el.isSeen?
                                    <b>
                                      {el.last_interact?<LastInteractMessageHeader slug_last={slug_last} el={el} state={state}/>:<LastSessionMessageHeader slug_last={slug_last} el={el} state={state}/>} 
                                    </b>
                                      :
                                      el.last_interact?<LastInteractMessageHeader slug_last={slug_last} el={el} state={state}/>:<LastSessionMessageHeader slug_last={slug_last} el={el} state={state}/>                                 
:''
                                  }
                                  </div>
                                }
                                component_Left={
                                  <>
                                    <LabelCircle urlImg={el.avatarChat} />
                                    {/* <b>{el.name_account}</b>  */}
                                    {/* <div><span>You: </span> A zo what sup men <span>15 minutes ago </span></div> */}
                                  </>
                                }
                                component_Right={
                                  !el.isSeen ? (
                                    <Icon_Circle />
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
    )
}
export const shortLassSessionMess=(lastSessionMessage,typeDisplay)=>{
  var result;
  if(typeDisplay==null)
  {
    typeDisplay='Send'
  }
  if(lastSessionMessage)
  {
    Object.entries(lastSessionMessage).forEach(([key,value])=>{
      if(value&& key!='time_send')
      {
        switch (key) {
          case "reply":
            result=' Replied a message '
            break;
          case ("image"):
          result= ` ${typeDisplay} image`
          break;
          case "text":
          result= ` ${value.length>20?`${value.substring(0,20)}...`:value} `
          break;
          case "video":
          result= ` ${typeDisplay} Video `
          break;
          case "audio":
          result= ` ${typeDisplay} Audio `
          break;
          case "gif":
          result= ` ${typeDisplay} Gif `
          break;
          case "application":
          result= ` ${typeDisplay} File `
          break;
          default:
            break;
        }
      }
      else
      {
        if(check_UnsentMessage(lastSessionMessage))
        {
          result = 'unsent a message'
        };
      }
      
    })
  }
  else
  {
    result = 'unsent a message'
  }
return result
  
}
export function isMeSender({slug_me,slug_sender,name_sender,typeDisplay}){
  if(typeDisplay==null)
  {
    typeDisplay=':'
  }
  if(slug_me==slug_sender)
  {
    return ` You ${typeDisplay}`
  }
  else
  {
    var shortName = name_sender.split(' ')
    return `${shortName[shortName.length-1]} ${typeDisplay}`;
  }
}
function LastSessionMessageHeader({el,state,slug_last})
{
  return (
<div style={{display:'flex', alignItems:'center'}}>
<span >{isMeSender({
      slug_me: state.account.slug_personal,
      name_sender:el.name_sender,
      slug_sender: slug_last
    })}</span>
    <i>{shortLassSessionMess(el.lastSessionMessage)}</i>
    <span style={{marginLeft:'20px'}}>{dateTo_textAgo(new Date(el.lastSessionMessage.time_send))}</span>
</div>
  )
}
function LastInteractMessageHeader({el,state,slug_last})
{
  return (
<div style={{display:'flex', alignItems:'center'}}>
<span>{isMeSender({
      slug_me: state.account.slug_personal,
      name_sender:el.last_interact.name_interact_er,
      slug_sender: slug_last
    })}</span>
    <i>{`Expressed feeling ${el.last_interact.value_interact}`}</i>
    <span style={{marginLeft:'20px'}}>{dateTo_textAgo(new Date(el.last_interact.time_interact))}</span>
</div>
  )
}
export function check_UnsentMessage(sessionMessage)
{
  return !Object.entries(sessionMessage).some(el=>el[0]!='time_send' && el[1] && Object.keys(el[1]).length>0)
}
export const req_getDetailChat = ({data_Chat_id,state,dispatch,data_Chat_isSeen=false}) => {
  state.popUpContents.forEach(popUpContent=>
  {
    if(popUpContent.props.children.props.listChat)
    {
      
      dispatch(delete_pop_content(popUpContent));
    }

  })
  fetch(HOST_SERVER+`/chat/getDetailChat?_id=${JSON.stringify(data_Chat_id)}&isSeen=${data_Chat_isSeen}`,{
    credentials:'include',
    method:'GET'
    ,
  })
  .then(res=>res.text()).then(dataJson=>{
    var data= JSON.parse(dataJson)
    console.log(data.result);
      dispatch(
        actions.add_popup_messenger(
          <PopUpMessenger 
          membersChat={data.result.members}
          idChat={data.result._id}
          last_interact={data.result.last_interact}
              avatarChat={data.shortChat.avatarChat}
              nameChat={data.shortChat.nameChat}
              contentsPopUpMessenger={data.result.content_messages}
              // contentsPopUpMessenger={
              //   data.result.content_messages.map(el=>{
              //   return new contentPopUpMessenger({
              //     isMe : state.account.slug_personal==el.slug_sender,
              //     avatar_sender:el.avatar_account
              //     ,name_sender:el.name_sender
              //     ,slug_sender:el.slug_sender
              //     ,session_messages:
              //       el.session_messages.map(session_message=>{
              //      if(session_message!=null)
              //      {
              //       return  new content_sessionMessage({
              //         text:session_message.text,
              //         audio:session_message.audio,
              //         image:session_message.image,
              //         video:session_message.video,
              //         reply:session_message.reply,
              //         document:session_message.document,
              //         time_send:session_message.time_send,
              //         gif:session_message.gif,
              //         interact:session_message.interact,
              //         application:session_message.application,
              //         isShare:session_message.isShare
              //       })
              //      }
              //      else
              //      {
              //       return null;
              //      }
              //       })
                  
              //   })
              // })
              
              // }

              
          />
        )
      );
    
  })
  
}  
export default PopupMessageHeader