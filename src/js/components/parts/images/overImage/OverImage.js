import '../../images/overImage/OverImage.css'
import PropTypes from 'prop-types'

function OverImage({ urlImage = '' }) {
  return (
    <div className="container-overImage">
      <img className="img-overImage" src={urlImage} alt="" />
    </div>
  )
}

OverImage.propTypes = {
  urlImage: PropTypes.string,
}
export default OverImage
