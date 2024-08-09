import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../../../../../store'
import {
  add_popup_review,
  delete_popup_messenger,
  delete_popup_review,
  set_url,
} from '../../../../../store/actions'
import { SIZE_LARGE } from '../../../../../store/constants'
import ButtonNormal from '../../../../parts/buttons/buttonNormal/ButtonNormal'
import {
  Icon_AddPerson,
  Icon_Image,
  Icon_Pen_Square,
  Icon_Personal,
  Icon_Sign_Out,
  Icon_Square,
  Icon_Square_Check,
  Icon_Trash,
} from '../../../../parts/icons/fontAwesome/FontAwesome'
import FormSearch, {
  NoResult,
} from '../../../../parts/inputs/forms/formSearch/FormSearch'
import ItemOpt from '../../../../parts/item/itemOpt/ItemOpt'
import LabelCircle from '../../../../parts/labels/labelCircle/LabelCircle'
import PopUp_ from '../../popup'
import {
  contentPopUpMessenger,
  content_sessionMessage,
  Context_Message,
  notificationMess,
  notification_change_avatar_chat_Mess,
  notification_join_chat_Mess,
  notification_leave_chat_Mess,
  notification_modify_name_chat_Mess,
  notification_modify_nick_name_Mess,
} from '../../popupMessenger/PopUpMessenger'
import PopUpReviews from '../../popupReview/PopUpReviews'
import './PopupSettingMessenger.css'
import PropTypes from 'prop-types'
import { createRequest } from '../../../../../utilities/requests'

/* eslint-disable no-unused-vars */
function PopupSettingMessenger() {
  var value_Context_Message = useContext(Context_Message)
  var [state, dispatch] = useStore()
  return (
    <PopUp_
      work_case_unmount={() => {
        value_Context_Message.setIsShowSettingMess(false)
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
                        dispatch(set_url(new Date().toLocaleString()))
                      }}
                      to={`account/${
                        value_Context_Message.membersChat.filter(
                          (member) =>
                            member.slug_member != state.account.slug_personal,
                        )[0].slug_member
                      }`}
                    >
                      <ItemOpt
                        component_Left={<Icon_Personal />}
                        children_centerItemOpt={'Show Personal Page '}
                      />
                    </Link>
                  </Fragment>
                ) : (
                  <Fragment>
                    <ItemOpt
                      component_Left={<Icon_Personal />}
                      children_centerItemOpt={'Members'}
                    />
                    <ItemOpt
                      handleClick={async () => {
                        const data = await createRequest(
                          'POST',
                          '/chat/getListFriend',
                          {
                            query: { limit: 10 },
                            body: { idChat: value_Context_Message.idChat },
                          },
                        )
                        dispatch(
                          add_popup_review(
                            <PopUpAddMember
                              data_new_Member={data.result}
                              value_Context_Message={value_Context_Message}
                            />,
                          ),
                        )
                      }}
                      component_Left={<Icon_AddPerson />}
                      children_centerItemOpt={'Add member'}
                    />
                    <ItemOpt
                      handleClick={() => {
                        dispatch(
                          add_popup_review(
                            <PopUpChangeAvatarChat
                              avatar_chat={value_Context_Message.avatarChat}
                              idChat={value_Context_Message.idChat}
                            />,
                          ),
                        )
                      }}
                      component_Left={<Icon_Image />}
                      children_centerItemOpt={`Change image chat`}
                    />
                    <ItemOpt
                      handleClick={() => {
                        dispatch(
                          add_popup_review(
                            <PopUpEditNameChat
                              nameChat={value_Context_Message.nameChat}
                              idChat={value_Context_Message.idChat}
                            />,
                          ),
                        )
                      }}
                      component_Left={<Icon_Pen_Square />}
                      children_centerItemOpt={'Modify name chat'}
                    />
                    <ItemOpt
                      handleClick={() => {
                        createRequest('POST', '/chat/leaveChat', {
                          body: {
                            idChat: value_Context_Message.idChat,
                            slug_leavers: state.account.slug_personal,
                            content_message: new contentPopUpMessenger({
                              slug_sender: state.account.slug_personal,
                              session_messages: [
                                new content_sessionMessage({
                                  notification: new notificationMess({
                                    leave_chat:
                                      new notification_leave_chat_Mess({
                                        slug_performer:
                                          state.account.slug_personal,
                                      }),
                                  }),
                                }),
                              ],
                            }),
                          },
                        })
                        dispatch(
                          delete_popup_messenger({
                            idChat: value_Context_Message.idChat,
                          }),
                        )
                      }}
                      component_Left={<Icon_Sign_Out />}
                      children_centerItemOpt={'Leave chat'}
                    />
                  </Fragment>
                )}
                <ItemOpt
                  handleClick={() => {
                    createRequest('POST', '/chat/:id/get-members', {
                      query: {
                        id: value_Context_Message.idChat,
                      },
                    }).then(({ data }) => {
                      dispatch(
                        add_popup_review(
                          <PopUpEditNickNameMember
                            dataMembers={data.result}
                            value_Context_Message={value_Context_Message}
                          />,
                        ),
                      )
                    })
                  }}
                  component_Left={<Icon_Pen_Square />}
                  children_centerItemOpt={'Modify Nickname'}
                />

                <ItemOpt
                  handleClick={() => {
                    createRequest('POST', '/chat/:id/remove', {
                      query: { id: value_Context_Message.idChat },
                    })
                    dispatch(
                      delete_popup_messenger({
                        idChat: value_Context_Message.idChat,
                      }),
                    )
                  }}
                  component_Left={<Icon_Trash />}
                  children_centerItemOpt={'Delete Chat'}
                />
              </div>
              <div className="contentRight-popupSettingMessenger"></div>
            </div>
            <div className="footer-popupSettingMessenger"></div>
          </div>
        </div>
      </div>
    </PopUp_>
  )
}

