import { io } from "socket.io-client";
import { HOST_SERVER } from "../config";
import { ADD_FRIEND_ONLINE, ADD_POPUP_CONTENT, ADD_POPUP_MESSENGER, ADD_POPUP_REVIEW, DELETE_FRIEND_ONLINE, DELETE_POPUP_MESSENGER, DELETE_POPUP_REVIEW, DELETE_POP_CONTENT, SET_DATA_ACCOUNT, SET_IO, SET_NOTIFICATION_MESS, SET_URL } from "./constants";

export const initStates = {
  listNotificationMess:[],
  popUpContents: [],
  popUpMessengers: [],
  popUpReviews:[],
  account: {},
  friendsOnline:[],
  socket:io(HOST_SERVER,{transports:['websocket']}),
  socketChat:io(HOST_SERVER+'/chat',{transports:['websocket']}),
  url:`${HOST_SERVER}/`
};
export function reducer(state, action) {
  switch (action.type) {
    case ADD_POPUP_CONTENT:
      console.log(state);
      return {
        ...state,
        popUpContents: [...state.popUpContents, action.payload],
      };
      case ADD_POPUP_REVIEW:
      console.log(state);
      return {
        ...state,
        popUpReviews: [...state.popUpReviews, action.payload],
      };
      case DELETE_POPUP_REVIEW:
      console.log(state);
      return {
        ...state,
        popUpReviews: [],
      };
    case ADD_POPUP_MESSENGER:
      if(state.popUpMessengers.length<= 0)
      {
        return {
          ...state,
          popUpMessengers: [...state.popUpMessengers, action.payload],
        };
      }
      else if(!state.popUpMessengers.some(el=>el.props.idChat==action.payload.props.idChat))
      {
        return {
          ...state,
          popUpMessengers: [...state.popUpMessengers, action.payload],
        };
      }
      else
      {
        return {
          ...state,
          popUpMessengers: [...state.popUpMessengers],
        };
      }
    case SET_DATA_ACCOUNT:
      console.log(state);
      return {
        ...state,
        account: action.payload,
      };
      case SET_NOTIFICATION_MESS:
        console.log(state);
        return {
          ...state,
          // listNotificationMess: action.payload,
        };
    case SET_IO:
    console.log(state);
    return {
      ...state,
      io:action.payload,
    };
    case SET_URL:
    console.log(state);
    return {
      ...state,
      url:action.payload,
    };
    case ADD_FRIEND_ONLINE:
        if(state.friendsOnline.length>0&& state.friendsOnline.some(el=>el.slug_personal==action.payload.slug_personal))
        return {
          ...state,
          friendsOnline:[...state.friendsOnline],
        };
        else
        {
          return {
            ...state,
            friendsOnline:[...state.friendsOnline,action.payload],
          };
        }
        case DELETE_FRIEND_ONLINE:
        console.log(state);

          if(state.friendsOnline.length>0&& state.friendsOnline.some(el=>el.slug_personal==action.payload.slug_personal))
          state.friendsOnline.forEach((el,idx)=>{
            if(el.slug_personal==action.payload.slug_personal)
            {
              console.log(idx);
              state.friendsOnline.splice(idx,1)
              return {
                ...state,
                friendsOnline:[...state.friendsOnline],
              };
            }
          })
          else
          {
            return {
              ...state,
              friendsOnline:[...state.friendsOnline],
            };
          }
          case DELETE_POP_CONTENT:
    console.log(state);

          if(state.popUpContents.length>0&& state.popUpContents.some(el=>el==action.payload))
          state.popUpContents.forEach((el,idx)=>{
            if(el==action.payload)
            {
              console.log(idx);
              state.popUpContents.splice(idx,1)
              return {
                ...state,
                popUpContents:[...state.popUpContents],
              };
            }
          })
          else
          {
            return {
              ...state,
              popUpContents:[...state.popUpContents],
            };
          }
          case DELETE_POPUP_MESSENGER:
    console.log(state);

          if(state.popUpMessengers.length>0&& state.popUpMessengers.some(el=>el.props.idChat==action.payload.idChat))
          state.popUpMessengers.forEach((el,idx)=>{
            if(el.props.idChat==action.payload.idChat)
            {
              state.popUpMessengers.splice(idx,1)
              return {
                ...state,
                popUpMessengers:[...state.popUpMessengers],
              };
            }
          })
          else
          {
            return {
              ...state,
              popUpMessengers:[...state.popUpMessengers],
            };
          }
  
    default:
      break;
  }
}
