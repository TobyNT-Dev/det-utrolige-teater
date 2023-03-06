import React from 'react'
import { useHistory } from 'react-router-dom';

export const MyPage = () => {
  const history = useHistory()

  const handleLogout = () => {
    sessionStorage.clear("user")
    history.push('/')
    window.location.reload()
  }
  return (
    <div>
      <h1>Min side</h1>
      <button onClick={() => handleLogout}>LOG OUT</button>
    </div>
  )
}
