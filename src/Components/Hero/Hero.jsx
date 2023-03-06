import React, { useState } from 'react'
import styled from 'styled-components'
import AppService from '../Appservices/Appservice'

export const Hero = () => {
  const [data, setData] = useState()

  AppService.GetDetail("events", "4").then((response) => {
    setData(response.data.item)
  })
  
  if (data) {
    // Convert the Start and stop dates to local date
    const startDateStr = data.startdate;
    const stopDateStr = data.stopdate;
    const date1 = new Date(startDateStr);
    const date2 = new Date(stopDateStr);
    const options = { day: "numeric", month: "long" };

    return (
      <>
    {data ? <StyledHero>
      <div className="InfoContainer">
        <p>{data.stage_name.toUpperCase()}</p>
        <p>{`${date1.toLocaleDateString("da-DK", options).toUpperCase()} - ${date2.toLocaleDateString("da-DK", options).toUpperCase()}`}</p>
        <h2>{data.title}</h2>
        <h3>{data.genre.toUpperCase()}</h3>
      </div>
      <div className="ImgContainer">
        <img src={data.image_small} alt="Billede tilhørende forestillingen" />
      </div>
    </StyledHero> : <></>}
    </>
  )
}
}
const StyledHero = styled.div`
margin-top: 3vw;

border: 1px #AD7A51 solid;
height: 23vw;
display: grid;
grid-template-columns: 1fr 3fr;

.InfoContainer {
  text-align: right;
  padding: 1vw;
  font-family: 'Titillium Web', sans-serif;
  p {
    font-size: 1.2vw;
    :nth-child(1) {
      color: grey;
      margin-top: 4vw;
    }
    :nth-child(2) {
      color: grey;
      font-weight: 700;
      border-bottom:  1px lightgrey solid;
    }
  }
  h2 {
    font-family: 'Playfair Display', sans-serif;
    color: #D39D5B;
    font-weight: 300;
    font-size: 3vw;
    margin: 0;
  }
  h3 {
    margin: 0;
    color: grey;
  }
}

.ImgContainer {
  overflow: hidden;
  height: auto;
  border: 0.6vw #AD7A51 solid;
  img {
    display: block;
    width: 100%;
  }
}
`