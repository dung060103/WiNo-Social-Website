import React, { useState, useRef } from 'react'
import './MessageSender.css'
import FormTagFriend from './FormTagFriend'
import SidebarRow from '@components/layouts/sidebars/sidebarLeft/SidebarRow'
import { Avatar, Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'
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
} from '@mui/material'
import Card from '@mui/material/Card'
import CloseIcon from '@mui/icons-material/Close'
import styled from '@emotion/styled'
import Picker from 'emoji-picker-react'
/* eslint-disable no-unused-vars */
export default function MessageSender(props) {
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
  const [modalOpened, setTagFriend] = useState(false)

  return (
    <>
      <Card
        sx={{
          marginTop: '20px',
          display: 'flex',
          paddingLeft: '20px',
          color: 'gray',
          alignItems: 'center',
        }}
      >
        <SidebarRow
          src={
            'https://vivureviews.com/wp-content/uploads/2022/02/among-us-profile-picture.jpg'
          }
        />
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
                  <CloseIcon />
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
                <Avatar
                  src="https://vivureviews.com/wp-content/uploads/2022/02/among-us-profile-picture.jpg"
                  sx={{ width: 30, height: 30 }}
                />
                <Typography fontWeight={700} variant="span">
                  Among Us
                </Typography>
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
                    <PersonAdd
                      color="error"
                      onClick={() => setTagFriend(true)}
                    />
                  </IconButton>
                </div>
              </Stack>
              <FormTagFriend
                modalOpened={modalOpened}
                setTagFriend={setTagFriend}
              />

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
    </>
  )
}
/* eslint-disable no-unused-vars */
