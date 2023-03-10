import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import AppService from '../Appservices/Appservice'
import { BuyButton } from '../BuyButton/BuyButton'
import { ReadMoreButton } from '../ReadMoreButton/ReadMoreButton'

export const Overview = () => {
    const [data, setData] = useState()
    const [selected, setSelected] = useState("")


    useEffect(() =>  {
        AppService.GetList(`events${selected}`).then((response) => {
            setData(response.data.items)
        })
    })

    //Decides how the date should be formatted
    const options = { day: "numeric", month: "long" }

    if (data) {
  return (
    <StyledOverview>
        <select value={selected} onChange={(e) => setSelected(e.target.value)} name="options">
            <option defaultValue value="">Filter</option>
            <option value="">Sorter efter popularitet</option>
            <option value="">Sorter efter pris (faldende)</option>
            <option value="">Sorter efter pris (stigende)</option>
            <option value="?dir=ASC">Sorter efter titel (A - Å)</option>
            <option value="?dir=DESC">Sorter efter titel (Å - A)</option>
        </select>
        <h2>Oversigt</h2>
        {data && data.map((item, idx) => {
            return (
                <StyledOverviewList key={idx}>
                    <div className="ImgDiv">
                        <img src={item.image_small} alt="Forside Billede" />
                    </div>
                    <div className="TitleDiv">
                        <h3>{item.title}</h3>
                    </div>
                    <div className="InfoDiv">
                        <p>{item.genre}</p>
                        <p>{`${new Date(item.startdate).toLocaleDateString("da-DK", options).toUpperCase()} - ${new Date(item.stopdate).toLocaleDateString("da-DK", options).toUpperCase()}`}</p>
                    </div>
                    <ReadMoreButton data={item} />
                    <BuyButton data={item} />
                </StyledOverviewList>
            )
        })}
    </StyledOverview>
  )
}
}
const StyledOverview = styled.section`
`
const StyledOverviewList = styled.div`
margin-bottom: 0.5em;
margin-top: 1em;
display: grid;
grid-template-columns: 1fr 2fr 4fr 1.5fr 1.5fr;
border: 2px #AD7A51 solid;
.ImgDiv {
    overflow: hidden;
    height: 5vw;
    border: 0.3vw #AD7A51 solid;
    aspect-ratio: 1/1;
    img {
        height: 5vw;
    }
}
.TitleDiv {
    height: 5vw;
    h3 {
        color: #D39D5B;
        font-family: "Playfair Display", sans-serif;
    }
}
.InfoDiv {
    height: 5vw;
    font-family: "Titillium Web", sans-serif;
    p {
        font-size: 1.2vw;
        margin: 0.5em;
    }
}

button {
background-color: #AD7A51;
font-family: "Titillium Web", sans-serif;
padding: 0.5em;
border: none;
color: white;
font-weight: 600;
font-size: 12pt;
width: 65%;
height: 50%;
margin-top: 12.5%;
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
@media only screen and (max-width: 600px) {
    margin-bottom: 0.5em;
margin-top: 1em;
display: grid;
grid-template-columns: 1fr 2fr 4fr 2fr 2fr;
border: 2px #AD7A51 solid;
.ImgDiv {
    overflow: hidden;
    height: 5vw;
    border: 0.3vw #AD7A51 solid;
    aspect-ratio: 1/1;
    img {
        height: 5vw;
    }
}
.TitleDiv {
    height: 5vw;
    h3 {
        color: #D39D5B;
        font-family: "Playfair Display", sans-serif;
    }
}
.InfoDiv {
    height: 5vw;
    font-family: "Titillium Web", sans-serif;
    p {
        font-size: 1em;
        margin: 0;
    }
}

button {
background-color: #AD7A51;
font-family: "Titillium Web", sans-serif;
padding: 0.5em;
border: none;
color: white;
font-weight: 600;
font-size: 12pt;
width: 65%;
height: 50%;
margin-top: 12.5%;
}

}
`