import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import LogoSvg from "../../Assets/SVG/Logo.svg"
import { Login } from '../Login/Login'

export const Navbar = () => {
  return (
    <StyledNav>
        <div className="Logo">
            <img src={LogoSvg} alt="Det Utrolige Teaters Logo" />
        </div>
        <div className="Links">
            <Link to="/">FORSIDE</Link>
            <Link to="/forestillinger-og-events">FORESTILLINGER & EVENTS</Link>
            <Link to="/skuespillere">SKUESPILLERE</Link>
            <Login />
        </div>
        <input className="NavInput" placeholder='INDTAST SØGEORD' type="text"/>
    </StyledNav>
  )
}
const StyledNav = styled.nav`
margin-top: 10px;
display: flex;
width: 100%;
.NavInput {
    height: 1.2vw;
    width: 15vw;
    position: absolute;
    right: 15vw;
    border: none;
    border-bottom: 2px lightgrey solid;
    color: #30454C;
    font-family: 'Titillium Web', sans-serif;
    font-size: 1.2vw;
}
.Logo {
    width: 20vw;
}
.Links {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: flex-end;
    a {
        font-size: 1em;
        margin-left: 2vw;
        color: #30454C;
        font-family: 'Titillium Web', sans-serif;
        text-decoration: none;
        &:hover {
            color: #D39D5B;
        }
    }
}
`