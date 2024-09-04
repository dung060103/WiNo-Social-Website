import { Gif } from '@giphy/react-components'
import { useContext, useEffect, useState } from 'react'
import {
  Icon_Document,
  Icon_Ellipsis,
  Icon_Plus,
  Icon_Share,
  Icon_Smile,
} from '../icons/fontAwesome/FontAwesome'
import LabelCircle from '../labels/labelCircle/LabelCircle'
import { GiphyFetch } from '@giphy/js-fetch-api'
import './Message.css'
import {
  Context_Message,
  interactMessage,
} from '@components/layouts/popups/popupMessenger/PopUpMessenger'
import { useStore } from '@store'
import { LIST_INTERACT_MESS_DEFAULT, SIZE_TINY } from '@store/constants'
import {
  check_UnsentMessage,
  isMeSender,
  Render_notification_callVideo,
  shortLassSessionMess,
} from '@components/layouts/popups/popupHeader/popupMessageHeader/PopupMessageHeader'
import PopUp_ from '@components/layouts/popups/popup'
import { bytesToSize, onlyUnique } from '@store/functions'
import PickerEmoji from '../pickers/pickerEmoji/PickerEmoji'
import { add_popup_call_video, add_popup_review } from '@store/actions'
import PopUpReviews from '@components/layouts/popups/popupReview/PopUpReviews'
import TabReactions, {
  OBJ_TabReactions,
} from '../tabs/tabReactions/TabReactions'
import ItemOpt from '../item/itemOpt/ItemOpt'
import ButtonNormal from '../buttons/buttonNormal/ButtonNormal'
import PopUpCallVideo from '@components/layouts/popups/popupCallVideo/PopUpCallVideo'
import PropTypes from 'prop-types'
import { createRequest } from '@utils/requests'

