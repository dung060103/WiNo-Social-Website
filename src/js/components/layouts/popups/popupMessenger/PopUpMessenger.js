import '../popupMessenger/PopUpMessenger.css'

import FormMessenger from '@components/parts/inputs/forms/formMessenger/FormMessenger'
import LabelCircle from '@components/parts/labels/labelCircle/LabelCircle'
import ItemOpt from '@components/parts/item/itemOpt/ItemOpt'
import HeaderSpaceBetween from '@components/parts/subHeaders/headerSpaceBetween/HeaderSpaceBetween'
import {
  Icon_Angle_Down,
  Icon_Arrow_Down,
  Icon_CallVideo,
  Icon_Close,
  Icon_Window_MiniSize,
} from '@components/parts/icons/fontAwesome/FontAwesome'
import Message from '@components/parts/messages/Message'

import { createContext, useRef, useState, useEffect } from 'react'
import PopupSettingMessenger from '../popupSettingMessenger/PopupSettingMessenger/PopupSettingMessenger'
import PopUp_ from '../popup'
import { useStore } from '@store'
import { add_popup_call_video, delete_popup_messenger } from '@store/actions'
import {
  isMeSender,
  shortLassSessionMess as Display_shortLassSessionMess,
} from '../popupHeader/popupMessageHeader/PopupMessageHeader'
import PopUpCallVideo from '../popupCallVideo/PopUpCallVideo'
import Peer from 'peerjs'
export const Context_Message = createContext()
import PropTypes from 'prop-types'
import { createRequest } from '@utils/requests'

