import React, { useState, useRef } from 'react'
import './MessageSender.css'
import { Avatar, Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  EmojiEmotions,
  Image,
  PersonAdd,
  VideoCameraBack,
} from '@mui/icons-material'
import {
  Box,
  ButtonGroup,
  Modal,
  Stack,
  TextField,
  Typography,
  Input,
} from '@mui/material'
import Card from '@mui/material/Card'
import CloseIcon from '@mui/icons-material/Close'
import styled from '@emotion/styled'
import Picker from 'emoji-picker-react'

/* eslint-disable no-unused-vars */
export default function MessageSender() {
  const [open, setOpen] = useState(false)
  const UserBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  }))

  // Handle Button select moij
  const [inputStr, setInputStr] = useState('')
  const [showPicker, setShowPicker] = useState(false)
  const onEmojiClick = (event, emojiObject) => {
    setInputStr((prevInput) => {
      console.log(emojiObject)

      return prevInput + emojiObject.emoji
    })
    // setShowPicker(false);
  }

  // Handle file choose img
  const [image, setImage] = useState(null)
  const imageRef = useRef()
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0]
      setImage({
        image: URL.createObjectURL(img),
      })
    }
  }

  // Handle open form tag friend
  const [tagFriend, setTagFriend] = useState(false)
  const handleTagFriend = () => {
    setTagFriend(!tagFriend)
    document
      .getElementById('card_post_parent')
      .setAttribute('style', 'display: none')
  }
  return (
    <div className="btn-messageSender-showCard-createPost">
      <Card
        sx={{
          marginTop: '20px',
          display: 'flex',
          paddingLeft: '20px',
          color: 'gray',
          alignItems: 'center',
        }}
      >
        <Avatar src={''} />
        <Card sx={{ m: 3 }}>
          <ButtonGroup
            title={'ADD'}
            onClick={(event) => {
              setOpen(true)
            }}
            sx={{
              position: 'relative',
              backgroundImage: 'linear-gradient(green, yellow);',
            }}
            fullWidth
            variant="string"
            aria-label="error button "
          >
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <Button>What's on your mind?</Button>
          </ButtonGroup>
          <Modal
            id="card_post_parent"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
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
                  setOpen(null)
                }}
              >
                <IconButton
                  sx={{
                    position: 'relative',
                    float: 'right',
                    backgroundColor: 'rgb(221, 221, 221)',
                  }}
                >
                  <CloseIcon onClose={() => setOpen(false)} />
                </IconButton>
              </span>
              <Typography
                variant="h6"
                color={'gray'}
                textAlign={'center'}
                sx={{
                  borderBottom: '1px solid green',
                  paddingBottom: '20px',
                  marginBottom: '10px',
                }}
              >
                Create Post
              </Typography>

              <UserBox>
                <Avatar src="" sx={{ width: 30, height: 30 }} />
                <Typography fontWeight={700} variant="span"></Typography>
              </UserBox>
              <TextField
                sx={{ width: '100%' }}
                id="standard-multiline-static"
                multiline
                rows={2}
                placeholder="What's on your mind?"
                variant="standard"
                value={inputStr}
                onChange={(e) => setInputStr(e.target.value)}
                color="success"
                focused
              />

              {/* Show img in frame create post */}
              <Stack style={{ display: 'none' }}>
                <input
                  type="file"
                  name="myImage"
                  ref={imageRef}
                  onChange={onImageChange}
                />
              </Stack>
              {/* edit img and handle close img in frame */}
              {image && (
                <div className="previewImage">
                  <CloseIcon onClick={() => setImage(null)} />
                  <img src={image.image} alt="" />
                </div>
              )}
              <Stack direction={'row'} gap={1} mt={3} mb={2} sx={{}}>
                <IconButton
                  aria-label="emoji"
                  onClick={() => setShowPicker((val) => !val)}
                >
                  <EmojiEmotions color="primary" />
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
                <IconButton
                  aria-label="image"
                  onClick={() => imageRef.current.click()}
                >
                  <Image color="secondary" />
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
              {/* <FormTagFriend
                modalOpened={modalOpened}
                setTagFriend={setTagFriend}/> */}
              {tagFriend && (
                <div>
                  <Modal
                    // overlayOpacity={0.55}
                    // overlayBlur={9}
                    // size="55%"
                    open={open}
                    //closeAfterTransition={() => setTagFriend(false)}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      width={500}
                      bgcolor={'background.default'}
                      color={'text.primary'}
                      p={6}
                      borderRadius={9}
                      sx={{}}
                    >
                      <IconButton
                        sx={{
                          position: 'absolute',
                          backgroundColor: 'rgb(221, 221, 221)',
                        }}
                      >
                        <ArrowBackIcon onClick={() => setTagFriend(null)} />
                      </IconButton>
                      <Typography
                        variant="h6"
                        color={'gray'}
                        textAlign={'center'}
                        sx={{
                          borderBottom: '1px solid green',
                          paddingBottom: '20px',
                          marginBottom: '10px',
                        }}
                      >
                        Tag friend
                      </Typography>

                      <Input
                        sx={{
                          width: '85%',
                          backgroundColor: 'rgb(221, 221, 221)',
                          borderRadius: '50px',
                          paddingLeft: '20px',
                        }}
                        id="standard-multiline-static"
                        multiline
                        rows={1}
                        placeholder="Search name friend..."
                        variant="filled"
                        color="success"
                        disableUnderline
                      />

                      <Button
                        sx={{
                          position: 'relative',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        OK
                      </Button>
                    </Box>
                  </Modal>
                </div>
              )}

              <ButtonGroup
                sx={{ backgroundImage: 'linear-gradient(green, yellow);' }}
                fullWidth
                aria-label=" primary button group"
              >
                <Button>Post</Button>
              </ButtonGroup>
            </Box>
          </Modal>
        </Card>
      </Card>
    </div>
  )
}
/* eslint-disable no-unused-vars */
