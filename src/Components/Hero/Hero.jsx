import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import AppService from '../Appservices/Appservice'

export const Hero = () => {
  const [data, setData] = useState()


  useEffect(() => {
  AppService.GetDetail("events", "4").then((response) => {
    setData(response.data.item)
  })
},[])
  
  if (data) {
    // Convert the Start and stop dates to local date
    //Decides how the date should be formatted
    const options = { day: "numeric", month: "long" }
    return (
      <>
    <StyledHero>
      <div className="InfoContainer">
        <p>{data.stage_name.toUpperCase()}</p>
        <p>{`${new Date(data.startdate).toLocaleDateString("da-DK", options).toUpperCase()} - ${new Date(data.stopdate).toLocaleDateString("da-DK", options).toUpperCase()}`}</p>
        <h2>{data.title}</h2>
        <h3>{data.genre.toUpperCase()}</h3>
      </div>
      <div className="ImgContainer">
        <img src={data.image_medium} alt="Billede tilhørende forestillingen" />
      </div>
    </StyledHero>
    </>
  )
}
}
const StyledHero = styled.div`
margin-top: 3vw;

border: 2px #AD7A51 solid;
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
@media only screen and (max-width: 600px) {
height: auto;
display: grid;
grid-template-columns: 1fr 2fr;
.InfoContainer {
  p {
    font-size: 1.5em;
    :nth-child(1) {
    }
    :nth-child(2) {
    }
  }
  h2 {
    font-size: 3em;
  }
  h3 {
    font-size: 2em;
  }
}

.ImgContainer {
  img {
    width: 40em;
  }
}

}
`