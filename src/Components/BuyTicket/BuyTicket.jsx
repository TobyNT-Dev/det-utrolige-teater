import React from 'react'
import { useParams } from 'react-router'

export const BuyTicket = () => {
    const { id } = useParams()
    
  return (
    <div>BuyTicket</div>
  )
}
