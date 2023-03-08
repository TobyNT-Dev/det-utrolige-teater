import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import AppService from '../Appservices/Appservice'

export const EventDetails = () => {
    const [data, setData] = useState()
    const [reviews, setReviews] = useState()
    const { id } = useParams()
    useEffect(() => {
        AppService.GetDetail("events", id).then((response) => {
            setData(response.data.item)
        })
    }) 
    useEffect(() => {
        AppService.GetList(`reviews?event_id=${id}`).then((response) => {
            setReviews(response.data.items)
        })
    })
    //Decides how the date should be formatted
    const options = { day: "numeric", month: "long" }
    if (data) {
        return (
          <StyledDetails>
              <div className="ImgContainer">
                  <img src={data?.image_large} alt=""/>
              </div>
              <section className="SplitGrid">
                <div>
                  <p>{data.stage_name}</p>
                  <p>{`${new Date(data.startdate).toLocaleDateString("da-DK", options).toUpperCase()} - ${new Date(data.stopdate).toLocaleDateString("da-DK", options).toUpperCase()}`}</p>
                  <h2>{data.title}</h2>
                  <h3>{data.genre.toUpperCase()}</h3>
                </div>
                <div className="RightBox">
                  <p>{`BILLETPRIS: ${data.price} DKK`}</p>
                  <button className="buyTicket">KØB BILLET</button>
                </div>
              </section>
              <p className="description">{data.description}</p>
              <p className="duration">{`Varighed ca. ${data.duration_minutes} minutter`}</p>
              <h3>MEDVIRKENDE</h3>
              <div className="ActorsContainer">
              {data && data.actors.map((item, idx) => {
                  return (
                      <div className="actors" key={idx}>
                        <img src={item.image} alt={`${item.name}`} />
                        <p>{item.name}</p>
                    </div>
                )
            })}
            </div>
            <h3>Anmeldelser</h3>
            {reviews && reviews.map((item, idx) => {
                return (
                    <div className="ReviewsContainer" key={idx}>
                        <p>{`${item.num_stars}/5 Stjerner`}</p>
                    </div>
                )
            })}
          </StyledDetails>
        )
    }
}
const StyledDetails = styled.main`
border: 1px #AD7A51 solid;
.ActorsContainer {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 1.5em;
    .actors {
        text-align: center;
        display: grid;
        border: 1px #AD7A51 solid;
        img {
            width: 100%;
        }
        p {
            font-family: "Titillium Web", sans-serif;
            font-size: 1.2vw;
            font-weight: 500;
            color: #D39D5B;
            margin: 0.5em;
        }
    }
}
h3 {
    font-family: "Titillium Web", sans-serif;
    font-weight: 600;
    color: #707070;
    font-size: 20pt;
}
.duration {
    font-family: "Titillium Web", sans-serif;
    font-size: 1.2vw;
    font-weight: 500;
    color: #D39D5B;
}
.description {
    font-family: "Titillium Web", sans-serif;
    font-size: 1.2vw;
    font-weight: 500;
    color: #D39D5B;
}
.SplitGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    div {
        p {
            color: #707070;
            margin: 0;
            font-family: "Titillium Web", sans-serif;
            font-weight: 600;
            &:nth-child(2) {
                font-weight: 700;
            }
        }
        h2 {
            margin: 1vw 0 1vw 0;
            font-family: "Playfair Display", sans-serif;
            color: #D39D5B;
            font-size: 30pt;
        }
        h3 {
            font-family: "Titillium Web", sans-serif;
            font-weight: 600;
            color: #707070;
            font-size: 20pt;
        }
    }
    .RightBox {
        p {
            margin: 1vw 0 1vw 61%;
        }
        button {
            margin: 1vw 0 1vw 70%;
            background-color: #AD7A51;
            font-family: "Titillium Web", sans-serif;
            padding: 0.5em;
            border: none;
            color: white;
            font-weight: 600;
            font-size: 12pt;
            width: 25%;
            background-color: #D39D5B;
            cursor: pointer;
        &:hover {
            background-color: #AD7A51;
        }
    }
    }
}

.ImgContainer {
    overflow: hidden;
    border: 1vw #AD7A51 solid;
    height: 40vw;
    img {
        display: block;
        width: 100%;
    }
}
`