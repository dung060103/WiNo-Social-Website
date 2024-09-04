import React from 'react'
import './Story.css'
import { Avatar } from '@mui/material'
import PropTypes from 'prop-types'

export default function Story({ image, profileSrc, title }) {
  return (
    <div style={{ backgroundImage: `url(${image})` }} className="story">
      <Avatar className="story__avatar" src={profileSrc} />
      <h4>{title}</h4>
    </div>
  )
}

Story.propTypes = {
  image: PropTypes.string.isRequired,
  profileSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}
