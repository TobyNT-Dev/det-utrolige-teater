import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import AppService from '../Appservices/Appservice'

export const ThreeEvents = () => {
    const [data, setData] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        AppService.GetList("events?orderby=rand()").then((response) => {
            setData(response.data.items)
        })
    },[])

    const handleNavigate = () => {
    //navigates to the events page
    navigate('/forestillinger-og-events')
    }
    // Describes how the date should be formatted
    const options = { day: "numeric", month: "long" }
  return (
      <>
    <StyledCardBox>
      {data && data.slice(0, 3).map((item, idx) => {
        return (
            <StyledVerticalCards key={idx}>
                <div className="ImgContainer">
                    <img src={item.image_medium} alt="Billede tilhørende forestillingen" />
                </div>
                <div className="InfoContainer">
                    <p>{item.stage_name.toUpperCase()}</p>
                    <p>{`${new Date(item.startdate).toLocaleDateString("da-DK", options).toUpperCase()} - ${new Date(item.stopdate).toLocaleDateString("da-DK", options).toUpperCase()}`}</p>
                    <h2>{item.title}</h2>
                    <h3>{item.genre.toUpperCase()}</h3>
                    <Link to={`/forestillinger-og-events/${item.id}`}><button className="readMore">LÆS MERE</button></Link>
                    <button className="buyTicket">KØB BILLET</button>
                </div>
            </StyledVerticalCards>
            )
        })}
    </StyledCardBox>
    <StyledRedirectButton onClick={() => handleNavigate()} className="seeAll">SE ALLE FORESTILLINGER</StyledRedirectButton>
    </>
  )
}
const StyledCardBox = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
gap: 2em;
`

const StyledRedirectButton = styled.button`
margin-left: 75%;
margin-top: 2vw;
grid-column: 3;
background-color: #AD7A51;
font-family: "Titillium Web", sans-serif;
padding: 0.5em;
border: none;
color: white;
font-weight: 600;
font-size: 12pt;
width: 25%;
cursor: pointer;
`


const StyledVerticalCards = styled.div`
margin-top: 3vw;
border: 2px #AD7A51 solid;
display: grid;
grid-template-rows: 2fr auto;

.InfoContainer {
  text-align: right;
  padding: 1vw;
  font-family: 'Titillium Web', sans-serif;
  button {
    background-color: #AD7A51;
    font-family: "Titillium Web", sans-serif;
    padding: 0.5em;
    border: none;
    color: white;
    font-weight: 600;
    font-size: 12pt;
    width: 35%;
    }
    .readMore {
        margin-right: 5%;
        background-color: #30454C;
        &:hover {
            background-color: #151515;
            color: #AD7A51;
        }
    }
    .buyTicket {
        background-color: #D39D5B;
        &:hover {
            background-color: #AD7A51;
        }
    }

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
  aspect-ratio: 1/1;
  img {
    display: block;
    height: 100%;
    object-fit: cover;
  }
}
`