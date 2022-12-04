import { useState } from "react"
import './TabReactions.css'
function TabReactions({
    obj_tabs
}){
    const [state_tabActive,set_state_tabActive] = useState(0);
    console.log(obj_tabs[state_tabActive].value_tabReactions);
    return (
        <div className="body-tabReactions">
            <div className="list-tabReactions">
            {obj_tabs.map((obj_tab,idx)=>{
                return(
                    <div className={`item-tabReactions ${idx==state_tabActive?'active':''}`} onClick={(event)=>{
                        set_state_tabActive(idx)
                    }}>
                        <div className="name-tabReactions">
                        {obj_tab.name_tabReactions}
                        </div>
                    </div>
                )
            })}
            </div>

            <div className="value-tabReactions">
                {
                    obj_tabs[state_tabActive].value_tabReactions.map(value_tabReaction=>{
                        return (
                            <div className="value-tabReaction">
                                {value_tabReaction}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default TabReactions
export function OBJ_TabReactions(
    {
        name_tabReactions,
        value_tabReactions,
    }
)
{
    this.name_tabReactions=name_tabReactions;
    this.value_tabReactions=value_tabReactions;
}