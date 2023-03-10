import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import AppService from '../../Components/Appservices/Appservice'

export const Actors = () => {
  const [data, setData] = useState()

  AppService.GetList("actors").then((response) => {
    setData(response.data.items)
  })

  return (
    <div>
      {data && data.map((item, idx) => {
        return(
          <StyledActorBox key={idx}>
            <div className="ImgDiv">
            <img src={item.image} alt="actor" />
            </div>
            <div className="InfoDiv">
              <h2>{item.name}</h2>
              <p>{item.description.slice(0, 330)}(...)</p>
            </div>
            <Link to={`/skuespillere/${item.id}`}><button className="readMore">LÆS MERE</button></Link>
          </StyledActorBox>
        )
      })}
    </div>
  )
}
const StyledActorBox = styled.div`
border-right: 1px #AD7A51 solid;
border-left: 1px #AD7A51 solid;
border-top: 1px #70707052 solid;
border-bottom: 1px #70707052 solid;
display: grid;
grid-template-columns: 2fr 5fr 1fr;
place-items: center;
.ImgDiv {
  img {
    width: 18vw;
  }
}
.InfoDiv {
  p {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  padding: 0.5em;
  color: #D39D5B;
  font-family: "Titillium Web", sans-serif;
  font-weight: 100;
  margin: 0; 
  font-weight: 600;
  font-size: 1em;
}
button {
background-color: #AD7A51;
font-family: "Titillium Web", sans-serif;
padding: 0.5em;
border: none;
color: white;
font-weight: 600;
font-size: 12pt;
cursor: pointer;
}
`