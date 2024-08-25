import React, { useEffect, useState } from 'react'
import './PagePersonalHeaderSetting.css'
import AccountAPI from '@api/AccountAPI'
import { storage } from '@config/firebase'
import { Link } from 'react-router-dom'

import {
  Modal,
  IconButton,
  Avatar,
  Button,
  TextField,
  Typography,
  Box,
} from '@mui/material'
import { useStore } from '@store'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import 'flatpickr/dist/themes/dark.css'
import Flatpickr from 'react-flatpickr'
import { set_data_account, set_url } from '@store/actions'
function SettingUser() {
  const [state, dispatch] = useStore()

  const [open, setOpen] = useState(false)

  const [reload, set_reload] = useState(true)

  const handler_Upload_Image = (e) => {
    const uploadTask = storage
      .ref(`social/${e.target.files[0].name}`)
      .put(e.target.files[0])
    uploadTask.on(
      'state_changed',
      () => {},
      (error) => {
        console.log(error)
      },
      async () => {
        await storage
          .ref('social')
          .child(e.target.files[0].name)
          .getDownloadURL()
          .then((url) => {
            const post_status_data = async () => {
              const query = {
                id_user: state.account._id,
                avatar_account: url,
              }

              await AccountAPI.changeAvatar(query)
              console.log(query)
            }

            post_status_data()
          })
      },
    )

    alert('Image Change Success!')

    set_reload(true)

    //document.getElementById('card_delete_post', style="display")
    document
      .getElementById('card_delete_post')
      .setAttribute('style', 'display: none')
  }

  const show_upload = () => {
    document.getElementById('file_upload_user').click()
  }
  /* eslint-disable no-unused-vars */
  const [user, set_user] = useState({})
  /* eslint-disable no-unused-vars */
  useEffect(() => {
    if (reload) {
      const fetchData = async () => {
        const response = await AccountAPI.getId(state.account._id)

        set_user(response)
        set_username(response.fname + ' ' + response.lname)
        set_password(response.password)
        set_fname(response.fname)
        set_lname(response.lname)
        set_birthday(response.birthday)
        set_email(response.email)
      }

      fetchData()

      set_reload(false)
    }
  }, [reload])

  const [username, set_username] = useState('')
  const [password, set_password] = useState('')
  const [fname, set_fname] = useState('')
  const [lname, set_lname] = useState('')
  const [birthday, set_birthday] = useState('')
  const [email, set_email] = useState('')

  const handler_Update = () => {
    const fetchData = async () => {
      const query = {
        id_user: state.account._id,
        fname: fname,
        lname: lname,
        birthday: birthday,
        email: email,
      }

      await AccountAPI.updateInfo(query)
      state.account.fname = fname
      state.account.lname = lname
      set_username(`${fname} ${lname}`)
      dispatch(set_data_account(state.account))
    }

    fetchData()
  }

  return (
    <div className="container_edit_info_user">
      <Box
        width={600}
        color={'text.primary'}
        borderRadius={9}
        flex={4}
        p={{ xs: 5, md: 5 }}
        bgcolor={'background.primary'}
        border={'1px solid black'}
      >
        <div className="form_edit_info">
          <Box sx={{ paddingLeft: '20px' }}>
            <div className="card_form_edit_info">
              <div className="header_form_edit_info_user">
                <Link
                  onClick={(e) => {
                    e.preventDefault()
                    sessionStorage.setItem('noReload', 1)
                    window.location.href = `/account/personal/${state.account.slug_personal}`
                    // <Navigate to={`/account/personal/${state.account.slug_personal}`} />
                    // navigate(`/account/personal/${state.account.slug_personal}`);

                    dispatch(set_url(new Date().toLocaleString()))
                  }}
                  to={`/account/personal/${state.account.slug_personal}`}
                >
                  <IconButton sx={{ position: 'relative', float: 'right' }}>
                    <ArrowBackIcon />
                  </IconButton>
                </Link>
                <div className="detail_info_user">
                  <Avatar
                    sx={{ border: '2px solid #4de739' }}
                    src={state.account.avatar_account}
                  />
                  <span
                    className=""
                    style={{ fontWeight: '600', paddingLeft: '10px' }}
                  >
                    {state.account.fname + ' ' + state.account.lname}
                  </span>
                </div>
              </div>
              <div className="btn_form_edit_info_user">
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpen(true)
                  }}
                >
                  Change profile photo
                </Button>
              </div>
              <Modal
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                id="card_delete_post"
                open={open}
                onClose={() => setOpen(false)}
              >
                <Box
                  width={500}
                  bgcolor={'background.default'}
                  color={'text.primary'}
                  p={6}
                  borderRadius={9}
                >
                  <span
                    onClick={() => {
                      setOpen(false)
                    }}
                  >
                    <IconButton sx={{ position: 'relative', float: 'right' }}>
                      <CloseIcon />
                    </IconButton>
                  </span>
                  <Typography
                    sx={{
                      borderBottom: '1px solid green',
                      paddingBottom: '20px',
                      color: 'green',
                    }}
                    variant="h6"
                    textAlign={'center'}
                  >
                    Change profile photo
                  </Typography>
                  <div className="btn_upload_avatar_user">
                    <TextField
                      type="file"
                      onChange={handler_Upload_Image}
                      id="file_upload_user"
                      style={{ display: 'none' }}
                    />
                    <Button
                      sx={{ width: '100%', padding: '20px' }}
                      onClick={show_upload}
                    >
                      Upload Photo
                    </Button>
                  </div>
                  <div className="btn_handle_delete_form">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        setOpen(false)
                      }}
                    >
                      No
                    </Button>
                  </div>
                </Box>
              </Modal>

              <div className="body_form_edit_info_user">
                <div className="txt_edit_setting_form">
                  <div className="title_setting_form">
                    <span style={{ fontWeight: '600' }}>Username</span>
                  </div>
                  <div className="txt_input_edit">
                    <TextField
                      id="standard-basic"
                      disabled
                      variant="standard"
                      color="success"
                      value={username}
                      onChange={(e) => set_username(e.target.value)}
                    />
                  </div>
                </div>
                <div className="txt_edit_setting_form">
                  <div className="title_setting_form">
                    <span style={{ fontWeight: '600' }}>Password</span>
                  </div>
                  <div className="txt_input_edit">
                    <TextField
                      id="standard-basic"
                      disabled
                      type={'password'}
                      variant="standard"
                      color="success"
                      value={password}
                      onChange={(e) => set_password(e.target.value)}
                    />
                  </div>
                </div>
                <div className="txt_edit_setting_form">
                  <div className="title_setting_form">
                    <span style={{ fontWeight: '600' }}>First name</span>
                  </div>
                  <div className="txt_input_edit">
                    <TextField
                      id="standard-basic"
                      variant="outlined"
                      color="success"
                      value={fname}
                      onChange={(e) => set_fname(e.target.value)}
                    />
                  </div>
                </div>
                <div className="txt_edit_setting_form">
                  <div className="title_setting_form">
                    <span style={{ fontWeight: '600' }}>Last name</span>
                  </div>
                  <div className="txt_input_edit">
                    <TextField
                      id="standard-basic"
                      variant="outlined"
                      color="success"
                      value={lname}
                      onChange={(e) => set_lname(e.target.value)}
                    />
                  </div>
                </div>
                <div className="txt_edit_setting_form">
                  <div className="title_setting_form">
                    <span style={{ fontWeight: '600' }}>Birthday</span>
                  </div>
                  <div className="txt_input_edit">
                    {/* <TextField id="standard-basic"  variant="standard" color='success'
                                    value={birthday}
                                    onChange={(e) => set_birthday(e.target.value)}/> */}
                    <Flatpickr
                      id="standard-basic"
                      sx={{ innerHeight: '50px' }}
                      value={birthday}
                      options={{
                        dateFormat: 'd/m/Y', // format ngày giờ
                      }}
                      onChange={(e) => {
                        var date = new Date(e[0])
                        date.setDate(date.getDate() + 1)

                        console.log(date.toISOString())
                        console.log(birthday)
                        set_birthday(date.toISOString())
                      }}
                    />
                  </div>
                </div>
                <div className="txt_edit_setting_form">
                  <div className="title_setting_form">
                    <span style={{ fontWeight: '600' }}>email</span>
                  </div>
                  <div className="txt_input_edit">
                    <TextField
                      id="standard-basic"
                      variant="outlined"
                      color="success"
                      value={email}
                      onChange={(e) => set_email(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="footer_form_edit_info_user">
                <Button
                  variant="contained"
                  color="success"
                  onClick={handler_Update}
                >
                  Update
                </Button>
              </div>
            </div>
          </Box>
        </div>
      </Box>
    </div>
  )
}

export default SettingUser
