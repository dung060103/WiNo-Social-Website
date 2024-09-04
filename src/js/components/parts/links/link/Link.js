import clsx from 'clsx'
import LinkStyles from '../link/Link.module.css'
import PropTypes from 'prop-types'

function Link({ isUnderline = false, text }) {
  return (
    <div className={clsx([LinkStyles.main_link])}>
      <div
        className={clsx({
          text_link: LinkStyles.text_link,
          [LinkStyles.isUnderline]: isUnderline,
        })}
      >
        {text}
      </div>
    </div>
  )
}
Link.propTypes = {
  isUnderline: PropTypes.bool,
  text: PropTypes.string.isRequired,
}

export default Link
