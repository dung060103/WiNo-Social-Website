import NamePersonalStyles from '../namePersonal/NamePersonal.module.css'
import PropTypes from 'prop-types'

function NamePersonal({ elOfficial = '', textName }) {
  return (
    <div className={NamePersonalStyles['container-namePersonal']}>
      <div className={NamePersonalStyles['main-namePersonal']}>
        <div className={NamePersonalStyles['body-namePersonal']}>
          {textName}
        </div>
        <div className={NamePersonalStyles['containerOfficial-namePersonal']}>
          {elOfficial}
        </div>
      </div>
    </div>
  )
}

NamePersonal.propTypes = {
  elOfficial: PropTypes.object,
  textName: PropTypes.string.isRequired,
}

export default NamePersonal
