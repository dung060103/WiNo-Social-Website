import '../overlays/OverLay.css'
import PropTypes from 'prop-types'

function OverLay({ children }) {
  return (
    <div className="container-overLay">
      <div className="body-overLay">{children}</div>
    </div>
  )
}
OverLay.propTypes = {
  children: PropTypes.string.isRequired,
}

export default OverLay
