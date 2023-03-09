import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import styled from 'styled-components'
import AppService from '../Appservices/Appservice'

export const FavoriteButton = (props) => {
  const [liked, setLiked] = useState()
  const [runEffect, setRunEffect] = useState(false)
  useEffect(() => {
    AppService.GetList("favorites").then((response) => {
      const favorite = response.data.items?.find((item) => item.event_id === props.data.id)
      setLiked(favorite)
    })
    // eslint-disable-next-line
  },[runEffect])
  const handleAddFav = (event_id) => {
    const payload = { event_id: event_id }
    AppService.Create("favorites", payload).then((response) => {
      console.log(event_id + " Added to favs!")
      setRunEffect(state => !state)
    })
  }
  const handleDelFav = (event_id) => {
    AppService.Delete("favorites", event_id).then((response) => {
      console.log(event_id + " Removed!")
      setRunEffect(state => !state)
    })
  }
  return (
    <StyledFav>
      {liked ? <FaHeart className="off" onClick={() => handleDelFav(props.data.id)}/> : <FaRegHeart className="on" onClick={() => handleAddFav(props.data.id)}/>}
    </StyledFav>
  )
}
const StyledFav = styled.div`
position: absolute;
right: 10vw;
margin-top: 2vw;
width: 2vw;
height: 2vw;
.on {
  cursor: pointer;
  height: 2vw;
  width: 2vw;
  fill: #D39D5B;
}
.off {
  cursor: pointer;
  height: 2vw;
  width: 2vw;
  fill: #D39D5B;
  &:hover {
    fill: #d39d5bbd;
  }
}
`