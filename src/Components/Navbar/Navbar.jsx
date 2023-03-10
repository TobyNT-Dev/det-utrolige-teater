import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import LogoSvg from "../../Assets/SVG/Logo.svg"
import { Login } from '../Login/Login'
import { faBars } from '@fortawesome/free-solid-svg-icons' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Navbar = () => {
    const [onOff, setOnOff] = useState(false)

    const extendBurger = () => {
        setOnOff(state => !state)
    }
  return (
    <StyledNav>
        <div className="Logo">
            <img src={LogoSvg} alt="Det Utrolige Teaters Logo" />
        </div>
        <div className="LinksDesktop">
            <Link to="/">FORSIDE</Link>
            <Link to="/forestillinger-og-events">FORESTILLINGER & EVENTS</Link>
            <Link to="/skuespillere">SKUESPILLERE</Link>
            <Login />
        </div>
        <FontAwesomeIcon className="MobileIcon" icon={faBars} onClick={() => extendBurger()} />
        {onOff ? <div className="LinksMobile">
            <Link to="/">FORSIDE</Link>
            <Link to="/forestillinger-og-events">FORESTILLINGER & EVENTS</Link>
            <Link to="/skuespillere">SKUESPILLERE</Link>
            <Login />
        </div> : <></>}
        <input className="NavInput" placeholder='INDTAST SØGEORD' type="text"/>
    </StyledNav>
  )
}
const StyledNav = styled.nav`
@media only screen and (min-width: 600px) {
    margin-top: 10px;
    display: flex;
    width: 100%;
    .MobileIcon {
        display: none;
    }
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
        z-index: -1;
    }
    .Logo {
        width: 20vw;
        img {
            width: 20vw;
        }
    }
    .LinksMobile {
    display: none;
}
.LinksDesktop {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: flex-end;
    a {
        font-size: 1.5vw;
        margin-left: 2vw;
        color: #30454C;
        font-family: 'Titillium Web', sans-serif;
        text-decoration: none;
        &:hover {
            color: #D39D5B;
        }
    }
}
}
//mobile specific navigation bar styles
@media only screen and (max-width: 600px) {
    margin-top: 10px;
    width: 100%;
    .MobileIcon {
        display: inline-block;
        position: absolute;
        top: 6vw;
        right: 6vw;
        width: 10vw;
        height: 10vw;
    }
    .NavInput {
        display: none;
    }
    .Logo {
        width: 20vw;
        img {
            width: 40vw;
        }
    }
    .LinksMobile {
        position: absolute;
        right: 1vw;
        background-color: #fff;
        a {
            display: block;
            font-size: 1.2em;
            margin-left: 2vw;
            color: #30454C;
            font-family: 'Titillium Web', sans-serif;
            text-decoration: none;
        }
    }
    .LinksDesktop {
        display: none;
    }
}
`