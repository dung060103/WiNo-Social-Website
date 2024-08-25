import React, { useState } from 'react'
import LabelCircleStyles from '../labelCircle/LabelCircle.module.css'
import { createContext } from 'react'
import { Icon_Close } from '../../icons/fontAwesome/FontAwesome'
import { SIZE_TINY } from '@store/constants'
import PropTypes from 'prop-types'

export const CreateContext = createContext()
function Tmp_add_popup_content(component_PopUp) {
  return <CreateContext.Provider>{component_PopUp}</CreateContext.Provider>
}
function LabelCircle({
  urlImg,
  el_Icon,
  numCount = 0,
  objDetail,
  typeLabelCircle = '',
  sizeLabel = 'SMALL',
  styles = {},
  handleRemove,
  handleClick = () => {},
}) {
  const [isChecked, setChecked] = useState(false)
  const [isHover, setHover] = useState(false)

  return (
    <div
      className={LabelCircleStyles['container-labelCircle']}
      onMouseOver={() => {
        setHover(true)
      }}
      onMouseOut={() => {
        setHover(false)
      }}
    >
      <div
        style={styles}
        className={[
          LabelCircleStyles['body-labelCircle'],
          LabelCircleStyles[typeLabelCircle],
          LabelCircleStyles[sizeLabel],
        ].join(' ')}
        onClick={(event) => {
          handleClick(event, isChecked, setChecked, Tmp_add_popup_content)
        }}
      >
        {urlImg ? (
          <div
            className={[
              LabelCircleStyles['container-label'],
              LabelCircleStyles['container-label_withImg'],
            ].join(' ')}
          >
            <img
              src={urlImg}
              alt=""
              className={LabelCircleStyles['img-label_withImg']}
            ></img>
          </div>
        ) : (
          ''
        )}
        {el_Icon ? (
          <div
            className={
              [
                LabelCircleStyles['container-label'],
                LabelCircleStyles['container-label_withIcon'],
              ].join[' ']
            }
          >
            <div
              src=""
              alt=""
              className={LabelCircleStyles['img-label_withIcon']}
            >
              {el_Icon}
            </div>
          </div>
        ) : (
          ''
        )}
        {numCount ? (
          <div
            className={[
              LabelCircleStyles['container-label_has'],
              LabelCircleStyles['container-label_hasCount'],
            ].join(' ')}
          >
            <div className={LabelCircleStyles['value-label_hasCount']}>
              {numCount != 0 ? numCount : null}
            </div>
          </div>
        ) : (
          ''
        )}
        {isHover ? (
          handleRemove ? (
            <span
              style={{
                borderRadius: '50%',
                position: 'absolute',
                top: 0,
                right: '5px',
                background: 'var(--blackColorTextDefault)',
              }}
              /* eslint-disable no-unused-vars */
              onClick={(event) => {
                handleRemove()
              }}
              /* eslint-disable no-unused-vars */
            >
              <Icon_Close sizeIcon={SIZE_TINY} />
            </span>
          ) : (
            ''
          )
        ) : (
          ''
        )}
        {objDetail ? (
          <div
            className={[
              LabelCircleStyles['container-label_has'],
              LabelCircleStyles['container-label_hasDetail'],
            ].join(' ')}
          >
            <div className={LabelCircleStyles['btn-show_Detail']}>
              <i className="fa-solid fa-circle-chevron-down"></i>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

LabelCircle.propTypes = {
  urlImg: PropTypes.string.isRequired,
  el_Icon: PropTypes.node,
  numCount: PropTypes.number,
  objDetail: PropTypes.object.isRequired,
  typeLabelCircle: PropTypes.string,
  sizeLabel: PropTypes.string,
  styles: PropTypes.object,
  handleRemove: PropTypes.func.isRequired,
  handleClick: PropTypes.func,
}

export default LabelCircle
