import React from 'react'
import { Link } from 'react-router-dom'

export const ReadMoreButton = (props) => {
  return (
    <Link to={`/forestillinger-og-events/${props.data.id}`}><button className="readMore">LÆS MERE</button></Link>
  )
}
