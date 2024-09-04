import Peer from 'peerjs'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useStore } from '@store'
import { delete_popup_call_video } from '@store/actions'
import ButtonNormal from '@components/parts/buttons/buttonNormal/ButtonNormal'
import { Icon_Phone } from '@components/parts/icons/fontAwesome/FontAwesome'
import ItemOpt from '@components/parts/item/itemOpt/ItemOpt'
import LabelCircle from '@components/parts/labels/labelCircle/LabelCircle'
import './PopUpCallVideo.css'
import PropTypes from 'prop-types'
import { createRequest } from '@utils/requests'

/* eslint-disable no-unused-vars */
function PopUpCallVideo({
  listJoiner = [],
  avatarCallVideo,
  nameCallVideo,
  isResponse = false,
  peer = new Peer(),
  account_caller = null,
  membersChat = [],
  idChat = '',
}) {
  const [state, dispatch] = useStore()
  const refVideo = useRef(null)
  const refContainerCallVideo = useRef(null)
  const refStreamSubCamera = useRef(null)
  const refStreamMainCamera = useRef(null)
  const ref_state_list_accepter = useRef([])
  const ref_StreamCameraYou = useRef(null)
  const refButtonTurnOffCallVideo = useRef(null)

  const [state_isZoomIn, set_state_isZoomIn] = useState(false)
  const [state_stream, set_state_stream] = useState(null)
  const [state_isResponse, set_state_isResponse] = useState(isResponse)
  const [state_subCameras, set_state_subCameras] = useState([])
  const [state_list_accepter, set_state_list_accepter] = useState([])
  var who = (stream, call, state_stream) => {
    if (!state_stream) {
      call.on('stream', (remoteStream) => {
        refVideo.current.srcObject = remoteStream
        refVideo.current.play()
        set_state_stream(remoteStream)
      })
    } else if (state_stream) {
      // console.log(state_subCameras);
      call.on('stream', (remoteStream) => {
        set_state_subCameras(
          state_subCameras.concat([
            <Fragment key={state_subCameras.length}>
              <VideoCamera stream={remoteStream} />
              <ItemOpt children_centerItemOpt={<b>{`CCC`}</b>} />
            </Fragment>,
          ]),
        )
      })
    }
  }
  useEffect(() => {
    if (isResponse) {
      membersChat.forEach((member) => {
        if (member.slug_member == account_caller.slug_personal) {
          account_caller.member = member
        }
        state.socketChat.once(
          `${member.slug_member}_LEAVE_CALL_VIDEO`,
          (data) => {
            if (data.slug_leaver != state.account.slug_personal) {
              console.log(
                `${member.slug_member}_LEAVE_CALL_VIDEO`,
                refStreamMainCamera.current,
                refStreamSubCamera.current,
              )
              if (
                refStreamSubCamera.current.some(
                  (item) =>
                    item.data.account_joiner &&
                    item.data.account_joiner.slug_personal == data.slug_leaver,
                )
              ) {
                refStreamSubCamera.current.forEach((item, idx) => {
                  console.log(`${member.slug_member}_LEAVE_CALL_VIDEO`, item)
                  if (
                    item.data.account_joiner &&
                    item.data.account_joiner.slug_personal == data.slug_leaver
                  ) {
                    refStreamSubCamera.current.splice(idx, 1)
                  }
                })
              } else {
                if (
                  refStreamMainCamera.current &&
                  refStreamMainCamera.current.data.account_joiner
                    .slug_personal == data.slug_leaver
                ) {
                  refStreamMainCamera.current = null
                  // set_state_stream(null);
                  console.log(
                    `${member.slug_member}_LEAVE_CALL_VIDEO`,
                    refStreamMainCamera.current,
                    refStreamSubCamera.current,
                  )
                  if (refStreamSubCamera.current.length >= 2) {
                    refStreamMainCamera.current = refStreamSubCamera.current[1]
                  }
                }
              }

              set_state_subCameras(
                [].concat(
                  refStreamSubCamera.current.map((item, idx) => {
                    return (
                      <Fragment key={idx}>
                        <VideoCamera stream={item.stream} />
                        <ItemOpt
                          children_centerItemOpt={<b>{item.data.nameJoiner}</b>}
                        />
                      </Fragment>
                    )
                  }),
                ),
              )
            }
          },
        )

        state.socketChat.once(
          `${member.slug_member}_ACCEPT_JOIN_CALL_VIDEO`,
          (data) => {
            set_state_list_accepter(
              state_list_accepter.concat([
                {
                  account_joiner: data.account_joiner,
                  member: member,
                  peerId: data.peerId,
                  stream_id: data.stream_id,
                },
              ]),
            )
            if (
              !ref_state_list_accepter.current.some(
                (accepter) => accepter.stream_id == data.stream_id,
              )
            ) {
              ref_state_list_accepter.current.push({
                account_joiner: data.account_joiner,
                member: member,
                peerId: data.peerId,
                stream_id: data.stream_id,
              })
            }
          },
        )
      })
      who = (stream, call, state_stream) => {
        if (!refStreamMainCamera.current) {
          call.on('stream', (remoteStream) => {
            // refVideo.current.srcObject = remoteStream;
            // refVideo.current.play();
            ref_StreamCameraYou.current = stream
            if (refButtonTurnOffCallVideo) {
              refButtonTurnOffCallVideo.current.addEventListener(
                'click',
                () => {
                  console.log('ccccc', stream)
                },
              )
            }
            set_state_stream(remoteStream)
            refStreamSubCamera.current = [
              {
                stream: stream,
                data: {
                  nameJoiner: 'You',
                },
              },
            ]
            set_state_subCameras(
              [].concat(
                refStreamSubCamera.current.map((item, idx) => {
                  return (
                    <Fragment key={idx}>
                      <VideoCamera stream={item.stream} />
                      <ItemOpt
                        children_centerItemOpt={<b>{item.data.nameJoiner}</b>}
                      />
                    </Fragment>
                  )
                }),
              ),
            )
            console.log(
              `${''}_ACCEPT_JOIN_CALL_VIDEO`,
              ref_state_list_accepter.current,
            )
            refStreamMainCamera.current = {
              stream: remoteStream,
              data: {
                account_joiner: account_caller,
              },
            }
          })
        } else if (refStreamMainCamera.current) {
          call.on('stream', (remoteStream) => {
            // console.log();
            ref_state_list_accepter.current.forEach((accepter) => {
              // console.log(accepter);
              if (
                accepter.stream_id === remoteStream.id &&
                !refStreamSubCamera.current.some((item) => {
                  return item.stream.id === remoteStream.id
                })
              ) {
                console.log('CCCC')
                refStreamSubCamera.current.push({
                  stream: remoteStream,
                  data: {
                    account_joiner: accepter.account_joiner,
                    nameJoiner: `${
                      accepter.member.nick_name
                        ? accepter.member.nick_name
                        : `${accepter.account_joiner.fname} ${accepter.account_joiner.lname}`
                    }`,
                  },
                })
              }
            })
            set_state_subCameras(
              [].concat(
                refStreamSubCamera.current.map((item, idx) => {
                  return (
                    <Fragment key={idx}>
                      <VideoCamera stream={item.stream} />
                      <ItemOpt
                        children_centerItemOpt={<b>{item.data.nameJoiner}</b>}
                      />
                    </Fragment>
                  )
                }),
              ),
            )
          })
        }
      }
    } else if (!isResponse) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: false })
          .then((stream) => {
            if (state_subCameras.length == 0) {
              ref_StreamCameraYou.current = stream
              if (refButtonTurnOffCallVideo) {
                refButtonTurnOffCallVideo.current.addEventListener(
                  'click',
                  () => {
                    // console.log('ccccc',stream);
                    stream.getTracks().forEach((track) => {
                      track.stop()
                    })
                  },
                )
              }
              refStreamSubCamera.current = [
                {
                  stream: stream,
                  data: {
                    nameJoiner: 'You',
                  },
                },
              ]

              set_state_subCameras(
                [].concat(
                  refStreamSubCamera.current.map((item, idx) => {
                    return (
                      <Fragment key={idx}>
                        <VideoCamera stream={item.stream} />
                        <ItemOpt
                          children_centerItemOpt={<b>{item.data.nameJoiner}</b>}
                        />
                      </Fragment>
                    )
                  }),
                ),
              )
            }
            membersChat.forEach((member) => {
              state.socketChat.once(
                `${member.slug_member}_LEAVE_CALL_VIDEO`,
                (data) => {
                  if (refStreamMainCamera.current) {
                    if (
                      refStreamSubCamera.current.some(
                        (item) =>
                          item.data.account_joiner &&
                          item.data.account_joiner.slug_personal ==
                            data.slug_leaver,
                      )
                    ) {
                      refStreamSubCamera.current.forEach((item, idx) => {
                        if (
                          item.data.account_joiner &&
                          item.data.account_joiner.slug_personal ==
                            data.slug_leaver
                        ) {
                          refStreamSubCamera.current.splice(idx, 1)
                        }
                      })
                      set_state_subCameras(
                        [].concat(
                          refStreamSubCamera.current.map((item, idx) => {
                            return (
                              <Fragment key={idx}>
                                <VideoCamera stream={item.stream} />
                                <ItemOpt
                                  children_centerItemOpt={
                                    <b>{item.data.nameJoiner}</b>
                                  }
                                />
                              </Fragment>
                            )
                          }),
                        ),
                      )
                    } else {
                      console.log(
                        `${member.slug_member}_LEAVE_CALL_VIDEO`,
                        refStreamSubCamera,
                        refStreamMainCamera,
                      )

                      if (
                        refStreamMainCamera.current.data.account_joiner
                          .slug_personal == data.slug_leaver
                      ) {
                        refStreamMainCamera.current = null
                        set_state_stream(null)
                        if (refStreamSubCamera.current.length >= 2) {
                          refStreamMainCamera.current =
                            refStreamSubCamera.current[1]
                          refStreamSubCamera.current.splice(1, 1)
                          set_state_subCameras(
                            [].concat(
                              refStreamSubCamera.current.map((item, idx) => {
                                return (
                                  <Fragment key={idx}>
                                    <VideoCamera stream={item.stream} />
                                    <ItemOpt
                                      children_centerItemOpt={
                                        <b>{item.data.nameJoiner}</b>
                                      }
                                    />
                                  </Fragment>
                                )
                              }),
                            ),
                          )
                        }
                      }
                    }
                  }
                },
              )
              state.socketChat.once(
                `${member.slug_member}_ACCEPT_JOIN_CALL_VIDEO`,
                (data) => {
                  if (
                    !ref_state_list_accepter.current.some((accepter) => {
                      // console.log(`${member.slug_member}_ACCEPT_JOIN_CALL_VIDEO`,accepter.stream_id,data.stream_id)
                      return accepter.stream_id == data.stream_id
                    })
                  ) {
                    const call = peer.call(data.peerId, stream)
                    call.on('stream', (remoteStream) => {
                      if (!refStreamMainCamera.current) {
                        console.log(remoteStream)
                        ref_state_list_accepter.current.push({
                          account_joiner: data.account_joiner,
                          member: member,
                          peerId: data.peerId,
                          stream_id: data.stream_id,
                        })

                        refStreamMainCamera.current = {
                          stream: remoteStream,
                          data: {
                            account_joiner: data.account_joiner,
                            member: member,
                            peerId: data.peerId,
                            stream_id: data.stream_id,
                          },
                        }
                        console.log(
                          `_ACCEPT_JOIN_CALL_VIDEO`,
                          data,
                          refStreamMainCamera,
                        )
                        set_state_stream(remoteStream)
                      } else if (refStreamMainCamera.current) {
                        // console.log(state_subCameras);

                        if (
                          remoteStream.id !=
                            refStreamMainCamera.current.stream.id &&
                          !refStreamSubCamera.current.some(
                            (item) => item.stream.id === remoteStream.id,
                          )
                        ) {
                          refStreamSubCamera.current.push({
                            stream: remoteStream,
                            data: {
                              account_joiner: data.account_joiner,
                              nameJoiner: `${
                                member.nick_name
                                  ? member.nick_name
                                  : `${data.account_joiner.fname} ${data.account_joiner.lname}`
                              }`,
                            },
                          })
                          set_state_subCameras(
                            [].concat(
                              refStreamSubCamera.current.map((item, idx) => {
                                return (
                                  <Fragment key={idx}>
                                    <VideoCamera stream={item.stream} />
                                    <ItemOpt
                                      children_centerItemOpt={
                                        <b>{item.data.nameJoiner}</b>
                                      }
                                    />
                                  </Fragment>
                                )
                              }),
                            ),
                          )

                          // set_state_subCameras(
                          //   state_subCameras.concat([
                          //     <Fragment>
                          //       <VideoCamera stream={} />
                          //       <ItemOpt
                          //         children_centerItemOpt={
                          //           <b>{}</b>
                          //         }
                          //       />
                          //     </Fragment>,
                          //   ])
                          // );
                        }
                      }
                    })
                  }
                },
              )
            })
          })
      }
    }
  }, [state_subCameras, state_stream, state_list_accepter])
  return (
    <div className="container-popupCallVideo" ref={refContainerCallVideo}>
      <div className="main-popupCallVideo">
        <div
          className={`body-popupCallVideo ${state_isZoomIn ? 'isZoomIn' : ''}`}
        >
          <div className="content-popupCallVideo">
            <div className="video-popupCallVideo">
              {refStreamMainCamera.current && isResponse && account_caller && (
                <MainCameraCallVideo
                  data={{
                    nameJoiner: account_caller.member.nick_name
                      ? account_caller.member.nick_name
                      : `${account_caller.fname} ${account_caller.lname}`,
                  }}
                  stream={refStreamMainCamera.current.stream}
                />
              )}
              {refStreamMainCamera.current &&
                !isResponse &&
                !account_caller && (
                  <MainCameraCallVideo
                    data={{
                      nameJoiner: ref_state_list_accepter.current[0].member
                        .nick_name
                        ? ref_state_list_accepter.current[0].member.nick_name
                        : `${ref_state_list_accepter.current[0].account_joiner.fname} ${ref_state_list_accepter.current[0].account_joiner.lname}`,
                      // account_joiner
                    }}
                    stream={refStreamMainCamera.current.stream}
                  />
                )}
            </div>

            <div className="section-joiner">
              {listJoiner.map((joiner, idx) => {
                return (
                  <div className="item-joinerCallVideo" key={idx}>
                    <LabelCircle urlImg={joiner.avatar_account} />
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <b>"{joiner.name_chat}" be calling...</b>
                  </div>
                )
              })}
            </div>
            <div className="section-infoShortCallVideo">
              {
                <div className="body-infoShortCallVideo">
                  <LabelCircle urlImg={avatarCallVideo} />
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  <b>"{nameCallVideo}" be calling...</b>
                </div>
              }
            </div>
            <div className="section-btnCoreCallVideo">
              {state_isResponse && (
                <ButtonNormal
                  handleClick={() => {
                    // console.log(state_stream);
                    set_state_isResponse(false)
                    if (isResponse) {
                      // console.log(refStreamSubCamera.current);
                      if (
                        navigator.mediaDevices &&
                        navigator.mediaDevices.getUserMedia
                      ) {
                        navigator.mediaDevices
                          .getUserMedia({ video: true, audio: true })
                          .then(async (stream) => {
                            const body = {
                              peerId: peer._id,
                              account_caller: account_caller,
                              idChat,
                              stream_id: stream.id,
                            }

                            await createRequest(
                              'POST',
                              '/chat/acceptJoinCallVideo',
                              { body },
                            )
                            peer.on('call', (call) => {
                              // set_state_subCameras(state_subCameras.concat([<VideoCamera stream={stream}/>]))
                              call.answer(stream)
                              who(stream, call, state_stream)

                              if (state_list_accepter.length == 0) {
                                // set_state_subCameras(state_subCameras.concat([<Fragment >
                                //   <VideoCamera stream={stream}/>
                                //   <ItemOpt children_centerItemOpt={<b>{`You`}</b>}/>
                                // </Fragment>]))
                              } else {
                                state_list_accepter.forEach((data) => {
                                  const call = peer.call(data.peerId, stream)
                                  call.on('stream', (remoteStream) => {
                                    // console.log(state_subCameras);
                                    set_state_subCameras(
                                      state_subCameras.concat([
                                        <Fragment key={state_subCameras.length}>
                                          <VideoCamera stream={remoteStream} />
                                          <ItemOpt
                                            children_centerItemOpt={
                                              <b>{`${
                                                data.member.nick_name
                                                  ? data.member.nick_name
                                                  : `${data.account_joiner.fname} ${data.account_joiner.lname}`
                                              }`}</b>
                                            }
                                          />
                                        </Fragment>,
                                        <Fragment
                                          key={state_subCameras.length + 1}
                                        >
                                          <VideoCamera stream={stream} />
                                          <ItemOpt
                                            children_centerItemOpt={
                                              <b>{`You`}</b>
                                            }
                                          />
                                        </Fragment>,
                                      ]),
                                    )
                                  })
                                })
                              }
                            })
                          })
                      }
                    }
                  }}
                  elIcon={<Icon_Phone isHot={false} />}
                />
              )}
              <span ref={refButtonTurnOffCallVideo}>
                <ButtonTurnOffCallVideo
                  idChat={idChat}
                  stream={ref_StreamCameraYou.current}
                />
              </span>
            </div>
          </div>
          <div className="sidebarRight-popupCallVideo">
            {state_subCameras.map((subCamera, idx) => {
              // console.log(state_subCameras);
              return <SubCameraCallVideo subCamera={subCamera} key={idx} />
            })}
          </div>
          {!state_isZoomIn ? (
            <div
              onClick={() => {
                set_state_isZoomIn(!state_isZoomIn)
              }}
              className="btn-zoomInScreenCallVideo"
            >
              <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
            </div>
          ) : (
            <div
              onClick={() => {
                set_state_isZoomIn(!state_isZoomIn)
              }}
              className="btn-zoomOutScreenCallVideo"
            >
              <i className="fa-solid fa-down-left-and-up-right-to-center"></i>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
function ButtonTurnOffCallVideo({ stream, idChat }) {
  const [state, dispatch] = useStore()
  if (stream) {
    stream.oninactive = () => {
      console.log('stream running')
      stream.getTracks().forEach((track) => {
        track.stop()
        track.enabled = false
      })
    }
  }
  return (
    <div
      className="btn_turnoffCallVideo"
      onClick={() => {
        if (stream) {
          var videos = document.querySelectorAll(`video`)
          videos.forEach((video) => {
            console.log(video.srcObject)
            if (video.x && video.srcObject.id == stream.id) {
              video.srcObject.getTracks().forEach((track) => {
                track.stop()
              })
              video.pause()
              video.src = ''
              video.srcObject = null
              video.remove()
              // window.localStream
            }
          })
          // stream.stop();
        }
        // localMediaStream.stop();
        const body = { idChat }

        createRequest('POST', '/chat/leaveCallVideo', { body })
        dispatch(delete_popup_call_video(null))
      }}
    >
      <span>
        <i className="fa-solid fa-phone"></i>
      </span>
    </div>
  )
}
function VideoCamera({ stream }) {
  console.log('VideoCamera', stream)
  var refVideo = useRef(null)
  useEffect(() => {
    if (refVideo) {
      refVideo.current.srcObject = stream

      refVideo.current.play()
    }
  }, [])
  return <video ref={refVideo}></video>
}
function MainCameraCallVideo({ stream, data }) {
  // console.log(data);
  return (
    <Fragment>
      <VideoCamera stream={stream} />
      <ItemOpt children_centerItemOpt={data.nameJoiner} />
    </Fragment>
  )
}
function SubCameraCallVideo({ subCamera }) {
  return <div className="item-SubCameraCallVideo">{subCamera}</div>
}

PopUpCallVideo.propTypes = {
  listJoiner: PropTypes.object,
  avatarCallVideo: PropTypes.string.isRequired,
  nameCallVideo: PropTypes.string.isRequired,
  isResponse: PropTypes.bool,
  peer: PropTypes.object,
  account_caller: PropTypes.object,
  membersChat: PropTypes.object,
  idChat: PropTypes.string,
}

ButtonTurnOffCallVideo.propTypes = {
  stream: PropTypes.object,
  idChat: PropTypes.string.isRequired,
}

VideoCamera.propTypes = {
  stream: PropTypes.object,
}

MainCameraCallVideo.propTypes = {
  stream: PropTypes.object,
  data: PropTypes.shape({
    nameJoiner: PropTypes.string.isRequired,
  }).isRequired,
}

SubCameraCallVideo.propTypes = {
  subCamera: PropTypes.node.isRequired,
}
export default PopUpCallVideo
/* eslint-disable no-unused-vars */
