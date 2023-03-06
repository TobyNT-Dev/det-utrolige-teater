import React from 'react'
import { useNavigate } from 'react-router-dom';

export const MyPage = () => {
  // Im using useNavigate hook, to navigate to the home page after log out
  const navigate = useNavigate()

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
    </div> : <div className="notLoggedIn"><h2>Log ind for at se din personlige side.</h2></div>}
    </>
  )
}
