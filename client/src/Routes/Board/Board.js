import React from "react"
import styled from "styled-components"

const Container = styled.div`
  width: 60%;
  margin: 0 auto;
`

const Header = styled.header`
  height: 10vh;
  font-weight: 600;
  font-size: 1.5em;
  display: flex;
  align-items: center;
`

const List = styled.div``

function Board() {
  return (
    <Container>
      <Header>자유 게시판</Header>
      <List></List>
    </Container>
  )
}

export default Board
