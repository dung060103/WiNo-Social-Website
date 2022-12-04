import GifBoxIcon from '@mui/icons-material/GifBox';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Icon_ from '../Icon';
export const Icon_Gif =({isHot=true}) => <Icon_ isHot={isHot}><GifBoxIcon sx={{fontSize:30}} /></Icon_>
export const Icon_AddPhoto =({isHot=true}) => <Icon_ isHot={isHot}><AddPhotoAlternateIcon sx={{fontSize:30}} /></Icon_>
