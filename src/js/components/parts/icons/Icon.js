import './Icon.css'
import clsx from 'clsx'
import { SIZE_SMALL } from '@store/constants'
import PropTypes from 'prop-types'

function Icon_({ children, isHot = true, sizeIcon = SIZE_SMALL }) {
  return (
    <div className={clsx('icon_web', { isHot: isHot }, sizeIcon)}>
      {children}
    </div>
  )
}

Icon_.propTypes = {
  children: PropTypes.node.isRequired,
  isHot: PropTypes.bool,
  sizeIcon: PropTypes.string,
}
export default Icon_
