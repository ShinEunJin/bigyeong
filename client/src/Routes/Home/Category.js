import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const BackGround = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #faf3f3;
`

const Container = styled.div`
  width: 80%;
  padding-top: 5%;
  margin: 0 auto;
`

const Column = styled.section``

const Title = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
`

const Contents = styled.div``

function Category() {
  return (
    <BackGround id="map">
      <Container>
        <Column>
          <Title>지도로 찾기</Title>
          <Contents>
            <Link to="/find">지도로 찾자</Link>
          </Contents>
        </Column>
      </Container>
    </BackGround>
  )
}

export default Category
