import PopUpHeader from '../PopUpHeader'
import HeaderSpaceBetween from '../../../../parts/subHeaders/headerSpaceBetween/HeaderSpaceBetween'
import Link_ from '../../../../parts/links/link/Link'
import FormSearch, {
  NoResult,
} from '../../../../parts/inputs/forms/formSearch/FormSearch'
import {
  Icon_Circle,
  Icon_Pen_Square,
  Icon_Plus,
  Icon_Square,
  Icon_Square_Check,
} from '../../../../parts/icons/fontAwesome/FontAwesome'
import ItemOpt from '../../../../parts/item/itemOpt/ItemOpt'
import LabelCircle from '../../../../parts/labels/labelCircle/LabelCircle'
import { useStore } from '../../../../../store'
import { actions } from '../../../../../store'
import PopUpMessenger from '../../popupMessenger/PopUpMessenger'
import { useEffect, Fragment, useState } from 'react'
import { dateTo_textAgo } from '../../../../../store/functions'
import {
  add_popup_review,
  delete_pop_content,
} from '../../../../../store/actions'
import PopUpReviews from '../../popupReview/PopUpReviews'
import './PopupMessageHeader.css'
import ButtonNormal from '../../../../parts/buttons/buttonNormal/ButtonNormal'
import PropTypes from 'prop-types'
import { createRequest } from '../../../../../utilities/requests'
/* eslint-disable no-unused-vars */

