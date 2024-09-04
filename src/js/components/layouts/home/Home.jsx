import React, { useState, useEffect } from 'react'
import './Home.css'
import StoryReel from './story/StoryReel'
import {
  EmojiEmotions,
  Image,
  PersonAdd,
  VideoCameraBack,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material'
import {
  ButtonGroup,
  Chip,
  Modal,
  IconButton,
  Stack,
  Avatar,
  Button,
  TextField,
  Typography,
  Input,
  Box,
} from '@mui/material'
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SendIcon from '@mui/icons-material/Send'
import styled from '@emotion/styled'
import Picker from 'emoji-picker-react'
import queryString from 'query-string'
import { Link } from 'react-router-dom'
import { storage } from '@config/firebase'
import { format } from 'timeago.js'
import { useStore } from '@store'
import UsersHome from '@api/UsersHome'
import Like from '@api/Like'
import PropTypes from 'prop-types'
import { createRequest } from '@utils/requests'

/* eslint-disable no-unused-vars */
export default function Home({ avatar_account, full_name, data_account }) {
  const [open, setOpen] = useState(false)
  const UserBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  }))

  const [showPicker, setShowPicker] = useState(false)
  const [send, set_Send] = useState('')
  const onEmojiClick = (event, emojiObject) => {
    set_Send((prevInput) => {
      return prevInput + emojiObject.emoji
    })
    // setShowPicker(false);
  }
  const handleSend = (e) => {
    set_Send(e.target.value)
  }

  const [image, setImage] = useState(null)
  const handler_Change_Image = (e) => {
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader()
      reader.onload = function (e) {
        var show_image = document.getElementById('show_image_status')
        show_image.setAttribute('src', e.target.result)
      }

      reader.readAsDataURL(e.target.files[0])
      setImage(e.target.files[0])
    }
    // document.getElementById('group_get_image').setAttribute('style', 'display: block')
  }

  const show_upload = () => {
    document.getElementById('file_upload_id').click()
  }

  const handler_post_status = () => {
    document.body.style.overflow = 'auto'
    const uploadTask = storage.ref(`social/${image.name}`).put(image)
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        console.log(error)
      },
      async () => {
        await storage
          .ref('social')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            const post_status_data = async () => {
              const query = {
                id_user: data_account._id,
                title: send,
                image_body: url,
              }
              await UsersHome.postStatusUser(query)
              set_reload(true)
            }

            post_status_data()

            set_Send('')
          })
      },
    )
    alert('Story Upload')

    document
      .getElementById('card_post_parent')
      .setAttribute('style', 'display: none')
  }

  // -----------------------PHAN HOME-----------------------------//

  const [list_post_home, set_list_post_home] = useState([])
  const [state, dispatch] = useStore()
  const [reload, set_reload] = useState(false)

  // Hàm này dùng để load bài viết ở trang home lan dau tien
  useEffect(async () => {
    const fetchData = async () => {
      const query = {
        id_user: data_account._id,
      }

      const response = await UsersHome.getUsersHome(query)

      const reverse_data = response.reverse()
      //  console.log(response.reverse());
      const data = status_like(reverse_data)
      // set_list_post_home(data);
    }
    fetchData()

    const fetchAPI = async () => {
      const body = {
        slug_friends: data_account.list_slug_friend,
      }

      const data = await createRequest('POST', '/friend/posts', { body })

      if (data) {
        data.result.map((postFriend) => {
          set_list_post_home(list_post_home.concat(postFriend.reverse()))
        })
      }
    }
    await fetchAPI()
  }, [])

  // Hàm này dùng để load bài viết ở trang home phụ thuộc vào state reload
  useEffect(() => {
    if (reload) {
      const fetchData = async () => {
        const query = {
          id_user: data_account._id,
        }

        const response = await UsersHome.getUsersHome(query)

        const reverse_data = response.reverse()
        set_list_post_home(reverse_data)
        set_reload(false)
      }
      fetchData()
    }
  }, [reload])

  function status_like(data) {
    let array_new = []
    for (let i = 0; i < data.length; i++) {
      console.log(data)
      if (!data[i].status_like) {
        array_new.push(data[i])
      }
    }
    return array_new
  }

  //---- Phần này dùng để show modal khi user bấm kiểm tra số lượng người like ----//

  const [id_image_post, set_id_image_post] = useState('')

  const [load_modal, set_load_modal] = useState(false)

  const [users_like, set_users_like] = useState([])

  // Lấy id_image_post khi bấm vào xem like của bài viết
  const GET_id_image_post = (value) => {
    set_id_image_post(value)

    set_load_modal(true) // khởi động load dữ liệu ra modal
  }

  useEffect(() => {
    if (load_modal) {
      const fetchData = async () => {
        const query = {
          id_image_post: id_image_post,
        }

        const response = await Like.countLike(query)

        set_users_like(response)
      }

      fetchData()
    }
  }, [load_modal])

  // ------- Phần này dùng để lấy dữ liệu của chính user
  const [user, set_user] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        id_user: data_account._id,
      }

      const query = '?' + queryString.stringify(params)

      // const response = await AccountAPI.getId(query);
      // console.log(response)

      // set_user(response)
    }

    fetchData()
  }, [])

  // // State data của comment
  // const [comments, set_comments] = useState([])

  // const [load_comment, set_load_comment] = useState(true)

  // useEffect(() => {

  //     if (load_comment) {

  //         const fetchData = async () => {

  //             const response = await Comment.getAllComment(state.comments.id_image_post)
  //             console.log(response)

  //             set_comments(response)

  //         }

  //         fetchData()

  //         set_load_comment(false)

  //     }

  // }, [load_comment])

  const [tagFriend, setTagFriend] = useState(false)
  const handleTagFriend = () => {
    setTagFriend(!tagFriend)
    //document.getElementById("card_post_parent").setAttribute("style", "display: none");
  }

  return (
    <div className="home">
      <Box flex={1} p={{ xs: 0, md: 2 }}>
        {/* Show story */}
        <div className="display_content_story">
          <StoryReel src={avatar_account} />
        </div>

        {/* Show messengerSender */}
        <div className="display_content_messengerSender">
          <Card
            sx={{
              marginTop: '20px',
              display: 'flex',
              paddingLeft: '20px',
              alignItems: 'center',
              p: 3,
            }}
          >
            <Avatar sx={{ border: '2px solid #4de739' }} src={avatar_account} />
            <Chip
              title={'ADD'}
              onClick={(event) => {
                setOpen(true)
              }}
              sx={{
                marginLeft: '10px',
                width: '100%',
                height: '40px',
                fontSize: '18px',
              }}
              label="What's on your mind?"
            ></Chip>
          </Card>
        </div>

        {/* Show card post */}
        <div className="card_create_post_details">
          <Modal
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            id="card_post_parent"
            open={open}
            onClose={() => setOpen(false)}
            //id="group_get_image"
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
                  sx={{
                    position: 'relative',
                    float: 'right',
                    backgroundColor: 'rgb(221, 221, 221)',
                  }}
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
                Create Post
              </Typography>
              <UserBox>
                <Avatar
                  src={avatar_account}
                  sx={{ border: '2px solid  #4de739' }}
                />
                <Typography fontWeight={700} variant="span">
                  {full_name}
                </Typography>
              </UserBox>
              <TextField
                sx={{ width: '100%' }}
                multiline
                rows={2}
                placeholder="What's on your mind?"
                variant="standard"
                value={send}
                onChange={handleSend}
                color="success"
                focused
              />
              {/* Show img in frame create post */}
              <Stack style={{ display: 'none' }}>
                <input
                  type="file"
                  name="myImage"
                  id="file_upload_id"
                  // ref={imageRef}
                  onChange={handler_Change_Image}
                />
              </Stack>
              {/* edit img and handle close img in frame */}
              {image && (
                <div className="previewImage">
                  <CloseIcon onClick={() => setImage(null)} />
                  <img
                    id="show_image_status"
                    //   src={image.image}
                    alt=""
                  />
                </div>
              )}
              <Stack direction={'row'} gap={1} mt={3} mb={2} sx={{}}>
                <IconButton aria-label="emoji">
                  <EmojiEmotions
                    color="primary"
                    onClick={() => setShowPicker((val) => !val)}
                  />
                </IconButton>
                {showPicker && (
                  <div className="previewMoji">
                    <Picker
                      pickerStyle={{ width: '300px' }}
                      onEmojiClick={onEmojiClick}
                    />
                    <CloseIcon onClick={() => setShowPicker(null)} />
                  </div>
                )}
                {/* <Picker onEmojiClick={onEmojiClick}/> */}
                <IconButton aria-label="image">
                  <Image color="secondary" onClick={show_upload} />
                </IconButton>
                <IconButton aria-label="videoCamera">
                  <VideoCameraBack color="success" />
                </IconButton>
                <div>
                  <IconButton aria-label="add">
                    <PersonAdd color="error" onClick={handleTagFriend} />
                  </IconButton>
                </div>
              </Stack>
              <ButtonGroup
                fullWidth
                disableElevation
                variant="contained"
                aria-label="Disabled elevation buttons"
                color="success"
              >
                <Link to={''}>
                  <Button onClick={handler_post_status}>Post</Button>
                </Link>
              </ButtonGroup>
            </Box>
          </Modal>
        </div>

        <div className="display_poster">
          {list_post_home &&
            list_post_home.map((value) => {
              // console.log(value);
              return <ItemPostHome key={value._id} dataPost={value} />
            })}
        </div>
      </Box>
    </div>
  )
}
function ItemPostHome({ dataPost }) {
  const [state, dispatch] = useStore()
  const [send, set_Send] = useState('')
  const [showPickerComment, setShowPickerComment] = useState(false)
  const [state_status_like, set_status_like] = useState(dataPost.status_like)
  const onEmojiClick = (event, emojiObject) => {
    set_Send((prevInput) => {
      console.log(emojiObject)

      return prevInput + emojiObject.emoji
    })
    // setShowPicker(false);
  }
  const handler_Click_Untym = (id_image_post, id_user_following) => {
    const fetchData = async () => {
      // delete dữ liệu Database Like
      const query = {
        // id_user: state.account._id,
        id_image_post: id_image_post,
      }

      const response = await Like.putUnlike(query)
    }

    fetchData()

    let id_temp_following =
      id_user_following === '' ? state.account._id : id_user_following

    console.log(id_temp_following)

    const deleteData = async () => {
      const query = {
        id_user: id_temp_following,
        id_user_another: state.account._id,
      }

      await Favorite.deleteFavorite(query)
    }

    deleteData()
    set_status_like(false)

    // set_reload(true)
  }
  const handler_Click_Tym = (id_image_post, id_user_following, image_body) => {
    const fetchData = async () => {
      const query = {
        id_user: state.account._id,
        id_image_post: id_image_post,
      }

      const response = await Like.postLike(query)
    }
    fetchData()

    set_status_like(true)
  }

  return (
    <div className="box_poster_details">
      <Card sx={{ marginTop: '20px' }}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              sx={{ border: '2px solid #4de739' }}
              src={dataPost.avatar_account_following}
            />
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          //show fullname
          title={dataPost.username_following}
          subheader={format(dataPost.createdAt)}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {dataPost.title}
          </Typography>
        </CardContent>
        {/* <CardMedia
          component="img"
          height="100%"
          image={dataPost.image_body}
      /> */}

        <Link
          to={
            dataPost.id_user_following === ''
              ? `/post/${dataPost.id_image_post}_${state.account._id}`
              : `/post/${dataPost.id_image_post}_${dataPost.id_user_following}`
          }
        >
          <CardMedia component="img" image={dataPost.image_body} />
        </Link>

        <CardActions
          disableSpacing
          sx={{ borderBottom: '1px solid rgb(221, 221, 221)' }}
        >
          <div className="action_Tym_post_body">
            {state_status_like ? (
              <IconButton>
                {' '}
                <Favorite
                  onClick={() =>
                    handler_Click_Untym(
                      dataPost.id_image_post,
                      dataPost.id_user_following,
                    )
                  }
                  style={{ fontSize: '30px', cursor: 'pointer', color: 'red' }}
                />
              </IconButton>
            ) : (
              <IconButton>
                <FavoriteBorder
                  onClick={() =>
                    handler_Click_Tym(
                      dataPost.id_image_post,
                      dataPost.id_user_following,
                      dataPost.image_body,
                    )
                  }
                  style={{ fontSize: '30px', cursor: 'pointer' }}
                />
              </IconButton>
            )}
          </div>
          {/* <IconButton aria-label="share">
              <ShareIcon/>
          </IconButton>  */}

          <span
            className="display_like_user"
            style={{ fontWeight: '600', fontSize: '1rem' }}
          >
            Liked by
            <i
              style={{ cursor: 'pointer' }}
              data-toggle="modal"
              data-target={`#${dataPost.id_image_post}`}
              onClick={() => {
                // GET_id_image_post(dataPost.id_image_post)
              }}
            >
              {' '}
              {dataPost.like} others
            </i>
          </span>
          {/* <IconButton aria-label="add to favorites">
              <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite onClick={()=>handler_Click_Tym()} sx={{color: "green"}}/> }/>
          </IconButton> */}
        </CardActions>
        <div className="action_comment_post">
          <Box sx={{ padding: '20px' }}>
            <Link
              to={
                dataPost.id_user_following === ''
                  ? `/post/${dataPost.id_image_post}_${state.account._id}`
                  : `/post/${dataPost.id_image_post}_${dataPost.id_user_following}`
              }
            >
              <span style={{ cursor: 'pointer' }}>
                {' '}
                View all {dataPost.comment} comment
              </span>
            </Link>
            {/* <div className="body_detail_post">
            {
            comments && comments.map(value => (
                <div className="Detail_comment" key={dataPost._id}>                  
                    <Card sx={{ marginTop: '10px'}}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" sx={{ border: '2px solid #4de739' }}
                                src={dataPost.image_profile}  
                            />
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon/>
                            </IconButton> 
                        }
                        title={dataPost.username}
                        subheader={dataPost.cmt_user}
                    />
                    </Card>
                </div>
            ))
            }
        </div> */}
            <ButtonGroup sx={{ width: '100%', marginTop: '20px' }}>
              <Input
                sx={{
                  width: '100%',
                  // bgcolor:'white',
                  borderRadius: '50px',
                  paddingLeft: '20px',
                  position: 'relative',
                }}
                placeholder="Write comment..."
                variant="standard"
                disableUnderline
                value={send}
                onChange={(e) => set_Send(e.target.value)}
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
                    <CloseIcon onClick={() => setShowPickerComment(null)} />
                  </div>
                )}
                <IconButton>
                  <SendIcon color="success" />
                </IconButton>
              </ButtonGroup>
            </ButtonGroup>
          </Box>

          {/* Đây là phần Modal khi mà user muốn bấm xem có bao nhiêu người like */}
          <div className="" id={`${dataPost.id_image_post}`}>
            <div className="modal-dialog" role="document"></div>
          </div>
        </div>
      </Card>
    </div>
  )
}

Home.propTypes = {
  avatar_account: PropTypes.string.isRequired,
  full_name: PropTypes.string.isRequired,
  data_account: PropTypes.object.isRequired,
}

ItemPostHome.propTypes = {
  dataPost: PropTypes.object.isRequired,
}

/* eslint-disable no-unused-vars */
