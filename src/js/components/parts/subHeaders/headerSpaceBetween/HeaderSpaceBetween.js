import HeaderSpaceBetweenStyles from '../headerSpaceBetween/HeaderSpaceBetween.module.css'
import PropTypes from 'prop-types'

function HeaderSpaceBetween({ bodyLeft, bodyRight }) {
  return (
    <div className={HeaderSpaceBetweenStyles['body_headerSpaceBetween']}>
      <div className="bodyLeft_headerSpaceBetween">{bodyLeft}</div>
      <div className={HeaderSpaceBetweenStyles['bodyRight_headerSpaceBetween']}>
        {bodyRight}
      </div>
    </div>
  )
}

HeaderSpaceBetween.propTypes = {
  bodyLeft: PropTypes.object.isRequired,
  bodyRight: PropTypes.object.isRequired,
}

export default HeaderSpaceBetween
