import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AppService from '../../Components/Appservices/Appservice';

export const MyPage = () => {
  // Im using useNavigate hook, to navigate to the home page after log out
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState()
  const [orders, setOrders] = useState()
  const [events, setEvents] = useState()
  const [runEffect, setRunEffect] = useState(false)
  const user = JSON.parse(sessionStorage.getItem("user"))
  useEffect(() => {
    AppService.GetList("favorites").then((response) => {
      setFavorites(response.data.items)
    })
  },[runEffect])

  useEffect(() => {
    AppService.GetList("events").then((response) => {
      setEvents(response.data.items)
    })
  })
  
  useEffect(() => {
    AppService.GetList("reservations").then((response) => {
      setOrders(response.data.items)
    })
  },[runEffect])

  const handleDelFav = (event_id) => {
    AppService.Delete("favorites", event_id).then((response) => {
      setRunEffect(state => !state)
    })
  }
  const handleDelEvent = (id) => {
    AppService.Delete("reservations", id).then((response) => {
      setRunEffect(state => !state)
    })
  }

  const handleLogout = () => {
    //clear the session storage, so the site knows that user is logged out
    sessionStorage.clear("user")
    //navigates to the home page
    navigate('/')
    //updates the data on the page after logging out
    window.location.reload()
  }
  return (
    <StyledMyPage>
    {/* Ternary that checks if user is logged in or not, since the "min side" page is accessible without logging in */}
    {sessionStorage.getItem("user") !== null ? <div>
      <h1>Min side</h1>
      <div className="logout">
        <p>{`DU ER LOGGET PÅ SOM ${user.user.firstname.toUpperCase()}`}</p>
        <button onClick={() => handleLogout()}>LOG OUT</button>
      </div>
      <div className="favs">
        <h2>MINE FAVORITTER</h2>
        {favorites && favorites !== null ? <div>
          {favorites.map((item, idx) => {
            return (
              <StyledFavorites key={idx}>
                {idx === 0 ? <p>FORESTILLING<span>REDIGER</span></p> : <></>}
                <p>{`${item.title.toUpperCase()}, ${item.stage_name.toUpperCase()}`}<span className="x" onClick={() => handleDelFav(item.event_id)}>✖</span></p> 
              </StyledFavorites>
            )
          })}
        </div> : <h3>Ingen Favoritter fundet.</h3>}
        <h2>MINE RESERVATIONER</h2>
        {orders && orders !== null ? <div>
          {orders.map((item, idx) => {
            return (
              <StyledFavorites key={idx}>
                {idx === 0 ? <p>DATO & TID<span>FORESTILLING</span><span>SCENE</span><span>ANTAL</span><span>PRIS</span><span>REDIGER</span></p> : <></>}
                { events && events.map((subItem, idx) => {
                  if (subItem.id === item.event_id)
                  return (
                    <p key={idx}>{`${subItem.startdate}, ${subItem.starttime}`}<span>{subItem.title}</span><span>{subItem.stage_name}</span><span>{`...`}</span><span>{subItem.price}</span><span className="x" onClick={() => handleDelEvent(item.id)}>✖</span></p>
                  )
                })}
              </StyledFavorites>
            )
          })}
        </div> : <h3>Ingen reservationer fundet.</h3>}
      </div>
    </div> : <div className="notLoggedIn"><h2>404 Side ikke fundet</h2></div>}
    </StyledMyPage>
  )
}
const StyledMyPage = styled.div`
border: 1px #AD7A51 solid;
padding: 0.5em;
h3 {
  font-family: "Playfair Display", sans-serif;
  color: #D39D5B;
}
.logout {
  margin-top: -6vw;
  right: 8vw;
  position: absolute;
  p {
    color: #707070;
    font-family: "Titillium Web", sans-serif;
    font-size: 1.5em;
  }
  button {
    float: right;
    background-color: #AD7A51;
    font-family: "Titillium Web", sans-serif;
    padding: 0.5em;
    border: none;
    color: white;
    font-weight: 600;
    font-size: 12pt;
    cursor: pointer;
  }
}
h1 {
  margin: 1vw 0 1vw 0;
  font-family: "Playfair Display", sans-serif;
  color: #D39D5B;
  font-size: 35pt;
}
h2 {
  color: #707070;
  font-family: "Titillium Web", sans-serif;
  font-size: 1.6em;
  font-weight: 400;
}
`
const StyledFavorites = styled.div`
p {
  color: #707070;
  font-family: "Titillium Web", sans-serif;
  font-size: 1em;
  display: flex;
  width: 100%;
  align-self: flex-start;
  span {
    margin-left: auto;
    color: #707070;
    font-size: 1em;
  }
  .x {
    margin-left: auto;
    color: red;
    font-size: 1.5em;
    cursor: pointer;
  }
}
`