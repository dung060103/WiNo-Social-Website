import OverImage from '../../images/overImage/OverImage'
import LabelCircle from '../../labels/labelCircle/LabelCircle'
import NamePersonal from '../../names/namePersonal/NamePersonal'
import ShortInfoPersonal from '../../shorts/shortInfo/shortInfoPersonal/ShortInfoPersonal'
import PagePersonalHeaderStyles from '../pagePersonalHeader/PagePersonalHeader.module.css'
import ButtonNormal from '../../buttons/buttonNormal/ButtonNormal'
import ListTabPersonalHeader from '../../lists/listTabPersonalHeader/ListTabPersonalHeader'
import { useStore } from '../../../../store'
import {
  Icon_AddPerson,
  Icon_Circle_Plus,
  Icon_Close,
  Icon_Follow,
  Icon_Friend,
  Icon_Mess,
  Icon_Pen_Square,
  Icon_Question,
  Icon_Square_Check,
  Icon_Unfriend,
} from '../../icons/fontAwesome/FontAwesome'
import { Fragment, useEffect } from 'react'
import ItemOpt from '../../item/itemOpt/ItemOpt'
import {
  req_acceptAddNewFriend,
  req_refuse_requestAddFriend,
  cancelRequestAddFriend,
  req_requestAddFriend,
  req_unfriend,
} from '../../../../store/functions'
import { set_data_account } from '../../../../store/actions'
import { createBoxChat } from '../../../layouts/popups/popupHeader/popupMessageHeader/PopupMessageHeader'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function PagePersonalHeader({ stateAccount }) {
  var [state, dispatch] = useStore()
  var account = stateAccount
  useEffect(() => {
    state.socket.on(
      `${state.account.slug_personal}_UPDATE_REQUEST_ADD_NEW_FRIEND`,
      (dataAccount) => {
        dispatch(set_data_account(dataAccount))
        state.socket.off(
          `${state.account.slug_personal}_UPDATE_REQUEST_ADD_NEW_FRIEND`,
        )
      },
    )
    state.socket.on(
      `${state.account.slug_personal}_UPDATE_LIST_RESPONSE_NEW_FRIEND`,
      (dataAccount) => {
        dispatch(set_data_account(dataAccount))
      },
    )
  }, [state.account])
  return (
    <div className={PagePersonalHeaderStyles['container-pagePersonalHeader']}>
      <div
        className={PagePersonalHeaderStyles['partOverImage-pagePersonalHeader']}
      >
        <OverImage urlImage={account.cover_image} />
      </div>
      <div className={PagePersonalHeaderStyles['partMain-pagePersonalHeader']}>
        <div
          className={
            PagePersonalHeaderStyles['containerAvatar-pagePersonalHeader']
          }
        >
          <LabelCircle
            typeLabelCircle="avatar"
            urlImg={account.avatar_account}
          />
        </div>
        <div
          className={
            PagePersonalHeaderStyles['containerName-pagePersonalHeader']
          }
        >
          <NamePersonal
            textName={account.fname + ' ' + account.lname}
            elOfficial={<i className="fa-solid fa-circle-check"></i>}
          />
          <div
            className={
              PagePersonalHeaderStyles['containerShortInfo-pagePersonalHeader']
            }
          >
            {['14 million followers', '5 is following'].map((el, idx) => {
              return <ShortInfoPersonal key={idx} textInfo={el} type={'link'} />
            })}
          </div>
        </div>

        <div
          className={
            PagePersonalHeaderStyles['containerBtn-pagePersonalHeader']
          }
        >
          <ButtonHeaderWithSlugPersonal
            account={stateAccount}
            state={state}
            dispatch={dispatch}
          />
        </div>
      </div>
      <div
        className={PagePersonalHeaderStyles['partLisTab-pagePersonalHeader']}
      >
        <ListTabPersonalHeader />
      </div>
    </div>
  )
}

