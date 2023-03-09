import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AppService from '../../Components/Appservices/Appservice';

export const MyPage = () => {
  // Im using useNavigate hook, to navigate to the home page after log out
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState()

  AppService.GetList("favorites").then((response) => {
    setFavorites(response.data.items)
  })

  const handleLogout = () => {
    //clear the session storage, so the site knows that user is logged out
    sessionStorage.clear("user")
    //navigates to the home page
    navigate('/')
    //updates the data on the page after logging out
    window.location.reload()
  }
  return (
    <>
    {/* Ternary that checks if user is logged in or not, since the "min side" page is accessible without logging in */}
    {sessionStorage.getItem("user") !== null ? <div>
      <h1>Min side</h1>
      <button onClick={() => handleLogout()}>LOG OUT</button>
      <div className="favs">
        <h2>MINE FAVORITTER</h2>
        {favorites && favorites !== null ? <div>
          {favorites.map((item, idx) => {
            return (
              <div key={idx}>
                <p>{`${item.title},${item.stage_name}`}</p>
              </div>
            )
          })}
        </div> : <h3>Ingen Favoritter fundet...</h3>}
      </div>
    </div> : <div className="notLoggedIn"><h2>404 Side ikke fundet</h2></div>}
    </>
  )
}
