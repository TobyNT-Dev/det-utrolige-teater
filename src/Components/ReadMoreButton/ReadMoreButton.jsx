import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const ReadMoreButton = (props) => {
  return (
    <Link to={`/forestillinger-og-events/${props.data.id}`}><StyledReadMore className="readMore">LÆS MERE</StyledReadMore></Link>
  )
}

const StyledReadMore = styled.button`
cursor: pointer;
`
