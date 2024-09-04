import '../formMessenger/FormMessenger.css'
import * as IconFontAwesome from '@components/parts/icons/fontAwesome/FontAwesome'
import { StrictMode, useContext, useEffect, useRef, useState } from 'react'
import {
  beTyping_chat,
  Context_Message,
  noTyping_chat,
} from '@components/layouts/popups/popupMessenger/PopUpMessenger'
import { contentPopUpMessenger } from '@components/layouts/popups/popupMessenger/PopUpMessenger'
import { content_sessionMessage } from '@components/layouts/popups/popupMessenger/PopUpMessenger'
import * as IconMUI from '@components/parts/icons/iconMUI/IconMUI'
import { Icon_Image } from '@components/parts/icons/fontAwesome/FontAwesome'
import LabelSquare from '@components/parts/labels/labelSquare/LabelSquare'
import LabelCircle from '@components/parts/labels/labelCircle/LabelCircle'
import {
  FILE_AUDIO,
  FILE_DOCUMENT,
  FILE_IMAGE,
  FILE_VIDEO,
} from '@store/constants'
import { useStore } from '@store'
import PopUp_ from '@components/layouts/popups/popup'
import { Grid } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'
import PickerEmoji from '@components/parts/pickers/pickerEmoji/PickerEmoji'
import PropTypes from 'prop-types'
import { createRequest } from '@utils/requests'

