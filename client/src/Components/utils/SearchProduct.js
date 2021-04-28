import React, { useState } from 'react'
import styled from "styled-components"

const Search = styled.input`
    height: 48px;
    width: 100%;
    border: 1px solid rgba(100, 100, 100, 0.3);
    &::placeholder{
        opacity: 0.7;
    }
`

function SearchProduct(props) {

    const [searchTerm, setSearchTerm] = useState("")

    const handleSearch = e => {
        setSearchTerm(e.target.value)
        props.refreshFunction(e.target.value)
    }

    return (
        <div>
            <Search placeholder="상품 검색하기" onChange={handleSearch} />
        </div>
    )
}

export default SearchProduct
