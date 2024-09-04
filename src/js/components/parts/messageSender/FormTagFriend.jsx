import React from 'react'
import { Input, Modal } from '@mui/material'
import { Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { Box, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PropTypes from 'prop-types'

function FormTagFriend({ modalOpened, setTagFriend }) {
  return (
    <Modal
      open={modalOpened}
      closeAfterTransition={() => setTagFriend(false)}
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
          sx={{ position: 'absolute', backgroundColor: 'rgb(221, 221, 221)' }}
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
  )
}

FormTagFriend.propTypes = {
  modalOpened: PropTypes.bool.isRequired,
  setTagFriend: PropTypes.func.isRequired,
}

export default FormTagFriend
