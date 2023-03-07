import React, { useState } from 'react'
import styled from 'styled-components'
import AppService from '../Appservices/Appservice'

export const Overview = () => {
    const [data, setData] = useState()
    const [selected, setSelected] = useState("")

    AppService.GetList(`events${selected}`).then((response) => {
        console.log(response.data.items)
    })

  return (
    <StyledOverview>
        <select value={selected} onChange={(e) => setSelected(e.target.value)} name="options">
            <option defaultValue value="">Filter</option>
            <option value="">Sorter efter popularitet</option>
            <option value="?dir=DESC">Sorter efter pris (faldende)</option>
            <option value="?dir=ASC">Sorter efter pris (stigende)</option>
            <option value="">Sorter efter titel (A - Å)</option>
            <option value="">Sorter efter titel (Å - A)</option>
        </select>
        <StyledOverviewList>

        </StyledOverviewList>
    </StyledOverview>
  )
}
const StyledOverview = styled.div`
`
const StyledOverviewList = styled.div`
`