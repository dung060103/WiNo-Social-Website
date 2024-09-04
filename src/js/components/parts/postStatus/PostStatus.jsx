import React, { useState } from 'react'
import './PostStatus.css'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import { Checkbox, Input, Box, ButtonGroup } from '@mui/material'
import { Favorite, FavoriteBorder, EmojiEmotions } from '@mui/icons-material'
import ShareIcon from '@mui/icons-material/Share'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import Picker from 'emoji-picker-react'
import PropTypes from 'prop-types'

function PostStatus({ avatar, title, descr, date, link }) {
  const [setInputStr] = useState('')
  const [showPicker, setShowPicker] = useState(false)
  const onEmojiClick = (event, emojiObject) => {
    setInputStr((prevInput) => {
      return prevInput + emojiObject.emoji
    })
  }

  return (
    <Card
      sx={{
        marginTop: '20px',
      }}
    >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" sx={{ border: '2px solid #4de739' }}>
            {avatar}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={date}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {descr}
        </Typography>
      </CardContent>
      <CardMedia component="img" height="20%" image={link} alt="Noble" />

      <CardActions
        disableSpacing
        sx={{
          borderBottom: '1px solid rgb(221, 221, 221)',
          marginBottom: '20px',
        }}
      >
        <IconButton aria-label="add to favorites">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: 'red' }} />}
          />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <Box sx={{ padding: '20px' }}>
        <ButtonGroup sx={{ width: '100%' }}>
          <Input
            sx={{
              width: '100%',
              backgroundColor: '#B0B3B8',
              borderRadius: '50px',
              paddingLeft: '20px',
              position: 'relative',
            }}
            placeholder="Write comment..."
            variant="filled"
            disableUnderline
            direction={'row'}
            gap={1}
            mt={3}
            mb={2}
            endAdornment={
              <ButtonGroup>
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
                <IconButton>
                  <SendIcon color="success" />
                </IconButton>
              </ButtonGroup>
            }
          />
          {/* <IconButton sx={{ position:"absolute" ,display:"block"}}>
                    <SendIcon  color="success"/>
                </IconButton> */}
        </ButtonGroup>
      </Box>
    </Card>
  )
}

PostStatus.propTypes = {
  avatar: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  descr: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}

export default PostStatus
