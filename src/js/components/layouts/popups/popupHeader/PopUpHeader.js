import { default as PopUp } from '../popup'
import '../popupHeader/PopUpHeader.css'
import PropTypes from 'prop-types'

/* eslint-disable no-unused-vars */
function PopUpHeader({
  isActive,
  header = '',
  body = '',
  footer = '',
  codeLabelPopUP,
  workMount = () => {},
  workUnMount = () => {},
}) {
  return (
    <PopUp>
      <div className="container-PopUpHeader">
        <div className="main-PopUpHeader">
          <div className="header-PopUpHeader">{header}</div>
          <div className="body-PopUpHeader">{body}</div>
          <div className="footer-PopUpHeader">{footer}</div>
        </div>
      </div>
    </PopUp>
  )
}
PopUpHeader.propTypes = {
  isActive: PropTypes.bool.isRequired,
  header: PropTypes.node.isRequired,
  body: PropTypes.node.isRequired,
  footer: PropTypes.node.isRequired,
  codeLabelPopUP: PropTypes.string,
  workMount: PropTypes.func,
  workUnMount: PropTypes.func,
}

export default PopUpHeader
/* eslint-disable no-unused-vars */
