import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import AppService from '../Appservices/Appservice'

export const BuyTicket = () => {
    const { id } = useParams()
    const [data, setData] = useState()
    const [seatsArr, setSeatsArr] = useState([])
    const [res, setRes] = useState("")
    const thisRef = useRef();
    const [seats, setSeats] = useState()
    const [status, setStatus] = useState("")
    const userEmail = JSON.parse(sessionStorage.getItem("user"))
    const [order, setOrder] = useState({ event_id: `${id}`, firstname: "", lastname: "", housenumber: "", streetname: "", zipcode: "", city: "", email: `${userEmail?.user.email}`, seats: []})
    useEffect(() => {
        AppService.GetDetail("events", id).then((response) => {
            setData(response.data.item)
        })
    },[id])
    useEffect(() => {
        AppService.GetDetail("seats", id).then((response) => {
            setSeats(response.data.items)
        })
    },[id])
    const handleSubmit = () => {
        if (seatsArr.length > 0) {
            const payload = {
                city: order.city,
                email: order.email,
                event_id: order.event_id,
                firstname: order.firstname,
                address: `${order.housenumber}, ${order.streetname}`,
                lastname: order.lastname,
                seats: `${seatsArr}`,
                zipcode: order.zipcode
            }
            AppService.Create("reservations", payload).then((response) => {
                setStatus(response.data.status)
            })
        }
        else if (seatsArr.length === 0) {
            setRes("Vælg Venligst mindst 1 billet plads.")
        }
    }
    
    //checks if the id of the clicked seat is allready clicked or not, if it is not, then add to array, for order
    const handleAddSeat = (id) => {
        thisRef.current = document.getElementById(`item-${id}`)
        if (!seatsArr.includes(id)) {
            setSeatsArr(state => state.concat(id))
            thisRef.current.classList.add('active')
        }
        else {
            setSeatsArr(state => state.filter(item => item !== id))
            thisRef.current.classList.remove('active')
        }
        setOrder((prevState) => {
            const {seats} = prevState
            if (seats.includes(id)) {
                //removes items which are allready in the array, from the array, so they get removed
                const newSeat = seats.filter((item) => item !== id)
                return {
                    ...prevState, seats: newSeat
                }
            } else {
                //spreads seats array from "order" useState variable, to add the id to it
                return {
                    ...prevState, seats: [...prevState.seats, id]
                }
            }
        })
    }
    console.log(order)


    if (data && seats) {
        const Lines = [...new Set(seats.map(item => item.line))]
        return (
            <>
    {!status ? <StyledTicketSale>
        <div className="imgDiv"><img src={data.image_medium} alt="event"/></div>
        <div className="formDiv">
            <h2>Køb billet</h2>
            <h3>{data.title}</h3>
            <h4>{`${data.stage_name}, ${data.startdate}`}</h4>
            {sessionStorage.getItem("user") !== null ? <form onSubmit={(e) => {
                e.preventDefault()
                if (sessionStorage.getItem("user") !== null) {
                    handleSubmit()
                }
            }}>
                    <div className="Inputs">
                        <label htmlFor="firstname">FORNAVN <input value={order.firstname} 
                        onChange={(e) => setOrder((state) => ({...state, firstname: e.target.value}))} required name="firstname" type="text" /></label>

                        <label htmlFor="lastname">EFTERNAVN <input value={order.lastname}  
                        onChange={(e) => setOrder((state) => ({...state, lastname: e.target.value}))} required name="lastname" type="text" /></label>

                        <label htmlFor="streetname">VEJNAVN & NR <input value={order.streetname} 
                        onChange={(e) => setOrder((state) => ({...state, streetname: e.target.value}))} required name="streetname" type="text" />

                            <input value={order.housenumber} 
                            onChange={(e) => setOrder((state) => ({...state, housenumber: e.target.value}))} required name="housenumber" type="text" /></label>

                        <label htmlFor="zipcode">POSTNR. & BY <input value={order.zipcode}  
                        onChange={(e) => setOrder((state) => ({...state, zipcode: e.target.value}))} required name="zipcode" type="text" />

                            <input value={order.city} 
                            onChange={(e) => setOrder((state) => ({...state, city: e.target.value}))} required name="city" type="text" /></label>
                    </div>
                    <button type="submit">GODKEND BESTILLING</button>
                    <div className="seatsDiv">
                        {Lines && Lines.map((subItem, idx) => {
                            return(
                                <div className={`row${subItem} rows`} key={idx}>{seats && seats.map((item, idx) => {
                                    if (item.line === subItem) {
                                        return (
                                            <span id={`item-${item.id}`} className="item" ref={thisRef} onClick={() => {
                                                if (item.is_reserved === 0) {
                                                    handleAddSeat(item.id)
                                                }
                                            }} style={{color: `rgba(255, 0, 0, ${item.is_reserved})`}} key={idx}>✕</span>
                                            )
                                        }
                                    })}</div>
                                    )
                                })}
                        </div>
                        <p>{res}</p>
                </form> : <h3>Log ind for at købe en billet.</h3>}
        </div>
    </StyledTicketSale> : <>{status === "Ok" ? <StyledSuccess className="success">Tak for din bestilling</StyledSuccess> : <h2>Der skete en fejl, prøv igen senere...</h2>}</>}
    </>
  )
}
}
const StyledSuccess = styled.h1`
text-align: center;
font-family: "Playfair Display", sans-serif;
color: #D39D5B;
margin: 2em 0 50vh 0;
`
const StyledTicketSale = styled.div`
display: grid;
grid-template-columns: 30% 70%;
gap: 1em;
.seatsDiv {
    display: block;
    .rows {
        span {
            user-select: none;
            text-align: center;
            font-family: "Titillium Web", sans-serif;
            cursor: pointer;
            display: inline-block;
            font-size: 20px;
            line-height: 20px;
            margin: 5px;
            height: 20px;
            width: 20px;
            border: 2px #AD7A51 solid;
            border-radius: 100%;
            font-weight: 900;
        }
    }
    .item {
        background-color: rgba(0,0,0,0);
    }
    .item.active {
        background-color: #AD7A51;
    }
}
.Inputs {
    label {
        display: block;
    }
}

.formDiv {

}
.imgDiv {
    overflow: hidden;
    img {
        display: block;
    }
}
`