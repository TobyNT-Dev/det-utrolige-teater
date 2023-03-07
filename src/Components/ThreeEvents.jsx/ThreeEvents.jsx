import React, { useEffect, useState } from 'react'
import AppService from '../Appservices/Appservice'

export const ThreeEvents = () => {
    const [data, setData] = useState()

    useEffect(() => {
        AppService.GetList("events?orderby=rand()").then((response) => {
            setData(response.data.items)
        })
    },[])
    // Describes how the date should be formatted
    const options = { day: "numeric", month: "long" }
  return (
    <>
      {data && data.slice(0, 3).map((item, idx) => {
        return (
            <div key={idx}>
                <div className="InfoContainer">
                <p>{item.stage_name.toUpperCase()}</p>
                <p>{`${new Date(item.startdate).toLocaleDateString("da-DK", options).toUpperCase()} - ${new Date(item.stopdate).toLocaleDateString("da-DK", options).toUpperCase()}`}</p>
                <h2>{item.title}</h2>
                <h3>{item.genre.toUpperCase()}</h3>
                </div>
            </div>
        )
      })}
    </>
  )
}
