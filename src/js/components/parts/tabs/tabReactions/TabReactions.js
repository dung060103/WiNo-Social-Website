import { useState } from 'react'
import './TabReactions.css'
import PropTypes from 'prop-types'

/* eslint-disable no-unused-vars */
function TabReactions({ obj_tabs }) {
  const [state_tabActive, set_state_tabActive] = useState(0)

  return (
    <div className="body-tabReactions">
      <div className="list-tabReactions">
        {obj_tabs.map((obj_tab, idx) => {
          return (
            <div
              key={idx}
              className={`item-tabReactions ${idx == state_tabActive ? 'active' : ''}`}
              onClick={(event) => {
                set_state_tabActive(idx)
              }}
            >
              <div className="name-tabReactions">
                {obj_tab.name_tabReactions}
              </div>
            </div>
          )
        })}
      </div>

      <div className="value-tabReactions">
        {obj_tabs[state_tabActive].value_tabReactions.map(
          (value_tabReaction, idx) => {
            return (
              <div key={idx} className="value-tabReaction">
                {value_tabReaction}
              </div>
            )
          },
        )}
      </div>
    </div>
  )
}
TabReactions.propTypes = {
  obj_tabs: PropTypes.object.isRequired,
}

export default TabReactions

export function OBJ_TabReactions({ name_tabReactions, value_tabReactions }) {
  this.name_tabReactions = name_tabReactions
  this.value_tabReactions = value_tabReactions
}
/* eslint-disable no-unused-vars */
