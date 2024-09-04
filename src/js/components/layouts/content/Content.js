import { useStore } from '@store'
import { Icon_Plus } from '@components/parts/icons/fontAwesome/FontAwesome'
import LabelCircle from '@components/parts/labels/labelCircle/LabelCircle'
import PropTypes from 'prop-types'

function Content({ bodyContent = '' }) {
  /* eslint-disable no-unused-vars */
  var [state, dispatch] = useStore()
  /* eslint-disable no-unused-vars */
  return (
    <div className="content">
      <div className="container-popup_Content">
        {state.popUpContents.map((el, idx) => {
          return <div key={idx}>{el}</div>
        })}
      </div>
      <div className="container_content-popupCallVideo">
        {<div>{state.popUpCallVideo}</div>}
      </div>
      <div className="container-popup_Messenger">
        {state.popUpMessengers.map((el, idx) => {
          return <div key={idx}>{el}</div>
        })}
        {state.popUpMessengers.length > 0 && (
          <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
            <LabelCircle el_Icon={<Icon_Plus />} />
          </div>
        )}
      </div>
      {state.popUpReviews.length > 0 && (
        <div className="container-popup_Review">
          {state.popUpReviews.map((el, idx) => {
            return <div key={idx}>{el}</div>
          })}
        </div>
      )}
      {bodyContent}
    </div>
  )
}

Content.propTypes = {
  bodyContent: PropTypes.node,
}

export default Content
