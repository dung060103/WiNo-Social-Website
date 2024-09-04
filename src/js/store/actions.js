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
export const add_popup_content = (payload) => ({
  type: ADD_POPUP_CONTENT,
  payload,
})
export const add_popup_messenger = (payload) => ({
  type: ADD_POPUP_MESSENGER,
  payload,
})
export const set_data_account = (payload) => ({
  type: SET_DATA_ACCOUNT,
  payload,
})
export const add_friend_online = (payload) => ({
  type: ADD_FRIEND_ONLINE,
  payload,
})
export const set_io = (payload) => ({
  type: SET_IO,
  payload,
})
export const delete_friend_online = (payload) => ({
  type: DELETE_FRIEND_ONLINE,
  payload,
})
export const delete_popup_messenger = (payload) => ({
  type: DELETE_POPUP_MESSENGER,
  payload,
})
export const delete_pop_content = (payload) => ({
  type: DELETE_POP_CONTENT,
  payload,
})
export const set_notification_mess = (payload) => ({
  type: SET_NOTIFICATION_MESS,
  payload,
})
export const add_popup_review = (payload) => ({
  type: ADD_POPUP_REVIEW,
  payload,
})
export const delete_popup_review = (payload) => ({
  type: DELETE_POPUP_REVIEW,
  payload,
})
export const set_url = (payload) => ({
  type: SET_URL,
  payload,
})
export const add_popup_call_video = (payload) => ({
  type: ADD_POPUP_CALL_VIDEO,
  payload,
})
export const delete_popup_call_video = (payload) => ({
  type: DELETE_POPUP_CALL_VIDEO,
  payload,
})
