import './ButtonNormal.css'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import PopUp_ from '@components/layouts/popups/popup'
import PropTypes from 'prop-types'

function ButtonNormal({
  elIcon = '',
  textBtn,
  isNo = false,
  styles,
  handleClick = () => {},
  isEnable = true,
  componentPopUP = [],
  isRadio = false,
}) {
  const [stateEnable, set_stateEnable] = useState(isEnable)
  const [stateShowPopUp, set_stateShowPopUp] = useState(false)
  useEffect(() => {
    console.log(stateShowPopUp)
  }, [stateShowPopUp])
  useEffect(() => {
    set_stateEnable(isEnable)
  }, [isEnable])

  return (
    <div className="container-buttonNormal" style={styles}>
      <div className="main-buttonNormal">
        <div
          onClick={(event) => {
            set_stateShowPopUp(true)
            if (stateEnable) {
              console.log(handleClick)
              // set_stateShowPopUp(false)

              handleClick(event)
            }

            if (isRadio) {
              set_stateEnable(false)
            }
          }}
          className={clsx([
            'body-buttonNormal',
            { isNo: isNo },
            { disenable: !stateEnable },
          ])}
        >
          <div className="sectionIcon-buttonNormal">{elIcon}</div>
          <div className="sectionText-buttonNormal">{textBtn}</div>
        </div>
        {stateShowPopUp && componentPopUP.length > 0 && (
          <PopUp_
            work_case_unmount={() => {
              set_stateShowPopUp(false)
            }}
          >
            <div
              className="containerPopup-buttonNormal"
              style={{
                position: 'absolute',
                bottom: '0px',
                transform: 'translateY(100%)',
                background: 'var(--greenColorEnd_Background)',
                padding: '10px',
                borderRadius: '10px',
                minWidth: '200px',
              }}
            >
              {componentPopUP.map((el, idx) => {
                return (
                  <span
                    key={idx}
                    onClick={() => {
                      set_stateShowPopUp(false)
                    }}
                  >
                    {el}
                  </span>
                )
              })}
            </div>
          </PopUp_>
        )}
      </div>
    </div>
  )
}

ButtonNormal.defaultProps = {
  elIcon: '',
  isNo: false,
  styles: {},
  handleClick: () => {},
  isEnable: true,
  componentPopUP: [],
  isRadio: false,
}

ButtonNormal.propTypes = {
  elIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  textBtn: PropTypes.string.isRequired,
  isNo: PropTypes.bool,
  styles: PropTypes.object,
  handleClick: PropTypes.func,
  isEnable: PropTypes.bool,
  componentPopUP: PropTypes.arrayOf(PropTypes.element),
  isRadio: PropTypes.bool,
}

export default ButtonNormal