function PopupMessageHeader({ listChat = [] }) {
  const [state_listChat, set_state_listChat] = useState(listChat)
  const [state_showResult, set_state_showResult] = useState(false)

  // console.log(listChat);
  const [state, dispatch] = useStore()
  // const value_ContextPopUp = useContext(ContextPopUp);
  // console.log(value_ContextPopUp);

  useEffect(() => {
    // console.log(listChat[0].lastSessionMessage.time_send,new Date(listChat[0].lastSessionMessage.time_send).toJSON());
  }, [])

  return (
    <PopUpHeader
      isActive={true}
      header={
        <>
          <HeaderSpaceBetween
            bodyLeft={<h1>Chat</h1>}
            bodyRight={[
              <Icon_Plus key={'Icon_Plus'} />,
              <Icon_Pen_Square key={'Icon_Pen_Square'} />,
            ].map((el, idx) => {
              return (
                <ItemOpt
                  key={idx}
                  handleClick={async () => {
                    const { data } = await createRequest(
                      'GET',
                      '/friend/get-list-friend',
                      { query: { limit: 20 } },
                    )
                    dispatch(
                      add_popup_review(
                        <PopupCreateGroupChat
                          initSuggestMembers={data.result}
                        />,
                      ),
                    )
                  }}
                  component_Left={<LabelCircle key={idx} el_Icon={el} />}
                />
              )
            })}
          />
          <FormSearch
            handler_Search={async (value) => {
              if (value.trim().length > 0) {
                const { data } = await createRequest('GET', '/chat/search', {
                  query: { keyword: value },
                })
                if (data.result.length > 0) {
                  set_state_showResult(false)
                } else {
                  set_state_showResult(true)
                }
                set_state_listChat(data.result)
              } else {
                set_state_listChat(listChat)
                set_state_showResult(false)
              }
            }}
            placeholder_text={'Search on Message'}
          />
        </>
      }
      footer={<Link_ text={'See all in mess'} isUnderline={true} />}
      body={
        <>
          {state_showResult && <NoResult />}
          {state_listChat.map((el, idx) => {
            var slug_last = el.slug_sender
            return (
              <ItemOpt
                handleClick={() => {
                  req_getDetailChat({
                    data_Chat_id: el._id,
                    dispatch,
                    state,
                    data_Chat_isSeen: el.isSeen,
                  })
                }}
                children_centerItemOpt={
                  <div>
                    <b>{el.nameChat}</b>
                    {el.lastSessionMessage ? (
                      !el.isSeen ? (
                        <b>
                          {el.last_interact ? (
                            <LastInteractMessageHeader
                              slug_last={slug_last}
                              el={el}
                              state={state}
                            />
                          ) : (
                            <LastSessionMessageHeader
                              slug_last={slug_last}
                              el={el}
                              state={state}
                            />
                          )}
                        </b>
                      ) : el.last_interact ? (
                        <LastInteractMessageHeader
                          slug_last={slug_last}
                          el={el}
                          state={state}
                        />
                      ) : (
                        <LastSessionMessageHeader
                          slug_last={slug_last}
                          el={el}
                          state={state}
                        />
                      )
                    ) : (
                      ''
                    )}
                  </div>
                }
                component_Left={
                  <>
                    <LabelCircle urlImg={el.avatarChat} />
                    {/* <b>{el.name_account}</b>  */}
                    {/* <div><span>You: </span> A zo what sup men <span>15 minutes ago </span></div> */}
                  </>
                }
                component_Right={!el.isSeen ? <Icon_Circle /> : ''}
                key={idx}
              />
            )
          })}
        </>
      }
    />
  )
}
export const shortLassSessionMess = (lastSessionMessage, typeDisplay) => {
  var result
  if (typeDisplay == null) {
    typeDisplay = 'Send'
  }
  if (lastSessionMessage) {
    Object.entries(lastSessionMessage).forEach(([key, value]) => {
      if (value && key != 'time_send') {
        switch (key) {
          case 'reply':
            result = ' Replied a message '
            break
          case 'image':
            result = ` ${typeDisplay} image`
            break
          case 'text':
            result = ` ${
              value.length > 20 ? `${value.substring(0, 20)}...` : value
            } `
            break
          case 'video':
            result = ` ${typeDisplay} Video `
            break
          case 'audio':
            result = ` ${typeDisplay} Audio `
            break
          case 'gif':
            result = ` ${typeDisplay} Gif `
            break
          case 'application':
            result = ` ${typeDisplay} File `
            break
          case 'notification':
            result = RenderNotificationMess({ notification: value })
            break
          default:
            break
        }
      } else {
        if (check_UnsentMessage(lastSessionMessage)) {
          result = 'unsent a message'
        }
      }
    })
  } else {
    result = 'unsent a message'
  }
  return result
}
export function isMeSender({
  slug_me,
  slug_sender,
  name_sender,
  typeDisplay,
  textForMe = 'You',
  isShort = true,
}) {
  if (name_sender) {
    if (typeDisplay == null) {
      typeDisplay = ':'
    }
    if (slug_me == slug_sender) {
      return ` ${textForMe} ${typeDisplay}`
    } else {
      if (isShort) {
        var shortName = name_sender.split(' ')
        return `${shortName[shortName.length - 1]} ${typeDisplay}`
      } else {
        return `${name_sender} ${typeDisplay}`
      }
    }
  } else {
    return ''
  }
  // console.log('isMeSender() running',name_sender);
}
function LastSessionMessageHeader({ el, state, slug_last }) {
  var shortText = shortLassSessionMess(el.lastSessionMessage, 'Send', {
    slug_me: state.account.slug_personal,
    name_sender: el.name_sender,
    slug_sender: slug_last,
  })
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}
    >
      <span>
        {isMeSender({
          slug_me: state.account.slug_personal,
          name_sender: el.name_sender,
          slug_sender: slug_last,
        })}
      </span>
      <i>{`${
        shortText.length > 30 ? `${shortText.substring(0, 30)}...` : shortText
      }`}</i>
      <span style={{ marginLeft: '20px' }}>
        {dateTo_textAgo(new Date(el.lastSessionMessage.time_send))}
      </span>
    </div>
  )
}
function RenderNotificationMess({ notification }) {
  const [state, dispatch] = useStore()
  var result = 'renderNotificationMess'
  var [[key, value]] = Object.entries(notification).filter(
    ([key, value]) => value != null,
  )
  console.log({
    slug_sender: value.slug_affecter,
    slug_me: state.account.slug_personal,
  })
  switch (key) {
    case 'modify_nick_name':
      // console.log(key);
      result = `changed nickname of ${isMeSender({
        name_sender: value.old_nick_name,
        typeDisplay: '',
        textForMe: 'you',
        slug_sender: value.slug_affecter,
        slug_me: state.account.slug_personal,
      })} to ${value.new_nick_name} `
      break
    case 'modify_name_chat':
      result = `changed name of chat to ${value.new_name_chat} `
      break
    case 'leave_chat':
      result = ` has left chat`
      break
    case 'join_chat':
      result = `has added ${isMeSender({
        name_sender: value.name_affecter,
        typeDisplay: '',
        textForMe: 'you',
        slug_sender: value.slug_affecter,
        slug_me: state.account.slug_personal,
        isShort: false,
      })} into chat`
      break
    case 'change_avatar_chat':
      result = `has change avatar chat`
      break
    case 'callVideo':
      result = 'has made Video Call. '
      if (value.isEnded) result += 'This Video call ended'
      else result += 'This Video Call  is happening...'
      break
    default:
      break
  }
  console.log(result)
  return result
}
function LastInteractMessageHeader({ el, state, slug_last }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span>
        {isMeSender({
          slug_me: state.account.slug_personal,
          name_sender: el.last_interact.name_interact_er,
          slug_sender: slug_last,
        })}
      </span>
      <i>{`Expressed feeling ${el.last_interact.value_interact}`}</i>
      <span style={{ marginLeft: '20px' }}>
        {dateTo_textAgo(new Date(el.last_interact.time_interact))}
      </span>
    </div>
  )
}
export function check_UnsentMessage(sessionMessage) {
  return !Object.entries(sessionMessage).some(
    (el) => el[0] != 'time_send' && el[1] && Object.keys(el[1]).length > 0,
  )
}
export const req_getDetailChat = async ({
  data_Chat_id,
  state,
  dispatch,
  data_Chat_isSeen = false,
}) => {
  state.popUpContents.forEach((popUpContent) => {
    if (popUpContent.props.children.props.listChat) {
      dispatch(delete_pop_content(popUpContent))
    }
  })
  const { data } = await createRequest('GET', '/chat/get-detail-chat', {
    query: {
      _id: data_Chat_id,
      is_seen: data_Chat_isSeen,
    },
  })

  console.log(data)

  dispatch(
    actions.add_popup_messenger(
      <PopUpMessenger
        membersChat={data.result.members}
        idChat={data.result._id}
        last_interact={data.result.last_interact}
        avatarChat={data.shortChat.avatarChat}
        nameChat={data.shortChat.nameChat}
        contentsPopUpMessenger={data.result.content_messages}
      />,
    ),
  )
}

