import { Fragment, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useStore } from '@store'
import { set_url } from '@store/actions'
import {
  req_acceptAddNewFriend,
  req_refuse_requestAddFriend,
} from '@store/functions'
import ButtonNormal from '../../buttons/buttonNormal/ButtonNormal'
import {
  Icon_Arrow_Left,
  Icon_Friend,
  Icon_Send_Mess,
  Icon_Share,
} from '../../icons/fontAwesome/FontAwesome'
import ItemOpt from '../../item/itemOpt/ItemOpt'
import LabelCircle from '../../labels/labelCircle/LabelCircle'
import './PageFriend.css'
import { createRequest } from '@utils/requests'

function PageFriend() {
  return (
    <div className="container-pageFriend">
      <div className="main-pageFriend">
        <div className="body-pageFriend">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
/* eslint-disable no-unused-vars */
export function SidebarFriendMenuDefault() {
  const [state, dispatch] = useStore()
  return (
    <Fragment>
      <div className="sidebarLeft-pageFriend">
        <div className="titleMenu-pageFriend">
          <h1>Friends</h1>
        </div>
        <div className="listMenu-pageFriend">
          <Link
            to={`request`}
            onClick={() => {
              dispatch(set_url(`${window.location.href}/${'response'}`))
            }}
          >
            <ItemOpt
              children_centerItemOpt={<b>Request friend</b>}
              component_Left={<LabelCircle el_Icon={<Icon_Send_Mess />} />}
            />
          </Link>

          <Link
            onClick={() => {
              dispatch(set_url(`${window.location.href}/${'response'}`))
            }}
            to={`response`}
          >
            <ItemOpt
              children_centerItemOpt={<b>Response</b>}
              component_Left={<LabelCircle el_Icon={<Icon_Share />} />}
            />
          </Link>
          <Link
            onClick={() => {
              dispatch(set_url(`${window.location.href}/${'list'}`))
            }}
            to={`list`}
          >
            <ItemOpt
              children_centerItemOpt={<b>All friends</b>}
              component_Left={<LabelCircle el_Icon={<Icon_Friend />} />}
            />
          </Link>
        </div>
      </div>
      <div className="sidebarRight-pageFriend">
        <h1>Please select the list of friends you want to see</h1>
      </div>
    </Fragment>
  )
}

export function SidebarFriendRequest() {
  const [state_listFriend, set_state_listFriend] = useState(null)
  useEffect(() => {
    const fetchAPI = async () => {
      const data = await createRequest('GET', '/friend/getListRequestFriend')
      set_state_listFriend(data.result)
    }
    fetchAPI()
  }, [])
  return (
    <Fragment>
      <div className="sidebarLeft-pageFriend">
        <div className="titleMenu-pageFriend">
          <ItemOpt
            component_Left={
              <Link to={'/friends'}>
                <Icon_Arrow_Left />
              </Link>
            }
            children_centerItemOpt={<b>Request</b>}
          />
        </div>
        <div className="listMenu-pageFriend">
          {state_listFriend
            ? state_listFriend.map((friend, idx) => {
                return (
                  <Link
                    key={idx}
                    onClick={() => {
                      // navigate(`/${friend.slug_personal}`,{replace:true})
                      // dispatch(set_url(new Date().toLocaleString()))
                    }}
                    to={`${friend.slug_personal}`}
                  >
                    <ItemOpt
                      children_centerItemOpt={
                        <b>{`${friend.fname} ${friend.lname}`}</b>
                      }
                      component_Left={
                        <LabelCircle urlImg={friend.avatar_account} />
                      }
                    />
                  </Link>
                )
              })
            : ''}
        </div>
      </div>
      <div className="sidebarRight-pageFriend">
        <Outlet />
      </div>
    </Fragment>
  )
}
export function SidebarFriendResponse() {
  const [state_listFriend, set_state_listFriend] = useState(null)
  useEffect(() => {
    const fetchAPI = async () => {
      const data = await createRequest('GET', '/friend/getListResponseFriend')
      set_state_listFriend(data.result)
    }
    fetchAPI()
  }, [])
  return (
    <Fragment>
      <div className="sidebarLeft-pageFriend">
        <div className="titleMenu-pageFriend">
          <ItemOpt
            component_Left={
              <Link to={'/friends'}>
                <Icon_Arrow_Left />
              </Link>
            }
            children_centerItemOpt={<b>Response</b>}
          />
        </div>
        <div className="listMenu-pageFriend">
          {state_listFriend
            ? state_listFriend.map((friend, idx) => {
                return (
                  <Link
                    key={idx}
                    onClick={() => {
                      // navigate(`/${friend.slug_personal}`,{replace:true})
                      // dispatch(set_url(new Date().toLocaleString()))
                    }}
                    to={`${friend.slug_personal}`}
                  >
                    <ItemOpt
                      children_centerItemOpt={
                        <b>{`${friend.fname} ${friend.lname}`}</b>
                      }
                      component_Left={
                        <LabelCircle urlImg={friend.avatar_account} />
                      }
                      component_Sub={
                        <>
                          <div
                            style={{
                              display: 'flex',
                            }}
                          >
                            <ButtonNormal
                              handleClick={() => {
                                req_acceptAddNewFriend(friend)
                                // dataNotification.friend.response_new_friend.splice(idx,1);
                                // set_state_dataNotification(dataNotification)
                              }}
                              isNo={false}
                              textBtn={'Accept'}
                            />
                            <ButtonNormal
                              isNo={true}
                              textBtn={'Refuse'}
                              handleClick={() => {
                                req_refuse_requestAddFriend(friend)
                                // dataNotification.friend.response_new_friend.splice(idx,1);
                                // set_state_dataNotification(Object.assign({},dataNotification))
                              }}
                            />
                          </div>
                        </>
                      }
                    />
                  </Link>
                )
              })
            : ''}
        </div>
      </div>
      <div className="sidebarRight-pageFriend">
        <Outlet />
      </div>
    </Fragment>
  )
}
export function SidebarFriendList() {
  const [state_listFriend, set_state_listFriend] = useState(null)
  const [state, dispatch] = useStore()
  var navigate = useNavigate()
  useEffect(() => {
    const fetchAPI = async () => {
      const data = createRequest('GET', '/friend/getListFriend')
      set_state_listFriend(data.result)
    }
    fetchAPI()
  }, [])

  return (
    <Fragment>
      <div className="sidebarLeft-pageFriend">
        <div className="titleMenu-pageFriend">
          <ItemOpt
            component_Left={
              <Link to={'/friends'}>
                <Icon_Arrow_Left />
              </Link>
            }
            children_centerItemOpt={<b>All Friends</b>}
          />
        </div>
        <div className="listMenu-pageFriend">
          {state_listFriend
            ? state_listFriend.map((friend, idx) => {
                return (
                  <span
                    key={idx}
                    onClick={() => {
                      // console.log(friend.slug_personal);
                      navigate(`${friend.slug_personal}`)
                      // navigate(0);
                      dispatch(set_url(`/${friend.slug_personal}`))
                    }}
                  >
                    {/* <Link key={idx}  to={`${friend.slug_personal}`}> */}
                    <ItemOpt
                      children_centerItemOpt={
                        <b>{`${friend.fname} ${friend.lname}`}</b>
                      }
                      component_Left={
                        <LabelCircle urlImg={friend.avatar_account} />
                      }
                    />
                    {/* </Link> */}
                  </span>
                )
              })
            : ''}
        </div>
      </div>
      <div className="sidebarRight-pageFriend">
        <Outlet />
      </div>
    </Fragment>
  )
}
export default PageFriend
/* eslint-disable no-unused-vars */
