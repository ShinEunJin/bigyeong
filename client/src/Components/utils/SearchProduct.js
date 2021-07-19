import React, { useState } from "react"
import styled from "styled-components"

const Search = styled.input`
  height: 3rem;
  width: 100%;
  border: 1px solid rgba(100, 100, 100, 0.3);
  padding-left: 0.5rem;
  color: black;
  &::placeholder {
    opacity: 0.7;
    padding-left: 0.5rem;
  }
`

function SearchProduct(props) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e) => {
    props.handleSearchFilter(e.target.value) // 부모컴포넌트로 상태 전달
    setSearchTerm(e.target.value)
  }

  return (
    <div>
      <Search
        placeholder="상품 검색하기"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  )
}

export default SearchProduct
