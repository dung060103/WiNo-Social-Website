import { io } from 'socket.io-client'
import { SOCKET_SERVER } from '@config'
import {
  ADD_FRIEND_ONLINE,
  ADD_POPUP_CALL_VIDEO,
  ADD_POPUP_CONTENT,
  ADD_POPUP_MESSENGER,
  ADD_POPUP_REVIEW,
  DELETE_FRIEND_ONLINE,
  DELETE_POPUP_CALL_VIDEO,
  DELETE_POPUP_MESSENGER,
  DELETE_POPUP_REVIEW,
  DELETE_POP_CONTENT,
  SET_DATA_ACCOUNT,
  SET_IO,
  SET_NOTIFICATION_MESS,
  SET_URL,
} from './constants'

export const initStates = {
  listNotificationMess: [],
  popUpContents: [],
  popUpMessengers: [],
  popUpReviews: [],
  account: {},
  friendsOnline: [],
  socket: io(SOCKET_SERVER, { transports: ['websocket'] }),
  socketChat: io(SOCKET_SERVER + '/chat', { transports: ['websocket'] }),
  url: `${SOCKET_SERVER}/`,
  popUpCallVideo: null,
}
export function reducer(state, action) {
  switch (action.type) {
    case ADD_POPUP_CALL_VIDEO:
      return {
        ...state,
        popUpCallVideo: action.payload,
      }
    case DELETE_POPUP_CALL_VIDEO:
      return {
        ...state,
        popUpCallVideo: action.payload,
      }
    case ADD_POPUP_CONTENT:
      return {
        ...state,
        popUpContents: [...state.popUpContents, action.payload],
      }
    case ADD_POPUP_REVIEW:
      return {
        ...state,
        popUpReviews: [...state.popUpReviews, action.payload],
      }
    case DELETE_POPUP_REVIEW:
      return {
        ...state,
        popUpReviews: [],
      }
    case ADD_POPUP_MESSENGER:
      if (state.popUpMessengers.length <= 0) {
        return {
          ...state,
          popUpMessengers: [...state.popUpMessengers, action.payload],
        }
      } else if (
        !state.popUpMessengers.some(
          (el) => el.props.idChat === action.payload.props.idChat,
        )
      ) {
        return {
          ...state,
          popUpMessengers: [...state.popUpMessengers, action.payload],
        }
      } else {
        return {
          ...state,
          popUpMessengers: [...state.popUpMessengers],
        }
      }
    case SET_DATA_ACCOUNT:
      return {
        ...state,
        account: action.payload,
      }
    case SET_NOTIFICATION_MESS:
      return {
        ...state,
        // listNotificationMess: action.payload,
      }
    case SET_IO:
      return {
        ...state,
        io: action.payload,
      }
    case SET_URL:
      return {
        ...state,
        url: action.payload,
      }
    case ADD_FRIEND_ONLINE:
      if (
        state.friendsOnline.length > 0 &&
        state.friendsOnline.some(
          (el) => el.slug_personal === action.payload.slug_personal,
        )
      )
        return {
          ...state,
          friendsOnline: [...state.friendsOnline],
        }
      else {
        return {
          ...state,
          friendsOnline: [...state.friendsOnline, action.payload],
        }
      }
    case DELETE_FRIEND_ONLINE:
      if (
        state.friendsOnline.length > 0 &&
        state.friendsOnline.some(
          (el) => el.slug_personal === action.payload.slug_personal,
        )
      )
        state.friendsOnline.forEach((el, idx) => {
          if (el.slug_personal === action.payload.slug_personal) {
            state.friendsOnline.splice(idx, 1)
            return {
              ...state,
              friendsOnline: [...state.friendsOnline],
            }
          }
        })
      else {
        return {
          ...state,
          friendsOnline: [...state.friendsOnline],
        }
      }
      break
    case DELETE_POP_CONTENT:
      if (
        state.popUpContents.length > 0 &&
        state.popUpContents.some((el) => el === action.payload)
      )
        state.popUpContents.forEach((el, idx) => {
          if (el === action.payload) {
            state.popUpContents.splice(idx, 1)
            return {
              ...state,
              popUpContents: [...state.popUpContents],
            }
          }
        })
      else {
        return {
          ...state,
          popUpContents: [...state.popUpContents],
        }
      }

      break
    case DELETE_POPUP_MESSENGER:
      if (
        state.popUpMessengers.length > 0 &&
        state.popUpMessengers.some(
          (el) => el.props.idChat === action.payload.idChat,
        )
      )
        state.popUpMessengers.forEach((el, idx) => {
          if (el.props.idChat === action.payload.idChat) {
            state.popUpMessengers.splice(idx, 1)
            return {
              ...state,
              popUpMessengers: [...state.popUpMessengers],
            }
          }
        })
      else {
        return {
          ...state,
          popUpMessengers: [...state.popUpMessengers],
        }
      }

      break
    default:
      break
  }
}
