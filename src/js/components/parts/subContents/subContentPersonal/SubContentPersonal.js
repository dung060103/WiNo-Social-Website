import SubContentPersonalStyles from '../subContentPersonal/SubContentPersonal.module.css'
import PropTypes from 'prop-types'

function SubContentPersonal({ slug_personal, optTab }) {
  if (optTab === 'Friends') {
    console.log(slug_personal)
    // fetch();
  }
  return (
    <div className={SubContentPersonalStyles['container-subContentPersonal']}>
      {slug_personal}
    </div>
  )
}

SubContentPersonal.propTypes = {
  slug_personal: PropTypes.string.isRequired,
  optTab: PropTypes.string.isRequired,
}

export default SubContentPersonal
