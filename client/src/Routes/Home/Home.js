import React from "react"
import styled from "styled-components"
import RepImageSlider from "../../Components/utils/RepImageSlider"
import { HashLink } from "react-router-hash-link"
import Map from "./Map"

const Container = styled.div`
  width: 100%;
  height: 100vh;
`

const StartBtnColumn = styled.div`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SHashLink = styled(HashLink)`
  width: 200px;
  height: 70px;
  border-radius: 20px;
  background-color: #8cadff;
  font-weight: 600;
  font-size: 1.3em;
  border: none;
  color: white;
  cursor: pointer;
  text-shadow: 1px 1px 1px #bdd0ff;
  box-shadow: 2px 2px 2px #82d5ff;
  display: flex;
  justify-content: center;
  align-items: center;
`

function Home() {
  return (
    <>
      <Container>
        <RepImageSlider />
        <StartBtnColumn>
          <SHashLink smooth to="#map">
            시 작 하 기
          </SHashLink>
        </StartBtnColumn>
      </Container>
      <Map />
    </>
  )
}

export default Home