/* eslint-disable no-unused-vars */
function FormMessenger({ idChat }) {
  var refIptFile = useRef(null)
  var refIpt_text = useRef(null)
  var refIptPicker_GIF = useRef(window)

  var value_Context_Message = useContext(Context_Message)
  const giphyFetch = new GiphyFetch('sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh')
  const fetchGifs = (offset) => giphyFetch.trending({ offset, limit: 10 })
  var [state, dispatch] = useStore()
  var [listFile, set_listFile] = useState([])
  const [stateTextMess, set_stateTextMess] = useState('')
  const [state_IptPicker_GIF, set_state_IptPicker_GIF] = useState('')
  const [stateShowPickerEmoji, set_stateShowPickerEmoji] = useState(false)
  const [stateShowPickerGIF, set_stateShowPickerGIF] = useState(false)
  const [stateSending, set_stateSending] = useState(false)
  const [stateShowMicRecorder, set_stateShowMicRecorder] = useState(false)
  const [stateAccountTyping, set_stateAccountTyping] = useState(null)

  const fetchGifs_search = (offset) => {
    // console.log("here");
    return giphyFetch.search(state_IptPicker_GIF, { offset, limit: 10 })
  }

  useEffect(() => {
    state.socketChat.on(`PEOPLE_${idChat}_TYPING`, (account) => {
      if (account.slug_personal != state.account.slug_personal) {
        if (
          !value_Context_Message.state_typingsPopUpMessenger.some(
            (el) => el.props['data-slug-typing'] === account.slug_personal,
          )
        )
          value_Context_Message.setState_typingsPopUpMessenger([
            ...value_Context_Message.state_typingsPopUpMessenger,
            account && (
              <div
                className="mess_be_typing"
                data-slug-typing={account.slug_personal}
              >
                <LabelCircle urlImg={account.avatar_account} />
                <img
                  className="gif-typing"
                  src="https://i.pinimg.com/originals/19/cc/77/19cc777afcca19dda6f4a13ea889d6b6.gif"
                  alt=""
                />
              </div>
            ),
          ])

        // console.log(state.account);
        set_stateAccountTyping(account)
      }
    })
    state.socketChat.on(`IN_${idChat}_NO_TYPING`, (accountTyping) => {
      value_Context_Message.state_typingsPopUpMessenger.forEach(
        (element, idx) => {
          if (
            element.props.props['data-slug-typing'] ===
            accountTyping.slug_personal
          ) {
            value_Context_Message.state_typingsPopUpMessenger.splice(idx, 1)
          }
        },
      )
      value_Context_Message.setState_typingsPopUpMessenger(
        value_Context_Message.state_typingsPopUpMessenger.concat([]),
      )
      set_stateAccountTyping(null)
    })
  }, [stateAccountTyping, value_Context_Message.state_typingsPopUpMessenger])
  const handleSearchGIF = (event) => {
    // console.log(state_IptPicker_GIF);
    set_state_IptPicker_GIF(event.currentTarget.value)
  }

  const handleSubmitMess = (event, isClick) => {
    console.log(isClick)

    if (event.key === 'Enter' || isClick) {
      console.log(stateTextMess)
      const value_content_sessionMessage = cast_inputs_to_valueContentMessNew({
        listFile: listFile,
        stateTextMess: stateTextMess,
        reply: value_Context_Message.stateReplyMess,
      })
      if (value_content_sessionMessage.length > 0) {
        submitSaveMessage({
          state: state,
          value_content_sessionMessage: value_content_sessionMessage,
          listFile: listFile,
          idChat: idChat,
        })

        renderMyScreen({
          state: state,
          value_content_sessionMessage: value_content_sessionMessage,
          value_Context_Message: value_Context_Message,
          set_listFile,
          set_stateTextMess,
        })

        noTyping_chat({
          idChat: idChat,
          socket: state.socketChat,
          accountTyping: state.account,
        })
        // state.socketChat.emit(`IN_${idChat}_PEOPLE_SENDING`, {
        //   account: state.account,
        //   value_content_sessionMessage: value_content_sessionMessage,
        // });
      }
    } else {
      if (listFile.length > 0 || stateTextMess.length > 0) {
        beTyping_chat({
          idChat,
          socket: state.socketChat,
          accountTyping: state.account,
        })
      } else {
        noTyping_chat({
          idChat,
          socket: state.socketChat,
          accountTyping: state.account,
        })
      }
    }
  }
  useEffect(() => {
    if (stateShowPickerGIF) {
      // set_stateWithPickGIF(refIptPicker_GIF.current.innerWidth)
    }
  }, [stateShowPickerGIF])
  useEffect(() => {
    if (stateSending) {
      if (stateTextMess.length > 0 || listFile.length > 0)
        beTyping_chat({
          idChat,
          socket: state.socketChat,
          accountTyping: state.account,
        })
    } else
      noTyping_chat({
        idChat,
        socket: state.socketChat,
        accountTyping: state.account,
      })
  }, [stateSending])
  useEffect(() => {
    console.log('stateTextMess changed:', stateTextMess)
    if (stateTextMess.length !== 0) {
      set_stateSending(true)
    } else if (stateTextMess.length === 0) {
      set_stateSending(false)
    }
  }, [stateTextMess])
  useEffect(() => {
    console.log('listFile changed:', listFile)
    if (listFile.length !== 0) {
      set_stateSending(true)
    } else if (listFile.length === 0) {
      set_stateSending(false)
    }
    refIpt_text.current.focus()
  }, [listFile])
  console.log('FormMessenger RENDER')

  return !stateShowMicRecorder ? (
    <div className="container-formMessenger">
      <div className="main-formMessenger">
        <StrictMode>
          {stateShowPickerGIF ? (
            <PopUp_
              work_case_unmount={() => {
                set_stateShowPickerGIF(false)
              }}
            >
              <div
                className="container-pickerGif"
                style={{
                  position: 'absolute',
                  top: '-305px',
                  width: '100%',
                  height: '300px',
                  left: '-50px',
                  boxShadow: '1px 1px 25px 2px var(--greenColorHot)',
                }}
              >
                <div
                  className="main-pickerGif"
                  style={{
                    height: '100%',
                  }}
                >
                  <div
                    className="body-pickerGif"
                    style={{
                      width: '100%',
                      height: '100%',
                      background: 'var(--greenColorEnd_Background)',
                      padding: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <input
                      type={'text'}
                      className={'ipt-searchGIF'}
                      onChange={(event) => {
                        set_state_IptPicker_GIF(event.currentTarget.value)
                        handleSearchGIF(event)
                      }}
                      ref={refIptPicker_GIF}
                      placeholder={'Search GIFs'}
                      style={{
                        width: '100%',
                        height: '40px',
                        borderRadius: '10px',
                        outline: 'none',
                        border: '1px solid var(--greenColorHot)',
                        padding: '5px 20px',
                        color: 'black',
                        fontSize: '18px',
                      }}
                    />
                    <Grid
                      onGifClick={(gif, event) => {
                        event.preventDefault()
                        const value_content_sessionMessage =
                          cast_inputs_to_valueContentMessNew({
                            stateTextMess: stateTextMess,
                            gif: gif.id,
                            listFile: listFile,
                          })
                        submitSaveMessage({
                          idChat: idChat,
                          listFile: listFile,
                          state: state,
                          value_content_sessionMessage:
                            value_content_sessionMessage,
                        })
                        renderMyScreen({
                          state: state,
                          value_Context_Message: value_Context_Message,
                          value_content_sessionMessage:
                            value_content_sessionMessage,
                          set_listFile,
                          set_stateTextMess,
                        })
                      }}
                      key={state_IptPicker_GIF}
                      fetchGifs={
                        state_IptPicker_GIF.length > 0
                          ? fetchGifs_search
                          : fetchGifs
                      }
                      noResultsMessage={
                        <b>{`NO RESULT FOR ${state_IptPicker_GIF}`}</b>
                      }
                      columns={3}
                      width={370}
                    />
                  </div>
                </div>
              </div>
            </PopUp_>
          ) : (
            ''
          )}
        </StrictMode>
        {stateShowPickerEmoji ? (
          <PopUp_
            work_case_unmount={() => {
              set_stateShowPickerEmoji(false)
            }}
          >
            <div>
              <PickerEmoji
                styles={{
                  top: '-305px',
                  width: '100%',
                  height: '300px',
                  left: '-50px',
                }}
                handleClickPicker={(event, emojiData) => {
                  set_stateTextMess((pre_stateTextMess) => {
                    return `${stateTextMess}${emojiData.emoji}`
                  })
                }}
              />
            </div>
          </PopUp_>
        ) : (
          ''
        )}

        <div className="body-formMessenger">
          <div className="header-formMessenger">
            <div className="section-iptFile_formMessenger">
              {listFile.length > 0 && (
                <div className="iptFile-formMessenger">
                  {
                    <span
                      onClick={() => {
                        console.log('CLICK')
                        refIptFile.current.click()
                      }}
                    >
                      <LabelSquare
                        sizeLabel="SMALL"
                        el_Icon={
                          <span
                          // onClick={() => {
                          //   console.log('CLICK');
                          //   refIptFile.current.click();
                          // }}
                          >
                            <IconMUI.Icon_AddPhoto />
                          </span>
                        }
                      />
                    </span>
                  }
                  {listFile.map((el, idx) => {
                    return (
                      <LabelSquare
                        tooltip={el.name}
                        elOverlay={
                          el.type
                            .split('/')[0]
                            .trim()
                            .toUpperCase()
                            .indexOf(FILE_VIDEO) >= 0 ? (
                            <IconFontAwesome.Icon_Video />
                          ) : null
                        }
                        key={idx}
                        sizeLabel="SMALL"
                        elSub={
                          <span
                            onClick={() => {
                              set_listFile(() => {
                                return listFile.filter((elm) => elm != el)
                              })
                            }}
                          >
                            <LabelCircle
                              styles={{
                                background: 'var(--greenColorEnd_Background)',
                              }}
                              sizeLabel="TINY"
                              el_Icon={<IconFontAwesome.Icon_Close />}
                            />
                          </span>
                        }
                        urlImg={
                          el.type
                            .split('/')[0]
                            .trim()
                            .toUpperCase()
                            .indexOf(FILE_IMAGE) >= 0
                            ? URL.createObjectURL(el)
                            : null
                        }
                        urlVideo={
                          el.type
                            .split('/')[0]
                            .trim()
                            .toUpperCase()
                            .indexOf(FILE_VIDEO) >= 0
                            ? URL.createObjectURL(el)
                            : null
                        }
                        el_Icon={
                          el.type
                            .split('/')[0]
                            .trim()
                            .toUpperCase()
                            .indexOf(FILE_AUDIO) >= 0 ? (
                            <IconFontAwesome.Icon_Audio />
                          ) : FILE_DOCUMENT.indexOf(
                              el.type.split('/')[0].trim().toUpperCase(),
                            ) >= 0 ? (
                            <IconFontAwesome.Icon_Document />
                          ) : null
                        }
                      />
                    )
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="content-formMessenger">
            <div className="contentLeft-formMessenger">
              <span
                onClick={(event) => {
                  set_stateShowMicRecorder(true)
                }}
              >
                <IconFontAwesome.Icon_MIC />
              </span>
              <input
                type={'file'}
                multiple
                style={{ display: 'none' }}
                ref={refIptFile}
                onChange={(event) => {
                  var files = event.currentTarget.files
                  console.log(files)
                  if (files.length > 0) {
                    if (listFile.length > 0) {
                      set_listFile(() => {
                        var tmp_listFile = Object.entries(files).map((el) => {
                          // [[key][value]]
                          return el[1]
                        })
                        return listFile.concat(tmp_listFile)
                      })
                    } else {
                      set_listFile(
                        Object.entries(files).map((el) => {
                          return el[1]
                        }),
                      )
                    }
                  }
                }}
              />
              <span
                onClick={() => {
                  refIptFile.current.click()
                }}
              >
                <Icon_Image />
              </span>
              <span
                onClick={() => {
                  set_stateShowPickerGIF(!stateShowPickerGIF)
                }}
              >
                <IconMUI.Icon_Gif />
              </span>
            </div>
            <div className="contentCenter-formMessenger">
              <div className="section-iptText_formMessenger">
                <textarea
                  ref={refIpt_text}
                  className="iptText-formMessenger"
                  value={stateTextMess}
                  onFocus={(event) => {
                    set_stateSending(true)
                  }}
                  onBlur={(event) => {
                    set_stateSending(false)
                  }}
                  onChange={(event) => {
                    set_stateTextMess(event.currentTarget.value)
                  }}
                  type={'text'}
                  placeholder="Aa"
                  onKeyUp={(event) => {
                    handleSubmitMess(event)
                  }}
                />
                <span
                  onClick={(event) => {
                    set_stateShowPickerEmoji(!stateShowPickerEmoji)
                  }}
                >
                  <IconFontAwesome.Icon_Smile />
                </span>
              </div>
            </div>
            <div className="contentRight-formMessenger">
              {!stateSending && <IconFontAwesome.Icon_Like />}
              {stateSending && (
                <span
                  onClick={(event) => {
                    handleSubmitMess(event, true)
                  }}
                >
                  <IconFontAwesome.Icon_Send_Mess />
                </span>
              )}
            </div>
          </div>
          <div className="footer-formMessenger"></div>
        </div>
      </div>
    </div>
  ) : (
    <MicRecorderMess
      idChat={idChat}
      state={state}
      handleClose={() => {
        set_stateShowMicRecorder(false)
      }}
    />
  )
}
function cast_inputs_to_valueContentMessNew({
  listFile,
  stateTextMess,
  gif,
  reply,
}) {
  var value_content_sessionMessage = []
  if (listFile.length > 0) {
    value_content_sessionMessage = listFile.map((file) => {
      var tmp_mess = new content_sessionMessage()
      tmp_mess[file.type.split('/')[0]] = URL.createObjectURL(file)
      return tmp_mess
    })
  }
  if (gif) {
    value_content_sessionMessage.push(new content_sessionMessage({ gif: gif }))
  }
  if (stateTextMess.trim().length > 0) {
    value_content_sessionMessage.push(
      new content_sessionMessage({
        text: stateTextMess.substring(0, stateTextMess.length - 1),
      }),
    )
  }
  if (reply) {
    value_content_sessionMessage[
      value_content_sessionMessage.length - 1
    ].reply = reply
  }
  console.log(value_content_sessionMessage)
  return value_content_sessionMessage
}
function submitSaveMessage({
  state,
  value_content_sessionMessage,
  listFile,
  idChat,
}) {
  const form = new FormData()
  for (let i = 0; i < listFile.length; i++) {
    form.append('listFile', listFile[i])
  }

  createRequest('POST', '/chat/:box-chat-id/upload-media-message', {
    query: { 'box-chat-id': idChat },
    body: form,
  })

  createRequest('POST', '/chat/:box-chat-id/send-message', {
    query: { 'box-chat-id': idChat },
    body: {
      message: new contentPopUpMessenger({
        slug_sender: state.account.slug_personal,
        session_messages: value_content_sessionMessage,
      }),
    },
  })
}
function renderMyScreen({
  value_Context_Message,
  state,
  value_content_sessionMessage,
  set_listFile,
  set_stateTextMess,
}) {
  var state_tmp = value_Context_Message.state_contentsPopUpMessenger
  // value_Context_Message.setState_contentsPopUpMessenger(() => [
  //   ...state_tmp,
  //   new contentPopUpMessenger({
  //     isMe: true,
  //     name_sender:
  //     state.account.fname + " " + state.account.lname,
  //     avatar_sender: state.account.avatar_account,
  //     session_messages: value_content_sessionMessage,
  //     slug_sender: state.account.slug_personal,
  //   }),
  // ]);

  value_Context_Message.set_stateReplyMess(null)

  set_stateTextMess('')
  set_listFile([])

  value_Context_Message.refContentPopUp.current.scrollTo(
    0,
    value_Context_Message.refContentPopUp.current.scrollHeight,
  )
}
function MicRecorderMess({
  idChat,
  state,
  handleClose = () => {},
  handlePause = () => {},
  handleSubmit = () => {},
} = {}) {
  const [state_countTime, set_state_countTime] = useState(0)
  const ref_mediaAudio = useRef(null)
  const ref_chunks = useRef([])
  const [state_blob, set_state_blob] = useState(null)

  const isMicUser =
    navigator.mediaDevices && navigator.mediaDevices.getUserMedia
  var ref_idTimeOut = useRef(null)

  var saveRecorder = useRef(null)
  useEffect(() => {
    saveRecorder.current = (callback) => {
      if (!state_blob) {
        var tmp_blob

        ref_mediaAudio.current.onstop = (event) => {
          var dateCode = new Date()
            .toJSON()
            .replaceAll(' ', '')
            .replaceAll(':', '')
            .replaceAll('-', '')
            .replaceAll('.', '')
            .toLowerCase()
          set_state_blob(() => {
            var blob = new Blob(ref_chunks.current, { type: 'audio/mp3' })
            blob.name = `${state.account.slug_personal}${dateCode}.mp3`
            blob.lastModified = new Date()
            tmp_blob = blob
            if (callback) callback(blob)
            return blob
          })
        }
        ref_mediaAudio.current.stop()
        clearInterval(ref_idTimeOut.current)
        return tmp_blob
      } else {
        callback(state_blob)
        return state_blob
      }
    }
  }, [state_blob])
  useEffect(() => {
    if (state_countTime == 0) {
      ref_idTimeOut.current = setInterval(() => {
        set_state_countTime((preState) => {
          return preState + 1
        })
      }, 1000)
    } else if (state_countTime > 60) {
      saveRecorder.current()
    }
  }, [state_countTime])
  useEffect(() => {
    if (isMicUser) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        ref_mediaAudio.current = new MediaRecorder(stream)
        ref_mediaAudio.current.start()

        ref_mediaAudio.current.ondataavailable = (e) => {
          ref_chunks.current.push(e.data)
        }
      })
    }
  }, [])
  return (
    <div className="body-micRecorderMess">
      <div className="contentLeft-micRecorderMess">
        <div
          className="btnClose-micRecorderMess"
          onClick={(event) => {
            clearInterval(ref_idTimeOut.current)
            handleClose()
          }}
        >
          <IconFontAwesome.Icon_Close />
        </div>
        {isMicUser && !state_blob && (
          <div className="timeline-micRecorderMess">
            <div
              className="lineStatus-micRecorderMess"
              style={{
                width: `${(state_countTime * 100) / 60}%`,
              }}
            ></div>
            <div
              className="btnStop-micRecorderMess"
              onClick={(event) => {
                saveRecorder.current()
              }}
            >
              <IconFontAwesome.Icon_Stop />
            </div>
            <div className="numberTime-micRecorderMess">
              {`${parseInt(state_countTime / 60)}:${parseInt(
                state_countTime / 10,
              )}${state_countTime % 10}`}
            </div>
          </div>
        )}
        {state_blob && (
          <audio src={URL.createObjectURL(state_blob)} controls></audio>
        )}
      </div>
      <div className="contentCenter-micRecorderMess"></div>
      <div className="contentRight-micRecorderMess">
        {isMicUser && (
          <div
            className="btnSubmit-micRecorderMess"
            onClick={(event) => {
              saveRecorder.current((blob) => {
                const valueContentMessNew = cast_inputs_to_valueContentMessNew({
                  gif: null,
                  listFile: [new File([blob], blob.name, { type: blob.type })],
                  reply: null,
                  stateTextMess: '',
                })
                submitSaveMessage({
                  idChat,
                  state,
                  listFile: [new File([blob], blob.name, { type: blob.type })],
                  value_content_sessionMessage: valueContentMessNew,
                })
              })
              handleClose()
            }}
          >
            <IconFontAwesome.Icon_Send_Mess />
          </div>
        )}
      </div>
    </div>
  )
}
function AudioMess({ srcAudio }) {
  const [state_countTime, set_state_countTime] = useState(0)
  const [state_playAudio, set_state_playAudio] = useState(false)
  const ref_audio = useRef(null)
  useEffect(() => {
    if (ref_audio) {
      ref_audio.current.addEventListener('ended', (event) => {
        set_state_playAudio(false)
      })
      ref_audio.current.addEventListener('play', (event) => {
        set_state_playAudio(true)
      })
    }
  }, [ref_audio])
  return (
    <div className="timeline-micRecorderMess">
      <audio style={{ display: 'none' }} ref={ref_audio} src="srcAudio"></audio>
      <div
        className="lineStatus-micRecorderMess"
        style={{
          width: `${(state_countTime * 100) / 60}%`,
        }}
      ></div>
      {!state_playAudio ? (
        <div
          className="btnPlay-micRecorderMess"
          onClick={(event) => {
            ref_audio.current.play()
          }}
        >
          <IconFontAwesome.Icon_Video />
        </div>
      ) : (
        <div
          className="btnPause-micRecorderMess"
          onClick={(event) => {
            ref_audio.current.pause()
            set_state_playAudio(false)
          }}
        >
          <IconFontAwesome.Icon_Pause />
        </div>
      )}
      <div className="numberTime-micRecorderMess">
        {`${parseInt(state_countTime / 60)}:${parseInt(state_countTime / 10)}${
          state_countTime % 10
        }`}
      </div>
    </div>
  )
}

FormMessenger.propTypes = {
  idChat: PropTypes.string.isRequired,
}

AudioMess.propTypes = {
  srcAudio: PropTypes.object.isRequired,
}

MicRecorderMess.propTypes = {
  idChat: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  handleClose: PropTypes.func,
  handlePause: PropTypes.func,
  handleSubmit: PropTypes.func,
}

export default FormMessenger
/* eslint-disable no-unused-vars */
