import React, { useState } from 'react';
import styled from 'styled-components';

export const Login = () => {
        // useState variables declared here ↓
  // Logged in or not, and does "user" allready exist in the sessionstorage.
  const [loggedIn, setLoggedIn ] = useState(sessionStorage.getItem("user") !== null)
  // Login form opened, or not.
  const [initialized, setInitialized] = useState(false)
  // No data matched the input data. (error message for login form).
  const [error, setError] = useState('')
  // username variable.
  const [username, setUsername] = useState('')
  // password variable.
  const [password, setPassword] = useState('')
  
  // Handler for form submission.
  const handleSubmit = async (event) => {
    // prevents re-render on submission.
    event.preventDefault()
    // fetch from login API endpoint.
    return await fetch("https://api.mediehuset.net/token", {
      // Sets method of fetch, and formats the data to match endpoint parameters.
    method: "POST",
    body: JSON.stringify({ username: username, password: password}),
    headers: {
        "Content-Type": "application/json",
    },
  }) // Formats response data to JSON format.
    .then((response) => response.json())
    // Sets the data that will be returned.
    .then((data) => {
      // If the data returned has an access token, then user info was correct.
      if(data.access_token) {
        // Save the user data from api to session storage.
        sessionStorage.setItem("user", JSON.stringify(data))
        // Set the "loggedIn" state to true.
        setLoggedIn(true)
        // Makes sure the error message is clear.
        setError('')
        console.log(`Successfully logged in as ${data.user.firstname}.`)
        window.location.reload()
      } else {
        // Or - if the returned data does not contain an access token.
        // Clear inputs, and display the error message in the form.
        setUsername("")
        setPassword("")
        setError("User not found")
      }
    })
    // If an error was to happen, then return error message in console.
    .catch((error) => {
      console.error(error)
    });
  }
  // Function to handle changes to the username input.
  const handleUsernameChange = event => {
    // Removes the error message when user starts typing.
    setError('')
    // Sets the Username input value, to the variable.
    setUsername(event.target.value)
  }
  // Function to handle changes to the password input.
  const handlePasswordChange = event => {
    // Removes the error message when user starts typing.
    setError('')
    // Sets the Password input value, to the variable.
    setPassword(event.target.value)
  }
  // Function for Log-Out.
  const logOut = () => {
    // Clears the username and password variables.
    setUsername("")
    setPassword("")
    // Sets Logged in to false.
    setLoggedIn(false)
    // Hides the Login window.
    setInitialized(false)
    // Clears the user data from session storage.
    sessionStorage.clear("user")
    // Reloads the window to update login-based components.
    console.log("Successfully logged out.")

    window.location.reload()
  }
  // Returns the JSX with the form.
  return (
    <>
    {/* If "loggedIn" is false, and "initialized" is true, then display the login form. */}
    {!loggedIn && initialized ? <StyledLogin><div className="login-box">
      {/* Sets onSubmit to return the handleSubmit async function. */}
            <form onSubmit={handleSubmit}>
              {/* If the "x" is clicked, then set initialized to false, which hides the login form. */}
              <p className="exit" onClick={() => setInitialized(false)}>✖</p>
        <label>
        Username:
        {/* Run the handleUsernameChange function when username input is changed. */}
            <input required type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <label>
        Password:
        {/* Run the handlePasswordChange function when password input is changed. */}
            <input required type="password" value={password} onChange={handlePasswordChange} />
        </label>
        {/* If error value is not empty, then display the error message - and if it is, display a br tag instead.  */}
        {error !== "" ? <p className="error">{error}</p> : <br />}
        <button type="submit">Log In</button>
        </form>
    </div></StyledLogin> : <></>}
    {/* If loggedIn is not true, then display a Log In button. If it is true, display a Log Out button. */}
    {!loggedIn ? <button className="nav-button" onClick={() => setInitialized(true)}>Log In</button> : <button className="nav-button" onClick={() => logOut()}>Log Out</button>}
  </>
)
}

// Styles for the StyledLogin styled component.
const StyledLogin = styled.div`
overflow: hidden;
position: absolute;
top: 0;
left: 0;
.login-box {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.387);
    backdrop-filter: blur(5px);
    form {
        width: 20vw;
        margin: 10vw 39vw;
        padding: 1vw;
        background-color: rgb(16, 16, 16);
        display: inline-block;
        border-radius: 5px;
        box-shadow: black 3px 3px 10px;
        .exit {
          user-select: none;
          padding: 0;
          line-height: 1vw;
          color: white;
          margin: 0 0 0.5vw 0;
          width: 100%;
          text-align: right;
          height: 1vw;
          font-size: 1.3vw;
          cursor: pointer;
        }
        .error {
          color: red;
          font-family: sans-serif;
        }
        label {
          display: flex;
          font-family: sans-serif;
          color: white;
          justify-content: space-between;
          align-items: center;
          font-size: 1.2vw;
            input {
                border-radius: 3px;
                margin: 0.5vw;
                border: none;
                font-size: 1vw;
                &:focus {
                    outline: none !important;
                }
            }
        }
        button {
          width: 6vw;
            padding: 0.5vw 1vw;
            color: lightgrey;
            display: block;
            margin: 0 auto;
            border-radius: 3px;
            border: none;
            font-size: 1.3vw;
            transition: 200ms;
            background-color: black;
            &:focus {
                outline: none !important;
            }
            &:hover {
              transition: 200ms;
              cursor: pointer;
              color: white;
            }
        }
    }
}
`