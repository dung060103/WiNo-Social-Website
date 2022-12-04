import { useContext } from "react"
import { Context_PopUpContent, Context_PopUpMessengers } from "./Context"

export function useStore(){
    return useContext(Context_PopUpContent);
} 
