import { useContext } from 'react'
import { Context_PopUpContent } from './Context'

export function useStore() {
  return useContext(Context_PopUpContent)
}