function PopUpAddMember({ data_new_Member, value_Context_Message }) {
  const [state_listSelectedSlug_Member, set_state_listSelectedSlug_Member] =
    useState([])
  const [state_searchNewMember, set_state_searchNewMember] =
    useState(data_new_Member)
  const [state_showNoResult, set_state_showNoResult] = useState(false)

  const [state, dispatch] = useStore()
  // console.log(state_listSelectedSlug_Member);
  return (
    <PopUpReviews
      titlePopUp={'Add member'}
      contentPopUp={
        <div>
          <div className="section_selectedAddMembers">
            {state_listSelectedSlug_Member.map((new_mb, idx) => {
              var name_new_mb = `${new_mb.fname} ${new_mb.lname}`
              return (
                <div key={idx} className="item-NameSelectedNewMember">
                  <LabelCircle urlImg={new_mb.avatar_account} />
                  <div className="shortNameSelectedNewMember">{`${name_new_mb
                    .split(' ')
                    .slice(
                      name_new_mb.split(' ').length - 2,
                      name_new_mb.split(' ').length,
                    )
                    .join(' ')}`}</div>
                </div>
              )
            })}
          </div>
          <FormSearch
            placeholder_text={'Search new member'}
            handler_Search={(value) => {
              if (value.trim().length > 0) {
                createRequest('POST', '/chat/searchNewMember', {
                  body: {
                    keyword: value,
                    idChat: value_Context_Message.idChat,
                  },
                }).then((data) => {
                  if (data.result.length > 0) {
                    set_state_showNoResult(false)
                  } else {
                    set_state_showNoResult(true)
                  }
                  set_state_searchNewMember([].concat(data.result))
                })
              } else {
                set_state_showNoResult(false)
                set_state_searchNewMember(data_new_Member)
              }
            }}
          />
          {state_searchNewMember.map((member, idx) => {
            return (
              <ItemAddMember
                key={idx}
                set_state_listSelectedSlug_Member={
                  set_state_listSelectedSlug_Member
                }
                state_listSelectedSlug_Member={state_listSelectedSlug_Member}
                data_new_Member={member}
                value_Context_Message={value_Context_Message}
              />
            )
          })}
          {state_showNoResult && <NoResult />}
          <div className="section_btnAddMembers">
            <ButtonNormal
              handleClick={() => {
                createRequest('POST', '/chat/addMembers', {
                  body: {
                    list_slug_new_member: state_listSelectedSlug_Member.map(
                      (new_mb) => new_mb.slug_personal,
                    ),
                    idChat: value_Context_Message.idChat,
                    content_message: new contentPopUpMessenger({
                      slug_sender: state.account.slug_personal,
                      session_messages: state_listSelectedSlug_Member.map(
                        (new_mb) => {
                          return new content_sessionMessage({
                            notification: new notificationMess({
                              join_chat: new notification_join_chat_Mess({
                                slug_performer: state.account.slug_personal,
                                name_affecter: `${new_mb.fname} ${new_mb.lname}`,
                                slug_affecter: new_mb.slug_personal,
                              }),
                            }),
                          })
                        },
                      ),
                    }),
                  },
                })
              }}
              textBtn={'Add members'}
            />
          </div>
        </div>
      }
    />
  )
}

