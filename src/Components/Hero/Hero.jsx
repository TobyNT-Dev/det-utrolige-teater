import React, { useState } from 'react'
import AppService from '../Appservices/Appservice'

export const Hero = () => {
  const [data, setData] = useState()

  AppService.GetDetail("events", "4").then((response) => {
    setData(response.data.item)
  })
  console.log(data)
  return (
    <div>
      <h2>{data && data.title}</h2>
    </div>
  )
}
