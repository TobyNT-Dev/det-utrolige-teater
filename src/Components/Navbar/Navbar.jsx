import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import LogoSvg from "../../Assets/SVG/Logo.svg"

export const Navbar = () => {
  return (
    <StyledNav>
        <div>
            <img src={LogoSvg} alt="Det Utrolige Teaters Logo" />
        </div>
        <div className="LinkBox">
            <Link to="/">FORSIDE</Link>
            <Link to="/forestillinger-og-events">FORESTILLINGER & EVENTS</Link>
            <Link to="/skuespillere">SKUESPILLERE</Link>
        </div>
    </StyledNav>
  )
}
const StyledNav = styled.nav`

.LinkBox {
    a {
        color: #30454C;
        font-family: 'Titillium Web', sans-serif;
        text-decoration: none;
    }
}
`