function ItemAddMember({
  data_new_Member,
  value_Context_Message,
  state_listSelectedSlug_Member,
  set_state_listSelectedSlug_Member,
}) {
  const [state_selected_AddSlug_Member, set_state_selected_AddSlug_Member] =
    useState(
      state_listSelectedSlug_Member.some(
        (new_mb) => new_mb.slug_personal === data_new_Member.slug_personal,
      ),
    )
  const [state, dispatch] = useStore()

  return (
    <div>
      <ItemOpt
        component_Left={<LabelCircle urlImg={data_new_Member.avatar_account} />}
        children_centerItemOpt={
          <div>
            {
              <b>
                {data_new_Member.fname} {data_new_Member.lname}
              </b>
            }
          </div>
        }
        component_Right={
          state_selected_AddSlug_Member ? (
            <span
              onClick={() => {
                set_state_listSelectedSlug_Member(
                  (pre_state_listSelectedSlug_Member) => {
                    state_listSelectedSlug_Member.splice(
                      state_listSelectedSlug_Member.indexOf(data_new_Member),
                      1,
                    )
                    return [].concat(state_listSelectedSlug_Member)
                  },
                )
                set_state_selected_AddSlug_Member(false)
              }}
            >
              <Icon_Square_Check />
            </span>
          ) : (
            <span
              onClick={() => {
                set_state_listSelectedSlug_Member(
                  state_listSelectedSlug_Member.concat([data_new_Member]),
                )
                set_state_selected_AddSlug_Member(true)
              }}
            >
              <Icon_Square />
            </span>
          )
        }
      />
    </div>
  )
}

function PopUpEditNickNameMember({ dataMembers, value_Context_Message }) {
  return (
    <PopUpReviews
      titlePopUp={'Modify Nickname'}
      contentPopUp={
        <div>
          {dataMembers.map((member, idx) => {
            return (
              <ItemEditNickNameMember
                key={idx}
                dataMember={member}
                value_Context_Message={value_Context_Message}
              />
            )
          })}
        </div>
      }
    />
  )
}