/* eslint-disable no-unused-vars */
function Message({
  idxMessage,
  isMe,
  avatarSender,
  name_sender,
  slug_sender,
  component_contentCenter = [],
}) {
  const value_Context_Message = useContext(Context_Message)
  const [state, dispatch] = useStore()
  const [state_component_contentCenter, set_state_component_contentCenter] =
    useState(component_contentCenter)
  useEffect(() => {
    state.socketChat.on(
      `${value_Context_Message.idChat}_SHUTDOWN_CALL_VIDEO`,
      (data) => {
        if (
          component_contentCenter[0].time_send ==
          data.value_content_message.session_messages[0].time_send
        ) {
          console.log('CCCC', data.value_content_message.session_messages)
          set_state_component_contentCenter(
            data.value_content_message.session_messages,
          )
        }
      },
    )
  }, [])
  useEffect(() => {
    set_state_component_contentCenter(component_contentCenter)
  }, [component_contentCenter])

  return (
    component_contentCenter.length > 0 &&
    component_contentCenter.some((el) => el != null) && (
      <div className="container-message">
        <div className="main-message">
          <div className="body-message">
            <div className="header-message"></div>
            <div className={'content-message' + ' ' + (isMe ? 'isMe' : '')}>
              <div className="contentLeft-message">
                {component_contentCenter[0].notification == null && (
                  <LabelCircle urlImg={avatarSender} />
                )}
              </div>
              <div
                className={`contentCenter-message ${component_contentCenter[0].notification ? 'notification' : ''}`}
              >
                {state_component_contentCenter.map(
                  (sessionMessage, idx_sessionMessage) => {
                    // console.log(sessionMessage);

                    return (
                      <MainSessionMessage
                        key={idx_sessionMessage}
                        name_sender={name_sender}
                        slug_sender={slug_sender}
                        idx_sessionMessage={idx_sessionMessage}
                        sessionMessage={sessionMessage}
                        propsParent={{ idxMessage, slug_sender, name_sender }}
                      />
                    )
                  },
                )}
              </div>
              <div className="contentRight-message">{''}</div>
            </div>
            <div className="footer-message"></div>
          </div>
        </div>
      </div>
    )
  )
}
function ListOptMoreSessionMessage({
  idx_sessionMessage,
  slug_sender,
  idChat,
  obj_stateShowMoreOpt,
  state,
  dispatch,
}) {
  return (
    <div className="container-OptMoreSessionMessage">
      <div className="body-OptMoreSessionMessage">
        <div
          onClick={async (event) => {
            const { data } = await createRequest(
              'GET',
              '/chat/get-list-box-chat',
            )
            dispatch(
              add_popup_review(
                <PopUpReviews
                  titlePopUp={'Share Message'}
                  contentPopUp={data.map((chat, idx) => {
                    return (
                      <ItemOpt
                        key={idx}
                        component_Left={
                          <LabelCircle urlImg={chat.avatarChat} />
                        }
                        children_centerItemOpt={<b>{chat.nameChat}</b>}
                        component_Right={
                          <ButtonNormal
                            handleClick={(event) => {
                              createRequest(
                                'POST',
                                '/chat/forward-to-message',
                                {
                                  body: {
                                    boxChatIdFrom: idChat,
                                    boxChatIdTo: chat._id,
                                    sessionMessageIndex: idx_sessionMessage,
                                  },
                                },
                              )
                            }}
                            isEnable={true}
                            styles={{
                              fontWeight: 'normal',
                            }}
                            textBtn={'Send'}
                          />
                        }
                      />
                    )
                  })}
                />,
              ),
            )
          }}
          className="item-optMoreSessionMessage"
        >
          Share
        </div>

        <div
          className="item-optMoreSessionMessage"
          onClick={() => {
            obj_stateShowMoreOpt.set_stateShowMoreOpt(false)
            removeSessionMess({
              idx_sessionMessage,
              slug_sender,
              idChat,
              state,
            })
          }}
        >
          Remove
        </div>
      </div>
    </div>
  )
}
function SessionMessage({ obj_sessionMessage, isReply = false }) {
  // console.log(obj_sessionMessage);
  const [state_gifs, set_state_gifs] = useState(null)
  useEffect(() => {
    if (typeof state_gifs === 'string') {
      var fetch = async () => {
        var { data } = await new GiphyFetch(
          'sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh',
        ).gif(state_gifs)
        set_state_gifs(
          <div>
            <Gif gif={data} />
          </div>,
        )
      }
      fetch()
    }
  }, [state_gifs])
  if (!isReply) {
    if (!check_UnsentMessage(obj_sessionMessage)) {
      return Object.entries(obj_sessionMessage).map((el) => {
        console.log(el[0] != 'time_send' && el[1] != null)
        if (el[1] && el[0] !== 'time_send') {
          switch (el[0]) {
            case 'image':
              return <img src={el[1]}></img>
            case 'text':
              return el[1]
            case 'video':
              return <video muted src={el[1]} controls autoPlay></video>
            case 'audio':
              return <audio muted src={el[1]} controls autoPlay></audio>
            case 'application':
              console.log(el[1])
              return (
                <DocumentMessage
                  nameFile={el[1].nameFile}
                  sizeFile={el[1].size}
                />
              )
            case 'gif': {
              if (state_gifs == null) {
                console.log(el[1])
                set_state_gifs(el[1])
              }
              return (
                <div className="gif">
                  {typeof state_gifs === 'string' ? <b>{'GIF'}</b> : state_gifs}
                </div>
              )
            }
            default:
              break
          }
        }
      })
    } else {
      return <div className="sessionMessage_remove">unsent a message</div>
    }
  } else {
    return shortLassSessionMess(obj_sessionMessage)
  }
}
function updateInteractMess({
  IdChat,
  idx_sessionMessage,
  value_sessionMessage,
  state,
  isNotification,
}) {
  createRequest('POST', '/chat/:id/update-interact-message', {
    query: { id: IdChat },
    body: {
      sessionMessageIndex: idx_sessionMessage,
      sessionMessageValue: value_sessionMessage,
      socket: state.socketChat.id,
      isNotification,
    },
  })
}
function removeSessionMess({ idx_sessionMessage, slug_sender, idChat, state }) {
  createRequest('POST', '/chat/:id/remove-session-message', {
    query: { id: idChat },
    body: {
      sessionMessageIndex: idx_sessionMessage,
      slugSender: slug_sender,
    },
  })
}
function DocumentMessage({ nameFile, sizeFile }) {
  return (
    <div className="body-documentMessage">
      <div className="partIcon-documentMessage">
        <Icon_Document />
      </div>
      <div className="main-documentMessage">
        <div className="title_name-documentMessage">
          {nameFile.length > 30 ? `${nameFile.substring(0, 30)}...` : nameFile}
        </div>
        <div className="infoSize-documentMessage">{bytesToSize(sizeFile)}</div>
      </div>
    </div>
  )
}
function MainSessionMessage({
  sessionMessage,
  idx_sessionMessage,
  propsParent,
  name_sender,
  slug_sender,
}) {
  const [state, dispatch] = useStore()
  const list_valueInteract = (sessionMessage.interact ?? []).map((el) => {
    return el.value_interact
  })
  var list_valueInteractUnique = list_valueInteract.filter(onlyUnique)
  const value_Context_Message = useContext(Context_Message)
  const [stateShowMoreOpt, set_stateShowMoreOpt] = useState(false)
  const [stateListInteractMess, set_stateListInteractMess] = useState(false)
  const [stateShowPickerEmoji, set_stateShowPickerEmoji] = useState([])

  useEffect(() => {
    if (stateShowPickerEmoji.length > 0) {
      value_Context_Message.set_statePopupContentMess(
        value_Context_Message.statePopupContentMess.concat(
          stateShowPickerEmoji,
        ),
      )
    } else {
      value_Context_Message.set_statePopupContentMess([])
    }
  }, [stateShowPickerEmoji])

  return sessionMessage.notification ? (
    <SessionMessageNotification
      obj_IsMeSender={{ name_sender, slug_sender }}
      sessionMessage={sessionMessage}
    />
  ) : (
    <div className="container-sessionContent-message" key={idx_sessionMessage}>
      {sessionMessage.reply && (
        <div
          className={`container-replyMess ${
            propsParent.slug_sender == state.account.slug_personal ? `isMe` : ''
          }`}
        >
          <div className="subNote-reply">
            <Icon_Share sizeIcon={SIZE_TINY} />
            {`${
              propsParent.slug_sender == state.account.slug_personal
                ? `You`
                : propsParent.name_sender
            } Replied ${
              state.account.slug_personal == sessionMessage.reply.slug_sender
                ? `My self`
                : sessionMessage.reply.name_sender
            }`}
          </div>
          <a
            href={`#${sessionMessage.reply.sessionMessage.time_send}`}
            className={`short-Reply-content-mess`}
          >
            <SessionMessage
              isReply={true}
              obj_sessionMessage={sessionMessage.reply.sessionMessage}
            />
          </a>
        </div>
      )}
      <div className="sessionContent-message" id={sessionMessage.time_send}>
        <SessionMessage obj_sessionMessage={sessionMessage} />
        {sessionMessage.interact && sessionMessage.interact.length > 0 && (
          <div className={`sessionMessage_interact`}>
            {sessionMessage.interact.length > 1 &&
              sessionMessage.interact.length}
            {sessionMessage.interact.length > 0 &&
              list_valueInteractUnique.map((el, idx) => {
                return (
                  <span
                    key={idx}
                    style={{
                      cursor: 'pointer',
                    }}
                    onClick={(event) => {
                      dispatch(
                        add_popup_review(
                          <PopUpReviews
                            titlePopUp={'Message reactions'}
                            contentPopUp={
                              <TabReactions
                                obj_tabs={[
                                  new OBJ_TabReactions({
                                    name_tabReactions: 'All',
                                    value_tabReactions:
                                      sessionMessage.interact.map(
                                        (interact) => {
                                          return interact.name_interact_er
                                        },
                                      ),
                                  }),
                                ].concat(
                                  list_valueInteractUnique.map((value) => {
                                    var list_nameInteract = []
                                    sessionMessage.interact.forEach(
                                      (interact) => {
                                        if (interact.value_interact == value) {
                                          list_nameInteract.push(
                                            interact.name_interact_er,
                                          )
                                        }
                                      },
                                    )
                                    return new OBJ_TabReactions({
                                      name_tabReactions: `${list_nameInteract.length} ${value}`,
                                      value_tabReactions: list_nameInteract,
                                    })
                                  }),
                                )}
                              />
                            }
                          />,
                        ),
                      )
                    }}
                  >
                    {el}
                  </span>
                )
              })}
          </div>
        )}
        <div
          className={`container-opt_sessionContent-message ${
            stateListInteractMess || stateShowMoreOpt ? 'active' : ''
          }`}
        >
          {stateListInteractMess && (
            <PopUp_
              work_case_unmount={() => {
                set_stateListInteractMess(false)
              }}
            >
              <div className={`body-interactMess `}>
                {LIST_INTERACT_MESS_DEFAULT.map((interactMess, idx) => {
                  return (
                    <div
                      key={idx}
                      className={`interactMess ${
                        sessionMessage.interact.some((el) => {
                          return (
                            el.slug_interact_er ==
                              state.account.slug_personal &&
                            el.value_interact == interactMess
                          )
                        })
                          ? 'isMe'
                          : ''
                      }`}
                      onClick={(event) => {
                        var isNotification = true
                        if (
                          !sessionMessage.interact.some((el) => {
                            return (
                              el.slug_interact_er == state.account.slug_personal
                            )
                          })
                        ) {
                          sessionMessage.interact.push(
                            new interactMessage({
                              value_interact: interactMess,
                              name_interact_er: `${state.account.fname} ${state.account.lname}`,
                              slug_interact_er: state.account.slug_personal,
                              time_interact: new Date().toISOString(),
                            }),
                          )
                        } else {
                          sessionMessage.interact.forEach((el) => {
                            if (
                              el.slug_interact_er == state.account.slug_personal
                            ) {
                              el.value_interact = interactMess
                              isNotification = false
                            }
                          })
                        }
                        set_stateListInteractMess(false)
                        var tmp =
                          value_Context_Message.state_contentsPopUpMessenger
                        tmp[propsParent.idxMessage].session_messages[
                          idx_sessionMessage
                        ] = sessionMessage
                        value_Context_Message.setState_contentsPopUpMessenger(
                          tmp,
                        )
                        updateInteractMess({
                          IdChat: value_Context_Message.idChat,
                          idx_sessionMessage: `${propsParent.idxMessage}/${idx_sessionMessage}`,
                          value_sessionMessage: sessionMessage,
                          state,
                          isNotification,
                        })
                      }}
                    >
                      {interactMess}
                    </div>
                  )
                })}
                <div
                  className="interactMess"
                  onClick={(event) => {
                    set_stateListInteractMess(false)
                    set_stateShowPickerEmoji([
                      ...stateShowPickerEmoji,
                      <PopUp_
                        key={stateShowPickerEmoji.length}
                        work_case_unmount={() => {
                          set_stateShowPickerEmoji([])
                        }}
                      >
                        <PickerEmoji
                          styles={{
                            top: '60px',
                            height: '300px',
                            left: '10px',
                            right: '10px',
                            zIndex: 1,
                          }}
                          handleClickPicker={(event, emojiData) => {
                            set_stateShowPickerEmoji([])
                            var isNotification = true
                            if (
                              !sessionMessage.interact.some((el) => {
                                return (
                                  el.slug_interact_er ==
                                  state.account.slug_personal
                                )
                              })
                            ) {
                              sessionMessage.interact.push(
                                new interactMessage({
                                  value_interact: emojiData.emoji,
                                  name_interact_er: `${state.account.fname} ${state.account.lname}`,
                                  slug_interact_er: state.account.slug_personal,
                                  time_interact: new Date().toISOString(),
                                }),
                              )
                            } else {
                              sessionMessage.interact.forEach((el) => {
                                if (
                                  el.slug_interact_er ==
                                  state.account.slug_personal
                                ) {
                                  el.value_interact = emojiData.emoji
                                  isNotification = false
                                }
                              })
                            }
                            var tmp =
                              value_Context_Message.state_contentsPopUpMessenger
                            tmp[propsParent.idxMessage].session_messages[
                              idx_sessionMessage
                            ] = sessionMessage
                            value_Context_Message.setState_contentsPopUpMessenger(
                              tmp,
                            )
                            updateInteractMess({
                              IdChat: value_Context_Message.idChat,
                              idx_sessionMessage: `${propsParent.idxMessage}/${idx_sessionMessage}`,
                              value_sessionMessage: sessionMessage,
                              state,
                              isNotification,
                            })
                          }}
                        />
                      </PopUp_>,
                    ])
                  }}
                >
                  <Icon_Plus />
                </div>
              </div>
            </PopUp_>
          )}
          {stateShowMoreOpt && (
            <PopUp_
              work_case_unmount={() => {
                set_stateShowMoreOpt(false)
              }}
            >
              <ListOptMoreSessionMessage
                key={idx_sessionMessage}
                idChat={value_Context_Message.idChat}
                idx_sessionMessage={`${propsParent.idxMessage}/${idx_sessionMessage}`}
                state={state}
                dispatch={dispatch}
                slug_sender={propsParent.slug_sender}
                obj_stateShowMoreOpt={{
                  stateShowMoreOpt,
                  set_stateShowMoreOpt,
                }}
              />
            </PopUp_>
          )}
          {!check_UnsentMessage(sessionMessage) ? (
            <div
              className={`body-opt_sessionContent-message    ${
                stateListInteractMess || stateShowMoreOpt ? 'active' : ''
              }`}
            >
              <span
                onClick={(event) => {
                  set_stateListInteractMess(true)
                }}
              >
                <Icon_Smile />
              </span>
              <span
                onClick={(event) => {
                  value_Context_Message.set_stateReplyMess({
                    slug_sender: propsParent.slug_sender,
                    name_sender: propsParent.name_sender,
                    sessionMessage,
                  })
                }}
              >
                <Icon_Share />
              </span>
              <span
                onClick={(event) => {
                  set_stateShowMoreOpt(true)
                }}
              >
                <Icon_Ellipsis />
              </span>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}
export function SessionMessageNotification({ sessionMessage, obj_IsMeSender }) {
  const [state, dispatch] = useStore()
  const value_Context_Message = useContext(Context_Message)
  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      {`${isMeSender({ slug_me: state.account.slug_personal, slug_sender: obj_IsMeSender.slug_sender, name_sender: obj_IsMeSender.name_sender, typeDisplay: '' })} ${shortLassSessionMess(sessionMessage, '')}`}
      {sessionMessage.notification.callVideo && (
        <Render_notification_callVideo
          data={sessionMessage.notification.callVideo}
          handleClick={async () => {
            const data = await createRequest('POST', '/chat/joinChatVideo', {
              body: {
                slug_caller: sessionMessage.notification.callVideo.slug_caller,
              },
            })
            dispatch(
              add_popup_call_video(
                <PopUpCallVideo
                  membersChat={value_Context_Message.membersChat}
                  idChat={value_Context_Message.idChat}
                  account_caller={data.account_caller}
                  isResponse={true}
                  avatarCallVideo={value_Context_Message.avatarChat}
                  nameCallVideo={value_Context_Message.nameChat}
                />,
              ),
            )
          }}
        />
      )}
    </div>
  )
}

Message.propTypes = {
  idxMessage: PropTypes.number.isRequired,
  isMe: PropTypes.bool.isRequired,
  avatarSender: PropTypes.string.isRequired,
  name_sender: PropTypes.string.isRequired,
  slug_sender: PropTypes.string.isRequired,
  component_contentCenter: PropTypes.object,
}

SessionMessage.propTypes = {
  obj_sessionMessage: PropTypes.object.isRequired,
  isReply: PropTypes.bool,
}

SessionMessageNotification.propTypes = {
  sessionMessage: PropTypes.object.isRequired,
  obj_IsMeSender: PropTypes.object.isRequired,
}

MainSessionMessage.propTypes = {
  sessionMessage: PropTypes.object.isRequired,
  idx_sessionMessage: PropTypes.string.isRequired,
  propsParent: PropTypes.object.isRequired,
  name_sender: PropTypes.string.isRequired,
  slug_sender: PropTypes.string.isRequired,
}

DocumentMessage.propTypes = {
  nameFile: PropTypes.string.isRequired,
  sizeFile: PropTypes.number.isRequired,
}

ListOptMoreSessionMessage.propTypes = {
  idx_sessionMessage: PropTypes.number.isRequired,
  slug_sender: PropTypes.string.isRequired,
  idChat: PropTypes.string.isRequired,
  obj_stateShowMoreOpt: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default Message
/* eslint-disable no-unused-vars */
