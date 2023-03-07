import React from 'react'
import styled from 'styled-components'
import { SiFacebook, SiInstagram, SiLinkedin } from "react-icons/si"

export const Footer = () => {
  return (
    <StyledFooter>
      <div className="address">
        <h3>ADRESSE</h3>
        <p>Det utrolige teater</p>
        <p>Havnegade 901</p>
        <p>9000 Aalborg</p>
        <p>EAN 5798003279845</p>
        <p className="m-">CVR 1001 0012</p>
        <p>Find vej på kort</p>
        </div>
      <div className="admin_ticket">
        <h3>BILLETSERVICE</h3>
        <p>Se åbningstider</p>
        <p>Billettelefon: +45 96 31 80 80</p>
        <p>billet@dut.dk</p>
        <h3>ADMINISTRATION</h3>
        <p>Telefon: +45 96 31 80 90</p>
        <p>adm@dut.dk</p>
      </div>
      <div className="practical">
        <h3>PRAKTISK INFO</h3>
        <p>Kontakt</p>
        <p>Kom trygt i teatret</p>
        <p>Presseside</p>
        <p>Skoleforestillinger</p>
        <p>Teatercaféen</p>
        <p>Handelsbetingelser</p>
      </div>
      <div className="socials">
        <SiFacebook />
        <SiInstagram />
        <SiLinkedin />
      </div>
    </StyledFooter>
  )
}
const StyledFooter = styled.footer`
margin-top: 3vw;
display: grid;
grid-template-columns: 1fr 1fr 1.5fr 1fr;
background-color: #30454C;
gap: 1em;
padding: 1em;
p {
  color: white;
  font-family: "Titillium Web", sans-serif;
  font-weight: 100;
  margin: 0;  
}
.m- {
  margin-bottom: 1.5em;
}
h3 {
  color: white;
  font-family: "Titillium Web", sans-serif;
}
.socials {
  svg {
    width: 20%;
    height: 20%;
    margin-right: 1vw;
    path {
      fill: white;
    }
  }
}
`
