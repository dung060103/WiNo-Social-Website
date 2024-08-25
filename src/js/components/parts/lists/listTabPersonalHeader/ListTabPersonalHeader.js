import TabPersonalHeader from '../../tabs/tabPersonalHeader/TabPersonalHeader'
import { useState } from 'react'
import { useContext } from 'react'
import { Context_PagePersonal } from '../../pages/pagePersonal/PagePersonal'
import { useStore } from '@store'
import { set_url } from '@store/actions'
import { LIST_TAB_HEADER_PERSONAL_DEFAULT } from '@store/constants'
/* eslint-disable no-unused-vars */
function ListTabPersonalHeader() {
  const value_Context_PagePersonal = useContext(Context_PagePersonal)
  const [state, dispatch] = useStore()
  const [tabActive, setTabActive] = useState(
    LIST_TAB_HEADER_PERSONAL_DEFAULT.indexOf(
      value_Context_PagePersonal.slugs[2],
    ),
  )
  const handleClick = (key) => {
    dispatch(set_url(new Date().toLocaleString()))
    // navigate('/key')
    setTabActive(key)
  }
  return LIST_TAB_HEADER_PERSONAL_DEFAULT.map((el, idx) => {
    return (
      <TabPersonalHeader
        slug_personal={`${value_Context_PagePersonal.stateAccount.slug_personal}`}
        idx={idx}
        key={idx}
        textTab={el}
        para_isActing={tabActive}
        handleClick={() => {
          handleClick(idx)
        }}
      />
    )
  })
}
export default ListTabPersonalHeader
/* eslint-disable no-unused-vars */
