import React, { useState, useRef } from 'react'
import FormSearchStyles from '../formSearch/FormSearch.module.css'
import PropTypes from 'prop-types'
import { Icon_Search } from '@components/parts/icons/fontAwesome/FontAwesome'

FormSearch.propTypes = {
  handler_Search: PropTypes.func,
}

FormSearch.defaultProps = {
  handler_Search: null,
}
function FormSearch({ placeholder_text, handler_Search }) {
  const [search, set_search] = useState('')

  const delaySearchTextTimeOut = useRef(null)

  const onChangeText = (e) => {
    const value = e.target.value

    set_search(value)

    if (handler_Search) {
      //Nếu người dùng đang nhập thì mình clear cái giây đó
      if (delaySearchTextTimeOut.current) {
        clearTimeout(delaySearchTextTimeOut.current)
      }

      delaySearchTextTimeOut.current = setTimeout(() => {
        handler_Search(value)
      }, 700)
    }
  }
  return (
    <div className={FormSearchStyles['container-formSearch']}>
      <div className="btn-search__formSearch">
        <div className="icon-search__formSearch">
          <Icon_Search />
        </div>
      </div>
      <div className={FormSearchStyles['container-ipt_search__formSearch']}>
        <input
          placeholder={placeholder_text}
          type="text"
          className={FormSearchStyles['ipt-search__formSearch']}
          value={search}
          onChange={onChangeText}
        ></input>
      </div>
    </div>
  )
}
export function NoResult() {
  return (
    <div
      className="no_result"
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2>No result</h2>
      <img
        style={{ width: '100%', objectFit: 'cover', padding: '50px' }}
        src={
          'https://drive.google.com/uc?export=view&id=191iGIbvR2zE-BYn23xntpeXX7TSqqxay'
        }
      ></img>
    </div>
  )
}

FormSearch.propTypes = {
  search: PropTypes.string.isRequired,
  handler_Search: PropTypes.func.isRequired,
  placeholder_text: PropTypes.string.isRequired,
}

export default FormSearch
