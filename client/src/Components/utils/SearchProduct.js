import React, { useState } from "react"
import styled from "styled-components"

const Search = styled.input`
  height: 3rem;
  width: 100%;
  border: 1px solid rgba(100, 100, 100, 0.3);
  &::placeholder {
    opacity: 0.7;
    padding-left: 0.5rem;
  }
`

function SearchProduct(props) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div>
      <Search placeholder="상품 검색하기" onChange={handleSearch} />
    </div>
  )
}

export default SearchProduct