/* eslint-disable no-unused-vars */
function PopUpMessenger({
  idChat,
  nameChat,
  avatarChat,
  last_interact,
  membersChat = [],
  contentsPopUpMessenger = [],
}) {
  const [state_contentsPopUpMessenger, setState_contentsPopUpMessenger] =
    useState(contentsPopUpMessenger)
  const [state_typingsPopUpMessenger, setState_typingsPopUpMessenger] =
    useState([])
  const [state, dispatch] = useStore()
  const [isZoomOut, setIs_zoomOut] = useState(false)
  const [isHoverZoomOut, setIs_Hover_zoomOut] = useState(false)
  const [isClose, setIs_close] = useState(false)
  const [isShowSettingMess, setIsShowSettingMess] = useState(false)
  const [isShowMoveDownMess, set_isShowMoveDownMess] = useState(false)
  const [state_name_chat, set_state_name_chat] = useState(nameChat)
  const [state_avatar_chat, set_state_avatar_chat] = useState(avatarChat)
  console.log(state_name_chat)
  const refContentPopUp = useRef(null)

  const [stateCountMess, set_stateCountMess] = useState([])
  const [statePopupContentMess, set_statePopupContentMess] = useState([])
  const [stateReplyMess, set_stateReplyMess] = useState(null)
  useEffect(() => {
    state.socketChat.on(
      `${state.account.slug_personal}_SHUTDOWN_CALL_VIDEO`,
      (data) => {
        // dispatch(delete_popup_call_video(null));
      },
    )

    state.socketChat.on(`PEOPLE_${idChat}_UPDATE_BOX_CHAT`, (data) => {
      set_state_name_chat(data.box_chat.name_chat)
      set_state_avatar_chat(data.box_chat.avatar_chat)
    })
    state.socketChat.on(`PEOPLE_${idChat}_SENDING`, (content_messages) => {
      var state_tmp = state_contentsPopUpMessenger
      var last_content_mess =
        state_contentsPopUpMessenger[state_contentsPopUpMessenger.length - 1]
      var last_session_mess = null
      console.log(content_messages.message)
      if (last_content_mess) {
        // console.log('_SENDING',last_content_mess.session_messages.length);
        last_session_mess =
          last_content_mess.session_messages[
            last_content_mess.session_messages.length - 1
          ]
        if (
          state_contentsPopUpMessenger.length > 0 &&
          content_messages.message.session_messages
        ) {
          if (
            last_session_mess.time_send !=
            content_messages.message.session_messages[0].time_send
          ) {
            setState_contentsPopUpMessenger(() => [
              ...state_tmp,
              new contentPopUpMessenger({
                isMe:
                  state.account.slug_personal ==
                  content_messages.account.slug_personal,
                name_sender: content_messages.message.name_sender,
                avatar_account: content_messages.account.avatar_account,
                session_messages: content_messages.message.session_messages,
                slug_sender: content_messages.account.slug_personal,
              }),
            ])
          }
        }
      } else {
        setState_contentsPopUpMessenger(() => [
          ...state_tmp,
          new contentPopUpMessenger({
            isMe:
              state.account.slug_personal ==
              content_messages.account.slug_personal,
            name_sender:
              content_messages.account.fname +
              ' ' +
              content_messages.account.lname,
            avatar_account: content_messages.account.avatar_account,
            session_messages: content_messages.message.session_messages,
            slug_sender: content_messages.account.slug_personal,
          }),
        ])
        console.log('_SENDING', [
          ...state_tmp,
          new contentPopUpMessenger({
            isMe:
              state.account.slug_personal ==
              content_messages.account.slug_personal,
            name_sender:
              content_messages.account.fname +
              ' ' +
              content_messages.account.lname,
            avatar_sender: content_messages.account.avatar_account,
            session_messages: content_messages.message.session_messages,
            slug_sender: content_messages.account.slug_personal,
          }),
        ])
      }
      state.socketChat.off(`PEOPLE_${idChat}_REMOVING`)
    })

    state.socketChat.on(
      `PEOPLE_${idChat}_REMOVING`,
      ({ idx_sessionMessage, slug_sender, idChat }) => {
        console.log('_REMOVING', state_contentsPopUpMessenger)
        var idx_content_message = parseInt(idx_sessionMessage.split('/')[0])
        var idx_sessionMessageUpdate = parseInt(
          idx_sessionMessage.split('/')[1],
        )
        var tmp_ContentMessage = state_contentsPopUpMessenger
        // console.log('_REMOVING',tmp_ContentMessage,idx_content_message);
        var tmp_session_mess =
          tmp_ContentMessage[idx_content_message].session_messages[
            idx_sessionMessageUpdate
          ]
        tmp_ContentMessage[idx_content_message].session_messages[
          idx_sessionMessageUpdate
        ] = null
        tmp_ContentMessage[idx_content_message].session_messages[
          idx_sessionMessageUpdate
        ] = new content_sessionMessage({
          time_send: tmp_session_mess.time_send,
        })
        tmp_ContentMessage.forEach((content_message) => {
          content_message.session_messages.forEach((session_message) => {
            if (session_message != null) {
              if (session_message.reply != null) {
                if (
                  session_message.reply.slug_sender == slug_sender &&
                  session_message.reply.sessionMessage.time_send ==
                    tmp_session_mess.time_send
                )
                  session_message.reply = null
              }
            }
          })
        })
        setState_contentsPopUpMessenger(tmp_ContentMessage.concat([]))
      },
    )
    if (!isShowMoveDownMess) {
      if (refContentPopUp.current) {
        refContentPopUp.current.scrollTo(
          0,
          refContentPopUp.current.scrollHeight,
        )
      }
    }
  }, [state_contentsPopUpMessenger])
  useEffect(() => {
    if (!isShowMoveDownMess) {
      if (refContentPopUp.current) {
        refContentPopUp.current.scrollTo(
          0,
          refContentPopUp.current.scrollHeight,
        )
      }
    }
  }, [state_typingsPopUpMessenger])
  useEffect(() => {
    if (refContentPopUp.current) {
      refContentPopUp.current.scrollTo(0, refContentPopUp.current.scrollHeight)
    }
    state.socketChat.on(`PEOPLE_SENDING`, (id_ChatSocket) => {
      if (idChat == id_ChatSocket.id_Chat) {
        setIs_Hover_zoomOut(true)
        setTimeout(() => {
          setIs_Hover_zoomOut(false)
        }, 3000)
      } else {
        setIs_Hover_zoomOut(false)
      }
    })
    // console.log(`PEOPLE_${idChat}_REACTING`);
    state.socketChat.on(`PEOPLE_${idChat}_REACTING`, (dataReacting) => {
      var idx_content_message = parseInt(
        dataReacting.idx_sessionMessage.split('/')[0],
      )
      var idx_sessionMessageUpdate = parseInt(
        dataReacting.idx_sessionMessage.split('/')[1],
      )
      var dataMemberInteract_er = membersChat.filter(
        (member) => member.slug_member === dataReacting.slug_interact_er,
      )[0]
      membersChat.forEach((member) => {
        if (member.slug_member === state.account.slug_personal) {
          if (member.startContent) {
            console.log(
              `PEOPLE_${idChat}_REACTING`,
              idx_content_message,
              state_contentsPopUpMessenger[idx_content_message],
            )
            idx_content_message = idx_content_message - member.startContent - 1
          }
          if (dataMemberInteract_er && dataMemberInteract_er.startContent > 0) {
            idx_content_message =
              idx_content_message + dataMemberInteract_er.startContent + 1
          }
          console.log(
            `PEOPLE_${idChat}_REACTING`,
            idx_content_message,
            state_contentsPopUpMessenger[idx_content_message],
          )
          if (state_contentsPopUpMessenger[idx_content_message]) {
            state_contentsPopUpMessenger[idx_content_message].session_messages[
              idx_sessionMessageUpdate
            ] = dataReacting.value_sessionMessage
            setState_contentsPopUpMessenger(
              [].concat(state_contentsPopUpMessenger),
            )
          }
        }
      })
    })
  }, [state_contentsPopUpMessenger])
  useEffect(() => {
    state.socketChat.on(`PEOPLE_SENDING`, (dataIDchat) => {
      if (isZoomOut) {
        // console.log('AAAAAAAAA',stateCountMess[0].time_send,dataIDchat.time_send);
        if (
          stateCountMess.length > 0 &&
          stateCountMess[stateCountMess.length - 1].time_send !=
            dataIDchat.time_send
        ) {
          if (
            idChat == dataIDchat.id_Chat &&
            state.account.slug_personal != dataIDchat.slug_sender
          ) {
            var tmpState = stateCountMess.filter((el) => {
              return el.id_Chat == idChat
            })
            set_stateCountMess((stateCountMess) => {
              return tmpState.concat([dataIDchat])
            })
          }
        } else if (stateCountMess.length == 0) {
          if (
            idChat == dataIDchat.id_Chat &&
            state.account.slug_personal != dataIDchat.slug_sender
          ) {
            set_stateCountMess((stateCountMess) => {
              return [dataIDchat]
            })
          }
        }
      } else {
        set_stateCountMess([])
      }
    })
  }, [stateCountMess, isZoomOut])
  useEffect(() => {
    refContentPopUp.current.scrollTo(0, refContentPopUp.current.scrollHeight)
    refContentPopUp.current.addEventListener('resize', (event) => {
      console.log('WIDTH', event.currentTarget.innerWidth)
    })
  }, [refContentPopUp])
  useEffect(() => {
    document
      .querySelectorAll('.container_zoomOutPopUpMessenger')
      .forEach((el, idx) => {
        el.style.position = 'absolute'
        el.style.bottom = (idx + 1) * 60 + 'px'
        el.style.right = '0'
      })
    if (!isZoomOut) {
      if (refContentPopUp.current) {
        refContentPopUp.current.scrollTo(
          0,
          refContentPopUp.current.scrollHeight,
        )
      }
    }
  }, [isZoomOut])
  return (
    !isClose && (
      <PopUp_
        // showContainerOutside={true}
        isClickOutside={false}
      >
        <Context_Message.Provider
          value={{
            refContentPopUp,
            state_contentsPopUpMessenger,
            setState_contentsPopUpMessenger,
            state_typingsPopUpMessenger,
            setState_typingsPopUpMessenger,
            stateReplyMess,
            set_stateReplyMess,
            statePopupContentMess,
            set_statePopupContentMess,
            isShowSettingMess,
            setIsShowSettingMess,
            isClose,
            setIs_close,
            idChat,
            membersChat,
            nameChat: state_name_chat,
            avatarChat: state_avatar_chat,
          }}
        >
          {!isZoomOut && (
            <div className="container-popupMessenger">
              <div className="main-popupMessenger">
                <div className="body-popupMessenger">
                  <div className="header-popupMessenger">
                    {statePopupContentMess.map((el) => {
                      return el
                    })}
                    <HeaderSpaceBetween
                      bodyLeft={
                        <div
                          onClick={() => {
                            setIsShowSettingMess(!isShowSettingMess)
                          }}
                        >
                          <ItemOpt
                            component_Left={
                              <LabelCircle urlImg={state_avatar_chat} />
                            }
                            children_centerItemOpt={
                              <b
                                style={{
                                  whiteSpace: 'nowrap',
                                  textOverflow: 'ellipsis',
                                  width: '160px',
                                  overflow: 'hidden',
                                }}
                              >
                                {state_name_chat}
                              </b>
                            }
                            component_Right={
                              <div>
                                <Icon_Angle_Down />
                              </div>
                            }
                          />
                        </div>
                      }
                      bodyRight={
                        <>
                          <span
                            onClick={() => {
                              noTyping_chat({
                                idChat: idChat,
                                socket: state.socketChat,
                                accountTyping: state.account,
                              })
                              const peer = new Peer()

                              const body = {
                                idChat,
                                socketId: state.socketChat.id,
                                content_message: new contentPopUpMessenger({
                                  slug_sender: state.account.slug_personal,
                                  session_messages: [
                                    new content_sessionMessage({
                                      notification: new notificationMess({
                                        callVideo: new notification_callVideo({
                                          isEnded: false,
                                          slug_caller:
                                            state.account.slug_personal,
                                        }),
                                      }),
                                    }),
                                  ],
                                }),
                              }

                              createRequest('POST', '/chat/callVideo', { body })
                              dispatch(
                                add_popup_call_video(
                                  <PopUpCallVideo
                                    membersChat={membersChat}
                                    peer={peer}
                                    avatarCallVideo={state_avatar_chat}
                                    nameCallVideo={state_name_chat}
                                    idChat={idChat}
                                  />,
                                ),
                              )
                            }}
                          >
                            <Icon_CallVideo />
                          </span>
                          {/* <span
                            onClick={(event) => {
                              noTyping_chat({
                                idChat: idChat,
                                socket: state.socketChat,
                                accountTyping: state.account,
                              });

                            }}
                          >
                            <Icon_Video />
                          </span> */}

                          <div
                            onClick={() => {
                              // console.log(state_contentsPopUpMessenger[state_contentsPopUpMessenger.length-1].name_sender);
                              noTyping_chat({
                                idChat: idChat,
                                socket: state.socketChat,
                                accountTyping: state.account,
                              })
                              setIs_zoomOut(true)
                            }}
                          >
                            <Icon_Window_MiniSize />
                          </div>

                          <div
                            onClick={() => {
                              noTyping_chat({
                                idChat: idChat,
                                socket: state.socketChat,
                                accountTyping: state.account,
                              })
                              set_stateCountMess([])
                              dispatch(delete_popup_messenger({ idChat }))
                            }}
                          >
                            <Icon_Close />
                          </div>
                        </>
                      }
                    />
                  </div>
                  <div
                    className="content-popupMessenger"
                    ref={refContentPopUp}
                    onScroll={(event) => {
                      console.log(event.currentTarget.scrollTop)
                      if (
                        event.currentTarget.scrollHeight -
                          event.currentTarget.scrollTop >=
                        event.currentTarget.scrollTop + 350
                      ) {
                        set_isShowMoveDownMess(true)
                      } else {
                        set_isShowMoveDownMess(false)
                      }
                    }}
                  >
                    {state_contentsPopUpMessenger.map((el, idx) => {
                      // console.log(el.session_messages);
                      // console.log(el.slug_sender,state.account.slug_personal);
                      return (
                        <Message
                          idxMessage={idx}
                          time={el.time}
                          isMe={el.slug_sender == state.account.slug_personal}
                          key={idx}
                          name_sender={el.name_sender}
                          slug_sender={el.slug_sender}
                          avatarSender={el.avatar_account}
                          component_contentCenter={el.session_messages}
                        />
                      )
                    })}
                    {state_typingsPopUpMessenger.map((el) => {
                      return el
                    })}
                  </div>
                  <div className="footer-popupMessenger">
                    {isShowMoveDownMess && (
                      <div
                        className="container-showMoveDownMess"
                        onClick={() => {
                          refContentPopUp.current.scrollTo(
                            0,
                            refContentPopUp.current.scrollHeight,
                          )
                        }}
                      >
                        <LabelCircle el_Icon={<Icon_Arrow_Down />} />
                      </div>
                    )}
                    {stateReplyMess && (
                      <div
                        className="body-replyMess"
                        style={{
                          width: '100%',
                          height: '60px',
                        }}
                      >
                        <div className="title-replyMess">
                          Be replying{' '}
                          <b>
                            {stateReplyMess.slug_sender ==
                            state.account.slug_personal
                              ? 'My Self'
                              : stateReplyMess.name_sender}
                          </b>
                        </div>
                        <div className="mess-replyMess">
                          {Display_shortLassSessionMess(
                            stateReplyMess.sessionMessage,
                            '',
                          )}
                        </div>
                        <div
                          className="btnClose-replyMess"
                          onClick={() => {
                            set_stateReplyMess(null)
                          }}
                        >
                          <Icon_Close />
                        </div>
                      </div>
                    )}
                    <FormMessenger idChat={idChat} />
                  </div>
                </div>
                {isShowSettingMess && <PopupSettingMessenger />}
              </div>
            </div>
          )}
          {isZoomOut && (
            <div
              className="container_zoomOutPopUpMessenger"
              style={{
                display: 'flex',
                alignItems: 'center',
                zIndex: 1,
              }}
              onClick={() => {
                setIs_zoomOut(false)
                set_stateCountMess([])
              }}
            >
              {isHoverZoomOut ? (
                <div
                  className="contentTextMessage_zoomOut"
                  style={{
                    position: 'absolute',
                    left: 0,
                    transform: 'translateX(-100%)',
                    background: 'var(--greenColorBegin_Background)',
                    padding: '11px 10px',
                    borderRadius: '10px',
                    boxShadow: '1px 1px 1px 1px var(--greenColorHot)',
                    color: 'var(--greenColorHot)',
                    minWidth: '250px',
                  }}
                >
                  <div
                    style={{
                      fontWeight: 'bolder',
                      marginBottom: '10px',
                    }}
                  >
                    {nameChat}
                  </div>
                  {state_contentsPopUpMessenger[
                    state_contentsPopUpMessenger.length - 1
                  ] && (
                    <div style={{ display: 'flex', marginLeft: '10px' }}>
                      <div style={{ marginRight: '10px' }}>
                        {last_interact
                          ? isMeSender({
                              name_sender: last_interact.name_interact_er,
                              slug_me: state.account.slug_personal,
                              slug_sender: last_interact._interact_er,
                            })
                          : isMeSender({
                              name_sender:
                                state_contentsPopUpMessenger[
                                  state_contentsPopUpMessenger.length - 1
                                ].name_sender,
                              slug_me: state.account.slug_personal,
                              slug_sender:
                                state_contentsPopUpMessenger[
                                  state_contentsPopUpMessenger.length - 1
                                ].slug_sender,
                            })}
                      </div>{' '}
                      <p>
                        {last_interact
                          ? `Expressed feeling ${last_interact.value_interact}`
                          : Display_shortLassSessionMess(
                              state_contentsPopUpMessenger[
                                state_contentsPopUpMessenger.length - 1
                              ].session_messages[
                                state_contentsPopUpMessenger[
                                  state_contentsPopUpMessenger.length - 1
                                ].session_messages.length - 1
                              ],
                            )}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                ''
              )}
              <span
                onMouseOver={() => {
                  setIs_Hover_zoomOut(true)
                }}
                onMouseOut={() => {
                  setIs_Hover_zoomOut(false)
                }}
              >
                <LabelCircle
                  numCount={
                    stateCountMess.length > 0 ? stateCountMess.length : null
                  }
                  handleRemove={() => {
                    dispatch(delete_popup_messenger({ idChat }))
                  }}
                  urlImg={state_avatar_chat}
                />
              </span>
            </div>
          )}
        </Context_Message.Provider>
      </PopUp_>
    )
  )
}
export function member({ name, avatar, id }) {
  this.name = name
  this.avatar = avatar
  this.id = id
}
export function content_sessionMessage({
  time_send = new Date().toISOString(),
  text = null,
  image = null,
  video = null,
  audio = null,
  tag = null,
  interact = [],
  reply = null,
  gif = null,
  application = null,
  isShare = false,
  notification = null,
} = {}) {
  this.time_send = time_send
  this.text = text
  this.image = image
  this.video = video
  this.audio = audio
  this.tag = tag
  this.interact = interact
  this.reply = reply
  this.gif = gif
  this.application = application
  this.isShare = isShare
  this.notification = notification
}
export function notificationMess({
  join_chat = null,
  leave_chat = null,
  modify_name_chat = null,
  modify_nick_name = null,
  change_avatar_chat = null,
  callVideo = null,
}) {
  this.join_chat = join_chat
  this.leave_chat = leave_chat
  this.modify_name_chat = modify_name_chat
  this.modify_nick_name = modify_nick_name
  this.change_avatar_chat = change_avatar_chat
  this.callVideo = callVideo
}
export function notification_modify_name_chat_Mess({
  slug_performer,
  old_name_chat,
  new_name_chat,

  slug_affecter,
}) {
  this.slug_performer = slug_performer
  this.new_name_chat = new_name_chat
  this.old_name_chat = old_name_chat
  this.slug_affecter = slug_affecter
}
export function notification_modify_nick_name_Mess({
  slug_performer,
  old_nick_name,
  new_nick_name,

  slug_affecter,
}) {
  this.slug_performer = slug_performer
  this.new_nick_name = new_nick_name
  this.old_nick_name = old_nick_name
  this.slug_affecter = slug_affecter
}
export function notification_leave_chat_Mess({ slug_performer }) {
  this.slug_performer = slug_performer
}
export function notification_callVideo({ isEnded, slug_caller }) {
  this.isEnded = isEnded
  this.slug_caller = slug_caller
}
export function notification_change_avatar_chat_Mess({ slug_performer }) {
  this.slug_performer = slug_performer
}
export function notification_join_chat_Mess({
  slug_performer,
  name_affecter,
  slug_affecter,
}) {
  this.slug_performer = slug_performer
  this.slug_affecter = slug_affecter
  this.name_affecter = name_affecter
}
export function interactMessage({
  time_interact = new Date().toISOString(),
  value_interact,
  slug_interact_er,
  name_interact_er,
} = {}) {
  this.value_interact = value_interact
  this.slug_interact_er = slug_interact_er
  this.name_interact_er = name_interact_er
  this.time_interact = time_interact
  console.log('TIME', time_interact)
}
export function noTyping_chat({ idChat, socket, accountTyping }) {
  socket.emit(`IN_${idChat}_NO_TYPING`, accountTyping)
}
export function beTyping_chat({ idChat, socket, accountTyping }) {
  socket.emit(`IN_${idChat}_PEOPLE_TYPING`, accountTyping)
}
export function contentPopUpMessenger({
  isMe,
  name_sender,
  avatar_account,
  session_messages,
  slug_sender,
}) {
  this.name_sender = name_sender
  this.slug_sender = slug_sender
  // this.time = time;
  this.isMe = isMe
  this.avatar_account = avatar_account
  this.session_messages = session_messages
}

PopUpMessenger.propTypes = {
  idChat: PropTypes.string.isRequired,
  nameChat: PropTypes.string.isRequired,
  avatarChat: PropTypes.string.isRequired,
  last_interact: PropTypes.object.isRequired,
  membersChat: PropTypes.object,
  contentsPopUpMessenger: PropTypes.array,
}

export default PopUpMessenger
/* eslint-disable no-unused-vars */
