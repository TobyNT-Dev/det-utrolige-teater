import React from 'react'
import { Link } from 'react-router-dom'

export const BuyButton = (props) => {
  return (
    <Link to={`/billet-salg/${props.data.id}`}><button className="buyTicket">KØB BILLET</button></Link>
  )
}