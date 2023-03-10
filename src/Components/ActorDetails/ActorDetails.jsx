import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import AppService from '../Appservices/Appservice'

export const ActorDetails = () => {
    const [data, setData] = useState()
    const { id } = useParams()

    useEffect(() => {
        AppService.GetDetail("actors", id).then((response) => {
            setData(response.data.item)
            console.log(response.data.item)
        })
    },[id])
    if (data) {

        return (
            <StyledActorDetail>
        <div className="ImgDiv">
            <img src={data.image} alt="actor" />
        </div>
        <div className="InfoDiv">
            <h2>{data.name}</h2>
            <p>{data.description}</p>
        </div>
    </StyledActorDetail>
  )
}
}
const StyledActorDetail = styled.div`
display: grid;
grid-template-columns: 1fr 3fr;
.InfoDiv {
  padding: 0.5em;
  color: #D39D5B;
  font-family: "Titillium Web", sans-serif;
  font-weight: 100;
  margin: 0; 
  font-weight: 600;
  font-size: 1em;
}
`