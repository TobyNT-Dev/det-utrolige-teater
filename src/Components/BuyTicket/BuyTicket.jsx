import React, { useState } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import AppService from '../Appservices/Appservice'

export const BuyTicket = () => {
    const { id } = useParams()
    const [data, setData] = useState()
    const [formData, setFormData] = useState({subject: "", comment: "", num_stars: "1", event_id: `${id}`})
    AppService.GetDetail("events", id).then((response) => {
        setData(response.data.item)
    })

    if (data)
  return (
    <StyledTicketSale>
        <div className="imgDiv"><img src={data.image_medium}/></div>
        <div className="formDiv">
            <h2>Køb billet</h2>
            <h3>{data.title}</h3>
            <h4>{`${data.stage_name} ${data.startdate}`}</h4>
            {/* {sessionStorage.getItem("user") !== null ? <form onSubmit={(e) => {
                    e.preventDefault()
                    if (sessionStorage.getItem("user") !== null) {
                        handleSubmit()
                    }
                }}>
                    <div>
                        <label htmlFor="subject">Titel: <input value={formData.subject} onChange={(e) => setFormData((state) => ({...state, subject: e.target.value}))} required name="subject" type="text" /></label>
                        <label htmlFor="comment">Andmeldelse: <textarea value={formData.comment}  onChange={(e) => setFormData((state) => ({...state, comment: e.target.value}))} required name="comment" type="text" /></label>
                    </div>
                    <button onClick={() => handleResponse()}>Send</button>
                </form> : <h3>Log ind for at købe en billet.</h3>} */}
        </div>
    </StyledTicketSale>
  )
}
const StyledTicketSale = styled.div`
display: grid;
grid-template-columns: 30% 70%;
gap: 1em;
.formDiv {

}
.imgDiv {
    overflow: hidden;
    img {
        display: block;
    }
}
`