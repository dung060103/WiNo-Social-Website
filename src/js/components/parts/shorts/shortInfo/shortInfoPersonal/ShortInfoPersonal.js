import ShortInfoPersonalStyles from '../shortInfoPersonal/ShortInfoPersonal.module.css'
import PropTypes from 'prop-types'

function ShortInfoPersonal({ textInfo = '', type = '' }) {
  return (
    <div className={ShortInfoPersonalStyles['container-shortInfo']}>
      <div className={ShortInfoPersonalStyles['main-shortInfo']}>
        <div className={ShortInfoPersonalStyles['body-shortInfo']}>
          <div
            className={[
              ShortInfoPersonalStyles['text-shortInfo'],
              ShortInfoPersonalStyles[type],
            ].join(' ')}
          >
            {textInfo}
          </div>
        </div>
      </div>
    </div>
  )
}

ShortInfoPersonal.propTypes = {
  textInfo: PropTypes.string,
  type: PropTypes.string,
}

export default ShortInfoPersonal
