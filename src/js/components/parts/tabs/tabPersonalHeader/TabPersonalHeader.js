// import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context_PagePersonal } from '../../pages/pagePersonal/PagePersonal'
import TabPersonalHeaderStyles from '../tabPersonalHeader/TabPersonalHeader.module.css'
import PropTypes from 'prop-types'

/* eslint-disable no-unused-vars */
function TabPersonalHeader({
  idx = -1,
  textTab = '',
  para_isActing = '',
  handleClick = () => {},
  slug_personal,
}) {
  const navigate = useNavigate()
  const value_Context_PagePersonal = useContext(Context_PagePersonal)
  return (
    <Link
      onClick={(event) => {
        if (value_Context_PagePersonal.slugs[0] === 'friends') {
          event.preventDefault()
          navigate(
            `/account/personal/${value_Context_PagePersonal.slugs[value_Context_PagePersonal.slugs.length - 1]}/${textTab}`,
            { replace: true },
          )
        } else {
          event.preventDefault()
          navigate(
            `/account/personal/${value_Context_PagePersonal.stateAccount.slug_personal}/${textTab}`,
            { replace: true },
          )
        }
        handleClick(idx)
      }}
      id={idx}
      to={`/account/personal/${value_Context_PagePersonal.slugs[value_Context_PagePersonal.slugs.length - 1]}/${textTab}`}
    >
      <div className={TabPersonalHeaderStyles['container-tabPersonalHeader']}>
        <div className={TabPersonalHeaderStyles['main-tabPersonalHeader']}>
          <div
            className={[
              TabPersonalHeaderStyles['body-tabPersonalHeader'],
              TabPersonalHeaderStyles[idx === para_isActing ? 'active' : ''],
            ].join(' ')}
          >
            {textTab}
          </div>
        </div>
      </div>
    </Link>
  )
}

TabPersonalHeader.propTypes = {
  idx: PropTypes.number,
  textTab: PropTypes.string,
  para_isActing: PropTypes.number,
  handleClick: PropTypes.func,
  slug_personal: PropTypes.string.isRequired,
}

export default TabPersonalHeader
/* eslint-disable no-unused-vars */
