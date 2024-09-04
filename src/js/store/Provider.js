import { useReducer } from 'react'
import { initStates, reducer } from './reducer'
import { Context_PopUpContent } from './Context'
import { Context_PopUpMessengers } from './Context'
import { Context_Account } from './Context'
import { Context_GLOBAL } from './Context'
import PropTypes from 'prop-types'

export function ProviderPopUpContent({ children }) {
  const [state, dispatch] = useReducer(reducer, initStates)
  return (
    <Context_PopUpContent.Provider value={[state, dispatch]}>
      {children}
    </Context_PopUpContent.Provider>
  )
}
export function ProviderPopUpMessenger({ children }) {
  const [state, dispatch] = useReducer(reducer, initStates)
  return (
    <Context_PopUpMessengers.Provider value={[state, dispatch]}>
      {children}
    </Context_PopUpMessengers.Provider>
  )
}
export function ProviderAccount({ children }) {
  const [state, dispatch] = useReducer(reducer, initStates)
  return (
    <Context_Account.Provider value={[state, dispatch]}>
      {children}
    </Context_Account.Provider>
  )
}
export function ProviderGLOBAL({ children }) {
  const [state, dispatch] = useReducer(reducer, initStates)

  return (
    <Context_GLOBAL.Provider value={[state, dispatch]}>
      {children}
    </Context_GLOBAL.Provider>
  )
}

ProviderAccount.propTypes = {
  children: PropTypes.node.isRequired,
}
ProviderGLOBAL.propTypes = {
  children: PropTypes.node.isRequired,
}
ProviderPopUpContent.propTypes = {
  children: PropTypes.node.isRequired,
}
ProviderPopUpMessenger.propTypes = {
  children: PropTypes.node.isRequired,
}
