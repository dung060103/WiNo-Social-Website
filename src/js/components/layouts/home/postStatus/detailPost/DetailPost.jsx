import React, { useEffect, useState } from 'react'
import './DetailPost.css'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Users_Activity from '@api/UsersActivity'
import Like from '@api/Like'
import Comment from '@api/Comment'
import {
  ButtonGroup,
  Modal,
  IconButton,
  Avatar,
  Button,
  Typography,
  Input,
  Box,
} from '@mui/material'
import { Navigate } from 'react-router-dom'
import { useStore } from '@store'
import { Card, CardHeader, CardMedia } from '@mui/material'
import { EmojiEmotions, Favorite, FavoriteBorder } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SendIcon from '@mui/icons-material/Send'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Picker from 'emoji-picker-react'
// import io from "socket.io-client";
// const socket = io("http://localhost:5001");

/* eslint-disable no-unused-vars */
function DetailPost() {
  const [open, setOpen] = useState(false)
  const [openLiker, setOpenLiker] = useState(false)
  const { id } = useParams()

  const id_slit = id.split('_')

  const [id_image_post, set_id_image_post] = useState(id_slit[0])

  const [id_user_post, set_id_user_post] = useState(id_slit[1])

  const [post, set_post] = useState({})

  const [reload_post, set_reload_post] = useState(true)

  const [showPickerComment, setShowPickerComment] = useState(false)
  // State send cua input
  const [send, set_send] = useState('')
  const onEmojiClick = (event, emojiObject) => {
    set_send((prevInput) => {
      console.log(emojiObject)

      return prevInput + emojiObject.emoji
    })
    // setShowPicker(false);
  }
  // Hàm này dùng để load ra bài viết
  useEffect(() => {
    if (reload_post) {
      const query = {
        // id_user_post: id_user_post,
        id_image_post: id_image_post,
      }

      const fetchData = async () => {
        const response = await Users_Activity.detailPost(query)
        // console.log(response)
        set_post(response)
        set_user(response)
      }

      fetchData()

      set_reload_post(false)
    }
  }, [reload_post])

  // Hàm này dùng để kiểm tra user đã từng like bài viết này hay chưa
  const [status_like, set_status_like] = useState(null)
  const [state, dispatch] = useStore()
  const [load_status_like, set_load_status_like] = useState(true)

  useEffect(() => {
    if (load_status_like) {
      const fetchData = async () => {
        const query = {
          // id_user: id_user_post,
          id_image_post: id_image_post,
        }

        const response = await Like.checkingLike(query)

        if (response.mess !== 'That Bai') {
          set_status_like(true)
        } else {
          set_status_like(false)
        }
      }

      fetchData()

      // set_load_status_like(true)
    }
  }, [load_status_like])

  const [user, set_user] = useState({})

  // Hàm này dùng để load ra thông tin user đã đăng bài đó
  useEffect(() => {
    const fetchData = async () => {
      // const params = {
      //     id_user: state.account._id,
      // }
      // const query = '?' + queryString.stringify(params)
      // const response = await AccountAPI.getId(id_user_post);
      // set_user(response);
    }

    fetchData()
  }, [])

  // Hàm này dùng để tym
  const handler_Tym = () => {
    const fetchData = async () => {
      const query = {
        // id_user: state.account._id,
        id_image_post: id_image_post,
      }

      const response = await Like.postLike(query)

      // // Xử lý thêm dữ liệu vào Database Favorite
      // const query_far = {
      //     id_user: state.account._id,
      //     id_user_another: id_user_post,
      //     id_image_post: id_image_post,
      //     category: false
      // }

      // const response_far = await Favorites.postFavorite(query_far)
      // console.log(response_far)
    }
    set_status_like(true)
    fetchData()

    // Bắt đầu gửi socket
    // const data = {
    //     id_user: state.account._id,
    //     id_user_another: id_user_post
    // }

    //socket.emit('like', data)

    set_reload_post(true)

    set_load_status_like(true)
  }

  // Hàm này dùng để hủy tym
  const handler_UnTym = () => {
    const fetchData = async () => {
      const query = {
        // id_user: id_user_post,
        id_image_post: id_image_post,
      }

      const response = await Like.putUnlike(query)
    }
    set_status_like(false)
    fetchData()

    // const deleteData = async () => {

    //     // Xử lý delete dữ liệu Database Favorite
    //     const query = {
    //         id_user: id_user_post,
    //         id_user_another: state.account._id,
    //     }

    //     const response = await Favorites.deleteFavorite(query)
    //     console.log(response)

    // }

    // deleteData()

    set_reload_post(true)

    set_load_status_like(true)
  }

  // State data của comment
  const [comments, set_comments] = useState([])

  // State dùng để load lại hàm useEffect
  const [load_comment, set_load_comment] = useState(true)

  // Hàm này dùng để gọi API load dữ liệu trong database comment ra
  useEffect(() => {
    if (load_comment) {
      const fetchData = async () => {
        const response = await Comment.getAllComment(id_image_post)

        set_comments(response)
      }

      fetchData()

      set_load_comment(false)
    }
  }, [load_comment])

  // Hàm này dùng để xử lý khi user muốn comment bài viết
  const handler_Comment = () => {
    const fetchData = async () => {
      const query = {
        id_user: state.account._id,
        id_image_post: id_image_post,
        send: send,
      }

      await Comment.postComment(query)

      // // Xử lý thêm dữ liệu vào Database Favorite
      // const query_far = {
      //     id_user: state.account._id,
      //     id_user_another: id_user_post,
      //     id_image_post: id_image_post,
      //     category: true
      // }

      // const response_far = await Favorites.postFavorite(query_far)
      // console.log(response_far)
    }

    fetchData()

    // // Bắt đầu gửi socket
    // const data = {
    //     id_user: state.account._id,
    //     id_user_another: id_user_post
    // }

    // //socket.emit('like', data)

    set_load_comment(true)

    set_send('')
  }

  // State Navigate
  const [navigate, set_navigate] = useState(false)

  const handler_Post_Delete = () => {
    const fetchData = async () => {
      const query = {
        id_user: id_user_post,
        id_image_post: id_image_post,
      }

      await Users_Activity.deletePost(query)
    }

    fetchData()

    set_navigate(true)
  }

  const [users_like, set_users_like] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const query = {
        id_image_post: id_image_post,
      }

      const response = await Like.countLike(query)

      set_users_like(response)
    }

    fetchData()
  }, [])

  return (
    <div className="container_detail_post">
      <Box
        width={1000}
        bgcolor={'gray'}
        color={'text.primary'}
        borderRadius={9}
        flex={4}
        p={{ xs: 5, md: 5 }}
        // bgcolor={"background.default"}
      >
        <div className="group_content_detail_post_left">
          <div className="group_post_left">
            <div className="detail_img_post">
              <CardMedia component="img" image={post.image_body} />
            </div>
            <div className="display_like_post_content">
              <div className="action_post_body">
                <div className="left_action">
                  {status_like ? (
                    <IconButton>
                      {' '}
                      <Favorite
                        onClick={() => {
                          handler_UnTym()
                        }}
                        style={{
                          fontSize: '30px',
                          cursor: 'pointer',
                          color: 'red',
                        }}
                      />
                    </IconButton>
                  ) : (
                    <IconButton>
                      <FavoriteBorder
                        onClick={() => {
                          handler_Tym()
                        }}
                        style={{ fontSize: '30px', cursor: 'pointer' }}
                      />
                    </IconButton>
                  )}
                </div>
              </div>
              <span
                className="count_users_liked"
                style={{ fontWeight: '600', cursor: 'pointer' }}
                // data-toggle="modal"
                // data-target={`#${id_image_post}_like`}
                onClick={(event) => {
                  setOpenLiker(true)
                }}
              >
                {post.like} like
              </span>
              {/* <IconButton aria-label="share" sx={{  }}>
                          <ShareIcon/>
                        </IconButton>  */}
              {/* Đây là phần Modal khi mà user muốn bấm xem có bao nhiêu người like */}
              <div className="modal fade" id={`${id_image_post}_like`}>
                <div className="card_create_post_details">
                  <Modal
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    id="card_delete_post"
                    open={openLiker}
                    onClose={() => setOpenLiker(false)}
                  >
                    <Box
                      width={500}
                      bgcolor={'background.default'}
                      p={3}
                      borderRadius={4}
                      height={400}
                      sx={{ overflow: 'auto' }}
                    >
                      <span
                        onClick={(event) => {
                          setOpenLiker(false)
                        }}
                      >
                        <IconButton
                          sx={{ position: 'relative', float: 'right' }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </span>
                      <Typography
                        sx={{
                          borderBottom: '1px solid green',
                          paddingBottom: '20px',
                          marginBottom: '10px',
                          color: 'green',
                        }}
                        variant="h4"
                        textAlign={'center'}
                      >
                        List Favorit
                      </Typography>
                      <div className="modal-body">
                        {users_like &&
                          users_like.map((value) => (
                            <div className="box_user_fav" key={value._id}>
                              <Avatar
                                sx={{ border: '2px solid #4de739' }}
                                src={value.avatar_account_following_following}
                              />
                              <div className="name_user_fav">
                                <span
                                  style={{
                                    paddingLeft: '10px',
                                    fontWeight: '600',
                                  }}
                                >
                                  {value.username}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </Box>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
          <div className="group_content_detail_post_right">
            <Box sx={{ paddingLeft: '20px' }}>
              <div className="header_detail_post">
                <div className="detail_info_user">
                  <Avatar
                    sx={{ border: '2px solid #4de739' }}
                    src={user.avatar_account_following}
                  />
                  <span
                    className=""
                    style={{ fontWeight: '600', paddingLeft: '10px' }}
                  >
                    {user.username_following}
                  </span>
                </div>
                {id_user_post === state.account._id && (
                  // <i className="fa fa-close"
                  //     data-toggle="modal"
                  //     data-target={`#${id_image_post}`}
                  //     style={{ fontSize: '25px' }}></i>

                  <span>
                    <IconButton
                      sx={{ position: 'relative', float: 'right' }}
                      onClick={(event) => {
                        setOpen(true)
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </span>
                )}
                <Link to={`/`}>
                  <IconButton sx={{ position: 'relative', float: 'right' }}>
                    <ArrowBackIcon />
                  </IconButton>
                </Link>
                <div className="card_create_post_details">
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
                        onClick={(event) => {
                          setOpen(false)
                        }}
                      >
                        <IconButton
                          sx={{ position: 'relative', float: 'right' }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </span>
                      <Typography
                        sx={{
                          borderBottom: '1px solid green',
                          paddingBottom: '20px',
                          marginBottom: '10px',
                          color: 'green',
                        }}
                        variant="h6"
                        textAlign={'center'}
                      >
                        Do you want to delete post this ?
                      </Typography>
                      <div className="btn_handle_delete_post">
                        <Button
                          variant="contained"
                          color="success"
                          sx={{ marginRight: '30px' }}
                          onClick={handler_Post_Delete}
                        >
                          Yes
                        </Button>
                        {navigate && (
                          <Navigate
                            to={`/account/personal/${state.account.slug_personal}`}
                          />
                        )}
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={(event) => {
                            setOpen(false)
                          }}
                        >
                          No
                        </Button>
                      </div>
                    </Box>
                  </Modal>
                </div>
              </div>

              <div className="body_detail_post">
                {comments &&
                  comments.map((value) => (
                    <div className="Detail_comment" key={value._id}>
                      <Card sx={{ marginTop: '10px' }}>
                        <CardHeader
                          avatar={
                            <Avatar
                              aria-label="recipe"
                              sx={{ border: '2px solid #4de739' }}
                              src={value.image_profile}
                            />
                          }
                          action={
                            <IconButton aria-label="settings">
                              <MoreVertIcon />
                            </IconButton>
                          }
                          title={value.username}
                          subheader={value.cmt_user}
                        />
                      </Card>
                    </div>
                  ))}
              </div>

              <div className="post_footer">
                <Box sx={{ padding: '10px' }}>
                  <ButtonGroup sx={{ width: '100%' }}>
                    <Input
                      sx={{
                        width: '100%',
                        backgroundColor: 'rgb(213, 213, 213)',
                        borderRadius: '50px',
                        paddingLeft: '20px',
                        position: 'relative',
                      }}
                      placeholder="Write comment..."
                      variant="standard"
                      disableUnderline
                      value={send}
                      onChange={(e) => set_send(e.target.value)}
                    />
                    <ButtonGroup>
                      <IconButton aria-label="emoji">
                        <EmojiEmotions
                          color="warning"
                          onClick={() => setShowPickerComment((val) => !val)}
                        />
                      </IconButton>
                      {showPickerComment && (
                        <div className="previewMojiComment">
                          <Picker
                            pickerStyle={{ width: '300px' }}
                            onEmojiClick={onEmojiClick}
                          />
                          <CloseIcon
                            onClick={() => setShowPickerComment(null)}
                          />
                        </div>
                      )}
                      <IconButton>
                        <SendIcon color="success" onClick={handler_Comment} />
                      </IconButton>
                    </ButtonGroup>
                  </ButtonGroup>
                </Box>
              </div>
            </Box>
          </div>
        </div>
      </Box>
    </div>
  )
}

export default DetailPost

/* eslint-disable no-unused-vars */
