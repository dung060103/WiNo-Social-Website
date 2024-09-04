import { useEffect, useState, useRef } from 'react'
import { ContextPopUp } from '@store/Context'
import './Popup_.css'
import PropTypes from 'prop-types'

function PopUp_({
  children,
  isClickOutside = true,
  work_case_unmount = () => {},
  showContainerOutside = false,
}) {
  var ref_ = useRef(null)
  const [active_, setActive_] = useState(true)
  const handleClickOutSite = (event) => {
    if (ref_.current && !ref_.current.contains(event.target)) {
      setActive_((active_) => {
        work_case_unmount()
        return !active_
      })
    }
  }

  useEffect(() => {
    if (isClickOutside) {
      document.addEventListener('mousedown', (event) => {
        handleClickOutSite(event)
      })
      return () => {
        document.removeEventListener('mousedown', (event) => {
          handleClickOutSite(event)
        })
      }
    }
  }, [ref_])
  return active_ ? (
    <ContextPopUp.Provider value={{ active_, setActive_, work_case_unmount }}>
      <div
        className={`${showContainerOutside ? 'outside-container-PopUp' : ''}`}
      >
        <div className="container-PopUp" ref={ref_}>
          {children}
        </div>
      </div>
    </ContextPopUp.Provider>
  ) : (
    ''
  )
}

PopUp_.propTypes = {
  children: PropTypes.node.isRequired,
  isClickOutside: PropTypes.bool,
  work_case_unmount: PropTypes.func,
  showContainerOutside: PropTypes.bool,
}

export default PopUp_
