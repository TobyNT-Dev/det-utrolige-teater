import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const BuyButton = (props) => {
  return (
    <Link to={`/billet-salg/${props.data.id}`}><StyledBuyButton className="buyTicket">KØB BILLET</StyledBuyButton></Link>
  )
}
const StyledBuyButton = styled.button`
cursor: pointer;
`