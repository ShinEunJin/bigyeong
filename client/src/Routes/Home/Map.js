import React from "react"
import styled from "styled-components"
/* import { ReactComponent as KoreaMap } from "../../img/southKoreaHigh.svg" */
import KoreaMap from "./KoreaMap"

import dotenv from "dotenv"

dotenv.config()

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  padding-top: 3rem;
  background-color: #e1e5ea;
`

const SogoImg = styled.img`
  height: 6rem;
  width: 6rem;
`

const Column = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 700;
`

const MapSection = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

function Map() {
  return (
    <Container id="map">
      <Column>
        <SogoImg src={process.env.REACT_APP_DEV_PORT + "/logo/logo2.png"} />
        한국의 坊坊曲曲
      </Column>
      <MapSection>
        <KoreaMap />
      </MapSection>
    </Container>
  )
}

export default Map