function ItemEditNickNameMember({ dataMember, value_Context_Message }) {
  var tmp_nameMember = dataMember.nick_name
    ? dataMember.nick_name
    : `${dataMember.detail.fname} ${dataMember.detail.lname}`
  const [state_EditNickName, set_state_EditNickName] = useState(false)
  const ref_item_textNickName = useRef(null)
  const [state_textNickName, set_state_textNickName] = useState(tmp_nameMember)
  const [state, dispatch] = useStore()
  useEffect(() => {
    if (state_EditNickName) {
      ref_item_textNickName.current.querySelector('input').focus()
    }
  }, [state_EditNickName])
  return (
    <div ref={ref_item_textNickName}>
      <ItemOpt
        component_Left={
          <LabelCircle urlImg={dataMember.detail.avatar_account} />
        }
        children_centerItemOpt={
          <div>
            {state_EditNickName ? (
              <input
                value={state_textNickName}
                onChange={(event) => {
                  set_state_textNickName(event.currentTarget.value)
                }}
                onBlur={(event) => {
                  set_state_EditNickName(
                    ref_item_textNickName.current.contains(event.currentTarget),
                  )
                }}
                style={{
                  fontSize: 'inherit',
                  outline: 'none',
                  color: 'var(--greenColorHot)',
                  padding: '0px 10px',
                  border: '1px solid var(--greenColorHot)',
                }}
              ></input>
            ) : (
              <b>{state_textNickName}</b>
            )}
          </div>
        }
        component_Right={
          state_EditNickName ? (
            <span
              onClick={() => {
                set_state_EditNickName(false)
                createRequest('POST', '/chat/:id/member/update-nickname', {
                  query: { id: value_Context_Message.idChat },
                  body: {
                    nickname: state_textNickName,
                    slugMember: dataMember.slug_member,
                    content_message: new contentPopUpMessenger({
                      slug_sender: state.account.slug_personal,
                      session_messages: [
                        new content_sessionMessage({
                          notification: new notificationMess({
                            modify_nick_name:
                              new notification_modify_nick_name_Mess({
                                slug_performer: state.account.slug_personal,
                                slug_affecter: dataMember.slug_member,
                                new_nick_name: state_textNickName,
                                old_nick_name: tmp_nameMember,
                              }),
                          }),
                        }),
                      ],
                    }),
                  },
                })
              }}
            >
              <Icon_Square_Check />
            </span>
          ) : (
            <span
              onClick={() => {
                set_state_EditNickName(true)
              }}
            >
              <Icon_Pen_Square />
            </span>
          )
        }
      />
    </div>
  )
}

function PopUpEditNameChat({ nameChat, idChat }) {
  console.log(nameChat)
  const [state_textarea, set_state_textarea] = useState(nameChat)
  const [state_acceptSubmit, set_state_acceptSubmit] = useState(true)
  const [state, dispatch] = useStore()
  useEffect(() => {
    set_state_acceptSubmit(
      state_textarea.trim().length > 0 && state_textarea.trim() != nameChat,
    )
  }, [state_textarea])
  useEffect(() => {
    // console.log('state_acceptSubmit',state_acceptSubmit);
  }, [state_acceptSubmit])
  return (
    <PopUpReviews
      titlePopUp={'Modify name Chat'}
      contentPopUp={
        <Fragment>
          <div className={'section-textareaEditNameChat'}>
            <textarea
              onChange={(event) => {
                set_state_textarea(event.currentTarget.value)
                // console.log(state_acceptSubmit);
              }}
            >
              {state_textarea}
            </textarea>
          </div>
          <div className={'section-btnEditNameChat'}>
            <ButtonNormal
              key={1}
              isNo={true}
              handleClick={() => {
                dispatch(delete_popup_review(null))
              }}
              textBtn={'Cancel'}
              isEnable={true}
            />
            <ButtonNormal
              handleClick={() => {
                createRequest('POST', '/chat/:id/modify-name-box-chat', {
                  query: {
                    id: idChat,
                  },
                  body: {
                    nameChat: state_textarea,
                    content_message: new contentPopUpMessenger({
                      slug_sender: state.account.slug_personal,
                      session_messages: [
                        new content_sessionMessage({
                          notification: new notificationMess({
                            modify_name_chat:
                              new notification_modify_name_chat_Mess({
                                new_name_chat: state_textarea,
                                old_name_chat: nameChat,
                                slug_affecter: null,
                                slug_performer: state.account.slug_personal,
                              }),
                          }),
                        }),
                      ],
                    }),
                  },
                })
                dispatch(delete_popup_review(null))
              }}
              key={2}
              textBtn={'Save'}
              isEnable={state_acceptSubmit}
            />
          </div>
        </Fragment>
      }
    />
  )
}

