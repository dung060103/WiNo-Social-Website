import GifBoxIcon from '@mui/icons-material/GifBox'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import Icon_ from '../Icon'
import PropTypes from 'prop-types'

const iconPropTypes = {
  isHot: PropTypes.bool,
  sizeIcon: PropTypes.string,
}

export const Icon_Gif = ({ isHot = true, sizeIcon = '30' }) => (
  <Icon_ isHot={isHot} sizeIcon={sizeIcon}>
    <GifBoxIcon sx={{ fontSize: sizeIcon }} />
  </Icon_>
)

Icon_Gif.propTypes = iconPropTypes

export const Icon_AddPhoto = ({ isHot = true }) => (
  <Icon_ isHot={isHot}>
    <AddPhotoAlternateIcon sx={{ fontSize: 30 }} />
  </Icon_>
)

Icon_AddPhoto.propTypes = iconPropTypes