export const createBoxChat = async ({
  data_Chat_id,
  state,
  dispatch,
  members,
}) => {
  state.popUpContents.forEach((popUpContent) => {
    if (popUpContent.props.children.props.listChat) {
      dispatch(delete_pop_content(popUpContent))
    }
  })
  const { data } = await createRequest('POST', '/chat/create-box-chat', {
    body: {
      _id: data_Chat_id,
      members,
    },
  })

  dispatch(
    actions.add_popup_messenger(
      <PopUpMessenger
        membersChat={data.result.members}
        idChat={data.result._id}
        last_interact={data.result.last_interact}
        avatarChat={data.shortChat.avatarChat}
        nameChat={data.shortChat.nameChat}
        contentsPopUpMessenger={data.result.content_messages}
      />,
    ),
  )
}
function PopupCreateGroupChat({ initSuggestMembers }) {
  const [state_membersSearch, set_state_membersSearch] =
    useState(initSuggestMembers)
  const [state_membersSelected, set_state_membersSelected] = useState([])
  const [state_showNoResult, set_state_showNoResult] = useState(false)

  console.log(state_membersSelected)
  return (
    <PopUpReviews
      titlePopUp={'Create Group Chat'}
      contentPopUp={
        <Fragment>
          <FormSearch
            placeholder_text={'Search friend'}
            handler_Search={async (value) => {
              if (value.trim().length > 0) {
                const data = await createRequest('POST', '/friends/search', {
                  body: { keyword: value },
                })

                if (data.result.length > 0) {
                  set_state_showNoResult(false)
                } else {
                  set_state_showNoResult(true)
                }
                set_state_membersSearch([].concat(data.result))
              } else {
                set_state_membersSearch(initSuggestMembers)
                set_state_showNoResult(false)
              }
            }}
          />

          <div className="section-selectedMembersInNewGroup">
            {state_membersSelected.map((member, idx) => {
              var shortName = `${member.fname} ${member.lname}`.split(' ')
              return (
                <div key={idx} className="item-selectedMembersInNewGroup">
                  <LabelCircle urlImg={member.avatar_account} />
                  <div>
                    {shortName.splice(shortName.length - 2, shortName.length)}
                  </div>
                </div>
              )
            })}
          </div>
          {state_showNoResult && <NoResult />}
          {state_membersSearch.map((member, idx) => {
            return (
              <ItemSelectMember
                OBJ_useState_listSelectEd={{
                  state_membersSelected,
                  set_state_membersSelected,
                }}
                member={member}
                key={idx}
              />
            )
          })}
          <div className="section_btn_createChat">
            <ButtonNormal
              handleClick={() => {
                createRequest('POST', '/chat/createChat', {
                  body: {
                    members: state_membersSelected.map(
                      (member) => member.slug_personal,
                    ),
                  },
                })
              }}
              textBtn={'Create Chat'}
            />
          </div>
        </Fragment>
      }
    ></PopUpReviews>
  )
}