function ButtonHeaderWithSlugPersonal({ account, state, dispatch }) {
  var isMe = account.slug_personal == state.account.slug_personal
  var isFriend = state.account.list_slug_friend.some(
    (slug_friend) => account.slug_personal == slug_friend,
  )
  var isResponseFriend = state.account.list_response_new_friend.some(
    (new_friend) => account.slug_personal == new_friend.slug_friend,
  )
  var isRequestFriend = state.account.list_request_new_friend.some(
    (new_friend) => account.slug_personal == new_friend.slug_friend,
  )

  return isMe ? (
    <Fragment>
      <Link to={`/account/personal/${state.account.slug_personal}/setting`}>
        <ButtonNormal
          textBtn={'Edit information'}
          elIcon={<Icon_Pen_Square isHot={false} />}
          isNo={false}
        />
      </Link>
      <ButtonNormal
        textBtn={'Post story'}
        elIcon={<Icon_Circle_Plus />}
        isNo={true}
      />
    </Fragment>
  ) : (
    <Fragment>
      {isFriend ? (
        <ButtonNormal
          textBtn={'Friend'}
          elIcon={<Icon_Friend isHot={false} />}
          isNo={false}
          componentPopUP={[
            <div
              key={'Unfriend'}
              className={PagePersonalHeaderStyles['itemPopUp']}
              onClick={() => {
                req_unfriend(account)
                var tmp_account = state.account

                tmp_account.list_slug_friend.forEach((slug_friend, idx) => {
                  if (slug_friend == account.slug_personal) {
                    tmp_account.list_slug_friend.splice(idx, 1)
                  }
                })
                dispatch(set_data_account(tmp_account))
              }}
            >
              <ItemOpt
                component_Left={<Icon_Unfriend />}
                children_centerItemOpt={'Unfriend'}
              />
            </div>,
            <div
              key={'Following'}
              className={PagePersonalHeaderStyles['itemPopUp']}
            >
              <ItemOpt
                component_Left={<Icon_Follow />}
                children_centerItemOpt={'Following'}
              />
            </div>,
          ]}
        />
      ) : isResponseFriend ? (
        <ButtonNormal
          textBtn={'Response'}
          elIcon={<Icon_Question isHot={false} />}
          isNo={false}
          componentPopUP={[
            <div
              key={'Accept'}
              className={PagePersonalHeaderStyles['itemPopUp']}
            >
              <ItemOpt
                component_Left={<Icon_Square_Check />}
                children_centerItemOpt={'Accept'}
                handleClick={() => {
                  req_acceptAddNewFriend(account)
                }}
              />
            </div>,
            <div
              key={'Refuse'}
              className={PagePersonalHeaderStyles['itemPopUp']}
            >
              <ItemOpt
                component_Left={<Icon_Close />}
                children_centerItemOpt={'Refuse'}
                handleClick={() => {
                  req_refuse_requestAddFriend(account)
                }}
              />
            </div>,
          ]}
        />
      ) : isRequestFriend ? (
        <ButtonNormal
          handleClick={() => {
            cancelRequestAddFriend(account)
          }}
          textBtn={'Cancel Request'}
          elIcon={<Icon_Question isHot={false} />}
          isNo={false}
        />
      ) : (
        <ButtonNormal
          handleClick={() => {
            req_requestAddFriend(account)
          }}
          textBtn={'Add friend'}
          elIcon={<Icon_AddPerson isHot={false} />}
          isNo={false}
        />
      )}
      <ButtonNormal
        textBtn={'Chatting'}
        elIcon={<Icon_Mess />}
        isNo={true}
        handleClick={() => {
          const members = [account.slug_personal, state.account.slug_personal]

          createBoxChat({
            data_Chat_id: account.id_chatPersonalPage,
            dispatch,
            state,
            members,
          })
        }}
      />
    </Fragment>
  )
}

PagePersonalHeader.propTypes = {
  stateAccount: PropTypes.object.isRequired,
}

ButtonHeaderWithSlugPersonal.propTypes = {
  account: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default PagePersonalHeader
