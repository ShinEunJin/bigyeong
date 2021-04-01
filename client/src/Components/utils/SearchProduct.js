import React, { useState } from 'react'
import { Input } from 'antd';
import styled from "styled-components"

const { Search } = Input;

function SearchProduct(props) {

    const [searchTerm, setSearchTerm] = useState("")

    const handleSearch = e => {
        setSearchTerm(e.target.value)
        props.refreshFunction(e.target.value)
    }

    return (
        <div>
            <Search placeholder="input search text" onChange={handleSearch} />
        </div>
    )
}

export default SearchProduct