function PopUpChangeAvatarChat({ avatar_chat, idChat }) {
  const ref_iptFile = useRef(null)
  const [state_avatar_chat, set_state_avatar_chat] = useState(avatar_chat)
  const [state_acceptSubmit, set_state_acceptSubmit] = useState(true)
  const [state, dispatch] = useStore()
  useEffect(() => {
    set_state_acceptSubmit(state_avatar_chat != avatar_chat)
  }, [state_avatar_chat])

  return (
    <PopUpReviews
      titlePopUp={'Change avatar Chat'}
      contentPopUp={
        <div className="body-changeAvatarChat">
          <div className={'section-changeAvatarChat'}>
            <LabelCircle urlImg={state_avatar_chat} sizeLabel={SIZE_LARGE} />
            <input
              onChange={(event) => {
                set_state_avatar_chat(
                  URL.createObjectURL(event.currentTarget.files[0]),
                )
              }}
              ref={ref_iptFile}
              type={'file'}
              style={{ display: 'none' }}
            ></input>
            <ButtonNormal
              textBtn={'Upload file'}
              handleClick={() => {
                ref_iptFile.current.click()
              }}
            />
          </div>
          <div className={'section-btnChangeAvatarChat'}>
            <ButtonNormal
              key={1}
              isNo={true}
              handleClick={() => {
                dispatch(delete_popup_review(null))
              }}
              textBtn={'Cancel'}
              isEnable={true}
            />
            <ButtonNormal
              handleClick={() => {
                // console.log('FileAvatar',ref_iptFile.current.files[0]);
                var form = new FormData()
                form.append('idChat', idChat)
                form.append('FileAvatar', ref_iptFile.current.files[0])
                form.append(
                  'content_message',
                  JSON.stringify(
                    new contentPopUpMessenger({
                      slug_sender: state.account.slug_personal,
                      session_messages: [
                        new content_sessionMessage({
                          notification: new notificationMess({
                            change_avatar_chat:
                              new notification_change_avatar_chat_Mess({
                                slug_performer: state.account.slug_personal,
                              }),
                          }),
                        }),
                      ],
                    }),
                  ),
                )
                createRequest('POST', '/chat/changeAvatarChat', {
                  body: form,
                })
                dispatch(delete_popup_review(null))
              }}
              key={2}
              textBtn={'Save'}
              isEnable={state_acceptSubmit}
            />
          </div>
        </div>
      }
    />
  )
}

PopUpAddMember.propTypes = {
  data_new_Member: PropTypes.object.isRequired,
  value_Context_Message: PropTypes.object.isRequired,
}

ItemAddMember.propTypes = {
  data_new_Member: PropTypes.object.isRequired,
  value_Context_Message: PropTypes.object.isRequired,
  state_listSelectedSlug_Member: PropTypes.object.isRequired,
  set_state_listSelectedSlug_Member: PropTypes.object.isRequired,
}

PopUpChangeAvatarChat.propTypes = {
  avatar_chat: PropTypes.string.isRequired,
  idChat: PropTypes.string.isRequired,
}
PopUpEditNameChat.propTypes = {
  nameChat: PropTypes.string.isRequired,
  idChat: PropTypes.string.isRequired,
}

PopUpEditNickNameMember.propTypes = {
  dataMembers: PropTypes.object.isRequired,
  value_Context_Message: PropTypes.object.isRequired,
}

ItemEditNickNameMember.propTypes = {
  dataMember: PropTypes.object.isRequired,
  value_Context_Message: PropTypes.object.isRequired,
}

export default PopupSettingMessenger
/* eslint-disable no-unused-vars */