function ItemSelectMember({ member, OBJ_useState_listSelectEd }) {
  const [state_selectEd, set_state_selectEd] = useState(
    OBJ_useState_listSelectEd.state_membersSelected.some(
      (memberSelected) => memberSelected.slug_personal == member.slug_personal,
    ),
  )
  useEffect(() => {
    if (state_selectEd) {
      if (
        !OBJ_useState_listSelectEd.state_membersSelected.some(
          (memberSelected) =>
            memberSelected.slug_personal == member.slug_personal,
        )
      )
        OBJ_useState_listSelectEd.set_state_membersSelected(
          OBJ_useState_listSelectEd.state_membersSelected.concat([member]),
        )
    } else {
      OBJ_useState_listSelectEd.set_state_membersSelected(
        [].concat(
          OBJ_useState_listSelectEd.state_membersSelected.filter(
            (memberSelected) =>
              memberSelected.slug_personal != member.slug_personal,
          ),
        ),
      )
    }
  }, [state_selectEd])
  return (
    <div>
      <ItemOpt
        handleClick={() => {
          set_state_selectEd(!state_selectEd)
        }}
        component_Left={<LabelCircle urlImg={member.avatar_account} />}
        children_centerItemOpt={<b>{`${member.fname} ${member.lname}`}</b>}
        component_Right={
          state_selectEd ? (
            <span>
              <Icon_Square_Check />
            </span>
          ) : (
            <span>{<Icon_Square />}</span>
          )
        }
      />
    </div>
  )
}
export function Render_notification_callVideo({ data, handleClick }) {
  // console.log('Render_notification_callVideo',data);
  return (
    <div className="body-notification_callVideo">
      {!data.isEnded && (
        <ButtonNormal
          handleClick={() => {
            handleClick()
          }}
          textBtn={'Join'}
        />
      )}
    </div>
  )
}

PopupMessageHeader.propTypes = {
  listChat: PropTypes.object.isRequired,
}

PopupMessageHeader.propTypes = {
  listChat: PropTypes.object.isRequired,
  OBJ_useState_listSelectEd: PropTypes.object.isRequired,
}

ItemSelectMember.propTypes = {
  member: PropTypes.object.isRequired,
  OBJ_useState_listSelectEd: PropTypes.object.isRequired,
}
Render_notification_callVideo.propTypes = {
  data: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
}

PopupCreateGroupChat.propTypes = {
  initSuggestMembers: PropTypes.object.isRequired,
}

PopupCreateGroupChat.propTypes = {
  notification: PropTypes.object.isRequired,
}

LastSessionMessageHeader.propTypes = {
  el: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  slug_last: PropTypes.string.isRequired,
}
LastInteractMessageHeader.propTypes = {
  el: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  slug_last: PropTypes.string.isRequired,
}

export default PopupMessageHeader
/* eslint-disable no-unused-vars */
